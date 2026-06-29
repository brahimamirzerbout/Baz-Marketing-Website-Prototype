import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { StickyCta } from '@/components/sections/StickyCta';
import { CtaBanner } from '@/components/marketing/CtaBanner';
import { buildMetadata, jsonLd, faqLd } from '@/lib/seo';

const methodologyFaqs = [
  {
    q: 'How fast will I see pipeline movement?',
    a: 'First measurable artifact in your Hub within 14 calendar days — paid guarantee. Most clients see movement inside 60 days. The 90-day commitment is when we report on the $200K+ pipeline target.',
  },
  {
    q: 'Who actually does the work?',
    a: 'A senior partner on your account. No juniors, no offshore pod, no account manager in between. The person in the kickoff is the person shipping the work.',
  },
  {
    q: 'What if my team disagrees with the plan?',
    a: 'The 90-day plan is a working document, not a deck. Your team edits it. We pre-commit to the targets and the measurement method, then iterate against it every two weeks.',
  },
  {
    q: 'How do I see what the Hub is actually doing?',
    a: 'Every client watches their own loop live. Score updates, attribution events, and Nova reasoning audit are visible in real time. You see the work, not a status report about the work.',
  },
];

export async function generateMetadata() {
  return buildMetadata({
    title: 'The BAZ Methodology',
    description:
      'How BAZ plans, ships, scores, and learns. The Triangle Loop: a closed system that runs Marketing ↔ Sales ↔ Nova on its own. Open source, in public, with the math.',
    path: '/methodology',
    image: '/methodology-og?title=The%20BAZ%20Methodology&subtitle=Diagnose.%20Plan.%20Ship.%20Score.%20Learn.',
  });
}

const phases = [
  {
    n: '01',
    name: 'Diagnose',
    days: 'Week 1',
    outputs: ['Pipeline audit', 'Attribution map', 'Score model', 'Persona refresh'],
    body:
      'We start every engagement with a 5-day diagnostic. We pull your CRM, ad accounts, GA4, and server-side events. We map the funnel. We score 100 leads by hand. We tell you what we found before we invoice.',
  },
  {
    n: '02',
    name: 'Plan',
    days: 'Week 2',
    outputs: ['90-day roadmap', 'Channel mix', 'Budget allocation', 'Test backlog'],
    body:
      'A 90-day plan with owners, budgets, and exit criteria. Not a deck — a working document your team edits. We pre-commit to the targets and what we measure against them.',
  },
  {
    n: '03',
    name: 'Ship',
    days: 'Weeks 3-10',
    outputs: ['Weekly deliverables', 'Live attribution', 'Daily reporting'],
    body:
      'Two-week sprints. Each sprint ships something measurable: a campaign live, a landing page converting, an A/B test reading, a sequence running. No "we are strategizing."',
  },
  {
    n: '04',
    name: 'Score & Learn',
    days: 'Every 60s, in public',
    outputs: ['Loop ticks visible to client', 'Nova reasoning audit', 'Attribution graph'],
    body:
      'The Marketing Hub triangle ticks every 60 seconds: score leads, route to sequences, advance steps, log outcomes. Every client can watch their own loop live.',
  },
];

const scoreFormula = `
score = clamp(
  30 * recency_decay          // 0..30  (decays over 30 days)
+ 5  * unique_channels        // 0..20  (paid + organic + email + sales + referral)
+ 2  * total_touches          // 0..20
+ 10 * sales_touches          // 0..20
+ engagement_pts              // 0..10  (opens + clicks + replies)
, 0, 100)
`.trim();

const pricing = [
  {
    name: 'Velocity',
    duration: '90 days',
    commitment: 'Add $200K to pipeline',
    guarantee: 'Or month 4 free',
    deliverables: ['Full diagnostic', '90-day plan', '2 channels active', 'Weekly reporting', 'Hub access'],
  },
  {
    name: 'Compounding',
    duration: '6 months',
    commitment: '4× pipeline coverage',
    guarantee: 'Or we keep going free until you do',
    deliverables: ['Everything in Velocity', 'All 4 channels', 'A/B test cadence', 'Nova reasoning audit', 'Dedicated senior partner'],
  },
  {
    name: 'Sovereign',
    duration: '12 months',
    commitment: 'Build + run your own Hub',
    guarantee: 'You own the asset when we leave',
    deliverables: ['Everything in Compounding', 'Custom Hub instance', 'Source code transfer', 'Team training', 'Quarterly board review'],
  },
];

