import { NextResponse } from 'next/server';

/**
 * Tiny in-memory rate limiter. For production, swap with Redis/Upstash.
 *
 * Usage:
 *   import { rateLimit } from '@/lib/rate-limit';
 *   const guard = rateLimit(req, { key: 'contact-form', limit: 5, windowMs: 60_000 });
 *   if (!guard.ok) return NextResponse.json({ ok: false, error: 'rate_limited' }, { status: 429 });
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Prune every 5 minutes to avoid memory leak
const PRUNE_INTERVAL = 5 * 60_000;
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [k, b] of buckets) if (b.resetAt < now) buckets.delete(k);
  }, PRUNE_INTERVAL).unref?.();
}

export function rateLimit(
  req: Request,
  opts: { key: string; limit: number; windowMs: number }
): { ok: true; remaining: number; resetAt: number } | { ok: false; retryAfter: number } {
  // Key = route key + client IP. IP comes from x-forwarded-for in prod.
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
          ?? req.headers.get('x-real-ip')
          ?? 'unknown';
  const k = `${opts.key}:${ip}`;
  const now = Date.now();
  const existing = buckets.get(k);

  if (!existing || existing.resetAt < now) {
    buckets.set(k, { count: 1, resetAt: now + opts.windowMs });
    return { ok: true, remaining: opts.limit - 1, resetAt: now + opts.windowMs };
  }

  if (existing.count >= opts.limit) {
    return { ok: false, retryAfter: Math.ceil((existing.resetAt - now) / 1000) };
  }

  existing.count += 1;
  return { ok: true, remaining: opts.limit - existing.count, resetAt: existing.resetAt };
}

export function rateLimitHeaders(result: { ok: true; remaining: number; resetAt: number } | { ok: false; retryAfter: number }): HeadersInit {
  const headers: Record<string, string> = {};
  if (result.ok) {
    headers['X-RateLimit-Remaining'] = String(result.remaining);
    headers['X-RateLimit-Reset'] = String(Math.ceil(result.resetAt / 1000));
  } else {
    headers['Retry-After'] = String(result.retryAfter);
  }
  return headers;
}