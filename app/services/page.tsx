import Link from 'next/link';
import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { StickyCta } from '@/components/sections/StickyCta';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { services } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services — outcomes, not channels',
  description:
    'BAZ delivers five business outcomes — pipeline, lower CAC, brand that compounds, attribution you trust, and a platform you own. Eighteen services under the hood.',
  path: '/services',
});

const pillars = [
  { id: 'owned', name: 'Owned', desc: 'Website, content, social, brand, lifecycle.' },
  { id: 'earned', name: 'Earned', desc: 'SEO, authority, citations, PR, creators.' },
  { id: 'paid', name: 'Paid', desc: 'Search, social, programmatic, partnerships.' },
  { id: 'data', name: 'Data', desc: 'Tracking, attribution, CRO, research.' },
  { id: 'platform', name: 'Platform', desc: 'CRM, MOPS, and global market entry.' },
];

const outcomes = [
  {
    title: 'More pipeline',
    summary: 'Net-new qualified opportunities in your CRM, attributed to source.',
    metric: '$200K+ pipeline / 90 days',
    services: ['Performance Marketing', 'SEO & Organic Growth', 'Content & Editorial Engine', 'ABM', 'Lead Magnets & CRO'],
  },
  {
    title: 'Lower CAC',
    summary: 'Bring the cost of acquiring a customer down without breaking the funnel.',
    metric: '↓ 30–60% in two quarters',
    services: ['Conversion Rate Optimization', 'Creative Production & UGC', 'Lifecycle & Retention', 'Landing Pages', 'Analytics & Attribution'],
  },
  {
    title: 'Brand that compounds',
    summary: 'A brand that\'s recognizable, retrievable, and worth a premium.',
    metric: 'Branded search +3× / 12 mo',
    services: ['Brand Strategy', 'Creative Direction', 'Influencer & Creator Programs', 'PR & Authority', 'Editorial Engine'],
  },
  {
    title: 'Attribution you trust',
    summary: 'See exactly which channel closed the deal. No spreadsheets, no guessing.',
    metric: 'Server-side, 99% event fidelity',
    services: ['Analytics & Attribution', 'Tracking & Consent', 'CRM & Lifecycle', 'Reporting Dashboards', 'Marketing Mix Modeling'],
  },
  {
    title: 'A platform you own',
    summary: 'Your data, your tooling, your Hub. Not a deck, not a vendor lock-in.',
    metric: 'Source code transferred on exit',
    services: ['CRM & Marketing Ops', 'Marketing Hub Build', 'Internationalization', 'Tooling & Integrations', 'Team Enablement'],
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Outcomes, not channels</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            What changes for your business.
          </h1>
          <SectionLede>
            Agencies sell services. You buy outcomes. Five business outcomes we deliver,
            with the eighteen services underneath them that make them happen.
          </SectionLede>
        </div>
      </Section>

      {/* OUTCOMES — what you actually buy */}
      <Section tone="paper" size="lg">
        <div className="space-y-4">
          {outcomes.map((o, i) => (
            <div key={o.title} className="grid md:grid-cols-12 gap-6 items-start border-t border-ink-100 pt-6">
              <div className="md:col-span-1">
                <div className="font-display text-4xl font-medium tracking-[-0.03em] text-accent">
                  0{i + 1}
                </div>
              </div>
              <div className="md:col-span-4">
                <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">{o.title}</h2>
                <p className="mt-2 text-ink-600 leading-relaxed">{o.summary}</p>
                <div className="mt-3 inline-block text-sm font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                  {o.metric}
                </div>
              </div>
              <div className="md:col-span-7">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500 mb-2">
                  Services that deliver it
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {o.services.map((s) => (
                    <span
                      key={s}
                      className="inline-block text-xs px-2.5 py-1 rounded-full bg-paper-300 text-ink-700 border border-ink-100"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* PILLARS — implementation grouping, not the main message */}
      <Section tone="paper" size="md">
        <div className="max-w-3xl mb-10">
          <Eyebrow>By channel</Eyebrow>
          <SectionHeading>The eighteen services, grouped by where they live.</SectionHeading>
          <p className="mt-3 text-ink-600">
            Most clients engage BAZ across all five outcomes. The implementation lives
            across five traditional pillars. Skip to the one you care about.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-3">
          {pillars.map((p) => {
            const list = services.filter((s) => s.pillar === p.id);
            return (
              <a
                key={p.id}
                href={`#${p.id}`}
                className="block p-4 rounded-2xl border border-ink-100 hover:border-accent transition-colors"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-500">
                  {p.name}
                </div>
                <div className="font-display text-lg font-medium tracking-[-0.02em] mt-1">
                  {p.name}
                </div>
                <p className="text-xs text-ink-600 mt-1">{p.desc}</p>
                <div className="mt-3 text-xs text-ink-500">{list.length} services →</div>
              </a>
            );
          })}
        </div>
      </Section>

      {/* Original pillar detail sections, de-emphasized */}
      {pillars.map((p) => {
        const list = services.filter((s) => s.pillar === p.id);
        if (list.length === 0) return null;
        return (
          <section key={p.id} id={p.id} className="py-12 md:py-16 bg-paper-50 border-t border-ink-100 scroll-mt-24">
            <div className="container mx-auto">
              <div className="flex items-end justify-between flex-wrap gap-6 mb-10">
                <div>
                  <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-3">
                    {p.name} channel
                  </p>
                  <h2 className="font-display text-display-md font-medium tracking-[-0.02em]">
                    {p.desc}
                  </h2>
                </div>
                <Link href="/contact" className="text-sm font-medium hover:text-accent transition-colors">
                  Discuss {p.name.toLowerCase()} →
                </Link>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {list.map((s, i) => (
                  <ServiceCard key={s.slug} service={s} index={i} />
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <CtaBanner serviceSlug="outcomes" serviceName="outcomes" />
      <StickyCta />
    </>
  );
}