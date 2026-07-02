import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";

const steps = [
  {
    n: "01",
    t: "Discover",
    d: "Stakeholder interviews, analytics review, channel audit, and qualitative research. We learn the business before we plan.",
  },
  {
    n: "02",
    t: "Define",
    d: "A 90-day plan with named owners, dated milestones, and exit criteria. Strategy documented, not whispered.",
  },
  {
    n: "03",
    t: "Design",
    d: "Identity, message architecture, design systems, and creative concepts — tied to the metric each piece owns.",
  },
  {
    n: "04",
    t: "Develop",
    d: "Build, integrate, ship. Code, content, campaigns, and lifecycle flows — produced by senior people.",
  },
  {
    n: "05",
    t: "Scale",
    d: "Weekly iteration, monthly reviews, quarterly re-plan. Compound the wins; cut what doesn't move revenue.",
  },
];

export function HowWeWork() {
  return (
    <Section tone="white" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>How we work</Eyebrow>
          <SectionHeading>Five phases. One senior team.</SectionHeading>
          <SectionLede>
            No black boxes. No junior pods. The people who plan your growth are the people who ship
            it.
          </SectionLede>
        </div>
      </div>
      <ol className="grid md:grid-cols-5 gap-4">
        {steps.map((s) => (
          <li
            key={s.n}
            className="reveal relative bg-background rounded-2xl p-6 border border-border dark:border-border overflow-hidden"
          >
            {/* Oversized step number — Pattern 6 + 44 */}}
            <span
              aria-hidden
              className="absolute -top-3 -right-1 font-display text-[72px] md:text-[96px] font-bold leading-none text-muted-foreground/[0.06] select-none"
            >
              {s.n}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">[{s.n}]</span>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-[-0.02em]">{s.t}</h3>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
