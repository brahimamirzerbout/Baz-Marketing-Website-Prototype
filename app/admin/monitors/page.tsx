import { headers } from 'next/headers';
import { getMonitors, type Monitors } from '@/lib/monitors';

export const metadata = { title: 'Monitors · BAZ', robots: { index: false, follow: false } };

export const dynamic = 'force-dynamic';

export default async function MonitorsPage() {
  const { data, live } = await getMonitors();
  const h = headers();
  const ua = h.get('user-agent') || '';

  return (
    <div className="container mx-auto py-10 md:py-16">
      <header className="flex flex-wrap items-end justify-between gap-6 mb-8">
        <div>
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">BAZ Monitors · /admin/monitors</p>
          <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">Efficiency, at a glance.</h1>
          <p className="mt-3 text-ink-600 max-w-xl">
            Live health of the BAZ build, API, lead funnel, AI spend, and the public site&apos;s Core Web Vitals.
          </p>
        </div>
        <div className="text-right">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">Generated</p>
          <p className="text-sm font-medium">{new Date(data.generatedAt).toLocaleString()}</p>
          <p className="mt-1 inline-flex items-center gap-2 text-xs font-mono">
            <span className={`w-2 h-2 rounded-full ${live ? 'bg-success animate-pulse-dot' : 'bg-warning'}`} />
            {live ? 'LIVE (API connected)' : 'STATIC (set NEXT_PUBLIC_API_URL for live)'}
          </p>
        </div>
      </header>

      <div className="grid lg:grid-cols-3 gap-6">
        <Tile title="Build" subtitle="Next.js + lint + typecheck" data={data.build}>
          <KV k="Branch" v={data.build.branch} />
          <KV k="Last commit" v={truncate(data.build.lastCommit, 56)} mono />
          <KV k="Typecheck" v={data.build.typecheck} status={statusOf(data.build.typecheck)} />
          <KV k="Lint" v={data.build.lint} status={statusOf(data.build.lint)} />
          <KV k="Build time" v={data.build.buildMs ? `${(data.build.buildMs / 1000).toFixed(1)}s` : 'n/a'} />
          <KV k="First-load JS" v={data.build.bundleKb ? `${data.build.bundleKb.toFixed(1)} kB` : 'n/a'} />
        </Tile>

        <Tile title="API" subtitle={`v${data.api.version}`} data={data.api}>
          <KV k="Uptime 24h" v={`${(data.api.uptime24h * 100).toFixed(2)}%`} />
          <KV k="p95 latency" v={`${data.api.p95Ms}ms`} />
          <KV k="WS clients" v={String(data.api.wsClients)} />
          <KV k="AI provider" v={data.api.provider} status={data.api.provider === 'not configured' ? 'warn' : 'ok'} />
          <KV k="Stripe mode" v={data.api.stripeMode} status={data.api.stripeMode === 'not configured' ? 'warn' : 'ok'} />
        </Tile>

        <Tile title="Lead funnel" subtitle="Captured via contact form" data={data.leads}>
          <KV k="Last 7d" v={String(data.leads.last7d)} />
          <KV k="Last 30d" v={String(data.leads.last30d)} />
          <KV k="Conv. rate" v={`${(data.leads.conversionRate * 100).toFixed(1)}%`} />
          <KV k="Top source" v={data.leads.topSource} mono />
          <KV k="Trend (7d)" v={`${data.leads.trendPct >= 0 ? '+' : ''}${data.leads.trendPct}%`} status={data.leads.trendPct >= 0 ? 'ok' : 'warn'} />
        </Tile>

        <Tile title="AI spend" subtitle="Last 24h" data={data.ai}>
          <KV k="Calls" v={data.ai.calls24h.toLocaleString()} />
          <KV k="Tokens" v={`${(data.ai.tokens24h / 1000).toFixed(1)}k`} />
          <KV k="Est. cost" v={`$${data.ai.estCostUsd24h.toFixed(2)}`} />
          <KV k="Top agent" v={data.ai.topAgent} mono />
        </Tile>

        <Tile title="Performance" subtitle={`PageSpeed · ${data.perf.url}`} data={data.perf}>
          <KV k="LCP" v={`${(data.perf.lcpMs / 1000).toFixed(2)}s`} status={lcp(data.perf.lcpMs)} />
          <KV k="CLS" v={data.perf.cls.toFixed(3)} status={cls(data.perf.cls)} />
          <KV k="INP" v={`${data.perf.inpMs}ms`} status={inp(data.perf.inpMs)} />
          <KV k="TTFB" v={`${data.perf.ttfbMs}ms`} />
        </Tile>

        <Tile title="Tips" subtitle="What good looks like" data={{ status: 'ok' }}>
          <ul className="text-sm text-ink-700 space-y-2 list-disc pl-5">
            <li>Typecheck & lint stay green; build under 20s for fast deploys.</li>
            <li>API p95 &lt; 250ms keeps the contact form snappy.</li>
            <li>Lead conv. rate ≥ 12% means the brief form is doing its job.</li>
            <li>AI spend is bounded — alerts fire if estCostUsd24h &gt; $25.</li>
            <li>LCP &lt; 2.5s, CLS &lt; 0.1, INP &lt; 200ms — Google&apos;s &quot;good&quot; thresholds.</li>
          </ul>
        </Tile>
      </div>

      <p className="mt-10 text-xs font-mono text-ink-400">
        user-agent: <span className="text-ink-600">{ua.slice(0, 80) || '—'}</span>
      </p>
    </div>
  );
}

function Tile({ title, subtitle, data, children }: { title: string; subtitle: string; data: { status: string }; children: React.ReactNode }) {
  const tone =
    data.status === 'ok' ? 'bg-success/15 text-success border-success/30' :
    data.status === 'warn' ? 'bg-warning/15 text-warning border-warning/30' :
    data.status === 'down' ? 'bg-accent/15 text-accent-700 border-accent/30' :
    'bg-ink-100 text-ink-500 border-ink-200';
  return (
    <section className="rounded-2xl border border-ink-100 bg-paper p-5 md:p-6">
      <header className="flex items-center justify-between mb-4">
        <div>
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400">{subtitle}</p>
          <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">{title}</h2>
        </div>
        <span className={`px-2.5 py-1 rounded-full border text-[11px] font-mono uppercase tracking-[0.14em] ${tone}`}>{data.status}</span>
      </header>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-3">{children}</dl>
    </section>
  );
}

type Status = 'ok' | 'warn' | 'down';
function KV({ k, v, status, mono }: { k: string; v: string; status?: Status; mono?: boolean }) {
  const tone =
    status === 'ok'   ? 'text-success' :
    status === 'warn' ? 'text-warning' :
    status === 'down' ? 'text-accent-700' : '';
  return (
    <div>
      <dt className="text-[11px] font-mono uppercase tracking-[0.14em] text-ink-400">{k}</dt>
      <dd className={`text-sm ${tone} ${mono ? 'font-mono text-[12.5px] truncate' : 'font-medium'}`}>{v}</dd>
    </div>
  );
}

function truncate(s: string, n: number) {
  return s.length > n ? s.slice(0, n - 1) + '…' : s;
}

function lcp(ms: number) { return ms <= 2500 ? 'ok' : ms <= 4000 ? 'warn' : 'down'; }
function cls(v: number)  { return v <= 0.1 ? 'ok' : v <= 0.25 ? 'warn' : 'down'; }
function inp(ms: number) { return ms <= 200 ? 'ok' : ms <= 500 ? 'warn' : 'down'; }
function statusOf(s: string): Status { return s === 'ok' ? 'ok' : s === 'down' ? 'down' : 'warn'; }
