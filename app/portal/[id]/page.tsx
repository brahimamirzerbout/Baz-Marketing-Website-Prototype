// @ts-nocheck
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { PortalView } from "@/components/marketing/PortalView";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Your plan",
  description: "Your BAZ routing plan based on the prompt you ran.",
  path: "/portal/[id]",
  noindex: true,
});

export default function PortalPage({ params }: { params: { id: string } }) {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Your plan" }]} />
        <div className="max-w-4xl">
          <Eyebrow>BAZ Portal</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] leading-[0.95]">
            Here&apos;s <em className="not-italic text-gradient">your plan.</em>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            Based on the prompt you ran, here&apos;s what happens next — and when.
          </p>
        </div>
      </Section>

      <PortalView id={params.id} />

      <CtaBanner />
    </>
  );
}
