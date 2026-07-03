import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="relative bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      {/* Subtle grid background */}
      <div
        aria-hidden
        className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
      />

      <div className="container mx-auto px-6 py-24 md:py-40 relative">
        <div className="max-w-4xl">
          {/* Argument headline — Pattern 56: headlines as arguments, not slogans */}
          <p className="eyebrow-neutral mb-8">
            <span className="inline-block w-1.5 h-1.5 bg-[var(--foreground)] rounded-full mr-1 animate-pulse-dot" />
            Booking Q3 · 2 senior partner slots open
          </p>

          {/* The closing argument — one sentence, one breath */}
          <h2 className="font-display text-display-xl font-medium tracking-[-0.035em] leading-[1.0]">
            Most agencies optimize for activity.
            <br />
            <span className="text-accent">We optimize for revenue.</span>
          </h2>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
            30 minutes. A senior partner reviews your funnel, your channels, and your unit economics
            — and tells you honestly whether BAZ is the right fit. If we&apos;re not, we&apos;ll refer
            you to someone who is.
          </p>

          {/* CTAs — full sentences (Pattern 55) */}
          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button
              href={site.bookOrMailto}
              external
              variant="secondary"
              size="lg"
              trackAs="final_book_call"
            >
              Book a 30-minute growth call →
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              trackAs="final_contact"
              className="border-white/15 text-[var(--foreground)]/80"
            >
              Request a paid audit first
            </Button>
          </div>

          {/* Guarantee — specific, not generic (Pattern 48 + 57) */}
          <div className="mt-8 p-5 rounded-xl border border-border/50 bg-muted/30 max-w-lg">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <span className="text-accent font-medium">Speed guarantee:</span> First measurable
              artifact live in your Hub within 14 calendar days from kickoff. If we miss it, month
              one is free. We&apos;ve never paid out.
            </p>
          </div>
        </div>

        {/* Footer signature strip */}
        <div className="mt-20 pt-8 border-t border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span
              className="royal-seal"
              style={{ width: "32px", height: "32px", fontSize: "13px" }}
            >
              B
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/30">
              Senior team · No juniors · Algiers · EU · US
            </span>
          </div>
          <a
            href={`mailto:${site.email}`}
            className="text-sm text-white/30 hover:text-[var(--foreground)] transition-colors"
          >
            {site.email}
          </a>
        </div>
      </div>
    </section>
  );
}