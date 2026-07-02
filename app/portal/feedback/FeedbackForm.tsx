// @ts-nocheck
"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const DIMENSIONS = [
  {
    key: "strategy",
    label: "Strategic expertise",
    question: "Did our strategy match your business needs?",
  },
  { key: "results", label: "Results & impact", question: "Did we deliver measurable outcomes?" },
  { key: "communication", label: "Communication", question: "Were we transparent and responsive?" },
  {
    key: "partnership",
    label: "Partnership",
    question: "Did we feel like a partner, not a vendor?",
  },
] as const;

type Rating = Record<(typeof DIMENSIONS)[number]["key"], number>;

export function FeedbackForm({ email, name }: { email: string; name: string }) {
  const router = useRouter();
  const params = useSearchParams();
  const token = params.get("token");

  const [ratings, setRatings] = useState<Rating>({
    strategy: 4,
    results: 4,
    communication: 4,
    partnership: 4,
  });
  const [comment, setComment] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [publicOk, setPublicOk] = useState(true);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      // Use the token from the URL if present; otherwise reuse the user's
      // first pending feedback request; otherwise error.
      let finalToken = token;
      if (!finalToken) {
        const r = await fetch("/api/feedback/request", {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ customerId: "" }),
        });
        // ^ we can't PUT without a customer id; fallback: prompt for token
        setError("Missing feedback token. Use the link from your email or contact your operator.");
        return;
      }
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          token: finalToken,
          ratings,
          comment,
          name,
          role,
          company,
          publicOk,
        }),
      });
      const j = await res.json();
      if (!j.ok) {
        setError(j.error || "submit_failed");
        return;
      }
      setDone(true);
      setTimeout(() => router.push("/portal"), 1500);
    } catch (err: unknown) {
      setError(err?.message || "network_error");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="bg-success/10 border border-success/30 rounded-2xl p-8 text-center">
        <p className="font-display text-2xl text-foreground mb-2">Thank you.</p>
        <p className="text-sm text-foreground">Your feedback is logged with your account team.</p>
      </div>
    );
  }

  const overall = Math.round(Object.values(ratings).reduce((s, n) => s + n, 0) / 4);

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {DIMENSIONS.map((dim) => (
        <div key={dim.key} className="bg-card rounded-2xl border border-border p-6">
          <div className="flex items-start justify-between gap-4 mb-3">
            <div>
              <h3 className="font-display text-xl font-medium tracking-[-0.02em]">{dim.label}</h3>
              <p className="text-sm text-muted-foreground mt-1">{dim.question}</p>
            </div>
            <span className="font-display text-3xl font-medium tabular-nums text-accent">
              {ratings[dim.key]}
              <span className="text-muted-foreground/40 text-lg">/5</span>
            </span>
          </div>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setRatings({ ...ratings, [dim.key]: n })}
                className={`flex-1 h-12 rounded-full text-sm font-medium transition-colors ${
                  ratings[dim.key] === n
                    ? "bg-primary text-foreground"
                    : "bg-muted text-foreground hover:bg-muted"
                }`}
                aria-label={`Rate ${n} of 5`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
      ))}

      <div className="bg-primary text-foreground rounded-2xl p-6 flex items-center justify-between">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            Overall
          </p>
          <p className="text-sm text-muted-foreground mt-1">Average across all four dimensions</p>
        </div>
        <p className="font-display text-5xl font-medium tabular-nums">
          {overall}
          <span className="text-muted-foreground text-2xl">/5</span>
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Company" value={company} onChange={setCompany} />
        <Field label="Your role" value={role} onChange={setRole} />
      </div>

      <label className="block">
        <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
          Anything specific? (optional)
        </span>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="A specific win, a specific frustration, or a request."
          className="mt-1 w-full px-3 py-3 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
        />
      </label>

      <label className="flex items-start gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={publicOk}
          onChange={(e) => setPublicOk(e.target.checked)}
          className="mt-1 w-4 h-4 rounded border-border"
        />
        <span className="text-sm text-foreground">
          You can use this quote publicly (with my name). <b>You can use this anonymously.</b>{" "}
          (uncheck to opt out)
        </span>
      </label>

      {error && <p className="text-sm text-accent">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="w-full h-12 rounded-full bg-primary hover:bg-primary/90 text-foreground text-sm font-medium disabled:opacity-50"
      >
        {busy ? "Sending…" : "Submit feedback"}
      </button>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (s: string) => void;
}) {
  return (
    <label className="block">
      <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full px-3 h-11 rounded-xl bg-background border border-border text-sm focus:outline-none focus:border-accent"
      />
    </label>
  );
}
