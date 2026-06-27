'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Totals {
  leads: number;
  new: number;
  qualified: number;
  won: number;
  customers: number;
  mrr: number;
}

const PIPELINE_STAGES: Array<{ id: 'new' | 'contacted' | 'qualified' | 'proposal' | 'won' | 'lost'; name: string; tone: 'info' | 'accent' | 'warning' | 'success' | 'muted' }> = [
  { id: 'new',       name: 'New',       tone: 'info' },
  { id: 'contacted', name: 'Contacted', tone: 'accent' },
  { id: 'qualified', name: 'Qualified', tone: 'warning' },
  { id: 'proposal',  name: 'Proposal',  tone: 'warning' },
  { id: 'won',       name: 'Won',       tone: 'success' },
  { id: 'lost',      name: 'Lost',      tone: 'muted' },
];

const SCOUT_CATEGORIES = [
  'restaurant', 'plumber', 'hvac', 'electrician', 'salon', 'barber',
  'dentist', 'gym', 'landscaper', 'auto shop', 'contractor', 'med spa',
] as const;
type ScoutCategory = typeof SCOUT_CATEGORIES[number];

const SCOUT_STATUSES = ['scouted', 'walked-in', 'demo-sent', 'replied', 'closed', 'lost'] as const;
type ScoutStatus = typeof SCOUT_STATUSES[number];

interface ScoutLead {
  id: string;
  business: string;
  owner: string;
  phone: string;
  category: ScoutCategory;
  notes: string;
  status: ScoutStatus;
  createdAt: number;
}

const SCOUT_KEY = 'baz.console.scout.v1';
const ACTIVITY_KEY = 'baz.console.activity.v1';

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function loadScout(): ScoutLead[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(SCOUT_KEY) ?? '[]'); } catch { return []; }
}
function saveScout(rows: ScoutLead[]) {
  try { localStorage.setItem(SCOUT_KEY, JSON.stringify(rows)); } catch {}
}

function loadActivity() {
  if (typeof window === 'undefined') return {} as Record<string, { walkIns: number; calls: number; demos: number; closes: number }>;
  try { return JSON.parse(localStorage.getItem(ACTIVITY_KEY) ?? '{}'); } catch { return {}; }
}
function saveActivity(map: Record<string, { walkIns: number; calls: number; demos: number; closes: number }>) {
  try { localStorage.setItem(ACTIVITY_KEY, JSON.stringify(map)); } catch {}
}

