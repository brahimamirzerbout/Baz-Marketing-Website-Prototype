import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { ServiceCard } from "@/components/marketing/ServiceCard";
import { CaseStudyCard } from "@/components/marketing/CaseStudyCard";
import { industries, getIndustry } from "@/content/industries";
import { services } from "@/content/services";
import { caseStudies } from "@/content/case-studies";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";
import { buildMetadata } from "@/lib/seo";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const ind = getIndustry(params.slug);
  if (!ind)
    return buildMetadata({
      title: "Industry not found",
      path: `/industries/${params.slug}`,
      noindex: true,
    });
  return buildMetadata({
    title: `${ind.name} growth`,
    description: ind.blurb,
    path: `/industries/${ind.slug}`,
  });
}

export default function IndustryDetailPage({ params }: Params) {
  const ind = getIndustry(params.slug);
  if (!ind) notFound();

  const relevantCases = caseStudies
    .filter((c) => {
      const term = ind.name.toLowerCase().split(" ")[0];
      return term ? c.industry.toLowerCase().includes(term) : false;
    })
    .slice(0, 3);

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Industries", href: "/industries" },
            { label: ind.name },
          ]}
        />
        <div className="max-w-4xl">
          <Eyebrow>{ind.name}</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            {ind.name} growth, with senior-team execution.
          </h1>
          <SectionLede>{ind.blurb}</SectionLede>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button
              href={site.bookOrMailto}
              external
              variant="secondary"
              size="lg"
              trackAs="industry_book_call"
            >
              Book a {ind.name} call →
            </Button>
            <Button href="/contact" variant="outline" size="lg" trackAs="industry_contact">
              Request an audit
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6">
            <Eyebrow>Typical challenges</Eyebrow>
            <SectionHeading>What we hear first.</SectionHeading>
            <ul className="mt-8 space-y-3">
              {ind.challenges.map((c) => (
                <li key={c} className="flex items-start gap-3 text-[15px] text-foreground">
                  <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-accent" />
                  {c}
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6">
            <Eyebrow>Typical outcomes</Eyebrow>
            <SectionHeading>What the engagement unlocks.</SectionHeading>
            <ul className="mt-8 space-y-3">
              {ind.outcomes.map((o) => (
                <li key={o} className="flex items-start gap-3 text-[15px] text-foreground">
                  <span aria-hidden className="shrink-0 mt-2 w-1.5 h-1.5 rounded-full bg-success" />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {relevantCases.length > 0 && (
        <Section tone="paper" size="lg">
          <Eyebrow>Adjacent work</Eyebrow>
          <SectionHeading>{ind.name} case studies.</SectionHeading>
          <div className="mt-10 grid md:grid-cols-3 gap-5">
            {relevantCases.map((c, i) => (
              <CaseStudyCard key={c.slug} caseStudy={c} index={i} />
            ))}
          </div>
        </Section>
      )}

      <Section tone="white" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 mb-12">
          <div className="lg:col-span-7">
            <Eyebrow>Common services</Eyebrow>
            <SectionHeading>What we typically ship for {ind.name.toLowerCase()}.</SectionHeading>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {services.slice(0, 6).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
