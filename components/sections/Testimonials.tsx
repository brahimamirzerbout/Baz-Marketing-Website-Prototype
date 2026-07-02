import { testimonials } from "@/content/testimonials";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";

export function Testimonials() {
  return (
    <Section tone="white" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>In their words</Eyebrow>
          <SectionHeading>What senior-team actually feels like.</SectionHeading>
          <SectionLede>
            Five clients on what changed when they stopped working with generalist pods and started
            working with partners. Every metric is named.
          </SectionLede>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.slice(0, 6).map((t, i) => (
          <figure
            key={i}
            className="reveal flex flex-col bg-background rounded-2xl p-6 md:p-7 border border-border dark:border-border"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            {/* Duotone initial avatar — Pattern 45: replaces generic avatar with brand treatment */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <span className="font-display text-lg font-bold text-accent">
                  {t.author.charAt(0)}
                </span>
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{t.author}</p>
                <p className="text-xs text-muted-foreground">
                  {t.role} · {t.company}
                </p>
              </div>
            </div>

            {/* Quote with hanging punctuation — Pattern 7 */}
            <blockquote className="font-display text-lg md:text-xl tracking-[-0.01em] leading-snug text-foreground flex-1">
              &ldquo;{t.quote}&rdquo;
            </blockquote>

            {/* Metric chip — Pattern 67: numerical data with context */}
            {t.metric && (
              <figcaption className="mt-5 pt-4 border-t border-border flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent" aria-hidden />
                  <span className="font-mono text-xs uppercase tracking-[0.15em] text-accent">
                    {t.metric}
                  </span>
                </div>
                {t.placeholder && (
                  <span className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground/30">
                    illustrative
                  </span>
                )}
              </figcaption>
            )}
          </figure>
        ))}
      </div>
    </Section>
  );
}