import Link from 'next/link';
import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { services } from '@/content/services';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Services',
  description: 'Nine senior-team services across owned, earned, paid, and data channels — strategy, execution, and reporting in one system.',
  path: '/services',
});

const pillars = [
  { id: 'owned', name: 'Owned', desc: 'Website, content, social, listings.' },
  { id: 'earned', name: 'Earned', desc: 'SEO, authority, citations.' },
  { id: 'paid', name: 'Paid', desc: 'Search, social, programmatic.' },
  { id: 'data', name: 'Data', desc: 'Tracking, attribution, reporting.' },
];

export default function ServicesIndexPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Services' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Services</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Nine services. One senior team.
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-ink-600 leading-relaxed max-w-3xl">
            Strategy, execution, and reporting in one tightly integrated system. Pick a single
            service or engage BAZ across the full growth stack.
          </p>
        </div>
      </Section>

      {pillars.map((p) => {
        const list = services.filter((s) => s.pillar === p.id || (p.id === 'owned' && s.pillar === 'platform'));
        if (list.length === 0) return null;
        return (
          <section key={p.id} id={p.id} className="py-12 md:py-16 bg-white border-t border-ink-100">
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

      <CtaBanner />
    </>
  );
}
