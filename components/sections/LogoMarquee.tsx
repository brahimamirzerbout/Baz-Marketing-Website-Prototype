/**
 * Partner marquee — silent infinite scroll. Pure CSS animation.
 * Used for the "Trusted by" / partner strip on the homepage.
 *
 * Default list is the tools/services BAZ actually uses to run the business —
 * not fake client logos. To swap in real client logos, set the
 * NEXT_PUBLIC_CLIENT_LOGOS env var to a comma-separated list, e.g.
 *   NEXT_PUBLIC_CLIENT_LOGOS="Acme Co.,Beta Inc.,Gamma LLC"
 */
const DEFAULT_PARTNERS = [
  'Ollama', 'GitHub', 'Vercel', 'Linear', 'Stripe',
  'Resend', 'Cal.com', 'Figma', 'Notion', 'Slack',
];

const logos = (() => {
  const env = process.env.NEXT_PUBLIC_CLIENT_LOGOS;
  if (env && env.trim().length > 0) {
    return env.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return DEFAULT_PARTNERS;
})();

export function LogoMarquee() {
  if (logos.length === 0) return null;
  const doubled = [...logos, ...logos];
  return (
    <section className="bg-paper-50 py-10 border-y border-ink-100 dark:border-paper-200 marquee-mask overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {doubled.map((l, i) => (
          <span
            key={`${l}-${i}`}
            className="font-display font-bold text-2xl md:text-3xl text-ink-300 dark:text-ink-400 hover:text-ink-700 dark:hover:text-paper transition-colors select-none"
          >
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}
