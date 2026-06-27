import { NextRequest, NextResponse } from 'next/server';
import { getDb, audit, id, token } from '@/lib/db';
import { readSessionFromCookies } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/feedback — list submitted feedback. Operator-only.
 */
export async function GET() {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  const db = getDb();
  const rows = db.prepare('SELECT * FROM feedback ORDER BY created_at DESC').all();
  return NextResponse.json({ ok: true, feedback: rows });
}

/**
 * POST /api/feedback — submit feedback (public, via token in URL).
 * Used by /portal/feedback.
 */
export async function POST(req: NextRequest) {
  let body: { token?: string; ratings?: Record<string, number>; comment?: string; name?: string; role?: string; company?: string; publicOk?: boolean };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }
  const { token: t, ratings, comment, name, role, company, publicOk } = body;
  if (!t || !ratings) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });

  const db = getDb();
  const req_row = db.prepare('SELECT * FROM feedback_requests WHERE token = ? AND submitted_at IS NULL').get(t) as any;
  if (!req_row) return NextResponse.json({ ok: false, error: 'invalid_or_used_token' }, { status: 404 });

  const keys = ['strategy', 'results', 'communication', 'partnership'] as const;
  const overall = Math.round(keys.reduce((s, k) => s + (ratings[k] || 0), 0) / keys.length);

  const fbId = id('fb');
  db.prepare(`INSERT INTO feedback (id, request_id, customer_id, ratings_json, overall, comment, name, role, company, public_ok)
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(fbId, req_row.id, req_row.customer_id, JSON.stringify(ratings), overall, comment ?? null, name ?? null, role ?? null, company ?? null, publicOk ? 1 : 0);
  db.prepare('UPDATE feedback_requests SET submitted_at = ? WHERE id = ?').run(Date.now(), req_row.id);
  audit(null, 'feedback.submit', fbId, { overall });
  return NextResponse.json({ ok: true, id: fbId, overall });
}

/**
 * POST /api/feedback/request — operator creates a feedback request for a customer.
 * Returns the public token to embed in a URL like /portal/feedback?token=X.
 */
export async function PUT(req: NextRequest) {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const { customerId, kind } = body;
  if (!customerId) return NextResponse.json({ ok: false, error: 'missing_customer' }, { status: 400 });

  const db = getDb();
  const t = token();
  const reqId = id('fbr');
  db.prepare('INSERT INTO feedback_requests (id, customer_id, token, kind) VALUES (?, ?, ?, ?)')
    .run(reqId, customerId, t, kind || 'quarterly');
  audit(user.id, 'feedback.request.create', reqId, { customerId });
  return NextResponse.json({ ok: true, id: reqId, token: t });
}