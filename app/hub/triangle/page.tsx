// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Activity,
  Play,
} from "lucide-react";
import { ScrollReveal } from "@/components/beui/ScrollReveal";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "http://localhost:3001";

export default function TrianglePage() {
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    async function load() {
      try {
        const r = await fetch(`${HUB_URL}/api/triangle/health`);
        if (r.ok) setHealth(await r.json());
      } catch {}
    }
    load();
    const t = setInterval(load, 10_000);
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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <ScrollReveal y={12}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <p className="eyebrow-neutral">Autonomous Loop</p>
            </div>
            <h1 className="font-display text-3xl font-medium text-foreground">Triangle Loop</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Marketing ↔ Sales ↔ Nova. Runs every 60s.
            </p>
          </div>
          <button
            onClick={runNow}
            disabled={running}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent hover:bg-primary/90 disabled:opacity-50 text-white font-medium text-sm"
          >
            <Play className="w-4 h-4" />
            {running ? "Running…" : "Run tick"}
          </button>
        </div>
      </ScrollReveal>

      {/* Triangle diagram */}
      <ScrollReveal y={16} delay={0.1}>
        <div className="rounded-2xl bg-primary border border-ink-800 p-8 flex justify-center">
          <svg viewBox="0 0 400 400" className="w-full max-w-sm" aria-hidden>
            <defs>
              <linearGradient id="grad-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ff5b1f" />
                <stop offset="100%" stopColor="#c9a961" />
              </linearGradient>
            </defs>
            <polygon
              points="200,40 360,320 40,320"
              fill="none"
              stroke="url(#grad-edge)"
              strokeWidth="2"
            />
            <circle cx="200" cy="40" r="44" fill="#0a0a0a" stroke="#ff5b1f" strokeWidth="2" />
            <circle cx="360" cy="320" r="44" fill="#0a0a0a" stroke="#c9a961" strokeWidth="2" />
            <circle cx="40" cy="320" r="44" fill="#0a0a0a" stroke="#3ddc97" strokeWidth="2" />
            <text x="200" y="46" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="serif">
              Marketing
            </text>
            <text x="360" y="326" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="serif">
              Sales
            </text>
            <text x="40" y="326" textAnchor="middle" fill="#fff" fontSize="14" fontFamily="serif">
              Nova
            </text>
            <path
              d="M 175 75 C 230 150, 320 220, 345 285"
              fill="none"
              stroke="#ff5b1f"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 55 285 C 80 220, 170 150, 225 75"
              fill="none"
              stroke="#c9a961"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <path
              d="M 200 90 C 200 200, 200 200, 200 270"
              fill="none"
              stroke="#3ddc97"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
            <text x="280" y="180" fill="#c9a961" fontSize="10" fontFamily="monospace">
              score → route
            </text>
            <text x="120" y="180" fill="#3ddc97" fontSize="10" fontFamily="monospace">
              reason → act
            </text>
            <text x="208" y="200" fill="#ff5b1f" fontSize="10" fontFamily="monospace">
              step
            </text>
          </svg>
        </div>
      </ScrollReveal>

      {/* Steps */}
      <ScrollReveal y={20} delay={0.2}>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              t: "1. Score",
              d: "Touchpoint weight + recency + channel mix → 0–100 lead score.",
              color: "#ff5b1f",
            },
            {
              t: "2. Route",
              d: "Score ≥ 50 → enroll into least-loaded active sequence.",
              color: "#c9a961",
            },
            {
              t: "3. Step",
              d: "Each enrollment advances daily. Reply pauses. Booking promotes.",
              color: "#3ddc97",
            },
            {
              t: "4. Close",
              d: "Deals with prob ≥ 80 auto-close as won. Stale → auto-lost at 45d.",
              color: "#4f7cff",
            },
            {
              t: "5. Learn",
              d: "Wins feed back into Nova. Tomorrow is smarter than today.",
              color: "#7c3aed",
            },
            {
              t: "6. Report",
              d: "Pipeline value, velocity, wins/day — one cockpit, no spreadsheets.",
              color: "#f9a01f",
            },
          ].map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              className="border-l-2 pl-4 py-1"
              style={{ borderColor: s.color }}
            >
              <h4 className="font-display text-base font-medium text-foreground">{s.t}</h4>
              <p className="text-sm text-muted-foreground/60 mt-1">{s.d}</p>
            </motion.div>
          ))}
        </div>
      </ScrollReveal>

      {/* Live status */}
      {h && (
        <ScrollReveal y={16} delay={0.3}>
          <div className="rounded-2xl bg-primary border border-ink-800 p-5">
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`inline-block w-2 h-2 rounded-full ${h.ok ? "bg-emerald-500" : "bg-amber-500"} animate-pulse`}
              />
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground/60">
                {h.ok ? "Loop alive" : "Warming up"}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-3 text-center">
              {[
                { l: "Scored 24h", v: h.contacts_scored_24h ?? 0, c: "text-blue-400" },
                { l: "Active", v: h.enrollments_active ?? 0, c: "text-violet-400" },
                {
                  l: "Pipeline",
                  v: `$${Math.round(h.pipeline_value ?? 0).toLocaleString()}`,
                  c: "text-emerald-400",
                },
                { l: "Wins/day", v: (h.triangle_velocity ?? 0).toFixed(2), c: "text-amber-400" },
              ].map((s) => (
                <div key={s.l} className="rounded-xl bg-background py-3">
                  <div className={`text-xl font-bold ${s.c}`}>{s.v}</div>
                  <div className="text-xs text-muted-foreground/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}
