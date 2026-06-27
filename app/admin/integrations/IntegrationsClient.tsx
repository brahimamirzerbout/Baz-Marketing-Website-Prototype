'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import type { Integration, IntegrationId } from '@/lib/integrations/catalog';
import { CATEGORIES } from '@/lib/integrations/catalog';
import {
  loadConnections,
  setConnection,
  resetConnections,
  countConnected,
  totalIntegrations,
  isConnected,
  statusText,
} from '@/lib/integrations/store';
import { integrations as catalog } from '@/lib/integrations/catalog';

const FILTERS = [
  { id: 'all',        label: 'All' },
  { id: 'comms',      label: CATEGORIES.comms },
  { id: 'design',     label: CATEGORIES.design },
  { id: 'engineering',label: CATEGORIES.engineering },
  { id: 'finance',    label: CATEGORIES.finance },
  { id: 'marketing',  label: CATEGORIES.marketing },
  { id: 'automation', label: CATEGORIES.automation },
] as const;

type FilterId = typeof FILTERS[number]['id'] | 'all';

export function IntegrationsClient() {
  const [connections, setConnections] = useState<ReturnType<typeof loadConnections>>({});
  const [filter, setFilter] = useState<FilterId>('all');
  const [modal, setModal] = useState<Integration | null>(null);
  const [mounted, setMounted] = useState(false);
  const [toast, setToast] = useState<{ msg: string; kind: 'ok' | 'warn' | 'info' } | null>(null);

  useEffect(() => {
    setConnections(loadConnections());
    setMounted(true);
  }, []);

  const showToast = useCallback((msg: string, kind: 'ok' | 'warn' | 'info' = 'ok') => {
    setToast({ msg, kind });
    setTimeout(() => setToast(null), 2500);
  }, []);

  const filtered = useMemo(() => {
    if (filter === 'all') return catalog;
    return catalog.filter((i) => i.categories.includes(filter as Integration['categories'][number]));
  }, [filter]);

  const connectedCount = mounted ? countConnected(connections) : 0;
  const total = totalIntegrations();

  function onConnect(id: IntegrationId) {
    setConnections(setConnection(id, true));
    const integ = catalog.find((i) => i.id === id)!;
    showToast(`${integ.name} connected.`, 'ok');
    setModal(null);
  }

  function onDisconnect(id: IntegrationId) {
    setConnections(setConnection(id, false));
    const integ = catalog.find((i) => i.id === id)!;
    showToast(`${integ.name} disconnected.`, 'warn');
    setModal(null);
  }

  function onReset() {
    setConnections(resetConnections());
    showToast('Reset to defaults.', 'info');
  }

  return (
    <div className="space-y-8">
      {/* Header summary */}
      <div className="flex items-end justify-between flex-wrap gap-4">
        <div>
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-500 mb-2">
            Connected services
          </p>
          <p className="font-display text-3xl md:text-4xl font-medium tracking-[-0.03em]">
            {mounted ? `${connectedCount} of ${total} active`
                      : <span className="text-ink-300">— of {total} active</span>}
          </p>
          <p className="mt-2 text-sm text-ink-600 max-w-md">
            Click any card to configure. Connection state is saved to this
            browser. Real OAuth/API integrations require per-provider keys —
            see <code className="font-mono text-xs bg-paper-300 px-1.5 py-0.5 rounded">README → Integrations</code>.
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="text-sm font-medium text-ink-700 hover:text-accent transition-colors"
        >
          Reset to defaults
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id as FilterId)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === f.id
                ? 'bg-ink-900 text-paper border border-ink-900'
                : 'bg-paper-50 border border-ink-200 text-ink-700 hover:border-ink-400'
            }`}
          >
            {f.label}
            {f.id !== 'all' && (
              <span className="font-mono text-[10px] opacity-70">
                {catalog.filter((i) => i.categories.includes(f.id as Integration['categories'][number])).length}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((integ) => {
          const connected = mounted ? isConnected(integ.id, connections) : true;
          const dotColor = connected ? 'var(--success, #3ddc97)' : 'var(--muted, #7e7e79)';
          return (
            <button
              key={integ.id}
              type="button"
              onClick={() => setModal(integ)}
              className="reveal group text-left bg-paper-50 rounded-2xl border border-ink-100 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-lift transition-all p-5 md:p-6"
            >
              <div className="flex items-center gap-4">
                <span
                  className="grid place-items-center w-12 h-12 rounded-xl text-white font-display font-bold text-lg shrink-0"
                  style={{ background: integ.color }}
                  aria-hidden
                >
                  {integ.icon}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <b className="text-ink-900 truncate">{integ.name}</b>
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-xs text-ink-500">
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full"
                      style={{ background: dotColor }}
                      aria-hidden
                    />
                    <span className="truncate">
                      {mounted ? statusText(integ.id, connections, integ.defaultStatus) : integ.defaultStatus}
                    </span>
                  </div>
                </div>
                <span
                  aria-hidden
                  className="text-ink-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all shrink-0"
                >
                  →
                </span>
              </div>
              <p className="mt-4 text-sm text-ink-600 leading-relaxed">{integ.desc}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {integ.categories.map((c) => (
                  <span
                    key={c}
                    className="font-mono text-[10px] uppercase tracking-[0.15em] px-2 py-0.5 rounded-full bg-paper-300 text-ink-700"
                  >
                    {CATEGORIES[c]}
                  </span>
                ))}
              </div>
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-sm text-ink-500 py-12">
          No integrations in this category.
        </p>
      )}

      {/* Modal */}
      {modal && (
        <IntegrationModal
          integration={modal}
          connected={isConnected(modal.id, connections)}
          onConnect={() => onConnect(modal.id)}
          onDisconnect={() => onDisconnect(modal.id)}
          onClose={() => setModal(null)}
        />
      )}

      {/* Inline toast (no global Toast component yet, keep it self-contained) */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 pointer-events-none"
          style={{ animation: 'bz-fade-in .2s ease both' }}
        >
          <div
            className={`pointer-events-auto px-5 py-3 rounded-2xl shadow-lift text-sm font-medium ${
              toast.kind === 'ok'
                ? 'bg-ink-900 text-paper'
                : toast.kind === 'warn'
                ? 'bg-amber-500 text-white'
                : 'bg-paper-200 border border-ink-200 text-ink-900'
            }`}
          >
            {toast.msg}
          </div>
        </div>
      )}
    </div>
  );
}

function IntegrationModal({
  integration,
  connected,
  onConnect,
  onDisconnect,
  onClose,
}: {
  integration: Integration;
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
  onClose: () => void;
}) {
  // Close on Escape, lock body scroll while open
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby={`int-modal-${integration.id}`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm"
      style={{ animation: 'bz-fade-in .18s ease both' }}
    >
      <div
        className="bg-paper-50 rounded-2xl border border-ink-100 w-full max-w-md overflow-hidden"
        style={{ animation: 'bz-pop-in .22s cubic-bezier(.2,.9,.3,1.2) both' }}
      >
        <div className="flex items-start gap-4 p-6">
          <span
            className="grid place-items-center w-14 h-14 rounded-xl text-white font-display font-bold text-2xl shrink-0"
            style={{ background: integration.color }}
            aria-hidden
          >
            {integration.icon}
          </span>
          <div className="flex-1 min-w-0">
            <h2 id={`int-modal-${integration.id}`} className="font-display text-xl font-medium tracking-[-0.02em]">
              {integration.name}
            </h2>
            <div className="mt-1 flex items-center gap-2 text-xs">
              <span
                className="inline-block w-1.5 h-1.5 rounded-full"
                style={{ background: connected ? 'var(--success, #3ddc97)' : 'var(--muted, #7e7e79)' }}
                aria-hidden
              />
              <span className={connected ? 'text-ink-700' : 'text-ink-500'}>
                {connected ? integration.defaultStatus : 'Available — connect to enable'}
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid place-items-center w-8 h-8 rounded-full bg-paper-300 hover:bg-ink-200 transition-colors text-ink-700"
          >
            ✕
          </button>
        </div>

        <div className="px-6 pb-6">
          <p className="text-[15px] text-ink-700 leading-relaxed">{integration.desc}</p>

          <div className="mt-5 rounded-xl bg-paper-200 p-4 border border-ink-100">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 mb-2">
              {connected ? 'Currently connected' : 'What connecting does'}
            </p>
            <ul className="space-y-1.5 text-sm text-ink-700">
              {connected ? (
                <>
                  <li className="flex items-start gap-2"><span className="text-success">✓</span> {integration.defaultStatus}</li>
                  <li className="flex items-start gap-2"><span className="text-success">✓</span> Events sync to your BAZ dashboard</li>
                  <li className="flex items-start gap-2"><span className="text-success">✓</span> Webhooks fire on activity</li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-2"><span aria-hidden>·</span> Authorize BAZ to read &amp; write on your behalf</li>
                  <li className="flex items-start gap-2"><span aria-hidden>·</span> Surface events in <code className="font-mono text-xs bg-paper-50 px-1.5 py-0.5 rounded">/admin/leads</code> &amp; <code className="font-mono text-xs bg-paper-50 px-1.5 py-0.5 rounded">/admin/monitors</code></li>
                  <li className="flex items-start gap-2"><span aria-hidden>·</span> OAuth token stored encrypted in your browser session</li>
                </>
              )}
            </ul>
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 h-11 rounded-full text-sm font-medium text-ink-700 hover:text-ink-900 transition-colors"
            >
              Close
            </button>
            {connected ? (
              <button
                type="button"
                onClick={onDisconnect}
                className="px-5 h-11 rounded-full bg-paper-200 border border-ink-200 hover:border-ink-900 text-sm font-medium text-ink-900 transition-colors"
              >
                Disconnect
              </button>
            ) : (
              <button
                type="button"
                onClick={onConnect}
                className="px-5 h-11 rounded-full bg-ink-900 hover:bg-ink-800 text-sm font-medium text-paper transition-colors"
              >
                Connect
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}