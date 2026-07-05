import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60_000;
const RATE_LIMIT_MAX = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW);
  rateLimitMap.set(ip, recent);
  if (recent.length >= RATE_LIMIT_MAX) return false;
  recent.push(now);
  return true;
}

const responseTemplates = [
  {
    keywords: ["win rate", "conversion rate", "close rate", "won"],
    getAnswer: (_q: string) =>
      `Your current win rate across all active campaigns is **67.3%**, up 4.2% from last quarter. The highest-converting channel remains LinkedIn outreach at 81%, followed by email nurture sequences at 59%. I'd recommend doubling down on the mid-funnel email sequences — they have the biggest gap between volume and conversion.`,
    confidence: 0.88,
    sources: [
      { title: "Campaign Performance Q2", url: "/hub/campaigns" },
      { title: "Pipeline Conversion Analysis", url: "/hub/analytics/conversion" },
      { title: "Channel Attribution Report", url: "/hub/analytics/attribution" },
    ],
    actions: [
      { label: "Review top-winning campaigns", description: "Open campaign dashboard filtered by win rate" },
      { label: "Optimize email nurture flow", description: "Edit the mid-funnel email sequence in the CRM" },
    ],
    followups: [
      "Which channels have the lowest conversion rates?",
      "Show me the win rate by sales rep",
      "What's our average deal size this quarter?",
    ],
  },
  {
    keywords: ["trend", "trending", "growing", "emerge", "market"],
    getAnswer: (_q: string) =>
      `Based on the latest market scan, three trends are gaining momentum in our space:\n\n**1. AI-powered personalisation** — 74% of B2B buyers now expect tailored content at first touch.\n**2. Zero-party data collection** — Brands that ask (rather than guess) see 2.3× engagement.\n**3. Short-form video for ABM** — Account-based video messages have a 49% higher reply rate than text.\n\nWe've already started positioning around trend #1 with the new AI Playbook series.`,
    confidence: 0.92,
    sources: [
      { title: "Q3 Trend Report", url: "/hub/insights/trends" },
      { title: "B2B Buyer Behaviour Study", url: "/hub/library/research" },
      { title: "Competitive Landscape Analysis", url: "/hub/analytics/competitive" },
    ],
    actions: [
      { label: "Schedule trend deep-dive", description: "Book a strategy session on AI personalisation" },
      { label: "Update content calendar", description: "Align upcoming posts with trending topics" },
    ],
    followups: [
      "Which trends are declining?",
      "How do our competitors position on AI?",
      "What content should I create around these trends?",
    ],
  },
  {
    keywords: ["work on", "priority", "this week", "focus", "should i"],
    getAnswer: (_q: string) =>
      `Here's your suggested priority stack for this week:\n\n**P0 — Campaign Q3 launch:** The email assets are still in review. Push for sign-off by Wednesday to hit the launch window.\n**P1 — Pipeline health:** 14 leads have gone dark in the last 72 hours. A re-engagement sequence could recover ~30% of them.\n**P2 — Weekly digest prep:** The executive summary for Friday's digest needs your final pass on the competitive section.\n\nI can draft any of these if you need a head start.`,
    confidence: 0.85,
    sources: [
      { title: "Task Board", url: "/hub/tasks" },
      { title: "Pipeline Dashboard", url: "/hub/pipeline" },
      { title: "Content Calendar", url: "/hub/calendar" },
    ],
    actions: [
      { label: "Create re-engagement sequence", description: "Auto-generate a 3-email re-engagement flow" },
      { label: "Review Q3 campaign assets", description: "Open the Q3 asset review board" },
    ],
    followups: [
      "Draft the re-engagement email sequence",
      "What's the status on Q3 campaign assets?",
      "Who leads the competitive section in the digest?",
    ],
  },
  {
    keywords: ["digest", "this week", "weekly", "summary"],
    getAnswer: (_q: string) =>
      `Here's your **Weekly Digest snapshot**:\n\n**📈 Pipeline:** +12% new opportunities (42 new leads, 6 qualified)\n**📊 Campaigns:** Top performer — "ABM Breakthrough" series (2.1% conversion, $48K influenced)\n**📝 Content:** Published 4 pieces, best performer is "The AI Advantage in B2B" (3.4K views)\n**⚡ Alerts:** 2 accounts at risk — Lawson Tech and BridgePoint.\n\nDetailed breakdown is on the dashboard.`,
    confidence: 0.94,
    sources: [
      { title: "Weekly Digest Archive", url: "/hub/digest" },
      { title: "Campaign Performance", url: "/hub/campaigns" },
      { title: "Account Health Dashboard", url: "/hub/accounts/health" },
      { title: "Content Analytics", url: "/hub/analytics/content" },
    ],
    actions: [
      { label: "View full digest", description: "Open the complete weekly digest report" },
      { label: "Review at-risk accounts", description: "Jump to account health for Lawson Tech and BridgePoint" },
      { label: "Share digest with team", description: "Email a PDF version to the team" },
    ],
    followups: [
      "What's the breakdown on at-risk accounts?",
      "Which content pieces performed best?",
      "How does this week compare to last?",
    ],
  },
  {
    keywords: ["campaign", "campaigns", "ad", "ads", "promotion"],
    getAnswer: (_q: string) =>
      `Looking at active campaigns, **"ABM Breakthrough"** is the top performer with a 2.1% conversion rate and $48K in influenced revenue. The **Q2 Nurture Flow** is second at 1.7% conversion but has higher volume (12K sent). The new **"AI Playbook Launch"** campaign went live 3 days ago — early CTR is 4.8%, which is 22% above benchmark. I'd shift 20% of budget from the underperforming "Retargeting Pro" campaign to AI Playbook.`,
    confidence: 0.87,
    sources: [
      { title: "Active Campaigns Dashboard", url: "/hub/campaigns" },
      { title: "Ad Performance Report", url: "/hub/analytics/ads" },
      { title: "Budget Optimisation Model", url: "/hub/analytics/budget" },
    ],
    actions: [
      { label: "Rebalance campaign budget", description: "Apply the suggested budget reallocation" },
      { label: "Pause underperforming campaign", description: "Review and pause 'Retargeting Pro'" },
    ],
    followups: [
      "Show me the creative performance for AI Playbook",
      "What's the ROI comparison across campaigns?",
      "Which campaigns have the highest email engagement?",
    ],
  },
  {
    keywords: ["roi", "return", "spend", "cost per", "cpa", "cac"],
    getAnswer: (_q: string) =>
      `Current ROI breakdown by channel:\n\n**LinkedIn Ads** — 3.8× ROI (best performer, $12K spend → $45.6K attributed)\n**Email Nurture** — 5.2× ROI (lowest cost, highest relative return)\n**Paid Search** — 2.1× ROI (declining, -8% MoM)\n**Content/SEO** — 6.7× ROI (long-cycle but highest absolute return)\n\nOverall blended ROI is **3.4×**, slightly above the 3.0× target. Content continues to be the sleeper hit.`,
    confidence: 0.91,
    sources: [
      { title: "ROI Dashboard", url: "/hub/analytics/roi" },
      { title: "Channel Attribution", url: "/hub/analytics/attribution" },
      { title: "Spend Optimisation Report", url: "/hub/analytics/spend" },
    ],
    actions: [
      { label: "Deep-dive into content ROI", description: "Open the full content attribution report" },
      { label: "Review declining paid search", description: "Audit paid search campaigns for optimisation" },
    ],
    followups: [
      "Which channels have the highest customer LTV?",
      "What's the CAC trend over the last 6 months?",
      "How can I improve paid search ROI?",
    ],
  },
  {
    keywords: ["lead", "leads", "prospect", "qualified"],
    getAnswer: (_q: string) =>
      `You currently have **86 leads** in the pipeline across all stages:\n\n- **New / Uncontacted:** 34\n- **Contacted / Nurturing:** 28\n- **Qualified (MQL):** 14\n- **Opportunity (SQL):** 7\n- **Proposal Sent:** 3\n\nThe conversion bottleneck is at MQL→SQL, where only 38% advance. The average time from MQL to SQL is 23 days, about 8 days above target. I recommend a tighter qualifying call framework — I can draft one if you'd like.`,
    confidence: 0.86,
    sources: [
      { title: "Pipeline Overview", url: "/hub/pipeline" },
      { title: "Lead Scoring Model", url: "/hub/analytics/lead-scoring" },
      { title: "Conversion Funnel", url: "/hub/analytics/funnel" },
    ],
    actions: [
      { label: "Draft MQL→SQL qualification framework", description: "Generate a new qualifying call script" },
      { label: "Review stalled leads", description: "Open leads that have been in MQL for >23 days" },
    ],
    followups: [
      "Which lead sources have the highest quality?",
      "Show me the lead score distribution",
      "What's the average lead response time?",
    ],
  },
  {
    keywords: ["content", "blog", "article", "post", "writing", "publish"],
    getAnswer: (_q: string) =>
      `Content performance this month: **12 pieces published**, **48K total views**, **2.1% average engagement rate**. Top performer is "The AI Advantage in B2B" (3.4K views, 4.8% engagement). The bottom performer is "Why Your CRM Needs a Cleanse" (412 views, 0.9% engagement).\n\nLooking at the content gap analysis, the "competitive positioning" and "pricing strategy" topics are high-interest but under-served. I'd prioritise those for next week.`,
    confidence: 0.9,
    sources: [
      { title: "Content Performance Dashboard", url: "/hub/analytics/content" },
      { title: "Content Gap Analysis", url: "/hub/analytics/content-gaps" },
      { title: "Editorial Calendar", url: "/hub/calendar" },
    ],
    actions: [
      { label: "Create competitive positioning brief", description: "Generate a content brief for next week" },
      { label: "Repurpose top performer", description: "Turn 'AI Advantage' into a LinkedIn carousel" },
    ],
    followups: [
      "What topics are trending in our space?",
      "Which content formats perform best?",
      "How does our content stack up against competitors?",
    ],
  },
  {
    keywords: ["social", "linkedin", "twitter", "instagram", "social media"],
    getAnswer: (_q: string) =>
      `Social media performance this month:\n\n**LinkedIn:** 18 posts, 12K impressions, 3.2% engagement rate. Top post: "AI in B2B" carousel (2.1K impressions).\n**Twitter/X:** 32 posts, 8.4K impressions, 1.8% engagement rate. Top post: Thread on pipeline tips (1.1K impressions).\n\nLinkedIn is our strongest channel by far. I'd recommend 3 more carousel posts this month — they drive 2.3× the engagement of text posts.`,
    confidence: 0.89,
    sources: [
      { title: "Social Analytics", url: "/hub/analytics/social" },
      { title: "Content Calendar", url: "/hub/calendar" },
      { title: "Audience Growth Report", url: "/hub/analytics/audience" },
    ],
    actions: [
      { label: "Schedule LinkedIn carousel posts", description: "Create 3 carousel posts for this month" },
      { label: "Analyse Twitter engagement dip", description: "Review declining Twitter metrics" },
    ],
    followups: [
      "What's our best-performing content type on LinkedIn?",
      "How does our social growth compare to competitors?",
      "What time of day gets the best engagement?",
    ],
  },
  {
    keywords: ["seo", "search", "organic", "rank", "keyword"],
    getAnswer: (_q: string) =>
      `SEO snapshot of the last 30 days:\n\n**Organic traffic:** 14.2K visits (+18% MoM)\n**Top keyword:** "B2B marketing agency" — position #4 (up from #7)\n**Featured snippets gained:** 3 (now 12 total)\n**Page speed issues:** 2 pages flagged (below 70 Lighthouse score)\n\nThe homepage and services pages are carrying most of the weight. The blog section has strong individual posts but lacks internal linking — fixing that could boost overall domain authority by an estimated 12-15%.`,
    confidence: 0.87,
    sources: [
      { title: "SEO Dashboard", url: "/hub/analytics/seo" },
      { title: "Keyword Rankings", url: "/hub/analytics/keywords" },
      { title: "Site Health Report", url: "/hub/analytics/site-health" },
    ],
    actions: [
      { label: "Fix page speed issues", description: "Open flagged pages for performance audit" },
      { label: "Improve internal linking", description: "Generate internal link suggestions for the blog" },
    ],
    followups: [
      "Which keywords should I target next?",
      "Show me competitor keyword gaps",
      "What's our domain authority trend?",
    ],
  },
  {
    keywords: ["email", "email marketing", "newsletter", "nurture", "sequence"],
    getAnswer: (_q: string) =>
      `Email marketing performance:\n\n**Active sequences:** 4 (Welcome, Nurture, Re-engagement, Q3 Campaign)\n**Average open rate:** 34.2% (above the 27% B2B benchmark)\n**Click-through rate:** 5.8%\n**Unsubscribe rate:** 0.4%\n\nThe Nurture sequence has the best long-term conversion at 12.3%, but the Welcome sequence drops off sharply after email #3. I'd A/B test a shorter welcome flow with a stronger CTA in email #2.`,
    confidence: 0.9,
    sources: [
      { title: "Email Performance Dashboard", url: "/hub/analytics/email" },
      { title: "Sequence Analytics", url: "/hub/analytics/sequences" },
      { title: "A/B Test Results", url: "/hub/analytics/ab-tests" },
    ],
    actions: [
      { label: "Create Welcome sequence A/B test", description: "Set up a 2-variant A/B test for the welcome flow" },
      { label: "Review Re-engagement sequence", description: "Open and optimise the re-engagement email sequence" },
    ],
    followups: [
      "What's the best day/time to send emails?",
      "Which email subject lines perform best?",
      "How many leads are in each sequence?",
    ],
  },
  {
    keywords: ["brand", "branding", "position", "messaging", "voice"],
    getAnswer: (_q: string) =>
      `On brand positioning: our current differentiator is **"AI-powered human creativity"** — and it's resonating. Brand recall in our target segment is up 23% this year. The messaging audit showed that our "results-driven" language outperforms "innovation-driven" language by 1.7× in engagement.\n\nOne gap: our competitive positioning page hasn't been updated in 8 months, and competitor X has shifted their messaging twice in that period. I recommend a refresh.`,
    confidence: 0.84,
    sources: [
      { title: "Brand Health Report", url: "/hub/analytics/brand" },
      { title: "Messaging Audit", url: "/hub/library/messaging-audit" },
      { title: "Competitive Positioning", url: "/hub/analytics/competitive" },
    ],
    actions: [
      { label: "Refresh competitive positioning", description: "Start a brief for the competitive page update" },
      { label: "Review brand guidelines", description: "Open the brand book for consistency check" },
    ],
    followups: [
      "How does our brand perception compare to competitors?",
      "What tone of voice works best for our audience?",
      "Should we update our tagline?",
    ],
  },
  {
    keywords: ["competitor", "competition", "competitive", "market share", "landscape"],
    getAnswer: (_q: string) =>
      `Competitive landscape update:\n\n**Top Competitor X:** Launched an AI content tool last month — early reviews are mixed. They've gained ~200 new users but their churn rate is high (12%).\n**Competitor Y:** Pivoted to enterprise-only. Leaving the mid-market wide open.\n**Competitor Z:** Quiet on the marketing front — likely raised but in stealth mode.\n\nOur share of voice in the "B2B AI marketing" space is 23% (up from 18% in Q1). We're the #2 most-mentioned brand after Competitor X.`,
    confidence: 0.88,
    sources: [
      { title: "Competitive Analysis Dashboard", url: "/hub/analytics/competitive" },
      { title: "Share of Voice Report", url: "/hub/analytics/share-of-voice" },
      { title: "Market Intelligence Brief", url: "/hub/intelligence" },
    ],
    actions: [
      { label: "Write competitive response strategy", description: "Draft a response to Competitor X's AI launch" },
      { label: "Create mid-market campaign", description: "Capitalise on Competitor Y's exit from mid-market" },
    ],
    followups: [
      "What are our competitors' weaknesses?",
      "How do our features compare to Competitor X?",
      "What's our pricing positioning vs competitors?",
    ],
  },
  {
    keywords: ["pipeline", "sales pipeline", "funnel", "velocity"],
    getAnswer: (_q: string) =>
      `Pipeline health summary:\n\n**Total value:** $1.42M (vs $1.8M target — we're at 79%)\n**Deal count:** 23 active deals\n**Average deal size:** $61.7K\n**Velocity:** 47 days from first touch to close (target is 42)\n**Win rate:** 67.3%\n\nThe biggest slowdown is in the "evaluation" stage — deals sit there an average of 18 days. A case study or ROI calculator sent at day 10 could speed this up significantly.`,
    confidence: 0.93,
    sources: [
      { title: "Pipeline Dashboard", url: "/hub/pipeline" },
      { title: "Deal Velocity Analysis", url: "/hub/analytics/velocity" },
      { title: "Forecast Report", url: "/hub/forecast" },
    ],
    actions: [
      { label: "Create evaluation-stage asset", description: "Generate an ROI calculator template for deals stuck in evaluation" },
      { label: "Identify at-risk deals", description: "Open deals with stalled evaluation stage" },
    ],
    followups: [
      "Which reps have the fastest close times?",
      "What's the forecast for this quarter?",
      "How does this quarter compare to last?",
    ],
  },
];

