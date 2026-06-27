import { NextRequest, NextResponse } from 'next/server';
import { getDb, audit, id } from '@/lib/db';
import { createSession, hashUserPassword, setAuthCookies } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string; name?: string; team?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }
  const { email, password, name, team } = body;
  if (!email || !password || !name) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });
  if (password.length < 8) return NextResponse.json({ ok: false, error: 'password_too_short' }, { status: 400 });

  const db = getDb();
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email.toLowerCase()) as { id: string } | undefined;
  if (existing) return NextResponse.json({ ok: false, error: 'email_taken' }, { status: 409 });

  const userId = id('u');
  const initials = name.trim().split(/\s+/).slice(0, 2).map((p) => p[0]?.toUpperCase() ?? '').join('') || 'BZ';
  db.prepare(`INSERT INTO users (id, email, name, password_hash, role, team, initials, color)
              VALUES (?, ?, ?, ?, 'member', ?, ?, '#4f7cff')`)
    .run(userId, email.toLowerCase(), name, hashUserPassword(password), team ?? null, initials);

  const sessionToken = await createSession(userId);
  const user = db.prepare('SELECT id, email, name, role, team, initials, color FROM users WHERE id = ?').get(userId) as any;
  setAuthCookies(sessionToken, user);
  audit(userId, 'auth.register', userId);

  return NextResponse.json({ ok: true, user });
}