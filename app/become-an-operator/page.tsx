import Link from 'next/link';
import type { Metadata } from 'next';
import { Section, Eyebrow } from '@/components/ui/Section';
import { CtaBanner } from '@/components/marketing/CtaBanner';

export const metadata: Metadata = {
  title: 'Become a BAZ Operator',
  description:
    'Run your own senior-only marketing agency on the BAZ platform. Near-zero overhead, ~85% margins. Five phases from launch to first client.',
};

const PHASES = [
  {
    n: '01',
    title: 'Become a real company',
    body: 'BAZ covers your domain, business cards, and t-shirt. You pick the name, set up the email, build the logo. By the end of week one you look like a business.',
    out: 'Domain · Cards · T-shirt',
  },
  {
    n: '02',
    title: 'Learn the platform cold',
    body: 'Sit with the platform. Map every piece. Build a sample site, sample email, sample ad. Be able to explain the whole lead-gen engine on a napkin.',
    out: 'Sample kit',
  },
  {
    n: '03',
    title: 'Frame the value prop',
    body: 'Clients don\'t buy websites. They buy more customers. Translate every feature into a result. Lock your 60-second explanation.',
    out: 'Pitch deck',
  },
  {
    n: '04',
    title: 'Scout 50 local businesses',
    body: 'Pick the niche — restaurants, plumbers, HVAC, dentists, gyms. Walk the neighborhood. Note what\'s broken. Build a list. Aim for 50.',
    out: 'Scout spreadsheet',
  },
  {
    n: '05',
    title: 'Walk in with a free sample',
    body: 'The killer move. Pay $60 to one-shot a mockup of THEIR website, then walk in and show it to them. Showing an owner their own new site closes deals.',
    out: 'Mockup → close',
  },
  {
    n: '06',
    title: 'Run the CRM',
    body: 'Every prospect into the pipeline immediately. Most sales happen on touch 3–7, not touch 1. Set a follow-up task on every lead.',
    out: 'Pipeline ops',
  },
  {
    n: '07',
    title: 'Put them on recurring',
    body: 'Email and ads run on the same ~$20/mo platform. Every monthly client is almost pure profit on top of what you already shipped.',
    out: 'Recurring revenue',
  },
];

const NUMBERS = [
  { tier: '8 sites/mo',   revenue: '$4,000',  profit: '$3,420' },
  { tier: '12 sites/mo',  revenue: '$6,000',  profit: '$5,140' },
  { tier: '20 sites/mo',  revenue: '$10,000', profit: '$8,580' },
];

const STACK = [
  'Ollama (~$20/mo) — AI features for every operator',
  'Vercel + Next.js — production-grade sites',
  'GitHub — version control, no exceptions',
  'Linear — your internal project board',
  'Stripe — billing + invoicing for clients',
  'Resend — outbound email',
  'Cal.com — booking',
];

