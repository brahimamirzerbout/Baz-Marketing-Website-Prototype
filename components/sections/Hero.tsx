import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper">
      {/* Decorative grid */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="container mx-auto relative pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-5xl">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-6 reveal">
            <span className="inline-block w-2 h-2 bg-accent rounded-full mr-2 align-middle animate-pulse-dot" />
            Now booking Q3 — 2 spots left
          </p>

          <h1 className="font-display text-display-2xl font-medium text-ink-900 reveal">
            Make growth <em className="not-italic text-accent">predictable.</em>
          </h1>

          <p className="mt-6 md:mt-8 text-lg md:text-2xl text-ink-600 max-w-3xl leading-relaxed reveal">
            BAZ is a senior-only growth partner that builds and manages your{' '}
            <span className="font-medium text-ink-900">owned, earned, paid, and data</span> channels.
            One team. One plan. Every metric tied to revenue.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 reveal">
            <Button href={site.bookingUrl} external variant="secondary" size="lg" trackAs="hero_book_call">
              Book a growth call
              <span aria-hidden className="ml-1">→</span>
            </Button>
            <Button href="/case-studies" variant="outline" size="lg" trackAs="hero_case_studies">
              See case studies
            </Button>
            <Button href="/contact" variant="ghost" size="lg" trackAs="hero_audit">
              Request an audit
            </Button>
          </div>

          {/* Trust strip mini */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500 reveal">
            <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400">Trusted by</span>
            <span className="font-display font-semibold text-ink-700">ViralVista</span>
            <span className="opacity-30">·</span>
            <span className="font-display font-semibold text-ink-700">Northwind</span>
            <span className="opacity-30">·</span>
            <span className="font-display font-semibold text-ink-700">EngageEra</span>
            <span className="opacity-30">·</span>
            <span className="font-display font-semibold text-ink-700">Saffron &amp; Co.</span>
            <span className="opacity-30">·</span>
            <span className="font-display font-semibold text-ink-700">Meridian Labs</span>
            <span className="opacity-30">·</span>
            <span className="font-display font-semibold text-ink-700">BuzzBeacon</span>
          </div>
        </div>
      </div>

      {/* Hero stat corner */}
      <div className="container mx-auto pb-16 md:pb-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100 reveal">
          {[
            { v: site.stats.brandsScaled, l: 'Brands scaled' },
            { v: site.stats.countriesServed, l: 'Countries' },
            { v: site.stats.teamSize, l: 'Senior partners' },
            { v: site.stats.seniorOnly, l: 'Senior team' },
          ].map((s) => (
            <div key={s.l} className="bg-paper p-6 md:p-8">
              <p className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em]">{s.v}</p>
              <p className="mt-2 font-mono uppercase tracking-[0.18em] text-[11px] text-ink-500">{s.l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