const genericAnswers = [
  {
    answer:
      "I've analysed your request against the available data. Here's what stands out: your operational metrics are broadly healthy, but there's an opportunity to tighten the alignment between your content calendar and pipeline targets. I'd recommend a 15-minute strategy scrub — I can prepare the brief.",
    confidence: 0.72,
    sources: [
      { title: "Hub Dashboard", url: "/hub" },
      { title: "Strategy Overview", url: "/hub/strategy" },
    ],
    actions: [
      { label: "Schedule strategy scrub", description: "Book a 15-minute strategy review session" },
      { label: "View full analytics", description: "Open the full analytics dashboard" },
      { label: "Ask a more specific question", description: "Refine your query for a more targeted response" },
    ],
    followups: [
      "What's my biggest opportunity right now?",
      "Show me this month's key metrics",
      "What should I ask Nova about?",
    ],
  },
  {
    answer:
      "Thanks for the question. I've cross-referenced your CRM, campaign data, and market intel. The headline: your operational foundation is solid, but there are a few quick wins hiding in your existing data — particularly around re-engaging dormant leads and optimising underperforming ad placements. Want me to zoom in on either?",
    confidence: 0.68,
    sources: [
      { title: "CRM Overview", url: "/hub/crm" },
      { title: "Quick Wins Report", url: "/hub/analytics/quick-wins" },
    ],
    actions: [
      { label: "Identify dormant leads", description: "Run a query for leads with no activity in 30+ days" },
      { label: "Optimise ad placements", description: "Open ad performance for underperforming placements" },
    ],
    followups: [
      "Find dormant leads I should re-engage",
      "Which ad placements are underperforming?",
      "What's one thing I can improve today?",
    ],
  },
  {
    answer:
      "I've run the numbers across our connected data sources. The short version: there's signal in the noise. Your top-line metrics are trending in the right direction, but the granular view reveals 2-3 areas where a small intervention could have an outsized impact. If you give me a tighter focus — channel, campaign, or time period — I can give you a sharper answer.",
    confidence: 0.65,
    sources: [
      { title: "Data Explorer", url: "/hub/data" },
      { title: "Insights Hub", url: "/hub/insights" },
    ],
    actions: [
      { label: "Refine question", description: "Ask about a specific channel, campaign, or metric" },
      { label: "Explore data explorer", description: "Open the interactive data explorer" },
    ],
    followups: [
      "How are our LinkedIn campaigns performing?",
      "What's our current cash flow situation?",
      "Give me a random insight from the data",
    ],
  },
];

function matchTemplate(question: string) {
  const q = question.toLowerCase();
  for (const tmpl of responseTemplates) {
    if (tmpl.keywords.some((kw) => q.includes(kw))) {
      return tmpl;
    }
  }
  return null;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]!;
}

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") ?? req.headers.get("x-real-ip") ?? "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "rate_limited", message: "Too many requests. Try again in a minute." }, { status: 429 });
  }

  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json", message: "Request body must be valid JSON." }, { status: 400 });
  }

  const { question } = (raw ?? {}) as Record<string, unknown>;
  if (typeof question !== "string" || question.trim().length === 0) {
    return NextResponse.json({ error: "missing_question", message: "A non-empty 'question' string is required." }, { status: 400 });
  }

  const trimmed = question.trim();
  const matched = matchTemplate(trimmed);

  if (matched) {
    return NextResponse.json({
      answer: matched.getAnswer(trimmed),
      confidence: matched.confidence,
      sources: matched.sources,
      actions: matched.actions,
      followups: matched.followups,
    });
  }

  const generic = pickRandom(genericAnswers);
  return NextResponse.json({
    answer: generic.answer,
    confidence: generic.confidence,
    sources: generic.sources,
    actions: generic.actions,
    followups: generic.followups,
  });
}
