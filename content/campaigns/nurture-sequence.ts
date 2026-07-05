/**
 * BAZ Email Nurture Campaign — "The 90-Day Growth Playbook"
 *
 * This is the primary lead nurture sequence. It runs for 6 emails over 21 days
 * after a lead submits the contact form or books a call.
 *
 * Every email is written in BAZ's voice: specific, skeptical, senior.
 * No "leverage", no "seamless", no "transform your workflow".
 *
 * Campaign metrics to track:
 *   - Open rate (target: 55%+)
 *   - Click rate (target: 12%+)
 *   - Reply rate (target: 5%+)
 *   - Call-to-call conversion (target: 15%)
 *
 * Send via: Resend, Customer.io, or HubSpot
 * Track via: BAZ Marketing Hub → Sequences → "90-Day Growth Playbook"
 */

export interface NurtureEmail {
  day: number;          // Days after lead creation
  subject: string;       // Email subject line
  preheader: string;    // Preview text (55 chars max)
  body: string;         // Plain text body (under 300 words)
  cta: string;          // CTA button text
  ctaHref: string;      // CTA link
  trackAs: string;      // Analytics event name
}

export const nurtureSequence: NurtureEmail[] = [
  // ─── EMAIL 1: THE CONFIRMATION (Day 0, immediate) ───
  {
    day: 0,
    subject: "Got your brief — here's what happens next",
    preheader: "A senior partner reads every brief. Reply within one business day.",
    body: `Hi {{firstName}},

Got your brief. A senior partner will read it today and reply within one business day.

If it's urgent, write us at zerboutbrahimamir@gmail.com.

In the meantime, three things worth knowing:

1. We ship the first measurable artifact within 14 days of kickoff — or month 1 is free. We've never paid out.

2. Every engagement has a written 90-day plan with named owners and exit criteria. Not a deck.

3. The people who pitch the work are the people who ship it. No junior pods.

— BAZ`,
    cta: "Read the methodology →",
    ctaHref: "/methodology",
    trackAs: "nurture_day0_confirmation",
  },

  // ─── EMAIL 2: THE PROOF (Day 3) ───
  {
    day: 3,
    subject: "Three case studies, named metrics, no fluff",
    preheader: "ViralVista ROAS 1.8→4.6. Northwind 0→480K/mo organic. EngageEra trial→paid 0.6%→2.4%.",
    body: `{{firstName}},

Three outcomes, all named and attributed:

1. ViralVista (DTC Beauty): ROAS went from 1.8 to 4.6 in 90 days. Rebuilt the creative matrix around UGC creators and layered search to capture branded demand. The tracking was server-side CAPI — they can see exactly which dollar came from which ad.

2. Northwind (FinTech): 0 to 480K monthly organic sessions in 14 months. Built a topical map around comparison and alternative queries, shipped a programmatic SEO engine, and earned placements in 8 industry publications. Inbound pipeline now exceeds outbound.

3. EngageEra (B2B SaaS): Trial-to-paid conversion went from 0.6% to 2.4% in six months. Rebuilt the homepage around PQL scoring, instrumented lifecycle flows in Customer.io, and ran a structured paid + content engine to fill the top of funnel. New MRR up 318%.

Each case is documented. The metrics are named. Read them:

→ ViralVista: /case-studies/viralvista-growth-engine
→ Northwind: /case-studies/northwind-fintech-seo
→ EngageEra: /case-studies/engageera-saas-launch

— BAZ`,
    cta: "See all case studies →",
    ctaHref: "/case-studies",
    trackAs: "nurture_day3_proof",
  },

  // ─── EMAIL 3: THE METHODOLOGY (Day 7) ───
  {
    day: 7,
    subject: "How we actually work (the methodology, in public)",
    preheader: "Diagnose. Plan. Ship. Score. Learn. Every step documented.",
    body: `{{firstName}},

Most agencies sell hours. We sell outcomes. Here's exactly how we get there:

1. Diagnose (Week 1): Pull your CRM, ad accounts, GA4, and server-side events. Map the funnel. Score 100 leads by hand. Tell you what we found before we invoice.

2. Plan (Week 2): A 90-day plan with owners, budgets, and exit criteria. Your team edits it. We pre-commit to the targets.

3. Ship (Weeks 3–10): Two-week sprints. Each sprint ships something measurable. No "we're strategizing."

4. Score & Learn (Every 60 seconds, in public): The Marketing Hub ticks every 60 seconds — score leads, route to sequences, advance steps, log outcomes. You can watch your own loop live.

The scoring formula is public. The methodology is published. We don't hide behind decks.

→ /methodology

— BAZ`,
    cta: "Read the methodology →",
    ctaHref: "/methodology",
    trackAs: "nurture_day7_methodology",
  },

  // ─── EMAIL 4: THE OBJECTION HANDLER (Day 10) ───
  {
    day: 10,
    subject: "Where we win. Where we don't.",
    preheader: "Honest comparison. We publish positions, including the wrong ones.",
    body: `{{firstName}},

Other agencies do things we don't. We do things they don't. This is so you can tell in five minutes whether we're the right fit:

We win on:
- Senior team, no juniors (the people who pitch ship the work)
- Live client dashboard (the Marketing Hub, not a PDF on the 15th)
- Outcome-based pricing (tied to a real guarantee)
- Speed guarantee in writing (14 days or month 1 free, never paid out)
- Open methodology (scoring formula, attribution model, all public)
- Source code visible to clients

We don't win on:
- À la carte services (we sell engagements, not hours)
- Industry awards (we don't enter them)
- Local-only teams (we work remote across MENA, EU, US)

Full comparison: /vs-others

— BAZ`,
    cta: "See the comparison →",
    ctaHref: "/vs-others",
    trackAs: "nurture_day10_objection",
  },

  // ─── EMAIL 5: THE INDUSTRY PLAYBOOK (Day 14) ───
  {
    day: 14,
    subject: "The playbook for {{industry}}",
    preheader: "Industry-specific strategy, not generic growth tips.",
    body: `{{firstName}},

Generic growth advice is useless. The playbook that works for a DTC beauty brand doesn't work for a B2B SaaS company.

Here's what we know about your industry:

{{industrySpecificInsight}}

This isn't theory. It's what we've shipped for clients in similar positions.

Read the industry playbooks: /industries

— BAZ`,
    cta: "See industry playbooks →",
    ctaHref: "/industries",
    trackAs: "nurture_day14_industry",
  },

  // ─── EMAIL 6: THE FINAL PUSH (Day 21) ───
  {
    day: 21,
    subject: "Last email — are we the right fit?",
    preheader: "If we're not, we'll tell you. If we are, let's talk.",
    body: `{{firstName}},

This is the last email in this sequence.

If you've read this far, something resonated. Here's what I'd suggest:

If you're still evaluating: book a 20-minute call. A senior partner will review your funnel, channels, and unit economics. If we're not the right fit, we'll tell you in the first 10 minutes and refer you to someone who is.

If you're not ready yet: no problem. We'll be here when you are. The 90-day guarantee doesn't expire.

If you want to see the product first: the Marketing Hub is live. /marketing-hub

Either way, I'd appreciate hearing back — even if it's just "not right now."

— Brahim ZERBOUT
Founder, BAZ`,
    cta: "Book a 20-minute growth call →",
    ctaHref: "/book",
    trackAs: "nurture_day21_final",
  },
];

