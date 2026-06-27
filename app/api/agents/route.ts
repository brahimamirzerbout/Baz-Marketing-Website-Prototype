import { NextRequest, NextResponse } from 'next/server';
import { complete, llmStatus } from '@/lib/llm';
import { AGENTS, getAgent, type AgentId } from '@/lib/agents';
import { readSessionFromCookies } from '@/lib/auth';
import { getDb, id } from '@/lib/db';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/agents — list available agents + active provider status.
 */
export async function GET() {
  const llm = llmStatus();
  return NextResponse.json({
    agents: AGENTS,
    llm,
  });
}

/**
 * POST /api/agents — run an agent.
 * Body: { kind: AgentId, prompt: string, input?: string }
 *
 * Uses the agent's system prompt + the user prompt. Tracks usage in ai_jobs.
 * Auth optional — anonymous calls allowed but rate-limited (TODO).
 */
export async function POST(req: NextRequest) {
  let body: { kind?: AgentId; prompt?: string; input?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid_json' }, { status: 400 }); }

  const { user } = await readSessionFromCookies();
  const kind = body.kind || 'general';
  const agent = getAgent(kind);
  if (!agent) return NextResponse.json({ ok: false, error: 'unknown_agent' }, { status: 400 });

  const userPrompt = (body.prompt || body.input || '').toString().trim();
  if (!userPrompt) return NextResponse.json({ ok: false, error: 'missing_prompt' }, { status: 400 });
  if (userPrompt.length > 8000) return NextResponse.json({ ok: false, error: 'prompt_too_long' }, { status: 400 });

  const jobId = id('ai');
  const result = await complete({
    prompt: userPrompt,
    system: agent.systemPrompt || undefined,
    maxTokens: 1500,
  });

  // Persist usage
  try {
    const db = getDb();
    db.prepare(`INSERT INTO ai_jobs (id, user_id, kind, provider, model, input_tokens, output_tokens, cost_usd, status)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
      .run(
        jobId,
        user?.id ?? null,
        kind,
        result.provider,
        result.model,
        result.usage?.input ?? 0,
        result.usage?.output ?? 0,
        estimateCost(result.provider, result.usage),
        result.ok ? 'ok' : 'error',
      );
  } catch {
    // never let logging break the response
  }

  return NextResponse.json({
    ok: result.ok,
    jobId,
    agent: { id: agent.id, name: agent.name, outputFormat: agent.outputFormat },
    text: result.text,
    provider: result.provider,
    model: result.model,
    error: result.error,
    usage: result.usage,
  });
}

/** Tiny cost estimator — real values come from the provider invoice. */
function estimateCost(provider: string | null, usage?: { input: number; output: number }) {
  if (!provider || !usage) return 0;
  // Approximate per-1k-token prices (USD), July 2026 ballpark
  const rates: Record<string, { in: number; out: number }> = {
    openai:    { in: 0.00015, out: 0.0006 },   // gpt-4o-mini
    anthropic: { in: 0.0008,  out: 0.004 },   // claude-3-5-haiku
    ollama:    { in: 0,       out: 0 },       // local
  };
  const r = rates[provider] ?? { in: 0, out: 0 };
  return (usage.input / 1000) * r.in + (usage.output / 1000) * r.out;
}