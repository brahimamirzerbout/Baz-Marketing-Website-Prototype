"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  Zap,
  Target,
  TrendingUp,
  Play,
  AlertCircle,
  CheckCircle2,
  Circle,
  Rocket,
} from "lucide-react";
import { ScrollReveal } from "@/components/beui/ScrollReveal";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://marketing-hub-roan.vercel.app";

interface TickAction {
  kind: string;
  detail: string;
}

interface LoopHealth {
  ok: boolean;
  last_tick_at: number | null;
  last_tick: {
    scored: number;
    routed: number;
    stepped: number;
    won: number;
    lost: number;
    actions: TickAction[];
  } | null;
  contacts_scored_24h: number;
  enrollments_active: number;
  deals_in_pipeline: number;
  pipeline_value: number;
  recent_wins_7d: number;
  triangle_velocity: number;
}

export default function CockpitPage() {
  const [health, setHealth] = useState<LoopHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`${HUB_URL}/api/triangle/health`);
        if (r.ok) setHealth(await r.json());
      } catch {}
      setLoading(false);
    }
    load();
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, []);

  async function runNow() {
    setRunning(true);
    try {
      await fetch(`${HUB_URL}/api/triangle/run`, { method: "POST" });
      const r = await fetch(`${HUB_URL}/api/triangle/health`);
      if (r.ok) setHealth(await r.json());
    } finally {
      setRunning(false);
    }
  }

  const h = health;
  const lastAgo = h?.last_tick_at ? Math.floor(Date.now() / 1000 - h.last_tick_at / 1000) : null;

  const stats = [
    { label: "Scored 24h", value: h?.contacts_scored_24h ?? 0, icon: Zap, color: "#4f7cff" },
    {
      label: "Active sequences",
      value: h?.enrollments_active ?? 0,
      icon: Activity,
      color: "#3ddc97",
    },
    {
      label: "Pipeline",
      value: h ? `$${Math.round(h.pipeline_value).toLocaleString()}` : "—",
      sub: `${h?.deals_in_pipeline ?? 0} deals`,
      icon: Target,
      color: "#8a8a8a",
    },
    {
      label: "Wins/day (7d)",
      value: h ? h.triangle_velocity.toFixed(2) : "—",
      icon: TrendingUp,
      color: "#a0a0a0",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <ScrollReveal y={12}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Rocket className="w-5 h-5 text-accent" />
              <p className="eyebrow-neutral">The Cockpit</p>
            </div>
            <h1 className="font-display text-3xl font-medium text-foreground">Pipeline Command</h1>
            <p className="text-sm text-muted-foreground mt-1">
              One screen a CMO can open on Monday morning.
            </p>
          </div>
          <button
            onClick={runNow}
            disabled={running || !h?.ok}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent hover:bg-primary/90 disabled:opacity-50 text-white font-medium text-sm transition-colors"
          >
            <Play className="w-4 h-4" />
            {running ? "Running…" : "Run tick now"}
          </button>
        </div>
      </ScrollReveal>

      {/* Loop status */}
      <ScrollReveal y={16} delay={0.1}>
        <div
          className={`rounded-2xl border p-4 flex items-center gap-3 ${
            h?.ok ? "border-emerald-500/30 bg-emerald-500/5" : "border-amber-500/30 bg-amber-500/5"
          }`}
        >
          {h?.ok ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-400" />
          )}
          <div className="flex-1">
            <div className="font-medium text-foreground">
              {h?.ok ? "Loop is alive" : "Loop has not ticked recently"}
            </div>
            <div className="text-xs text-muted-foreground/60">
              {lastAgo == null
                ? "Never"
                : lastAgo < 60
                  ? `${lastAgo}s ago`
                  : `${Math.floor(lastAgo / 60)}m ago`}
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal y={20} delay={0.2}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                className="rounded-2xl bg-primary border border-ink-800 p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4" style={{ color: s.color }} />
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60">
                    {s.label}
                  </span>
                </div>
                <p className="font-display text-2xl md:text-3xl font-medium text-foreground">
                  {s.value}
                </p>
                {s.sub && <p className="text-xs text-muted-foreground/60 mt-1">{s.sub}</p>}
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Last tick */}
      {h?.last_tick && (
        <ScrollReveal y={20} delay={0.3}>
          <div className="rounded-2xl border border-ink-800 bg-primary p-5">
            <h2 className="font-display text-lg font-medium text-foreground mb-4">Last tick</h2>
            <div className="grid grid-cols-5 gap-3 text-center">
              {[
                { label: "Scored", n: h.last_tick.scored, color: "text-blue-400" },
                { label: "Routed", n: h.last_tick.routed, color: "text-violet-400" },
                { label: "Stepped", n: h.last_tick.stepped, color: "text-cyan-400" },
                { label: "Won", n: h.last_tick.won, color: "text-emerald-400" },
                { label: "Lost", n: h.last_tick.lost, color: "text-rose-400" },
              ].map((c) => (
                <div key={c.label} className="rounded-xl bg-background py-3">
                  <div className={`text-2xl font-bold ${c.color}`}>{c.n}</div>
                  <div className="text-xs text-muted-foreground/60 mt-1">{c.label}</div>
                </div>
              ))}
            </div>

            {h.last_tick.actions?.length > 0 && (
              <div className="mt-5">
                <div className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground/60 mb-2">
                  Actions
                </div>
                <ul className="space-y-1 max-h-80 overflow-auto text-sm">
                  {h.last_tick.actions.slice(0, 50).map((a, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground">
                      {a.kind === "win" ? (
                        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      ) : a.kind === "loss" ? (
                        <AlertCircle className="w-3 h-3 text-rose-400" />
                      ) : (
                        <Circle className="w-3 h-3 text-foreground-600" />
                      )}
                      <span className="font-mono text-xs text-foreground0">{a.kind}</span>
                      <span>{a.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </ScrollReveal>
      )}

      {!loading && !h?.last_tick && (
        <div className="rounded-2xl border border-ink-800 p-8 text-center text-muted-foreground/60">
          No tick yet. Hit <em className="text-foreground">Run tick now</em> or wait 60s for the
          scheduler.
        </div>
      )}
    </div>
  );
}
