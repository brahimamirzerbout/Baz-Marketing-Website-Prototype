import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Magnetic } from '@/components/ui/Magnetic';
import { LiveAgentDemo } from '@/components/marketing/LiveAgentDemo';
import { site } from '@/lib/site';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-paper bg-grain">
      {/* Decorative grid + mesh */}
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div aria-hidden className="absolute inset-0 bg-mesh opacity-90" />

      <div className="container mx-auto relative pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-5xl">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-6 reveal inline-flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-accent rounded-full animate-pulse-dot" />
            Now booking Q3 — 2 senior-partner spots left
          </p>

          <h1 className="font-display text-display-2xl font-medium text-ink-900 reveal">
            Make growth <em className="not-italic text-gradient">predictable.</em>
          </h1>

          <p className="mt-6 md:mt-8 text-lg md:text-2xl text-ink-600 max-w-3xl leading-relaxed reveal">
            BAZ is a <span className="font-medium text-ink-900">senior-only growth partner</span> that builds and manages your{' '}
            <span className="font-medium text-ink-900">owned, earned, paid, and data</span> channels. One team. One plan.
            Every metric tied to revenue.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 reveal">
            <Magnetic strength={0.3}>
              <Button href={site.bookOrMailto} external variant="secondary" size="lg" trackAs="hero_book_call" data-cursor="cta">
                Book a growth call
                <span aria-hidden className="ml-1">→</span>
              </Button>
            </Magnetic>
            <Button href="/case-studies" variant="outline" size="lg" trackAs="hero_case_studies">
              See case studies
            </Button>
            <Button href="/contact" variant="ghost" size="lg" trackAs="hero_audit">
              Request an audit
            </Button>
          </div>

          {/* Trust strip — partner tools BAZ actually uses (env-overridable) */}
          <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500 reveal">
            <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-ink-400">Stack</span>
            {['Ollama', 'GitHub', 'Vercel', 'Linear', 'Stripe', 'Resend'].map((name, i, arr) => (
              <span key={name} className="flex items-center gap-x-8">
                <span className="font-display font-semibold text-ink-700">{name}</span>
                {i < arr.length - 1 && <span className="opacity-30">·</span>}
              </span>
            ))}
          </div>
        </div>

        {/* Hero stat corner — hidden entirely when no real numbers are set */}
        {(() => {
          const stats = [
            { v: site.stats.brandsScaled,    l: 'Brands scaled' },
            { v: site.stats.countriesServed, l: 'Countries' },
            { v: site.stats.teamSize,        l: 'Senior partners' },
            { v: site.stats.seniorOnly,      l: 'Senior team' },
          ].filter((s) => s.v != null && s.v !== '');
          if (stats.length === 0) return null;
          return (
            <div className="mt-16 md:mt-20 grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100 reveal">
              {stats.map((s) => (
                <div key={s.l} className="bg-paper p-6 md:p-8">
                  <p className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em]">{s.v}</p>
                  <p className="mt-2 font-mono uppercase tracking-[0.18em] text-[11px] text-ink-500">{s.l}</p>
                </div>
              ))}
            </div>
          );
        })()}

        {/* Inline live agent demo teaser */}
        <div className="mt-20 reveal">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-6">
            <div>
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-2">Run a real BAZ agent</p>
              <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] max-w-2xl">
                Press play. Watch a senior BAZ operator execute.
              </h2>
            </div>
            <p className="text-sm text-ink-500 max-w-sm">
              Each agent is a real workflow our team runs daily. Output below is what you&apos;d get on the first call — only faster.
            </p>
          </div>
          <LiveAgentDemo />
        </div>
      </div>
    </section>
  );
}
