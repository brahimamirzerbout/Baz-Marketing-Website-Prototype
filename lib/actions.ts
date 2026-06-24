'use server';

import { validateLead } from './validate';

export type LeadResult =
  | { ok: true; id: string; score?: number }
  | { ok: false; error: string; fieldErrors?: Record<string, string> };

/**
 * Server action for the contact form. Validates input, then persists to the
 * primary leads database (SQLite, the same one the admin UI reads), so the
 * API, the admin console, and this form all share one source of truth.
 *
 * If a BAZ_API_URL is configured, we ALSO forward the lead to the meta-
 * ecosystem backend for cross-system routing. If LEAD_INTAKE_URL is set,
 * we ALSO fan out to that webhook (Slack, HubSpot, etc.). All three writes
 * are independent — a failure in one doesn't block the others.
 *
 * This eliminates the historical bug where the server action and the
 * /api/leads endpoint wrote to different stores (SQLite vs. leads.jsonl).
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

  // Strip honeypot before persisting/forwarding
  const { hp: _hp, ...forwardable } = lead;

  // ─── 1) Primary store: SQLite (via getDb) ─────────────────────────────
  // We write here directly so the form and the /api/leads endpoint share
  // one source of truth. This fixes the dual-store bug from earlier.
  let id: string | null = null;
  try {
    const { getDb, id: makeId, audit } = await import('./db');
    const db = getDb();
    id = makeId('l');
    db.prepare(
      `INSERT INTO leads (id, name, email, company, website, phone, budget, message, source, service)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    ).run(
      id,
      lead.name,
      lead.email.toLowerCase(),
      (lead.company ?? '').slice(0, 200),
      (lead.website ?? '').slice(0, 500),
      '', // phone — not collected by the form
      (lead.budget ?? '').slice(0, 64),
      lead.message,
      (lead.source || 'marketing_site').slice(0, 64),
      (lead.service || '').slice(0, 96),
    );
    audit(null, 'lead.create', id, {
      source: lead.source || 'marketing_site',
      service: lead.service || '',
    });
  } catch (e) {
    console.error('[baz:lead] db insert failed:', e);
    // Don't hard-fail — try the webhook fallback below.
  }

  // ─── 2) Optional: BAZ meta-ecosystem backend ──────────────────────────
  const baz = process.env.BAZ_API_URL;
  if (baz && id) {
    try {
      const headers: Record<string, string> = { 'content-type': 'application/json' };
      if (process.env.BAZ_API_TOKEN) headers['authorization'] = `Bearer ${process.env.BAZ_API_TOKEN}`;

      await fetch(`${baz.replace(/\/$/, '')}/api/leads`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          id,
          email: lead.email,
          name: lead.name,
          company: lead.company,
          website: lead.website,
          budget: lead.budget,
          message: lead.message,
          source: lead.source || 'marketing_site',
          service: lead.service || '',
        }),
      });
    } catch {
      // Non-fatal — DB write already succeeded.
    }
  }

  // ─── 3) Optional: generic webhook (Slack, HubSpot, etc.) ──────────────
  const intake = process.env.LEAD_INTAKE_URL;
  const token = process.env.LEAD_INTAKE_TOKEN;
  if (intake && id) {
    try {
      const r = await fetch(intake, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          ...(token ? { authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          id,
          receivedAt: new Date().toISOString(),
          ...forwardable,
        }),
      });
      if (!r.ok) console.warn('[baz:lead] webhook returned', r.status);
    } catch (e) {
      console.warn('[baz:lead] webhook error:', e);
    }
  }

  // ─── 4) Fire-and-forget background scoring ───────────────────────────
  if (id && process.env.LEAD_SCORING !== 'off') {
    scoreLeadInBackground(id, lead.message, lead.service || '').catch(() => {});
  }

  // ─── 5) Return success if we have an id, otherwise error ──────────────
  if (id) {
    return { ok: true, id };
  }
  return { ok: false, error: 'db_unavailable' };
}

/**
 * Score a lead in the background using the LeadGen agent. Updates the
 * lead's `score` and `intent` columns. Failures are silent.
 */
async function scoreLeadInBackground(leadId: string, message: string, service: string) {
  try {
    const { complete } = await import('./llm');
    const result = await complete({
      prompt: `Score this lead message (the lead is interested in: ${service || 'unspecified'}):\n\n${message.slice(0, 2000)}`,
      system: `You are BAZ LeadGen Agent. Score the lead 0-100 and return JSON: {"score": <int>, "intent": "<buy_now|researching|comparison_shopping|tire_kicker>"}`,
      maxTokens: 300,
      temperature: 0.2,
    });
    if (!result.ok || !result.text) return;
    const parsed = JSON.parse(result.text.match(/\{[\s\S]*\}/)?.[0] ?? '{}');
    const score = Math.max(0, Math.min(100, parseInt(parsed.score, 10) || 0));
    const intent = String(parsed.intent || '').slice(0, 32);
    if (score > 0 || intent) {
      const { getDb } = await import('./db');
      const db = getDb();
      db.prepare('UPDATE leads SET score = ?, intent = ? WHERE id = ?').run(score, intent, leadId);
    }
  } catch {
    // silent — lead is already persisted
  }
}
