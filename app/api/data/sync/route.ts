import { NextRequest, NextResponse } from "next/server";
import { runDataPipeline } from "@/lib/data/pipeline";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const sources = body.sources as string[] | undefined;
    const results = await runDataPipeline(sources as any);
    return NextResponse.json({ ok: true, results });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
  }
}
