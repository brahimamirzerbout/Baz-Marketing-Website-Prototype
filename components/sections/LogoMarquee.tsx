/**
 * Brand marquee — silent infinite scroll. Pure CSS animation.
 * Used for "as seen in" / client logo strip. Logos are placeholders
 * (text + letter mark) until real partner logos are added.
 */
const logos = [
  'ViralVista', 'Northwind', 'EngageEra', 'Saffron & Co.', 'Meridian Labs',
  'BuzzBeacon', 'Aether', 'Helix', 'Lumen', 'Forge', 'Stratus', 'Ridgeway',
];

export function LogoMarquee() {
  const doubled = [...logos, ...logos];
  return (
    <section className="bg-white py-10 border-y border-ink-100 marquee-mask overflow-hidden">
      <div className="flex animate-marquee gap-12 whitespace-nowrap">
        {doubled.map((l, i) => (
          <span
            key={`${l}-${i}`}
            className="font-display font-bold text-2xl md:text-3xl text-ink-300 hover:text-ink-700 transition-colors select-none"
          >
            {l}
          </span>
        ))}
      </div>
    </section>
  );
}
