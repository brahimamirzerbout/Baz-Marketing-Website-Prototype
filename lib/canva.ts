/**
 * Brand kit + design templates for the in-app Canva.
 * Server-safe (no DOM, no React).
 */

export type BrandKit = {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  ink: string;
  paper: string;
  displayFont: string;
  bodyFont: string;
};

export const defaultBrand: BrandKit = {
  name: "BAZ",
  primary: "#0e0e10",
  secondary: "#f5f1ea",
  accent: "#b87adb",
  ink: "#0e0e10",
  paper: "#faf7f2",
  displayFont: "Fraunces, Georgia, serif",
  bodyFont: "Inter, system-ui, sans-serif",
};

export const templates = [
  {
    id: "og-card",
    name: "OG card",
    w: 1200,
    h: 630,
    desc: "For blog & case study social previews.",
  },
  {
    id: "case-cover",
    name: "Case study cover",
    w: 1600,
    h: 900,
    desc: "Hero image for case study pages.",
  },
  {
    id: "ad-square",
    name: "Ad — square",
    w: 1080,
    h: 1080,
    desc: "Instagram / LinkedIn carousel opener.",
  },
  { id: "ad-story", name: "Ad — story", w: 1080, h: 1920, desc: "Vertical story / reel cover." },
  { id: "quote-card", name: "Quote card", w: 1200, h: 1200, desc: "Client testimonial tile." },
  { id: "banner-wide", name: "Banner — wide", w: 1920, h: 480, desc: "LinkedIn / Twitter header." },
] as const;

export type TemplateId = (typeof templates)[number]["id"];
