import { Section, Eyebrow, SectionHeading, SectionLede } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { buildMetadata } from "@/lib/seo";

const HUB_URL =
  process.env.NEXT_PUBLIC_HUB_URL || "";

export const metadata = buildMetadata({
  title: "Client portal",
  description:
    "BAZ client portal. Live access to your Marketing Hub: pipeline, attribution, triangle loop state, your team's weekly ship log.",
  path: "/portal/client",
  noindex: true, // clients-only
});

export default function ClientPortal() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Portal" }]} />
        <div className="max-w-3xl">
          <Eyebrow>Client portal</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Your growth, live.
          </h1>
          <SectionLede>
            One link. Real-time access to your Marketing Hub. No &quot;let me pull the deck.&quot;
            No screenshots of dashboards. The same Hub your BAZ team is working in, every day.
          </SectionLede>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              href={`${HUB_URL}/login`}
              external
              variant="primary"
              size="lg"
              trackAs="portal_login"
            >
              Open your Hub →
            </Button>
            <Button href="/contact" variant="outline" size="lg" trackAs="portal_support">
              Need access? Talk to your partner
            </Button>
          </div>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <Eyebrow>What you get</Eyebrow>
        <SectionHeading>Five surfaces. No login friction.</SectionHeading>
        <div className="mt-8 grid md:grid-cols-2 gap-4">
          {[
            {
              t: "Pipeline cockpit",
              d: "Active deals, velocity, win rate, forecast. Updated every minute.",
            },
            {
              t: "Triangle loop",
              d: "Live state of the autonomous loop — score → route → step → close.",
            },
            {
              t: "Attribution",
              d: "Multi-touch attribution by channel. Know what actually moved the P&L.",
            },
            {
              t: "Marketing Dive",
              d: "Industry intelligence ingested daily. Your team reads it before planning.",
            },
            { t: "Sequence log", d: "Every enrollment, every step, every reply. Auditable." },
            {
              t: "Weekly ship log",
              d: "What your BAZ team shipped this week, what shipped before that, what's next.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border border-border p-5">
              <div className="font-display text-lg font-medium tracking-[-0.02em]">{c.t}</div>
              <p className="text-sm text-muted-foreground mt-1">{c.d}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