export default function BecomeOperatorPage() {
  return (
    <>
      <Section tone="paper" size="xl">
        <div className="max-w-4xl">
          <Eyebrow>BAZ · Operator Track</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-6">
            Run your own senior-only agency.
            <br />
            <em className="italic text-accent">Near-zero overhead.</em>
          </h1>
          <p className="mt-8 text-lg md:text-2xl text-ink-600 leading-relaxed max-w-3xl">
            BAZ is the operator platform. You bring the hustle, we bring the engine: the website builder,
            the AI agents, the CRM, the lead capture. Cost to deliver one site: ~$60. What the market pays:
            hundreds or thousands. The spread is yours.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/signup?next=/console" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-ink-900 hover:bg-ink-800 text-paper font-medium">
              Apply to become an operator
            </Link>
            <Link href="#phases" className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-ink-200 hover:border-ink-900 font-medium">
              See the seven phases
            </Link>
          </div>
        </div>
      </Section>

      {/* Stack */}
      <Section tone="white" size="lg">
        <Eyebrow>What you get</Eyebrow>
        <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] max-w-3xl mt-4 mb-10">
          The stack you operate on.
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {STACK.map((s) => (
            <div key={s} className="bg-paper-50 rounded-2xl border border-ink-100 p-5">
              <p className="text-sm text-ink-700 leading-relaxed">{s}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Phases */}
      <Section tone="paper" size="lg" id="phases">
        <Eyebrow>The playbook</Eyebrow>
        <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] max-w-3xl mt-4 mb-12">
          Seven phases from launch to first client.
        </h2>
        <ol className="space-y-4">
          {PHASES.map((p) => (
            <li key={p.n} className="grid lg:grid-cols-12 gap-6 bg-paper-50 rounded-2xl border border-ink-100 p-6 md:p-8">
              <div className="lg:col-span-1 flex items-start">
                <span className="font-mono text-2xl font-medium text-accent">{p.n}</span>
              </div>
              <div className="lg:col-span-8">
                <h3 className="font-display text-2xl font-medium tracking-[-0.02em] mb-3">{p.title}</h3>
                <p className="text-ink-700 leading-relaxed">{p.body}</p>
              </div>
              <div className="lg:col-span-3 flex lg:justify-end items-start">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-paper-200 text-xs text-ink-700">
                  <span aria-hidden>↓</span> {p.out}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Money */}
      <Section tone="white" size="lg">
        <Eyebrow>The math</Eyebrow>
        <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] max-w-3xl mt-4 mb-10">
          Margins you can run on.
        </h2>
        <p className="text-ink-600 max-w-2xl mb-8">
          Assumes average website at $500, builder at $70 flat per site, $20/mo platform. Charge more and every number climbs.
        </p>
        <div className="overflow-hidden bg-paper-50 rounded-2xl border border-ink-100">
          <table className="w-full text-sm">
            <thead className="bg-ink-900 text-paper">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Volume</th>
                <th className="px-4 py-3 font-medium">Revenue</th>
                <th className="px-4 py-3 font-medium">Builder cost</th>
                <th className="px-4 py-3 font-medium">Your profit</th>
              </tr>
            </thead>
            <tbody>
              {NUMBERS.map((r, i) => (
                <tr key={r.tier} className={`border-t border-ink-100 ${i % 2 === 1 ? 'bg-paper-100/40' : ''}`}>
                  <td className="px-4 py-3 font-medium text-ink-900">{r.tier}</td>
                  <td className="px-4 py-3 text-ink-700 tabular-nums">{r.revenue}</td>
                  <td className="px-4 py-3 text-ink-500 tabular-nums">-${parseInt(r.revenue.replace(/[$,]/g,'')) * 0.14 | 0}</td>
                  <td className="px-4 py-3 font-medium text-accent tabular-nums">{r.profit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-sm text-ink-500">
          Email + ads management on top of the same platform stacks as recurring revenue at near-pure margin.
          5 clients × $300/mo = <b className="text-ink-900">$1,500/mo</b>. 10 clients × $400/mo = <b className="text-ink-900">$4,000/mo</b>.
        </p>
      </Section>

      {/* Bottom */}
      <Section tone="ink" size="lg">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <Eyebrow tone="light">The loop</Eyebrow>
            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] mt-4 text-paper">
              Look legit → learn the platform → scout local businesses → walk in with a free sample → put every lead in the CRM → close → ship → put them on recurring → repeat.
            </h2>
          </div>
          <div className="bg-paper-50 rounded-2xl p-8">
            <p className="font-display text-xl text-ink-900 leading-relaxed">
              The business already works on paper. Margins are huge. Overhead is ~$20/mo. There&rsquo;s
              no financial risk to figure out. The only question is how many local businesses you&rsquo;re
              willing to go talk to.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/signup?next=/console" className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-ink-900 hover:bg-ink-800 text-paper font-medium">
                Apply now
              </Link>
              <Link href="/contact" className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-ink-200 hover:border-ink-900 font-medium">
                Talk to us first
              </Link>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}