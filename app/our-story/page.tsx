import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { StickyCta } from '@/components/sections/StickyCta';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({
  title: 'Our story',
  description:
    'How BAZ went from a freelance collective to a four-person agency. The good years, the bad year, the Hub, and the senior-only model that won.',
  path: '/our-story',
});

const chapters = [
  {
    n: '01',
    title: 'The agency that wasn\'t',
    years: '2019',
    body:
      'BAZ started as a freelance collective — three senior operators, no overhead, no junior pipeline. Clients came because the work was good. Then the work got too good, and the calendar filled up. We were turning down work because we couldn\'t scale without breaking what made us valuable.',
  },
  {
    n: '02',
    title: 'The junior mistake',
    years: '2021',
    body:
      'We hired. Five juniors, a project manager, an account director. Revenue tripled in twelve months. Quality collapsed in six. The work went from "different" to "indistinguishable." Clients renewed out of habit, not conviction. We were profitable and we were empty.',
  },
  {
    n: '03',
    title: 'The unwind',
    years: '2022',
    body:
      'We let the juniors go. We stopped pitching services we couldn\'t senior-staff. We cut the agency from 11 to 4 people. Revenue dropped 40%. It was the right move. The remaining clients stayed because they wanted what we actually were, not what we pretended to be.',
  },
  {
    n: '04',
    title: 'The Hub',
    years: '2024',
    body:
      'We built the BAZ Marketing Hub because we were tired of writing the same monthly report by hand for the eighth time. The first version scored leads against touchpoints. The second routed them. The third stepped them through cadences. By the fourth, the whole loop ran without us. We realized we\'d built the junior pipeline back — but as software.',
  },
  {
    n: '05',
    title: 'Senior-only, by design',
    years: '2025',
    body:
      'Today BAZ is a four-person senior team with a Hub that does the busywork of a 30-person agency. We sell outcomes, not hours. We price on pipeline added, not bodies deployed. We publish our methodology, our scoring formula, and the code that runs the loop. Half the industry hedges. We don\'t.',
  },
  {
    n: '06',
    title: 'What we won\'t do',
    years: '2026',
    body:
      'We won\'t enter awards. We won\'t pitch a service we can\'t senior-staff. We won\'t pretend a junior is a senior. We won\'t bill hours. We won\'t lock clients into contracts. We won\'t show a dashboard that\'s actually a screenshot. If you want any of those, we\'re not the right fit — and our /vs-others page says so.',
  },
];

const numbers = [
  { v: '4',  l: 'Senior operators', sub: 'no junior pipeline' },
  { v: '0',  l: 'Active awards', sub: 'we ship, we don\'t enter' },
  { v: '60s', l: 'Hub loop tick', sub: 'the junior work, automated' },
  { v: '1',  l: 'Guarantee', sub: '14-day ship or month 1 free' },
];

export default function OurStoryPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Our story' }]} />
        <div className="max-w-3xl">
          <Eyebrow>The long version</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            How a freelance collective became a four-person agency that ships like a thirty.
          </h1>
          <SectionLede>
            A tell, not a pitch. The good years, the bad year, the year we built the Hub,
            and the part where we decided we&apos;d never go back to a junior pipeline.
          </SectionLede>
          <p className="mt-4 text-sm text-ink-500">
            Read time: ~6 minutes. Skip to the chapter you care about.
          </p>
        </div>
      </Section>

      {/* Numbers band */}
      <Section tone="ink" size="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {numbers.map((n) => (
            <div key={n.l}>
              <div className="font-display text-display-md font-medium text-paper tracking-[-0.03em]">{n.v}</div>
              <div className="text-sm text-paper mt-1">{n.l}</div>
              <div className="text-xs text-paper-400 mt-0.5">{n.sub}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Chapters */}
      <Section tone="paper" size="lg">
        <Eyebrow>Six chapters</Eyebrow>
        <SectionHeading>The shape of the work.</SectionHeading>
        <div className="mt-10 space-y-12">
          {chapters.map((c) => (
            <article key={c.n} className="grid md:grid-cols-12 gap-6 border-t border-ink-100 pt-8">
              <div className="md:col-span-2">
                <div className="font-display text-5xl font-medium tracking-[-0.04em] text-accent">
                  {c.n}
                </div>
                <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">
                  {c.years}
                </div>
              </div>
              <div className="md:col-span-10">
                <h2 className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                  {c.title}
                </h2>
                <p className="mt-4 text-lg text-ink-700 leading-relaxed">{c.body}</p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* The "we build in public" section */}
      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>Build in public</Eyebrow>
            <SectionHeading>The Hub is the receipt.</SectionHeading>
          </div>
          <div className="lg:col-span-7">
            <p className="text-ink-700 leading-relaxed">
              Most agencies tell you they&apos;re senior. We show you the system that proves it.
              The Marketing Hub is open for clients to read, audit, and eventually own. The
              scoring formula is on the methodology page. The cadence logic is in our code.
              The data is yours.
            </p>
            <p className="mt-4 text-ink-700 leading-relaxed">
              If you hire us, you don&apos;t hire a vendor. You get senior operators and a
              system they built in public. When you leave, you take the system with you.
              That&apos;s not a tagline. That&apos;s the whole pitch.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="/marketing-hub" className="px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-600 transition-colors">
                See the Hub live →
              </a>
              <a href="/methodology" className="px-5 py-2.5 rounded-full border border-ink-200 text-ink-900 text-sm font-medium hover:bg-paper-300 transition-colors">
                Read the methodology
              </a>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner serviceSlug="our-story" serviceName="intro call" />
      <StickyCta />
    </>
  );
}