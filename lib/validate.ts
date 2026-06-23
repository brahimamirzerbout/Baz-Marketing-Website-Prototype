/**
 * Tiny, dependency-free form validation. Returns `{ ok, data, errors }`
 * with per-field error messages. Used by `lib/actions.ts` and the contact
 * form's optimistic UI.
 */

export type FieldErrors = Record<string, string>;

export type ValidationResult<T> =
  | { ok: true; data: T; errors: FieldErrors }
  | { ok: false; data: null; errors: FieldErrors };

export type Rule<T> = {
  field: keyof T & string;
  test: (value: unknown) => true | string;
};

function isString(v: unknown): v is string { return typeof v === 'string'; }
function isObject(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateLead(input: unknown): ValidationResult<{
  name: string;
  email: string;
  company: string;
  website: string;
  budget: string;
  message: string;
  source: string;
  hp: string;
}> {
  const errors: FieldErrors = {};

  if (!isObject(input)) {
    return { ok: false, data: null, errors: { _form: 'Invalid request body' } };
  }

  const name = String(input.name ?? '').trim();
  const email = String(input.email ?? '').trim();
  const company = String(input.company ?? '').trim();
  const website = String(input.website ?? '').trim();
  const budget = String(input.budget ?? '').trim();
  const message = String(input.message ?? '').trim();
  const source = String(input.source ?? '').trim();
  const hp = String(input.hp ?? '');

  if (name.length < 2) errors.name = 'Please enter your full name.';
  if (name.length > 100) errors.name = 'Name is too long.';
  if (!EMAIL.test(email)) errors.email = 'Please enter a valid work email.';
  if (company.length > 200) errors.company = 'Company name is too long.';
  if (website) {
    try { new URL(website); } catch { errors.website = 'Please enter a valid URL (https://…).'; }
  }
  if (message.length < 10) errors.message = 'Tell us a little about what you need (at least 10 characters).';
  if (message.length > 5000) errors.message = 'Message is too long.';

  if (Object.keys(errors).length > 0) {
    return { ok: false, data: null, errors };
  }
  return { ok: true, data: { name, email, company, website, budget, message, source, hp }, errors: {} };
}
