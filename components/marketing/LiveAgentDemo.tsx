'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/cn';
import { Magnetic } from '@/components/ui/Magnetic';
import { track } from '@/lib/analytics';

type Agent = 'leadgen' | 'content' | 'analytics' | 'general';

const agents: { id: Agent; name: string; role: string; color: string; emoji: string; prompt: string }[] = [
  { id: 'leadgen',    name: 'LeadGen',     role: 'Research & outreach',   color: '#ff3b2f', emoji: '◬', prompt: 'Find 3 qualified B2B SaaS leads in the marketing analytics space, $2M–$50M ARR, hiring growth marketers.' },
  { id: 'content',    name: 'Content',     role: 'Editorial & SEO',       color: '#4f7cff', emoji: '✎', prompt: 'Write a 200-word LinkedIn post announcing our new AI search optimization service for B2B SaaS CMOs.' },
  { id: 'analytics',  name: 'Analytics',   role: 'Attribution & reporting',color: '#3ddc97', emoji: '◐', prompt: 'A DTC skincare brand spent $80K on Meta last month and got 4,200 purchases averaging $52 AOV. CAC, MER, and the next 90-day reallocation plan?' },
  { id: 'general',    name: 'General',     role: 'Strategy & copy',       color: '#ffb020', emoji: '✦', prompt: 'Draft a cold email to a DTC beauty founder who is burned out on agency churn and skeptical of AI.' },
];

interface DemoResult {
  agent: Agent;
  output: string;
  provider: string;
  model: string;
  tokens?: number;
  ms: number;
}

/**
 * Live AI demo. Talks to /api/ai on the BAZ backend when NEXT_PUBLIC_API_URL
 * is set; otherwise simulates a deterministic response so the demo never
 * breaks on the marketing site.
 */
