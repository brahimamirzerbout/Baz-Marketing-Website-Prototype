// @ts-nocheck
"use client";
/**
 * Live status pill — sits inside the BAZ hero.
 * Shows whether the Marketing Hub loop is alive by reading the same
 * /api/triangle/health endpoint that powers the homepage banner.
 */
import { useEffect, useState } from "react";

const HUB_URL =
  (typeof process !== "undefined" && process.env.NEXT_PUBLIC_HUB_URL) || "http://localhost:3010";

interface HubPulse {
  ok: boolean;
  last_tick_at: number | null;
}

type State = { kind: "live"; secondsAgo: number } | { kind: "warming" } | { kind: "offline" };

function readState(pulse: HubPulse | null, errored: boolean): State {
  if (errored) return { kind: "offline" };
  if (!pulse || pulse.last_tick_at == null) return { kind: "warming" };
  const secondsAgo = Math.max(0, Math.floor(Date.now() / 1000 - pulse.last_tick_at / 1000));
  return { kind: pulse.ok ? "live" : "warming", secondsAgo } as State;
}

export function LiveStatusPill() {
  const [pulse, setPulse] = useState<HubPulse | null>(null);
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let secondsAgo = 0;
    let consecutiveFailures = 0;
    let timer: ReturnType<typeof setInterval> | null = null;

    async function load() {
      try {
        const res = await fetch(`${HUB_URL}/api/triangle/health`, { cache: "no-store" });
        if (!res.ok) {
          if (!cancelled) {
            setErrored(true);
            setPulse(null);
            consecutiveFailures++;
          }
          return;
        }
        const data: HubPulse = await res.json();
        if (!cancelled) {
          setPulse(data);
          setErrored(false);
          consecutiveFailures = 0;
          if (data.last_tick_at) {
            secondsAgo = Math.max(0, Math.floor(Date.now() / 1000 - data.last_tick_at / 1000));
          }
        }
      } catch {
        if (!cancelled) {
          setErrored(true);
          setPulse(null);
          consecutiveFailures++;
          // After 3 consecutive failures, stop polling to avoid console spam.
          // The hub simply isn't running — no point retrying every 30s.
          if (consecutiveFailures >= 3 && timer) {
            clearInterval(timer);
            timer = null;
          }
        }
      }
    }

    load();
    timer = setInterval(load, 30_000);
    return () => {
      cancelled = true;
      if (timer) clearInterval(timer);
    };
  }, []);

  const state = readState(pulse, errored);

  return (
    <div
      role="status"
      aria-live="polite"
      className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-mono uppercase tracking-[0.18em] text-foreground"
    >
      <Dot
        color={
          state.kind === "live"
            ? "bg-[hsl(145,70%,55%)]"
            : state.kind === "warming"
              ? "bg-[hsl(38,85%,58%)]"
              : "bg-muted-foreground/40"
        }
        pulse={state.kind !== "offline"}
      />
      {state.kind === "live" && (
        <span>
          Hub live <span className="text-muted-foreground/60">·</span> last tick {state.secondsAgo}s
          ago
        </span>
      )}
      {state.kind === "warming" && <span>Hub warming</span>}
      {state.kind === "offline" && <span className="text-muted-foreground">Hub offline</span>}
    </div>
  );
}

function Dot({ color, pulse }: { color: string; pulse: boolean }) {
  return (
    <span className="relative inline-flex h-2 w-2">
      {pulse && (
        <span
          aria-hidden
          className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-60 ${color}`}
        />
      )}
      <span className={`relative inline-flex h-2 w-2 rounded-full ${color}`} />
    </span>
  );
}
