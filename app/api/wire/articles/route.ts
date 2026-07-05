import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const articles = [
  {
    id: 1,
    title: "BAZ Intelligence Hub Reaches 10,000 Active Agency Users",
    source: "BAZ Wire",
    url: "https://example.com/baz-10k",
    excerpt:
      "The all-in-one competitive intelligence platform for marketing agencies has crossed the 10K user milestone, driven by demand for real-time market data.",
    published_at: "2026-07-01T06:00:00Z",
    category: "Product",
  },
  {
    id: 2,
    title: "Google's Latest Algorithm Update Targets AI-Generated Content Farms",
    source: "Search Engine Daily",
    url: "https://example.com/google-algo-update",
    excerpt:
      "The September core update introduces new heuristics for detecting low-value AI content. Agencies relying on volume-based SEO strategies may see volatility.",
    published_at: "2026-06-30T09:00:00Z",
    category: "SEO",
  },
  {
    id: 3,
    title: "WPP Acquires Independent AI Consultancy for $400M",
    source: "Ad Age",
    url: "https://example.com/wpp-acquisition",
    excerpt:
      "The holding group's largest AI bet yet signals how traditional agencies are racing to embed agentic capabilities into their service lines.",
    published_at: "2026-06-28T14:30:00Z",
    category: "M&A",
  },
  {
    id: 4,
    title: "Meta Opens Threads API to Advertisers — What Agencies Need to Know",
    source: "Social Media Today",
    url: "https://example.com/threads-api",
    excerpt:
      "The long-awaited Threads API finally supports ad serving and analytics. Early tests show strong engagement for lifestyle and B2B creative.",
    published_at: "2026-06-26T11:45:00Z",
    category: "Social",
  },
  {
    id: 5,
    title: "Criteo Study: Retail Media Networks Will Hit $150B by 2028",
    source: "Retail Dive",
    url: "https://example.com/retail-media-150b",
    excerpt:
      "Retail media is growing faster than any other ad channel. Agencies that build RMN practices now are positioned for a decade of growth.",
    published_at: "2026-06-24T08:15:00Z",
    category: "Media",
  },
  {
    id: 6,
    title: "Supabase Launches Real-Time Sync for Edge Workloads",
    source: "TechCrunch",
    url: "https://example.com/supabase-realtime",
    excerpt:
      "The new real-time sync layer makes it easier for agency platforms to build live-collaboration features without managing WebSocket infrastructure.",
    published_at: "2026-06-22T15:00:00Z",
    category: "Technology",
  },
  {
    id: 7,
    title: "FTC Signals Tougher Stance on AI-Generated Endorsements",
    source: "AdExchanger",
    url: "https://example.com/ftc-ai-endorsements",
    excerpt:
      "New disclosure guidelines for synthetic media in advertising could reshape influencer campaigns. Compliance teams are taking notes.",
    published_at: "2026-06-20T10:30:00Z",
    category: "Regulation",
  },
  {
    id: 8,
    title: "HubSpot's Breeze AI Adds Agentic Workflows for SMBs",
    source: "CRM Weekly",
    url: "https://example.com/hubspot-breeze-ai",
    excerpt:
      "HubSpot's latest update brings autonomous lead scoring, content personalisation, and email sequencing — directly competing with agency-managed stacks.",
    published_at: "2026-06-18T13:00:00Z",
    category: "Technology",
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 6, 1), 50);

  return NextResponse.json({ articles: articles.slice(0, limit) });
}
