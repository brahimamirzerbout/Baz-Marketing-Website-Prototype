// @ts-nocheck
/**
 * BAZ Lead Scoring Engine — deterministic, no-LLM-required.
 *
 * Why deterministic: the prototype must demo even when no API keys are set.
 * LLM-based scoring (lib/llm) is layered on top when available, but the
 * baseline score from this module is always present.
 *
 * Score range: 0-100. Higher = hotter.
 *
 * Inputs and weights:
 *   - Budget mentioned in message                  +0–25
 *   - Buying intent signals (specifics, timeline)  +0–25
 *   - Company size / website signals               +0–15
 *   - Source (hero CTA > contact form > cold)      +0–15
 *   - Recency / repeat engagement                  +0–10
 *   - Negative signals (price-only, students)      -10
 *
 * Intent classification: buy_now | researching | comparison_shopping | tire_kicker.
 */

export type Intent = "buy_now" | "researching" | "comparison_shopping" | "tire_kicker";

export interface ScoreInput {
  message?: string;
  budget?: string;
  company?: string;
  website?: string;
  source?: string;
  service?: string;
  /** Did the user complete an agent demo run? */
  demoCompleted?: boolean;
  /** Time-on-page in seconds (best-effort, from session storage). */
  timeOnPageSec?: number;
  /** Scroll depth 0-1 (best-effort, from session storage). */
  scrollDepth?: number;
  /** Number of agent runs in this session. */
  agentRuns?: number;
  /** Repeat visit? */
  isRepeat?: boolean;
}

export interface ScoreResult {
  score: number; // 0-100
  intent: Intent;
  reasons: string[]; // human-readable signals that drove the score
  recommendedAction: "book_call" | "send_proposal" | "nurture_7d" | "nurture_30d" | "archive";
}

const BUDGET_BANDS: Array<{ pattern: RegExp; value: number }> = [
  { pattern: /\b(100k\+|100,000\+|six[\s-]?figure|enterprise)\b/i, value: 25 },
  { pattern: /\b(50k|50,000|50[\s-]?100k)\b/i, value: 22 },
  { pattern: /\b(25k|25,000|25[\s-]?50k)\b/i, value: 18 },
  { pattern: /\b(10k|10,000|10[\s-]?25k)\b/i, value: 12 },
  { pattern: /\b(5k|5,000|under\s*10k|<10k)\b/i, value: 6 },
  { pattern: /\b(bootstrapp|runway|low[\s-]?budget|cheapest)\b/i, value: -10 },
];

const INTENT_BUY_NOW = [
  "ready to start",
  "starting next week",
  "need this asap",
  "this quarter",
  "need a proposal",
  "signing off",
  "budget approved",
  "want to hire",
  "need to ship",
  "rfp",
  "rfi",
  "looking to engage",
  "kickoff",
];

const INTENT_RESEARCHING = [
  "how do you",
  "what is your process",
  "case studies",
  "pricing page",
  "methodology",
  "approach",
  "tell me more",
  "more info",
  "curious",
  "learning about",
  "evaluate options",
];

const INTENT_COMPARISON = [
  "comparing",
  "vs",
  "alternative to",
  "also looking at",
  "talking to",
  "shortlist",
  "shortlisted",
  "decision matrix",
  "rfp",
  "pitch",
];

const NEGATIVE_SIGNALS = [
  "student",
  "learning",
  "class project",
  "homework",
  "free course",
  "just browsing",
  "no budget",
  "price check",
  "cheapest",
];

const SOURCE_WEIGHTS: Record<string, number> = {
  hero_agent_demo: 15,
  live_agent_demo: 15,
  hero_book_call: 12,
  pricing: 10,
  case_study: 8,
  contact_form: 6,
  portal_brief: 10,
  email: 4,
  manual_test: 0,
  unknown: 2,
};

function clamp(n: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, n));
}

function scoreBudget(budget?: string, message?: string): { score: number; reason?: string } {
  const text = `${budget ?? ""} ${message ?? ""}`;
  for (const { pattern, value } of BUDGET_BANDS) {
    if (pattern.test(text)) {
      if (value < 0) return { score: value, reason: `budget concern (${value})` };
      return { score: value, reason: `budget signal +${value}` };
    }
  }
  if (budget && budget.trim().length > 0) return { score: 5, reason: "budget stated +5" };
  return { score: 0 };
}

function classifyIntent(
  message?: string,
  source?: string,
): { intent: Intent; score: number; reason?: string } {
  const m = (message ?? "").toLowerCase();
  if (!m && source === "hero_agent_demo")
    return { intent: "buy_now", score: 8, reason: "ran agent demo +8" };
  if (!m) return { intent: "researching", score: 2 };

  let buyHits = 0,
    researchHits = 0,
    compareHits = 0;
  for (const w of INTENT_BUY_NOW) if (m.includes(w)) buyHits++;
  for (const w of INTENT_RESEARCHING) if (m.includes(w)) researchHits++;
  for (const w of INTENT_COMPARISON) if (m.includes(w)) compareHits++;

  for (const w of NEGATIVE_SIGNALS)
    if (m.includes(w))
      return { intent: "tire_kicker", score: -10, reason: `negative signal: "${w}"` };

  if (buyHits > 0 && buyHits >= researchHits && buyHits >= compareHits) {
    return {
      intent: "buy_now",
      score: 20 + Math.min(buyHits - 1, 1) * 5,
      reason: `buy-now language +${20}`,
    };
  }
  if (compareHits > 0 && compareHits >= researchHits) {
    return { intent: "comparison_shopping", score: 12, reason: "comparison shopping +12" };
  }
  if (researchHits > 0) return { intent: "researching", score: 5, reason: "researching +5" };

  // Generic length-based heuristic: longer, specific messages score higher.
  if (m.length > 200) return { intent: "researching", score: 5, reason: "detailed message +5" };
  return { intent: "researching", score: 0 };
}

