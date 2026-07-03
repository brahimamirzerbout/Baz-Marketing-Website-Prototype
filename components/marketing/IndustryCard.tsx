import Link from "next/link";
import type { Industry } from "@/types";

export function IndustryCard({ industry, index = 0 }: { industry: Industry; index?: number }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="reveal group block bg-card rounded-2xl p-6 md:p-7 border border-border dark:border-border hover:border-foreground dark:hover:border-border"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground/60">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden
          className="text-muted-foreground/40 dark:text-muted-foreground/60 group-hover:text-accent group-hover:translate-x-0.5 transition-all"
        >
          →
        </span>
      </div>
      <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em]">
        {industry.name}
      </h3>
      <p className="mt-3 text-muted-foreground leading-relaxed">{industry.blurb}</p>
      <div className="mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
        {industry.challenges.length} challenges · {industry.outcomes.length} typical outcomes
      </div>
    </Link>
  );
}
