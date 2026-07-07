import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { StickyCta } from "@/components/sections/StickyCta";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Card } from "@/components/ui/Card";
import { buildMetadata } from "@/lib/seo";
import Link from "next/link";

// The Marketing Hub lives on a different port locally. In production
// we'd point this at marketing.yourdomain.com. Edit once here.
const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://marketing-hub-roan.vercel.app";

export const metadata = buildMetadata({
  title: "Marketing Hub",
  description:
    "BAZ Marketing Hub — an autonomous command center for marketing, sales, and finance. Lead scoring, sales sequences, attribution, the daily Marketing Dive brief, and a triangle loop that runs itself.",
  path: "/marketing-hub",
});

const features = [
  {
    title: "Autonomous lead loop",
    body: 'Every contact is scored from touchpoints, routed into the right cadence, stepped through, and re-scored — every 60 seconds. No "did the SDR see this?" Slack messages.',
    href: "/triangle",
  },
  {
    title: "Marketing Dive, ingested daily",
    body: "Daily journalism from the marketing industry, cached into the Hub, tagged by topic and format, ready for the Triangle to cite when it scores.",
    href: "/dive",
  },
  {
    title: "Multi-touch attribution",
    body: "Every touchpoint — paid, organic, email, sales, referral — recorded with weights so the cockpit can show which channel actually closed the deal.",
    href: "/attribution",
  },
  {
    title: "Sales sequences that learn",
    body: "Multi-step cadences with reply/booking probabilities tuned per segment. Pause on reply, escalate on open, stop on conversion.",
    href: "/sequences",
  },
  {
    title: "Nova reasoning layer",
    body: "A deterministic reasoning engine that classifies questions, pulls the right tables, and answers with sources, confidence, and next actions.",
    href: "/nova",
  },
  {
    title: "The Cockpit",
    body: "Pipeline velocity, weekly wins, forecast confidence, momentum score — one screen a CMO can open on Monday morning.",
    href: "/cockpit",
  },
];

const stats = [
  { k: "60s", v: "Loop tick — score → route → step → close" },
  { k: "127", v: "Industry articles ingested from Marketing Dive" },
  { k: "$507k", v: "Pipeline value under management" },
  { k: "4.0", v: "Pipeline coverage ratio (target ≥ 3×)" },
];

const screenshots = [
  { label: "Cockpit", href: "/cockpit", desc: "One screen, exec-level" },
  { label: "Triangle Loop", href: "/triangle", desc: "Live autonomous state" },
  { label: "Marketing Dive", href: "/dive", desc: "Industry intelligence" },
  { label: "Sequences", href: "/sequences", desc: "Cadences + replies" },
];

