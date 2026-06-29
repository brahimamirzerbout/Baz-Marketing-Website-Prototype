/**
 * Hero variant resolver. Pure server-side: maps a `?icp=` query param
 * (or another matching signal) to a headline + subhead pair.
 *
 * Server-rendered so we don't need to add `"use client"` or a Suspense
 * boundary just to read searchParams.
 */
import type { ReactNode } from "react";

export type HeroIcp = "saas" | "ecommerce" | "fintech" | "media";

export interface HeroVariant {
  /** The icp slug, or null for the default. */
  icp: HeroIcp | null;
  /** Human-readable industry label shown in the "Personalised for …" pill. */
  icpLabel: string | null;
  /** Headline (h1) — includes the gradient span around the headline number. */
  headline: ReactNode;
  /** Subhead paragraph below the h1. */
  subhead: ReactNode;
}

const DEFAULT_HEADLINE = (
  <>
    Add <span className="not-italic text-gradient">$200K+</span> to pipeline in 90 days — or pay nothing for month four.
  </>
);

const DEFAULT_SUBHEAD = (
  <>
    BAZ is a <span className="font-medium text-ink-900">senior-only growth partner</span> that runs your{' '}
    <span className="font-medium text-ink-900">owned, earned, paid, and data</span> channels on the BAZ Marketing Hub —
    an autonomous system that scores leads, runs sales cadences, and reports attribution without a junior in sight.
  </>
);

const VARIANTS: Record<HeroIcp, Omit<HeroVariant, "icp">> = {
  saas: {
    icpLabel: "B2B SaaS",
    headline: (
      <>
        Add <span className="not-italic text-gradient">$200K+</span> SaaS pipeline in 90 days.{' '}
        <span className="font-medium text-ink-700">Senior-only, on the Hub.</span>
      </>
    ),
    subhead: (
      <>
        The BAZ Marketing Hub scores PQLs from every touchpoint, routes them into sales sequences, and reports attribution — all on a{' '}
        <span className="font-medium text-ink-900">60-second loop</span>. No juniors. No quarterly decks. Pipeline you can forecast.
      </>
    ),
  },
  ecommerce: {
    icpLabel: "DTC & E-commerce",
    headline: (
      <>
        Cut eCommerce CAC <span className="not-italic text-gradient">30–60%</span> in two quarters.{' '}
        <span className="font-medium text-ink-700">Senior-only, on the Hub.</span>
      </>
    ),
    subhead: (
      <>
        Server-side tracking that survives iOS, a creative matrix that ships weekly, and lifecycle flows that compound LTV. The Hub runs the loop so your senior team spends time on positioning, not ops.
      </>
    ),
  },
  fintech: {
    icpLabel: "FinTech",
    headline: (
      <>
        Trust-first FinTech growth, on the <span className="not-italic text-gradient">BAZ Marketing Hub.</span>
      </>
    ),
    subhead: (
      <>
        Category-defining SERPs, compliance-grade content, and attribution that survives regulator scrutiny. Senior operators only — no hand-off to a junior after the pitch.
      </>
    ),
  },
  media: {
    icpLabel: "Media & Creators",
    headline: (
      <>
        Reach + retention for media brands.{' '}
        <span className="font-medium text-ink-700">On the Hub, on a 60s loop.</span>
      </>
    ),
    subhead: (
      <>
        Lifecycle flows that compound subscribers, partnerships that compound reach, and a lead-score loop that tells you which creators are converting — updated every minute.
      </>
    ),
  },
};

/** Normalise user-supplied icp value into a known variant key, or null. */
function normaliseIcp(raw: string | null | undefined): HeroIcp | null {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();
  if (s === "saas" || s === "b2b" || s === "b2b-saas") return "saas";
  if (s === "ecommerce" || s === "ecom" || s === "dtc") return "ecommerce";
  if (s === "fintech" || s === "finance") return "fintech";
  if (s === "media" || s === "creator" || s === "publishers") return "media";
  return null;
}

/**
 * Resolve a hero variant from a raw searchParams.icp value.
 * Pass `null` or an unrecognised value to get the default.
 */
export function resolveHeroVariant(rawIcp: string | null | undefined): HeroVariant {
  const icp = normaliseIcp(rawIcp);
  if (!icp) {
    return {
      icp: null,
      icpLabel: null,
      headline: DEFAULT_HEADLINE,
      subhead: DEFAULT_SUBHEAD,
    };
  }
  return {
    icp,
    icpLabel: VARIANTS[icp].icpLabel,
    headline: VARIANTS[icp].headline,
    subhead: VARIANTS[icp].subhead,
  };
}
