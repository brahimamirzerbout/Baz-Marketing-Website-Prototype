import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { StickyCta } from '@/components/sections/StickyCta';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { buildMetadata } from '@/lib/seo';
import { CaseStudiesBrowser } from './CaseStudiesBrowser';

export async function generateMetadata() {
  return buildMetadata({
    title: 'BAZ case studies',
    description:
      'BAZ case studies across DTC, B2B SaaS, FinTech, hospitality, marketplaces, AI tools, and media. Real metrics. Named clients. Honest outcomes. Filter by your industry.',
    path: '/case-studies',
    image: '/case-studies-og?title=BAZ%20case%20studies&subtitle=Work%20that%20moved%20the%20P%26L.',
  });
}

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
        <CaseStudiesBrowser />
      </Section>

      <CtaBanner />
      <StickyCta />
    </>
  );
}