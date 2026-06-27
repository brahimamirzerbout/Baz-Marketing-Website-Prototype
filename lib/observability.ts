/**
 * BAZ — small server-side helpers for observability.
 */

export function requestId(): string {
  return `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function logEvent(event: string, meta: Record<string, unknown> = {}) {
  if (process.env.NODE_ENV === 'production') {
    // In production, write JSON lines. Future: ship to a log aggregator.
    console.log(JSON.stringify({ t: new Date().toISOString(), event, ...meta }));
  } else {
    console.log(`[${event}]`, Object.entries(meta).map(([k, v]) => `${k}=${JSON.stringify(v)}`).join(' '));
  }
}