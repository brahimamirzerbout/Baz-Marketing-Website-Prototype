import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { StickyCta } from "@/components/sections/StickyCta";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "BAZ stance on agentic AI",
    description:
      "BAZ stance: agentic AI is leverage, not a replacement for senior judgment. What we ship with agents, what we refuse to ship, and where we draw the line.",
    path: "/stance",
    image:
      "/stance-og?title=BAZ%20stance%20on%20agentic%20AI&subtitle=What%20we%20ship%2C%20what%20we%20refuse.",
  });
}

export default function StancePage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Stance" }]} />
        <div className="max-w-3xl">
          <Eyebrow>BAZ Stance · Q3 2026</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Agentic AI is leverage. It is not a senior.
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed">
            Half the industry is selling you AI that replaces your team. The other half is selling
            AI that&apos;s actually a junior with a chatbot UI. We&apos;re publishing our stance so
            you can tell which is which.
          </p>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <div className="grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 prose prose-lg max-w-none">
            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em]">
              What we ship
            </h2>
            <ul className="space-y-3 text-foreground leading-relaxed">
              <li>
                <strong>Autonomous execution loops</strong> — the Marketing Hub scores leads, routes
                them, steps them, and reports outcomes without a human in the chain. That&apos;s
                leverage.
              </li>
              <li>
                <strong>Reasoning you can audit</strong> — every Nova answer comes with sources,
                confidence, and the SQL it ran. You can re-run it. Black boxes are junior behavior.
              </li>
              <li>
                <strong>Senior judgment, accelerated</strong> — AI does the busywork so our partners
                spend time on positioning, creative, and client outcomes. That&apos;s where the
                leverage lives.
              </li>
              <li>
                <strong>Source code, in the open</strong> — the Hub is built in public. Clients see
                the scoring formula, the attribution model, the cadences. Trust through
                transparency.
              </li>
            </ul>

            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] mt-12">
              What we refuse to ship
            </h2>
            <ul className="space-y-3 text-foreground leading-relaxed">
              <li>
                <strong>AI-generated creative presented as human work.</strong> If we used a model
                to draft a headline, we say so. Misattribution is a junior sin.
              </li>
              <li>
                <strong>Personalized outreach at scale without consent.</strong> Cold email + LLM is
                spam with a GPU. We don&apos;t do it. Sequences are opt-in only.
              </li>
              <li>
                <strong>Dashboards that look live but are screenshots.</strong> If we say it&apos;s
                live, it&apos;s live. The status card on the BAZ homepage hits a real endpoint every
                60 seconds.
              </li>
              <li>
                <strong>Black-box attribution.</strong> "AI figured it out" is not a measurement.
                Server-side events, named channels, weighted touchpoints. The math is open.
              </li>
            </ul>

            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] mt-12">
              What we&apos;re still figuring out
            </h2>
            <p className="text-foreground leading-relaxed">
              We&apos;re not the finished article. We&apos;re publishing this so the next time a
              vendor pitches you &quot;AI-native,&quot; you can ask the three questions that matter:{" "}
              <em>What runs autonomously? What can you audit? What&apos;s the source?</em> If they
              can&apos;t answer in one sentence, they don&apos;t have it.
            </p>

            <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] mt-12">
              The disagreement we welcome
            </h2>
            <p className="text-foreground leading-relaxed">
              If you think the senior-only model is wrong — if you believe a junior with the right
              prompts is a viable operating model — we&apos;d like to hear it. Not to argue, but to
              learn. The worst outcome is nobody having a position because everyone&apos;s hedging.
            </p>
            <p className="text-foreground leading-relaxed mt-4">
              <a
                href="mailto:zerboutbrahimamir@gmail.com?subject=BAZ%20stance%20response"
                className="text-accent font-medium hover:underline"
              >
                Reply with your disagreement →
              </a>
            </p>
          </div>

          <aside className="lg:col-span-4">
            <div className="sticky top-24 rounded-2xl border border-border p-6 bg-muted/70">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-3">
                The 3 questions
              </p>
              <ol className="space-y-3 text-sm">
                <li>
                  <strong className="text-foreground">1.</strong> What runs autonomously?
                </li>
                <li>
                  <strong className="text-foreground">2.</strong> What can you audit?
                </li>
                <li>
                  <strong className="text-foreground">3.</strong> Where&apos;s the source?
                </li>
              </ol>
              <p className="mt-4 text-xs text-muted-foreground">
                If they can&apos;t answer in one sentence, they don&apos;t have it.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBanner serviceSlug="stance" serviceName="positioning audit" />
      <StickyCta />
    </>
  );
}
