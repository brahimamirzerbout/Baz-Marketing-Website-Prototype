import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Section, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { StatRow } from '@/components/sections/StatRow';
import { CaseStudyCard } from '@/components/marketing/CaseStudyCard';
import { ServiceHero } from '@/components/marketing/ServiceHero';
import { ServiceAnalytics } from '@/components/marketing/ServiceAnalytics';
import { DeliverablesList } from '@/components/marketing/DeliverablesList';
import { ProcessTimeline } from '@/components/marketing/ProcessTimeline';
import { Faq } from '@/components/marketing/Faq';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { ServiceCard } from '@/components/marketing/ServiceCard';
import { caseStudies } from '@/content/case-studies';
import { services, getService } from '@/content/services';
import { buildMetadata, jsonLd, faqLd, breadcrumbLd } from '@/lib/seo';

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const service = getService(params.slug);
  if (!service) return buildMetadata({ title: 'Service not found', path: `/services/${params.slug}`, noindex: true });
  return buildMetadata({
    title: service.name,
    description: service.description,
    path: `/services/${service.slug}`,
  });
}

export default function ServiceDetailPage({ params }: Params) {
  const service = getService(params.slug);
  if (!service) notFound();

  // Match a service to case studies whose `services` array contains the
  // service's primary name token (first meaningful word) OR a configured
  // alias. We strip punctuation and skip generic noise words (marketing,
  // growth, optimization, & automation-style suffixes) so renames don't
  // accidentally over-match unrelated case studies.
  const NOISE = new Set([
    'marketing', 'operations', 'optimization', 'automation', 'management',
    'services', 'strategy', 'consulting', 'design', 'development', 'studio',
    'system', 'systems', 'channel', 'channels', 'platform',
  ]);
  const relatedCases = (() => {
    const tokenize = (s: string) =>
      s
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, ' ')
        .split(/\s+/)
        .filter((w) => w.length > 2 && !NOISE.has(w));
    const serviceTokens = tokenize(service.name);
    const aliases: Record<string, string[]> = {
      crm: ['crm', 'mops'],
      abm: ['abm', 'b2b', 'demand'],
      cro: ['cro', 'conversion'],
      ai: ['ai', 'geo', 'aeo'],
      video: ['video', 'podcast'],
      lifecycle: ['lifecycle', 'email', 'sms'],
      brand: ['brand', 'identity'],
      public: ['public', 'relations', 'pr'],
      analytics: ['analytics', 'attribution', 'tracking'],
    };
    const primary = serviceTokens[0] ?? '';
    const candidates = new Set<string>([primary, ...(aliases[primary] ?? [])]);
    return caseStudies
      .filter((c) =>
        c.services.some((sv) => {
          const svLow = sv.toLowerCase();
          // Word-boundary regex so 'market' doesn't substring-match inside
          // 'Performance Marketing'. Tokenize the case-study side the same way.
          return [...candidates].some((t) => {
            if (!t) return false;
            const re = new RegExp(`\\b${t}\\b`);
            return re.test(svLow);
          });
        }),
      )
      .slice(0, 3);
  })();
  const relatedServices = services.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <ServiceAnalytics service={service} />
      <ServiceHero service={service} />

      <Section tone="white" size="md">
        <StatRow items={service.kpis.map((k) => ({ value: k.value, label: k.label, sub: '' }))} />
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7">
            <Eyebrow>What it is</Eyebrow>
            <SectionHeading>{service.description}</SectionHeading>
            <div className="mt-10">
              <Eyebrow>Who it&apos;s for</Eyebrow>
              <ul className="mt-3 space-y-2">
                {service.who.map((w) => (
                  <li key={w} className="flex items-start gap-3 text-[15px] text-ink-700">
                    <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-5">
            <Eyebrow>Deliverables</Eyebrow>
            <div className="mt-3">
              <DeliverablesList items={service.deliverables} />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <Eyebrow>Process</Eyebrow>
        <SectionHeading>How we ship {service.name}.</SectionHeading>
        <div className="mt-10">
          <ProcessTimeline process={service.process} />
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>Proof</Eyebrow>
            <SectionHeading>Recent outcomes.</SectionHeading>
          </div>
        </div>
        <ul className="grid md:grid-cols-2 gap-4">
          {service.proof.map((p, i) => (
            <li key={p.client + i} className="reveal bg-paper-50 rounded-2xl border border-ink-100 p-6 md:p-7" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-ink-500">{p.client}</p>
                <p className="font-display text-3xl font-medium tracking-[-0.03em] text-accent">{p.metric}</p>
              </div>
              <p className="text-[15px] text-ink-700 leading-relaxed">{p.detail}</p>
            </li>
          ))}
        </ul>
      </Section>

      {relatedCases.length > 0 && (
        <Section tone="white" size="lg">
          <Eyebrow>Selected case studies</Eyebrow>
          <SectionHeading>Work that&apos;s adjacent.</SectionHeading>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {relatedCases.map((c, i) => (
              <CaseStudyCard key={c.slug} caseStudy={c} index={i} />
            ))}
          </div>
        </Section>
      )}

      {service.faqs.length > 0 && (
        <Section tone="paper" size="lg">
          <div className="grid lg:grid-cols-12 gap-10 mb-10">
            <div className="lg:col-span-7">
              <Eyebrow>Common questions</Eyebrow>
              <SectionHeading>Frequently asked.</SectionHeading>
            </div>
          </div>
          <Faq items={service.faqs} />
        </Section>
      )}

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>Related services</Eyebrow>
            <SectionHeading>Often paired with {service.name}.</SectionHeading>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {relatedServices.map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <CtaBanner serviceSlug={service.slug} serviceName={service.name} />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd([
        faqLd(service.faqs),
        breadcrumbLd([
          { name: 'Home', url: '/' },
          { name: 'Services', url: '/services' },
          { name: service.name, url: `/services/${service.slug}` },
        ]),
      ])} />
    </>
  );
}
