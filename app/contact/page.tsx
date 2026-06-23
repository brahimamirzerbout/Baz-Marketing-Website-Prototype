import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ContactForm } from '@/components/marketing/ContactForm';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { buildMetadata, jsonLd, professionalServiceLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Tell us what you\'re working on. We respond within one business day. No sales-floor runaround.',
  path: '/contact',
});

export default function ContactPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
              Tell us what you&apos;re working on.
            </h1>
            <SectionLede>
              We respond within one business day. The partner who reads your brief is the
              partner who&apos;ll be on the call.
            </SectionLede>

            <div className="mt-10 space-y-6">
              <div>
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">Email</p>
                <a href={`mailto:${site.email}`} className="font-display text-xl tracking-[-0.02em] hover:text-accent transition-colors">{site.email}</a>
              </div>
              <div>
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">Phone</p>
                <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="font-display text-xl tracking-[-0.02em] hover:text-accent transition-colors">{site.phone}</a>
              </div>
              <div>
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">Or skip the form</p>
                <Button href={site.bookingUrl} external variant="secondary" size="md" trackAs="contact_book_call">
                  Book a growth call →
                </Button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm source="contact_page" />
          </div>
        </div>
      </Section>

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(professionalServiceLd())} />
    </>
  );
}
