import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rows = [
  {
    id: 1,
    term: "Flywheel Model",
    definition:
      "A growth framework where customer momentum builds on itself — happy clients generate referrals, case studies, and advocacy that feed back into acquisition, replacing the linear top-of-funnel approach.",
    category: "Strategy",
  },
  {
    id: 2,
    term: "Programmatic SEO",
    definition:
      "The use of automated templates, structured data, and content generation to produce large volumes of targeted landing pages at scale, typically powered by a data feed and a rendering engine.",
    category: "SEO",
  },
  {
    id: 3,
    term: "Zero-Party Data",
    definition:
      "Data that a customer intentionally and proactively shares with a brand — such as preference quizzes, purchase intentions, or communication channel choices — offering the highest signal quality and privacy compliance.",
    category: "Data",
  },
  {
    id: 4,
    term: "Agentic Workflow",
    definition:
      "An automated process in which an AI agent plans, executes, and iterates on a multi-step task with minimal human intervention, such as researching a topic, drafting a brief, and routing it for review.",
    category: "AI",
  },
  {
    id: 5,
    term: "Fractional Executive",
    definition:
      "A part-time or contract-based C-suite leader (CMO, CTO, CFO) who works with multiple organisations simultaneously, providing high-level strategic direction without the cost of a full-time hire.",
    category: "Business",
  },
  {
    id: 6,
    term: "Service-as-Software",
    definition:
      "A business model that packages agency-style services inside a software product — clients pay a subscription for outcomes (e.g., content production, ad management) delivered through a technology platform.",
    category: "Business",
  },
  {
    id: 7,
    term: "Retail Media Network (RMN)",
    definition:
      "An advertising offering operated by a retailer that lets brands buy ad placements across the retailer's owned properties — e-commerce sites, apps, in-store screens — using the retailer's first-party shopper data.",
    category: "Media",
  },
  {
    id: 8,
    term: "Predictive Lead Scoring",
    definition:
      "A machine-learning technique that assigns a probability score to each lead based on behavioural, firmographic, and historical conversion data, enabling sales teams to prioritise high-intent contacts.",
    category: "AI",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 6, 1), 50);

  return NextResponse.json({ rows: rows.slice(0, limit) });
}
