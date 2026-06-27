import Link from 'next/link';
import { caseStudies } from '@/content/case-studies';
import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

export function CaseStudies() {
  const featured = caseStudies.slice(0, 3);
  return (
    <Section tone="paper" size="lg" id="case-studies">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>Proof, not pitches</Eyebrow>
          <SectionHeading>Work that moved the P&amp;L.</SectionHeading>
          <SectionLede>
            Senior team. Documented strategy. Measured outcomes. Read the cases — every metric
            is named, and where it's not yet public, it's labeled.
          </SectionLede>
        </div>
        <div className="lg:col-span-5 flex items-end lg:justify-end">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-medium text-ink-900 hover:text-accent transition-colors"
          >
            All case studies <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {featured.map((c, i) => (
          <Link
            key={c.slug}
            href={`/case-studies/${c.slug}`}
            className="reveal group flex flex-col bg-paper-50 rounded-2xl border border-ink-100 hover:border-ink-900 hover:-translate-y-1 hover:shadow-lift transition-all duration-200 overflow-hidden"
            style={{ animationDelay: `${i * 80}ms` }}
          >
            <div
              className="aspect-[5/3] relative grid place-items-center"
              style={{ background: c.cover }}
            >
              <span className="font-display text-paper text-7xl md:text-8xl font-bold tracking-[-0.04em] opacity-90">
                {c.client.charAt(0)}
              </span>
              <span className="absolute top-4 left-4">
                <Badge variant="ink">{c.industry}</Badge>
              </span>
            </div>
            <div className="p-6 md:p-7 flex-1 flex flex-col">
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{c.client}</h3>
              <p className="mt-2 text-sm text-ink-600 line-clamp-2">{c.problem}</p>
              <div className="mt-6 grid grid-cols-3 gap-2">
                {c.metrics.slice(0, 3).map((m) => (
                  <div key={m.label}>
                    <p className="font-display text-lg font-medium tracking-[-0.02em]">{m.value}</p>
                    <p className="text-[10px] uppercase tracking-wider text-ink-500 mt-1">{m.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between text-sm">
                <span className="text-ink-500">{c.duration}</span>
                <span aria-hidden className="text-ink-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all">Read case →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </Section>
  );
}