export function ConsoleClient({ totals }: { totals: Totals }) {
  const [tab, setTab] = useState<'pipeline' | 'scout' | 'activity' | 'income' | 'tools'>('pipeline');

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-ink-100 pb-3">
        {([
          ['pipeline',  `Pipeline · ${totals.leads}`],
          ['scout',     `Scout list`],
          ['activity',  `Today's activity`],
          ['income',    `Income calculator`],
          ['tools',     `AI tools`],
        ] as const).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${
              tab === id ? 'bg-ink-900 text-paper' : 'text-ink-700 hover:text-ink-900'
            }`}
          >
            {label}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <Link href="/admin" className="text-sm text-ink-700 hover:text-accent">Admin →</Link>
        </div>
      </div>

      {tab === 'pipeline' && <PipelinePanel totals={totals} />}
      {tab === 'scout'    && <ScoutPanel />}
      {tab === 'activity' && <ActivityPanel />}
      {tab === 'income'   && <IncomePanel totals={totals} />}
      {tab === 'tools'    && <ToolsPanel />}
    </div>
  );
}

/* ---------- Pipeline (Phase 6/7) ---------- */

function PipelinePanel({ totals }: { totals: Totals }) {
  const [leads, setLeads] = useState<Array<{ id: string; name: string; company: string; email: string; status: string; score: number; message: string; created_at: number }>>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    try {
      const r = await fetch('/api/leads?limit=200');
      const j = await r.json();
      if (j.ok) setLeads(j.leads);
    } finally { setLoading(false); }
  }

  useEffect(() => { refresh(); }, []);

  async function moveStage(id: string, status: string) {
    await fetch(`/api/leads?id=${id}`, {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ status }),
    });
    setEditingId(null);
    refresh();
  }

  const grouped = PIPELINE_STAGES.map((stage) => ({
    ...stage,
    leads: leads.filter((l) => l.status === stage.id),
  }));

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm text-ink-600">
            <b className="text-ink-900">{totals.new}</b> new · <b className="text-ink-900">{totals.qualified}</b> qualified · <b className="text-ink-900">{totals.won}</b> won · <b className="text-ink-900">{totals.customers}</b> active customers
          </p>
        </div>
        <button onClick={refresh} className="text-sm text-ink-700 hover:text-accent">Refresh</button>
      </div>

      {loading ? <p className="text-sm text-ink-500">Loading…</p> : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {grouped.map((stage) => (
            <div key={stage.id} className="bg-paper-50 rounded-2xl border border-ink-100 p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-display text-sm font-medium tracking-[-0.02em]">{stage.name}</h3>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">{stage.leads.length}</span>
              </div>
              <div className="space-y-2">
                {stage.leads.length === 0 && (
                  <p className="text-xs text-ink-400 py-2">—</p>
                )}
                {stage.leads.slice(0, 8).map((l) => (
                  <div
                    key={l.id}
                    className="bg-white rounded-lg border border-ink-100 p-3 cursor-pointer hover:border-ink-900"
                    onClick={() => setEditingId(editingId === l.id ? null : l.id)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-ink-900 truncate">{l.name}</p>
                        <p className="text-xs text-ink-500 truncate">{l.company || l.email}</p>
                      </div>
                      {l.score > 0 && (
                        <span className={`font-mono text-[10px] tabular-nums px-1.5 py-0.5 rounded ${
                          l.score >= 70 ? 'bg-success/10 text-success' :
                          l.score >= 40 ? 'bg-warning/10 text-warning' :
                          'bg-ink-100 text-ink-500'
                        }`}>{l.score}</span>
                      )}
                    </div>
                    {editingId === l.id && (
                      <div className="mt-3 pt-3 border-t border-ink-100 space-y-2">
                        {l.message && <p className="text-xs text-ink-600 line-clamp-2">{l.message}</p>}
                        <div className="flex flex-wrap gap-1.5">
                          {PIPELINE_STAGES.filter((s) => s.id !== l.status).map((s) => (
                            <button
                              key={s.id}
                              type="button"
                              onClick={(e) => { e.stopPropagation(); moveStage(l.id, s.id); }}
                              className="font-mono text-[10px] uppercase tracking-[0.12em] px-2 py-1 rounded-full bg-paper-200 hover:bg-ink-900 hover:text-paper text-ink-700"
                            >
                              → {s.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* ---------- Scout list (Phase 4) ---------- */

function ScoutPanel() {
  const [rows, setRows] = useState<ScoutLead[]>([]);
  const [draft, setDraft] = useState<Partial<ScoutLead>>({});

  useEffect(() => { setRows(loadScout()); }, []);

  function persist(next: ScoutLead[]) {
    setRows(next);
    saveScout(next);
  }

  function add() {
    if (!draft.business?.trim()) return;
    const newRow: ScoutLead = {
      id: `sc_${Date.now().toString(36)}`,
      business: draft.business.trim(),
      owner:    draft.owner?.trim() ?? '',
      phone:    draft.phone?.trim() ?? '',
      category: (draft.category as ScoutCategory) ?? 'restaurant',
      notes:    draft.notes?.trim() ?? '',
      status:   'scouted',
      createdAt: Date.now(),
    };
    persist([newRow, ...rows]);
    setDraft({});
  }

  function setStatus(id: string, status: ScoutStatus) {
    persist(rows.map((r) => r.id === id ? { ...r, status } : r));
  }

  function remove(id: string) {
    persist(rows.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-6">
      <div className="bg-paper-50 rounded-2xl border border-ink-100 p-5">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-4">Add a business</h3>
        <div className="grid sm:grid-cols-5 gap-2">
          <input className="input" placeholder="Business name" value={draft.business ?? ''} onChange={(e) => setDraft({ ...draft, business: e.target.value })} />
          <input className="input" placeholder="Owner" value={draft.owner ?? ''} onChange={(e) => setDraft({ ...draft, owner: e.target.value })} />
          <input className="input" placeholder="Phone" value={draft.phone ?? ''} onChange={(e) => setDraft({ ...draft, phone: e.target.value })} />
          <select className="input" value={draft.category ?? 'restaurant'} onChange={(e) => setDraft({ ...draft, category: e.target.value as ScoutCategory })}>
            {SCOUT_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <button type="button" onClick={add} className="h-11 rounded-full bg-ink-900 text-paper text-sm font-medium hover:bg-ink-800">Add</button>
        </div>
        <textarea
          className="input mt-2"
          placeholder="What did you notice? (no website / bad reviews / no booking — your opening)"
          rows={2}
          value={draft.notes ?? ''}
          onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
        />
      </div>

      <p className="text-sm text-ink-500">{rows.length} businesses on the list · aim for 50 to start</p>

      {rows.length === 0 ? (
        <div className="bg-paper-50 rounded-2xl border border-ink-100 p-12 text-center">
          <p className="text-ink-700 mb-2">No businesses yet.</p>
          <p className="text-sm text-ink-500">Pick a category. Walk the neighborhood. Add the first 5 today.</p>
        </div>
      ) : (
        <div className="bg-paper-50 rounded-2xl border border-ink-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-paper-200 text-ink-700">
              <tr className="text-left">
                <th className="px-3 py-2 font-medium">Business</th>
                <th className="px-3 py-2 font-medium">Owner</th>
                <th className="px-3 py-2 font-medium">Phone</th>
                <th className="px-3 py-2 font-medium">Category</th>
                <th className="px-3 py-2 font-medium">Status</th>
                <th className="px-3 py-2 font-medium">Notes</th>
                <th className="px-3 py-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t border-ink-100">
                  <td className="px-3 py-2 font-medium text-ink-900">{r.business}</td>
                  <td className="px-3 py-2 text-ink-700">{r.owner}</td>
                  <td className="px-3 py-2 text-ink-700">{r.phone}</td>
                  <td className="px-3 py-2 text-ink-700">{r.category}</td>
                  <td className="px-3 py-2">
                    <select value={r.status} onChange={(e) => setStatus(r.id, e.target.value as ScoutStatus)} className="text-xs">
                      {SCOUT_STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                  <td className="px-3 py-2 text-ink-600 max-w-xs truncate">{r.notes}</td>
                  <td className="px-3 py-2 text-right">
                    <button onClick={() => remove(r.id)} className="text-xs text-ink-500 hover:text-accent">Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <style jsx>{`
        :global(.input) {
          width: 100%;
          padding: 10px 14px;
          border-radius: 12px;
          background: white;
          border: 1px solid rgb(214 214 211);
          font-size: 14px;
          color: rgb(14 14 16);
        }
        :global(.input:focus) {
          outline: none;
          border-color: rgb(255 59 47);
          box-shadow: 0 0 0 2px rgb(255 59 47 / 0.15);
        }
      `}</style>
    </div>
  );
}

/* ---------- Activity (Phase 9: daily number) ---------- */

function ActivityPanel() {
  const [map, setMap] = useState<Record<string, { walkIns: number; calls: number; demos: number; closes: number }>>({});
  const today = todayKey();
  const todayActivity = map[today] ?? { walkIns: 0, calls: 0, demos: 0, closes: 0 };

  useEffect(() => { setMap(loadActivity()); }, []);

  function update(field: 'walkIns' | 'calls' | 'demos' | 'closes', delta: number) {
    const next = { ...map };
    next[today] = { ...todayActivity, [field]: Math.max(0, todayActivity[field] + delta) };
    setMap(next);
    saveActivity(next);
  }

  const last7 = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(); d.setDate(d.getDate() - (6 - i));
    const key = d.toISOString().slice(0, 10);
    return { key, label: d.toLocaleDateString('en-US', { weekday: 'short' }), n: map[key] ?? { walkIns: 0, calls: 0, demos: 0, closes: 0 } };
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-1">Today · {today}</h3>
        <p className="text-sm text-ink-500">Set a daily number. Most days, walk-ins are the only thing that moves.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {([
          ['walkIns', 'Walk-ins'],
          ['calls',    'Calls'],
          ['demos',    'Demos'],
          ['closes',   'Closes'],
        ] as const).map(([key, label]) => (
          <div key={key} className="bg-paper-50 rounded-2xl border border-ink-100 p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500 mb-1">{label}</p>
            <p className="font-display text-4xl font-medium tracking-[-0.03em] text-ink-900 mb-4">{todayActivity[key]}</p>
            <div className="flex gap-1">
              <button type="button" onClick={() => update(key, -1)} className="w-9 h-9 rounded-full bg-paper-200 hover:bg-ink-200 text-ink-700">−</button>
              <button type="button" onClick={() => update(key, +1)} className="w-9 h-9 rounded-full bg-ink-900 hover:bg-ink-800 text-paper">+</button>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-paper-50 rounded-2xl border border-ink-100 p-5">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-4">Last 7 days · walk-ins</h3>
        <div className="grid grid-cols-7 gap-2 items-end h-32">
          {last7.map((d) => {
            const max = Math.max(1, ...last7.map((x) => x.n.walkIns));
            const h = Math.round((d.n.walkIns / max) * 100);
            return (
              <div key={d.key} className="flex flex-col items-center gap-1">
                <div className="w-full bg-ink-200 rounded-t" style={{ height: `${h}%`, minHeight: d.n.walkIns > 0 ? 4 : 0 }}>
                  <div className="w-full h-full bg-ink-900 rounded-t" />
                </div>
                <span className="font-mono text-[10px] text-ink-500">{d.label}</span>
                <span className="font-mono text-[10px] text-ink-900">{d.n.walkIns}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Income calculator (Phase 8) ---------- */

function IncomePanel({ totals }: { totals: Totals }) {
  const [websitesPerMonth, setWebsitesPerMonth] = useState(8);
  const [pricePerSite, setPricePerSite] = useState(800);
  const [joeyCostPerSite, setJoeyCostPerSite] = useState(120);
  const [recurringClients, setRecurringClients] = useState(5);
  const [recurringPerClient, setRecurringPerClient] = useState(300);

  const websiteRevenue = websitesPerMonth * pricePerSite;
  const websiteCost = websitesPerMonth * joeyCostPerSite;
  const websiteProfit = websiteRevenue - websiteCost;
  const platformFixed = 20; // Ollama per playbook
  const recurringRevenue = recurringClients * recurringPerClient;
  const monthlyProfit = websiteProfit + recurringRevenue - platformFixed;

  return (
    <div className="grid lg:grid-cols-2 gap-6">
      <div className="bg-paper-50 rounded-2xl border border-ink-100 p-6 space-y-4">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em]">Inputs</h3>

        <NumberField label="Websites / month"        value={websitesPerMonth}   onChange={setWebsitesPerMonth}   hint="How many sites you ship" />
        <NumberField label="Price per site ($)"      value={pricePerSite}       onChange={setPricePerSite}       hint="What the client pays" />
        <NumberField label="Joey cost per site ($)"  value={joeyCostPerSite}    onChange={setJoeyCostPerSite}    hint="What the builder earns" />
        <NumberField label="Recurring clients"       value={recurringClients}   onChange={setRecurringClients}   hint="On email + ads retainers" />
        <NumberField label="Recurring / client ($)"  value={recurringPerClient} onChange={setRecurringPerClient} hint="Monthly retainer per client" />

        <div className="pt-4 border-t border-ink-100 text-xs text-ink-500 space-y-1">
          <p>Platform fixed (Ollama): $20/mo</p>
          <p>Current MRR from real customers: <b className="text-ink-900">${(totals.mrr / 100).toLocaleString()}</b></p>
        </div>
      </div>

      <div className="bg-ink-900 text-paper rounded-2xl p-6 space-y-4">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em]">Monthly profit</h3>

        <Row label="Website revenue"   value={`$${websiteRevenue.toLocaleString()}`} />
        <Row label="Joey cost"         value={`-$${websiteCost.toLocaleString()}`} dim />
        <Row label="Website profit"    value={`$${websiteProfit.toLocaleString()}`} bold />
        <Row label="Recurring revenue" value={`$${recurringRevenue.toLocaleString()}`} />
        <Row label="Platform fixed"    value={`-$${platformFixed}`} dim />
        <div className="border-t border-paper/15 pt-3">
          <Row label="Total monthly profit" value={`$${monthlyProfit.toLocaleString()}`} big />
          <p className="mt-1 text-xs text-paper-300">≈ ${(monthlyProfit * 12).toLocaleString()}/year</p>
        </div>

        <p className="mt-4 text-xs text-paper-300 leading-relaxed">
          Margin on every website: <b>{websiteRevenue > 0 ? Math.round((websiteProfit / websiteRevenue) * 100) : 0}%</b>.
          Recurring is near-pure profit on top of the same platform.
        </p>
      </div>
    </div>
  );
}

function NumberField({ label, value, onChange, hint }: { label: string; value: number; onChange: (n: number) => void; hint?: string }) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">{label}</span>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Math.max(0, parseInt(e.target.value, 10) || 0))}
        className="mt-1 w-full px-3 h-11 rounded-xl bg-white border border-ink-200 text-ink-900 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
      />
      {hint && <span className="block mt-1 text-xs text-ink-500">{hint}</span>}
    </label>
  );
}

function Row({ label, value, dim, bold, big }: { label: string; value: string; dim?: boolean; bold?: boolean; big?: boolean }) {
  return (
    <div className={`flex items-center justify-between ${big ? 'py-1' : ''}`}>
      <span className={`${dim ? 'text-paper-300' : 'text-paper'} ${big ? 'text-base' : 'text-sm'}`}>{label}</span>
      <span className={`font-display tabular-nums ${big ? 'text-4xl font-medium' : bold ? 'text-xl font-medium' : 'text-base'} ${dim ? 'text-paper-300' : 'text-paper'}`}>{value}</span>
    </div>
  );
}

/* ---------- AI Tools launcher (Phase 2) ---------- */

function ToolsPanel() {
  const [agents, setAgents] = useState<Array<{ id: string; name: string; icon: string; description: string; outputFormat: string }>>([]);
  const [kind, setKind] = useState('leadgen');
  const [input, setInput] = useState('');
  const [result, setResult] = useState<{ text: string | null; provider: string | null; error?: string } | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    fetch('/api/agents').then((r) => r.json()).then((j) => setAgents(j.agents));
  }, []);

  async function run() {
    setRunning(true);
    setResult(null);
    try {
      const r = await fetch('/api/agents', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ kind, prompt: input }),
      });
      const j = await r.json();
      setResult({ text: j.text, provider: j.provider, error: j.error });
    } catch (err: any) {
      setResult({ text: null, provider: null, error: err?.message ?? 'unknown' });
    } finally { setRunning(false); }
  }

  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-3">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-3">Agents</h3>
        {agents.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => setKind(a.id)}
            className={`w-full text-left p-4 rounded-xl border transition-all ${
              kind === a.id ? 'border-ink-900 bg-white shadow-soft' : 'border-ink-100 bg-paper-50 hover:border-ink-300'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-lg bg-ink-900 text-paper font-display text-lg">{a.icon}</span>
              <div className="min-w-0">
                <b className="text-ink-900">{a.name}</b>
                <p className="text-xs text-ink-500 line-clamp-1">{a.description}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="lg:col-span-2 bg-paper-50 rounded-2xl border border-ink-100 p-5 space-y-4">
        <h3 className="font-display text-lg font-medium tracking-[-0.02em]">Run · {kind}</h3>
        <textarea
          className="w-full px-4 py-3 rounded-xl bg-white border border-ink-200 text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
          rows={6}
          placeholder="Paste the input (lead message, content topic, metrics dump, etc.)"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <div className="flex items-center justify-between">
          <p className="text-xs text-ink-500">Output format: <code className="font-mono">{agents.find((a) => a.id === kind)?.outputFormat ?? '—'}</code></p>
          <button
            type="button"
            onClick={run}
            disabled={running || !input.trim()}
            className="h-11 px-6 rounded-full bg-ink-900 hover:bg-ink-800 text-paper text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {running ? 'Running…' : 'Run agent'}
          </button>
        </div>

        {result && (
          <div className="border-t border-ink-100 pt-4">
            {result.text ? (
              <pre className="bg-white border border-ink-100 rounded-xl p-4 text-xs whitespace-pre-wrap font-mono overflow-x-auto">{result.text}</pre>
            ) : (
              <p className="text-sm text-warning">{result.error ?? 'No output'}</p>
            )}
            {result.provider && <p className="mt-2 text-xs text-ink-500">via {result.provider}</p>}
          </div>
        )}
      </div>
    </div>
  );
}