import { NextResponse } from 'next/server';
import { services } from '@/content/services';

export const dynamic = 'force-dynamic';

/**
 * GET /api/services
 *
 * Returns the full 18-service catalog as JSON, suitable for:
 *   - third-party integrations (CRM product selectors, partner sites)
 *   - the operator console
 *   - the on-site search index (alternative to /api/search)
 *
 * Optional query params:
 *   ?pillar=owned|earned|paid|data|platform  → filter by channel
 *   ?format=summary                          → trim heavy fields (process, faqs)
 *   ?include=slug,name,pillar,...            → whitelist of fields to return
 *
 * No auth required — this is public marketing content.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const pillar = url.searchParams.get('pillar');
  const format = url.searchParams.get('format');
  const includeParam = url.searchParams.get('include');
  const allow = includeParam
    ? new Set(includeParam.split(',').map((s) => s.trim()).filter(Boolean))
    : null;

  let filtered = services;
  if (pillar) {
    filtered = filtered.filter((s) => s.pillar === pillar);
  }

  const pick = <T extends Record<string, unknown>>(obj: T, keys: (keyof T)[]): Partial<T> =>
    keys.reduce<Partial<T>>((acc, k) => {
      if (obj[k] !== undefined) acc[k] = obj[k];
      return acc;
    }, {});

  const allFields: (keyof typeof services[number])[] = [
    'slug', 'name', 'tagline', 'pillar', 'description',
    'hero', 'who', 'deliverables', 'kpis', 'process', 'proof', 'faqs', 'cta',
  ];

  const payload = filtered.map((s) => {
    let out: Record<string, unknown>;
    if (allow) {
      out = pick(s as unknown as Record<string, unknown>, [...allow].filter((k): k is keyof typeof s => k in s));
    } else if (format === 'summary') {
      out = pick(s as unknown as Record<string, unknown>, [
        'slug', 'name', 'tagline', 'pillar', 'description', 'kpis', 'cta',
      ] as (keyof typeof s)[]);
    } else {
      out = pick(s as unknown as Record<string, unknown>, allFields);
    }
    if (!('placeholder' in out)) out.placeholder = !!s.placeholder;
    return out;
  });

  return NextResponse.json({
    ok: true,
    count: payload.length,
    services: payload,
  });
}
