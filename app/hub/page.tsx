// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  Rocket,
  Activity,
  Brain,
  Target,
  Zap,
  GitBranch,
  Newspaper,
  BarChart3,
  Users,
  CreditCard,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import { ScrollReveal } from "@/components/beui/ScrollReveal";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "http://localhost:3001";

const QUICK_LINKS = [
  {
    href: "/hub/cockpit",
    label: "Cockpit",
    desc: "Pipeline velocity, wins, forecast",
    icon: Rocket,
    color: "#ff3b2f",
  },
  {
    href: "/hub/triangle",
    label: "Triangle Loop",
    desc: "Autonomous scoring → routing → closing",
    icon: Activity,
    color: "#3ddc97",
  },
  {
    href: "/hub/nova",
    label: "Nova AI",
    desc: "Ask anything about your business",
    icon: Brain,
    color: "#7c3aed",
  },
  {
    href: "/hub/sequences",
    label: "Sequences",
    desc: "Sales cadences that learn",
    icon: Zap,
    color: "#f9a01f",
  },
  {
    href: "/hub/attribution",
    label: "Attribution",
    desc: "Multi-touch revenue attribution",
    icon: GitBranch,
    color: "#4f7cff",
  },
  {
    href: "/hub/wire",
    label: "The Wire",
    desc: "Industry intelligence, scored",
    icon: Newspaper,
    color: "#e11d48",
  },
];

export default function HubDashboard() {
  const [health, setHealth] = useState<Record<string, unknown> | null>(null);
  const [deals, setDeals] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [h, d] = await Promise.all([
          fetch(`${HUB_URL}/api/triangle/health`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          fetch(`${HUB_URL}/api/deals`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ]);
        setHealth(h);
        setDeals(d);
      } catch {}
    }
    load();
    const t = setInterval(load, 30_000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    {
      label: "Pipeline value",
      value: health ? `$${Math.round(health.pipeline_value || 0).toLocaleString()}` : "—",
      icon: Target,
      color: "#ff3b2f",
    },
    {
      label: "Active sequences",
      value: health?.enrollments_active ?? "—",
      icon: Zap,
      color: "#f9a01f",
    },
    {
      label: "Wins (7d)",
      value: health?.recent_wins_7d ?? "—",
      icon: TrendingUp,
      color: "#3ddc97",
    },
    {
      label: "Velocity",
      value: health ? `${(health.triangle_velocity || 0).toFixed(2)}/day` : "—",
      icon: Activity,
      color: "#4f7cff",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <ScrollReveal y={12}>
        <div className="flex items-center justify-between">
          <div>
            <p className="eyebrow-neutral mb-2">BAZ Marketing Hub</p>
            <h1 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.03em] text-foreground">
              Command Center
            </h1>
            <p className="mt-2 text-muted-foreground text-sm max-w-2xl">
              Marketing, sales, and finance — running in a closed loop. Every contact scored. Every
              cadence stepped. Every outcome learned from.
            </p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-emerald-400">
              {health?.ok ? "Live" : "Warming"}
            </span>
          </div>
        </div>
      </ScrollReveal>

      {/* Stats */}
      <ScrollReveal y={16} delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
                className="rounded-2xl bg-primary border border-ink-800 p-5 hover:border-border transition-colors"
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
              </motion.div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Quick links */}
      <ScrollReveal y={20} delay={0.2}>
        <div>
          <h2 className="font-display text-xl font-medium text-foreground mb-4">Jump to</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUICK_LINKS.map((link, i) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.08, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    className="group block rounded-2xl bg-primary border border-ink-800 p-5 hover:border-border hover:bg-primary/90 transition-all"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div
                        className="w-10 h-10 rounded-xl grid place-items-center"
                        style={{ background: `${link.color}20` }}
                      >
                        <Icon className="w-5 h-5" style={{ color: link.color }} />
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground/60 group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                    <h3 className="font-display text-lg font-medium text-foreground">
                      {link.label}
                    </h3>
                    <p className="text-sm text-muted-foreground/60 mt-1">{link.desc}</p>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </ScrollReveal>

      {/* Open Hub CTA */}
      <ScrollReveal y={16} delay={0.4}>
        <div className="rounded-2xl bg-gradient-to-br from-ink-900 to-ink-950 border border-border p-6 flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-medium text-foreground">Need the full Hub?</h3>
            <p className="text-sm text-muted-foreground/60 mt-1">
              All 110+ pages, complete CRM, finance, and automation suite.
            </p>
          </div>
          <a
            href={HUB_URL}
            target="_blank"
            rel="noreferrer"
            className="bg-primary inline-flex items-center gap-2 px-5 h-11 rounded-full font-medium text-sm whitespace-nowrap"
          >
            Open full Hub →
          </a>
        </div>
      </ScrollReveal>
    </div>
  );
}
