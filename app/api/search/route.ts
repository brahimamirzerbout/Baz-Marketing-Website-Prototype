import { NextRequest, NextResponse } from 'next/server';
import { services } from '@/content/services';
import { caseStudies } from '@/content/case-studies';
import { industries } from '@/content/industries';
import { posts } from '@/content/posts';
import { team } from '@/content/team';
import { tiers } from '@/content/pricing';

export const dynamic = 'force-dynamic';

interface Hit {
  type: 'service' | 'case-study' | 'industry' | 'post' | 'team' | 'pricing';
  title: string;
  excerpt: string;
  href: string;
  score: number;
}

function score(text: string, q: string): number {
  const t = text.toLowerCase();
  const query = q.toLowerCase().trim();
  if (!query) return 0;
  let score = 0;
  if (t.includes(query)) score += 5;
  for (const word of query.split(/\s+/).filter(Boolean)) {
    if (t.includes(word)) score += 1;
  }
  return score;
}

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const q = (url.searchParams.get('q') ?? '').trim();
  if (!q) return NextResponse.json({ ok: true, q, hits: [] });

  const hits: Hit[] = [];

  for (const s of services) {
    const sc = score(`${s.name} ${s.tagline} ${s.description}`, q);
    if (sc > 0) hits.push({ type: 'service', title: s.name, excerpt: s.tagline, href: `/services/${s.slug}`, score: sc });
  }
  for (const c of caseStudies) {
    const sc = score(`${c.client} ${c.problem} ${c.strategy} ${c.result}`, q);
    if (sc > 0) hits.push({ type: 'case-study', title: c.client, excerpt: c.result, href: `/case-studies/${c.slug}`, score: sc });
  }
  for (const i of industries) {
    const sc = score(`${i.name} ${i.blurb}`, q);
    if (sc > 0) hits.push({ type: 'industry', title: i.name, excerpt: i.blurb, href: `/industries/${i.slug}`, score: sc });
  }
  for (const p of posts) {
    const sc = score(`${p.title} ${p.excerpt}`, q);
    if (sc > 0) hits.push({ type: 'post', title: p.title, excerpt: p.excerpt, href: `/insights/${p.slug}`, score: sc });
  }
  for (const m of team) {
    const sc = score(`${m.name} ${m.role} ${m.bio}`, q);
    if (sc > 0) hits.push({ type: 'team', title: m.name, excerpt: m.role, href: '/about', score: sc });
  }
  for (const t of tiers) {
    const sc = score(`${t.name} ${t.tagline} ${t.description}`, q);
    if (sc > 0) hits.push({ type: 'pricing', title: t.name, excerpt: t.tagline, href: '/pricing', score: sc });
  }

  hits.sort((a, b) => b.score - a.score);
  return NextResponse.json({ ok: true, q, hits: hits.slice(0, 25) });
}