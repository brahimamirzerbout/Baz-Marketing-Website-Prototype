/**
 * Compact proof strip: 3 case-study outcomes side-by-side.
 * Used on the BAZ homepage right after the Marketing Hub banner so visitors
 * see "real product + real outcomes" within the first scroll.
 *
 * Pattern 67: Numerical data with context — every metric is attributed.
 * Pattern 45: Duotone initial instead of generic icon.
 */
import { caseStudies } from "@/content/case-studies";

export function ProofNumbers() {
  const top = caseStudies.slice(0, 3);
  return (
    <section className="bg-background relative overflow-hidden">
      <div className="container mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-muted dark:bg-muted rounded-2xl overflow-hidden border border-border">
          {top.map((cs) => {
            const headline = cs.metrics[0]; // most-quantified metric
            return (
              <div key={cs.slug} className="bg-background p-6 md:p-8 flex flex-col">
                {/* Duotone initial + client name */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{ background: `${cs.cover}20` }}
                  >
                    <span className="font-display text-lg font-bold" style={{ color: cs.cover }}>
                      {cs.client.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground">
                      {cs.client} · {cs.industry}
                    </p>
                  </div>
                </div>

                {/* Headline metric */}
                <p className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground">
                  {headline?.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{headline?.label}</p>

                {/* Result line — one sentence */}
                <p className="mt-4 text-xs text-muted-foreground line-clamp-2">{cs.result}</p>

                {/* Attribution context — Pattern 67 */}
                <p className="text-[10px] text-muted-foreground/30 font-mono mt-1">
                  {cs.duration} · {cs.services.slice(0, 2).join(", ")}
                </p>

                <div className="mt-auto pt-4 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">{cs.duration}</span>
                  <a
                    href={`/case-studies/${cs.slug}`}
                    className="text-accent font-medium hover:underline"
                  >
                    Read the case →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}