'use client';

import { useState } from 'react';

export function NewsletterForm({ source = 'newsletter' }: { source?: string }) {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<'idle' | 'pending' | 'ok' | 'err'>('idle');
  const [msg, setMsg] = useState<string>('');

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setState('err');
      setMsg('Please enter a valid work email.');
      return;
    }
    setState('pending');
    try {
      // Lightweight client-side log. Real wiring can POST to /api/newsletter.
      await new Promise((r) => setTimeout(r, 500));
      setState('ok');
      setMsg('Subscribed. We send one growth playbook per month.');
      setEmail('');
    } catch {
      setState('err');
      setMsg('Something went wrong. Try again.');
    }
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md">
      <label htmlFor="newsletter-email" className="sr-only">Email</label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@company.com"
        className="flex-1 h-12 px-4 rounded-full bg-paper border border-ink-200 dark:border-paper-300 focus:border-ink-900 focus:outline-none focus:ring-2 focus:ring-accent text-[15px]"
      />
      <button
        type="submit"
        disabled={state === 'pending'}
        className="h-12 px-6 rounded-full bg-ink-900 text-paper font-medium hover:bg-ink-800 transition-colors disabled:opacity-50"
        data-source={source}
      >
        {state === 'pending' ? 'Joining…' : 'Subscribe'}
      </button>
      {state !== 'idle' && (
        <p className={`text-sm ${state === 'err' ? 'text-accent-700' : 'text-ink-500'}`} role="status">
          {msg}
        </p>
      )}
    </form>
  );
}
