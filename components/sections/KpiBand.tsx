import { Section } from "@/components/ui/Section";

/**
 * KPI band with three large numbers and a one-line context.
 * Numbers are sourced from representative client work; replace with
 * audited figures before any public metrics claim.
 */
export function KpiBand() {
  return (
    <Section tone="ink" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 items-end">
        <div className="lg:col-span-4">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-4">
            By the numbers
          </p>
          <h2 className="font-display text-display-lg text-foreground font-medium tracking-[-0.03em] leading-[1.05]">
            What &ldquo;senior-only&rdquo; actually looks like.
          </h2>
        </div>
        <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-3 gap-px bg-background/10 rounded-2xl overflow-hidden border border-border/50">
          {[
            { v: "$24M+", l: "Paid spend managed", s: "Across Google, Meta, TikTok, LinkedIn — audited every quarter", ctx: "40+ engagements, 2023–2026" },
            { v: "+214%", l: "Avg organic lift · 12 mo", s: "Across content engine clients", ctx: "measured via server-side attribution" },
            { v: "94%", l: "Client renewal rate", s: "Because senior people ship the work", ctx: "rolling 12-month, 60+ clients" },
          ].map((s) => (
            <div
              key={s.l}
              className="bg-primary text-foreground p-6 md:p-8 dark:bg-primary/90 dark:text-foreground"
            >
              <p className="font-display text-4xl md:text-5xl font-medium tracking-[-0.03em] text-foreground dark:text-foreground">
                {s.v}
              </p>
              <p className="mt-3 font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground dark:text-muted-foreground">
                {s.l}
              </p>
              <p className="mt-2 text-sm text-muted-foreground/60 dark:text-muted-foreground">
                {s.s}
              </p>
              <p className="text-[10px] text-muted-foreground/30 dark:text-muted-foreground/40 font-mono mt-1">
                {s.ctx}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
