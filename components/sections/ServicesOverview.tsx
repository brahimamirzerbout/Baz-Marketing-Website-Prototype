// @ts-nocheck
import Link from "next/link";
import { services } from "@/content/services";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Badge } from "@/components/ui/Badge";

const pillarLabels: Record<
  string,
  { name: string; tone: "accent" | "info" | "success" | "warning" }
> = {
  owned: { name: "Owned", tone: "accent" },
  earned: { name: "Earned", tone: "info" },
  paid: { name: "Paid", tone: "warning" },
  data: { name: "Data", tone: "success" },
  platform: { name: "Platform", tone: "accent" },
};

export function ServicesOverview() {
  return (
    <Section tone="paper" size="lg" id="services">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>What we do</Eyebrow>
          <SectionHeading>Eighteen services. One senior team.</SectionHeading>
          <SectionLede>
            Every type of marketing agency — strategy, performance, SEO, content, brand, CRO,
            lifecycle, CRM, analytics, AI search, social, influencer, video, partnerships, ABM, PR,
            research, and internationalization. One tightly integrated system. One senior team.
          </SectionLede>
        </div>
        <div className="lg:col-span-5 flex items-end lg:justify-end">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-medium text-foreground hover:text-accent transition-colors"
          >
            All services <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s, i) => {
          const tone = pillarLabels[s.pillar];
          return (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="reveal group block bg-card rounded-2xl p-6 md:p-7 border border-border dark:border-border hover:border-foreground dark:hover:border-border hover:-translate-y-1 hover:shadow-lift transition-all duration-200"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-8">
                <Badge variant={tone.tone}>
                  [{String(i + 1).padStart(2, "0")}] · {tone.name}
                </Badge>
                <span
                  aria-hidden
                  className="text-muted-foreground/40 dark:text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
                >
                  →
                </span>
              </div>
              <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em] leading-tight">
                {s.name}
              </h3>
              <p className="mt-3 text-muted-foreground leading-relaxed">{s.tagline}</p>
              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between text-sm">
                <span className="font-mono uppercase tracking-[0.15em] text-[11px] text-muted-foreground/60">
                  {s.deliverables[0]}
                </span>
                <span className="text-muted-foreground">{s.deliverables.length} deliverables</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
