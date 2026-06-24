'use client';

import { useState, useTransition } from 'react';
import { Button } from '@/components/ui/Button';
import { submitLead } from '@/lib/actions';
import { track } from '@/lib/analytics';
import { cn } from '@/lib/cn';

type FieldErrors = Record<string, string>;

const budgets = [
  { v: '<10k', l: 'Under $10K / mo' },
  { v: '10-25k', l: '$10–25K / mo' },
  { v: '25-50k', l: '$25–50K / mo' },
  { v: '50-100k', l: '$50–100K / mo' },
  { v: '100k+', l: '$100K+ / mo' },
  { v: 'not-sure', l: 'Not sure yet' },
];

export function ContactForm({ source = 'contact', service }: { source?: string; service?: string }) {
  const [pending, startTransition] = useTransition();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [success, setSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setServerError(null);
    setSuccess(null);

    const fd = new FormData(e.currentTarget);
    const raw = Object.fromEntries(fd.entries());

    track('form_submit', { source, service: service ?? undefined });

    startTransition(async () => {
      const result = await submitLead(raw);
      if (result.ok) {
        setSuccess(result.id);
        track('form_submit_success', { source, service: service ?? undefined, leadId: result.id });
        (e.target as HTMLFormElement).reset();
      } else {
        setErrors(result.fieldErrors || {});
        setServerError(result.error);
        track('form_submit_error', { source, service: service ?? undefined, error: result.error });
      }
    });
  }

  if (success) {
    return (
      <div className="bg-paper rounded-2xl border border-ink-100 p-8 md:p-10 text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-full bg-accent text-white text-2xl mb-5">✓</div>
        <h3 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em]">Got it.</h3>
        <p className="mt-3 text-ink-600 max-w-md mx-auto">
          We&apos;ll be in touch within one business day. If it&apos;s urgent, write us at{' '}
          <a href="mailto:zerboutbrahimamir@gmail.com" className="underline">zerboutbrahimamir@gmail.com</a>.
        </p>
        <button
          onClick={() => setSuccess(null)}
          className="mt-6 text-sm text-ink-500 hover:text-ink-900 underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="bg-paper rounded-2xl border border-ink-100 p-6 md:p-8 space-y-5" noValidate>
      <input type="hidden" name="source" value={source} />
      {service && <input type="hidden" name="service" value={service} />}
      {/* Honeypot — hidden from users, catches naive bots */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="hp">Leave this empty</label>
        <input id="hp" name="hp" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" name="name" required error={errors.name}>
          <input id="name" name="name" required minLength={2} autoComplete="name" className={inputCls(errors.name)} placeholder="Alex Rivera" />
        </Field>
        <Field label="Work email" name="email" required error={errors.email}>
          <input id="email" name="email" type="email" required autoComplete="email" className={inputCls(errors.email)} placeholder="alex@company.com" />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Company" name="company" error={errors.company}>
          <input id="company" name="company" autoComplete="organization" className={inputCls(errors.company)} placeholder="Acme Inc." />
        </Field>
        <Field label="Website" name="website" error={errors.website}>
          <input id="website" name="website" type="url" autoComplete="url" className={inputCls(errors.website)} placeholder="https://acme.com" />
        </Field>
      </div>

      <Field label="Monthly budget" name="budget" error={errors.budget}>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {budgets.map((b) => (
            <label key={b.v} className="cursor-pointer">
              <input type="radio" name="budget" value={b.v} className="peer sr-only" />
              <span className="block px-3 py-2.5 rounded-xl border border-ink-200 text-sm text-center bg-white hover:border-ink-900 peer-checked:border-accent peer-checked:bg-accent-soft peer-checked:text-accent-700 transition-all">
                {b.l}
              </span>
            </label>
          ))}
        </div>
      </Field>

      <Field label="What are you trying to achieve?" name="message" required error={errors.message}>
        <textarea id="message" name="message" required rows={5} className={cn(inputCls(errors.message), 'min-h-[120px] resize-y')} placeholder="A few sentences about your current growth, what you've tried, and what you'd like to change." />
      </Field>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-ink-500 max-w-md">
          By submitting, you agree to our <a href="/privacy" className="underline">Privacy Policy</a>.
          We respond within one business day. No spam, ever.
        </p>
        <Button type="submit" variant="primary" size="lg" disabled={pending} trackAs="contact_submit">
          {pending ? 'Sending…' : 'Send brief'}
        </Button>
      </div>

      {serverError && serverError !== 'validation_failed' && (
        <p className="text-sm text-accent-700 bg-accent-soft border border-accent/20 rounded-xl px-4 py-3">
          Something went wrong sending your brief. Please email{' '}
          <a href="mailto:zerboutbrahimamir@gmail.com" className="underline">zerboutbrahimamir@gmail.com</a> directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  name,
  required,
  error,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label htmlFor={name} className="block">
      <span className="block text-sm font-medium text-ink-900 mb-1.5">
        {label} {required && <span className="text-accent" aria-hidden>*</span>}
      </span>
      {children}
      {error && <span className="block mt-1.5 text-xs text-accent-700">{error}</span>}
    </label>
  );
}

function inputCls(error?: string) {
  return cn(
    'block w-full rounded-xl bg-white border px-4 h-12 text-[15px] text-ink-900 placeholder:text-ink-300 transition-colors',
    'focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent',
    error ? 'border-accent' : 'border-ink-200 hover:border-ink-300'
  );
}
