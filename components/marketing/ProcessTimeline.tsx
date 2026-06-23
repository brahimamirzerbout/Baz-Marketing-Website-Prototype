import type { Service } from '@/types';

export function ProcessTimeline({ process }: { process: Service['process'] }) {
  return (
    <ol className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
      {process.map((step, i) => (
        <li key={step.step} className="reveal relative bg-paper rounded-2xl p-6 border border-ink-100" style={{ animationDelay: `${i * 80}ms` }}>
          <div className="flex items-center justify-between mb-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">
              {String(step.step).padStart(2, '0')}
            </span>
            <span aria-hidden className="font-display text-3xl text-ink-200">
              {String(i + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-display text-2xl font-medium tracking-[-0.02em]">{step.title}</h3>
          <p className="mt-3 text-sm text-ink-600 leading-relaxed">{step.desc}</p>
        </li>
      ))}
    </ol>
  );
}
