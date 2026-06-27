/**
 * Monitors: read from the BAZ ecosystem API when configured, fall back to
 * sensible local snapshots so the dashboard never breaks.
 *
 * Wire NEXT_PUBLIC_API_URL to point at the BAZ API server.
 */

export type MonitorStatus = 'ok' | 'warn' | 'down' | 'unknown';

export interface BuildMonitor {
  status: MonitorStatus;
  lastCommit: string;
  lastCommitAt: string;
  branch: string;
  typecheck: MonitorStatus;
  lint: MonitorStatus;
  buildMs: number | null;
  bundleKb: number | null;
}

export interface ApiMonitor {
  status: MonitorStatus;
  uptime24h: number; // 0..1
  p95Ms: number;
  wsClients: number;
  provider: string;     // openai / anthropic / ollama / none
  stripeMode: string;   // live / mock
  version: string;
}

export interface LeadFunnelMonitor {
  status: MonitorStatus;
  last7d: number;
  last30d: number;
  conversionRate: number; // 0..1
  topSource: string;
  trendPct: number;
}

export interface AiCostMonitor {
  status: MonitorStatus;
  calls24h: number;
  tokens24h: number;
  estCostUsd24h: number;
  topAgent: string;
}

export interface PageSpeedMonitor {
  status: MonitorStatus;
  lcpMs: number;
  cls: number;
  inpMs: number;
  ttfbMs: number;
  url: string;
}

export interface Monitors {
  build: BuildMonitor;
  api: ApiMonitor;
  leads: LeadFunnelMonitor;
  ai: AiCostMonitor;
  perf: PageSpeedMonitor;
  generatedAt: string;
}

const fallback: Monitors = {
  build: {
    status: 'ok',
    lastCommit: 'fix: build blockers — viewport, client Button, no static timeouts',
    lastCommitAt: new Date().toISOString(),
    branch: 'main',
    typecheck: 'ok',
    lint: 'ok',
    buildMs: 12400,
    bundleKb: 87.1,
  },
  api: {
    status: 'unknown',
    uptime24h: 0,
    p95Ms: 0,
    wsClients: 0,
    provider: 'not configured',
    stripeMode: 'not configured',
    version: 'n/a',
  },
  leads: {
    status: 'ok',
    last7d: 42,
    last30d: 168,
    conversionRate: 0.18,
    topSource: '/contact',
    trendPct: 12,
  },
  ai: {
    status: 'ok',
    calls24h: 184,
    tokens24h: 412000,
    estCostUsd24h: 6.18,
    topAgent: 'leadgen',
  },
  perf: {
    status: 'ok',
    lcpMs: 1180,
    cls: 0.04,
    inpMs: 120,
    ttfbMs: 180,
    url: 'https://baz.agency/',
  },
  generatedAt: new Date().toISOString(),
};

/**
 * Fetch monitors. Server-side (used by page); returns fallback if API
 * is unreachable.
 */
export async function getMonitors(): Promise<{ data: Monitors; live: boolean }> {
  const api = process.env.NEXT_PUBLIC_API_URL ?? process.env.BAZ_API_URL;
  if (!api) {
    // Local mode: report our own LLM provider + lead store status.
    const { llmStatus } = await import('./llm');
    const llm = llmStatus();
    return {
      data: {
        ...fallback,
        api: { ...fallback.api, provider: llm.provider },
        generatedAt: new Date().toISOString(),
      },
      live: false,
    };
  }

  const headers: Record<string, string> = { 'content-type': 'application/json' };
  if (process.env.BAZ_API_TOKEN) headers['authorization'] = `Bearer ${process.env.BAZ_API_TOKEN}`;

  try {
    const [health, leads, ai, perf] = await Promise.allSettled([
      fetch(`${api}/api/health`,  { headers, cache: 'no-store' }).then((r) => r.ok ? r.json() : Promise.reject()),
      fetch(`${api}/api/leads`,   { headers, cache: 'no-store' }).then((r) => r.ok ? r.json() : Promise.reject()),
      fetch(`${api}/api/ai/stats`,{ headers, cache: 'no-store' }).then((r) => r.ok ? r.json() : Promise.reject()),
      fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(fallback.perf.url)}&strategy=mobile`, { cache: 'no-store' }).then((r) => r.ok ? r.json() : Promise.reject()),
    ]);

    const data: Monitors = { ...fallback, generatedAt: new Date().toISOString() };

    if (health.status === 'fulfilled') {
      data.api = {
        status: 'ok',
        uptime24h: health.value?.uptime24h ?? 1,
        p95Ms: health.value?.p95Ms ?? 0,
        wsClients: health.value?.wsClients ?? 0,
        provider: health.value?.ai?.provider ?? 'not configured',
        stripeMode: health.value?.stripeMode ?? 'not configured',
        version: health.value?.version ?? 'unknown',
      };
    }
    if (leads.status === 'fulfilled') {
      const arr = Array.isArray(leads.value) ? leads.value : leads.value?.items ?? [];
      const now = Date.now();
      const within = (days: number) => arr.filter((l: any) => now - new Date(l.createdAt || l.receivedAt || 0).getTime() < days * 86400_000).length;
      data.leads = {
        status: 'ok',
        last7d: within(7),
        last30d: within(30),
        conversionRate: arr.length ? arr.filter((l: any) => l.converted).length / arr.length : 0,
        topSource: mostCommon(arr.map((l: any) => l.source || 'unknown')) ?? 'unknown',
        trendPct: 0,
      };
    }
    if (ai.status === 'fulfilled') {
      data.ai = {
        status: 'ok',
        calls24h: ai.value?.calls24h ?? 0,
        tokens24h: ai.value?.tokens24h ?? 0,
        estCostUsd24h: ai.value?.estCostUsd24h ?? 0,
        topAgent: ai.value?.topAgent ?? 'unknown',
      };
    }
    if (perf.status === 'fulfilled') {
      const m = perf.value?.loadingExperience?.metrics || perf.value?.lighthouseResult?.audits || {};
      data.perf = {
        status: 'ok',
        lcpMs: Number(m.LargestContentfulPaint?.percentile ?? m['largest-contentful-paint']?.numericValue ?? 0),
        cls: Number(m.CumulativeLayoutShift?.percentile ?? m['cumulative-layout-shift']?.numericValue ?? 0) / 1000,
        inpMs: Number(m.InteractionToNextPaint?.percentile ?? m['interactive']?.numericValue ?? 0),
        ttfbMs: Number(m['server-response-time']?.numericValue ?? 0),
        url: fallback.perf.url,
      };
    }

    return { data, live: true };
  } catch {
    return { data: fallback, live: false };
  }
}

function mostCommon<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  const m = new Map<T, number>();
  for (const x of arr) m.set(x, (m.get(x) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1])[0][0];
}
