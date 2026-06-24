import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function CtaBanner({ serviceSlug, serviceName }: { serviceSlug?: string; serviceName?: string } = {}) {
  const auditHref = serviceSlug ? `/contact?service=${encodeURIComponent(serviceSlug)}` : '/contact';
  const ctaLabel = serviceName ? `Get a ${serviceName} proposal` : 'Request an audit';
  return (
    <section className="bg-ink-900 text-paper">
      <div className="container mx-auto py-16 md:py-20">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-4">
              Booking Q3 · 2 senior partner slots open
            </p>
            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] text-paper">
              Want a second opinion on your growth plan?
            </h2>
            <p className="mt-4 text-lg text-paper-300 max-w-2xl">
              30 minutes with a senior partner. We&apos;ll review your funnel, channels, and unit economics —
              and tell you honestly whether BAZ is the right fit.
            </p>
          </div>
          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button href={site.bookOrMailto} external variant="secondary" size="lg" trackAs="banner_book_call">
              Book a growth call →
            </Button>
            <Button href={auditHref} variant="outline" size="lg" trackAs="banner_audit" className="border-paper/30 text-paper hover:bg-paper hover:text-ink-900">
              {ctaLabel}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
