import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";

const principles = [
  { t: "Senior team, no juniors", d: "The people who pitch are the people who ship. Always." },
  {
    t: "Strategy is documented",
    d: "A 90-day plan with owners, budgets, and exit criteria. Not a deck.",
  },
  {
    t: "Measurement is the moat",
    d: "Server-side tracking, attribution, and dashboards execs actually open.",
  },
  { t: "Speed is a feature", d: "Markets don't wait. We ship in weeks, not quarters." },
  {
    t: "Revenue is sanity",
    d: "Followers are vanity. We optimize for revenue, signups, and pipeline.",
  },
  { t: "Brand compounds", d: "Identity, voice, and design tied to the metric each piece owns." },
];

export function Framework() {
  return (
    <Section tone="ink" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow tone="light">Our operating principles</Eyebrow>
          <SectionHeading className="text-foreground">
            The way we work — not the way we pitch.
          </SectionHeading>
          <SectionLede className="text-muted-foreground">
            Six principles that shape every engagement. They aren&apos;t slogans; they&apos;re how we decide
            what to ship and what to cut.
          </SectionLede>
        </div>
      </div>
      <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-background/10 rounded-2xl overflow-hidden border border-border/50">
        {principles.map((p, i) => (
          <li
            key={p.t}
            className="bg-primary text-foreground p-6 md:p-8 dark:bg-primary/90 dark:text-foreground overflow-hidden relative"
          >
            {/* Oversized step number — Pattern 6 + 44: numbered indices */}
            <span
              aria-hidden
              className="absolute -top-2 -right-1 font-display text-[72px] md:text-[96px] font-bold leading-none text-muted-foreground/[0.08] select-none"
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent dark:text-accent mb-4">
              [{String(i + 1).padStart(2, "0")}]
            </div>
            <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em] text-foreground dark:text-foreground">
              {p.t}
            </h3>
            <p className="mt-3 text-muted-foreground leading-relaxed dark:text-muted-foreground">
              {p.d}
            </p>
          </li>
        ))}
      </ul>
    </Section>
  );
}