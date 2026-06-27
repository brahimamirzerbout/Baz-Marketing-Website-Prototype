'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/console';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(null);
    try {
      const r = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const j = await r.json();
      if (!j.ok) { setError(j.error || 'login_failed'); return; }
      router.push(next);
    } catch (err: any) {
      setError(err?.message || 'network_error');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 py-16 bg-paper">
      <div className="w-full max-w-md">
        <Link href="/" className="block text-center font-display text-2xl font-medium tracking-[-0.04em] mb-8">
          BAZ
        </Link>
        <form onSubmit={onSubmit} className="bg-paper-50 rounded-2xl border border-ink-100 p-8 space-y-5">
          <div>
            <h1 className="font-display text-2xl font-medium tracking-[-0.02em]">Sign in</h1>
            <p className="mt-1 text-sm text-ink-500">Operator console &amp; client portal.</p>
          </div>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">Email</span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-3 h-11 rounded-xl bg-white border border-ink-200 text-sm focus:outline-none focus:border-accent" />
          </label>
          <label className="block">
            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-ink-500">Password</span>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-3 h-11 rounded-xl bg-white border border-ink-200 text-sm focus:outline-none focus:border-accent" />
          </label>
          {error && <p className="text-sm text-accent">{error === 'invalid_credentials' ? 'Wrong email or password.' : error}</p>}
          <button type="submit" disabled={busy}
            className="w-full h-12 rounded-full bg-ink-900 hover:bg-ink-800 text-paper text-sm font-medium disabled:opacity-50">
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
          <p className="text-center text-sm text-ink-500">
            No account? <Link href="/signup" className="text-accent hover:underline">Sign up</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center bg-paper"><span className="text-ink-500 text-sm">Loading…</span></div>}>
      <LoginForm />
    </Suspense>
  );
}