import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { llmStatus } from '@/lib/llm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const start = Date.now();
  try {
    const db = getDb();
    const counts = {
      users:        (db.prepare('SELECT COUNT(*) AS n FROM users').get() as { n: number }).n,
      leads:        (db.prepare('SELECT COUNT(*) AS n FROM leads').get() as { n: number }).n,
      customers:    (db.prepare('SELECT COUNT(*) AS n FROM customers').get() as { n: number }).n,
      projects:     (db.prepare('SELECT COUNT(*) AS n FROM projects').get() as { n: number }).n,
      active_subs:  (db.prepare(`SELECT COUNT(*) AS n FROM subscriptions WHERE status = 'active'`).get() as { n: number }).n,
      ai_jobs_24h:  (db.prepare(`SELECT COUNT(*) AS n FROM ai_jobs WHERE created_at > ?`).get(Date.now() - 86400000) as { n: number }).n,
    };
    const llm = llmStatus();
    return NextResponse.json({
      ok: true,
      name: 'BAZ Platform API',
      version: '7.0.0',
      uptime_s: Math.round(process.uptime()),
      db: 'sqlite',
      llm,
      counts,
      latency_ms: Date.now() - start,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err?.message ?? 'unknown' }, { status: 500 });
  }
}