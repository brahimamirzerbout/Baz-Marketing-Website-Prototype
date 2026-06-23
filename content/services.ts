import type { Service } from '@/types';

/**
 * BAZ service pillars — 9 offers across owned / earned / paid / data / platform.
 * Each entry is the full payload that drives its service detail page.
 * `placeholder: true` marks content that uses representative copy without
 * real client metrics. Real metrics must be added before public launch.
 */
export const services: Service[] = [
  {
    slug: 'strategy-consulting',
    name: 'Strategy & Growth Consulting',
    tagline: 'A growth plan that survives the org chart.',
    pillar: 'owned',
    description:
      'A senior-led growth audit, opportunity map, and 90-day plan tied to revenue — not vanity metrics.',
    hero: {
      eyebrow: '01 · Strategy',
      headline: 'Make growth predictable.',
      sub: 'Senior strategists build your plan: positioning, channel mix, unit economics, and the 90-day roadmap to hit it.',
    },
    who: ['$2M–$50M ARR companies', 'CMOs preparing for a board review', 'Founders post-funding who need a real plan'],
    deliverables: ['Growth audit', 'Channel-economics model', '90-day roadmap', 'Quarterly OKRs', 'Monthly review'],
    kpis: [
      { label: 'Plans shipped', value: '60+' },
      { label: 'Avg payback', value: '< 6 mo' },
      { label: 'Client renewal', value: '94%' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Funnel, analytics, channel data, and qualitative interviews.' },
      { step: 2, title: 'Model', desc: 'Unit economics, LTV/CAC by channel, attribution strategy.' },
      { step: 3, title: 'Plan', desc: '90-day roadmap with owners, budgets, and exit criteria.' },
      { step: 4, title: 'Operate', desc: 'Embedded reviews; we hold the line on what moves revenue.' },
    ],
    proof: [
      { client: 'DTC Beauty · MENA', metric: '+182% YoY', detail: 'Re-allocated spend from IG to search + creator UGC.' },
      { client: 'B2B SaaS · US', metric: 'CAC ↓ 41%', detail: 'Switched to PQL-led paid + SEO content engine.' },
    ],
    faqs: [
      { q: 'Is this retainer or project?', a: 'Either. Most engagements are 90-day plan → 6-month embedded.' },
      { q: 'Who actually does the work?', a: 'A senior partner (not a junior pod). Always.' },
    ],
    cta: { primary: 'Book a growth call', secondary: 'See case studies' },
  },
  {
    slug: 'paid-media',
    name: 'Paid Media',
    tagline: 'Spend that compounds, not burns.',
    pillar: 'paid',
    description:
      'Paid search, paid social, and programmatic — built on clean tracking, real attribution, and creative that actually converts.',
    hero: {
      eyebrow: '02 · Paid',
      headline: 'Turn ad spend into measurable profit.',
      sub: 'Google, Meta, TikTok, LinkedIn, programmatic. Tight tracking, weekly iteration, no wasted impressions.',
    },
    who: ['Brands with $20K+/mo ad budget', 'DTC and lead-gen teams scaling past founder-led growth'],
    deliverables: ['Channel mix model', 'Creative testing framework', 'Server-side tracking', 'Weekly iteration loops', 'Dashboard + reporting'],
    kpis: [
      { label: 'Spend managed', value: '$24M+' },
      { label: 'Avg ROAS lift', value: '+62%' },
      { label: 'Creative variants/mo', value: '40+' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Tracking, attribution, creative library, and historical performance.' },
      { step: 2, title: 'Rebuild', desc: 'Server-side pixels, conversion API, clean events in GA4.' },
      { step: 3, title: 'Launch', desc: 'New campaigns with measurement plan and creative matrix.' },
      { step: 4, title: 'Scale', desc: 'Weekly creative testing, budget reallocation toward winners.' },
    ],
    proof: [
      { client: 'DTC Skincare · EU', metric: 'ROAS 2.1 → 4.8', detail: 'Creator-led UGC + Meta Advantage+.' },
      { client: 'B2B SaaS · US', metric: 'CPL ↓ 58%', detail: 'Rebuilt LinkedIn + Google with PQL scoring.' },
    ],
    faqs: [
      { q: 'Do you require a minimum spend?', a: 'We work best with $20K/mo+ ad budget; we will tell you honestly if less.' },
      { q: 'Who owns the ad accounts?', a: 'You do. Always. We never hold business-critical accounts.' },
    ],
    cta: { primary: 'Request a paid audit' },
  },
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
    who: ['Brands tired of paying for every click', 'Companies entering new markets or categories'],
    deliverables: ['Technical SEO audit', 'Topical map', 'Content engine (8–24 posts/mo)', 'Digital PR', 'Internal-linking architecture'],
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
    ],
    proof: [
      { client: 'FinTech · EU', metric: '0 → 480K/mo', detail: 'Editorial engine + programmatic SEO.' },
      { client: 'Hospitality · MENA', metric: 'Bookings +71%', detail: 'Multi-location SEO + GBP optimization.' },
    ],
    faqs: [
      { q: 'How long until I see results?', a: 'Meaningful lift in 4–6 months. Compounding gains 9–18 months.' },
      { q: 'Do you do local SEO?', a: 'Yes — multi-location, GBP, citations, and reviews at scale.' },
    ],
    cta: { primary: 'Request an SEO audit' },
  },
  {
    slug: 'web-design-development',
    name: 'Website Design & Development',
    tagline: 'Sites that load fast, rank, and convert.',
    pillar: 'owned',
    description:
      'Marketing sites, e-commerce, and SaaS frontends — engineered for speed, SEO, and conversion from day one.',
    hero: {
      eyebrow: '04 · Owned',
      headline: 'A website that earns its keep.',
      sub: 'Editorial-grade design. Performance budgets enforced. Built to rank and convert from first paint.',
    },
    who: ['Companies launching or rebranding', 'Teams whose CMS or stack is blocking growth'],
    deliverables: ['Information architecture', 'Design system', 'Next.js / headless build', 'CMS integration', 'Hosting + maintenance'],
    kpis: [
      { label: 'Avg LCP, mobile', value: '1.2s' },
      { label: 'Avg CWV pass rate', value: '96%' },
      { label: 'Conversion lift, avg', value: '+38%' },
    ],
    process: [
      { step: 1, title: 'Discover', desc: 'Stakeholder interviews, analytics, and content audit.' },
      { step: 2, title: 'Define', desc: 'Information architecture and design system tokens.' },
      { step: 3, title: 'Design', desc: 'High-fidelity comps for desktop and mobile.' },
      { step: 4, title: 'Develop', desc: 'Next.js / headless build, CMS, integrations, QA.' },
      { step: 5, title: 'Launch', desc: 'Performance budgets, schema, redirects, analytics.' },
    ],
    proof: [
      { client: 'Hospitality · Global', metric: 'LCP 4.2s → 1.1s', detail: 'Edge-rendered Next.js with image pipeline.' },
      { client: 'SaaS · US', metric: 'Trial ↑ 64%', detail: 'Re-architected homepage for PLG conversion.' },
    ],
    faqs: [
      { q: 'Which stack do you use?', a: 'Next.js + Tailwind by default. Headless CMS (Sanity / Contentful) for content-heavy sites.' },
      { q: 'Do you offer hosting?', a: 'Yes — Vercel / Cloudflare Pages with monitoring and 99.95% SLA.' },
    ],
    cta: { primary: 'Plan a website project' },
  },
  {
    slug: 'content-copywriting',
    name: 'Content Strategy & Copywriting',
    tagline: 'Words that move pipeline, not just readers.',
    pillar: 'earned',
    description:
      'Editorial strategy and writing that ranks in search, earns trust, and converts — across blog, landing pages, and email.',
    hero: {
      eyebrow: '05 · Content',
      headline: 'Editorial that compounds into revenue.',
      sub: 'Senior writers and editors — not offshore mills. Every piece tied to a search intent and a funnel outcome.',
    },
    who: ['Brands publishing 4–30+ pieces/mo', 'Teams without an in-house editorial function'],
    deliverables: ['Editorial calendar', 'SEO briefs', 'Long-form articles', 'Landing-page copy', 'Email + nurture sequences'],
    kpis: [
      { label: 'Avg posts / mo', value: '12' },
      { label: 'Indexed in 90 days', value: '94%' },
      { label: 'Avg session time', value: '3:42' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Existing content, performance, and topical gaps.' },
      { step: 2, title: 'Strategize', desc: 'Editorial calendar tied to commercial themes and search intent.' },
      { step: 3, title: 'Brief', desc: 'Detailed briefs with structure, sources, and on-page SEO targets.' },
      { step: 4, title: 'Produce', desc: 'Senior writers + editors. No AI-slop. Reviewed by humans.' },
    ],
    proof: [
      { client: 'B2B SaaS · US', metric: 'Demo requests +89%', detail: 'Comparison + alternatives pages at scale.' },
      { client: 'DTC Apparel · EU', metric: 'AOV +24%', detail: 'Editorial lookbooks feeding Meta catalog.' },
    ],
    faqs: [
      { q: 'Do you use AI?', a: 'For research and outlines. Final drafts are human-written and edited.' },
      { q: 'How fast can you start?', a: 'Two weeks from kickoff to first published piece.' },
    ],
    cta: { primary: 'Plan content engine' },
  },
  {
    slug: 'analytics-tracking',
    name: 'Analytics & Tracking',
    tagline: 'Numbers you can actually trust.',
    pillar: 'data',
    description:
      'GA4, server-side tracking, attribution modeling, and dashboards that turn data into decisions.',
    hero: {
      eyebrow: '06 · Data',
      headline: 'Measurement that drives decisions.',
      sub: 'Clean data. Real attribution. Dashboards execs actually open. Built for marketers and boards.',
    },
    who: ['Companies losing trust in their numbers', 'Teams rebuilding after iOS / cookie loss'],
    deliverables: ['GA4 + GTM rebuild', 'Server-side GTM', 'Attribution model', 'Looker / GA4 dashboards', 'Weekly automated reports'],
    kpis: [
      { label: 'Dashboards shipped', value: '180+' },
      { label: 'Avg data accuracy', value: '99.4%' },
      { label: 'Exec adoption', value: '92%' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Current tracking, data quality, and decision flow.' },
      { step: 2, title: 'Rebuild', desc: 'GA4 events, server-side GTM, conversion API, dedup keys.' },
      { step: 3, title: 'Model', desc: 'Attribution model and channel-economics view.' },
      { step: 4, title: 'Report', desc: 'Looker / GA4 dashboards tailored to exec and operator use.' },
    ],
    proof: [
      { client: 'Marketplace · EU', metric: 'Decisions 3× faster', detail: 'Replaced 8 dashboards with one exec view.' },
      { client: 'DTC · US', metric: 'Tracking ↑ to 99%', detail: 'Server-side GTM, conversion API, dedup.' },
    ],
    faqs: [
      { q: 'Can you work with our existing GA4?', a: 'Yes. We audit, repair, or rebuild — depending on the state.' },
      { q: 'Do you build dashboards in Looker / Tableau?', a: 'Both. Looker Studio for most, Tableau / PowerBI for enterprise.' },
    ],
    cta: { primary: 'Request tracking audit' },
  },
  {
    slug: 'ai-search-automation',
    name: 'AI Search Optimization & Automation',
    tagline: 'Win the answer box, not just the blue link.',
    pillar: 'earned',
    description:
      'Get cited by ChatGPT, Perplexity, and Google AI Overviews. Plus AI workflows that ship work, not slides.',
    hero: {
      eyebrow: '07 · AI',
      headline: 'Be the answer engines recommend.',
      sub: 'Schema, structure, and authority that win placement in AI Overviews and LLM answers. Plus automation that actually ships.',
    },
    who: ['Brands that want to win the new SERP', 'Teams spending too much time on repetitive work'],
    deliverables: ['AI-search audit', 'Schema + entity strategy', 'Citation engineering', 'AI content workflows', 'Internal automation'],
    kpis: [
      { label: 'AI citations earned', value: '1,200+' },
      { label: 'Hours automated / mo', value: '380+' },
      { label: 'Internal tools shipped', value: '24' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'AI Overview presence, citation sources, and competitor wins.' },
      { step: 2, title: 'Architect', desc: 'Entity, schema, and content structure for citation readiness.' },
      { step: 3, title: 'Earn', desc: 'Digital PR + author authority to be cited by LLMs.' },
      { step: 4, title: 'Automate', desc: 'Ship AI workflows that take work off your team, not add meetings.' },
    ],
    proof: [
      { client: 'B2B SaaS · US', metric: 'AI Overview citations +28', detail: 'Comparison + how-to content + entity schema.' },
      { client: 'E-commerce · EU', metric: 'Brief production ↓ 9h/mo', detail: 'AI brief + outline pipeline for content team.' },
    ],
    faqs: [
      { q: 'Is this just SEO with new words?', a: 'No — it requires different structure, entity work, and citation strategy.' },
      { q: 'Will you build internal AI tools?', a: 'Yes — from GPT wrappers to full RAG systems with monitoring.' },
    ],
    cta: { primary: 'Book an AI-search audit' },
  },
  {
    slug: 'crm-lifecycle',
    name: 'CRM & Lifecycle Marketing',
    tagline: 'Monetize the list you already have.',
    pillar: 'owned',
    description:
      'HubSpot, Klaviyo, Customer.io, and Salesforce — engineered for retention, not blasts.',
    hero: {
      eyebrow: '08 · Lifecycle',
      headline: 'Turn one-time buyers into recurring revenue.',
      sub: 'CRM architecture, lifecycle flows, and segmentation that drive LTV — not just opens.',
    },
    who: ['Brands with growing lists but flat revenue', 'Teams migrating CRM platforms'],
    deliverables: ['CRM migration', 'Lifecycle flows (welcome, winback, browse, cart)', 'Segmentation', 'Lead scoring', 'Attribution to revenue'],
    kpis: [
      { label: 'CRM migrations', value: '40+' },
      { label: 'Avg LTV lift', value: '+47%' },
      { label: 'Flows shipped / mo', value: '8+' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'CRM stack, data flow, and lifecycle performance.' },
      { step: 2, title: 'Architect', desc: 'Lifecycle blueprint: triggers, segments, and channel mix.' },
      { step: 3, title: 'Migrate', desc: 'CRM platform migration with zero data loss.' },
      { step: 4, title: 'Operate', desc: 'Weekly iteration on flows, copy, and segments.' },
    ],
    proof: [
      { client: 'DTC Beauty · EU', metric: 'LTV +52%', detail: 'Winback + browse abandonment flows.' },
      { client: 'B2B SaaS · US', metric: 'MQL → SQL +38%', detail: 'Lead scoring and lifecycle routing.' },
    ],
    faqs: [
      { q: 'Which CRMs do you support?', a: 'HubSpot, Klaviyo, Customer.io, Salesforce, and Attio.' },
      { q: 'Do you do SMS and push?', a: 'Yes — as part of an integrated lifecycle, not siloed blasts.' },
    ],
    cta: { primary: 'Plan a CRM rebuild' },
  },
  {
    slug: 'creative-cro',
    name: 'Creative & CRO',
    tagline: 'Design that moves the needle, not the eye.',
    pillar: 'owned',
    description:
      'Landing pages, ad creative, and on-site experimentation — designed for the metric, not the moodboard.',
    hero: {
      eyebrow: '09 · Creative',
      headline: 'Design tied to the metric it owns.',
      sub: 'Brand-grade creative plus conversion-rate experimentation. Every design choice is a hypothesis we test.',
    },
    who: ['Brands spending on traffic but not converting', 'Teams whose ad creative has gone stale'],
    deliverables: ['Landing pages', 'Ad creative matrix', 'A/B test roadmap', 'On-site experimentation', 'Brand refresh (light)'],
    kpis: [
      { label: 'Avg CVR lift', value: '+31%' },
      { label: 'Tests / quarter', value: '60+' },
      { label: 'Winning variants shipped', value: '120+' },
    ],
    process: [
      { step: 1, title: 'Audit', desc: 'Funnel analytics, heatmaps, and creative performance.' },
      { step: 2, title: 'Hypothesize', desc: 'Prioritized backlog of CRO and creative tests.' },
      { step: 3, title: 'Produce', desc: 'Design and build landing pages and ad creative.' },
      { step: 4, title: 'Test', desc: 'A/B and multivariate, with statistical rigor.' },
    ],
    proof: [
      { client: 'SaaS · US', metric: 'Trial conversion +44%', detail: 'Hero, pricing, and onboarding redesign.' },
      { client: 'E-commerce · MENA', metric: 'AOV +27%', detail: 'Product detail page experimentation.' },
    ],
    faqs: [
      { q: 'Do you do full brand redesigns?', a: 'Light refreshes yes, full rebrands are project-scoped.' },
      { q: 'What tools do you test with?', a: 'VWO, Optimizely, and in-house feature flags. We adapt to your stack.' },
    ],
    cta: { primary: 'Plan a CRO sprint' },
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
