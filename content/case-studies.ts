import type { CaseStudy } from "@/types";

/**
 * Case studies.
 *
 * IMPORTANT: These are representative composites based on real engagement
 * patterns. They illustrate the types of problems BAZ solves and the
 * outcomes that are typical for each industry and service combination.
 *
 * Names, metrics, and companies are illustrative — written to read like
 * real client stories so visitors understand what working with BAZ looks
 * like. Replace with signed-client case studies before public launch.
 *
 * Each case study follows the same structure:
 *   - Problem (what the client was stuck on)
 *   - Strategy (what BAZ did differently)
 *   - Result (what changed, with metrics)
 *   - Duration (how long it took)
 *   - Testimonial (optional, from the client)
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "viralvista-growth-engine",
    client: "ViralVista",
    industry: "DTC Beauty",
    services: [
      "Performance Marketing",
      "SEO & Organic Growth",
      "Content & Editorial Engine",
      "Conversion Rate Optimization",
    ],
    cover: "hsl(41, 72%, 68%)",
    problem:
      "ViralVista was spending $80K/mo on Meta with a 1.8 ROAS and no compounding asset. Creative fatigue hit every 9 days.",
    strategy:
      "Rebuilt the creative matrix around UGC creators, layered search and SEO to capture branded demand, and instrumented server-side attribution to stop overcounting.",
    result:
      "ROAS climbed from 1.8 → 4.6 in 90 days. Branded search volume tripled. Customer LTV up 41% from new onboarding flows.",
    metrics: [
      { label: "ROAS", value: "1.8 → 4.6" },
      { label: "Monthly revenue", value: "+212%" },
      { label: "CPA", value: "↓ 58%" },
    ],
    duration: "90 days",
    testimonial: {
      quote:
        "BAZ rebuilt our growth engine. We finally trust the numbers and the team running them.",
      author: "Hala Mansour",
      role: "Founder",
    },
  },
  {
    slug: "northwind-fintech-seo",
    client: "Northwind",
    industry: "FinTech",
    services: [
      "SEO & Organic Growth",
      "Content & Editorial Engine",
      "Analytics, Tracking & Attribution",
    ],
    cover: "hsl(210, 75%, 60%)",
    problem:
      "Northwind was invisible on category-defining search terms and dependent on paid for every signup.",
    strategy:
      "Built a topical map around comparison and alternative queries, shipped a programmatic SEO engine, and earned placements in 8 industry publications.",
    result:
      "0 → 480K monthly organic sessions in 14 months. Inbound pipeline now exceeds outbound. CAC down 41%.",
    metrics: [
      { label: "Organic sessions", value: "0 → 480K/mo" },
      { label: "Top-3 SERPs", value: "340+" },
      { label: "Inbound / Outbound", value: "3.2×" },
    ],
    duration: "14 months",
    testimonial: {
      quote: "They turned organic into our biggest channel. No one else got close.",
      author: "Daniel K.",
      role: "VP Growth",
    },
  },
  {
    slug: "engageera-saas-launch",
    client: "EngageEra",
    industry: "B2B SaaS",
    services: [
      "Strategy & Growth Consulting",
      "Performance Marketing",
      "Brand & Identity",
      "CRM & Marketing Operations",
      "Lifecycle, Email & SMS Automation",
    ],
    cover: "hsl(41, 50%, 50%)",
    problem:
      "Post-launch, EngageEra had 12K free signups but a 0.6% trial-to-paid conversion. The site wasn't built for product-led growth.",
    strategy:
      "Rebuilt the homepage around PQL scoring, instrumented lifecycle flows in Customer.io, and ran a structured paid + content engine to fill the top of funnel.",
    result:
      "Trial-to-paid hit 2.4% in six months. New MRR up 318%. Sales cycle shortened by 23 days from better lead routing.",
    metrics: [
      { label: "Trial → Paid", value: "0.6% → 2.4%" },
      { label: "New MRR", value: "+318%" },
      { label: "Sales cycle", value: "↓ 23 days" },
    ],
    duration: "6 months",
    testimonial: {
      quote: "Senior people, no juniors. They shipped what other agencies only pitch.",
      author: "Mira Okafor",
      role: "CEO",
    },
  },
  {
    slug: "saffron-hospitality-multi-location",
    client: "Saffron & Co.",
    industry: "Hospitality",
    services: ["SEO & Organic Growth", "Brand & Identity", "Performance Marketing"],
    cover: "hsl(38, 85%, 58%)",
    problem:
      "A 14-property hospitality group with a slow, brochure-style site and 7 fragmented Google Business Profiles.",
    strategy:
      "Consolidated into one Next.js site with property-specific landing pages, normalized GBP and citations, and ran search + social to drive direct bookings.",
    result: "Direct bookings up 71%. Cost-per-acquisition down 44%. Mobile LCP from 4.2s → 1.1s.",
    metrics: [
      { label: "Direct bookings", value: "+71%" },
      { label: "CPA", value: "↓ 44%" },
      { label: "Mobile LCP", value: "4.2s → 1.1s" },
    ],
    duration: "8 months",
    testimonial: {
      quote:
        "We own the direct channel now. The ROI on the site rebuild paid for itself in 11 weeks.",
      author: "Reem Al-Fahim",
      role: "CMO",
    },
  },
  {
    slug: "meridian-devtools-ai-search",
    client: "Meridian Labs",
    industry: "AI / DevTools",
    services: [
      "AI Search Optimization",
      "Content & Editorial Engine",
      "Public Relations & Earned Media",
    ],
    cover: "hsl(145, 70%, 55%)",
    problem:
      "Meridian was a strong dev tool with zero AI-search presence — invisible in ChatGPT, Perplexity, and Google AI Overviews.",
    strategy:
      "Built an entity-first content strategy, shipped 60 comparison and how-to pieces, ran a digital-PR push to earn citations from authoritative sources.",
    result:
      "28 AI Overview citations across priority queries. Branded search volume up 4.3×. Inbound enterprise demos up 2.1×.",
    metrics: [
      { label: "AI Overview citations", value: "0 → 28" },
      { label: "Branded search", value: "+330%" },
      { label: "Enterprise demos", value: "+110%" },
    ],
    duration: "5 months",
    testimonial: {
      quote: "We're cited by the LLMs now. That is a moat no one else in our category has.",
      author: "Sora Tanaka",
      role: "Head of Marketing",
    },
  },
  {
    slug: "buzzbeacon-content-engine",
    client: "BuzzBeacon Media",
    industry: "Podcast Network",
    services: [
      "Content & Editorial Engine",
      "SEO & Organic Growth",
      "Analytics, Tracking & Attribution",
    ],
    cover: "hsl(0, 0%, 9%)",
    problem:
      "BuzzBeacon had 200 podcast pages with thin content and no search traffic. Ad revenue was flat.",
    strategy:
      "Rebuilt the editorial engine around host-led articles, schema-rich episode pages, and a programmatic long-tail net.",
    result:
      "Page-1 rankings for 1,400+ long-tail queries. Ad RPM up 38%. Three show launches hit top-50 in their category.",
    metrics: [
      { label: "Page-1 rankings", value: "1,400+" },
      { label: "Ad RPM", value: "+38%" },
      { label: "Indexed pages", value: "94%" },
    ],
    duration: "7 months",
  },

  // ─── Wave 2 additions: fill gaps for services with no case studies ───────

  {
    slug: "tessera-fintech-video-podcast",
    client: "Tessera",
    industry: "FinTech",
    services: [
      "Video Production & Podcast Studio",
      "Public Relations & Earned Media",
      "Social Media & Community",
    ],
    cover: "hsl(41, 72%, 68%)",
    problem:
      "Tessera's founder had strong conviction but no media footprint. They needed a thought-leadership engine that produced content at venture scale without an in-house team.",
    strategy:
      "Launched a weekly founder podcast with a senior producer, cut 6 short-form variants per episode for paid social, and ran a guest-booking program targeting tier-1 operators and journalists.",
    result:
      "4.2M views in the first year. 312K podcast downloads. Inbound enterprise pipeline +$6.4M attributed to the show. Founder bylines in Bloomberg, FT, and TechCrunch.",
    metrics: [
      { label: "Views, yr 1", value: "4.2M" },
      { label: "Podcast downloads", value: "312K" },
      { label: "Attributed pipeline", value: "+$6.4M" },
    ],
    duration: "12 months",
    testimonial: {
      quote:
        "The podcast is our biggest sales asset. It compounds every week without us having to think about it.",
      author: "Idris Bah",
      role: "Founder & CEO",
    },
  },

  {
    slug: "lumenwear-influencer-engine",
    client: "Lumenwear",
    industry: "DTC Apparel",
    services: [
      "Influencer & Creator Marketing",
      "Social Media & Community",
      "Performance Marketing",
    ],
    cover: "hsl(38, 85%, 58%)",
    problem:
      "Lumenwear was over-reliant on Meta with a 2.1 ROAS and creative fatigue every 12 days. They needed a creator engine that produced social proof at scale.",
    strategy:
      "Built a tiered creator program across 412 nano and micro creators, with whitelisting on Meta and TikTok, and a content-rights library that fed the always-on paid engine.",
    result:
      "$11 EMV per $1 spent. ROAS lifted from 2.1 to 5.4 in 6 months. Cost per acquisition down 42%. Brand search volume tripled.",
    metrics: [
      { label: "EMV per $1", value: "$11" },
      { label: "ROAS", value: "2.1 → 5.4" },
      { label: "CPA", value: "↓ 42%" },
    ],
    duration: "6 months",
    testimonial: {
      quote: "We went from a brand nobody had heard of to one creators actively ask to work with.",
      author: "Yara Halabi",
      role: "Co-founder",
    },
  },

  {
    slug: "kantara-b2b-abm",
    client: "Kantara",
    industry: "B2B SaaS",
    services: [
      "ABM & B2B Demand Generation",
      "Public Relations & Earned Media",
      "CRM & Marketing Operations",
    ],
    cover: "hsl(41, 50%, 50%)",
    problem:
      "Kantara had product-market fit and a $4M run rate, but pipeline was inconsistent. Sales cycle was 11 months and win rate was 18%.",
    strategy:
      "Built a tier-1 ABM program across 180 named accounts using Demandbase + 6sense, with executive visibility program, integrated nurture in HubSpot, and a category narrative that named the problem Kantara solves.",
    result:
      "Pipeline +$24M in 9 months. Win rate up to 31%. Sales cycle shortened by 4.2 months. Two named accounts closed at >$1M ACV each.",
    metrics: [
      { label: "Pipeline", value: "+$24M" },
      { label: "Win rate", value: "18% → 31%" },
      { label: "Sales cycle", value: "↓ 4.2 mo" },
    ],
    duration: "9 months",
    testimonial: {
      quote:
        "Our reps now walk into deals where the buyer already has a thesis. That is the ABM game.",
      author: "Priya Iyer",
      role: "VP Sales",
    },
  },

  {
    slug: "soukly-marketplace-affiliate",
    client: "Soukly",
    industry: "Marketplace",
    services: [
      "Affiliate, Partnership & Referral Programs",
      "Performance Marketing",
      "Lifecycle, Email & SMS Automation",
    ],
    cover: "hsl(145, 70%, 55%)",
    problem:
      "Soukly was burning paid social to acquire two-sided marketplace supply and demand. Unit economics were negative on the supply side.",
    strategy:
      "Built a partner program with vetted creators and category blogs, a customer referral program with tiered incentives, and switched the supply acquisition to a referral-led motion.",
    result:
      "Affiliate and referral revenue grew to 24% of GMV in 14 months. Supply-side CAC dropped from $84 to $31. Partner-driven LTV up 38%.",
    metrics: [
      { label: "Partner-driven GMV", value: "24%" },
      { label: "Supply CAC", value: "$84 → $31" },
      { label: "Partner LTV", value: "+38%" },
    ],
    duration: "14 months",
  },

  {
    slug: "pivot-labs-mena-entry",
    client: "Pivot Labs",
    industry: "B2B SaaS",
    services: [
      "Internationalization & Market Entry",
      "Brand & Identity",
      "Public Relations & Earned Media",
    ],
    cover: "hsl(210, 75%, 60%)",
    problem:
      "A US B2B SaaS at $18M ARR wanted to enter MENA but had no in-market presence, no Arabic-language site, and no idea how to navigate the regulatory landscape.",
    strategy:
      "Sized the market with 220 buyer interviews across UAE, KSA, and Egypt. Localized the product, site, and sales narrative for Arabic. Built a regional PR program and a partner channel with two system integrators.",
    result:
      "$4.8M ARR in the first year. Three tier-1 logos in the first two quarters. The regional partner program now drives 38% of MENA pipeline.",
    metrics: [
      { label: "MENA ARR, yr 1", value: "$4.8M" },
      { label: "Tier-1 logos", value: "3 in Q1–Q2" },
      { label: "Partner-driven pipeline", value: "38%" },
    ],
    duration: "12 months",
  },

  {
    slug: "mosaic-research-positioning",
    client: "Mosaic",
    industry: "CPG",
    services: [
      "Market Research & Category Design",
      "Brand & Identity",
      "Content & Editorial Engine",
    ],
    cover: "hsl(0, 0%, 9%)",
    problem:
      "Mosaic was launching a new beverage category in MENA and needed to know if the TAM justified a $40M Series A ask. Existing data was thin and consumer language was unmapped.",
    strategy:
      "Ran a 1,800-respondent segmentation + sizing study across 6 MENA markets. Mapped consumer language and pricing sensitivity. Built a category narrative and visual identity system grounded in the research.",
    result:
      "Identified an $80M TAM with a clearly-defined beachhead segment. Pricing tested at +18% above initial guess. Series A oversubscribed at $52M.",
    metrics: [
      { label: "TAM identified", value: "+$80M" },
      { label: "Pricing sensitivity", value: "+18%" },
      { label: "Series A raised", value: "$52M" },
    ],
    duration: "4 months",
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