export default function MarketingHubPage() {
  return (
    <>
      {/* Hero */}
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Marketing Hub" }]} />
        <div className="max-w-4xl">
          <Eyebrow>Product · BAZ Marketing Hub</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Your marketing, sales, and finance — running in a closed loop.
          </h1>
          <SectionLede>
            BAZ Marketing Hub is the operating system under everything we ship for clients. Lead
            scoring, sales cadences, attribution, the daily industry brief, and a triangle loop that
            scores, routes, sequences, and closes — every 60 seconds, without a human in the chain.
          </SectionLede>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button href={HUB_URL} external variant="primary" size="lg" trackAs="hub_open">
              Open the Hub →
            </Button>
            <Button
              href="/contact?topic=marketing-hub"
              variant="outline"
              size="lg"
              trackAs="hub_demo"
            >
              Book a 30-min demo
            </Button>
          </div>
        </div>
      </Section>

      {/* Stat band */}
      <Section tone="ink" size="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((s) => (
            <div key={s.k}>
              <div className="font-display text-display-md font-medium text-foreground tracking-[-0.03em]">
                {s.k}
              </div>
              <div className="text-sm text-muted-foreground mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* What it does */}
      <Section tone="paper" size="lg">
        <Eyebrow>What's inside</Eyebrow>
        <SectionHeading>Built for operators, not for show.</SectionHeading>
        <SectionLede>
          Six systems, one triangle. Each one ships a real outcome — pipeline, deals, intelligence —
          and they feed each other so the next run is smarter than the last.
        </SectionLede>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <Card key={f.title} className="p-6 h-full flex flex-col">
              <h3 className="font-display text-xl font-medium tracking-[-0.02em] mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{f.body}</p>
              <div className="mt-4 pt-4 border-t border-border">
                <Link href={f.href} className="text-sm text-accent font-medium hover:underline">
                  See it in the Hub →
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* The Triangle — diagram + prose */}
      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5">
            <Eyebrow>The triangle</Eyebrow>
            <SectionHeading>Marketing ↔ Sales ↔ Nova</SectionHeading>
            <SectionLede>
              Three systems, one loop. Marketing scores leads. Sales sequences them. Nova reasons
              about both — and the whole triangle ticks on its own.
            </SectionLede>
          </div>
          <div className="lg:col-span-7">
            <div className="relative aspect-square max-w-md mx-auto">
              {/* SVG triangle diagram */}
              <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden>
                <defs>
                  <linearGradient id="grad-edge" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ff5b1f" />
                    <stop offset="100%" stopColor="#ff8b4d" />
                  </linearGradient>
                </defs>
                <polygon
                  points="200,40 360,320 40,320"
                  fill="none"
                  stroke="url(#grad-edge)"
                  strokeWidth="2"
                />
                {/* Nodes */}
                <circle cx="200" cy="40" r="44" fill="#0a0a0a" stroke="#ff5b1f" strokeWidth="2" />
                <circle cx="360" cy="320" r="44" fill="#0a0a0a" stroke="#ff5b1f" strokeWidth="2" />
                <circle cx="40" cy="320" r="44" fill="#0a0a0a" stroke="#ff5b1f" strokeWidth="2" />
                <text
                  x="200"
                  y="46"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="16"
                  fontFamily="serif"
                >
                  Marketing
                </text>
                <text
                  x="360"
                  y="326"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="16"
                  fontFamily="serif"
                >
                  Sales
                </text>
                <text
                  x="40"
                  y="326"
                  textAnchor="middle"
                  fill="#fff"
                  fontSize="16"
                  fontFamily="serif"
                >
                  Nova
                </text>
                {/* Loop arrows (curved) */}
                <path
                  d="M 175 75  C 230 150, 320 220, 345 285"
                  fill="none"
                  stroke="#ff5b1f"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 55  285 C 80  220, 170 150, 225 75"
                  fill="none"
                  stroke="#ff5b1f"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M 200 90  C 200 200, 200 200, 200 270"
                  fill="none"
                  stroke="#ff5b1f"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                {/* Edge labels */}
                <text x="280" y="180" fill="#ff5b1f" fontSize="11" fontFamily="monospace">
                  score → route
                </text>
                <text x="120" y="180" fill="#ff5b1f" fontSize="11" fontFamily="monospace">
                  reason → act
                </text>
                <text x="208" y="200" fill="#ff5b1f" fontSize="11" fontFamily="monospace">
                  step
                </text>
              </svg>
            </div>
          </div>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {[
            {
              t: "1. Score",
              d: "Touchpoint weight + recency + channel mix + email engagement → 0–100 lead score.",
            },
            {
              t: "2. Route",
              d: "Score ≥ 50 → enroll into the least-loaded active sequence. Balances the queue.",
            },
            {
              t: "3. Step",
              d: "Each enrollment advances daily. Reply pauses. Booking promotes the deal to qualified.",
            },
            {
              t: "4. Close",
              d: "Negotiation deals with prob ≥ 80 auto-close as won. Stale deals auto-lost at 45d.",
            },
            {
              t: "5. Learn",
              d: "Wins feed back into Nova. Tomorrow's scoring is smarter than today's.",
            },
            {
              t: "6. Report",
              d: "Pipeline value, velocity, wins/day, loop health — one cockpit, no spreadsheets.",
            },
          ].map((s) => (
            <div key={s.t} className="border-l-2 border-accent pl-4">
              <h4 className="font-display text-lg font-medium tracking-[-0.02em]">{s.t}</h4>
              <p className="text-sm text-muted-foreground mt-1">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Screenshots / live links */}
      <Section tone="paper" size="lg">
        <Eyebrow>Live, in your browser</Eyebrow>
        <SectionHeading>Open any screen directly.</SectionHeading>
        <SectionLede>
          The Hub is a real product running on real data. Click any of these to open the live page
          in a new tab.
        </SectionLede>
        <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {screenshots.map((s) => (
            <a
              key={s.label}
              href={`${HUB_URL}${s.href}`}
              target="_blank"
              rel="noreferrer"
              className="group block p-4 rounded-2xl border border-border hover:border-accent hover:bg-muted/70 transition-colors"
            >
              <div className="font-display text-base font-medium tracking-[-0.02em] group-hover:text-accent">
                {s.label}
              </div>
              <div className="text-xs text-muted-foreground mt-1">{s.desc}</div>
              <div className="mt-3 text-xs text-muted-foreground/60 font-mono">
                {HUB_URL}
                {s.href}
              </div>
            </a>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <CtaBanner serviceSlug="marketing-hub" serviceName="Marketing Hub" />
      <StickyCta />
    </>
  );
}
