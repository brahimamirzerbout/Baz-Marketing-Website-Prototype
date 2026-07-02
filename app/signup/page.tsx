// @ts-nocheck
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const j = await r.json();
      if (!j.ok) {
        setError(humanizeError(j.error));
        return;
      }
      router.push("/console");
    } catch (err: unknown) {
      setError(err?.message || "network_error");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-6 py-16 bg-background">
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="block text-center font-display text-2xl font-medium tracking-[-0.04em] mb-8"
        >
          BAZ
        </Link>
        <form
          onSubmit={onSubmit}
          className="bg-card rounded-2xl border border-border p-8 space-y-5"
        >
          <div>
            <h1 className="font-display text-2xl font-medium tracking-[-0.02em]">
              Create an account
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              For operators and clients. Free to start.
            </p>
          </div>
          <Field label="Name" value={name} onChange={setName} type="text" />
          <Field label="Email" value={email} onChange={setEmail} type="email" />
          <Field
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            hint="8 characters minimum"
          />
          {error && <p className="text-sm text-accent">{error}</p>}
          <button
            type="submit"
            disabled={busy}
            className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
          >
            {busy ? "Creating account…" : "Create account"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have one?{" "}
            <Link href="/login" className="text-accent hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type,
  hint,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
  type: string;
  hint?: string;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <input
        type={type}
        required
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 h-11 rounded-xl bg-white dark:bg-zinc-900 border border-border text-sm focus:outline-none focus:border-accent"
      />
      {hint && <span className="block mt-1 text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

function humanizeError(code: string): string {
  const map: Record<string, string> = {
    email_taken: "An account with that email already exists.",
    password_too_short: "Password must be at least 8 characters.",
    missing_fields: "All fields are required.",
  };
  return map[code] || code;
}
