/**
 * BAZ — LLM adapter
 * Provider-agnostic. Reads env config at request time.
 * Falls back gracefully if no key is set — returns a structured "unconfigured" reply
 * so the rest of the app never crashes when AI isn't available.
 *
 * Supported providers:
 *   - Gemini (GEMINI_API_KEY, GEMINI_MODEL) — free tier, 1500 req/min
 *   - OpenAI (OPENAI_API_KEY, OPENAI_MODEL)
 *   - Anthropic (ANTHROPIC_API_KEY, ANTHROPIC_MODEL)
 *   - Ollama (OLLAMA_HOST, OLLAMA_MODEL) — local
 *
 * Usage:
 *   const result = await llm.complete({ prompt, system });
 *   if (result.ok) ... else handle(result.error);
 */

export type LlmProvider = "openai" | "anthropic" | "ollama" | "gemini" | "stub";

export interface LlmConfig {
  provider: LlmProvider;
  model: string;
  url: string | null;
  key: string | null;
}

export interface LlmResult {
  ok: boolean;
  provider: LlmProvider | null;
  model: string | null;
  text: string | null;
  error?: string;
  /** Provider-reported token usage, when available. */
  usage?: { input: number; output: number; total: number };
}

interface CompleteArgs {
  prompt: string;
  system?: string;
  maxTokens?: number;
  temperature?: number;
}

const PROVIDERS: Record<
  Exclude<LlmProvider, "stub">,
  { url: string | null; defaultModel: string }
> = {
  openai: { url: "https://api.openai.com/v1/chat/completions", defaultModel: "gpt-4o-mini" },
  anthropic: {
    url: "https://api.anthropic.com/v1/messages",
    defaultModel: "claude-3-5-haiku-latest",
  },
  ollama: { url: null, defaultModel: "llama3.1" },
  gemini: { url: "https://generativelanguage.googleapis.com/v1beta", defaultModel: "gemini-2.5-flash" },
};

/**
 * Detect the provider from env. Returns null when nothing is configured.
 * Force a specific provider by setting AI_PROVIDER=openai|anthropic|ollama|stub.
 */
export function getLlmConfig(): LlmConfig | null {
  const forced = process.env.AI_PROVIDER?.toLowerCase();

  if (forced === "stub" || (forced === undefined && !hasAnyKey())) {
    return null; // stub mode — caller should handle via complete()
  }
  if (forced === "openai" || (forced === undefined && process.env.OPENAI_API_KEY)) {
    return {
      provider: "openai",
      key: process.env.OPENAI_API_KEY!,
      model: process.env.OPENAI_MODEL || PROVIDERS.openai.defaultModel,
      url: PROVIDERS.openai.url,
    };
  }
  if (forced === "anthropic" || (forced === undefined && process.env.ANTHROPIC_API_KEY)) {
    return {
      provider: "anthropic",
      key: process.env.ANTHROPIC_API_KEY!,
      model: process.env.ANTHROPIC_MODEL || PROVIDERS.anthropic.defaultModel,
      url: PROVIDERS.anthropic.url,
    };
  }
  if (forced === "gemini" || (forced === undefined && process.env.GEMINI_API_KEY)) {
    return {
      provider: "gemini",
      key: process.env.GEMINI_API_KEY!,
      model: process.env.GEMINI_MODEL || PROVIDERS.gemini.defaultModel,
      url: PROVIDERS.gemini.url,
    };
  }
  if (forced === "ollama" || (forced === undefined && process.env.OLLAMA_HOST)) {
    return {
      provider: "ollama",
      key: null,
      model: process.env.OLLAMA_MODEL || PROVIDERS.ollama.defaultModel,
      url: `${process.env.OLLAMA_HOST}/api/chat`,
    };
  }
  return null;
}

function hasAnyKey(): boolean {
  return Boolean(
    process.env.GEMINI_API_KEY || process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY || process.env.OLLAMA_HOST,
  );
}

/**
 * Send a completion request. Returns a structured result regardless of outcome —
 * the caller never has to wrap in try/catch for network errors.
 */
export async function complete(args: CompleteArgs): Promise<LlmResult> {
  const cfg = getLlmConfig();
  if (!cfg) {
    return {
      ok: false,
      provider: null,
      model: null,
      text: null,
      error: "no_provider_configured",
    };
  }

  try {
    switch (cfg.provider) {
      case "openai":
        return await callOpenAI(cfg, args);
      case "anthropic":
        return await callAnthropic(cfg, args);
      case "ollama":
        return await callOllama(cfg, args);
      case "gemini":
        return await callGemini(cfg, args);
      default:
        return {
          ok: false,
          provider: cfg.provider,
          model: cfg.model,
          text: null,
          error: "unsupported_provider",
        };
    }
  } catch (err) {
    return {
      ok: false,
      provider: cfg.provider,
      model: cfg.model,
      text: null,
      error: err instanceof Error ? err.message : "unknown_error",
    };
  }
}

