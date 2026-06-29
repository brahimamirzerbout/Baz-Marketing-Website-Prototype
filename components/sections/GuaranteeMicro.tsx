/**
 * GuaranteeMicro — inline microcopy under hero CTAs.
 *
 * One line of microcopy to address the "we've never paid out" guarantee
 * right next to the primary CTA, instead of hiding it on /methodology.
 * Lifts trust at the moment of decision (roast.page: specific guarantees
 * beat generic by 15%).
 *
 * Server component. No "use client" needed.
 */
type Variant = "default" | "emphasized";

export function GuaranteeMicro({
  variant = "default",
  className = "",
}: {
  variant?: Variant;
  className?: string;
}) {
  const tone =
    variant === "emphasized"
      ? "text-accent"
      : "text-ink-500";
  return (
    <p
      className={`mt-3 text-xs font-mono uppercase tracking-wider ${tone} ${className}`}
      aria-label="BAZ speed guarantee"
    >
      <span aria-hidden>↳ </span>
      Ship in 14 days, or month 1 free. We&apos;ve never paid out.
    </p>
  );
}
