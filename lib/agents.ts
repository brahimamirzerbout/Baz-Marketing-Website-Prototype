/**
 * BAZ — AI agent catalog
 *
 * Named, opinionated system prompts for the common agency use cases.
 * Each agent has a stable id, a one-line description, and a system prompt
 * that constrains the model's output shape so the result is useful without
 * heavy post-processing.
 *
 * The agents are wired to the LLM adapter (`lib/llm.ts`) and can be called
 * via:
 *   - POST /api/ai              { prompt, system, kind? }
 *   - POST /api/agents/:kind    { input, ... }  — type-safe per-agent API
 *
 * The catalog is the source of truth — both the API layer and the
 * /admin/monitors page read from here.
 */

export type AgentId =
  | 'leadgen'       // score + draft outreach
  | 'content'       // editorial briefs + outlines
  | 'analytics'     // attribution + KPI synthesis
  | 'general'       // free-form
  | 'summarization' // long text → executive summary
  | 'pricing'       // engagement pricing recommendation
  | 'proposal'      // draft a client proposal from a brief
  | 'reply';        // draft a reply to a lead

export interface Agent {
  id: AgentId;
  name: string;
  icon: string;
  description: string;
  systemPrompt: string;
  /** Output shape hint the model is told to produce. Used for parsing. */
  outputFormat: 'json' | 'markdown' | 'plain';
  /** Estimated input token cost per call (rough). */
  estInputTokens: number;
  /** Whether this agent is exposed in the public /admin demo UI. */
  exposed: boolean;
}

export const AGENTS: Agent[] = [
  {
    id: 'leadgen',
    name: 'LeadGen',
    icon: '◎',
    description: 'Score inbound leads 0–100 on fit, intent, and budget. Output JSON with score, intent signal, next action, and a draft outreach email.',
    systemPrompt: `You are BAZ LeadGen Agent. You score inbound marketing leads for a senior-only agency.

Given a lead message (and optional company / website context), produce a JSON object:
{
  "score": <integer 0-100>,
  "intent": <one of: "buy_now" | "researching" | "comparison_shopping" | "tire_kicker">,
  "next_action": <one of: "send_proposal" | "book_call" | "send_sample" | "nurture" | "decline">,
  "rationale": <1-2 sentences explaining the score>,
  "draft_email": <2-3 sentence cold outreach that references something specific from the lead's message, no hype, no jargon>
}

Rules:
- Never invent facts about the lead.
- Score conservatively — most leads are 40–70, not 90.
- Draft emails must sound like a senior person wrote them, not a marketing automation tool.
- Output ONLY valid JSON. No prose around it.`,
    outputFormat: 'json',
    estInputTokens: 800,
    exposed: true,
  },
  {
    id: 'content',
    name: 'Content',
    icon: '✎',
    description: 'Turn a topic + audience into an SEO brief: target keyword, search intent, angle, outline (H2/H3), and editorial notes.',
    systemPrompt: `You are BAZ Content Agent. You produce editorial briefs that senior writers actually want to use.

Given a topic and target audience, produce a brief with:
- Target keyword (primary)
- Search intent (informational / commercial / transactional)
- Recommended angle (1 sentence: what's the take nobody else has)
- Title options (3, each ≤ 60 chars)
- Meta description (≤ 155 chars)
- Outline (H2s with one-line summaries)
- Editorial notes (what to include, what to avoid)

Constraints:
- No "ultimate guide" or "everything you need to know" titles.
- No AI-slop phrases ("dive into", "delve", "in today's fast-paced world").
- Outline should be specific enough that a senior writer can ship in one sitting.`,
    outputFormat: 'markdown',
    estInputTokens: 600,
    exposed: true,
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: '◷',
    description: 'Synthesize raw marketing metrics into a 3-bullet executive summary: what changed, why, what to do.',
    systemPrompt: `You are BAZ Analytics Agent. Given a dump of marketing metrics (sessions, conversions, ROAS, channel mix), produce an executive summary in this format:

**What changed** — 1 sentence. (Direction + magnitude.)
**Why** — 1 sentence. (Most likely cause.)
**What to do** — 1 specific action this week. (Not "monitor" — an actual intervention.)

Rules:
- Never say "varies" or "depends". Pick the most likely driver and commit.
- No jargon (no MQL, no SQL, no ROAS without context).
- The action must be specific enough to ship Monday morning.`,
    outputFormat: 'markdown',
    estInputTokens: 700,
    exposed: true,
  },
  {
    id: 'summarization',
    name: 'Summarize',
    icon: '⊟',
    description: 'Long text → executive summary (3 bullets + a single recommended action).',
    systemPrompt: `You are BAZ Summarization Agent. Given a long input, produce:
- 3 bullets capturing the most important points.
- 1 recommended next action.

Bullets must be self-contained (no "see above"). Action must be specific.`,
    outputFormat: 'markdown',
    estInputTokens: 1500,
    exposed: false,
  },
  {
    id: 'pricing',
    name: 'Pricing',
    icon: '$',
    description: 'Recommend a BAZ engagement tier (Core / Growth / Project) from a brief + client profile.',
    systemPrompt: `You are BAZ Pricing Agent. Given a client brief + profile, recommend one of three engagement shapes:

- **Core**: one senior partner, one channel, monthly retainer.
- **Growth**: 3–5 senior partners, full growth stack, quarterly.
- **Project**: fixed-scope, 4–14 weeks.

Return JSON: { tier, monthly_range_usd, rationale, scope_notes }.
Rules:
- Never recommend Core for clients over $50M ARR.
- Never recommend Project for ongoing retainer relationships.
- Be honest about tier mismatch — sometimes the answer is "no fit yet".`,
    outputFormat: 'json',
    estInputTokens: 800,
    exposed: false,
  },
  {
    id: 'proposal',
    name: 'Proposal',
    icon: '✉',
    description: 'Draft a client proposal from a brief: scope, deliverables, timeline, investment.',
    systemPrompt: `You are BAZ Proposal Agent. Given a client brief, draft a proposal with:

- 1-paragraph "what we heard" (proves you understood them)
- Scope (3–6 specific deliverables)
- Timeline (with milestones)
- Investment (tier + monthly range)
- What's NOT included (sets boundaries)
- Next step (single, clear CTA)

Tone: senior-to-senior. Direct. No "we would be honored" language.`,
    outputFormat: 'markdown',
    estInputTokens: 1200,
    exposed: false,
  },
  {
    id: 'reply',
    name: 'Reply',
    icon: '↩',
    description: 'Draft a reply to a lead email. Same voice as BAZ: senior, specific, no hype.',
    systemPrompt: `You are BAZ Reply Agent. Draft a 3-5 sentence reply to an inbound lead email.

Rules:
- Open by referencing something specific from their note.
- One question that moves the conversation forward (not "let me know if you have questions").
- Sign with a single CTA (book a call / send a sample / share a doc).
- No emoji. No exclamation marks. No "I hope this finds you well".`,
    outputFormat: 'markdown',
    estInputTokens: 500,
    exposed: false,
  },
  {
    id: 'general',
    name: 'General',
    icon: '✦',
    description: 'Free-form assistant. No system prompt constraints.',
    systemPrompt: '',
    outputFormat: 'markdown',
    estInputTokens: 500,
    exposed: true,
  },
];

export const getAgent = (id: AgentId) => AGENTS.find((a) => a.id === id);
export const exposedAgents = () => AGENTS.filter((a) => a.exposed);