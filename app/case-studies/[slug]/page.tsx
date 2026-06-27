import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Section, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { CaseStudyHero } from '@/components/marketing/CaseStudyHero';
import { StatRow } from '@/components/sections/StatRow';
import { CaseStudyCard } from '@/components/marketing/CaseStudyCard';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { caseStudies, getCaseStudy } from '@/content/case-studies';
import { site } from '@/lib/site';
import { buildMetadata, jsonLd, breadcrumbLd } from '@/lib/seo';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const c = getCaseStudy(params.slug);
  if (!c) return buildMetadata({ title: 'Case study not found', path: `/case-studies/${params.slug}`, noindex: true });
  return buildMetadata({
    title: `${c.client} · Case study`,
    description: c.problem,
    path: `/case-studies/${c.slug}`,
  });
}

export default function CaseStudyDetailPage({ params }: Params) {
  const c = getCaseStudy(params.slug);
  if (!c) notFound();

  const related = caseStudies.filter((x) => x.slug !== c.slug).slice(0, 3);

  return (
    <>
      <CaseStudyHero caseStudy={c} />

      <Section tone="white" size="md">
        <StatRow items={c.metrics.map((m) => ({ value: m.value, label: m.label }))} />
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>The problem</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-snug text-ink-900">
              {c.problem}
            </p>
          </div>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>The strategy</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="text-lg text-ink-700 leading-relaxed max-w-3xl">{c.strategy}</p>
          </div>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <Eyebrow>The result</Eyebrow>
          </div>
          <div className="lg:col-span-8">
            <p className="font-display text-2xl md:text-3xl tracking-[-0.02em] leading-snug text-ink-900">
              {c.result}
            </p>
          </div>
        </div>
      </Section>

      {c.testimonial && (
        <Section tone="ink" size="lg">
          <figure className="max-w-3xl mx-auto text-center">
            <span aria-hidden className="font-display text-6xl text-accent leading-none">&ldquo;</span>
            <blockquote className="mt-4 font-display text-2xl md:text-4xl tracking-[-0.02em] leading-snug text-paper">
              {c.testimonial.quote}
            </blockquote>
            <figcaption className="mt-8 text-paper-300">
              <p className="font-medium text-paper">{c.testimonial.author}</p>
              <p className="text-sm">{c.testimonial.role} · {c.client}</p>
            </figcaption>
          </figure>
        </Section>
      )}

      <Section tone="white" size="lg">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div>
            <Eyebrow>Want a similar outcome?</Eyebrow>
            <SectionHeading>Book a 30-min growth call.</SectionHeading>
          </div>
          <Button href={site.bookOrMailto} external variant="secondary" size="lg" trackAs="case_book_call">
            Book a growth call →
          </Button>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <Eyebrow>More case studies</Eyebrow>
        <SectionHeading>Adjacent work.</SectionHeading>
        <div className="mt-10 grid md:grid-cols-3 gap-5">
          {related.map((rc, i) => (
            <CaseStudyCard key={rc.slug} caseStudy={rc} index={i} />
          ))}
        </div>
      </Section>

      <CtaBanner />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(breadcrumbLd([
        { name: 'Home', url: '/' },
        { name: 'Case studies', url: '/case-studies' },
        { name: c.client, url: `/case-studies/${c.slug}` },
      ]))} />
    </>
  );
}
