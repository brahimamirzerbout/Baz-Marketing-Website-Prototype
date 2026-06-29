import { Hero, PillarGrid, PerformanceFeature, ServicesOverview, HowWeWork, KpiBand, Framework, CaseStudies, LogoMarquee, Testimonials, InsightsPreview, FinalCta, MarketingHubBanner, ProofNumbers, ReadNext, PipelineTicker, StickyCta } from '@/components/sections';
import { buildMetadata, jsonLd, professionalServiceLd } from '@/lib/seo';
import { resolveHeroVariant } from '@/lib/hero-variant';

export async function generateMetadata({
  searchParams,
}: {
  searchParams?: { icp?: string | string[] };
}) {
  const icpRaw = Array.isArray(searchParams?.icp) ? searchParams?.icp[0] : searchParams?.icp;
  const variant = resolveHeroVariant(icpRaw);
  const title = typeof variant.headline === 'string'
    ? variant.headline
    : (variant.icpLabel ? `Add $200K+ ${variant.icpLabel} pipeline` : 'Add $200K+ to pipeline in 90 days');
  const subtitle = variant.icpLabel
    ? `Personalised for ${variant.icpLabel} · BAZ Marketing Hub`
    : 'Senior-only growth partner · BAZ Marketing Hub';
  // Pre-build the OG query string with the variant's text so social previews match the page.
  const ogQuery = `?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(subtitle)}`;
  return buildMetadata({
    title,
    description: 'BAZ is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels — on the BAZ Marketing Hub. Strategy, execution, and reporting in one tightly integrated system. Or pay nothing for month four.',
    path: '/',
    image: `/og${ogQuery}`,
  });
}

export default function HomePage({
  searchParams,
}: {
  searchParams?: { icp?: string | string[] };
}) {
  const icpRaw = Array.isArray(searchParams?.icp) ? searchParams?.icp[0] : searchParams?.icp;
  const heroVariant = resolveHeroVariant(icpRaw);

  return (
    <>
      <Hero variant={heroVariant} />
      <MarketingHubBanner />
      <ProofNumbers />
      <LogoMarquee />
      <PerformanceFeature />
      <PillarGrid />
      <ServicesOverview />
      <HowWeWork />
      <KpiBand />
      <Framework />
      <CaseStudies />
      <Testimonials />
      <InsightsPreview />
      <ReadNext />
      <FinalCta />
      <StickyCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(professionalServiceLd())} />
    </>
  );
}
