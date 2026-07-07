"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight, Loader2 } from "lucide-react";

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL || "https://marketing-hub-roan.vercel.app";

// Pages we already have as native baz/ pages (don't iframe these)
const NATIVE_PAGES = new Set(["/hub", "/hub/cockpit", "/hub/triangle", "/hub/nova"]);

// Page metadata for nicer headers
const PAGE_META: Record<string, { title: string; desc: string }> = {
  "/hub/sequences": {
    title: "Sequences",
    desc: "Sales cadences that learn — pause on reply, escalate on open",
  },
  "/hub/attribution": {
    title: "Attribution",
    desc: "Multi-touch revenue attribution across every channel",
  },
  "/hub/analytics": {
    title: "Analytics",
    desc: "Tracking, dashboards, and exec reports you actually open",
  },
  "/hub/seo": {
    title: "SEO Toolkit",
    desc: "Technical SEO, keywords, content gaps, SERP tracking",
  },
  "/hub/emails": { title: "Email Builder", desc: "Design, build, and send email campaigns" },
  "/hub/landing-pages": {
    title: "Landing Pages",
    desc: "Build, publish, and A/B test landing pages",
  },
  "/hub/wire": { title: "The Wire", desc: "Industry intelligence, scored and ranked" },
  "/hub/dive": { title: "Marketing Dive", desc: "Daily marketing journalism, ingested and tagged" },
  "/hub/trends": { title: "Trends", desc: "Macro and micro trend tracking across markets" },
  "/hub/crm": { title: "CRM & Deals", desc: "Contacts, deals, pipeline, and sales workflow" },
  "/hub/audit": { title: "Audit", desc: "Full marketing audit — score every channel" },
  "/hub/billing": { title: "Billing", desc: "Invoices, subscriptions, and payment management" },
  "/hub/reports": { title: "Reports", desc: "Generate and export client-ready reports" },
  "/hub/settings": { title: "Settings", desc: "Workspace, team, integrations, and domains" },
  "/hub/campaigns": { title: "Campaigns", desc: "Plan, launch, and track marketing campaigns" },
  "/hub/funnels": { title: "Funnels", desc: "Funnel simulator with conversion modeling" },
  "/hub/ads": { title: "Ads Manager", desc: "Google, Meta, TikTok, LinkedIn ad management" },
  "/hub/automations": { title: "Automations", desc: "Build workflows that run themselves" },
  "/hub/experiments": { title: "A/B Tests", desc: "Experimentation with statistical rigor" },
  "/hub/retention": { title: "Retention", desc: "Cohort analysis and churn tracking" },
  "/hub/competitors": { title: "Competitors", desc: "Track and analyze competitor activity" },
  "/hub/personas": { title: "Personas", desc: "ICP definitions and buyer personas" },
  "/hub/segments": { title: "Segments", desc: "Audience segmentation and targeting" },
  "/hub/budget": { title: "Budget", desc: "Channel budget allocation and tracking" },
  "/hub/calendar": { title: "Content Calendar", desc: "Plan and schedule content across channels" },
  "/hub/studio": { title: "Social Studio", desc: "Create and schedule social media content" },
  "/hub/copy": { title: "Copy Generator", desc: "AI-powered copy generation with voice fitting" },
  "/hub/assets": { title: "Asset Library", desc: "Brand assets, images, and creative files" },
  "/hub/forms": { title: "Forms", desc: "Build forms and collect submissions" },
  "/hub/lead-magnets": { title: "Lead Magnets", desc: "Gated content and download management" },
  "/hub/inbox": { title: "Inbox", desc: "Unified communications inbox" },
  "/hub/testimonials": { title: "Testimonials", desc: "Collect and manage customer testimonials" },
  "/hub/surveys": { title: "Surveys (NPS)", desc: "NPS surveys and customer feedback" },
  "/hub/library": { title: "Library", desc: "Marketing frameworks and playbooks" },
  "/hub/brand": { title: "Brand Kit", desc: "Brand guidelines, colors, fonts, and assets" },
  "/hub/machine": { title: "Content Machine", desc: "Content production pipeline at scale" },
  "/hub/intelligence": { title: "Intelligence", desc: "AI-powered marketing intelligence" },
  "/hub/orchestrator": {
    title: "Orchestrator",
    desc: "Campaign orchestration and task management",
  },
  "/hub/marketplace": { title: "Marketplace", desc: "Connect with marketers and specialists" },
  "/hub/finance": { title: "Finance", desc: "P&L, cash flow, expenses, and payroll" },
  "/hub/empire": { title: "Empire", desc: "Build and manage your marketing empire" },
  "/hub/playbooks": { title: "Playbooks", desc: "Reusable marketing playbooks and templates" },
  "/hub/ideas": { title: "Ideas", desc: "Capture, score, and graduate marketing ideas" },
  "/hub/events": { title: "Events", desc: "Event management and registrations" },
  "/hub/webhooks": { title: "Webhooks", desc: "Webhook management and delivery logs" },
  "/hub/integrations": { title: "Integrations", desc: "Connect external tools and platforms" },
};

export default function HubEmbedPage() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  // If this is one of our native pages, don't render the embed
  if (NATIVE_PAGES.has(pathname)) {
    return null;
  }

  // Map /hub/xxx to the Hub's /xxx
  const hubPath = pathname.replace("/hub", "") || "/";
  const embedUrl = `${HUB_URL}${hubPath}`;
  const meta = PAGE_META[pathname] || {
    title: hubPath.split("/").pop() || "Hub",
    desc: "Marketing Hub page",
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex items-center justify-between"
      >
        <div>
          <p className="eyebrow-neutral mb-1">Marketing Hub</p>
          <h1 className="font-display text-2xl md:text-3xl font-medium text-foreground">
            {meta.title}
          </h1>
          <p className="text-sm text-muted-foreground/60 mt-1">{meta.desc}</p>
        </div>
        <a
          href={embedUrl}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 border border-ink-700 hover:border-border text-xs text-muted-foreground transition-colors whitespace-nowrap"
        >
          Open in full Hub
          <ArrowUpRight className="w-3 h-3" />
        </a>
      </motion.div>

      {/* Embed iframe */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="rounded-2xl overflow-hidden border border-ink-800 bg-primary relative"
        style={{ height: "calc(100vh - 220px)", minHeight: "500px" }}
      >
        {loading && (
          <div className="absolute inset-0 grid place-items-center bg-primary">
            <div className="flex flex-col items-center gap-3">
              <Loader2 className="w-6 h-6 text-foreground animate-spin" />
              <p className="text-sm text-muted-foreground/60">Loading {meta.title}…</p>
            </div>
          </div>
        )}
        <iframe
          src={embedUrl}
          className="w-full h-full border-0"
          onLoad={() => setLoading(false)}
          title={meta.title}
        />
      </motion.div>
    </div>
  );
}
