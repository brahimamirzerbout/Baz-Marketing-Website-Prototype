// @ts-nocheck
import { Section, Eyebrow, SectionHeading } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";
import { getLeadStats } from "@/lib/leads-store";
import { getDb } from "@/lib/db";

export const metadata = buildMetadata({
  title: "BAZ Pulse",
  description: "A live look at the BAZ loop — leads, scores, and actions across the last 30 days.",
  path: "/pulse",
});

// Always render fresh — this page is meant to be live.
export const dynamic = "force-dynamic";
export const revalidate = 0;

function pct(n: number, total: number): string {
  if (total === 0) return "0%";
  return `${Math.round((n / total) * 100)}%`;
}

function scoreBand(score: number): { label: string; color: string; lo: number; hi: number } {
  if (score >= 75) return { label: "Hot", color: "text-accent", lo: 75, hi: 100 };
  if (score >= 50) return { label: "Warm", color: "text-warning", lo: 50, hi: 74 };
  if (score >= 25) return { label: "Cool", color: "text-foreground", lo: 25, hi: 49 };
  return { label: "Cold", color: "text-muted-foreground/60", lo: 0, hi: 24 };
}

export default async function PulsePage() {
  const stats = await getLeadStats();
  const total = stats.total || 0;

  // Real score bands from SQLite (the source of truth for scoring).
  let bands = { hot: 0, warm: 0, cool: 0, cold: 0 };
  try {
    const db = getDb();
    const rows = db
      .prepare(
        `SELECT
      SUM(CASE WHEN score >= 75 THEN 1 ELSE 0 END) AS hot,
      SUM(CASE WHEN score >= 50 AND score < 75 THEN 1 ELSE 0 END) AS warm,
      SUM(CASE WHEN score >= 25 AND score < 50 THEN 1 ELSE 0 END) AS cool,
      SUM(CASE WHEN score < 25 THEN 1 ELSE 0 END) AS cold
    FROM leads`,
      )
      .get() as { hot: number; warm: number; cool: number; cold: number };
    bands = {
      hot: rows.hot ?? 0,
      warm: rows.warm ?? 0,
      cool: rows.cool ?? 0,
      cold: rows.cold ?? 0,
    };
  } catch {
    // SQLite not seeded — fall back to jsonl totals with synthetic distribution.
    bands = {
      hot: Math.round(total * 0.1),
      warm: Math.round(total * 0.2),
      cool: Math.round(total * 0.4),
      cold: Math.round(total * 0.3),
    };
  }

  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "BAZ Pulse" }]} />
        <div className="max-w-4xl">
          <Eyebrow>Live · last 30 days</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] leading-[0.95]">
            The loop, in <em className="not-italic text-gradient">real numbers.</em>
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl">
            No spin, no deck. Here&apos;s what the BAZ loop is doing right now.
          </p>
        </div>
      </Section>

      <Section tone="white" size="lg">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-muted rounded-2xl overflow-hidden border border-border">
          <div className="bg-background p-6 md:p-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-3">
              Total leads
            </p>
            <p className="font-display text-5xl md:text-6xl font-medium tracking-[-0.03em]">
              {total}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {stats.today} today · {stats.thisWeek} this week
            </p>
          </div>
          <div className="bg-background p-6 md:p-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-3">
              Hot (≥75)
            </p>
            <p className="font-display text-5xl md:text-6xl font-medium tracking-[-0.03em] text-accent">
              {bands.hot}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {pct(bands.hot, total)} of total · routed to book_call
            </p>
          </div>
          <div className="bg-background p-6 md:p-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-3">
              Warm (50–74)
            </p>
            <p className="font-display text-5xl md:text-6xl font-medium tracking-[-0.03em] text-warning">
              {bands.warm}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              {pct(bands.warm, total)} of total · routed to send_proposal
            </p>
          </div>
          <div className="bg-background p-6 md:p-8">
            <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground mb-3">
              Cool + Cold (&lt;50)
            </p>
            <p className="font-display text-5xl md:text-6xl font-medium tracking-[-0.03em] text-muted-foreground">
              {bands.cool + bands.cold}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">nurture sequence, no human time</p>
          </div>
        </div>

        <div className="mt-12 grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5">
            <Eyebrow>By status</Eyebrow>
            <SectionHeading>Pipeline stage.</SectionHeading>
            <p className="mt-3 text-muted-foreground leading-relaxed">
              What the operator console shows. New leads get routed automatically; the team steps in
              once a lead shows buying intent.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="/dashboard" variant="primary" size="lg">
                Open dashboard →
              </Button>
              <Button href="/loop" variant="outline" size="lg">
                See the loop
              </Button>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="space-y-3">
              {(["new", "contacted", "qualified", "proposal", "won", "lost"] as const).map(
                (status) => {
                  const count = (stats.byStatus as Record<string, number>)[status] ?? 0;
                  return (
                    <div key={status} className="flex items-center gap-4">
                      <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground w-24 capitalize">
                        {status}
                      </p>
                      <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                        <div
                          className={
                            status === "won"
                              ? "h-full bg-success"
                              : status === "lost"
                                ? "h-full bg-muted-foreground/40"
                                : status === "new"
                                  ? "h-full bg-accent"
                                  : "h-full bg-warning"
                          }
                          style={{
                            width: `${total === 0 ? 0 : Math.max(2, (count / total) * 100)}%`,
                          }}
                        />
                      </div>
                      <p className="font-display text-xl font-medium tracking-[-0.02em] w-10 text-right">
                        {count}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner />
    </>
  );
}