export function LiveAgentDemo() {
  const [active, setActive] = useState<Agent>('leadgen');
  const [prompt, setPrompt] = useState(agents[0].prompt);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<DemoResult | null>(null);
  const [history, setHistory] = useState<DemoResult[]>([]);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setPrompt(agents.find((a) => a.id === active)!.prompt);
  }, [active]);

  const run = async () => {
    if (busy) return;
    setBusy(true);
    setResult(null);
    track('ai_demo_run', { agent: active });
    const start = performance.now();

    const api = process.env.NEXT_PUBLIC_API_URL;
    let out: DemoResult | null = null;

    if (api) {
      try {
        const r = await fetch(`${api}/api/ai`, {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ kind: active, prompt }),
        });
        const j = await r.json();
        out = {
          agent: active,
          output: j.text ?? j.output ?? j.error ?? JSON.stringify(j),
          provider: j.provider ?? 'unknown',
          model: j.model ?? 'unknown',
          tokens: (j.tokens_in ?? 0) + (j.tokens_out ?? 0),
          ms: j.latency_ms ?? Math.round(performance.now() - start),
        };
      } catch {
        out = simulate(active, prompt, start);
      }
    } else {
      await new Promise((r) => setTimeout(r, 600 + Math.random() * 800));
      out = simulate(active, prompt, start);
    }

    setResult(out);
    setHistory((h) => [out!, ...h].slice(0, 5));
    setBusy(false);
  };

  return (
    <div className="rounded-3xl border border-ink-100 bg-paper overflow-hidden shadow-soft">
      {/* Header bar (terminal-style) */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-ink-100 bg-paper-50">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-accent/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-success/80" />
        </div>
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          baz://agents · live
        </p>
        <p className="font-mono text-[11px] text-ink-400 hidden md:block">
          {history.length > 0 ? `${history.length} run${history.length === 1 ? '' : 's'} this session` : 'idle'}
        </p>
      </div>

      <div className="grid md:grid-cols-[220px_1fr]">
        {/* Agent rail */}
        <ul className="border-b md:border-b-0 md:border-r border-ink-100 bg-paper-50 p-2 md:p-3 flex md:flex-col gap-1.5 overflow-x-auto md:overflow-visible">
          {agents.map((a) => (
            <li key={a.id}>
              <button
                type="button"
                onClick={() => setActive(a.id)}
                aria-pressed={active === a.id}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl flex items-center gap-3 transition-colors',
                  active === a.id ? 'bg-ink-900 text-paper' : 'hover:bg-paper-300 text-ink-700'
                )}
              >
                <span
                  aria-hidden
                  className={cn(
                    'inline-grid place-items-center w-7 h-7 rounded-lg text-sm font-mono',
                    active === a.id ? 'bg-paper/10' : 'bg-paper-300'
                  )}
                  style={{ color: active === a.id ? a.color : undefined }}
                >
                  {a.emoji}
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block text-sm font-medium leading-tight">{a.name}</span>
                  <span className={cn('block text-[11px] truncate', active === a.id ? 'text-paper/60' : 'text-ink-400')}>
                    {a.role}
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>

        {/* Prompt + output */}
        <div className="p-5 md:p-7 flex flex-col gap-4 min-h-[420px]">
          <label className="block">
            <span className="block font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">
              Prompt
            </span>
            <textarea
              ref={inputRef}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full rounded-xl bg-white border border-ink-200 px-4 py-3 text-[15px] focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 resize-y"
            />
          </label>

          <div className="flex items-center justify-between">
            <p className="font-mono text-[11px] text-ink-400">
              {process.env.NEXT_PUBLIC_API_URL ? '→ /api/ai' : 'simulated (no API configured)'}
            </p>
            <Magnetic strength={0.25}>
              <button
                type="button"
                onClick={run}
                disabled={busy}
                data-cursor="cta"
                className="inline-flex items-center gap-2 px-5 h-11 rounded-full bg-accent text-white text-sm font-medium shadow-soft hover:shadow-lift hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:translate-y-0"
              >
                {busy ? (
                  <>
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse-dot" />
                    Running…
                  </>
                ) : (
                  <>Run agent →</>
                )}
              </button>
            </Magnetic>
          </div>

          <div className="rounded-2xl bg-ink-900 text-paper p-5 md:p-6 font-mono text-[13px] leading-relaxed min-h-[180px] overflow-x-auto">
            {!result && !busy && (
              <p className="text-paper/50">{'// output appears here'}</p>
            )}
            {busy && (
              <p className="text-paper/70">
                <span className="text-accent">▍</span> thinking
                <span className="ml-1 inline-block animate-pulse-dot">.</span>
                <span className="ml-1 inline-block animate-pulse-dot" style={{ animationDelay: '.2s' }}>.</span>
                <span className="ml-1 inline-block animate-pulse-dot" style={{ animationDelay: '.4s' }}>.</span>
              </p>
            )}
            {result && !busy && (
              <div>
                <div className="flex items-center gap-3 text-paper/50 text-[11px] uppercase tracking-[0.16em] mb-3">
                  <span>{result.agent}</span>
                  <span>·</span>
                  <span>{result.provider}/{result.model}</span>
                  <span>·</span>
                  <span>{result.ms}ms</span>
                  {result.tokens ? <><span>·</span><span>{result.tokens} tok</span></> : null}
                </div>
                <pre className="whitespace-pre-wrap font-mono text-paper text-[13px] leading-relaxed">{result.output}</pre>
              </div>
            )}
          </div>

          {history.length > 1 && (
            <div className="border-t border-ink-100 pt-4">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">Recent</p>
              <div className="flex flex-wrap gap-2">
                {history.slice(1).map((h, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setResult(h)}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-ink-200 hover:border-ink-900 transition-colors"
                  >
                    {h.agent} · {h.ms}ms
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function simulate(agent: Agent, prompt: string, start: number): DemoResult {
  const ms = Math.round(performance.now() - start);
  const map: Record<Agent, string> = {
    leadgen: `1. Northbeam (Series B, NYC, ~80 employees, hiring "Senior Growth Marketer" — strong intent)
   → DM hook: "Saw you're hiring a senior growth marketer — most Series B analytics teams hit a CAC ceiling around $400 because they can't model incrementality. We helped 4 peers break through it in Q1. Worth 15 min?"
2. Statsig (Series A, SF, ~45 employees, recently launched experimentation platform)
   → DM hook: "Saw the new experimentation launch — congrats. Quick observation: 70% of post-launch signups are PQLs who already had a feature-flag aha moment. We built the playbook for that, happy to share."
3. Imprint (Series B fintech, NYC, ~120 employees, hiring "Lifecycle Marketing Lead")
   → DM hook: "You're scaling lifecycle marketing but probably still treating email as a broadcast channel. Three quick wins that took one brand from 18% to 41% repeat-purchase rate in 60 days. Trade for a coffee?"`,
    content: `Most AI search optimization posts read like SEO content from 2019. Here's a sharper angle.

Three signals that the search game changed:

1. Zero-click is now 65%+ of queries. If your content strategy still ends at "rank on page 1," you've already lost.

2. AI Overviews cite sources by entity authority, not backlinks. Your Wikipedia, Crunchbase, and About page structure now matters more than your DR.

3. Branded search volume is the new moat. Every unbranded click you win is a leaky bucket if nobody searches for you next time.

We rebuilt a $40M ARR SaaS client's content engine around these three signals last quarter. Result: 4.2x increase in AI Overview citations, 28% lift in branded search.

The full teardown is in our newsletter. Link in comments.`,
    analytics: `Current state:
- Ad spend: $80,000
- Purchases: 4,200
- Revenue: 4,200 × $52 = $218,400
- CAC (blended): $80,000 / 4,200 = $19.05
- MER: $218,400 / $80,000 = 2.73×

These numbers look healthy. The danger: MER is a vanity ratio if you don't know which campaigns drove the 4,200.

90-day reallocation plan:
- Move 30% of bottom-quartile ad sets (by 7-day ROAS) into creator UGC testing
- Stand up server-side CAPI + first-party signals (you're losing ~22% of conversions to iOS attribution loss)
- Add a post-purchase email/SMS flow (current repeat rate of ~11% is leaving ~$24K/mo on the table)
- Kill branded search from paid once you reach 70% organic share for branded terms

Expected outcome at day 90: MER 2.73 → 3.4, true CAC $19 → $14.`,
    general: `Subject: Quick question about agency churn

Hi {first_name},

Not pitching anything — genuinely curious.

How many agencies have you churned through in the last 18 months? If the answer is 2+, you already know the playbook: kickoff deck, big promises, three months of "we're still optimizing," then a quarterly review that reveals the real numbers were never going to work.

The thing nobody talks about: agency churn isn't a vendor problem. It's a model problem. Retainers incentivize hours, not outcomes. So you get billed for activity whether it moves revenue or not.

We flipped it. One flat fee tied to a forecast. Miss the number, we eat the difference. Hit it, we share the upside.

Worth 15 minutes to see if it'd work for {company}? No deck, no pitch — just the model.

— BAZ`,
  };
  return {
    agent,
    output: map[agent].replace('{prompt}', prompt.slice(0, 60)),
    provider: 'simulated',
    model: agent,
    ms,
  };
}
