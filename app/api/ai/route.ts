import { NextRequest, NextResponse } from 'next/server';
import { complete, llmStatus } from '@/lib/llm';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * POST /api/ai
 *
 * Body: { prompt: string, system?: string, maxTokens?: number, temperature?: number }
 *
 * Provider-agnostic completion. Returns structured { ok, text, provider, model, error }.
 * If no AI provider is configured (no keys), returns ok: false with error 'no_provider_configured'
 * — the client should then fall back to its offline copy.
 *
 * Used by:
 *   - The homepage LiveAgentDemo (replaces the client-side stub)
 *   - /admin/leads (auto-summarizing a lead)
 *   - any future feature
 */
export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 });
  }

  const { prompt, system, maxTokens, temperature } = (raw ?? {}) as Record<string, unknown>;
  if (typeof prompt !== 'string' || prompt.trim().length === 0) {
    return NextResponse.json({ ok: false, error: 'missing_prompt' }, { status: 400 });
  }
  if (prompt.length > 8000) {
    return NextResponse.json({ ok: false, error: 'prompt_too_long' }, { status: 400 });
  }

  const result = await complete({
    prompt: prompt.trim(),
    system: typeof system === 'string' ? system : undefined,
    maxTokens: typeof maxTokens === 'number' ? maxTokens : undefined,
    temperature: typeof temperature === 'number' ? temperature : undefined,
  });

  // Log non-OK results for observability without leaking details to client
  if (!result.ok) {
    console.warn('[baz:ai]', result.error, { provider: result.provider });
  }

  return NextResponse.json(result);
}

/**
 * GET /api/ai — status check
 * Returns the active provider, model, and which keys are configured.
 * No auth required (informational only).
 */
export async function GET() {
  return NextResponse.json(llmStatus());
}