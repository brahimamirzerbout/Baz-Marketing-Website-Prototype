import Link from "next/link";
import { Section, Eyebrow } from "@/components/ui/Section";

const pillars = [
  { href: "/services#owned", label: "Owned", desc: "Website, content, social, listings" },
  { href: "/services#earned", label: "Earned", desc: "SEO, authority, citations" },
  { href: "/services#paid", label: "Paid", desc: "Search, social, programmatic" },
  { href: "/services#data", label: "Data", desc: "Tracking, attribution, reporting" },
];

export function PillarGrid() {
  return (
    <Section tone="paper" size="md">
      <div className="grid lg:grid-cols-2 gap-10 items-end mb-12">
        <div>
          <Eyebrow>The four channels, one team</Eyebrow>
          <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] max-w-2xl">
            Owned. Earned. Paid. Data.
          </h2>
        </div>
        <p className="text-lg text-muted-foreground max-w-xl">
          Most agencies run one channel. BAZ runs all four — under one senior team, one plan, one
          set of dashboards. No channel blame. One P&amp;L.
        </p>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {pillars.map((p) => (
          <Link
            key={p.href}
            href={p.href}
            className="group block bg-card rounded-2xl p-6 md:p-7 border border-border dark:border-border"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
                {p.label}
              </span>
              <span
                aria-hidden
                className="text-muted-foreground/40 dark:text-muted-foreground/60"
              >
                →
              </span>
            </div>
            <p className="font-display text-2xl font-medium tracking-[-0.02em]">{p.desc}</p>
          </Link>
        ))}
      </div>
    </Section>
  );
}
