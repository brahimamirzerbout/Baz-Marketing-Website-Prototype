import Link from 'next/link';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Book a growth call',
  description: '20 minutes with a senior partner. We review your funnel, channels, and unit economics.',
  robots: { index: false, follow: false },
};

/**
 * /book is a friendly short URL.
 *
 * If a real booking URL is configured (Cal.com, TidyCal, etc.), redirect
 * straight to it. Otherwise render a "send us an email" page so the link
 * never 404s and never silently goes nowhere.
 */
export default function BookPage() {
  if (site.bookingUrl) {
    // Server-side redirect via meta refresh + link so it works even with JS off.
    return (
      <Section tone="paper" size="lg">
        <Eyebrow>Redirecting</Eyebrow>
        <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
          Taking you to the booking page…
        </h1>
        <p className="mt-6 text-ink-600">
          If you are not redirected,{' '}
          <a href={site.bookingUrl} className="underline">
            click here
          </a>
          .
        </p>
        <meta httpEquiv="refresh" content={`0; url=${site.bookingUrl}`} />
      </Section>
    );
  }

  return (
    <Section tone="paper" size="lg">
      <Eyebrow>Book a growth call</Eyebrow>
      <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
        Send us three time windows.
      </h1>
      <p className="mt-6 text-lg text-ink-600 max-w-xl">
        We don&rsquo;t use a scheduling tool yet — we reply personally to set up
        a 20-minute audit. Email us three windows that work in the next two
        weeks (Algiers / EU / US time zones) and we&rsquo;ll confirm one within
        one business day.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button href={site.bookOrMailto} variant="primary" size="lg">
          Email {site.email} →
        </Button>
        <Button href="/contact" variant="outline" size="lg">
          Or use the form
        </Button>
      </div>

      <p className="mt-12 text-sm text-ink-500">
        Prefer to type it out?{' '}
        <a href={`mailto:${site.email}`} className="underline">
          {site.email}
        </a>
      </p>

      <p className="mt-12 text-xs text-ink-400">
        <Link href="/" className="hover:text-ink-900 underline">
          ← Back to home
        </Link>
      </p>
    </Section>
  );
}
