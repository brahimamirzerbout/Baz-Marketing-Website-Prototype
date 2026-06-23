import { Hero, PillarGrid, ServicesOverview, HowWeWork, KpiBand, Framework, CaseStudies, LogoMarquee, Testimonials, InsightsPreview, FinalCta } from '@/components/sections';
import { LiveAgentDemo } from '@/components/marketing/LiveAgentDemo';
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
      <PillarGrid />
      <ServicesOverview />
      <HowWeWork />
      <KpiBand />
      <Framework />
      <CaseStudies />
      <section className="py-20 md:py-28 bg-white border-y border-ink-100 bg-mesh">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-12 gap-10 mb-10">
            <div className="lg:col-span-7">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-3">AI execution layer</p>
              <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] max-w-2xl">
                Senior strategy. AI <em className="not-italic text-accent">speed.</em>
              </h2>
              <p className="mt-5 text-lg text-ink-600 max-w-2xl leading-relaxed">
                Run a real agent right now — leads, content, analytics, or cold email. Every output
                you see is what a BAZ operator would deliver, only faster.
              </p>
            </div>
          </div>
          <LiveAgentDemo />
        </div>
      </section>
      <Testimonials />
      <InsightsPreview />
      <FinalCta />
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(professionalServiceLd())} />
    </>
  );
}
