// @ts-nocheck
import { Section, Eyebrow, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { PostsList } from "@/components/marketing/PostsList";
import { NewsletterForm } from "@/components/marketing/NewsletterForm";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { posts } from "@/content/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Insights",
  description:
    "Senior-team perspectives on SEO, paid media, content, analytics, AI search, and growth strategy. Written by the partners, not by content mills.",
  path: "/insights",
});

export default function InsightsIndexPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Insights" }]} />
        <div className="max-w-4xl">
          <Eyebrow>Insights</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Notes from the playbook.
          </h1>
          <SectionLede>
            Six-pillar perspectives on what&apos;s actually working in growth marketing — written by
            the partners, not by content mills.
          </SectionLede>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <PostsList />
      </Section>

      <Section tone="ink" size="lg">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Eyebrow tone="light">Monthly playbook</Eyebrow>
            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] text-foreground leading-[1.05]">
              One growth playbook per month. Zero spam.
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              A single, edited email with the best of what we&apos;re reading, building, and
              recommending. Unsubscribe anytime.
            </p>
          </div>
          <div className="lg:col-span-5">
            <NewsletterForm source="insights_page" />
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
