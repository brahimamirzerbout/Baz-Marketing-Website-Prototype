import Link from 'next/link';
import type { Metadata } from 'next';
import { Section, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { tiers } from '@/content/pricing';
import { buildMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  title: 'Pricing',
  description:
    'Senior-led engagements. Three shapes: Core retainer, Growth stack, or Project. Fixed scope, transparent price ranges.',
  path: '/pricing',
});

function formatPrice(min: number, max: number): string {
  // Round to nearest $500 to keep numbers honest and simple
  const lo = Math.round(min / 500) * 500;
  const hi = Math.round(max / 500) * 500;
  return `$${lo.toLocaleString()}\u2013$${hi.toLocaleString()}`;
}

export default function PricingPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Pricing' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Pricing</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Three shapes. Senior team. No surprises.
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-ink-600 leading-relaxed max-w-3xl">
            Project-based or retainer. Pick the engagement that matches the
            work, not the work that matches the engagement.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid md:grid-cols-3 gap-4">
          {tiers.map((tier, i) => (
            <div
              key={tier.id}
              className={`reveal flex flex-col rounded-2xl p-7 md:p-8 border h-full ${
                tier.featured
                  ? 'border-ink-900 bg-ink-900 text-paper relative'
                  : 'border-ink-100 bg-paper-50 text-ink-900'
              }`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              {tier.featured && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent text-white text-[10px] font-mono uppercase tracking-[0.18em]">
                  Most chosen
                </span>
              )}

              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">
                  {tier.name}
                </h2>
                <span className={`font-mono text-[10px] uppercase tracking-[0.18em] ${tier.featured ? 'text-paper-300' : 'text-ink-500'}`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>

              <p className={`text-[15px] leading-relaxed ${tier.featured ? 'text-paper-300' : 'text-ink-600'}`}>
                {tier.tagline}
              </p>

              <div className={`mt-8 pb-6 border-b ${tier.featured ? 'border-paper/15' : 'border-ink-100'}`}>
                <p className={`font-display text-3xl md:text-4xl font-medium tracking-[-0.03em] ${tier.featured ? 'text-paper' : 'text-ink-900'}`}>
                  {formatPrice(tier.monthly.min, tier.monthly.max)}
                </p>
                <p className={`mt-1 text-xs font-mono uppercase tracking-[0.15em] ${tier.featured ? 'text-paper-300' : 'text-ink-500'}`}>
                  {tier.monthly.label}
                </p>
                <p className={`mt-3 text-xs ${tier.featured ? 'text-paper-300' : 'text-ink-500'}`}>
                  {tier.cadence}
                </p>
              </div>

              <p className={`mt-6 text-sm ${tier.featured ? 'text-paper-200' : 'text-ink-700'} leading-relaxed`}>
                {tier.description}
              </p>

              <div className="mt-6 flex-1">
                <p className={`text-[11px] font-mono uppercase tracking-[0.18em] mb-3 ${tier.featured ? 'text-paper-300' : 'text-ink-500'}`}>
                  What&apos;s included
                </p>
                <ul className="space-y-2.5">
                  {tier.includes.map((line) => (
                    <li
                      key={line}
                      className={`flex items-start gap-3 text-sm ${tier.featured ? 'text-paper' : 'text-ink-700'}`}
                    >
                      <span
                        aria-hidden
                        className={`shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full ${tier.featured ? 'bg-accent' : 'bg-success'}`}
                      />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className={`mt-6 pt-4 border-t ${tier.featured ? 'border-paper/15' : 'border-ink-100'}`}>
                <p className={`text-[11px] font-mono uppercase tracking-[0.18em] mb-2 ${tier.featured ? 'text-paper-300' : 'text-ink-500'}`}>
                  Best for
                </p>
                <ul className="space-y-1.5">
                  {tier.bestFor.map((b) => (
                    <li key={b} className={`text-sm ${tier.featured ? 'text-paper-200' : 'text-ink-600'}`}>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>

              <Link
                href={tier.cta === 'external' && tier.externalUrl ? tier.externalUrl : '/contact'}
                className={`mt-8 inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full font-medium transition-colors ${
                  tier.featured
                    ? 'bg-accent hover:bg-accent-600 text-white'
                    : 'bg-ink-900 hover:bg-ink-800 text-paper'
                }`}
              >
                {tier.id === 'project' ? 'Scope a project' : 'Book a call'}
                <span aria-hidden>→</span>
              </Link>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-ink-500 max-w-2xl mx-auto">
          Prices shown are USD monthly ranges. Final quote depends on scope,
          seniority mix, and engagement length. Book a call for a specific
          number — we don&apos;t do mystery pricing.
        </p>
      </Section>

      {/* FAQ / "what's not included" */}
      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>How we work</Eyebrow>
            <SectionHeading>What you can expect.</SectionHeading>
          </div>
          <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-2">No junior pods</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                The senior who pitches the work ships the work. You won&apos;t
                be handed off to a junior team after the contract is signed.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-2">Public roadmap per engagement</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                You see what&apos;s shipping next, this week. No status decks,
                no surprises.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-2">90-day reviews</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Every engagement has a checkpoint. We tell you honestly if
                the work is paying off — and when it isn&apos;t.
              </p>
            </div>
            <div>
              <h3 className="font-display text-lg font-medium tracking-[-0.02em] mb-2">No long contracts</h3>
              <p className="text-sm text-ink-600 leading-relaxed">
                Retainers are quarterly. We don&apos;t ask for annual commitments
                because we don&apos;t need to.
              </p>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd([
          breadcrumbLd([
            { name: 'Home', url: '/' },
            { name: 'Pricing', url: '/pricing' },
          ]),
        ])}
      />
    </>
  );
}