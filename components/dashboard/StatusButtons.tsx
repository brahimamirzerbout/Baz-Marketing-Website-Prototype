'use client';

import { useState, useTransition } from 'react';
import { cn } from '@/lib/cn';
import type { LeadStatus } from '@/lib/leads-store';

interface StatusButtonsProps {
  leadId: string;
  initial: LeadStatus;
}

const STATUSES: { value: LeadStatus; label: string; tone: string }[] = [
  { value: 'new', label: 'New', tone: 'bg-accent/15 text-accent border-accent/30' },
  {
    value: 'replied',
    label: 'Replied',
    tone: 'bg-emerald-500/15 text-emerald-700 border-emerald-500/30',
  },
  {
    value: 'archived',
    label: 'Archived',
    tone: 'bg-ink-100 text-ink-500 border-ink-200',
  },
];

/**
 * Three-button status switcher. Optimistic update + server reconciliation.
 * Falls back to a hard refresh if the PATCH fails so the UI can't lie
 * about state.
 */
export function StatusButtons({ leadId, initial }: StatusButtonsProps) {
  const [status, setStatus] = useState<LeadStatus>(initial);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const update = (next: LeadStatus) => {
    if (next === status) return;
    const prev = status;
    setStatus(next); // optimistic
    setError(null);
    startTransition(async () => {
      try {
        const r = await fetch(`/api/leads/${leadId}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ status: next }),
        });
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const j = await r.json().catch(() => ({}));
        if (!j.ok) throw new Error(j.error || 'unknown');
      } catch (e) {
        setStatus(prev); // roll back
        setError(e instanceof Error ? e.message : 'Update failed');
        // Auto-clear the error after a few seconds
        setTimeout(() => setError(null), 4000);
      }
    });
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="inline-flex rounded-full border border-ink-200 bg-white p-0.5">
        {STATUSES.map((s) => (
          <button
            key={s.value}
            type="button"
            disabled={pending}
            onClick={() => update(s.value)}
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium transition-all duration-150',
              'disabled:opacity-50 disabled:cursor-not-allowed',
              status === s.value
                ? s.tone + ' border border-current/20'
                : 'text-ink-500 hover:text-ink-900',
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      {error ? (
        <span className="text-xs text-accent-700">Couldn&apos;t save: {error}</span>
      ) : null}
    </div>
  );
}
