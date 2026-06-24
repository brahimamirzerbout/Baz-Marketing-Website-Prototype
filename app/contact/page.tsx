import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { ContactForm } from '@/components/marketing/ContactForm';
import { ContactAnalytics } from '@/components/marketing/ContactAnalytics';
import { Button } from '@/components/ui/Button';
import { Faq } from '@/components/marketing/Faq';
import { site } from '@/lib/site';
import { buildMetadata, jsonLd, professionalServiceLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Contact',
  description: 'Tell us what you\'re working on. A senior partner reads every brief and replies within one business day.',
  path: '/contact',
});

const faqItems = [
  {
    q: 'Who actually reads my brief?',
    a: 'A senior partner — the same person who would be on the call with you. We don\'t have a sales floor, and we don\'t pass briefs to juniors.',
  },
  {
    q: 'How fast will I hear back?',
    a: 'Within one business day. If you write us on a Friday, expect a reply by Monday evening (Algiers / EU / US time zones).',
  },
  {
    q: 'What should I include in the message?',
    a: 'A few sentences about your current growth, what you\'ve already tried, and what you\'d like to change in the next 90 days. If you have a deck or a number you\'re trying to move, mention it.',
  },
  {
    q: 'Is this a sales call?',
    a: 'No. It\'s a 20-minute audit of your current growth channel. If we\'re not the right fit, we\'ll tell you in the first 10 minutes and refer you to someone who is.',
  },
  {
    q: 'Where are you based?',
    a: 'Algiers, with senior partners across the EU and US. We work async across time zones and reply in English, French, or Arabic.',
  },
];

export default function ContactPage({ searchParams }: { searchParams?: { service?: string } }) {
  const hasPhone = Boolean(site.phone);
  const hasBooking = Boolean(site.bookOrMailto);

  // If the user arrived from a service page, the URL carries the service
  // context so we can attribute the lead and pre-select intent on the form.
  const requestedService = (searchParams?.service ?? '').trim().slice(0, 96);

  return (
    <>
      <ContactAnalytics service={requestedService || undefined} />
      <Section tone="paper" size="lg">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          ...(requestedService
            ? [{ label: 'Services', href: '/services' }, { label: requestedService, href: `/services/${requestedService}` }]
            : []),
          { label: 'Contact' },
        ]} />
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
              Tell us what you&apos;re working on.
            </h1>
            {requestedService ? (
              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-accent-soft border border-accent/20 px-3 py-1.5 text-sm">
                <span className="font-mono uppercase tracking-[0.18em] text-[10px] text-accent">In reference to</span>
                <span className="font-medium text-accent-700">{requestedService.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</span>
                <a href="/contact" className="text-ink-500 hover:text-ink-900 ml-1" aria-label="Clear service context">×</a>
              </div>
            ) : null}
            <SectionLede>
              A senior partner reads every brief and replies within one
              business day. No sales-floor runaround.
            </SectionLede>

            <div className="mt-10 space-y-6">
              <div>
                <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${site.email}`}
                  className="font-display text-xl tracking-[-0.02em] hover:text-accent transition-colors"
                >
                  {site.email}
                </a>
              </div>

              {hasPhone ? (
                <div>
                  <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">
                    Phone
                  </p>
                  <a
                    href={`tel:${site.phone!.replace(/[^\d+]/g, '')}`}
                    className="font-display text-xl tracking-[-0.02em] hover:text-accent transition-colors"
                  >
                    {site.phone}
                  </a>
                </div>
              ) : null}

              {hasBooking ? (
                <div>
                  <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400 mb-2">
                    Or skip the form
                  </p>
                  <Button
                    href={site.bookOrMailto}
                    external
                    variant="secondary"
                    size="md"
                    trackAs="contact_book_call"
                  >
                    Book a growth call →
                  </Button>
                </div>
              ) : null}

              <div className="pt-6 mt-6 border-t border-ink-100">
                <p className="text-sm text-ink-500 leading-relaxed">
                  Based in Algiers. Working with clients in MENA, the EU, and the US.
                  Async-friendly. Replies in English, French, or Arabic.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ContactForm source="contact_page" service={requestedService || undefined} />
          </div>
        </div>
      </Section>

      <Section tone="paper" size="md">
        <div className="max-w-3xl">
          <Eyebrow>FAQ</Eyebrow>
          <SectionHeading>What people ask before they write.</SectionHeading>
          <div className="mt-8">
            <Faq items={faqItems} />
          </div>
        </div>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(professionalServiceLd())}
      />
    </>
  );
}
