import { NextResponse } from 'next/server';
import { readSessionFromCookies } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET() {
  const { user } = await readSessionFromCookies();
  return NextResponse.json({ ok: true, user });
}