import { Section } from '@/components/ui/Section';

/**
 * KPI band with three large numbers and a one-line context.
 * Numbers are placeholders where real client data isn't sourced yet.
 */
export function KpiBand() {
  return (
    <Section tone="ink" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-4">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-paper-300 mb-4">
            By the numbers
          </p>
          <h2 className="font-display text-display-lg text-paper font-medium tracking-[-0.03em] leading-[1.05]">
            What &ldquo;senior-only&rdquo; actually looks like.
          </h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-paper/10 rounded-2xl overflow-hidden border border-paper/10">
          {[
            { v: '$24M+', l: 'Paid spend managed', s: 'Across Google, Meta, TikTok, LinkedIn' },
            { v: '+214%', l: 'Avg organic lift · 12 mo', s: 'Across content engine clients' },
            { v: '94%', l: 'Client renewal rate', s: 'Because senior people ship the work' },
          ].map((s) => (
            <div key={s.l} className="bg-ink-900 p-6 md:p-8">
              <p className="font-display text-4xl md:text-5xl font-medium tracking-[-0.03em] text-paper">{s.v}</p>
              <p className="mt-3 font-mono uppercase tracking-[0.18em] text-[11px] text-paper-300">{s.l}</p>
              <p className="mt-2 text-sm text-paper-400">{s.s}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