/**
 * Industry-specific insights for nurture email #5.
 * Keyed by the service/category the lead expressed interest in.
 */
export const industryInsights: Record<string, string> = {
  "performance-marketing": "DTC and e-commerce brands we work with see ROAS improvements of 2–4x within 90 days. The key is server-side tracking that survives iOS, a creative matrix that ships weekly, and lifecycle flows that compound LTV. We've managed $24M+ in paid spend across Meta, TikTok, and LinkedIn.",
  "seo-organic": "B2B SaaS companies that invest in topical authority see compound traffic growth for years. We've taken brands from 0 to 480K monthly organic sessions in 14 months. The key is entity-first content strategy, digital PR, and programmatic SEO.",
  "content-engine": "Senior-led editorial compounds into revenue, not just traffic. We publish 8–24 pieces per month, each tied to a search intent and a funnel outcome. 94% indexed in 90 days. Average session time: 3:42.",
  "brand-identity": "Brands that invest in identity systems see +58% aided recall and 95% internal adoption. Rebrands we ship take 8–14 weeks end-to-end, with naming, guidelines, and asset migration included.",
  "cro-experimentation": "+31% average CVR lift. 60+ tests per quarter. 120+ winning variants shipped. We run CRO as a system, not a series of guesses — research-backed hypotheses, designed for the metric they own, tested with statistical rigor.",
  "lifecycle-email-sms": "Lifecycle programs we build generate $48M+ in revenue across 9 flows. Average open rate: 42%. Inbox placement: 97%. We own the strategy, flows, copy, and creative end-to-end.",
  "crm-mops": "CRM migrations we've done: 40+. Average forecast accuracy after: 92%. Sales hours saved per week: 18+. We handle HubSpot, Salesforce, and Attio.",
  "analytics-attribution": "180+ dashboards shipped. Average data accuracy: 99.4%. Executive adoption: 92%. We build in Looker, Tableau, and PowerBI, with attribution modeling that survives a CFO review.",
  "ai-search-optimization": "28 AI Overview citations earned across priority queries. Branded search volume up 4.3×. The key is entity-first content strategy, schema, and digital PR that earns citations from authoritative sources.",
  "social-media": "110+ channels managed. Average follower growth over 12 months: +184%. Engagement rate: 4.7%. We run platform strategy, content production, community management, and reporting.",
  "influencer-marketing": "$11 EMV per $1 spent. 2,800+ creators activated. 40+ creative variants per month per active channel. Tiered creator programs with whitelisting and paid amplification.",
  "video-production": "1,400+ videos shipped. Average view-through rate: 62%. 24 podcasts in production. In-house studio with global shoot capability.",
  "affiliate-partnerships": "60+ programs launched. Average partner-driven revenue lift: +38%. 240+ active partners per program. We build on Impact, PartnerStack, and TUNE.",
  "abm-b2b-demand": "60+ ABM programs shipped. Average pipeline lift: +142%. Sales cycle reduction: -27%. Tier-1 ABM across 180 named accounts in 9 months.",
  "public-relations": "420+ Tier-1 placements in 12 months. Average domain authority of outlets: 78. 180+ executive bylines placed. Narrative design, media relations, and crisis comms.",
  "market-research": "120+ studies shipped. 1,800 average respondents per study. 34 markets covered. Conjoint pricing, brand tracking, and category design.",
  "internationalization": "34 markets entered. Average time-to-traction: under 6 months. 180 assets localized per month. Localization, regional SEO, and partner network.",
  "default": "Senior-only growth partners, 8 departments, one integrated system. We run owned, earned, paid, and data channels end-to-end — with a live dashboard, a scoring loop, and a 14-day speed guarantee.",
};

/**
 * Get the insight for a given service/category.
 * Falls back to the default if no match.
 */
export function getInsight(service?: string): string {
  if (!service) return industryInsights["default"] ?? "";
  const key = service.toLowerCase().replace(/\s+/g, "-");
  return industryInsights[key] ?? industryInsights["default"] ?? "";
}