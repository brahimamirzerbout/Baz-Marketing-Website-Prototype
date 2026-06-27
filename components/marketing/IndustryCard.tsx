import Link from 'next/link';
import type { Industry } from '@/types';

export function IndustryCard({ industry, index = 0 }: { industry: Industry; index?: number }) {
  return (
    <Link
      href={`/industries/${industry.slug}`}
      className="reveal group block bg-paper-50 rounded-2xl p-6 md:p-7 border border-ink-100 hover:border-ink-900 hover:-translate-y-1 hover:shadow-lift transition-all duration-200"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="flex items-center justify-between mb-6">
        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-400">
          {String(index + 1).padStart(2, '0')}
        </span>
        <span aria-hidden className="text-ink-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all">→</span>
      </div>
      <h3 className="font-display text-2xl md:text-[26px] font-medium tracking-[-0.02em]">{industry.name}</h3>
      <p className="mt-3 text-ink-600 leading-relaxed">{industry.blurb}</p>
      <div className="mt-6 pt-4 border-t border-ink-100 text-sm text-ink-500">
        {industry.challenges.length} challenges · {industry.outcomes.length} typical outcomes
      </div>
    </Link>
  );
}
