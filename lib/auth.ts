/**
 * BAZ — Auth layer
 *
 * Cookie-based session auth (not JWT) so admin pages can read the session
 * server-side without round-tripping the API. Token in `baz_session` httpOnly
 * cookie; user info cached in `baz_user` cookie (readable by client code).
 *
 * Endpoints (see /api/auth/*):
 *   POST /api/auth/register  { email, password, name }   → issues session
 *   POST /api/auth/login     { email, password }         → issues session
 *   POST /api/auth/logout                              → clears session
 *   GET  /api/auth/me                                  → returns current user
 */

import { cookies } from 'next/headers';
import { getDb, audit, id, hashPassword, verifyPassword, token } from './db';
import type { User } from '@/types/auth';

const COOKIE_SESSION = 'baz_session';
const COOKIE_USER    = 'baz_user';
const SESSION_TTL_DAYS = 30;

export interface SessionRecord {
  id: string;
  user_id: string;
  token: string;
  expires_at: number;
  created_at: number;
}

export async function createSession(userId: string): Promise<string> {
  const db = getDb();
  const sessionToken = token();
  const expiresAt = Date.now() + SESSION_TTL_DAYS * 86400 * 1000;
  db.prepare('INSERT INTO sessions (id, user_id, token, expires_at) VALUES (?, ?, ?, ?)')
    .run(id('s'), userId, sessionToken, expiresAt);
  audit(userId, 'session.create', sessionToken);
  return sessionToken;
}

export async function destroySession(sessionToken: string): Promise<void> {
  const db = getDb();
  const session = db.prepare('SELECT user_id FROM sessions WHERE token = ?').get(sessionToken) as { user_id: string } | undefined;
  db.prepare('DELETE FROM sessions WHERE token = ?').run(sessionToken);
  if (session) audit(session.user_id, 'session.destroy', sessionToken);
}

export async function readSessionFromCookies(): Promise<{ user: User | null; token: string | null }> {
  const c = cookies();
  const token = c.get(COOKIE_SESSION)?.value ?? null;
  if (!token) return { user: null, token: null };
  const db = getDb();
  const session = db.prepare('SELECT * FROM sessions WHERE token = ?').get(token) as SessionRecord | undefined;
  if (!session || session.expires_at < Date.now()) {
    if (session) db.prepare('DELETE FROM sessions WHERE token = ?').run(token);
    return { user: null, token: null };
  }
  const user = db.prepare('SELECT id, email, name, role, team, initials, color FROM users WHERE id = ?')
    .get(session.user_id) as User | undefined;
  return { user: user ?? null, token };
}

/** Read the current user synchronously from the user-cookie mirror. Used in
 *  client components that need a quick hint (display name, role). For
 *  authoritative user data, server components should call `requireUser()`. */
export function readUserCookie(): User | null {
  const raw = cookies().get(COOKIE_USER)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(decodeURIComponent(raw)) as User;
  } catch {
    return null;
  }
}

export function setAuthCookies(sessionToken: string, user: User) {
  const c = cookies();
  const userJson = encodeURIComponent(JSON.stringify(user));
  c.set(COOKIE_SESSION, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_DAYS * 86400,
  });
  c.set(COOKIE_USER, userJson, {
    httpOnly: false,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL_DAYS * 86400,
  });
}

export function clearAuthCookies() {
  const c = cookies();
  c.delete(COOKIE_SESSION);
  c.delete(COOKIE_USER);
}

export function hashUserPassword(plain: string): string { return hashPassword(plain); }
export function verifyUserPassword(plain: string, hash: string): boolean { return verifyPassword(plain, hash); }

export const COOKIE_NAMES = { session: COOKIE_SESSION, user: COOKIE_USER } as const;