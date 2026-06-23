import { Section as UiSection, Eyebrow } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { buildMetadata } from '@/lib/seo';
import { site } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Privacy Policy',
  description: 'How BAZ collects, uses, and protects your information.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <UiSection tone="paper" size="lg">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Privacy' }]} />
      <div className="max-w-3xl">
        <Eyebrow>Legal</Eyebrow>
        <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">Privacy Policy</h1>
        <p className="mt-4 text-ink-500 text-sm">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>

        <div className="mt-12 space-y-10 text-[15px] leading-[1.75] text-ink-700">
          <SubSection title="1. Who we are">
            <p>BAZ Marketing Agency (&ldquo;BAZ&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) operates {site.url}. For any privacy question, write to <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.</p>
          </SubSection>

          <SubSection title="2. What we collect">
            <p>We collect only what we need to do business with you:</p>
            <ul className="list-disc pl-6 mt-3 space-y-1.5">
              <li>Information you provide on forms (name, email, company, project details).</li>
              <li>First-party analytics (page views, CTA clicks) via Google Analytics 4, if you have accepted cookies.</li>
              <li>Email and calendar metadata when you book a call.</li>
            </ul>
          </SubSection>

          <SubSection title="3. How we use it">
            <p>We use this information to respond to your inquiry, deliver the services you engage us for, and improve our site. We do not sell your data, ever.</p>
          </SubSection>

          <SubSection title="4. Cookies">
            <p>We use a single first-party cookie for analytics, and we surface a cookie banner so you can opt out. You can also clear cookies in your browser at any time.</p>
          </SubSection>

          <SubSection title="5. Your rights">
            <p>You can request access, correction, or deletion of your data at any time. Email <a href={`mailto:${site.email}`} className="underline">{site.email}</a> and we will respond within 30 days.</p>
          </SubSection>

          <SubSection title="6. Updates to this policy">
            <p>We will post any changes here with an updated &ldquo;Last updated&rdquo; date. Material changes will be highlighted on the homepage for 30 days.</p>
          </SubSection>
        </div>
      </div>
    </UiSection>
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
