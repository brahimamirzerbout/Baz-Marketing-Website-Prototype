import { NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    ok: true,
    enrollments_active: 12,
    recent_wins_7d: 3,
    triangle_velocity: 0.42,
    pipeline_value: 4200000,
    last_tick_at: Date.now(),
  });
}
