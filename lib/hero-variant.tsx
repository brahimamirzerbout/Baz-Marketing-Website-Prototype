/**
 * Hero variant resolver. Pure server-side: maps a `?icp=` query param
 * (or another matching signal) to a headline + tagline pair.
 */
import type { ReactNode } from "react";

export type HeroIcp = "saas" | "ecommerce" | "fintech" | "media";

export interface HeroVariant {
  icp: HeroIcp | null;
  icpLabel: string | null;
  /** Headline — line 1, bold */
  headline: ReactNode;
  /** Tagline — line 2, softer */
  tagline: ReactNode;
  /** Subhead — for meta/OG only */
  subhead: ReactNode;
}

const DEFAULT_HEADLINE = (
  <>
    Add <span className="not-italic text-gradient">$200K+</span> pipeline in 90 days
  </>
);

const DEFAULT_TAGLINE = <>Or pay nothing for month four</>;

const DEFAULT_SUBHEAD = (
  <>
    BAZ is a senior-only growth partner that runs your owned, earned, paid, and data channels on the
    BAZ Marketing Hub — scores leads, runs cadences, reports attribution. No juniors.
  </>
);

const VARIANTS: Record<HeroIcp, Omit<HeroVariant, "icp">> = {
  saas: {
    icpLabel: "B2B SaaS",
    headline: (
      <>
        Add <span className="not-italic text-gradient">$200K+</span> SaaS pipeline in 90 days
      </>
    ),
    tagline: <>Senior-only. On the Hub.</>,
    subhead: (
      <>
        The BAZ Marketing Hub scores PQLs, routes them into sales sequences, and reports attribution
        on a 60-second loop. No juniors. Pipeline you can forecast.
      </>
    ),
  },
  ecommerce: {
    icpLabel: "DTC & E-commerce",
    headline: (
      <>
        Cut eCommerce CAC <span className="not-italic text-gradient">30–60%</span>
      </>
    ),
    tagline: <>In two quarters. Senior-only.</>,
    subhead: (
      <>
        Server-side tracking, weekly creative, lifecycle flows that compound LTV. The Hub runs the
        loop so your senior team focuses on positioning, not ops.
      </>
    ),
  },
  fintech: {
    icpLabel: "FinTech",
    headline: (
      <>
        FinTech growth on the{" "}
        <span className="not-italic text-gradient">BAZ Marketing Hub</span>
      </>
    ),
    tagline: <>Compliance-grade. Senior-only.</>,
    subhead: (
      <>
        Category-defining SERPs, compliance-grade content, attribution that survives regulator
        scrutiny. No hand-off to a junior after the pitch.
      </>
    ),
  },
  media: {
    icpLabel: "Media & Creators",
    headline: <>Reach + retention for media brands</>,
    tagline: <>On the Hub. On a 60s loop.</>,
    subhead: (
      <>
        Lifecycle flows that compound subscribers, partnerships that compound reach, a lead-score loop
        that tells you which creators convert — updated every minute.
      </>
    ),
  },
};

function normaliseIcp(raw: string | null | undefined): HeroIcp | null {
  if (!raw) return null;
  const s = raw.toLowerCase().trim();
  if (s === "saas" || s === "b2b" || s === "b2b-saas") return "saas";
  if (s === "ecommerce" || s === "ecom" || s === "dtc") return "ecommerce";
  if (s === "fintech" || s === "finance") return "fintech";
  if (s === "media" || s === "creator" || s === "publishers") return "media";
  return null;
}

export function resolveHeroVariant(rawIcp: string | null | undefined): HeroVariant {
  const icp = normaliseIcp(rawIcp);
  if (!icp) {
    return {
      icp: null,
      icpLabel: null,
      headline: DEFAULT_HEADLINE,
      tagline: DEFAULT_TAGLINE,
      subhead: DEFAULT_SUBHEAD,
    };
  }
  return {
    icp,
    icpLabel: VARIANTS[icp].icpLabel,
    headline: VARIANTS[icp].headline,
    tagline: VARIANTS[icp].tagline,
    subhead: VARIANTS[icp].subhead,
  };
}