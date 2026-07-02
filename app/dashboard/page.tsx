// @ts-nocheck
import Link from "next/link";
import nextDynamic from "next/dynamic";
import { Section, Eyebrow } from "@/components/ui/Section";
import { StatusButtons } from "@/components/dashboard/StatusButtons";
import { getLeadStats, readLeadsWithStatus } from "@/lib/leads-store";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

// AgencyGraph uses motion/react (formerly framer-motion) which emits inline <style> tags during SSR
// that don't match the client output (escaped vs raw quotes). Skipping SSR
// here eliminates the hydration mismatch without changing the UI.
const AgencyGraph = nextDynamic(
  () => import("@/components/dashboard/AgencyGraph").then((m) => m.AgencyGraph),
  {
    ssr: false,
    loading: () => (
      <div className="aspect-[4/3] rounded-2xl bg-card border border-border animate-pulse" />
    ),
  },
);

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

type Tab = "leads" | "graph";

function parseTab(v: string | string[] | undefined): Tab {
  return v === "graph" ? "graph" : "leads";
}

function formatDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    });
  } catch {
    return iso;
  }
}

function relativeTime(iso: string): string {
  const t = new Date(iso).getTime();
  const diff = Date.now() - t;
  const min = Math.floor(diff / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const days = Math.floor(hr / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

const BUDGET_LABELS: Record<string, string> = {
  "<10k": "Under $10K",
  "10-25k": "$10–25K",
  "25-50k": "$25–50K",
  "50-100k": "$50–100K",
  "100k+": "$100K+",
  "not-sure": "Not sure",
};

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: { tab?: string | string[] };
}) {
  const tab = parseTab(searchParams?.tab);

  const [leads, stats] = await Promise.all([readLeadsWithStatus(), getLeadStats()]);

  const newLeads = leads.filter((l) => l.status === "new");
  const recent = leads.slice(0, 20);

  const replyRate = stats.total > 0 ? Math.round((stats.byStatus.replied / stats.total) * 100) : 0;

  return (
    <Section tone="paper" size="lg">
      <div className="flex items-start justify-between gap-4 flex-wrap mb-8">
        <div>
          <Eyebrow>BAZ · Internal</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em] mt-2">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Your cockpit. Leads, replies, and AI agent output will land here.
          </p>
        </div>
        <Link
          href="/admin"
          className="text-sm text-muted-foreground hover:text-foreground underline"
        >
          ← Admin home
        </Link>
      </div>

      {/* Stat strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
        <Stat
          label="Leads total"
          value={stats.total}
          hint={stats.today > 0 ? `+${stats.today} today` : "—"}
        />
        <Stat
          label="This week"
          value={stats.thisWeek}
          hint={stats.thisWeek > 0 ? `${stats.thisWeek} in last 7d` : "—"}
        />
        <Stat
          label="Need reply"
          value={stats.byStatus.new}
          hint={stats.byStatus.new > 0 ? "unread" : "inbox zero"}
          tone={stats.byStatus.new > 0 ? "warn" : "ok"}
        />
        <Stat
          label="Reply rate"
          value={`${replyRate}%`}
          hint={`${stats.byStatus.replied} replied · ${stats.byStatus.archived} archived`}
          tone={replyRate >= 50 ? "ok" : "neutral"}
        />
      </div>

      {/* Tab strip: Leads inbox OR Agency Graph (Obsidian-style) */}
      <div className="mb-6 flex items-center gap-1 rounded-full border border-border bg-card p-1 w-fit">
        <Link
          href="/dashboard?tab=leads"
          scroll={false}
          className={cn(
            "rounded-full px-4 h-9 inline-flex items-center text-sm font-medium transition-colors",
            tab === "leads"
              ? "bg-primary text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Leads
          <span className="ml-2 text-xs font-mono opacity-70">{stats.total}</span>
        </Link>
        <Link
          href="/dashboard?tab=graph"
          scroll={false}
          className={cn(
            "rounded-full px-4 h-9 inline-flex items-center text-sm font-medium transition-colors",
            tab === "graph"
              ? "bg-primary text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          Agency Graph
        </Link>
      </div>

      {/* Two-column main grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main column: Graph OR Leads inbox (CSS-hidden, no JSX conditional) */}
        <div className="lg:col-span-2">
          {/* Leads inbox */}
          <div className={tab === "leads" ? "block" : "hidden"}>
            <div className="flex items-baseline justify-between mb-4">
              <h2 className="font-display text-2xl font-medium tracking-[-0.02em]">Leads</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>
                  <span className="font-mono">{stats.byStatus.new}</span> new
                </span>
                <span>·</span>
                <span>
                  <span className="font-mono">{stats.byStatus.replied}</span> replied
                </span>
                <span>·</span>
                <span>
                  <span className="font-mono">{stats.byStatus.archived}</span> archived
                </span>
              </div>
            </div>

            {leads.length === 0 ? (
              <div className="bg-background rounded-2xl border border-border p-12 text-center">
                <p className="text-muted-foreground max-w-md mx-auto">
                  No leads yet. When someone submits the contact form at{" "}
                  <Link href="/contact" className="underline">
                    /contact
                  </Link>
                  , they&apos;ll land here.
                </p>
                <p className="text-xs text-muted-foreground/60 mt-3 font-mono">data/leads.jsonl</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recent.map((lead) => (
                  <article
                    key={lead.id}
                    className="bg-background rounded-2xl border border-border p-5 md:p-6 hover:border-border transition-colors"
                  >
                    <header className="flex flex-wrap items-start justify-between gap-3 mb-3">
                      <div className="min-w-0">
                        <h3 className="font-display text-lg font-medium tracking-[-0.01em]">
                          {lead.name}
                          {lead.company ? (
                            <span className="text-muted-foreground/60 font-normal ml-2 text-sm">
                              · {lead.company}
                            </span>
                          ) : null}
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground mt-1">
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-accent hover:underline font-mono"
                          >
                            {lead.email}
                          </a>
                          {lead.website ? (
                            <>
                              <span>·</span>
                              <a
                                href={lead.website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="hover:text-foreground underline"
                              >
                                {lead.website.replace(/^https?:\/\//, "")}
                              </a>
                            </>
                          ) : null}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <time
                          className="text-xs text-muted-foreground font-mono"
                          dateTime={lead.receivedAt}
                          title={formatDate(lead.receivedAt)}
                        >
                          {relativeTime(lead.receivedAt)}
                        </time>
                        <span className="text-[10px] text-muted-foreground/60 font-mono">
                          {lead.id.slice(-8)}
                        </span>
                      </div>
                    </header>

                    <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed mb-4">
                      {lead.message}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-border">
                      <dl className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                        {lead.budget ? (
                          <>
                            <div>
                              <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 inline mr-1">
                                Budget
                              </dt>
                              <dd className="inline">
                                {BUDGET_LABELS[lead.budget] ?? lead.budget}
                              </dd>
                            </div>
                          </>
                        ) : null}
                        <div>
                          <dt className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 inline mr-1">
                            Source
                          </dt>
                          <dd className="inline font-mono">{lead.source}</dd>
                        </div>
                      </dl>
                      <div className="flex items-center gap-3">
                        <a
                          href={`mailto:${lead.email}?subject=Re: Your BAZ brief (${lead.id})`}
                          className="inline-flex items-center gap-2 px-4 h-9 rounded-full bg-primary text-foreground text-xs font-medium hover:bg-primary/90 transition-colors"
                        >
                          Reply by email →
                        </a>
                        <StatusButtons leadId={lead.id} initial={lead.status} />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* Agency Graph (Obsidian-style) */}
          <div className={tab === "graph" ? "block" : "hidden"}>
            <AgencyGraph caption="How every BAZ engagement flows from cold outreach to compounding referrals." />
          </div>
        </div>

        {/* Sidebar (1/3) */}
        <aside className="space-y-6">
          <div className="bg-background rounded-2xl border border-border p-5">
            <h3 className="font-display text-lg font-medium tracking-[-0.01em] mb-3">AI agent</h3>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span className="text-sm text-foreground">Not connected</span>
            </div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              When the LangGraph agent is running, it will write actions, insights, and conversation
              drafts here in real time.
            </p>
          </div>

          <div className="bg-background rounded-2xl border border-border p-5">
            <h3 className="font-display text-lg font-medium tracking-[-0.01em] mb-3">By budget</h3>
            {Object.keys(stats.byBudget).length === 0 ? (
              <p className="text-xs text-muted-foreground">No budget data yet.</p>
            ) : (
              <ul className="space-y-2">
                {Object.entries(stats.byBudget)
                  .sort(([, a], [, b]) => b - a)
                  .map(([k, v]) => (
                    <li key={k} className="flex items-center justify-between text-sm">
                      <span className="text-foreground">{BUDGET_LABELS[k] ?? k}</span>
                      <span className="font-mono text-foreground">{v}</span>
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="bg-background rounded-2xl border border-border p-5">
            <h3 className="font-display text-lg font-medium tracking-[-0.01em] mb-3">
              Other tools
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/admin/analytics" className="hover:text-accent">
                  Analytics →
                </Link>
              </li>
              <li>
                <Link href="/admin/canva" className="hover:text-accent">
                  Canva →
                </Link>
              </li>
              <li>
                <Link href="/admin/monitors" className="hover:text-accent">
                  Monitors →
                </Link>
              </li>
              <li>
                <Link href="/admin/leads" className="hover:text-accent">
                  Leads (full table) →
                </Link>
              </li>
            </ul>
          </div>

          <div className="bg-primary text-foreground rounded-2xl p-5">
            <h3 className="font-display text-lg font-medium tracking-[-0.01em] mb-2">
              Quick action
            </h3>
            <p className="text-xs text-muted-foreground mb-4">
              Open the contact form to see exactly what your leads see.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-4 h-9 rounded-full bg-accent text-white text-xs font-medium hover:bg-primary/90 transition-colors"
            >
              Open /contact →
            </Link>
          </div>
        </aside>
      </div>

      <footer className="mt-16 pt-8 border-t border-border flex items-center justify-between text-xs text-muted-foreground/60">
        <span>
          Stored at <span className="font-mono">data/leads.jsonl</span>
        </span>
        <span>
          Lead notifications:{" "}
          {site.email ? (
            <a href={`mailto:${site.email}`} className="hover:text-foreground underline">
              {site.email}
            </a>
          ) : (
            "unset"
          )}
        </span>
      </footer>
    </Section>
  );
}

function Stat({
  label,
  value,
  hint,
  tone = "neutral",
}: {
  label: string;
  value: number | string;
  hint?: string;
  tone?: "ok" | "warn" | "neutral";
}) {
  const valueClass =
    tone === "warn" ? "text-accent" : tone === "ok" ? "text-emerald-700" : "text-foreground";
  return (
    <div className="bg-background rounded-2xl border border-border p-4">
      <p className="font-mono uppercase tracking-[0.18em] text-[10px] text-muted-foreground/60 mb-1">
        {label}
      </p>
      <p className={`font-display text-3xl font-medium tracking-[-0.02em] ${valueClass}`}>
        {value}
      </p>
      {hint ? <p className="text-xs text-muted-foreground mt-1">{hint}</p> : null}
    </div>
  );
}