async function callOpenAI(cfg: LlmConfig, args: CompleteArgs): Promise<LlmResult> {
  const r = await fetch(cfg.url!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.key}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        ...(args.system ? [{ role: "system", content: args.system }] : []),
        { role: "user", content: args.prompt },
      ],
      max_tokens: args.maxTokens ?? 1024,
      temperature: args.temperature ?? 0.7,
    }),
  });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    return {
      ok: false,
      provider: "openai",
      model: cfg.model,
      text: null,
      error: `openai_${r.status}: ${body.slice(0, 200)}`,
    };
  }
  const j = await r.json();
  const text = j.choices?.[0]?.message?.content ?? null;
  const usage = j.usage
    ? {
        input: j.usage.prompt_tokens ?? 0,
        output: j.usage.completion_tokens ?? 0,
        total: j.usage.total_tokens ?? 0,
      }
    : undefined;
  return { ok: true, provider: "openai", model: cfg.model, text, usage };
}

async function callAnthropic(cfg: LlmConfig, args: CompleteArgs): Promise<LlmResult> {
  const r = await fetch(cfg.url!, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": cfg.key!,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: cfg.model,
      max_tokens: args.maxTokens ?? 1024,
      temperature: args.temperature ?? 0.7,
      system: args.system,
      messages: [{ role: "user", content: args.prompt }],
    }),
  });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    return {
      ok: false,
      provider: "anthropic",
      model: cfg.model,
      text: null,
      error: `anthropic_${r.status}: ${body.slice(0, 200)}`,
    };
  }
  const j = await r.json();
  const text = j.content?.[0]?.text ?? null;
  const usage = j.usage
    ? {
        input: j.usage.input_tokens ?? 0,
        output: j.usage.output_tokens ?? 0,
        total: (j.usage.input_tokens ?? 0) + (j.usage.output_tokens ?? 0),
      }
    : undefined;
  return { ok: true, provider: "anthropic", model: cfg.model, text, usage };
}

async function callOllama(cfg: LlmConfig, args: CompleteArgs): Promise<LlmResult> {
  const r = await fetch(cfg.url!, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: cfg.model,
      stream: false,
      messages: [
        ...(args.system ? [{ role: "system", content: args.system }] : []),
        { role: "user", content: args.prompt },
      ],
      options: {
        num_predict: args.maxTokens ?? 1024,
        temperature: args.temperature ?? 0.7,
      },
    }),
  });
  if (!r.ok) {
    return {
      ok: false,
      provider: "ollama",
      model: cfg.model,
      text: null,
      error: `ollama_${r.status}`,
    };
  }
  const j = await r.json();
  const text = j.message?.content ?? null;
  return { ok: true, provider: "ollama", model: cfg.model, text };
}

async function callGemini(cfg: LlmConfig, args: CompleteArgs): Promise<LlmResult> {
  const url = `${cfg.url}/models/${cfg.model}:generateContent?key=${cfg.key}`;
  const contents: Array<{ role: string; parts: Array<{ text: string }> }> = [];
  if (args.system) {
    contents.push({ role: "user", parts: [{ text: args.system }] });
    contents.push({ role: "model", parts: [{ text: "Understood." }] });
  }
  contents.push({ role: "user", parts: [{ text: args.prompt }] });

  const r = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: args.maxTokens ?? 1024,
        temperature: args.temperature ?? 0.7,
      },
    }),
  });
  if (!r.ok) {
    const body = await r.text().catch(() => "");
    return {
      ok: false,
      provider: "gemini",
      model: cfg.model,
      text: null,
      error: `gemini_${r.status}: ${body.slice(0, 200)}`,
    };
  }
  const j = await r.json();
  const text = j.candidates?.[0]?.content?.parts?.[0]?.text ?? null;
  const usage = j.usageMetadata
    ? {
        input: j.usageMetadata.promptTokenCount ?? 0,
        output: j.usageMetadata.candidatesTokenCount ?? 0,
        total: j.usageMetadata.totalTokenCount ?? 0,
      }
    : undefined;
  return { ok: true, provider: "gemini", model: cfg.model, text, usage };
}

/** Returns the current provider name (or 'stub' if no keys) — used by /admin/monitors. */
export function llmStatus(): {
  provider: LlmProvider | "unconfigured";
  model: string | null;
  keysPresent: Record<string, boolean>;
} {
  const cfg = getLlmConfig();
  return {
    provider: cfg?.provider ?? "unconfigured",
    model: cfg?.model ?? null,
    keysPresent: {
      openai: Boolean(process.env.OPENAI_API_KEY),
      anthropic: Boolean(process.env.ANTHROPIC_API_KEY),
      ollama: Boolean(process.env.OLLAMA_HOST),
      gemini: Boolean(process.env.GEMINI_API_KEY),
    },
  };
}

