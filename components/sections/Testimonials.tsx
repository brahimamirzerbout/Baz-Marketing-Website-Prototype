import { testimonials } from '@/content/testimonials';
import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';

export function Testimonials() {
  return (
    <Section tone="white" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>In their words</Eyebrow>
          <SectionHeading>What senior-team actually feels like.</SectionHeading>
          <SectionLede>
            Five clients on what changed when they stopped working with generalist pods and
            started working with partners.
          </SectionLede>
        </div>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {testimonials.slice(0, 6).map((t, i) => (
          <figure
            key={i}
            className="reveal flex flex-col bg-paper rounded-2xl p-6 md:p-7 border border-ink-100"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <span aria-hidden className="font-display text-5xl text-accent leading-none mb-3">&ldquo;</span>
            <blockquote className="font-display text-xl md:text-2xl tracking-[-0.02em] leading-snug text-ink-900">
              {t.quote}
            </blockquote>
            <figcaption className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between">
              <div>
                <p className="font-medium text-ink-900">{t.author}</p>
                <p className="text-sm text-ink-500">{t.role} · {t.company}</p>
              </div>
              {t.metric && (
                <span className="text-xs font-mono uppercase tracking-[0.15em] text-accent">
                  {t.metric}
                </span>
              )}
            </figcaption>
          </figure>
        ))}
      </div>
    </Section>
  );
}
