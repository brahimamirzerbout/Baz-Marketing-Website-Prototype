'use server';

import { validateLead } from './validate';

export type LeadResult =
  | { ok: true; id: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Server action for the contact form. Validates input, then forwards
 * to a configured intake endpoint if LEAD_INTAKE_URL is set, otherwise
 * logs and returns success (so dev and demo work without external wiring).
 */
export async function submitLead(raw: unknown): Promise<LeadResult> {
  const parsed = validateLead(raw);
  if (!parsed.ok) {
    return { ok: false, error: 'validation_failed', fieldErrors: parsed.errors };
  }

  const lead = parsed.data;
  // Honeypot: silently succeed without forwarding.
  if (lead.hp && lead.hp.length > 0) {
    return { ok: true, id: 'silenced' };
  }

  const intake = process.env.LEAD_INTAKE_URL;
  const token = process.env.LEAD_INTAKE_TOKEN;
  const id = `lead_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  // Strip honeypot before forwarding
  const { hp: _hp, ...forwardable } = lead;

  if (!intake) {
    console.log('[baz:lead]', { id, ...forwardable });
    return { ok: true, id };
  }

  try {
    const r = await fetch(intake, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ id, receivedAt: new Date().toISOString(), ...forwardable }),
    });
    if (!r.ok) return { ok: false, error: `upstream_${r.status}` };
    return { ok: true, id };
  } catch {
    return { ok: false, error: 'network_error' };
  }
}
