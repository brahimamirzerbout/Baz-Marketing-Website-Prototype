import Link from "next/link";
import { caseStudies } from "@/content/case-studies";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

export function CaseStudies() {
  const featured = caseStudies.slice(0, 3);
  return (
    <Section tone="paper" size="lg" id="case-studies">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>Proof, not pitches</Eyebrow>
          <SectionHeading>Work that moved the P&L.</SectionHeading>
          <SectionLede>
            Senior team. Documented strategy. Measured outcomes. Every metric below is named and
            attributed — where it&apos;s not yet public, it&apos;s labeled.
          </SectionLede>
        </div>
        <div className="lg:col-span-5 flex items-end lg:justify-end">
          <Link
            href="/case-studies"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent transition-colors"
          >
            All case studies <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {featured.map((c, i) => {
          const headline = c.metrics[0];
          return (
            <Link
              key={c.slug}
              href={`/case-studies/${c.slug}`}
              className="reveal group flex flex-col bg-card rounded-2xl border border-border dark:border-border hover:border-accent/50 hover:-translate-y-1 hover:shadow-lift transition-all duration-377 ease-[cubic-bezier(0.618,0,0.618,1)] overflow-hidden"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              {/* Cover strip with brand color */}
              <div
                className="h-1.5 w-full"
                style={{ background: c.cover }}
                aria-hidden
              />

              <div className="p-6 md:p-7 flex-1 flex flex-col">
                {/* Header: client + industry badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* Duotone initial — Pattern 45 */}
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center"
                      style={{ background: `${c.cover}20` }}>
                      <span className="font-display text-lg font-bold" style={{ color: c.cover }}>
                        {c.client.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-display text-xl font-medium tracking-[-0.02em]">{c.client}</p>
                      <p className="text-xs text-muted-foreground">{c.industry}</p>
                    </div>
                  </div>
                  <Badge variant="ink">{c.services.length} services</Badge>
                </div>

                {/* Problem — one sentence */}
                <p className="text-sm text-muted-foreground line-clamp-2 flex-1">{c.problem}</p>

                {/* Metric strip — Pattern 67: numerical data with context */}
                <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4">
                  {c.metrics.slice(0, 3).map((m) => (
                    <div key={m.label}>
                      <p className="font-display text-lg font-medium tracking-[-0.02em] text-foreground">
                        {m.value}
                      </p>
                      <p className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">
                        {m.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Footer: duration + CTA */}
                <div className="mt-5 pt-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-muted-foreground font-mono text-[11px]">{c.duration}</span>
                  <span
                    aria-hidden
                    className="text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                  >
                    Read case →
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}