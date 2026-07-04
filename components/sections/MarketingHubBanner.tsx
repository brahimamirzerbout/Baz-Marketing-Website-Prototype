"use client";
/**
 * BAZ Homepage section that promotes Marketing Hub.
 * Pulls live data from the Hub's API (loop health + last ingest) to make the
 * banner feel current instead of a static advertorial.
 */
import { useEffect, useState } from "react";

const HUB_URL =
  process.env.NEXT_PUBLIC_HUB_URL || "";

interface HubPulse {
  ok: boolean;
  enrollments_active: number;
  recent_wins_7d: number;
  triangle_velocity: number;
  pipeline_value: number;
}

interface DiveStatus {
  total: number;
  last_fetch_at: number | null;
}

export function MarketingHubBanner() {
  const [pulse, setPulse] = useState<HubPulse | null>(null);
  const [dive, setDive] = useState<DiveStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [p, d] = await Promise.all([
          fetch(`${HUB_URL}/api/triangle/health`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          fetch(`${HUB_URL}/api/dive/status`)
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ]);
        if (!cancelled) {
          setPulse(p);
          setDive(d);
        }
      } catch {
        // Hub may not be reachable — render with placeholders
      }
    }
    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  const fmtCurrency = (n: number) =>
    n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(1)}M` : `$${Math.round(n).toLocaleString()}`;

  return (
    <section className="bg-primary text-foreground border-y border-ink-800 relative overflow-hidden">
      <div aria-hidden className="absolute inset-0  opacity-30" />
      <div aria-hidden className="absolute inset-0  opacity-40" />
      <div className="container mx-auto py-16 md:py-24">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          {/* Left: pitch */}
          <div className="lg:col-span-7">
            <p className="eyebrow-neutral mb-4">BAZ Product · Marketing Hub</p>
            <h2 className="font-display text-display-xl font-medium tracking-[-0.04em] leading-[1.05]">
              The marketing, sales, and finance loop — running itself.
            </h2>
            <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
              Every contact scored. Every cadence stepped. Every outcome learned from. The BAZ
              Marketing Hub is the operating system under everything we ship for clients — and it
              runs whether we&apos;re watching or not.
            </p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a
                href={HUB_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-accent text-white font-medium"
              >
                Open the Hub
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </a>
              <a
                href="/marketing-hub"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-full border border-border text-foreground font-medium"
              >
                See the feature tour
              </a>
            </div>
          </div>

          {/* Right: live status card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-background text-foreground p-6 shadow-2xl dark:bg-primary dark:text-foreground">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-block w-2 h-2 rounded-full ${
                      pulse?.ok ? "bg-[hsl(145,70%,55%)]" : "bg-[hsl(38,85%,58%)]"
                    }`}
                  />
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
                    Hub status · {pulse?.ok ? "live" : "warming"}
                  </span>
                </div>
                <a
                  href={`${HUB_URL}/triangle`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs text-accent font-medium"
                >
                  triangle.baz →
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <Stat
                  icon={<DotIcon color="hsl(145,70%,55%)" />}
                  label="Active sequences"
                  value={pulse?.enrollments_active ?? "—"}
                />
                <Stat
                  icon={<DotIcon color="hsl(270,85%,72%)" />}
                  label="Velocity (wins/day)"
                  value={pulse ? pulse.triangle_velocity.toFixed(2) : "—"}
                />
                <Stat
                  icon={<DotIcon color="hsl(38,85%,58%)" />}
                  label="Pipeline under mgmt"
                  value={pulse ? fmtCurrency(pulse.pipeline_value) : "—"}
                />
                <Stat
                  icon={<DotIcon color="hsl(8,80%,58%)" />}
                  label="Marketing Dive"
                  value={dive?.total ?? "—"}
                  sub={dive?.total ? `${dive.total} articles indexed` : "not ingested yet"}
                />
              </div>

              <div className="mt-5 pt-4 border-t border-border dark:border-border flex items-center gap-2 text-xs text-muted-foreground dark:text-muted-foreground">
                <ShieldIcon />
                Local · SQLite WAL · triangle loop ticks every 60 s
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
}) {
  return (
    <div className="rounded-xl bg-muted/70 dark:bg-primary/90 p-3">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-muted-foreground dark:text-muted-foreground">
        <span className="inline-flex items-center justify-center w-4 h-4">{icon}</span>
        {label}
      </div>
      <div className="font-display text-2xl font-medium tracking-[-0.02em] mt-1">{value}</div>
      {sub && (
        <div className="text-[10px] text-muted-foreground/60 dark:text-muted-foreground mt-0.5">
          {sub}
        </div>
      )}
    </div>
  );
}

function DotIcon({ color }: { color: string }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden>
      <circle cx="5" cy="5" r="4" fill={color} />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}
