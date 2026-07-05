export type ProviderName = "gemini" | "openai" | "anthropic" | "openrouter" | "together" | "local";
export type ProviderTier = "premium" | "standard" | "free";

export interface ProviderConfig {
  name: ProviderName;
  displayName: string;
  apiKey?: string;
  isConfigured: boolean;
  isDefault?: boolean;
  tier: ProviderTier;
  models: string[];
  defaultModel?: string;
}

export interface ModelCallOptions {
  prompt: string;
  systemPrompt?: string;
  maxTokens?: number;
  temperature?: number;
  tierHint?: ProviderTier;
  skipRateLimited?: boolean;
}

export interface ModelCallResult {
  content: string;
  provider: ProviderName;
  model: string;
  latency: number;
  tokensUsed?: { prompt: number; completion: number };
}

const DEFAULT_PROVIDERS: ProviderConfig[] = [
  {
    name: "gemini",
    displayName: "Google Gemini",
    isConfigured: !!process.env.GEMINI_API_KEY,
    isDefault: true,
    tier: "premium",
    models: ["gemini-2.5-flash", "gemini-2.5-pro"],
    defaultModel: "gemini-2.5-flash",
  },
  {
    name: "openai",
    displayName: "OpenAI",
    isConfigured: !!process.env.OPENAI_API_KEY,
    tier: "premium",
    models: ["gpt-4o", "gpt-4o-mini"],
    defaultModel: "gpt-4o-mini",
  },
  {
    name: "openrouter",
    displayName: "OpenRouter",
    isConfigured: !!process.env.OPENROUTER_API_KEY,
    tier: "free",
    models: ["openrouter/auto"],
    defaultModel: "openrouter/auto",
  },
  {
    name: "local",
    displayName: "Local (Ollama)",
    isConfigured: !!process.env.OLLAMA_BASE_URL,
    tier: "free",
    models: ["llama3.2", "qwen2.5-coder"],
    defaultModel: "llama3.2",
  },
];

export class ProviderRouter {
  private rateLimitCounters: Map<ProviderName, { requests: number; resetAt: number }> = new Map();
  private metrics: Map<ProviderName, { calls: number; successes: number; failures: number; totalLatency: number }> = new Map();

  getAvailableProviders(): ProviderConfig[] {
    const configured = DEFAULT_PROVIDERS.filter((p) => p.isConfigured);
    const hasFree = configured.some((p) => p.tier === "free");
    if (!hasFree) {
      const local = DEFAULT_PROVIDERS.find((p) => p.name === "local");
      if (local) configured.push({ ...local, isConfigured: true });
    }
    return configured;
  }

  private isAvailable(provider: ProviderConfig): boolean {
    const counter = this.rateLimitCounters.get(provider.name);
    if (!counter) return true;
    if (Date.now() > counter.resetAt) { this.rateLimitCounters.delete(provider.name); return true; }
    return false;
  }

  private recordRequest(name: ProviderName): void {
    const existing = this.rateLimitCounters.get(name);
    if (existing) existing.requests++;
    else this.rateLimitCounters.set(name, { requests: 1, resetAt: Date.now() + 60000 });
  }

  getMetrics() {
    const out: Record<string, any> = {};
    for (const [name, m] of this.metrics) {
      out[name] = { calls: m.calls, successes: m.successes, failures: m.failures, avgLatency: m.calls > 0 ? Math.round(m.totalLatency / m.calls) : 0 };
    }
    return out;
  }

  async call(options: ModelCallOptions): Promise<ModelCallResult> {
    const providers = this.getAvailableProviders();
    const errors: Error[] = [];

    for (const provider of providers) {
      if (!this.isAvailable(provider)) continue;
      try {
        const start = Date.now();
        const result = await this.callProvider(provider, options);
        const latency = Date.now() - start;
        this.recordRequest(provider.name);
        this.recordMetric(provider.name, true, latency);
        return result;
      } catch (error) {
        const err = error instanceof Error ? error : new Error(String(error));
        errors.push(err);
        this.recordMetric(provider.name, false, 0);
      }
    }
    throw new Error(`All providers failed: ${errors.map((e) => e.message).join("; ")}`);
  }

  protected async callProvider(provider: ProviderConfig, options: ModelCallOptions): Promise<ModelCallResult> {
    const model = provider.defaultModel || provider.models[0] || "";
    const prompt = options.systemPrompt ? `${options.systemPrompt}\n\n${options.prompt}` : options.prompt;

    switch (provider.name) {
      case "gemini": {
        const apiKey = provider.apiKey || process.env.GEMINI_API_KEY || "";
        const res = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { maxOutputTokens: options.maxTokens ?? 1024, temperature: options.temperature ?? 0.7 },
            }),
          }
        );
        if (!res.ok) throw new Error(`Gemini API error: ${res.status}`);
        const data = await res.json();
        return {
          content: data.candidates?.[0]?.content?.parts?.[0]?.text || "",
          provider: provider.name,
          model,
          latency: 0,
        };
      }

      case "openai":
      case "openrouter": {
        const apiKey = provider.apiKey || (provider.name === "openai" ? process.env.OPENAI_API_KEY : process.env.OPENROUTER_API_KEY) || "";
        const url = provider.name === "openai"
          ? "https://api.openai.com/v1/chat/completions"
          : "https://openrouter.ai/api/v1/chat/completions";
        const messages: any[] = [];
        if (options.systemPrompt) messages.push({ role: "system", content: options.systemPrompt });
        messages.push({ role: "user", content: options.prompt });
        const res = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${apiKey}` },
          body: JSON.stringify({
            model,
            messages,
            max_tokens: options.maxTokens ?? 1024,
            temperature: options.temperature ?? 0.7,
          }),
        });
        if (!res.ok) throw new Error(`${provider.name} API error: ${res.status}`);
        const data = await res.json();
        return {
          content: data.choices?.[0]?.message?.content || "",
          provider: provider.name,
          model,
          latency: 0,
        };
      }

      case "local": {
        const baseUrl = process.env.OLLAMA_BASE_URL || "http://localhost:11434";
        const res = await fetch(`${baseUrl}/api/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            model,
            prompt,
            stream: false,
            options: {
              num_predict: options.maxTokens ?? 1024,
              temperature: options.temperature ?? 0.7,
            },
          }),
        });
        if (!res.ok) throw new Error(`Ollama API error: ${res.status}`);
        const data = await res.json();
        return {
          content: data.response || "",
          provider: provider.name,
          model,
          latency: 0,
        };
      }

      default:
        throw new Error(`Unsupported provider: ${provider.name}`);
    }
  }

  private recordMetric(name: ProviderName, success: boolean, latency: number): void {
    const m = this.metrics.get(name) ?? { calls: 0, successes: 0, failures: 0, totalLatency: 0 };
    m.calls++; if (success) m.successes++; else m.failures++; m.totalLatency += latency;
    this.metrics.set(name, m);
  }
}

let routerInstance: ProviderRouter | null = null;
export function getRouter(): ProviderRouter {
  if (!routerInstance) routerInstance = new ProviderRouter();
  return routerInstance;
}
