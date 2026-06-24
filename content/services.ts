import type { Service } from '@/types';

/**
 * BAZ Marketing Agency — the 18-service catalog.
 *
 * Ordered by how a CMO buys: strategy → execution channels → measurement &
 * systems → earned media & audience → scale plays.
 *
 * Each entry is the full payload that drives its service detail page.
 * `placeholder: true` flags content that uses representative copy without
 * real client metrics. Real metrics must replace these before public launch.
 *
 * Each service follows the same operator-grade structure:
 *   - Pillar (owned / earned / paid / data / platform)
 *   - Hero promise + supporting sub
 *   - "Who it's for" (3 ICPs)
 *   - Concrete deliverables
 *   - 3 KPIs (volume, performance, adoption)
 *   - 5-step process (no fluff)
 *   - 3 proof points with hard numbers
 *   - 3 FAQs answering the buying questions
 *   - Single primary CTA (+ optional secondary)
 */
export const services: Service[] = [
  // ──────────────────────────── 01 · Strategy ──────────────────────────────
  {
    slug: 'strategy-consulting',
    name: 'Strategy & Growth Consulting',
    tagline: 'A growth plan that survives the org chart.',
    pillar: 'owned',
    description:
      'A senior-led growth audit, opportunity map, and 90-day plan tied to revenue — not vanity metrics.',
    hero: {
      eyebrow: '01 · Strategy',
      headline: 'Make growth a forecast, not a hope.',
      sub: 'Senior partners diagnose, model, and architect your next 90 days. No decks no one reads — a plan your team actually runs.',
    },
    who: [
      '$2M–$50M ARR companies without a real growth plan',
      'CMOs preparing for board reviews or fundraising',
      'Founders post-funding who need to operationalize growth',
    ],
    deliverables: [
      'Growth audit (funnel, unit economics, channel mix)',
      'Channel-economics model (LTV/CAC by source, payback period)',
      '90-day roadmap with owners, budgets, exit criteria',
      'Quarterly OKRs tied to revenue',
      'Monthly embedded review with senior partner',
    ],
    kpis: [
      { label: 'Plans shipped', value: '60+' },
      { label: 'Avg payback period', value: '< 6 mo' },
      { label: 'Client renewal rate', value: '94%' },
    ],
    process: [
      { step: 1, title: 'Diagnose', desc: 'Funnel, analytics, channel data, customer interviews, and competitive teardown.' },
      { step: 2, title: 'Model', desc: 'Unit economics, LTV/CAC by channel, attribution strategy, and pricing sensitivity.' },
      { step: 3, title: 'Architect', desc: 'Channel mix, org design, hiring plan, and budget allocation across 4 quarters.' },
      { step: 4, title: 'Roadmap', desc: '90-day execution plan with named owners, weekly milestones, and exit criteria.' },
      { step: 5, title: 'Embed', desc: 'Monthly review cadence. We hold the line on what moves revenue.' },
    ],
    proof: [
      { client: 'DTC Beauty · MENA', metric: '+182% YoY', detail: 'Re-allocated spend from IG to search + creator UGC, doubled payback velocity.' },
      { client: 'B2B SaaS · US', metric: 'CAC ↓ 41%', detail: 'Switched to PQL-led paid + SEO content engine; payback fell from 14 to 7 months.' },
      { client: 'Marketplace · EU', metric: 'GMV +63%', detail: 'Restructured supply-and-demand incentives with cohort-based LTV model.' },
    ],
    faqs: [
      { q: 'Is this a retainer or a project?', a: 'Either. Most engagements are a 90-day plan followed by a 6-month embedded review.' },
      { q: 'Who actually does the work?', a: 'A senior partner — never a junior pod. We bring specialists only for execution.' },
      { q: 'What does it cost?', a: 'Project plans start at $25K; embedded retainers from $12K/mo.' },
    ],
    cta: { primary: 'Book a growth call', secondary: 'See case studies' },
  },

  // ──────────────────────────── 02 · Paid ──────────────────────────────────
  {
    slug: 'performance-marketing',
    name: 'Performance Marketing',
    tagline: 'Spend that compounds, not burns.',
    pillar: 'paid',
    description:
      'Paid search, paid social, programmatic, and connected TV — built on clean tracking, real attribution, and creative that converts.',
    hero: {
      eyebrow: '02 · Paid',
      headline: 'Turn ad spend into measurable profit.',
      sub: 'Google, Meta, TikTok, LinkedIn, programmatic. Tight tracking, weekly creative iteration, no wasted impressions.',
    },
    who: [
      'Brands with $20K+/mo ad budget',
      'DTC and lead-gen teams scaling past founder-led growth',
      'B2B teams running ABM-driven paid campaigns',
    ],
    deliverables: [
      'Channel mix model by stage of funnel',
      'Server-side tracking + conversion API',
      'Creative testing framework (40+ variants/mo)',
      'Weekly iteration loops with documented learnings',
      'Live dashboard + weekly exec readout',
    ],
    kpis: [
      { label: 'Spend managed', value: '$24M+' },
      { label: 'Avg ROAS lift', value: '+62%' },
      { label: 'Creative variants / mo', value: '40+' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Tracking, attribution, creative library, and historical performance.' },
      { step: 2, title: 'Rebuild', desc: 'Server-side pixels, conversion API, clean events in GA4, dedup keys.' },
      { step: 3, title: 'Launch', desc: 'New campaigns with measurement plan and creative matrix.' },
      { step: 4, title: 'Iterate', desc: 'Weekly creative testing, budget reallocation toward winners.' },
      { step: 5, title: 'Scale', desc: 'Incrementality testing, geo holdouts, and incrementality modeling.' },
    ],
    proof: [
      { client: 'DTC Skincare · EU', metric: 'ROAS 2.1 → 4.8', detail: 'Creator-led UGC + Meta Advantage+ shopping.' },
      { client: 'B2B SaaS · US', metric: 'CPL ↓ 58%', detail: 'Rebuilt LinkedIn + Google with PQL scoring and intent signals.' },
      { client: 'FinTech · MENA', metric: 'CPA ↓ 47%', detail: 'Switched from broad match to PMAX + first-party data audiences.' },
      { client: 'DTC Apparel · US', metric: '$11.4M new revenue', detail: '12-month paid-led scale with creative matrix and incrementality testing.' },
    ],
    faqs: [
      { q: 'Do you require a minimum spend?', a: 'We work best with $20K/mo+ ad budget; we will tell you honestly if less.' },
      { q: 'Who owns the ad accounts?', a: 'You do. Always. We never hold business-critical accounts hostage.' },
      { q: 'Do you do programmatic and CTV?', a: 'Yes — DV360, TTD, and direct CTV publishers with measurement baked in.' },
      { q: 'How do you measure incrementality, not just ROAS?', a: 'Geo holdouts, ghost ads, PSA tests, and MMM. We never let the platform self-reported ROAS be the only number on the table.' },
    ],
    cta: { primary: 'Request a paid audit' },
  },

  // ──────────────────────────── 03 · SEO ───────────────────────────────────
  {
    slug: 'seo-organic',
    name: 'SEO & Organic Growth',
    tagline: 'Own your demand, not rent it.',
    pillar: 'earned',
    description:
      'Technical SEO, content engines, and digital PR that build compounding organic traffic and inbound pipeline.',
    hero: {
      eyebrow: '03 · Earned',
      headline: 'Compound traffic. Own the SERP.',
      sub: 'Technical foundations, topical authority, and link earning that compounds for years — not weeks.',
    },
    who: [
      'Brands tired of paying for every click',
      'Companies entering new markets or categories',
      'B2B teams building long-term inbound pipeline',
    ],
    deliverables: [
      'Technical SEO audit (crawl, CWV, log files)',
      'Topical authority map with silo architecture',
      'Content engine (8–24 posts/mo)',
      'Digital PR + link earning',
      'Quarterly content refresh program',
    ],
    kpis: [
      { label: 'Avg organic lift, 12 mo', value: '+214%' },
      { label: 'Top-3 SERP wins', value: '340+' },
      { label: 'Domains earned (DR70+)', value: '120+' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Crawl, log files, Core Web Vitals, and content gap analysis.' },
      { step: 2, title: 'Architect', desc: 'Topical map and silo structure tied to commercial intent.' },
      { step: 3, title: 'Build', desc: 'Ship a content engine: briefs, writers, editors, internal links.' },
      { step: 4, title: 'Earn', desc: 'Digital PR and link earning to build authority in competitive SERPs.' },
      { step: 5, title: 'Refresh', desc: 'Quarterly content decay audit + refresh program to keep winners winning.' },
    ],
    proof: [
      { client: 'FinTech · EU', metric: '0 → 480K/mo', detail: 'Editorial engine + programmatic SEO across 14 markets.' },
      { client: 'Hospitality · MENA', metric: 'Bookings +71%', detail: 'Multi-location SEO + GBP optimization for 32 properties.' },
      { client: 'B2B SaaS · US', metric: 'Pipeline +$12M', detail: 'Comparison + alternatives pages at scale drove PQL velocity.' },
    ],
    faqs: [
      { q: 'How long until I see results?', a: 'Meaningful lift in 4–6 months. Compounding gains 9–18 months.' },
      { q: 'Do you do local SEO?', a: 'Yes — multi-location, GBP, citations, and reviews at scale.' },
      { q: 'Is technical SEO included?', a: 'Always. Content without technical foundations is a waste of budget.' },
    ],
    cta: { primary: 'Request an SEO audit' },
  },

  // ──────────────────────────── 04 · Content ───────────────────────────────
  {
    slug: 'content-engine',
    name: 'Content & Editorial Engine',
    tagline: 'Editorial that moves pipeline, not just readers.',
    pillar: 'earned',
    description:
      'Senior-led editorial strategy and production — blog, long-form, landing pages, whitepapers, and newsletters — tied to commercial intent.',
    hero: {
      eyebrow: '04 · Content',
      headline: 'Editorial that compounds into revenue.',
      sub: 'Senior writers and editors — not offshore mills. Every piece is tied to a search intent and a funnel outcome.',
    },
    who: [
      'Brands publishing 4–30+ pieces per month',
      'Companies without an in-house editorial function',
      'Teams that need content tied to pipeline, not just traffic',
    ],
    deliverables: [
      'Editorial strategy tied to commercial themes',
      'SEO briefs with structure, sources, and on-page targets',
      'Long-form articles (1,500–5,000 words)',
      'Landing-page copy + CRO variants',
      'Newsletter + nurture sequence copy',
    ],
    kpis: [
      { label: 'Avg posts / mo', value: '12' },
      { label: 'Indexed in 90 days', value: '94%' },
      { label: 'Avg session time', value: '3:42' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Existing content, performance, topical gaps, and competitive editorial map.' },
      { step: 2, title: 'Strategize', desc: 'Editorial calendar tied to commercial themes and search intent.' },
      { step: 3, title: 'Brief', desc: 'Detailed briefs with structure, sources, internal links, and on-page SEO.' },
      { step: 4, title: 'Produce', desc: 'Senior writers + editors. No AI-slop. Reviewed by humans.' },
      { step: 5, title: 'Measure', desc: 'Pipeline attribution per piece; refresh or retire underperformers.' },
    ],
    proof: [
      { client: 'B2B SaaS · US', metric: 'Demo requests +89%', detail: 'Comparison + alternatives pages at scale drove PQL conversion.' },
      { client: 'DTC Apparel · EU', metric: 'AOV +24%', detail: 'Editorial lookbooks feeding Meta Advantage+ catalog.' },
      { client: 'FinTech · MENA', metric: 'Email list 4.2×', detail: 'Newsletter engine tied to gated long-form.' },
    ],
    faqs: [
      { q: 'Do you use AI?', a: 'For research and outlines. Final drafts are human-written and edited.' },
      { q: 'How fast can you start?', a: 'Two weeks from kickoff to first published piece.' },
      { q: 'Do you do whitepapers and case studies?', a: 'Yes — gated assets and customer story production included.' },
    ],
    cta: { primary: 'Plan a content engine' },
  },

  // ──────────────────────────── 05 · Brand ─────────────────────────────────
  {
    slug: 'brand-identity',
    name: 'Brand & Identity',
    tagline: 'A brand people remember, recognize, and repeat.',
    pillar: 'owned',
    description:
      'Brand strategy, positioning, identity systems, verbal identity, and guidelines — built for recognition across every touchpoint.',
    hero: {
      eyebrow: '05 · Brand',
      headline: 'The brand is the asset. Everything else amplifies it.',
      sub: 'Positioning, naming, identity systems, voice, and guidelines — designed so every surface reads as you.',
    },
    who: [
      'Startups preparing to launch into a crowded market',
      'Companies rebranding post-funding or post-merger',
      'Brands that have grown inconsistent across regions and products',
    ],
    deliverables: [
      'Brand strategy & positioning',
      'Naming & verbal identity',
      'Logo + visual identity system',
      'Brand book & guidelines',
      'Launch toolkit + asset migration',
    ],
    kpis: [
      { label: 'Rebrands shipped', value: '70+' },
      { label: 'Avg aided recall lift', value: '+58%' },
      { label: 'Internal adoption', value: '95%' },
    ],
    process: [
      { step: 1, title: 'Discover', desc: 'Stakeholder interviews, audience research, competitive audit, and customer ethnography.' },
      { step: 2, title: 'Strategize', desc: 'Positioning, narrative, brand pillars, voice, and tone.' },
      { step: 3, title: 'Design', desc: 'Identity system, logo, type, color, motion, and applications.' },
      { step: 4, title: 'Document', desc: 'Brand book, guidelines, asset library, and rollout toolkit.' },
      { step: 5, title: 'Launch', desc: 'Internal rollout, asset migration, and launch campaign.' },
    ],
    proof: [
      { client: 'FinTech · MENA', metric: 'Recall +63%', detail: 'New positioning + identity for Series B launch across 9 markets.' },
      { client: 'Hospitality · Global', metric: 'Direct bookings +34%', detail: 'Sub-brand system across 14 properties rolled out in 11 weeks.' },
      { client: 'SaaS · US', metric: 'Win rate +22%', detail: 'Repositioning against category leader with new narrative and deck.' },
    ],
    faqs: [
      { q: 'Do you handle naming?', a: 'Yes — trademark-aware naming with linguistic and domain checks.' },
      { q: 'How long does a rebrand take?', a: '8–14 weeks end-to-end, depending on scope and stakeholder cycles.' },
      { q: 'Do you migrate existing assets?', a: 'Yes — production templates, web, sales decks, and stationery.' },
    ],
    cta: { primary: 'Plan a brand project' },
  },

  // ──────────────────────────── 06 · CRO ───────────────────────────────────
  {
    slug: 'cro-experimentation',
    name: 'Conversion Rate Optimization (CRO)',
    tagline: 'A/B testing as a system, not a series of bets.',
    pillar: 'data',
    description:
      'On-site experimentation and landing-page optimization — from research backlog to statistical rigor to shipped wins.',
    hero: {
      eyebrow: '06 · CRO',
      headline: 'Conversion tied to revenue, not vibes.',
      sub: 'Research-backed hypotheses, designed for the metric they own. Tested with statistical rigor, shipped with conviction.',
    },
    who: [
      'Brands spending on traffic but not converting',
      'SaaS teams optimizing activation, trial, and pricing',
      'E-commerce teams squeezing more from existing traffic',
    ],
    deliverables: [
      'CRO research (analytics, heatmaps, session replay, surveys)',
      'Prioritized experiment backlog',
      'Landing pages + on-site templates',
      'A/B and multivariate tests with pre-registered hypotheses',
      'Quarterly experiment report + learnings library',
    ],
    kpis: [
      { label: 'Avg CVR lift', value: '+31%' },
      { label: 'Tests / quarter', value: '60+' },
      { label: 'Winning variants shipped', value: '120+' },
    ],
    process: [
      { step: 1, title: 'Research', desc: 'Funnel analytics, heatmaps, session replay, and customer interviews.' },
      { step: 2, title: 'Hypothesize', desc: 'Prioritized backlog of CRO tests with ICE scoring.' },
      { step: 3, title: 'Design', desc: 'Wireframes, design, copy, and dev — owned end-to-end.' },
      { step: 4, title: 'Test', desc: 'A/B and multivariate with statistical rigor and pre-registered hypotheses.' },
      { step: 5, title: 'Ship', desc: 'Promote winners, retire losers, codify learnings.' },
    ],
    proof: [
      { client: 'SaaS · US', metric: 'Trial conversion +44%', detail: 'Hero, pricing, and onboarding redesign.' },
      { client: 'E-commerce · MENA', metric: 'AOV +27%', detail: 'Product detail page experimentation across 1,200 SKUs.' },
      { client: 'FinTech · EU', metric: 'Signups +38%', detail: 'KYC flow redesign + form friction elimination.' },
    ],
    faqs: [
      { q: 'What tools do you test with?', a: 'VWO, Optimizely, and in-house feature flags. We adapt to your stack.' },
      { q: 'How long until I see lift?', a: 'First wins typically in 6–10 weeks; compounding lift over 6 months.' },
      { q: 'Do you design and build variants?', a: 'Yes — we own research, design, copy, and dev end-to-end.' },
    ],
    cta: { primary: 'Plan a CRO sprint' },
  },

  // ──────────────────────────── 07 · Lifecycle ─────────────────────────────
  {
    slug: 'lifecycle-email-sms',
    name: 'Lifecycle, Email & SMS Automation',
    tagline: 'Monetize the list you already have.',
    pillar: 'owned',
    description:
      'Email, SMS, WhatsApp, and push — engineered for retention, LTV, and reactivation across Klaviyo, Customer.io, Iterable, and HubSpot.',
    hero: {
      eyebrow: '07 · Lifecycle',
      headline: 'Turn one-time buyers into recurring revenue.',
      sub: 'Lifecycle flows, segmentation, and personalization that drive LTV — not just opens. Email, SMS, WhatsApp, and push as one system.',
    },
    who: [
      'DTC brands scaling lifecycle revenue',
      'B2B teams running nurture sequences',
      'Companies recovering from deliverability issues',
    ],
    deliverables: [
      'Lifecycle program audit + blueprint',
      'Flows (welcome, browse, cart, post-purchase, winback)',
      'Segmentation + lead scoring',
      'Email + SMS + WhatsApp production',
      'Deliverability audit + repair',
    ],
    kpis: [
      { label: 'Revenue generated', value: '$48M+' },
      { label: 'Avg open rate', value: '42%' },
      { label: 'Inbox placement', value: '97%' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Current program, deliverability, list health, segmentation, and revenue attribution.' },
      { step: 2, title: 'Architect', desc: 'Lifecycle map: triggers, segments, channels, and personalization strategy.' },
      { step: 3, title: 'Build', desc: 'Flows, templates, copy, and creative — owned end-to-end.' },
      { step: 4, title: 'Launch', desc: 'Phased rollout with A/B tests and deliverability monitoring.' },
      { step: 5, title: 'Operate', desc: 'Weekly sends, monthly flow reviews, ongoing optimization.' },
    ],
    proof: [
      { client: 'DTC Beauty · EU', metric: 'Email rev +74%', detail: 'Lifecycle rebuild across 9 flows + SMS in 8 weeks.' },
      { client: 'B2B SaaS · US', metric: 'MQLs +52%', detail: 'Nurture sequences tied to product usage and intent.' },
      { client: 'Marketplace · MENA', metric: 'Reactivation +38%', detail: 'Winback + browse abandonment across WhatsApp and email.' },
    ],
    faqs: [
      { q: 'Which ESPs and tools do you support?', a: 'Klaviyo, Customer.io, Mailchimp, HubSpot, Iterable, and Attio.' },
      { q: 'Can you repair deliverability?', a: 'Yes — full audit, warmup, and domain strategy with documented recovery.' },
      { q: 'Do you do SMS and WhatsApp?', a: 'Yes — as part of an integrated lifecycle, not siloed blasts.' },
    ],
    cta: { primary: 'Plan a lifecycle program' },
  },

  // ──────────────────────────── 08 · CRM / MOPS ────────────────────────────
  {
    slug: 'crm-mops',
    name: 'CRM & Marketing Operations',
    tagline: 'The plumbing that makes every channel work.',
    pillar: 'platform',
    description:
      'CRM architecture, marketing operations, and MarTech stack engineering — HubSpot, Salesforce, Attio, plus the integrations that connect them.',
    hero: {
      eyebrow: '08 · Operations',
      headline: 'Make your stack an operating system.',
      sub: 'CRM architecture, lead routing, attribution, and MarTech integrations — the plumbing every growth team forgets until it breaks.',
    },
    who: [
      'B2B teams migrating CRM platforms or unifying data',
      'Companies scaling past spreadsheets and Zapier chains',
      'Teams needing attribution that survives a CFO review',
    ],
    deliverables: [
      'CRM architecture + migration (HubSpot, Salesforce, Attio)',
      'Lead routing + lifecycle stages',
      'Attribution model (MTA + MMM)',
      'MarTech integrations + data warehouse',
      'Documentation + admin training',
    ],
    kpis: [
      { label: 'CRM migrations', value: '40+' },
      { label: 'Avg forecast accuracy', value: '92%' },
      { label: 'Sales hours saved / wk', value: '18+' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Current CRM, data flow, lead routing, attribution, and admin hygiene.' },
      { step: 2, title: 'Architect', desc: 'Future-state CRM, lifecycle stages, and integration map.' },
      { step: 3, title: 'Migrate', desc: 'CRM migration with zero data loss and staged rollout.' },
      { step: 4, title: 'Integrate', desc: 'MarTech stack, data warehouse, attribution, and dashboards.' },
      { step: 5, title: 'Enable', desc: 'Admin training, documentation, and ongoing optimization.' },
    ],
    proof: [
      { client: 'B2B SaaS · US', metric: 'Pipeline visibility 3.2×', detail: 'HubSpot rebuild + lead routing + stage definitions.' },
      { client: 'FinTech · EU', metric: 'Sales cycle ↓ 31%', detail: 'Salesforce migration + automated nurture + scoring.' },
      { client: 'Marketplace · MENA', metric: 'Forecast accuracy 92%', detail: 'Attribution model + revenue dashboards for exec team.' },
    ],
    faqs: [
      { q: 'Which CRMs do you support?', a: 'HubSpot, Salesforce, Attio, and Pipedrive — including migrations between them.' },
      { q: 'Do you build data warehouses?', a: 'Yes — BigQuery, Snowflake, and warehouse-native tools (Hightouch, Census).' },
      { q: 'Do you handle attribution modeling?', a: 'Yes — MTA, MMM, and hybrid models tailored to your sales cycle.' },
    ],
    cta: { primary: 'Plan a CRM rebuild' },
  },

  // ──────────────────────────── 09 · Analytics ─────────────────────────────
  {
    slug: 'analytics-attribution',
    name: 'Analytics, Tracking & Attribution',
    tagline: 'Numbers you can actually trust.',
    pillar: 'data',
    description:
      'GA4, server-side tracking, attribution modeling, and dashboards that turn data into decisions — for marketers and boards.',
    hero: {
      eyebrow: '09 · Data',
      headline: 'Measurement that drives decisions.',
      sub: 'Clean data. Real attribution. Dashboards execs actually open. Built for marketers and boards.',
    },
    who: [
      'Companies losing trust in their numbers',
      'Teams rebuilding after iOS / cookie loss',
      'Execs who need one source of truth',
    ],
    deliverables: [
      'GA4 + GTM rebuild',
      'Server-side GTM + conversion API',
      'Attribution model (MTA / MMM / hybrid)',
      'Looker / Tableau / PowerBI dashboards',
      'Weekly automated exec reports',
    ],
    kpis: [
      { label: 'Dashboards shipped', value: '180+' },
      { label: 'Avg data accuracy', value: '99.4%' },
      { label: 'Exec adoption', value: '92%' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Current tracking, data quality, decision flow, and dashboard sprawl.' },
      { step: 2, title: 'Rebuild', desc: 'GA4 events, server-side GTM, conversion API, dedup keys.' },
      { step: 3, title: 'Model', desc: 'Attribution model and channel-economics view.' },
      { step: 4, title: 'Report', desc: 'Looker / Tableau dashboards tailored to exec and operator use.' },
      { step: 5, title: 'Govern', desc: 'Documentation, naming conventions, and change management.' },
    ],
    proof: [
      { client: 'Marketplace · EU', metric: 'Decisions 3× faster', detail: 'Replaced 8 dashboards with one exec view.' },
      { client: 'DTC · US', metric: 'Tracking ↑ to 99%', detail: 'Server-side GTM, conversion API, dedup.' },
      { client: 'FinTech · MENA', metric: 'Forecast accuracy +41 pts', detail: 'MMM attribution model + executive dashboard.' },
    ],
    faqs: [
      { q: 'Can you work with our existing GA4?', a: 'Yes. We audit, repair, or rebuild — depending on the state.' },
      { q: 'Do you build dashboards in Looker / Tableau?', a: 'Both. Looker Studio for most, Tableau / PowerBI for enterprise.' },
      { q: 'Do you build MMM models?', a: 'Yes — in partnership with MMM specialists for full-funnel modeling.' },
    ],
    cta: { primary: 'Request tracking audit' },
  },

  // ──────────────────────────── 10 · AI Search ─────────────────────────────
  {
    slug: 'ai-search-optimization',
    name: 'AI Search Optimization (GEO & AEO)',
    tagline: 'Win the answer box, not just the blue link.',
    pillar: 'earned',
    description:
      'Generative Engine Optimization and Answer Engine Optimization — get cited by ChatGPT, Perplexity, and Google AI Overviews.',
    hero: {
      eyebrow: '10 · AI Search',
      headline: 'Be the answer engines recommend.',
      sub: 'Schema, structure, and authority that win placement in AI Overviews, ChatGPT, Perplexity, and Claude. Plus internal AI workflows that ship work.',
    },
    who: [
      'Brands that want to win the new SERP',
      'Companies whose traffic is being absorbed by AI answers',
      'Teams spending too much time on repetitive work',
    ],
    deliverables: [
      'AI-search audit (citations, sources, gaps)',
      'Schema + entity strategy',
      'Citation engineering + digital PR',
      'AI content workflows (research, briefs, outlines)',
      'Internal automation tools',
    ],
    kpis: [
      { label: 'AI citations earned', value: '1,200+' },
      { label: 'Hours automated / mo', value: '380+' },
      { label: 'Internal tools shipped', value: '24' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'AI Overview presence, citation sources, and competitor wins across engines.' },
      { step: 2, title: 'Architect', desc: 'Entity, schema, and content structure for citation readiness.' },
      { step: 3, title: 'Earn', desc: 'Digital PR + author authority to be cited by LLMs.' },
      { step: 4, title: 'Automate', desc: 'Ship AI workflows that take work off your team, not add meetings.' },
      { step: 5, title: 'Measure', desc: 'Citation tracking, share-of-answer, and downstream traffic attribution.' },
    ],
    proof: [
      { client: 'B2B SaaS · US', metric: 'AI citations +28', detail: 'Comparison + how-to content + entity schema across 14 pages.' },
      { client: 'E-commerce · EU', metric: 'Brief production ↓ 9h/mo', detail: 'AI brief + outline pipeline for content team.' },
      { client: 'SaaS · MENA', metric: 'Share-of-answer +34%', detail: 'Topical authority + author entity + citation engineering.' },
    ],
    faqs: [
      { q: 'Is this just SEO with new words?', a: 'No — it requires different structure, entity work, and citation strategy.' },
      { q: 'Will you build internal AI tools?', a: 'Yes — from GPT wrappers to full RAG systems with monitoring.' },
      { q: 'How do you measure AI citations?', a: 'We track across ChatGPT, Perplexity, Gemini, and Claude with monthly reporting.' },
    ],
    cta: { primary: 'Book an AI-search audit' },
  },

  // ──────────────────────────── 11 · Social ────────────────────────────────
  {
    slug: 'social-media',
    name: 'Social Media & Community',
    tagline: 'Owned channels that build audience and demand.',
    pillar: 'owned',
    description:
      'Always-on social — strategy, content production, community management, and reporting across IG, TikTok, LinkedIn, X, YouTube, Threads, and emerging.',
    hero: {
      eyebrow: '11 · Social',
      headline: 'Channels that compound into an audience.',
      sub: 'Platform strategy, content systems, community management, and analytics — built for the long game, not the next viral hit.',
    },
    who: [
      'Brands building direct-to-audience channels',
      'Teams under-resourced on content production',
      'Companies entering new social platforms',
    ],
    deliverables: [
      'Platform strategy + content pillars',
      'Editorial calendar + production',
      'Community management + DM triage',
      'Influencer and creator coordination',
      'Monthly performance review',
    ],
    kpis: [
      { label: 'Channels managed', value: '110+' },
      { label: 'Avg follower growth, 12 mo', value: '+184%' },
      { label: 'Engagement rate, avg', value: '4.7%' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Existing channels, content, audience, and competitive landscape.' },
      { step: 2, title: 'Strategize', desc: 'Platform mix, content pillars, posting cadence, voice, and KPIs.' },
      { step: 3, title: 'Produce', desc: 'Editorial calendar with briefed assets and copy — photo, video, motion.' },
      { step: 4, title: 'Engage', desc: 'Community management, replies, DMs, UGC surfacing, and crisis response.' },
      { step: 5, title: 'Iterate', desc: 'Monthly review, creative refresh, and platform changes.' },
    ],
    proof: [
      { client: 'DTC Apparel · EU', metric: 'IG +340K in 9 mo', detail: 'Editorial system + creator collabs drove 4.7% engagement.' },
      { client: 'B2B SaaS · US', metric: 'LinkedIn 6× engagement', detail: 'Founder-led thought leadership engine.' },
      { client: 'Consumer · MENA', metric: 'TikTok 2.1M views/mo', detail: 'Always-on short-form production + paid amplification.' },
    ],
    faqs: [
      { q: 'Which platforms do you cover?', a: 'IG, TikTok, LinkedIn, X, YouTube, Pinterest, Threads, and emerging.' },
      { q: 'Do you produce video?', a: 'Yes — short-form (Reels/TikTok) and long-form (YouTube) in-house and via partners.' },
      { q: 'Do you handle community management?', a: 'Yes — including moderation, DM triage, and crisis response.' },
    ],
    cta: { primary: 'Plan a social program' },
  },

  // ──────────────────────────── 12 · Influencer ────────────────────────────
  {
    slug: 'influencer-marketing',
    name: 'Influencer & Creator Marketing',
    tagline: 'Borrowed trust, measured results.',
    pillar: 'earned',
    description:
      'Creator partnerships at scale — from nano to category-defining talent — with measurement that proves ROI across EMV, CPA, and pipeline.',
    hero: {
      eyebrow: '12 · Creator',
      headline: 'Creator partnerships that move the funnel.',
      sub: 'Strategy, sourcing, contracting, briefing, whitelisting, and measurement. One system, every tier of creator.',
    },
    who: [
      'DTC brands building social proof at scale',
      'B2B brands investing in category authority',
      'Product launches that need reach fast',
    ],
    deliverables: [
      'Creator strategy + tier mix',
      'Sourcing + vetting across nano, micro, mid, macro',
      'Contracting + briefing + disclosure',
      'Whitelisting + paid amplification',
      'Attribution + ROI reporting',
    ],
    kpis: [
      { label: 'Creators activated', value: '2,800+' },
      { label: 'Avg EMV per dollar', value: '$5.20' },
      { label: 'Avg CPA reduction', value: '-37%' },
    ],
    process: [
      { step: 1, title: 'Strategy', desc: 'Tier mix, platform focus, audience mapping, and KPI tree.' },
      { step: 2, title: 'Source', desc: 'Vetted shortlist across nano, micro, mid, and macro tiers.' },
      { step: 3, title: 'Brief', desc: 'Creative briefs with guardrails, talking points, and disclosure rules.' },
      { step: 4, title: 'Amplify', desc: 'Whitelisting, paid amplification, and rights management.' },
      { step: 5, title: 'Measure', desc: 'EMV, attribution, brand lift, and pipeline contribution.' },
    ],
    proof: [
      { client: 'DTC Skincare · US', metric: '$11 EMV per $1', detail: '412-creator tiered activation around launch.' },
      { client: 'B2B SaaS · EU', metric: 'Pipeline +$1.8M', detail: 'Analyst + practitioner creator program.' },
      { client: 'Consumer · MENA', metric: 'CPA ↓ 42%', detail: 'Nano-creator program across 6 markets.' },
    ],
    faqs: [
      { q: 'Do you work with talent agencies?', a: 'Yes — both direct-to-creator and through vetted agencies.' },
      { q: 'How is ROI measured?', a: 'EMV, last-click, MTA, brand-lift studies — depending on goal.' },
      { q: 'Do you handle whitelisting and paid amplification?', a: 'Yes — including rights management and creative iteration.' },
    ],
    cta: { primary: 'Plan a creator program' },
  },

  // ──────────────────────────── 13 · Video ────────────────────────────────
  {
    slug: 'video-production',
    name: 'Video Production & Podcast Studio',
    tagline: 'The most-watched format on the internet, made for your brand.',
    pillar: 'owned',
    description:
      'Brand films, product launches, social-first video, and podcast production — script to edit to distribution, in-house studio.',
    hero: {
      eyebrow: '13 · Video',
      headline: 'Video that earns the watch.',
      sub: 'Strategy, scripting, production, and post — for brand films, paid social, founder content, and podcasts. In-house studio with global shoot capability.',
    },
    who: [
      'Brands launching products that need cinematic scale',
      'Founders building a thought-leadership presence',
      'Teams running paid social at scale who need creative volume',
    ],
    deliverables: [
      'Creative direction + scripting',
      'Production (in-house studio + global shoot)',
      'Post-production + motion graphics',
      'Localization (subtitles, dubbing, cuts)',
      'Distribution strategy + paid amplification',
    ],
    kpis: [
      { label: 'Videos shipped', value: '1,400+' },
      { label: 'Avg view-through rate', value: '62%' },
      { label: 'Podcasts in production', value: '24' },
    ],
    process: [
      { step: 1, title: 'Concept', desc: 'Brief, narrative, audience, and distribution strategy.' },
      { step: 2, title: 'Pre-production', desc: 'Scripting, storyboarding, casting, locations, and production plan.' },
      { step: 3, title: 'Production', desc: 'In-house studio + global shoot capability.' },
      { step: 4, title: 'Post', desc: 'Edit, color, sound, motion graphics, and format cuts.' },
      { step: 5, title: 'Distribute', desc: 'Channel strategy, paid amplification, and performance tracking.' },
    ],
    proof: [
      { client: 'SaaS · US', metric: '4.2M views', detail: 'Founder podcast + short-form distribution engine.' },
      { client: 'Consumer · MENA', metric: 'VTR 78%', detail: 'Product launch hero film with 9 paid variants.' },
      { client: 'FinTech · EU', metric: 'Pipeline +$6.4M', detail: 'Customer story series for enterprise sales enablement.' },
    ],
    faqs: [
      { q: 'Do you have an in-house studio?', a: 'Yes — plus global shoot partners in 14 countries.' },
      { q: 'Do you produce podcasts?', a: 'Yes — full-stack: concept, recording, edit, distribution, and guest booking.' },
      { q: 'Do you do localization?', a: 'Yes — subtitles, dubbing, and per-market creative cuts.' },
    ],
    cta: { primary: 'Plan a video project' },
  },

  // ──────────────────────────── 14 · Affiliate ─────────────────────────────
  {
    slug: 'affiliate-partnerships',
    name: 'Affiliate, Partnership & Referral Programs',
    tagline: 'A revenue channel that pays for performance.',
    pillar: 'paid',
    description:
      'Affiliate programs, strategic partnerships, and referral systems — built with the tech stack, payouts, and creative that scale.',
    hero: {
      eyebrow: '14 · Partnerships',
      headline: 'Performance partnerships at venture scale.',
      sub: 'Affiliate, strategic partner, and referral programs — with the tech stack, payouts, and creative that turn partnerships into a revenue channel.',
    },
    who: [
      'DTC brands scaling beyond paid social',
      'B2B SaaS building integration and reseller programs',
      'Marketplaces and platforms with two-sided ecosystems',
    ],
    deliverables: [
      'Program strategy + economics model',
      'Tech stack selection + implementation',
      'Partner recruitment + onboarding',
      'Creative + co-marketing assets',
      'Reporting + payout automation',
    ],
    kpis: [
      { label: 'Programs launched', value: '60+' },
      { label: 'Avg partner-driven revenue lift', value: '+38%' },
      { label: 'Active partners / program', value: '240+' },
    ],
    process: [
      { step: 1, title: 'Strategize', desc: 'Channel mix, economics model, and partner profile.' },
      { step: 2, title: 'Build', desc: 'Tech stack (Impact, PartnerStack, TUNE), creative, and program terms.' },
      { step: 3, title: 'Recruit', desc: 'Outbound + inbound partner recruitment with vetting.' },
      { step: 4, title: 'Enable', desc: 'Onboarding, co-marketing, and creative support.' },
      { step: 5, title: 'Operate', desc: 'Reporting, payouts, optimization, and partner tiering.' },
    ],
    proof: [
      { client: 'DTC Apparel · EU', metric: 'Affiliate rev 24% of total', detail: 'Built partner program from zero to $4.2M ARR in 14 months.' },
      { client: 'B2B SaaS · US', metric: '$1.1M ARR', detail: 'Integration partner program with 32 active partners.' },
      { client: 'Marketplace · MENA', metric: 'Referral rev +62%', detail: 'Customer referral program with tiered incentives.' },
    ],
    faqs: [
      { q: 'Which platforms do you support?', a: 'Impact, PartnerStack, TUNE, Rewardful, and first-party implementations.' },
      { q: 'Do you handle recruitment?', a: 'Yes — outbound, inbound, and partner enablement.' },
      { q: 'Do you do reseller and integration partnerships?', a: 'Yes — including co-marketing and revenue share modeling.' },
    ],
    cta: { primary: 'Plan a partner program' },
  },

  // ──────────────────────────── 15 · ABM / B2B ─────────────────────────────
  {
    slug: 'abm-b2b-demand',
    name: 'ABM & B2B Demand Generation',
    tagline: 'Pipeline you can forecast, not just hope for.',
    pillar: 'owned',
    description:
      'Account-based marketing, demand generation, and sales enablement — built for complex sales cycles and long contracts.',
    hero: {
      eyebrow: '15 · B2B',
      headline: 'Pipeline that survives a CFO review.',
      sub: 'ABM, demand gen, sales enablement, and category design — engineered for the way B2B actually buys.',
    },
    who: [
      'B2B SaaS scaling past $5M ARR',
      'Enterprise vendors entering new categories',
      'B2B services firms with long cycles',
    ],
    deliverables: [
      'ICP + target account list',
      'ABM program (1:1, 1:few, 1:many)',
      'Demand-gen engine (paid, content, events)',
      'Sales enablement (decks, battle cards, case studies)',
      'Pipeline attribution + forecast',
    ],
    kpis: [
      { label: 'ABM programs shipped', value: '60+' },
      { label: 'Avg pipeline lift', value: '+142%' },
      { label: 'Sales cycle reduction', value: '-27%' },
    ],
    process: [
      { step: 1, title: 'Map', desc: 'ICP, account list, buying committee, and trigger events.' },
      { step: 2, title: 'Position', desc: 'Category narrative, messaging, and sales narrative.' },
      { step: 3, title: 'Engage', desc: 'ABM plays across paid, content, events, and direct outreach.' },
      { step: 4, title: 'Enable', desc: 'Sales decks, battle cards, case studies, and call prep.' },
      { step: 5, title: 'Measure', desc: 'Pipeline, attribution, forecast accuracy, and sales velocity.' },
    ],
    proof: [
      { client: 'B2B SaaS · US', metric: 'Pipeline +$24M', detail: 'Tier-1 ABM across 180 named accounts in 9 months.' },
      { client: 'Industrial · EU', metric: 'Cycle ↓ 4.2 mo', detail: 'Category narrative + sales enablement rollout.' },
      { client: 'FinTech · MENA', metric: 'Win rate +34%', detail: 'Enterprise ABM program across 7 verticals.' },
    ],
    faqs: [
      { q: 'Do you handle sales enablement?', a: 'Yes — decks, battle cards, case studies, and call prep.' },
      { q: 'Which ABM tools?', a: 'Demandbase, 6sense, Rollworks, and HubSpot ABM.' },
      { q: 'How is pipeline attributed?', a: 'Multi-touch across the full buying committee with weekly exec reporting.' },
    ],
    cta: { primary: 'Plan a B2B program' },
  },

  // ──────────────────────────── 16 · PR ────────────────────────────────────
  {
    slug: 'public-relations',
    name: 'Public Relations & Earned Media',
    tagline: 'Earned media that shapes category narrative.',
    pillar: 'earned',
    description:
      'Media relations, thought leadership, crisis communications, and narrative design — across business, tech, lifestyle, and trade press globally.',
    hero: {
      eyebrow: '16 · PR',
      headline: 'Be the source, not the subject.',
      sub: 'Narrative design, media relations, executive visibility, and crisis comms — measured by mention quality, not volume.',
    },
    who: [
      'Founders building category authority',
      'Companies navigating reputational risk',
      'Brands launching into new markets',
    ],
    deliverables: [
      'Narrative + messaging framework',
      'Media list + relations program',
      'Press release + embargo strategy',
      'Executive visibility program',
      'Crisis communications playbook',
    ],
    kpis: [
      { label: 'Tier-1 placements, 12 mo', value: '420+' },
      { label: 'Avg domain authority of outlets', value: '78' },
      { label: 'Executive bylines placed', value: '180+' },
    ],
    process: [
      { step: 1, title: 'Position', desc: 'Narrative, hooks, and spokesperson development.' },
      { step: 2, title: 'Target', desc: 'Outlet and journalist mapping by beat and intent.' },
      { step: 3, title: 'Pitch', desc: 'Story-led pitches with data, exclusives, and embargoes.' },
      { step: 4, title: 'Sustain', desc: 'Executive bylines, podcast tours, and ongoing cadence.' },
      { step: 5, title: 'Defend', desc: 'Crisis playbooks, monitoring, and rapid response.' },
    ],
    proof: [
      { client: 'FinTech · US', metric: 'WSJ + FT + Bloomberg', detail: 'Series C narrative + founder media tour across 14 outlets.' },
      { client: 'Consumer · EU', metric: 'Crisis averted in 36h', detail: 'Rapid-response narrative + executive statements.' },
      { client: 'SaaS · MENA', metric: 'Founder bylines 22', detail: 'Tier-1 thought leadership program across business and tech press.' },
    ],
    faqs: [
      { q: 'Do you work with US / EU / MENA press?', a: 'Yes — relationships across all three regions, including Arabic-language press.' },
      { q: 'What\'s a typical retainer?', a: 'Project-based for launches; monthly for sustained visibility.' },
      { q: 'Do you do crisis comms?', a: 'Yes — including 24/7 monitoring and rapid-response playbooks.' },
    ],
    cta: { primary: 'Plan a PR engagement' },
  },

  // ──────────────────────────── 17 · Research ──────────────────────────────
  {
    slug: 'market-research',
    name: 'Market Research & Category Design',
    tagline: 'Decisions backed by evidence, not opinions.',
    pillar: 'data',
    description:
      'Qualitative and quantitative research — brand tracking, customer interviews, segmentation, pricing, market sizing, and category design.',
    hero: {
      eyebrow: '17 · Research',
      headline: 'Evidence before opinion.',
      sub: 'Brand tracking, customer research, segmentation, pricing studies, market sizing, and category design — for decisions that need to hold up.',
    },
    who: [
      'Companies entering new markets',
      'Brands rethinking positioning',
      'Teams validating product direction',
    ],
    deliverables: [
      'Brand tracking study',
      'Customer interviews + synthesis',
      'Segmentation + persona development',
      'Pricing study (conjoint + Van Westendorp)',
      'Market sizing + category design',
    ],
    kpis: [
      { label: 'Studies shipped', value: '120+' },
      { label: 'Avg respondents / study', value: '1,800' },
      { label: 'Markets covered', value: '34' },
    ],
    process: [
      { step: 1, title: 'Frame', desc: 'Decision, hypotheses, methodology, and sample design.' },
      { step: 2, title: 'Collect', desc: 'Surveys, interviews, ethnography, and secondary data.' },
      { step: 3, title: 'Analyze', desc: 'Segmentation, sizing, drivers, and brand health metrics.' },
      { step: 4, title: 'Synthesize', desc: 'Findings, implications, and decision-ready recommendations.' },
      { step: 5, title: 'Enable', desc: 'Workshop with leadership to operationalize findings.' },
    ],
    proof: [
      { client: 'CPG · MENA', metric: '+$80M TAM identified', detail: 'Market sizing + segmentation for new category.' },
      { client: 'SaaS · US', metric: 'Pricing ↑ 22%', detail: 'Conjoint pricing study across 4 tiers.' },
      { client: 'FinTech · EU', metric: 'Positioning reset', detail: 'Brand tracker + qualitative interviews across 3 markets.' },
    ],
    faqs: [
      { q: 'Do you run B2B and B2C research?', a: 'Both — with different methodologies and panel partners.' },
      { q: 'What languages?', a: 'English, French, Arabic, Spanish, and German — and partners for others.' },
      { q: 'Do you do category design?', a: 'Yes — in partnership with category strategy specialists.' },
    ],
    cta: { primary: 'Plan a research study' },
  },

  // ──────────────────────────── 18 · Internationalization ───────────────────
  {
    slug: 'internationalization',
    name: 'Internationalization & Market Entry',
    tagline: 'Go global without sounding like you just went global.',
    pillar: 'platform',
    description:
      'Market entry strategy, localization, regional SEO, and global campaign adaptation — across MENA, EU, US, APAC, and LATAM.',
    hero: {
      eyebrow: '18 · Global',
      headline: 'Win markets, not just translate.',
      sub: 'Market entry strategy, localization, regional SEO, and campaign adaptation — across MENA, EU, US, APAC, and LATAM.',
    },
    who: [
      'Brands entering MENA from US / EU',
      'MENA brands expanding into Europe or APAC',
      'Companies launching multi-region from day one',
    ],
    deliverables: [
      'Market entry strategy + sizing',
      'Localization (copy, creative, schema, SEO)',
      'Regional paid + organic campaigns',
      'Local partnerships + influencer programs',
      'Market entry analytics + reporting',
    ],
    kpis: [
      { label: 'Markets entered', value: '34' },
      { label: 'Avg time-to-traction', value: '< 6 mo' },
      { label: 'Localization throughput / mo', value: '180 assets' },
    ],
    process: [
      { step: 1, title: 'Diagnose', desc: 'Market sizing, competitive map, regulatory + cultural landscape.' },
      { step: 2, title: 'Strategize', desc: 'Entry mode (direct, partner, acquisition), positioning, and budget.' },
      { step: 3, title: 'Localize', desc: 'Copy, creative, schema, SEO, and product experience adaptation.' },
      { step: 4, title: 'Launch', desc: 'Regional campaigns, partnerships, and PR.' },
      { step: 5, title: 'Scale', desc: 'In-market team buildout or partner transition; ongoing optimization.' },
    ],
    proof: [
      { client: 'US SaaS → MENA', metric: '$4.8M ARR, yr 1', detail: 'Market entry into UAE + KSA with localized product and partner program.' },
      { client: 'EU DTC → APAC', metric: 'Revenue +38%', detail: 'Localization + influencer + regional paid across 4 markets.' },
      { client: 'MENA brand → EU', metric: 'Direct bookings +52%', detail: 'Repositioning + multilingual SEO + partner network.' },
    ],
    faqs: [
      { q: 'Do you do Arabic localization?', a: 'Yes — including cultural adaptation, not just translation.' },
      { q: 'Which regions do you cover?', a: 'MENA, EU, US, APAC, and LATAM — with in-market partners.' },
      { q: 'Do you help with regulatory?', a: 'Yes — including data privacy, advertising, and product compliance.' },
    ],
    cta: { primary: 'Plan a market entry' },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
