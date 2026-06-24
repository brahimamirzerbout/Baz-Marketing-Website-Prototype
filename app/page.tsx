import { Hero, PillarGrid, PerformanceFeature, ServicesOverview, HowWeWork, KpiBand, Framework, CaseStudies, LogoMarquee, Testimonials, InsightsPreview, FinalCta } from '@/components/sections';
import { buildMetadata, jsonLd, professionalServiceLd } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Make growth predictable',
  description: 'BAZ is a senior-only growth partner that builds and manages your owned, earned, paid, and data channels. Strategy, execution, and reporting in one tightly integrated system.',
  path: '/',
});

export default function HomePage() {
  return (
    <>
      <Hero />
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
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(professionalServiceLd())} />
    </>
  );
}
