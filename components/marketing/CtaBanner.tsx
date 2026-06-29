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

            {/* Reassurance row — the "we respond in 24h" pattern from Apexure's CRO breakdown */}
            <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-paper-300">
              <li className="flex items-center gap-2">
                <Check />
                <span>Reply within <span className="text-paper font-medium">24 hours</span></span>
              </li>
              <li className="flex items-center gap-2">
                <Check />
                <span><span className="text-paper font-medium">Free</span> initial consult, no obligation</span>
              </li>
              <li className="flex items-center gap-2">
                <Check />
                <span><span className="text-paper font-medium">Confidential</span> — NDA on request</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Button href={site.bookOrMailto} external variant="secondary" size="lg" trackAs="banner_book_call">
              Book a growth call →
            </Button>
            <Button href={auditHref} variant="outline" size="lg" trackAs="banner_audit" className="border-paper/30 text-paper hover:bg-paper hover:text-ink-900">
              {ctaLabel}
            </Button>
            <p className="text-[11px] font-mono uppercase tracking-wider text-paper-400 mt-1 text-center">
              Mon–Fri · 9–18 GMT · reply &lt; 24h
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="text-accent flex-shrink-0">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}