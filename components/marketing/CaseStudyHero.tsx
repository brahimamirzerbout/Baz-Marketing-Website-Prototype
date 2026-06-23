import type { CaseStudy } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Breadcrumb } from '@/components/sections/Breadcrumb';

export function CaseStudyHero({ caseStudy }: { caseStudy: CaseStudy }) {
  return (
    <section className="relative overflow-hidden" style={{ background: caseStudy.cover }}>
      <div aria-hidden className="absolute inset-0 bg-grid opacity-20 [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
      <div className="container mx-auto relative py-16 md:py-24 text-paper">
        <div className="text-paper-200 mb-6">
          <Breadcrumb items={[
            { label: 'Home', href: '/' },
            { label: 'Case studies', href: '/case-studies' },
            { label: caseStudy.client },
          ]} />
        </div>
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <Badge variant="ink">{caseStudy.industry}</Badge>
          {caseStudy.services.slice(0, 3).map((s) => (
            <Badge key={s} variant="default" className="bg-paper/20 text-paper">{s}</Badge>
          ))}
        </div>
        <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-paper-200 mb-4">
          Case study · {caseStudy.duration}
        </p>
        <h1 className="font-display text-display-xl font-medium tracking-[-0.035em] leading-[1.0] max-w-4xl">
          {caseStudy.client}
        </h1>
        <p className="mt-6 text-lg md:text-2xl text-paper-200 max-w-3xl leading-relaxed">
          {caseStudy.problem}
        </p>
      </div>
    </section>
  );
}
