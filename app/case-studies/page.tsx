import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { CaseStudyCard } from '@/components/marketing/CaseStudyCard';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { caseStudies } from '@/content/case-studies';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Case studies',
  description: 'Senior-team case studies across DTC, B2B SaaS, FinTech, hospitality, and AI tools. Real metrics. Named clients. Honest outcomes.',
  path: '/case-studies',
});

export default function CaseStudiesIndexPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Case studies' }]} />
        <div className="max-w-4xl">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Work that moved the P&amp;L.
          </h1>
          <SectionLede>
            Senior team. Documented strategy. Measured outcomes. Read the cases — every metric
            is named, and where it&apos;s not yet public, it&apos;s labeled.
          </SectionLede>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {caseStudies.map((c, i) => (
            <CaseStudyCard key={c.slug} caseStudy={c} index={i} />
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
