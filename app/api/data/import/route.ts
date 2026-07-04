import { NextRequest, NextResponse } from "next/server";
import { importLeadsFromCSV } from "@/lib/data/pipeline";
import { getDb } from "@/lib/db";
import { rateLimit, rateLimitHeaders } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const guard = rateLimit(req, { key: "data-import", limit: 5, windowMs: 60_000 });
    if (!guard.ok) {
      return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429, headers: rateLimitHeaders(guard) });
    }

    const contentType = req.headers.get("content-type") || "";
    let csvText: string;

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) return NextResponse.json({ ok: false, error: "No file provided" }, { status: 400 });
      csvText = await file.text();
    } else {
      const body = await req.json();
      csvText = body.data || "";
      if (!csvText) return NextResponse.json({ ok: false, error: "No data provided" }, { status: 400 });
    }

    const result = importLeadsFromCSV(csvText);

    try {
      const db = getDb();
      db.prepare("INSERT INTO audit (actor, action, target, meta) VALUES (?, ?, ?, ?)").run(
        "system", "import_leads", "leads", JSON.stringify({ imported: result.imported, skipped: result.skipped }),
      );
    } catch { /* audit logging is best-effort */ }

    return NextResponse.json({ ok: true, imported: result.imported, skipped: result.skipped, errors: result.errors });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
