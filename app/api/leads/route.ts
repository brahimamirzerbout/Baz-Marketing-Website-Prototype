import { NextRequest, NextResponse } from 'next/server';
import { getDb, audit, id } from '@/lib/db';
import { readSessionFromCookies } from '@/lib/auth';
import { rateLimit, rateLimitHeaders } from '@/lib/rate-limit';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/leads — list leads. Auth required (operator view).
 * Query params: ?status=new|contacted|qualified|proposal|won|lost
 *              ?limit=N
 *              ?q=text (search)
 */
export async function GET(req: NextRequest) {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });

  const url = new URL(req.url);
  const status = url.searchParams.get('status');
  const limit = Math.min(parseInt(url.searchParams.get('limit') ?? '100', 10) || 100, 1000);
  const q = url.searchParams.get('q')?.trim();

  const db = getDb();
  const where: string[] = [];
  const args: any[] = [];
  if (status) { where.push('status = ?'); args.push(status); }
  if (q)      { where.push('(name LIKE ? OR email LIKE ? OR company LIKE ? OR message LIKE ?)'); args.push(`%${q}%`, `%${q}%`, `%${q}%`, `%${q}%`); }
  const sql = `SELECT * FROM leads ${where.length ? 'WHERE ' + where.join(' AND ') : ''} ORDER BY created_at DESC LIMIT ?`;
  args.push(limit);
  const leads = db.prepare(sql).all(...args);

  // Funnel summary
  const funnel = db.prepare(`
    SELECT status, COUNT(*) AS n FROM leads GROUP BY status
  `).all();

  return NextResponse.json({ ok: true, leads, funnel, total: leads.length });
}

/**
 * POST /api/leads — create a lead. Public (no auth required).
 * Used by the /contact form, the /brief form, and external integrations.
 */
export async function POST(req: NextRequest) {
  // 10 leads / minute / IP — stops spam, allows legitimate bursts
  const guard = rateLimit(req, { key: 'lead-create', limit: 10, windowMs: 60_000 });
  if (!guard.ok) {
    return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429, headers: rateLimitHeaders(guard) });
  }

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }
  const name = (body.name || '').toString().trim();
  const email = (body.email || '').toString().trim().toLowerCase();
  const message = (body.message || '').toString().trim();
  if (!name || !email || !message) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return NextResponse.json({ ok: false, error: 'invalid_email' }, { status: 400 });

  const db = getDb();
  const leadId = id('l');
  const source = (body.source || 'marketing_site').toString().slice(0, 64);
  const service = (body.service || '').toString().slice(0, 96);
  db.prepare(`INSERT INTO leads (id, name, email, company, website, phone, budget, message, source, service)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(leadId, name, email, body.company?.toString().slice(0, 200), body.website?.toString().slice(0, 500),
         body.phone?.toString().slice(0, 64), body.budget?.toString().slice(0, 64), message, source, service);
  audit(null, 'lead.create', leadId, { source, service });

  // Fire-and-forget: kick off LeadGen agent in background to score
  if (process.env.LEAD_SCORING !== 'off') {
    scoreLeadInBackground(leadId, message).catch(() => {});
  }

  return NextResponse.json({ ok: true, id: leadId });
}

async function scoreLeadInBackground(leadId: string, message: string) {
  const { complete } = await import('@/lib/llm');
  const result = await complete({
    prompt: `Score this lead message:\n\n${message.slice(0, 2000)}`,
    system: `You are BAZ LeadGen Agent. Score the lead 0-100 and return JSON: {"score": <int>, "intent": "<buy_now|researching|comparison_shopping|tire_kicker>"}`,
    maxTokens: 300,
    temperature: 0.2,
  });
  if (!result.ok || !result.text) return;
  try {
    const parsed = JSON.parse(result.text.match(/\{[\s\S]*\}/)?.[0] ?? '{}');
    const score = Math.max(0, Math.min(100, parseInt(parsed.score, 10) || 0));
    const intent = String(parsed.intent || '').slice(0, 32);
    if (score > 0 || intent) {
      const db = getDb();
      db.prepare('UPDATE leads SET score = ?, intent = ? WHERE id = ?').run(score, intent, leadId);
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
  if (!user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  const url = new URL(req.url);
  const leadId = url.searchParams.get('id');
  if (!leadId) return NextResponse.json({ ok: false, error: 'missing_id' }, { status: 400 });

  const body = await req.json().catch(() => ({}));
  const db = getDb();
  const sets: string[] = [];
  const args: any[] = [];
  for (const field of ['status', 'score', 'owner']) {
    if (field in body) {
      sets.push(`${field} = ?`);
      args.push(body[field]);
    }
  }
  if (sets.length === 0) return NextResponse.json({ ok: false, error: 'no_fields' }, { status: 400 });
  sets.push('updated_at = ?');
  args.push(Date.now());
  args.push(leadId);
  db.prepare(`UPDATE leads SET ${sets.join(', ')} WHERE id = ?`).run(...args);
  audit(user.id, 'lead.update', leadId, body);
  return NextResponse.json({ ok: true });
}