import { Section, Eyebrow, SectionLede } from "@/components/ui/Section";
import { Breadcrumb } from "@/components/sections/Breadcrumb";
import { StickyCta } from "@/components/sections/StickyCta";
import { CtaBanner } from "@/components/marketing/CtaBanner";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "BAZ vs other agencies",
  description:
    "Honest comparison. What BAZ does that most agencies don't, what other agencies do that we don't, and where we're honest about being the wrong fit.",
  path: "/vs-others",
});

type CellValue = boolean | "mixed" | "rare";
type Dimension = { label: string; baz: CellValue; them: CellValue; note: string };

const dimensions: Dimension[] = [
  {
    label: "Senior team, no juniors",
    baz: true,
    them: "mixed",
    note: "Most agencies pitch seniors, staff juniors. We name our team and ship with them.",
  },
  {
    label: "Live client dashboard",
    baz: true,
    them: false,
    note: "The Marketing Hub. Real endpoints, not a PDF on the 15th.",
  },
  {
    label: "Outcome-based pricing",
    baz: true,
    them: "rare",
    note: "Pipeline added, ROAS, CAC. Tied to a real guarantee.",
  },
  {
    label: "Speed guarantee in writing",
    baz: true,
    them: false,
    note: "14 days or first month free. We've never paid out.",
  },
  {
    label: "Open methodology",
    baz: true,
    them: false,
    note: "Scoring formula, attribution model, the triangle. All in /methodology.",
  },
  {
    label: "Public POV (stance published)",
    baz: true,
    them: false,
    note: "Half the industry hedges. We publish positions, including the wrong ones.",
  },
  {
    label: "Source code visible to clients",
    baz: true,
    them: false,
    note: "Your Hub source code is yours to read, audit, and own.",
  },
  {
    label: "A la carte services",
    baz: false,
    them: true,
    note: "We sell engagements, not hours. If you want one channel for $2K/mo, we're not the right fit.",
  },
  {
    label: "Industry awards on the wall",
    baz: false,
    them: true,
    note: "Cannes, Effies, Webbys. We don't enter. We ship.",
  },
  {
    label: "Local-only (one city)",
    baz: false,
    them: true,
    note: "We work MENA, EU, US. Remote-first. No office, no lease, no overhead.",
  },
];

function Cell({ value }: { value: boolean | "mixed" | "rare" }) {
  if (value === true) return <span className="text-emerald-600 font-bold">✓</span>;
  if (value === false) return <span className="text-rose-500 font-bold">×</span>;
  if (value === "mixed") return <span className="text-amber-600 font-medium">mixed</span>;
  return <span className="text-amber-600 font-medium">rare</span>;
}

export default function VsOthersPage() {
  return (
    <>
      <Section tone="paper" size="lg">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "vs others" }]} />
        <div className="max-w-3xl">
          <Eyebrow>Honest comparison</Eyebrow>
          <h1 className="font-display text-display-2xl font-medium tracking-[-0.04em]">
            Where we win. Where we don&apos;t.
          </h1>
          <SectionLede>
            Other agencies do things we don&apos;t. We do things they don&apos;t. This page is so
            you can tell in five minutes whether we&apos;re the right fit — and so we don&apos;t
            waste your time if we&apos;re not.
          </SectionLede>
        </div>
      </Section>

      <Section tone="paper" size="lg">
        <div className="max-w-3xl mb-10">
          <h2 className="font-display text-display-lg font-medium tracking-[-0.03em]">
            The honest comparison
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Twelve dimensions, no marketing copy. If we miss, the row says so. If we win, the proof
            is in /case-studies.
          </p>
        </div>
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/70">
              <tr>
                <th className="text-left p-4 font-display font-medium tracking-[-0.02em]">
                  Dimension
                </th>
                <th className="text-center p-4 font-display font-medium w-20">BAZ</th>
                <th className="text-center p-4 font-display font-medium w-20">Typical</th>
                <th className="text-left p-4 font-display font-medium">Why it matters</th>
              </tr>
            </thead>
            <tbody>
              {dimensions.map((d, i) => (
                <tr key={d.label} className={i % 2 === 0 ? "" : "bg-muted/70/40"}>
                  <td className="p-4 font-medium text-foreground">{d.label}</td>
                  <td className="p-4 text-center">
                    <Cell value={d.baz} />
                  </td>
                  <td className="p-4 text-center">
                    <Cell value={d.them} />
                  </td>
                  <td className="p-4 text-muted-foreground">{d.note}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] mb-6">
            So, are we the right fit?
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-emerald-700 mb-2">
                Choose BAZ if
              </p>
              <ul className="space-y-2 text-sm text-emerald-900">
                <li>• You want senior judgment, not junior hours.</li>
                <li>• You want to see your data live, not in monthly reports.</li>
                <li>• You&apos;re willing to commit to a 90-day outcome.</li>
                <li>• You want to own the system we build.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-rose-700 mb-2">
                We&apos;re the wrong fit if
              </p>
              <ul className="space-y-2 text-sm text-rose-900">
                <li>• You want a single channel for a low monthly fee.</li>
                <li>• You want a Cannes Lions submission for your wall.</li>
                <li>• You don&apos;t have a CRM we can plug into.</li>
                <li>• You want hours billed, not outcomes delivered.</li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <CtaBanner serviceSlug="vs-others" serviceName="fit assessment" />
      <StickyCta />
    </>
  );
}
