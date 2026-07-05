import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const rows = [
  {
    id: 1,
    title: "The Flychella Framework",
    author: "BAZ Strategy Team",
    description:
      "A six-stage model for building agency growth engines: Attract, Convert, Deliver, Expand, Refer, and Advocate. Includes playbooks for each stage with measurable outcomes.",
    url: "https://example.com/frameworks/flychella",
    tags: ["growth", "strategy", "retention"],
  },
  {
    id: 2,
    title: "The Agent Maturity Model",
    author: "BAZ Research",
    description:
      "A five-level maturity curve for agency AI adoption — from manual workflows to fully autonomous agent swarms. Helps firms benchmark their automation readiness and plan investments.",
    url: "https://example.com/frameworks/agent-maturity",
    tags: ["AI", "automation", "benchmarking"],
  },
  {
    id: 3,
    title: "Pipeline Velocity Scorecard",
    author: "BAZ Ops",
    description:
      "A diagnostic toolkit for measuring and improving deal velocity across the full sales cycle. Includes templates for stage-level conversion analysis and bottleneck identification.",
    url: "https://example.com/frameworks/pipeline-velocity",
    tags: ["sales", "pipeline", "analytics"],
  },
  {
    id: 4,
    title: "Content Atomisation Blueprint",
    author: "BAZ Creative",
    description:
      "A systematic approach to breaking one high-value asset into dozens of channel-specific pieces — from long-form research to LinkedIn threads, newsletters, and shorts.",
    url: "https://example.com/frameworks/content-atomisation",
    tags: ["content", "distribution", "creative"],
  },
  {
    id: 5,
    title: "The Zero-Party Data Playbook",
    author: "BAZ Data Team",
    description:
      "Step-by-step guidance for designing interactive brand experiences — quizzes, preference centres, configurators — that collect zero-party data while delivering immediate user value.",
    url: "https://example.com/frameworks/zero-party-data",
    tags: ["data", "personalisation", "CX"],
  },
  {
    id: 6,
    title: "Retainer-to-Outcome Migration Map",
    author: "BAZ Business Design",
    description:
      "A transition framework for agencies shifting from time-based retainers to outcome-based pricing. Covers scoping, pricing models, client communication, and risk management.",
    url: "https://example.com/frameworks/retainer-to-outcome",
    tags: ["pricing", "business-model", "agency-ops"],
  },
  {
    id: 7,
    title: "Competitive Signal Quadrant",
    author: "BAZ Intelligence",
    description:
      "A four-quadrant matrix for classifying competitive intelligence signals by urgency and impact. Helps teams decide what to act on now, monitor, defer, or ignore.",
    url: "https://example.com/frameworks/signal-quadrant",
    tags: ["competitive-intel", "strategy", "prioritisation"],
  },
  {
    id: 8,
    title: "Creative Brief Generator Template",
    author: "BAZ Creative",
    description:
      "A structured brief template designed for AI-assisted ideation. Includes fields for brand voice parameters, audience segments, behavioural goals, and success metrics.",
    url: "https://example.com/frameworks/creative-brief",
    tags: ["creative", "briefing", "AI"],
  },
];

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = Math.min(Math.max(Number(searchParams.get("limit")) || 6, 1), 50);

  return NextResponse.json({ rows: rows.slice(0, limit) });
}
