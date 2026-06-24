import Link from 'next/link';
import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

/**
 * Performance Marketing feature strip — a deeper-than-the-grid showcase of
 * the workhorse service. Sits between Hero and PillarGrid on the homepage.
 *
 * Three columns:
 *   1. Headline + KPIs (spend managed, ROAS lift, creative variants)
 *   2. "How a real engagement looks" — 4-step animated funnel
 *   3. 3 proof case studies (linked, with metric chips)
 *
 * Designed to convert the click from the hero "see services" CTA into a
 * /services/performance-marketing visit by giving just enough detail.
 */
export function PerformanceFeature() {
  return (
    <Section tone="paper" size="lg" id="performance-marketing-feature">
      <div className="grid lg:grid-cols-12 gap-10 mb-12">
        <div className="lg:col-span-7">
          <Badge variant="warning" className="mb-5">02 · Featured service</Badge>
          <SectionHeading>Performance Marketing that compounds.</SectionHeading>
          <SectionLede>
            Paid search, paid social, programmatic, and connected TV — built on
            clean tracking, real attribution, and creative that converts. We
            treat ad spend as a portfolio, not a slot machine.
          </SectionLede>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button href="/services/performance-marketing" variant="primary" size="lg" trackAs="perf_feature_primary">
              See the full offer →
            </Button>
            <Button href="/contact?service=performance-marketing" variant="outline" size="lg" trackAs="perf_feature_audit">
              Get a paid audit
            </Button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="grid grid-cols-3 gap-4">
            <KpiBlock value="$24M+" label="Spend managed" sub="Across DTC, B2B, fintech" />
            <KpiBlock value="+62%" label="Avg ROAS lift" sub="Median across 40+ engagements" />
            <KpiBlock value="40+" label="Creative variants / mo" sub="Per active channel" />
          </div>
        </div>
      </div>

      {/* The funnel — what a real engagement looks like */}
      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Eyebrow>How a real engagement looks</Eyebrow>
          <h3 className="font-display text-3xl md:text-4xl font-medium tracking-[-0.02em] mt-3 leading-tight">
            From tracking gaps to scale in 12 weeks.
          </h3>
          <p className="mt-4 text-ink-600 max-w-md leading-relaxed">
            Every Performance Marketing engagement follows the same 5-phase loop.
            The shape is repeatable; the work is bespoke to your funnel, your
            creative, and your unit economics.
          </p>
        </div>

        <div className="lg:col-span-7">
          <ol className="space-y-3">
            <FunnelStep
              week="Week 1–2"
              title="Tracking & attribution audit"
              detail="Server-side pixels, conversion API, GA4 dedup, MMM-ready events."
              metric="+34% tracking accuracy"
            />
            <FunnelStep
              week="Week 3–4"
              title="Creative matrix + channel mix"
              detail="40+ creative variants / mo across the top 3 channels by stage."
              metric="5× creative throughput"
            />
            <FunnelStep
              week="Week 5–8"
              title="Weekly iteration loops"
              detail="Every Monday: read the data, kill losers, scale winners, brief next batch."
              metric="−18% CPA per week"
            />
            <FunnelStep
              week="Week 9–12"
              title="Incrementality testing"
              detail="Geo holdouts, ghost ads, and MMM to prove the lift isn't platform-inflated."
              metric="+62% real ROAS"
            />
          </ol>
        </div>
      </div>

      {/* Proof strip */}
      <div className="mt-16 pt-10 border-t border-ink-100">
        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-6">
          <Eyebrow>Selected outcomes</Eyebrow>
          <Link href="/case-studies" className="text-sm font-medium text-ink-900 hover:text-accent transition-colors">
            All case studies →
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ProofCard
            href="/case-studies/viralvista-growth-engine"
            client="ViralVista"
            industry="DTC Beauty"
            metric="ROAS 1.8 → 4.6"
            detail="Rebuilt the creative matrix around UGC creators and layered search to capture branded demand."
          />
          <ProofCard
            href="/case-studies/lumenwear-influencer-engine"
            client="Lumenwear"
            industry="DTC Apparel"
            metric="ROAS 2.1 → 5.4"
            detail="Tiered creator program + whitelisting on Meta and TikTok, fed by an always-on paid engine."
          />
          <ProofCard
            href="/case-studies/soukly-marketplace-affiliate"
            client="Soukly"
            industry="Marketplace"
            metric="Supply CAC ↓ 63%"
            detail="Switched the supply acquisition to a referral-led motion; paid only kept for demand-side retargeting."
          />
        </div>
      </div>
    </Section>
  );
}

function KpiBlock({ value, label, sub }: { value: string; label: string; sub: string }) {
  return (
    <div className="bg-paper rounded-2xl border border-ink-100 p-5">
      <p className="font-display text-3xl md:text-4xl font-medium tracking-[-0.03em] text-ink-900">
        {value}
      </p>
      <p className="mt-2 font-mono uppercase tracking-[0.18em] text-[10px] text-ink-400">
        {label}
      </p>
      <p className="mt-1 text-xs text-ink-500 leading-snug">{sub}</p>
    </div>
  );
}

function FunnelStep({
  week,
  title,
  detail,
  metric,
}: {
  week: string;
  title: string;
  detail: string;
  metric: string;
}) {
  return (
    <li className="bg-paper rounded-2xl border border-ink-100 p-5 md:p-6 flex flex-wrap items-start gap-4 md:gap-6 hover:border-ink-900 transition-colors">
      <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent min-w-[80px]">
        {week}
      </span>
      <div className="flex-1 min-w-[200px]">
        <h4 className="font-display text-lg md:text-xl font-medium tracking-[-0.02em]">
          {title}
        </h4>
        <p className="mt-1 text-sm text-ink-600 leading-relaxed">{detail}</p>
      </div>
      <span className="font-display text-base md:text-lg font-medium text-accent-700 whitespace-nowrap">
        {metric}
      </span>
    </li>
  );
}

function ProofCard({
  href,
  client,
  industry,
  metric,
  detail,
}: {
  href: string;
  client: string;
  industry: string;
  metric: string;
  detail: string;
}) {
  return (
    <Link
      href={href}
      className="block bg-paper rounded-2xl border border-ink-100 p-5 md:p-6 hover:border-ink-900 hover:-translate-y-0.5 hover:shadow-lift transition-all duration-200"
    >
      <div className="flex items-baseline justify-between mb-3">
        <div>
          <p className="font-display text-lg font-medium tracking-[-0.02em]">{client}</p>
          <p className="text-xs text-ink-400 mt-0.5">{industry}</p>
        </div>
        <p className="font-display text-2xl md:text-3xl font-medium tracking-[-0.03em] text-accent">
          {metric}
        </p>
      </div>
      <p className="text-sm text-ink-600 leading-relaxed">{detail}</p>
      <p className="mt-3 text-xs font-medium text-ink-900 group-hover:text-accent">
        Read case →
      </p>
    </Link>
  );
}
