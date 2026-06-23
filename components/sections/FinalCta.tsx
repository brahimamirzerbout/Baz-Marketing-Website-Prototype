import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function FinalCta() {
  return (
    <section className="relative bg-ink-900 text-paper overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(circle_at_70%_50%,black,transparent_70%)]" />
      <div className="container mx-auto relative py-20 md:py-32">
        <div className="grid lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-7">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-6">
              <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 align-middle animate-pulse-dot" />
              Booking Q3 · 2 senior partner slots open
            </p>
            <h2 className="font-display text-display-xl font-medium tracking-[-0.035em] leading-[1.0] text-paper">
              Ready to make growth <em className="not-italic text-accent">predictable?</em>
            </h2>
            <p className="mt-6 text-lg md:text-xl text-paper-300 max-w-2xl">
              Book a 30-minute call. We'll review your funnel, channels, and unit economics —
              and tell you honestly whether BAZ is the right fit.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <Button href={site.bookingUrl} external variant="secondary" size="lg" trackAs="final_book_call">
              Book a growth call
              <span aria-hidden>→</span>
            </Button>
            <Button href="/contact" variant="outline" size="lg" trackAs="final_contact" className="border-paper/30 text-paper hover:bg-paper hover:text-ink-900">
              Request an audit
            </Button>
            <p className="text-sm text-paper-400 lg:text-right max-w-xs lg:ml-auto">
              Or call us: <a href={`tel:${site.phone.replace(/[^\d+]/g, '')}`} className="underline">{site.phone}</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
