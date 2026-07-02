import { NextRequest, NextResponse } from "next/server";
import { getDb, audit, id } from "@/lib/db";
import { readSessionFromCookies } from "@/lib/auth";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/leads — list leads. Auth required (operator view).
 * Query params: ?status=new|contacted|qualified|proposal|won|lost
 *              ?limit=N
 *              ?q=text (search)
 */
export async function GET(req: NextRequest) {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const limit = Math.min(parseInt(url.searchParams.get("limit") ?? "100", 10) || 100, 1000);
  const q = url.searchParams.get("q")?.trim();

  const db = getDb();
  const where: string[] = [];
  const args: (string | number)[] = [];
  if (status) {
    where.push("status = ?");
    args.push(status);
  }
  if (q) {
    where.push("(name LIKE ? OR email LIKE ? OR company LIKE ? OR message LIKE ?)");
    args.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`);
  }
  const sql = `SELECT * FROM leads ${where.length ? "WHERE " + where.join(" AND ") : ""} ORDER BY created_at DESC LIMIT ?`;
  args.push(limit);
  const leads = db.prepare(sql).all(...args);

  // Funnel summary
  const funnel = db
    .prepare(
      `
    SELECT status, COUNT(*) AS n FROM leads GROUP BY status
  `,
    )
    .all();

  return NextResponse.json({ ok: true, leads, funnel, total: leads.length });
}

/**
 * POST /api/leads — create a lead. Public (no auth required).
 * Used by the /contact form, the /brief form, and external integrations.
 */
export async function POST(req: NextRequest) {
  // 10 leads / minute / IP — stops spam, allows legitimate bursts
  const guard = rateLimit(req, { key: "lead-create", limit: 10, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json(
      { ok: false, error: "rate_limited" },
      { status: 429, headers: rateLimitHeaders(guard) },
    );
  }

  let body: Record<string, unknown> | null = null;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }
  if (!body) return NextResponse.json({ ok: false, error: "empty_body" }, { status: 400 });
  const name = (body.name || "").toString().trim();
  const email = (body.email || "").toString().trim().toLowerCase();
  const message = (body.message || "").toString().trim();
  if (!name || !email || !message)
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });

  const db = getDb();
  const leadId = id("l");
  const source = (body.source || "marketing_site").toString().slice(0, 64);
  const service = (body.service || "").toString().slice(0, 96);
  db.prepare(
    `INSERT INTO leads (id, name, email, company, website, phone, budget, message, source, service)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
  ).run(
    leadId,
    name,
    email,
    body.company?.toString().slice(0, 200),
    body.website?.toString().slice(0, 500),
    body.phone?.toString().slice(0, 64),
    body.budget?.toString().slice(0, 64),
    message,
    source,
    service,
  );
  audit(null, "lead.create", leadId, { source, service });

  // Always run deterministic scoring — it's free and works without LLM.
  // Layer LLM scoring on top if configured.
  const { scoreLead } = await import("@/lib/scoring");
  const baseScore = scoreLead({
    message,
    budget: body.budget as string | undefined,
    company: body.company as string | undefined,
    website: body.website as string | undefined,
    source,
    service,
    demoCompleted: !!body.demoCompleted,
    agentRuns: typeof body.agentRuns === "number" ? body.agentRuns : undefined,
    timeOnPageSec: typeof body.timeOnPageSec === "number" ? body.timeOnPageSec : undefined,
    scrollDepth: typeof body.scrollDepth === "number" ? body.scrollDepth : undefined,
    isRepeat: !!body.isRepeat,
  });
  db.prepare("UPDATE leads SET score = ?, intent = ? WHERE id = ?").run(
    baseScore.score,
    baseScore.intent,
    leadId,
  );
  audit(null, "lead.score", leadId, {
    score: baseScore.score,
    intent: baseScore.intent,
    reasons: baseScore.reasons,
  });

  // Fire-and-forget: layer LLM scoring on top if available.
  if (process.env.LEAD_SCORING !== "off") {
    scoreLeadInBackground(leadId, message).catch(() => {});
  }

  return NextResponse.json({
    ok: true,
    id: leadId,
    score: baseScore.score,
    intent: baseScore.intent,
    action: baseScore.recommendedAction,
  });
}

async function scoreLeadInBackground(leadId: string, message: string) {
  const { complete } = await import("@/lib/llm");
  const result = await complete({
    prompt: `Refine the lead score (currently 0-100 baseline) based on this message. Return JSON {"adjust": <int between -20 and +20>, "intent": "<buy_now|researching|comparison_shopping|tire_kicker>"}.\\n\\nMessage:\\n${message.slice(0, 2000)}`,
    system: `You are BAZ LeadGen Agent. Adjust the deterministic lead score by -20 to +20 based on subtleties. Return strict JSON only.`,
    maxTokens: 200,
    temperature: 0.2,
  });
  if (!result.ok || !result.text) return;
  try {
    const parsed = JSON.parse(result.text.match(/\{[\s\S]*\}/)?.[0] ?? "{}");
    const adjust = Math.max(-20, Math.min(20, parseInt(parsed.adjust, 10) || 0));
    const intent = String(parsed.intent || "").slice(0, 32);
    if (adjust !== 0 || intent) {
      const db = getDb();
      const row = db.prepare("SELECT score FROM leads WHERE id = ?").get(leadId) as
        { score: number } | undefined;
      const base = row?.score ?? 0;
      const final = Math.max(0, Math.min(100, base + adjust));
      db.prepare("UPDATE leads SET score = ?, intent = ? WHERE id = ?").run(
        final,
        intent || undefined,
        leadId,
      );
    }
  } catch {
    // ignore parse errors
  }
}

/**
 * PATCH /api/leads?id=X — update status / score / owner. Auth required.
 */
export async function PATCH(req: NextRequest) {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: "unauthenticated" }, { status: 401 });
  const url = new URL(req.url);
  const leadId = url.searchParams.get("id");
  if (!leadId) return NextResponse.json({ ok: false, error: "missing_id" }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const db = getDb();
  const sets: string[] = [];
  const args: (string | number)[] = [];
  for (const field of ["status", "score", "owner"]) {
    if (field in body) {
      sets.push(`${field} = ?`);
      args.push(body[field]);
    }
  }
  if (sets.length === 0)
    return NextResponse.json({ ok: false, error: "no_fields" }, { status: 400 });
  sets.push("updated_at = ?");
  args.push(Date.now());
  args.push(leadId);
  db.prepare(`UPDATE leads SET ${sets.join(", ")} WHERE id = ?`).run(...args);
  audit(user.id, "lead.update", leadId, body);
  return NextResponse.json({ ok: true });
}
