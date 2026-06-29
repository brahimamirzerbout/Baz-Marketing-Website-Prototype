/**
 * ChapterDivider — scrollytelling chapter marker.
 *
 * Renders a thin rule with a numbered chapter label, e.g.:
 *
 *     § 03 · The triangle
 *
 * Used to break long marketing pages into one-idea-per-chapter sections.
 * Pattern from 2026 Awwwards SOTDs (aino.agency, fromanother.love): pacing
 * beats gimmickry; chapters carry a single idea.
 *
 * Server component. No "use client" needed.
 */
export function ChapterDivider({
  n,
  label,
  id,
}: {
  /** Chapter number, e.g. "01", "02". Rendered verbatim. */
  n: string;
  /** Short chapter title, e.g. "The triangle". */
  label: string;
  /** Optional DOM id for scroll-targeting / deep links. */
  id?: string;
}) {
  return (
    <div
      id={id}
      className="relative my-10 first:mt-0"
      aria-label={`Chapter ${n}: ${label}`}
    >
      <div className="absolute inset-x-0 top-1/2 border-t border-ink-100" aria-hidden />
      <div className="relative flex justify-center">
        <span className="bg-paper dark:bg-paper-300 px-4 text-[11px] font-mono uppercase tracking-[0.18em] text-ink-500 dark:text-paper">
          § {n} · {label}
        </span>
      </div>
    </div>
  );
}
