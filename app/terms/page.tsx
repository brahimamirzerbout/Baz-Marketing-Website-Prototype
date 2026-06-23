import { Section, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Terms of Service',
  description: 'The terms governing your use of BAZ marketing services and this site.',
  path: '/terms',
});

export default function TermsPage() {
  return (
    <Section tone="paper" size="lg">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Terms' }]} />
      <div className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">Terms of Service</h1>
        <p className="mt-4 text-ink-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="mt-12 space-y-10 text-[15px] leading-[1.75] text-ink-700">
          <SubSection title="1. Acceptance">
            <p>By using {site.url} you agree to these terms. If you do not agree, do not use the site.</p>
          </SubSection>

          <SubSection title="2. Services">
            <p>Marketing services are governed by a separate Master Services Agreement signed at engagement. This site is informational.</p>
          </SubSection>

          <SubSection title="3. Intellectual property">
            <p>All content on this site is owned by BAZ or its licensors. You may not reproduce it commercially without written permission.</p>
          </SubSection>

          <SubSection title="4. Disclaimers">
            <p>Case studies include placeholder results where real client outcomes are not public. Real metrics are added before launch with client permission. No content on this site constitutes legal, financial, or professional advice.</p>
          </SubSection>

          <SubSection title="5. Limitation of liability">
            <p>To the maximum extent permitted by law, BAZ is not liable for any indirect or consequential damages arising from your use of this site.</p>
          </SubSection>

          <SubSection title="6. Governing law">
            <p>These terms are governed by the laws of the State of New York, USA, without regard to conflict-of-law principles.</p>
          </SubSection>

          <SubSection title="7. Contact">
            <p>For questions about these terms, write to <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.</p>
          </SubSection>
        </div>
      </div>
    </Section>
  );
}

function SubSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em] mb-4">{title}</h2>
      {children}
    </section>
  );
}
