// @ts-nocheck
import {
  Hero,
  PillarGrid,
  PerformanceFeature,
  ServicesOverview,
  HowWeWork,
  KpiBand,
  Framework,
  CaseStudies,
  LogoMarquee,
  Testimonials,
  InsightsPreview,
  FinalCta,
  MarketingHubBanner,
  ProofNumbers,
  ReadNext,
  PipelineTicker,
  StickyCta,
} from "@/components/sections";
import { SectionErrorBoundary } from "@/components/ui/SectionErrorBoundary";
import { buildMetadata, jsonLd, professionalServiceLd } from "@/lib/seo";
import { resolveHeroVariant } from "@/lib/hero-variant";

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { icp?: string | string[] };
}) {
  const icpRaw = Array.isArray(searchParams?.icp) ? searchParams?.icp[0] : searchParams?.icp;
  const variant = resolveHeroVariant(icpRaw);
  const title =
    typeof variant.headline === "string"
      ? variant.headline
      : variant.icpLabel
        ? `Add $200K+ ${variant.icpLabel} pipeline`
        : "Add $200K+ to pipeline in 90 days";
  const taglineStr = typeof variant.tagline === "string" ? variant.tagline : variant.icpLabel ? `Senior-only, on the Hub` : "Or pay nothing for month four";
  const subtitle = `${taglineStr} · BAZ Marketing Hub`;
  // Pre-build the OG query string with the variant's text so social previews match the page.
  const ogQuery = `?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;
  return buildMetadata({
    title,
    description:
      "BAZ is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels — on the BAZ Marketing Hub. Strategy, execution, and reporting in one tightly integrated system. Or pay nothing for month four.",
    path: "/",
    image: `/og${ogQuery}`,
  });
}

export default function HomePage({ searchParams }: { searchParams?: { icp?: string | string[] } }) {
  const icpRaw = Array.isArray(searchParams?.icp) ? searchParams?.icp[0] : searchParams?.icp;
  const heroVariant = resolveHeroVariant(icpRaw);

  return (
    <>
      <SectionErrorBoundary name="Hero"><Hero variant={heroVariant} /></SectionErrorBoundary>
      <SectionErrorBoundary name="MarketingHubBanner"><MarketingHubBanner /></SectionErrorBoundary>
      <SectionErrorBoundary name="ProofNumbers"><ProofNumbers /></SectionErrorBoundary>
      <SectionErrorBoundary name="LogoMarquee"><LogoMarquee /></SectionErrorBoundary>
      <SectionErrorBoundary name="PerformanceFeature"><PerformanceFeature /></SectionErrorBoundary>
      <SectionErrorBoundary name="PillarGrid"><PillarGrid /></SectionErrorBoundary>
      <SectionErrorBoundary name="ServicesOverview"><ServicesOverview /></SectionErrorBoundary>
      <SectionErrorBoundary name="HowWeWork"><HowWeWork /></SectionErrorBoundary>
      <SectionErrorBoundary name="KpiBand"><KpiBand /></SectionErrorBoundary>
      <SectionErrorBoundary name="Framework"><Framework /></SectionErrorBoundary>
      <SectionErrorBoundary name="CaseStudies"><CaseStudies /></SectionErrorBoundary>
      <SectionErrorBoundary name="Testimonials"><Testimonials /></SectionErrorBoundary>
      <SectionErrorBoundary name="InsightsPreview"><InsightsPreview /></SectionErrorBoundary>
      <SectionErrorBoundary name="ReadNext"><ReadNext /></SectionErrorBoundary>
      <SectionErrorBoundary name="FinalCta"><FinalCta /></SectionErrorBoundary>
      <SectionErrorBoundary name="StickyCta"><StickyCta /></SectionErrorBoundary>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLd(professionalServiceLd())}
      />
    </>
  );
}