export default function MethodologyPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Methodology' }]} />
        <div className="max-w-4xl">
          <Eyebrow>BAZ Methodology</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Diagnose. Plan. Ship. Score. Learn.
          </h1>
          <SectionLede>
            Most agencies sell hours. We sell outcomes. Here&apos;s exactly how
            we get there — and what we measure ourselves against.
          </SectionLede>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href="/contact?topic=methodology" variant="primary" size="lg" trackAs="meth_book">
              Book a diagnostic →
            </Button>
            <Button href="/marketing-hub" variant="outline" size="lg" trackAs="meth_hub">
              See the Hub live
            </Button>
          </div>
        </div>
      </Section>

      {/* 4 phases */}
      <Section tone="paper" size="lg">
        <Eyebrow>The 4 phases</Eyebrow>
        <SectionHeading>What you get, when, and how.</SectionHeading>
        <div className="mt-10 space-y-6">
          {phases.map((p) => (
            <div key={p.n} className="grid md:grid-cols-12 gap-6 border-t border-ink-100 pt-6">
              <div className="md:col-span-1">
                <div className="font-display text-5xl font-medium tracking-[-0.04em] text-accent">{p.n}</div>
              </div>
              <div className="md:col-span-3">
                <div className="font-display text-2xl font-medium tracking-[-0.02em]">{p.name}</div>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mt-1">{p.days}</div>
              </div>
              <div className="md:col-span-5">
                <p className="text-ink-700 leading-relaxed">{p.body}</p>
              </div>
              <div className="md:col-span-3">
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500 mb-2">Outputs</div>
                <ul className="space-y-1 text-sm">
                  {p.outputs.map((o) => (
                    <li key={o} className="flex gap-2">
                      <span className="text-accent">•</span>
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Score formula in public */}
      <Section tone="ink" size="lg">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-4">
              In public · The scoring formula
            </p>
            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] text-paper">
              The math behind the lead score.
            </h2>
            <p className="mt-4 text-paper-300">
              No black boxes. The Marketing Hub scores every contact against this
              formula. You can read the source, audit the inputs, and override the
              weights for your business.
            </p>
          </div>
          <div className="lg:col-span-7">
            <pre className="rounded-2xl bg-paper text-ink-900 p-6 font-mono text-xs leading-relaxed overflow-x-auto whitespace-pre dark:bg-ink-900 dark:text-paper">
{scoreFormula}
            </pre>
            <p className="mt-4 text-xs text-paper-400 dark:text-ink-500 font-mono">
              Source: <code>src/lib/triangle.ts → scoreContact()</code> · live at <code>/api/triangle/health</code>
            </p>
          </div>
        </div>
      </Section>

      {/* Speed guarantee + outcome pricing */}
      <Section tone="paper" size="lg">
        <div className="max-w-3xl">
          <Eyebrow>Outcome pricing</Eyebrow>
          <h2 className="font-display text-display-xl font-medium tracking-[-0.04em]">
            Three tiers. One promise: measurable outcomes.
          </h2>
          <p className="mt-4 text-lg text-ink-600">
            Every BAZ engagement has a written outcome, a measurement method, and
            a guarantee. We get paid for what moves, not what we did.
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-3 gap-4">
          {pricing.map((tier) => (
            <div key={tier.name} className="rounded-2xl border border-ink-100 p-6 flex flex-col">
              <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink-500">{tier.duration}</div>
              <div className="font-display text-2xl font-medium tracking-[-0.02em] mt-1">{tier.name}</div>
              <div className="mt-3 text-sm text-ink-700">
                <span className="font-medium text-ink-900">Commitment:</span> {tier.commitment}
              </div>
              <div className="mt-1 text-sm">
                <span className="font-medium text-accent">Guarantee:</span> {tier.guarantee}
              </div>
              <ul className="mt-4 space-y-1 text-sm flex-1">
                {tier.deliverables.map((d) => (
                  <li key={d} className="flex gap-2">
                    <span className="text-accent">✓</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
              <Button href={`/contact?topic=${tier.name.toLowerCase()}`} variant="outline" size="sm" className="mt-6" trackAs={`meth_${tier.name.toLowerCase()}`}>
                Inquire →
              </Button>
            </div>
          ))}
        </div>
      </Section>

      {/* Speed guarantee */}
      <Section tone="paper" size="md">
        <div className="rounded-3xl bg-ink-900 text-paper p-8 md:p-12 dark:bg-ink-900 dark:text-paper">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-3">
                Speed guarantee
              </p>
              <h2 className="font-display text-display-lg font-medium tracking-[-0.03em]">
                Ship in 14 days. Or first month free.
              </h2>
              <p className="mt-3 text-paper-300">
                From kickoff, the first measurable artifact is live in your Hub within
                14 calendar days. Miss it, and month one is on us. We&apos;ve never paid out.
              </p>
            </div>
            <div className="md:col-span-1 text-center md:text-right">
              <div className="font-display text-7xl font-medium tracking-[-0.04em] text-accent">14d</div>
              <div className="text-xs text-paper-400 mt-1 font-mono uppercase tracking-wider">or month 1 free</div>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ — visible to humans, schema to crawlers */}
      <Section tone="white" size="md">
        <div className="max-w-3xl">
          <Eyebrow>Questions founders ask</Eyebrow>
          <SectionHeading>What you actually want to know.</SectionHeading>
          <SectionLede>
            We&apos;ve answered these 1,000 times. Here they are, written down.
          </SectionLede>
        </div>
        <div className="mt-10 max-w-3xl divide-y divide-ink-100 border-t border-b border-ink-100">
          {methodologyFaqs.map((faq, i) => (
            <details key={i} className="group py-5">
              <summary className="flex items-start justify-between gap-4 cursor-pointer list-none">
                <h3 className="font-display text-lg md:text-xl font-medium tracking-[-0.01em] text-ink-900">
                  {faq.q}
                </h3>
                <span
                  aria-hidden
                  className="mt-1 inline-flex items-center justify-center w-7 h-7 rounded-full border border-ink-200 text-ink-700 transition-transform group-open:rotate-45 shrink-0"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 text-ink-700 leading-relaxed max-w-2xl">{faq.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <CtaBanner serviceSlug="methodology" serviceName="diagnostic" />

      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLd(faqLd(methodologyFaqs))} />
      <StickyCta />
    </>
  );
}