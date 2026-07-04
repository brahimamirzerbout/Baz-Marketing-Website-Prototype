"use client";
/**
 * PipelineTicker — live auto-scrolling marquee of Marketing Hub stats.
 * Reads /api/triangle/health + /api/dive/status once on mount, then renders an
 * infinitely scrolling strip of stats. Pauses on hover. Duplicates the stat
 * list inside the track so the loop is seamless.
 */
import { useEffect, useMemo, useState } from "react";

const HUB_URL =
  process.env.NEXT_PUBLIC_HUB_URL || "";

interface HubPulse {
  ok: boolean;
  enrollments_active: number;
  recent_wins_7d: number;
  triangle_velocity: number;
  pipeline_value: number;
  last_tick_at: number | null;
}

interface DiveStatus {
  total: number;
}

function fmtCurrency(n: number): string {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
}

export function PipelineTicker() {
  const [pulse, setPulse] = useState<HubPulse | null>(null);
  const [dive, setDive] = useState<DiveStatus | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const [p, d] = await Promise.all([
          fetch(`${HUB_URL}/api/triangle/health`, { cache: "no-store" })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
          fetch(`${HUB_URL}/api/dive/status`, { cache: "no-store" })
            .then((r) => (r.ok ? r.json() : null))
            .catch(() => null),
        ]);
        if (!cancelled) {
          setPulse(p);
          setDive(d);
        }
      } catch {
        // Hub offline — ticker falls back to placeholder data already in the chips array
      }
    }
    load();
    const t = setInterval(load, 60_000);
    return () => {
      cancelled = true;
      clearInterval(t);
    };
  }, []);

  const lastTickSecs =
    pulse?.last_tick_at != null
      ? Math.max(0, Math.floor(Date.now() / 1000 - pulse.last_tick_at / 1000))
      : null;

  // Build the chip list once. Each chip is the prefix + value (number rendered accent).
  const chips = useMemo(
    () => [
      {
        prefix: "Pipeline under management",
        value: pulse ? fmtCurrency(pulse.pipeline_value) : "—",
      },
      { prefix: "Active sequences", value: pulse ? String(pulse.enrollments_active) : "—" },
      { prefix: "Velocity", value: pulse ? `${pulse.triangle_velocity.toFixed(2)} wins/day` : "—" },
      { prefix: "Marketing Dive", value: dive ? `${dive.total} articles` : "—" },
      {
        prefix: "Triangle loop",
        value: lastTickSecs != null ? `last tick ${lastTickSecs}s ago` : "warming",
      },
      { prefix: "Wins (7d)", value: pulse ? String(pulse.recent_wins_7d) : "—" },
    ],
    [pulse, dive, lastTickSecs],
  );

  // Duplicate the list so the marquee loops seamlessly.
  const track = [...chips, ...chips];

  return (
    <section className="bg-primary text-foreground overflow-hidden border-y border-ink-800 dark:bg-primary dark:text-foreground dark:border-border">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-ink-900 to-transparent z-10"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-ink-900 to-transparent z-10"
        />
        <div
          className="flex whitespace-nowrap py-3 motion-reduce:animate-none animate-[ticker_30s_linear_infinite] hover:[animation-play-state:paused]"
          style={{ width: "max-content" }}
        >
          {track.map((chip, i) => (
            <div
              key={i}
              className="flex items-center gap-3 px-6 text-xs font-mono uppercase tracking-[0.18em]"
            >
              <span className="text-muted-foreground/60 dark:text-muted-foreground">
                {chip.prefix}
              </span>
              <span className="text-accent font-medium">{chip.value}</span>
              <span className="text-foreground-600">·</span>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-\\[ticker_30s_linear_infinite\\] {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
