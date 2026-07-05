import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const macro = [
  {
    id: 1,
    label: "AI Agent Adoption in Agencies",
    direction: "up",
    category: "Technology",
    description:
      "Agency adoption of AI agents for research, drafting, and campaign optimisation continues to accelerate, with 63% of mid-sized firms now running at least one agentic workflow.",
  },
  {
    id: 2,
    label: "Programmatic Content Spend",
    direction: "up",
    category: "Media",
    description:
      "Investment in programmatic content engines grew 28% quarter-over-quarter as brands shift budgets from static pages to dynamic, data-driven asset generation.",
  },
  {
    id: 3,
    label: "Third-Party Cookie Reliance",
    direction: "down",
    category: "Data",
    description:
      "Dependency on third-party cookies continues its steep decline, with first- and zero-party data strategies becoming table stakes for personalisation.",
  },
  {
    id: 4,
    label: "Fractional Executive Hires",
    direction: "up",
    category: "Talent",
    description:
      "Fractional CMO and fractional CTO engagements hit an all-time high as companies seek flexible leadership without full-time overhead.",
  },
  {
    id: 5,
    label: "Agency Retainer Length",
    direction: "stable",
    category: "Business",
    description:
      "Average retainer duration has stabilised at 8–10 months after years of contraction, signalling a return to longer-term partnership models.",
  },
  {
    id: 6,
    label: "Regulatory Pressure on AI Content",
    direction: "up",
    category: "Regulation",
    description:
      "Governments worldwide are introducing disclosure requirements for AI-generated marketing content, raising compliance costs for agencies.",
  },
  {
    id: 7,
    label: "Zero-Party Data Collection",
    direction: "up",
    category: "Data",
    description:
      "Brands investing in interactive experiences that solicit voluntary data are seeing 2.5× higher conversion rates than passive collection methods.",
  },
  {
    id: 8,
    label: "Search Volume for 'Agency vs Software'",
    direction: "down",
    category: "SEO",
    description:
      "The debate is cooling as the market accepts that the winning model is a hybrid — agency expertise delivered through software-enabled services.",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const view = searchParams.get("view") || "all";

  let results = macro;
  if (view !== "all") {
    results = macro.filter((t) => t.category.toLowerCase() === view.toLowerCase());
  }

  return NextResponse.json({ macro: results });
}