function scoreCompanySignals(
  company?: string,
  website?: string,
): { score: number; reason?: string } {
  let score = 0;
  const reasons: string[] = [];
  if (company && company.length > 1) {
    score += 5;
    reasons.push("company given +5");
  }
  if (website) {
    try {
      const u = new URL(website);
      const host = u.hostname.toLowerCase();
      if (host.endsWith(".com") || host.endsWith(".io") || host.endsWith(".co")) {
        score += 5;
        reasons.push("real-looking domain +5");
      }
    } catch {
      score += 2;
      reasons.push("website given +2");
    }
  }
  return { score, reason: reasons.join(", ") };
}

function scoreEngagement(input: ScoreInput): { score: number; reasons: string[] } {
  let score = 0;
  const reasons: string[] = [];
  if (input.demoCompleted) {
    score += 10;
    reasons.push("agent demo completed +10");
  }
  if (input.agentRuns && input.agentRuns >= 2) {
    score += 5;
    reasons.push(`${input.agentRuns} agent runs +5`);
  }
  if (input.timeOnPageSec && input.timeOnPageSec > 90) {
    score += 5;
    reasons.push("time on page +5");
  }
  if (input.scrollDepth && input.scrollDepth > 0.6) {
    score += 5;
    reasons.push("scroll depth +5");
  }
  if (input.isRepeat) {
    score += 10;
    reasons.push("repeat visit +10");
  }
  return { score, reasons };
}

function decideAction(score: number, intent: Intent): ScoreResult["recommendedAction"] {
  if (intent === "tire_kicker") return "archive";
  if (score >= 75) return "book_call";
  if (score >= 50) return "send_proposal";
  if (score >= 25) return "nurture_7d";
  return "nurture_30d";
}

export function scoreLead(input: ScoreInput): ScoreResult {
  const reasons: string[] = [];

  const budget = scoreBudget(input.budget, input.message);
  if (budget.reason) reasons.push(budget.reason);

  const intent = classifyIntent(input.message, input.source);
  if (intent.reason) reasons.push(intent.reason);

  const company = scoreCompanySignals(input.company, input.website);
  if (company.reason) reasons.push(company.reason);

  const sourceWeight = SOURCE_WEIGHTS[input.source ?? "unknown"] ?? SOURCE_WEIGHTS.unknown;
  if (sourceWeight > 0) reasons.push(`source ${input.source ?? "unknown"} +${sourceWeight}`);

  const engagement = scoreEngagement(input);
  reasons.push(...engagement.reasons);

  const total = clamp(
    10 + // baseline so a totally empty lead is still 10/100
      budget.score +
      intent.score +
      company.score +
      sourceWeight +
      engagement.score,
    0,
    100,
  );

  return {
    score: total,
    intent: intent.intent,
    reasons,
    recommendedAction: decideAction(total, intent.intent),
  };
}

/**
 * Routing plan: the next step the system takes automatically.
 * Surfaced to the lead in `/portal/sequence` and to the operator in the dashboard.
 */
export interface RoutingPlan {
  action: ScoreResult["recommendedAction"];
  steps: Array<{
    day: number;
    channel: "email" | "call" | "sms" | "retarget";
    subject?: string;
    body?: string;
  }>;
}

export function buildRoutingPlan(result: ScoreResult): RoutingPlan {
  const actions: Record<ScoreResult["recommendedAction"], RoutingPlan> = {
    book_call: {
      action: "book_call",
      steps: [
        {
          day: 0,
          channel: "email",
          subject: "Quick call this week?",
          body: "Send Cal.com link + 2 windows.",
        },
        { day: 1, channel: "call", subject: "Outbound call attempt 1" },
        {
          day: 3,
          channel: "email",
          subject: "No pressure: case study + slot",
          body: "One relevant case study + a slot.",
        },
      ],
    },
    send_proposal: {
      action: "send_proposal",
      steps: [
        {
          day: 0,
          channel: "email",
          subject: "Your tailored scope",
          body: "Mini-proposal scoped to the service.",
        },
        {
          day: 4,
          channel: "email",
          subject: "Quick question",
          body: "Open question to surface blockers.",
        },
        { day: 10, channel: "retarget", subject: "LinkedIn retarget 14d" },
      ],
    },
    nurture_7d: {
      action: "nurture_7d",
      steps: [
        {
          day: 0,
          channel: "email",
          subject: "A useful resource for now",
          body: "Top-of-funnel play.",
        },
        { day: 3, channel: "email", subject: "A case study, not a pitch" },
        { day: 7, channel: "email", subject: "Should we talk?" },
      ],
    },
    nurture_30d: {
      action: "nurture_30d",
      steps: [
        { day: 0, channel: "email", subject: "Welcome to the BAZ list" },
        { day: 7, channel: "email", subject: "One thing we shipped this week" },
        { day: 21, channel: "email", subject: "When you’re ready" },
      ],
    },
    archive: {
      action: "archive",
      steps: [],
    },
  };
  const a = result.recommendedAction;
  return actions[a];
}
