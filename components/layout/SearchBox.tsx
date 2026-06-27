'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Hit {
  type: string;
  title: string;
  excerpt: string;
  href: string;
  score: number;
}

const TYPE_LABELS: Record<string, string> = {
  service: 'Service',
  'case-study': 'Case study',
  industry: 'Industry',
  post: 'Insight',
  team: 'Team',
  pricing: 'Pricing',
};

export function SearchBox() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Keyboard shortcut: ⌘K / Ctrl+K
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  // Focus when opened
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  // Click-outside close
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  // Search
  useEffect(() => {
    if (!q.trim()) { setHits([]); return; }
    setBusy(true);
    const t = setTimeout(async () => {
      try {
        const r = await fetch(`/api/search?q=${encodeURIComponent(q.trim())}`);
        const j = await r.json();
        if (j.ok) setHits(j.hits ?? []);
      } catch { /* ignore */ }
      finally { setBusy(false); }
    }, 150);
    return () => clearTimeout(t);
  }, [q]);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search (⌘K)"
        className="hidden lg:inline-flex items-center gap-2 h-9 px-3 rounded-full bg-paper-200 hover:bg-paper-300 text-ink-700 text-xs"
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3-3" />
        </svg>
        Search
        <kbd className="font-mono text-[10px] opacity-60 ml-1">⌘K</kbd>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-ink-900/40 backdrop-blur-sm" onClick={() => setOpen(false)}>
          <div
            className="absolute top-24 left-1/2 -translate-x-1/2 w-[min(640px,calc(100vw-32px))] bg-paper-50 rounded-2xl border border-ink-100 shadow-lift overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 px-5 py-4 border-b border-ink-100">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3-3" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search services, case studies, insights…"
                className="flex-1 bg-transparent outline-none text-ink-900 placeholder:text-ink-400 text-base"
              />
              <kbd className="font-mono text-[10px] text-ink-500 px-2 py-1 rounded bg-paper-200">esc</kbd>
            </div>

            <div className="max-h-96 overflow-y-auto">
              {!q.trim() && (
                <div className="px-5 py-6 text-sm text-ink-500">
                  Type to search across 18 services, 6 case studies, 11 insights, and more.
                </div>
              )}
              {q.trim() && busy && (
                <div className="px-5 py-6 text-sm text-ink-500">Searching…</div>
              )}
              {q.trim() && !busy && hits.length === 0 && (
                <div className="px-5 py-6 text-sm text-ink-500">No matches for &ldquo;{q}&rdquo;.</div>
              )}
              {hits.length > 0 && (
                <ul className="divide-y divide-ink-100">
                  {hits.map((h, i) => (
                    <li key={`${h.type}-${h.href}-${i}`}>
                      <Link
                        href={h.href}
                        onClick={() => setOpen(false)}
                        className="block px-5 py-3 hover:bg-paper-200 transition-colors"
                      >
                        <div className="flex items-center justify-between gap-3">
                          <p className="font-medium text-ink-900 truncate">{h.title}</p>
                          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500 shrink-0">
                            {TYPE_LABELS[h.type] ?? h.type}
                          </span>
                        </div>
                        <p className="text-sm text-ink-600 truncate">{h.excerpt}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}