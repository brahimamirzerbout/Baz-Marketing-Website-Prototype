import Link from 'next/link';
import type { CaseStudy } from '@/types';
import { Badge } from '@/components/ui/Badge';

export function CaseStudyCard({ caseStudy, index = 0 }: { caseStudy: CaseStudy; index?: number }) {
  return (
    <Link
      href={`/case-studies/${caseStudy.slug}`}
      className="reveal group flex flex-col bg-white rounded-2xl border border-ink-100 hover:border-ink-900 hover:-translate-y-1 hover:shadow-lift transition-all duration-200 overflow-hidden h-full"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className="aspect-[5/3] relative grid place-items-center" style={{ background: caseStudy.cover }}>
        <span className="font-display text-paper text-7xl md:text-8xl font-bold tracking-[-0.04em] opacity-90">
          {caseStudy.client.charAt(0)}
        </span>
        <span className="absolute top-4 left-4"><Badge variant="ink">{caseStudy.industry}</Badge></span>
        <span className="absolute bottom-4 right-4 text-paper/80 text-xs font-mono uppercase tracking-[0.15em]">
          {caseStudy.duration}
        </span>
      </div>
      <div className="p-6 md:p-7 flex-1 flex flex-col">
        <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{caseStudy.client}</h3>
        <p className="mt-2 text-sm text-ink-600 line-clamp-2">{caseStudy.problem}</p>
        <div className="mt-6 grid grid-cols-3 gap-2">
          {caseStudy.metrics.slice(0, 3).map((m) => (
            <div key={m.label}>
              <p className="font-display text-lg font-medium tracking-[-0.02em]">{m.value}</p>
              <p className="text-[10px] uppercase tracking-wider text-ink-500 mt-1">{m.label}</p>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between text-sm">
          <span className="text-ink-500">{caseStudy.services.slice(0, 2).join(' · ')}</span>
          <span aria-hidden className="text-ink-300 group-hover:text-accent group-hover:translate-x-0.5 transition-all">Read →</span>
        </div>
      </div>
    </Link>
  );
}
