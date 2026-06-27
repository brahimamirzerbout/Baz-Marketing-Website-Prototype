import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { StatRow } from '@/components/sections/StatRow';
import { TeamGrid } from '@/components/marketing/TeamGrid';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { Button } from '@/components/ui/Button';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'About',
  description: 'BAZ is a senior-only growth partner. The people who pitch are the people who ship. Based in Algiers. Working with clients in MENA, EU, and the US.',
  path: '/about',
});

const beliefs = [
  { t: 'Senior team, no juniors', d: 'The people who plan your growth are the people who ship it.' },
  { t: 'Strategy is documented', d: 'A 90-day plan with owners, budgets, and exit criteria. Not a deck.' },
  { t: 'Measurement is the moat', d: 'Server-side tracking, attribution, and dashboards execs actually open.' },
  { t: 'Speed is a feature', d: 'Markets don\'t wait. We ship in weeks, not quarters.' },
  { t: 'Revenue is sanity', d: 'Followers are vanity. We optimize for revenue, signups, and pipeline.' },
  { t: 'Brand compounds', d: 'Identity, voice, and design tied to the metric each piece owns.' },
];

export default function AboutPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
        <div className="max-w-4xl">
          <Eyebrow>About BAZ</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            The boutique growth partner for ambitious brands.
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-ink-600 leading-relaxed max-w-3xl">
            BAZ was founded on a simple bet: that a small, senior-only team can outperform a
            generalist agency pod — if it ships strategy, execution, and measurement as one
            tightly integrated system.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button href={site.bookOrMailto} external variant="secondary" size="lg" trackAs="about_book_call">
              Book a growth call →
            </Button>
            <Button href="/case-studies" variant="outline" size="lg" trackAs="about_case_studies">
              See case studies
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white" size="md">
        {(() => {
          const items: { value: string; label: string; sub: string }[] = [
            { value: site.stats.brandsScaled ?? '', label: 'Brands scaled', sub: 'MENA · EU · US' },
            { value: site.stats.teamSize ?? '', label: 'Senior partners', sub: 'No junior pods' },
          ].filter((it) => it.value !== '');
          if (items.length === 0) return null;
          return <StatRow items={items} />;
        })()}
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>What we believe</Eyebrow>
            <SectionHeading>Six principles, every engagement.</SectionHeading>
            <SectionLede>
              We don&apos;t have a proprietary framework with an acronym. We have six principles
              that shape what we ship and what we cut.
            </SectionLede>
          </div>
        </div>
        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
          {beliefs.map((b, i) => (
            <li key={b.t} className="reveal bg-paper-50 p-6 md:p-7" style={{ animationDelay: `${i * 60}ms` }}>
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent mb-4">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em]">{b.t}</h3>
              <p className="mt-3 text-ink-600 leading-relaxed">{b.d}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>The team</Eyebrow>
            <SectionHeading>Senior partners. No pod layers.</SectionHeading>
            <SectionLede>
              The people who plan your engagement are the people doing the work. Every partner
              is hands-on and accountable.
            </SectionLede>
            <p className="mt-4 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-warning/10 text-ink-900 text-xs font-medium border border-warning/30">
              <span aria-hidden>·</span>
              Sample team — replace with real partner bios before launch.
            </p>
          </div>
        </div>
        <TeamGrid />
      </Section>

      <CtaBanner />
    </>
  );
}
