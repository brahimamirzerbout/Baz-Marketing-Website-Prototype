import Link from 'next/link';
import { Section, Eyebrow } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export const metadata = {
  title: 'Page not found',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section tone="paper" size="xl">
      <div className="max-w-2xl">
        <Eyebrow>404</Eyebrow>
        <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
          We can&apos;t find that page.
        </h1>
        <p className="mt-6 text-lg text-ink-600">
          The link may be old, or we may have moved the page. Try the navigation above, or
          book a call if you were looking for something specific.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={site.bookingUrl} external variant="secondary" size="lg" trackAs="404_book_call">
            Book a growth call →
          </Button>
          <Button href="/contact" variant="outline" size="lg" trackAs="404_contact">
            Tell us what you were looking for
          </Button>
          <Button href="/" variant="ghost" size="lg" trackAs="404_home">
            Back to home
          </Button>
        </div>
        <p className="mt-12 text-sm text-ink-500">
          Or write us at <a href={`mailto:${site.email}`} className="underline">{site.email}</a>.
        </p>
      </div>
    </Section>
  );
}
