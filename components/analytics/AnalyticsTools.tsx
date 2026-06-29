'use client';

import { useMemo, useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { cn } from '@/lib/cn';
import {
  attributeAll,
  adstock,
  hillResponse,
  rfmScore,
  rfmSummary,
  optimizeBudget,
  parseRfmCsv,
  sampleJourneys,
  sampleSpend,
  sampleRfm,
  sampleChannels,
  formatUsd,
  formatNumber,
  downloadCsv,
  type AttributionModel,
  type AdStockParams,
  type RfmRecord,
  type ChannelDiminishingReturns,
} from '@/lib/analytics-tools';

const ATTRIBUTION_MODELS: { id: AttributionModel; label: string; sub: string }[] = [
  { id: 'first-touch',     label: 'First-touch',     sub: '100% to the first touchpoint.' },
  { id: 'last-touch',      label: 'Last-touch',      sub: '100% to the final touchpoint.' },
  { id: 'linear',          label: 'Linear',          sub: 'Equal credit across all touchpoints.' },
  { id: 'time-decay',      label: 'Time decay',      sub: 'Half-life 7d — recent touches earn more.' },
  { id: 'position-based',  label: 'Position-based',  sub: '40/20/40 — first, middle, last.' },
  { id: 'data-driven',     label: 'Data-driven',     sub: 'Approx. Shapley values across journeys.' },
];

type Tab = 'attribution' | 'adstock' | 'rfm' | 'budget';

export function AnalyticsTools() {
  const [tab, setTab] = useState<Tab>('attribution');

  return (
    <div>
      {/* Tab bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {([
          { id: 'attribution', label: 'Attribution', tagline: 'Model credit across journeys.' },
          { id: 'adstock',     label: 'AdStock',     tagline: 'Media carryover curve.' },
          { id: 'rfm',         label: 'RFM',         tagline: 'Segment customers.' },
          { id: 'budget',      label: 'Budget',      tagline: 'Reallocate by marginal CAC.' },
        ] as { id: Tab; label: string; tagline: string }[]).map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={cn(
              'group rounded-2xl border px-5 py-3 text-left transition-all',
              tab === t.id
                ? 'border-ink-900 bg-paper shadow-soft'
                : 'border-ink-100 bg-paper hover:border-ink-300'
            )}
          >
            <p className={cn('font-mono uppercase tracking-[0.18em] text-[11px]', tab === t.id ? 'text-accent' : 'text-ink-400')}>{t.id}</p>
            <p className="font-display text-xl font-medium tracking-[-0.02em]">{t.label}</p>
            <p className="text-xs text-ink-500 mt-0.5">{t.tagline}</p>
          </button>
        ))}
      </div>

      {tab === 'attribution' && <AttributionPanel />}
      {tab === 'adstock' && <AdStockPanel />}
      {tab === 'rfm' && <RfmPanel />}
      {tab === 'budget' && <BudgetPanel />}
    </div>
  );
}

// ============================================================
// Attribution
// ============================================================

function AttributionPanel() {
  const [model, setModel] = useState<AttributionModel>('data-driven');
  const [journeySeed, setJourneySeed] = useState(42);

  const journeys = useMemo(() => sampleJourneys(journeySeed), [journeySeed]);
  const result = useMemo(() => attributeAll(journeys, model), [journeys, model]);

  const rows = Object.entries(result.byChannel)
    .map(([channel, v]) => ({
      channel,
      credit: v.credit,
      conversions: v.conversions,
      revenue: v.revenue,
      cpa: v.conversions > 0 ? v.revenue / v.conversions : 0,
    }))
    .sort((a, b) => b.credit - a.credit);

  const totalCredit = rows.reduce((s, r) => s + r.credit, 0) || 1;
  const totalConv = rows.reduce((s, r) => s + r.conversions, 0) || 1;

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      <aside className="rounded-2xl border border-ink-100 bg-paper p-5">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-3">Model</p>
        <ul className="space-y-1.5">
          {ATTRIBUTION_MODELS.map((m) => (
            <li key={m.id}>
              <button
                type="button"
                onClick={() => setModel(m.id)}
                aria-pressed={model === m.id}
                className={cn(
                  'w-full text-left px-3 py-2.5 rounded-xl border transition-colors',
                  model === m.id ? 'border-ink-900 bg-paper-50 shadow-soft' : 'border-ink-100 bg-paper hover:border-ink-300'
                )}
              >
                <span className="block text-sm font-medium">{m.label}</span>
                <span className="block text-xs text-ink-500">{m.sub}</span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-5 pt-5 border-t border-ink-100">
          <label className="block">
            <span className="block font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">Sample seed</span>
            <input
              type="number"
              value={journeySeed}
              onChange={(e) => setJourneySeed(Number(e.target.value) || 0)}
              className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm"
            />
            <span className="block text-[11px] text-ink-400 mt-1">Change to draw a new dataset of 120 journeys.</span>
          </label>
        </div>
        <div className="mt-5 pt-5 border-t border-ink-100 text-sm">
          <p className="flex items-center justify-between"><span className="text-ink-500">Journeys</span><span className="font-mono">{formatNumber(result.journeys)}</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Conversions</span><span className="font-mono">{formatNumber(result.conversions)}</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Conv. rate</span><span className="font-mono">{((result.conversions / Math.max(1, result.journeys)) * 100).toFixed(1)}%</span></p>
        </div>
        <div className="mt-5">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => downloadCsv('attribution.csv', [['channel', 'credit', 'conversions', 'revenue', 'cpa'], ...rows.map((r) => [r.channel, r.credit.toFixed(2), r.conversions.toFixed(2), r.revenue.toFixed(2), r.cpa.toFixed(2)])])}
            trackAs="analytics_attribution_export"
          >
            Export CSV
          </Button>
        </div>
      </aside>

      <section className="rounded-2xl border border-ink-100 bg-paper p-5 md:p-6">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">Channel credit — {ATTRIBUTION_MODELS.find((m) => m.id === model)?.label}</p>
        <h2 className="font-display text-3xl font-medium tracking-[-0.02em] mb-1">Where the credit goes.</h2>
        <p className="text-sm text-ink-500 mb-6">Share of attributed conversions across the 120 simulated journeys.</p>

        <ul className="space-y-3">
          {rows.map((r) => {
            const widthPct = (r.credit / totalCredit) * 100;
            const convPct = (r.conversions / totalConv) * 100;
            return (
              <li key={r.channel} className="bg-paper-50 rounded-xl border border-ink-100 p-4">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="font-medium text-sm">{r.channel}</span>
                  <span className="font-mono text-xs text-ink-500">{r.credit.toFixed(1)} conv · {formatUsd(r.revenue)}</span>
                </div>
                <div className="relative h-2 rounded-full bg-ink-100 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-accent transition-all" style={{ width: `${widthPct}%` }} />
                </div>
                <div className="mt-2 flex items-baseline justify-between text-[11px] font-mono text-ink-400">
                  <span>credit: {widthPct.toFixed(1)}%</span>
                  <span>of conversions: {convPct.toFixed(1)}%</span>
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-ink-500">
          Model differences matter most when a single channel &quot;captures&quot; credit under the wrong lens. Compare last-touch vs data-driven across paid search and organic to expose over-investment.
        </p>
      </section>
    </div>
  );
}

// ============================================================
// AdStock
// ============================================================

function AdStockPanel() {
  const [retention, setRetention] = useState(0.5);
  const [maxLag, setMaxLag] = useState(8);
  const [seed, setSeed] = useState(7);
  const [params, setParams] = useState<AdStockParams>({ retention: 0.5, maxLag: 8 });
  const spend = useMemo(() => sampleSpend(seed), [seed]);
  const result = useMemo(() => adstock(spend, params), [spend, params]);

  const apply = () => setParams({ retention, maxLag });
  const max = Math.max(...result.values, 1);

  return (
    <div className="grid lg:grid-cols-[320px_1fr] gap-6">
      <aside className="rounded-2xl border border-ink-100 bg-paper p-5">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-3">Parameters</p>
        <label className="block">
          <span className="flex items-center justify-between text-sm font-medium mb-1.5">
            <span>Retention rate</span>
            <span className="font-mono">{retention.toFixed(2)}</span>
          </span>
          <input type="range" min={0.05} max={0.95} step={0.05} value={retention} onChange={(e) => setRetention(Number(e.target.value))} className="w-full accent-accent" />
          <span className="block text-[11px] text-ink-400 mt-1">Higher = longer carryover. TV ≈ 0.5, paid search ≈ 0.2.</span>
        </label>

        <label className="block mt-5">
          <span className="flex items-center justify-between text-sm font-medium mb-1.5">
            <span>Max lag (weeks)</span>
            <span className="font-mono">{maxLag}</span>
          </span>
          <input type="range" min={1} max={16} step={1} value={maxLag} onChange={(e) => setMaxLag(Number(e.target.value))} className="w-full accent-accent" />
        </label>

        <label className="block mt-5">
          <span className="block text-sm font-medium mb-1.5">Sample seed</span>
          <input type="number" value={seed} onChange={(e) => setSeed(Number(e.target.value) || 0)} className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-sm" />
        </label>

        <Magnetic strength={0.25}>
          <Button variant="primary" size="sm" className="w-full mt-5" onClick={apply} trackAs="analytics_adstock_apply">
            Apply parameters
          </Button>
        </Magnetic>

        <div className="mt-5 pt-5 border-t border-ink-100 text-sm">
          <p className="flex items-center justify-between"><span className="text-ink-500">Half-life</span><span className="font-mono">{result.halfLife.toFixed(1)} wk</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Peak week</span><span className="font-mono">w{result.peak.index + 1}</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Peak value</span><span className="font-mono">{formatUsd(result.peak.value)}</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Total carryover</span><span className="font-mono">{formatUsd(result.totalCarryover)}</span></p>
        </div>
      </aside>

      <section className="rounded-2xl border border-ink-100 bg-paper p-5 md:p-6">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">AdStock curve · 16 weeks</p>
        <h2 className="font-display text-3xl font-medium tracking-[-0.02em] mb-1">Spend decays. Awareness doesn&apos;t.</h2>
        <p className="text-sm text-ink-500 mb-6">Each bar is weekly spend; the line is the carryover-adjusted adstock.</p>

        <Chart
          bars={spend.map((v) => ({ value: v, color: '#0e0e10' }))}
          line={result.values}
          maxBar={Math.max(...spend, 1)}
          maxLine={max}
        />

        <div className="mt-6 grid sm:grid-cols-3 gap-3 text-sm">
          <Mini label="Total spend"    value={formatUsd(spend.reduce((a, b) => a + b, 0))} />
          <Mini label="Total adstock"  value={formatUsd(result.values.reduce((a, b) => a + b, 0))} />
          <Mini label="Lift (carryover)" value={`+${((result.values.reduce((a, b) => a + b, 0) / Math.max(1, spend.reduce((a, b) => a + b, 0)) - 1) * 100).toFixed(0)}%`} />
        </div>
      </section>
    </div>
  );
}

function Chart({ bars, line, maxBar, maxLine }: { bars: { value: number; color: string }[]; line: number[]; maxBar: number; maxLine: number }) {
  const W = 600;
  const H = 220;
  const PAD_L = 36, PAD_R = 12, PAD_T = 8, PAD_B = 22;
  const innerW = W - PAD_L - PAD_R;
  const innerH = H - PAD_T - PAD_B;
  const n = bars.length;
  const barW = innerW / n * 0.7;
  const gap = innerW / n - barW;

  const path = line
    .map((v, i) => {
      const x = PAD_L + i * (barW + gap) + barW / 2;
      const y = PAD_T + innerH * (1 - v / maxLine);
      return `${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-auto" role="img" aria-label="AdStock chart">
      {/* Grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <line key={p} x1={PAD_L} y1={PAD_T + innerH * p} x2={W - PAD_R} y2={PAD_T + innerH * p} stroke="#ececea" strokeWidth={1} />
      ))}
      {/* Bars */}
      {bars.map((b, i) => {
        const x = PAD_L + i * (barW + gap);
        const h = innerH * (b.value / maxBar);
        const y = PAD_T + innerH - h;
        return <rect key={i} x={x} y={y} width={barW} height={h} fill={b.color} opacity={0.85} />;
      })}
      {/* Line */}
      <path d={path} fill="none" stroke="#ff3b2f" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {line.map((v, i) => {
        const x = PAD_L + i * (barW + gap) + barW / 2;
        const y = PAD_T + innerH * (1 - v / maxLine);
        return <circle key={i} cx={x} cy={y} r={2.5} fill="#ff3b2f" />;
      })}
      {/* X axis labels (every 4th) */}
      {bars.map((_, i) => i % 4 === 0 ? (
        <text key={i} x={PAD_L + i * (barW + gap) + barW / 2} y={H - 6} textAnchor="middle" fontSize="10" fontFamily="ui-monospace, monospace" fill="#7e7e79">w{i + 1}</text>
      ) : null)}
      {/* Y axis labels */}
      {[0, 0.5, 1].map((p) => (
        <text key={p} x={PAD_L - 6} y={PAD_T + innerH * (1 - p) + 3} textAnchor="end" fontSize="10" fontFamily="ui-monospace, monospace" fill="#7e7e79">{formatUsd(maxLine * p)}</text>
      ))}
    </svg>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-ink-100 bg-paper-50 p-4">
      <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400">{label}</p>
      <p className="mt-1 font-display text-2xl font-medium tracking-[-0.02em]">{value}</p>
    </div>
  );
}

// ============================================================
// RFM
// ============================================================

function RfmPanel() {
  const [records, setRecords] = useState<RfmRecord[]>(() => sampleRfm());
  const [csvText, setCsvText] = useState('');
  const [csvErr, setCsvErr] = useState<string | null>(null);

  const scored = useMemo(() => rfmScore(records), [records]);
  const summary = useMemo(() => rfmSummary(scored), [scored]);
  const maxCount = Math.max(...summary.map((s) => s.count), 1);
  const totalRevenue = summary.reduce((s, r) => s + r.revenue, 0);

  const onUploadCsv = () => {
    try {
      const parsed = parseRfmCsv(csvText);
      if (parsed.length === 0) throw new Error('No rows found.');
      setRecords(parsed);
      setCsvErr(null);
    } catch (e: any) {
      setCsvErr(e.message ?? 'Failed to parse CSV.');
    }
  };

  return (
    <div className="grid lg:grid-cols-[340px_1fr] gap-6">
      <aside className="rounded-2xl border border-ink-100 bg-paper p-5">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-3">Dataset</p>
        <p className="text-sm text-ink-700 mb-3">Sample dataset has 60 customers. Paste your own CSV to override.</p>
        <textarea
          value={csvText}
          onChange={(e) => setCsvText(e.target.value)}
          rows={6}
          placeholder={'customerId,lastPurchase,frequency,monetary\nc_001,2026-05-12,4,820\nc_002,2026-01-03,1,40'}
          className="w-full rounded-lg border border-ink-200 bg-paper px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent"
        />
        <div className="flex gap-2 mt-3">
          <Button variant="outline" size="sm" className="flex-1" onClick={() => { setRecords(sampleRfm()); setCsvText(''); setCsvErr(null); }} trackAs="analytics_rfm_sample">
            Reset sample
          </Button>
          <Button variant="primary" size="sm" className="flex-1" onClick={onUploadCsv} trackAs="analytics_rfm_upload">
            Use CSV
          </Button>
        </div>
        {csvErr && <p className="mt-2 text-xs text-accent">{csvErr}</p>}

        <div className="mt-5 pt-5 border-t border-ink-100 text-sm">
          <p className="flex items-center justify-between"><span className="text-ink-500">Customers</span><span className="font-mono">{formatNumber(records.length)}</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Segments</span><span className="font-mono">{summary.length}</span></p>
          <p className="flex items-center justify-between mt-1"><span className="text-ink-500">Total LTV</span><span className="font-mono">{formatUsd(totalRevenue)}</span></p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-full mt-5"
          onClick={() => downloadCsv(
            'rfm.csv',
            [['customerId', 'R', 'F', 'M', 'score', 'segment', 'monetary'],
             ...scored.map((r) => [r.customerId, r.R, r.F, r.M, r.score, r.segment, r.monetary])]
          )}
          trackAs="analytics_rfm_export"
        >
          Export scored CSV
        </Button>
      </aside>

      <section className="rounded-2xl border border-ink-100 bg-paper p-5 md:p-6">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">RFM segmentation</p>
        <h2 className="font-display text-3xl font-medium tracking-[-0.02em] mb-1">Who to spend the next dollar on.</h2>
        <p className="text-sm text-ink-500 mb-6">Quintile bucketing on R/F/M, mapped to 10 standard segments.</p>

        <ul className="space-y-2.5">
          {summary.map((s) => {
            const widthPct = (s.count / maxCount) * 100;
            return (
              <li key={s.segment} className="bg-paper-50 rounded-xl border border-ink-100 p-4">
                <div className="flex items-baseline justify-between gap-3 mb-2">
                  <span className="font-medium text-sm">{s.segment}</span>
                  <span className="font-mono text-xs text-ink-500">{formatNumber(s.count)} cust · {formatUsd(s.revenue)} LTV</span>
                </div>
                <div className="relative h-2 rounded-full bg-ink-100 overflow-hidden">
                  <div className="absolute inset-y-0 left-0 bg-accent transition-all" style={{ width: `${widthPct}%` }} />
                </div>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 text-xs text-ink-500">
          Champions and Loyal drive the bulk of LTV — protect them. Cant Lose Them and At Risk are the next-best retention targets.
        </p>
      </section>
    </div>
  );
}

// ============================================================
// Budget optimizer
// ============================================================

function BudgetPanel() {
  const [channels, setChannels] = useState<ChannelDiminishingReturns[]>(() => sampleChannels());
  const [totalBudget, setTotalBudget] = useState(() => sampleChannels().reduce((s, c) => s + c.spend, 0));

  const result = useMemo(() => optimizeBudget(totalBudget, channels), [totalBudget, channels]);
  const currentConversions = channels.reduce((s, c) => s + c.conversions, 0);
  const newConversions = result.reduce((s, r) => s + r.newConversions, 0);
  const lift = ((newConversions - currentConversions) / Math.max(1, currentConversions)) * 100;
  const totalRecommended = result.reduce((s, r) => s + r.recommended, 0);

  const setChannel = (idx: number, patch: Partial<ChannelDiminishingReturns>) => {
    setChannels((cs) => cs.map((c, i) => i === idx ? { ...c, ...patch } : c));
  };

  const liveCac = (c: ChannelDiminishingReturns) => hillResponse(c.spend, c.maxConversions, c.halfSaturation) > 0 ? c.spend / hillResponse(c.spend, c.maxConversions, c.halfSaturation) : 0;

  return (
    <div className="grid lg:grid-cols-[1fr_380px] gap-6">
      <section className="rounded-2xl border border-ink-100 bg-paper p-5 md:p-6">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">Channel curves</p>
        <h2 className="font-display text-3xl font-medium tracking-[-0.02em] mb-1">Diminishing returns, live.</h2>
        <p className="text-sm text-ink-500 mb-6">Hill curve: <code className="font-mono text-[11px]">conv = maxConv · spend / (spend + halfSat)</code></p>

        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-left text-[11px] font-mono uppercase tracking-[0.16em] text-ink-400 border-b border-ink-100">
              <th className="py-2">Channel</th>
              <th className="py-2 text-right">Spend /wk</th>
              <th className="py-2 text-right">Conv /wk</th>
              <th className="py-2 text-right">CAC</th>
              <th className="py-2 text-right">Half-sat</th>
              <th className="py-2 text-right">Max conv</th>
            </tr>
          </thead>
          <tbody>
            {channels.map((c, i) => (
              <tr key={c.channel} className="border-b border-ink-100 last:border-b-0">
                <td className="py-2.5 font-medium">{c.channel}</td>
                <td className="py-2.5 text-right">
                  <input type="number" value={c.spend} onChange={(e) => setChannel(i, { spend: Number(e.target.value) || 0 })} className="w-24 text-right rounded border border-ink-200 bg-paper px-2 py-1 text-sm font-mono" />
                </td>
                <td className="py-2.5 text-right font-mono">{formatNumber(c.conversions)}</td>
                <td className="py-2.5 text-right font-mono">{liveCac(c) > 0 ? formatUsd(liveCac(c)) : '—'}</td>
                <td className="py-2.5 text-right">
                  <input type="number" value={c.halfSaturation} onChange={(e) => setChannel(i, { halfSaturation: Number(e.target.value) || 1 })} className="w-24 text-right rounded border border-ink-200 bg-paper px-2 py-1 text-sm font-mono" />
                </td>
                <td className="py-2.5 text-right">
                  <input type="number" value={c.maxConversions} onChange={(e) => setChannel(i, { maxConversions: Number(e.target.value) || 1 })} className="w-24 text-right rounded border border-ink-200 bg-paper px-2 py-1 text-sm font-mono" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="mt-5 flex items-center gap-3">
          <label className="flex items-center gap-3">
            <span className="text-sm font-medium">Total weekly budget</span>
            <input
              type="number"
              value={totalBudget}
              onChange={(e) => setTotalBudget(Number(e.target.value) || 0)}
              className="w-32 rounded-lg border border-ink-200 bg-paper px-3 py-1.5 text-sm font-mono"
            />
          </label>
          <span className="text-xs text-ink-500 font-mono">current total: {formatUsd(channels.reduce((s, c) => s + c.spend, 0))} · recommended: {formatUsd(totalRecommended)}</span>
        </div>
      </section>

      <aside className="rounded-2xl border border-ink-100 bg-paper p-5 md:p-6">
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">Reallocation</p>
        <h2 className="font-display text-2xl font-medium tracking-[-0.02em] mb-1">Same budget, more conversions.</h2>
        <p className="text-sm text-ink-500 mb-5">Greedy marginal-CAC optimization. Pulls from least efficient, pushes to most.</p>

        <div className="grid grid-cols-2 gap-3 mb-5">
          <Mini label="Current conv"     value={formatNumber(Math.round(currentConversions))} />
          <Mini label="After reallocation" value={formatNumber(Math.round(newConversions))} />
          <Mini label="Lift"             value={`${lift >= 0 ? '+' : ''}${lift.toFixed(1)}%`} />
          <Mini label="Total budget"     value={formatUsd(totalBudget)} />
        </div>

        <ul className="space-y-2">
          {result.map((r) => {
            const deltaPct = r.current > 0 ? (r.delta / r.current) * 100 : 0;
            return (
              <li key={r.channel} className="bg-paper-50 rounded-xl border border-ink-100 p-3.5">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <span className="font-medium text-sm">{r.channel}</span>
                  <span className={cn('font-mono text-xs', r.delta > 0 ? 'text-success' : r.delta < 0 ? 'text-accent' : 'text-ink-400')}>
                    {r.delta > 0 ? '+' : ''}{formatUsd(r.delta)} ({deltaPct >= 0 ? '+' : ''}{deltaPct.toFixed(0)}%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-ink-400">
                  <span>{formatUsd(r.current)} → {formatUsd(r.recommended)}</span>
                  <span>{formatNumber(r.newConversions)} conv</span>
                </div>
              </li>
            );
          })}
        </ul>

        <Button
          variant="outline"
          size="sm"
          className="w-full mt-5"
          onClick={() => downloadCsv(
            'budget.csv',
            [['channel', 'current', 'recommended', 'delta', 'newConversions'],
             ...result.map((r) => [r.channel, r.current, r.recommended, r.delta, r.newConversions])]
          )}
          trackAs="analytics_budget_export"
        >
          Export CSV
        </Button>
      </aside>
    </div>
  );
}
