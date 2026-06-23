import type { Industry } from '@/types';

export const industries: Industry[] = [
  {
    slug: 'dtc-ecommerce',
    name: 'DTC & E-commerce',
    blurb: 'Brands scaling paid + retention together, not in silos.',
    challenges: [
      'Rising CAC across Meta and TikTok',
      'iOS attribution loss and creative fatigue',
      'Flat LTV despite growing list size',
    ],
    outcomes: [
      'Clean server-side tracking that survives iOS',
      'Creative matrix with weekly iteration',
      'Lifecycle flows that compound LTV',
    ],
  },
  {
    slug: 'b2b-saas',
    name: 'B2B SaaS',
    blurb: 'Companies that need pipeline they can forecast.',
    challenges: [
      'Long, opaque sales cycles',
      'Leaky MQL → SQL hand-off',
      'Content that ranks but doesn\'t convert',
    ],
    outcomes: [
      'PQL scoring and routing into lifecycle',
      'Comparison and alternatives pages at scale',
      'Dashboards that show pipeline by channel',
    ],
  },
  {
    slug: 'fintech',
    name: 'FinTech',
    blurb: 'Trust-first growth for regulated, technical products.',
    challenges: [
      'Category-defining SERPs dominated by incumbents',
      'Trust and compliance in every piece of content',
      'High-intent traffic that doesn\'t convert',
    ],
    outcomes: [
      'Authoritative content that earns citations',
      'CRO on regulated flows without breaking UX',
      'Attribution that survives cookie loss',
    ],
  },
  {
    slug: 'hospitality',
    name: 'Hospitality & Travel',
    blurb: 'Multi-location brands that need to own the direct channel.',
    challenges: [
      'OTA dependency and high commission',
      'Fragmented GBP and citations across properties',
      'Slow, brochure-style sites',
    ],
    outcomes: [
      'Edge-rendered sites with sub-1.5s LCP',
      'GBP and review strategy at portfolio scale',
      'Direct booking engine that outperforms OTAs',
    ],
  },
  {
    slug: 'ai-devtools',
    name: 'AI & Dev Tools',
    blurb: 'Technical buyers, technical content, new SERPs to win.',
    challenges: [
      'Zero presence in AI Overviews and LLM answers',
      'Technical buyers who see through fluff',
      'Product-led growth without lifecycle to match',
    ],
    outcomes: [
      'Entity and citation strategy for the new SERP',
      'Documentation and developer content that ranks',
      'Lifecycle that turns PQLs into pipeline',
    ],
  },
  {
    slug: 'professional-services',
    name: 'Professional Services',
    blurb: 'Consultancies, agencies, and B2B services firms scaling past referral-only.',
    challenges: [
      'Inconsistent pipeline from referrals alone',
      'Generic content that doesn\'t move decision-makers',
      'No attribution from first touch to closed-won',
    ],
    outcomes: [
      'Thought-leadership content that ranks for category terms',
      'Lead scoring and nurture flows into CRM',
      'Attribution and dashboards your partners will open',
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
