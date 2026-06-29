/**
 * "What to read next" strip — links to the 4 differentiated pages
 * (Methodology, Stance, vs Others, Client Portal) so the homepage
 * acts as a hub to all the proof on the site.
 */
const links = [
  {
    href: "/our-story",
    label: "Our story",
    desc: "How BAZ went from a freelance collective to a four-person agency that ships like thirty. The good years, the bad year, the Hub.",
    cta: "Read the story →",
  },
  {
    href: "/methodology",
    label: "Methodology",
    desc: "How BAZ plans, ships, scores, and learns. The Triangle Loop, in public.",
    cta: "Read the playbook →",
  },
  {
    href: "/stance",
    label: "Our stance",
    desc: "Agentic AI is leverage, not a senior. What we ship, what we refuse.",
    cta: "See the stance →",
  },
  {
    href: "/vs-others",
    label: "vs other agencies",
    desc: "Honest comparison. Where we win, where we don't, and when we're the wrong fit.",
    cta: "See the scorecard →",
  },
];

export function ReadNext() {
  return (
    <section className="bg-paper">
      <div className="container mx-auto py-16 md:py-20">
        <div className="max-w-3xl mb-10">
          <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent mb-3">
            Read next
          </p>
          <h2 className="font-display text-display-lg font-medium tracking-[-0.03em]">
            Four pages that make us different.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group block p-6 rounded-2xl border border-ink-100 hover:border-accent hover:bg-paper-300 transition-colors"
            >
              <div className="font-display text-xl font-medium tracking-[-0.02em] group-hover:text-accent">
                {l.label}
              </div>
              <p className="mt-2 text-sm text-ink-600 leading-relaxed">{l.desc}</p>
              <div className="mt-4 text-sm text-accent font-medium">{l.cta}</div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}