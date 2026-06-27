import type { PricingTier } from '@/types';

/**
 * BAZ engagement tiers — project-based pricing, not SaaS subscriptions.
 * Each tier is a senior-led engagement with a clear scope, deliverable
 * shape, and indicative price range. Prices are USD, monthly retainer.
 *
 * Source-of-truth: derived from legacy `baz-legacy-v6/api/stripe.js` plans
 * (June 22, 2026) and adapted for BAZ's boutique project model.
 *
 * When `featured: true`, the tier is highlighted in the Pricing page.
 * When `cta: 'contact'`, the button links to /contact.
 * When `cta: 'external'`, the button opens the `externalUrl`.
 */
export const tiers: PricingTier[] = [
  {
    id: 'retainer-core',
    name: 'Core',
    tagline: 'One channel, end-to-end.',
    description:
      'A single senior partner ships one BAZ service for your team on a monthly retainer. Most useful when you know exactly which channel to grow.',
    monthly: { min: 6500, max: 9500, label: 'per month' },
    cadence: 'Monthly retainer · 90-day minimum',
    bestFor: ['Startups at $2M–$10M ARR', 'Founders scaling past DIY', 'Single-channel focus'],
    includes: [
      'One senior partner (no junior pods)',
      'Monthly strategy review',
      'Weekly async updates',
      'Direct Slack channel',
      'Public roadmap per engagement',
    ],
    deliverables: '1 flagship deliverable per month (campaign, content set, site section, or report)',
    cta: 'contact',
    featured: false,
  },
  {
    id: 'retainer-growth',
    name: 'Growth',
    tagline: 'Full growth stack, one senior team.',
    description:
      'Three to five senior partners running an integrated system across your highest-leverage channels. The default engagement for ambitious $5M+ teams.',
    monthly: { min: 18000, max: 28000, label: 'per month' },
    cadence: 'Quarterly · renewable',
    bestFor: ['$5M–$50M ARR companies', 'CMOs rebuilding the marketing org', 'Multi-channel coordination'],
    includes: [
      '3–5 senior partners (no juniors)',
      'Quarterly strategy sprint',
      'Weekly demo, not weekly status',
      'Embedded reviews with leadership',
      'Looker / GA4 dashboards',
      'Cross-channel attribution model',
    ],
    deliverables: 'Quarterly roadmap with 3 flagship deliverables per quarter',
    cta: 'contact',
    featured: true,
  },
  {
    id: 'project',
    name: 'Project',
    tagline: 'A scoped engagement with a clear finish line.',
    description:
      'Fixed-scope projects: a rebrand, a website rebuild, a launch campaign, an audit, a 90-day growth sprint. Senior team, defined deliverables, no retainer.',
    monthly: { min: 12000, max: 80000, label: 'fixed fee' },
    cadence: '4–14 weeks · fixed scope',
    bestFor: ['Specific outcomes with a deadline', 'Rebrand / site rebuild / launch', 'Diagnostic audits'],
    includes: [
      'Senior-led kickoff and brief',
      'Defined deliverable list (locked)',
      'Weekly demos',
      'Public per-engagement roadmap',
      'Hand-off and enablement at end',
    ],
    deliverables: 'Locked scope, shipped in writing, with hand-off documentation',
    cta: 'contact',
    featured: false,
  },
];

export const getTier = (id: string) => tiers.find((t) => t.id === id);