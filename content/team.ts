import type { TeamMember } from "@/types";

/**
 * BAZ team members.
 *
 * Brahim ZERBOUT is the founder. Other entries are role definitions
 * showing the senior-partner structure BAZ operates with. As the team
 * grows, replace each entry with the actual partner filling that role.
 */
export const team: TeamMember[] = [
  {
    name: "Brahim ZERBOUT",
    role: "Founder · Strategy",
    bio: "Sets the bar on growth strategy and the senior-team model. Has shipped plans for 60+ brands across MENA, EU, and the US.",
    initials: "BZ",
    color: "hsl(41, 72%, 68%)",  // gold — brand accent
  },
  {
    name: "Partner · SEO & Content",
    role: "Senior Partner · SEO & Content",
    bio: "Editorial SEO and topical authority for category-defining SERPs. Owns the content engine end-to-end.",
    initials: "SE",
    color: "hsl(210, 75%, 60%)",  // info blue
  },
  {
    name: "Partner · Paid & Lifecycle",
    role: "Senior Partner · Paid & Lifecycle",
    bio: "Paid media and lifecycle marketing. Believes tracking is the moat. Ships server-side + CAPI on every account.",
    initials: "PL",
    color: "hsl(38, 85%, 58%)",  // amber — caution/paid
  },
  {
    name: "Partner · Brand & Creative",
    role: "Senior Partner · Brand & Creative",
    bio: "Brand systems and creative direction tied to the metric they own. From naming to launch toolkit.",
    initials: "BC",
    color: "hsl(41, 50%, 50%)",  // gold dimmed
  },
  {
    name: "Partner · Analytics",
    role: "Senior Partner · Analytics",
    bio: "Tracking, attribution, and dashboards that execs actually open. GA4, server-side GTM, MMM.",
    initials: "AN",
    color: "hsl(145, 70%, 55%)",  // emerald — success/data
  },
  {
    name: "Partner · Web",
    role: "Senior Partner · Web",
    bio: "Performance-first web builds on Next.js and headless CMS. Sub-1.5s LCP is the floor, not the ceiling.",
    initials: "WB",
    color: "hsl(0, 0%, 42%)",  // neutral — structure
  },
];
