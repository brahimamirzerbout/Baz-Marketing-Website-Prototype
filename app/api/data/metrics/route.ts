import { NextRequest, NextResponse } from "next/server";
import { getMetrics } from "@/lib/data/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const data = getMetrics({
      metric: searchParams.get("metric") || undefined,
      source: searchParams.get("source") || undefined,
      from: searchParams.get("from") || undefined,
      to: searchParams.get("to") || undefined,
    });
    return NextResponse.json({ ok: true, data });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
