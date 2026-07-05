import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const articles = [
  {
    id: 1,
    title: "Why Programmatic SEO Is Eating the Agency Playbook",
    source: "Agency Insider",
    url: "https://example.com/programmatic-seo",
    excerpt:
      "Agencies that aren't building programmatic content engines are already behind. Here's how the smartest firms are scaling thought leadership with automation.",
    published_at: "2026-06-28T10:00:00Z",
    category: "SEO",
  },
  {
    id: 2,
    title: "The Death of the Funnel: Why Brands Are Moving to Flywheel Models",
    source: "Marketing Weekly",
    url: "https://example.com/flywheel-models",
    excerpt:
      "Linear funnels are giving way to flywheel models that prioritise retention and advocacy. We unpack the data behind the shift.",
    published_at: "2026-06-25T08:30:00Z",
    category: "Strategy",
  },
  {
    id: 3,
    title: "How Top Agencies Use AI Briefs to Cut Creative Rework by 40%",
    source: "Creative Ops Report",
    url: "https://example.com/ai-briefs",
    excerpt:
      "A deep dive into the briefing tools and prompts that separated high-performing creative teams from the rest in Q2.",
    published_at: "2026-06-22T14:15:00Z",
    category: "AI & Automation",
  },
  {
    id: 4,
    title: "Zero-Party Data Is the New Gold Standard for Personalisation",
    source: "CX Today",
    url: "https://example.com/zero-party-data",
    excerpt:
      "With third-party cookies crumbling, forward-looking brands are building experiences around data customers volunteer willingly.",
    published_at: "2026-06-19T09:45:00Z",
    category: "Data",
  },
  {
    id: 5,
    title: "The Rise of the fractional CMO: A $50B Market in the Making",
    source: "Agency Insider",
    url: "https://example.com/fractional-cmo",
    excerpt:
      "More companies are hiring fractional chief marketers. We look at what this means for agency partnerships and retainer models.",
    published_at: "2026-06-16T11:00:00Z",
    category: "Business",
  },
  {
    id: 6,
    title: "LinkedIn Is the New SEO Battleground — Here's the Data",
    source: "Social Capital",
    url: "https://example.com/linkedin-seo",
    excerpt:
      "Organic reach on LinkedIn is surging for agency content. New data reveals which formats and posting cadences drive the most pipeline.",
    published_at: "2026-06-13T07:20:00Z",
    category: "Social",
  },
  {
    id: 7,
    title: "How BAZ Clients Are Achieving 3× pipeline velocity with AI Agents",
    source: "BAZ Research",
    url: "https://example.com/baz-pipeline-velocity",
    excerpt:
      "Early adopters of agentic orchestration are seeing dramatic acceleration in deal velocity. Case studies inside.",
    published_at: "2026-06-10T16:00:00Z",
    category: "AI & Automation",
  },
  {
    id: 8,
    title: "Service-as-Software: The Business Model Reshaping Agencies",
    source: "Future of Services",
    url: "https://example.com/service-as-software",
    excerpt:
      "The line between agency service and SaaS product is blurring. Here's how hybrid models create recurring revenue and higher valuations.",
    published_at: "2026-06-07T12:30:00Z",
    category: "Business",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 6, 1), 50);

  return NextResponse.json({ articles: articles.slice(0, limit) });
}
