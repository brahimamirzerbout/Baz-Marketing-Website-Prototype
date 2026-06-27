import { NextRequest, NextResponse } from 'next/server';
import { getDb, audit } from '@/lib/db';
import { createSession, verifyUserPassword, setAuthCookies } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  let body: { email?: string; password?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }
  const { email, password } = body;
  if (!email || !password) return NextResponse.json({ ok: false, error: 'missing_fields' }, { status: 400 });

  const db = getDb();
  const row = db.prepare('SELECT id, email, name, role, team, initials, color, password_hash FROM users WHERE email = ?')
    .get(email.toLowerCase()) as any;
  if (!row || !row.password_hash) {
    audit(null, 'auth.login.fail', email, { reason: 'no_user' });
    return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });
  }
  if (!verifyUserPassword(password, row.password_hash)) {
    audit(row.id, 'auth.login.fail', email, { reason: 'bad_password' });
    return NextResponse.json({ ok: false, error: 'invalid_credentials' }, { status: 401 });
  }

  const sessionToken = await createSession(row.id);
  const user = { id: row.id, email: row.email, name: row.name, role: row.role, team: row.team, initials: row.initials, color: row.color };
  setAuthCookies(sessionToken, user);
  audit(row.id, 'auth.login', row.id);
  return NextResponse.json({ ok: true, user });
}