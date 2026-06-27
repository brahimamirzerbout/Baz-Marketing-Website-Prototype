import { NextResponse } from 'next/server';
import { audit } from '@/lib/db';
import { destroySession, clearAuthCookies, readSessionFromCookies } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST() {
  const { token, user } = await readSessionFromCookies();
  if (token) {
    await destroySession(token);
    if (user) audit(user.id, 'auth.logout', user.id);
  }
  clearAuthCookies();
  return NextResponse.json({ ok: true });
}