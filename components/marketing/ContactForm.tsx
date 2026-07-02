// @ts-nocheck
"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/Button";
import { submitLead } from "@/lib/actions";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";

const contactSchema = z.object({
  name: z
    .string()
    .min(2, "Please enter your name (at least 2 characters).")
    .max(120, "Name is too long."),
  email: z
    .string()
    .min(1, "We need an email to reply to.")
    .email("That doesn\u2019t look like a valid email."),
  company: z.string().max(200, "Company name is too long.").optional().or(z.literal("")),
  website: z
    .string()
    .max(500, "Website URL is too long.")
    .optional()
    .or(z.literal(""))
    .refine(
      (v) => !v || /^https?:\/\/.+\..+/.test(v),
      "Website must be a valid URL (https://example.com).",
    ),
  budget: z.enum(["<10k", "10-25k", "25-50k", "50-100k", "100k+", "not-sure"]).optional(),
  message: z
    .string()
    .min(10, "Tell us a little more (at least 10 characters).")
    .max(4000, "Message is too long."),
  source: z.string().optional(),
  service: z.string().optional(),
  hp: z.string().optional(),
});

type ContactFields = z.infer<typeof contactSchema>;

const budgets = [
  { v: "<10k", l: "Under $10K / mo" },
  { v: "10-25k", l: "$10\u201325K / mo" },
  { v: "25-50k", l: "$25\u201350K / mo" },
  { v: "50-100k", l: "$50\u2013100K / mo" },
  { v: "100k+", l: "$100K+ / mo" },
  { v: "not-sure", l: "Not sure yet" },
] as const;

type BudgetValue = (typeof budgets)[number]["v"];

