import { NextRequest, NextResponse } from 'next/server';
import { getDb, audit } from '@/lib/db';
import { readSessionFromCookies } from '@/lib/auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  const lead = getDb().prepare('SELECT * FROM leads WHERE id = ?').get(params.id);
  if (!lead) return NextResponse.json({ ok: false, error: 'not_found' }, { status: 404 });
  return NextResponse.json({ ok: true, lead });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const { user } = await readSessionFromCookies();
  if (!user) return NextResponse.json({ ok: false, error: 'unauthenticated' }, { status: 401 });
  const db = getDb();
  db.prepare('DELETE FROM leads WHERE id = ?').run(params.id);
  audit(user.id, 'lead.delete', params.id);
  return NextResponse.json({ ok: true });
}