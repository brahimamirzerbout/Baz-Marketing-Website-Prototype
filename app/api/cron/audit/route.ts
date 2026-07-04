import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = getDb();
    const leadCount = db.prepare("SELECT COUNT(*) as count FROM leads").get() as any;
    const auditCount = db.prepare("SELECT COUNT(*) as count FROM audit").get() as any;
    return NextResponse.json({
      ok: true,
      timestamp: Date.now(),
      leads: leadCount?.count || 0,
      auditEntries: auditCount?.count || 0,
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message || String(err) }, { status: 500 });
  }
}
