"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function BriefForm({ email, name }: { email: string; name: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name") as string,
      email: fd.get("email") as string,
      company: fd.get("company") as string,
      message: fd.get("message") as string,
      budget: fd.get("budget") as string,
      source: "portal_brief",
    };
    try {
      const r = await fetch("/api/leads", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const j = await r.json();
      if (!j.ok) {
        setError(j.error || "submit_failed");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/portal"), 1200);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "network_error");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bg-success/10 border border-success/30 rounded-2xl p-8 text-center">
        <p className="font-display text-2xl text-foreground mb-2">Brief received.</p>
        <p className="text-sm text-foreground">Your team will respond within one business day.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-5 bg-card rounded-2xl border border-border p-6 md:p-8"
    >
      <Field label="Your name" name="name" defaultValue={name} required />
      <Field label="Email" name="email" type="email" defaultValue={email} required />
      <Field label="Company (optional)" name="company" type="text" />
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          What do you need?
        </span>
        <textarea
          name="message"
          required
          rows={6}
          placeholder="Be specific about the outcome. New site, content engine, paid audit, etc."
          className="mt-1 w-full px-3 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </label>
      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Budget range (optional)
        </span>
        <select
          name="budget"
          className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
        >
          <option value="">—</option>
          <option value="<5k">Under $5K</option>
          <option value="5-15k">$5K–$15K</option>
          <option value="15-50k">$15K–$50K</option>
          <option value="50k+">$50K+</option>
          <option value="recurring">Recurring retainer</option>
        </select>
      </label>
      {error && (
        <p className="text-sm text-accent">
          Couldn&rsquo;t submit: {error}. Try again or email zerboutbrahimamir@gmail.com.
        </p>
      )}
      <button
        type="submit"
        disabled={busy}
        className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
      >
        {busy ? "Sending…" : "Send brief"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  defaultValue,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
        {required ? "" : " (optional)"}
      </span>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        required={required}
        className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
      />
    </label>
  );
}
