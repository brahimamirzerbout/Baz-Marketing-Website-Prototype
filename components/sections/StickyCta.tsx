"use client";
/**
 * StickyCta — fixed bottom-bar mobile call-to-action.
 *
 * Pattern from the 2026 agency-site research: 41% of agency pages bury
 * the primary CTA below the mobile fold. Digital Applied's 2026 study of
 * 2,000 landing pages found sticky-bottom CTAs lift conversion +11%.
 *
 * Behavior:
 *   - Fixed to bottom, full width, visible only on mobile (md:hidden).
 *   - Single primary button → booking URL (from lib/site.ts).
 *   - Auto-hides when an element with id="hero-cta" scrolls into view
 *     (so we never show two CTAs at the same time on mobile).
 *   - z-50 to sit above most page content; we deliberately don't go higher
 *     than the cookie banner (which is z-[60] in the layout).
 *
 * Dependency: Hero.tsx wraps its primary CTA in an element with id="hero-cta".
 * If the hero CTA is rendered without that ID, this component stays visible
 * permanently on mobile (still functional, just slightly redundant).
 */
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export function StickyCta() {
  const [hidden, setHidden] = useState(false);
  const bookingHref = (site as any).bookOrMailto ?? site.bookingUrl ?? `mailto:${site.email}`;

  useEffect(() => {
    const target = document.getElementById("hero-cta");
    if (!target || typeof IntersectionObserver === "undefined") {
      // No hero-cta anchor found, or SSR + observer unavailable → stay visible.
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        // Hide the sticky bar while the hero CTA is at least 50% on-screen.
        for (const entry of entries) {
          setHidden(entry.isIntersecting);
        }
      },
      { threshold: [0, 0.5, 1] }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`md:hidden fixed inset-x-0 bottom-0 z-50 bg-ink-900 text-paper dark:bg-ink-900 dark:text-paper transition-transform duration-200 ${
        hidden ? "translate-y-full pointer-events-none" : "translate-y-0"
      }`}
      aria-hidden={hidden}
    >
      <div className="flex items-center justify-between gap-3 px-4 py-3">
        <p className="text-xs text-paper-300 leading-tight">
          <span className="text-paper font-medium">20 min with a senior partner.</span>
          <br />
          <span className="opacity-70">No obligation. NDA on request.</span>
        </p>
        <a
          href={bookingHref}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-accent text-white text-sm font-medium hover:bg-accent-600 transition-colors flex-shrink-0"
          data-cursor="cta"
          data-track="sticky_book_call"
        >
          Book a call <span aria-hidden>→</span>
        </a>
      </div>
    </div>
  );
}
