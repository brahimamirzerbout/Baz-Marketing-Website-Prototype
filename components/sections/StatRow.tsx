/**
 * Inline row of stats. Useful mid-page to punctuate claims.
 */
export function StatRow({
  items,
  tone = 'paper',
}: {
  items: { value: string; label: string; sub?: string }[];
  tone?: 'paper' | 'ink';
}) {
  const valueColor = tone === 'ink' ? 'text-paper' : 'text-ink-900';
  const labelColor = tone === 'ink' ? 'text-paper-300' : 'text-ink-500';
  const subColor = tone === 'ink' ? 'text-paper-400' : 'text-ink-600';
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-ink-100 rounded-2xl overflow-hidden border border-ink-100">
      {items.map((s) => (
        <div key={s.label} className={tone === 'ink' ? 'bg-ink-900' : 'bg-paper'}>
          <div className="p-5 md:p-6">
            <p className={`font-display text-3xl md:text-4xl font-medium tracking-[-0.03em] ${valueColor}`}>{s.value}</p>
            <p className={`mt-1.5 font-mono uppercase tracking-[0.18em] text-[10px] ${labelColor}`}>{s.label}</p>
            {s.sub && <p className={`mt-2 text-sm ${subColor}`}>{s.sub}</p>}
          </div>
        </div>
      ))}
    </div>
  );
}
