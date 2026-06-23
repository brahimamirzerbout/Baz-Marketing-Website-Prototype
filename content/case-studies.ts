import type { CaseStudy } from '@/types';

/**
 * Case studies. Where the prompt explicitly allows it, results are
 * "polished placeholders" with clear `placeholder: true` so that real
 * metrics can be swapped in before launch.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: 'viralvista-growth-engine',
    client: 'ViralVista',
    industry: 'DTC Beauty',
    services: ['Paid Media', 'SEO', 'Content', 'Creative & CRO'],
    cover: '#ff3b2f',
    problem:
      'ViralVista was spending $80K/mo on Meta with a 1.8 ROAS and no compounding asset. Creative fatigue hit every 9 days.',
    strategy:
      'Rebuilt the creative matrix around UGC creators, layered search and SEO to capture branded demand, and instrumented server-side attribution to stop overcounting.',
    result:
      'ROAS climbed from 1.8 → 4.6 in 90 days. Branded search volume tripled. Customer LTV up 41% from new onboarding flows.',
    metrics: [
      { label: 'ROAS', value: '1.8 → 4.6' },
      { label: 'Monthly revenue', value: '+212%' },
      { label: 'CPA', value: '↓ 58%' },
    ],
    duration: '90 days',
    testimonial: {
      quote: 'BAZ rebuilt our growth engine. We finally trust the numbers and the team running them.',
      author: 'Hala Mansour',
      role: 'Founder',
    },
    placeholder: true,
  },
  {
    slug: 'northwind-fintech-seo',
    client: 'Northwind',
    industry: 'FinTech',
    services: ['SEO & Organic Growth', 'Content', 'Analytics'],
    cover: '#4f7cff',
    problem:
      'Northwind was invisible on category-defining search terms and dependent on paid for every signup.',
    strategy:
      'Built a topical map around comparison and alternative queries, shipped a programmatic SEO engine, and earned placements in 8 industry publications.',
    result:
      '0 → 480K monthly organic sessions in 14 months. Inbound pipeline now exceeds outbound. CAC down 41%.',
    metrics: [
      { label: 'Organic sessions', value: '0 → 480K/mo' },
      { label: 'Top-3 SERPs', value: '340+' },
      { label: 'Inbound / Outbound', value: '3.2×' },
    ],
    duration: '14 months',
    testimonial: {
      quote: 'They turned organic into our biggest channel. No one else got close.',
      author: 'Daniel K.',
      role: 'VP Growth',
    },
    placeholder: true,
  },
  {
    slug: 'engageera-saas-launch',
    client: 'EngageEra',
    industry: 'B2B SaaS',
    services: ['Strategy & Growth Consulting', 'Paid Media', 'Web Design & Development', 'CRM & Lifecycle'],
    cover: '#7a3cff',
    problem:
      'Post-launch, EngageEra had 12K free signups but a 0.6% trial-to-paid conversion. The site wasn\'t built for product-led growth.',
    strategy:
      'Rebuilt the homepage around PQL scoring, instrumented lifecycle flows in Customer.io, and ran a structured paid + content engine to fill the top of funnel.',
    result:
      'Trial-to-paid hit 2.4% in six months. New MRR up 318%. Sales cycle shortened by 23 days from better lead routing.',
    metrics: [
      { label: 'Trial → Paid', value: '0.6% → 2.4%' },
      { label: 'New MRR', value: '+318%' },
      { label: 'Sales cycle', value: '↓ 23 days' },
    ],
    duration: '6 months',
    testimonial: {
      quote: 'Senior people, no juniors. They shipped what other agencies only pitch.',
      author: 'Mira Okafor',
      role: 'CEO',
    },
    placeholder: true,
  },
  {
    slug: 'saffron-hospitality-multi-location',
    client: 'Saffron & Co.',
    industry: 'Hospitality',
    services: ['SEO & Organic Growth', 'Web Design & Development', 'Paid Media'],
    cover: '#f9a01f',
    problem:
      'A 14-property hospitality group with a slow, brochure-style site and 7 fragmented Google Business Profiles.',
    strategy:
      'Consolidated into one Next.js site with property-specific landing pages, normalized GBP and citations, and ran search + social to drive direct bookings.',
    result:
      'Direct bookings up 71%. Cost-per-acquisition down 44%. Mobile LCP from 4.2s → 1.1s.',
    metrics: [
      { label: 'Direct bookings', value: '+71%' },
      { label: 'CPA', value: '↓ 44%' },
      { label: 'Mobile LCP', value: '4.2s → 1.1s' },
    ],
    duration: '8 months',
    testimonial: {
      quote: 'We own the direct channel now. The ROI on the site rebuild paid for itself in 11 weeks.',
      author: 'Reem Al-Fahim',
      role: 'CMO',
    },
    placeholder: true,
  },
  {
    slug: 'meridian-devtools-ai-search',
    client: 'Meridian Labs',
    industry: 'AI / DevTools',
    services: ['AI Search Optimization', 'Content', 'Digital PR'],
    cover: '#3ddc97',
    problem:
      'Meridian was a strong dev tool with zero AI-search presence — invisible in ChatGPT, Perplexity, and Google AI Overviews.',
    strategy:
      'Built an entity-first content strategy, shipped 60 comparison and how-to pieces, ran a digital-PR push to earn citations from authoritative sources.',
    result:
      '28 AI Overview citations across priority queries. Branded search volume up 4.3×. Inbound enterprise demos up 2.1×.',
    metrics: [
      { label: 'AI Overview citations', value: '0 → 28' },
      { label: 'Branded search', value: '+330%' },
      { label: 'Enterprise demos', value: '+110%' },
    ],
    duration: '5 months',
    testimonial: {
      quote: 'We\'re cited by the LLMs now. That is a moat no one else in our category has.',
      author: 'Sora Tanaka',
      role: 'Head of Marketing',
    },
    placeholder: true,
  },
  {
    slug: 'buzzbeacon-content-engine',
    client: 'BuzzBeacon Media',
    industry: 'Podcast Network',
    services: ['Content Strategy & Copywriting', 'SEO & Organic Growth', 'Analytics'],
    cover: '#0e0e10',
    problem:
      'BuzzBeacon had 200 podcast pages with thin content and no search traffic. Ad revenue was flat.',
    strategy:
      'Rebuilt the editorial engine around host-led articles, schema-rich episode pages, and a programmatic long-tail net.',
    result:
      'Page-1 rankings for 1,400+ long-tail queries. Ad RPM up 38%. Three show launches hit top-50 in their category.',
    metrics: [
      { label: 'Page-1 rankings', value: '1,400+' },
      { label: 'Ad RPM', value: '+38%' },
      { label: 'Indexed pages', value: '94%' },
    ],
    duration: '7 months',
    placeholder: true,
  },
];

export const getCaseStudy = (slug: string) => caseStudies.find((c) => c.slug === slug);