export function ContactForm({
  source = "contact",
  service,
}: {
  source?: string;
  service?: string;
}) {
  const [pending, startTransition] = useTransition();
  const [serverError, setServerError] = useState<string | null>(null);
  const [successId, setSuccessId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm<ContactFields>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      company: "",
      website: "",
      budget: undefined,
      message: "",
      source,
      service: service || "",
      hp: "",
    },
  });

  const budgetValue = watch("budget");

  const onSubmit = handleSubmit(async (values) => {
    setServerError(null);
    track("form_submit", { source, service: service ?? undefined });

    const result = await submitLead(values);

    if (result.ok) {
      setSuccessId(result.id);
      track("form_submit_success", { source, service: service ?? undefined, leadId: result.id });
      reset({ ...values, message: "", hp: "" });
      return;
    }

    track("form_submit_error", { source, service: service ?? undefined, error: result.error });
    if (result.fieldErrors) {
      for (const [field, message] of Object.entries(result.fieldErrors)) {
        setError(field as keyof ContactFields, { type: "server", message });
      }
    } else if (result.error !== "validation_failed") {
      setServerError(result.error);
    }
  });

  if (successId) {
    return (
      <div className="bg-background dark:bg-card rounded-2xl border border-border dark:border-border p-8 md:p-10 text-center">
        <div className="inline-grid place-items-center w-12 h-12 rounded-full bg-accent text-white text-2xl mb-5">
          \u2713
        </div>
        <h3 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em]">
          Got it.
        </h3>
        <p className="mt-3 text-muted-foreground max-w-md mx-auto">
          We&apos;ll be in touch within one business day. If it&apos;s urgent, write us at{" "}
          <a href="mailto:zerboutbrahimamir@gmail.com" className="underline">
            zerboutbrahimamir@gmail.com
          </a>
          .
        </p>
        <button
          onClick={() => setSuccessId(null)}
          className="mt-6 text-sm text-muted-foreground hover:text-foreground underline"
        >
          Submit another
        </button>
      </div>
    );
  }

  const submitting = pending || isSubmitting;

  return (
    <form
      onSubmit={onSubmit}
      className="bg-background dark:bg-card rounded-2xl border border-border dark:border-border p-6 md:p-8 space-y-5"
      noValidate
      aria-busy={submitting}
    >
      <input type="hidden" {...register("source")} value={source} />
      {service && <input type="hidden" {...register("service")} value={service} />}
      {/* Honeypot — hidden from users, catches naive bots */}
      <div aria-hidden className="absolute -left-[9999px]" tabIndex={-1}>
        <label htmlFor="hp">Leave this empty</label>
        <input id="hp" type="text" tabIndex={-1} autoComplete="off" {...register("hp")} />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Full name" htmlFor="name" required error={errors.name?.message}>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
            placeholder="What should we call you?"
            className={inputCls(!!errors.name)}
            {...register("name")}
          />
        </Field>
        <Field label="Work email" htmlFor="email" required error={errors.email?.message}>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? "email-error" : undefined}
            placeholder="An email you actually check"
            className={inputCls(!!errors.email)}
            {...register("email")}
          />
        </Field>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Company" htmlFor="company" error={errors.company?.message}>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            aria-invalid={!!errors.company}
            placeholder="Where you work (optional)"
            className={inputCls(!!errors.company)}
            {...register("company")}
          />
        </Field>
        <Field label="Website" htmlFor="website" error={errors.website?.message}>
          <input
            id="website"
            type="url"
            autoComplete="url"
            aria-invalid={!!errors.website}
            placeholder="https:// (optional)"
            className={inputCls(!!errors.website)}
            {...register("website")}
          />
        </Field>
      </div>

      <Field label="Monthly budget" htmlFor="budget" error={errors.budget?.message}>
        <div
          className="grid grid-cols-2 sm:grid-cols-3 gap-2"
          role="radiogroup"
          aria-labelledby="budget-label"
        >
          {budgets.map((b) => {
            const inputId = `budget-${b.v}`;
            return (
              <label key={b.v} htmlFor={inputId} className="cursor-pointer">
                <input
                  id={inputId}
                  type="radio"
                  value={b.v}
                  className="peer sr-only"
                  checked={budgetValue === b.v}
                  {...register("budget")}
                  onChange={() => {
                    register("budget").onChange({
                      target: { name: "budget", value: b.v },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }}
                />
                <span
                  className={cn(
                    "block px-3 py-2.5 rounded-xl border text-sm text-center transition-all",
                    "bg-background dark:bg-muted border-border dark:border-border",
                    "text-foreground dark:text-foreground",
                    "hover:border-foreground dark:hover:border-border",
                    budgetValue === b.v ? "border-accent bg-accent-soft text-primary" : "",
                  )}
                >
                  {b.l}
                </span>
              </label>
            );
          })}
        </div>
      </Field>

      <Field
        label="What are you trying to achieve?"
        htmlFor="message"
        required
        error={errors.message?.message}
      >
        <textarea
          id="message"
          rows={5}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : undefined}
          placeholder="What are you trying to build, in two or three sentences? We read every one."
          className={cn(inputCls(!!errors.message), "min-h-[120px] resize-y")}
          {...register("message")}
        />
      </Field>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
        <p className="text-xs text-muted-foreground max-w-md">
          By submitting, you agree to our{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
          . We respond within one business day. No spam, ever.
        </p>
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
          trackAs="contact_submit"
          aria-label={submitting ? "Sending your brief" : "Send brief"}
        >
          {submitting ? "Sending\u2026" : "Send brief"}
        </Button>
      </div>

      {serverError && serverError !== "validation_failed" && (
        <p
          role="alert"
          className="text-sm text-primary bg-accent-soft border border-accent/20 rounded-xl px-4 py-3"
        >
          Something went wrong sending your brief. Please email{" "}
          <a href="mailto:zerboutbrahimamir@gmail.com" className="underline">
            zerboutbrahimamir@gmail.com
          </a>{" "}
          directly.
        </p>
      )}
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  const errorId = `${htmlFor}-error`;
  return (
    <label htmlFor={htmlFor} className="block">
      <span id={`${htmlFor}-label`} className="block text-sm font-medium text-foreground mb-1.5">
        {label}{" "}
        {required && (
          <span className="text-accent" aria-hidden>
            *
          </span>
        )}
      </span>
      {children}
      {error && (
        <span id={errorId} role="alert" className="block mt-1.5 text-xs text-primary">
          {error}
        </span>
      )}
    </label>
  );
}

function inputCls(hasError?: boolean) {
  return cn(
    "block w-full rounded-lg bg-background dark:bg-background border border-border dark:border-border px-4 h-12 text-[15px] text-foreground dark:text-foreground placeholder:text-muted-foreground/40 dark:placeholder:text-muted-foreground transition-colors",
    "focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent",
    hasError
      ? "border-accent"
      : "border-border dark:border-border hover:border-foreground/30 dark:hover:border-foreground/20",
  );
}
