import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { IndustryCard } from '@/components/marketing/IndustryCard';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { industries } from '@/content/industries';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Industries',
  description: 'Senior-team growth for DTC, B2B SaaS, FinTech, hospitality, AI/DevTools, and professional services. Industry-specific playbooks.',
  path: '/industries',
});

export default function IndustriesIndexPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Industries' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Industries</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Industry playbooks, not generic playbooks.
          </h1>
          <SectionLede>
            The senior team has shipped growth across DTC, B2B SaaS, FinTech, hospitality, AI
            tools, and professional services. Each industry has different unit economics,
            different channels, different buyers.
          </SectionLede>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {industries.map((i, idx) => (
            <IndustryCard key={i.slug} industry={i} index={idx} />
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
