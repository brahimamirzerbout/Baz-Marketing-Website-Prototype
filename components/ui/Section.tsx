import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Tone = 'paper' | 'white' | 'ink' | 'accent';
type Size = 'sm' | 'md' | 'lg' | 'xl';

const tones: Record<Tone, string> = {
  // The token swap in globals.css inverts ink-* and paper-* semantics, so
  // bg-paper / text-ink-900 already produce a dark surface with light text in
  // dark mode. We only override white→ink-950 for a slightly darker variant
  // of the off-black, and ink→paper for a paper-tone "ink" section in dark.
  paper: 'bg-paper text-ink-900',
  white: 'bg-paper-50 text-ink-900 dark:bg-ink-950',
  ink: 'bg-ink-900 text-paper dark:bg-ink-950',
  accent: 'bg-accent text-white',
};

const sizes: Record<Size, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-20 md:py-32',
  xl: 'py-24 md:py-40',
};

export function Section({
  children,
  tone = 'paper',
  size = 'md',
  className,
  id,
}: {
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn(tones[tone], sizes[size], className)}>
      <div className="container mx-auto">{children}</div>
    </section>
  );
}

export function Eyebrow({
  children,
  className,
  tone = 'default',
}: {
  children: ReactNode;
  className?: string;
  tone?: 'default' | 'light';
}) {
  return (
    <p
      className={cn(
        'font-mono uppercase tracking-[0.18em] text-[11px] mb-4',
        tone === 'light' ? 'text-paper-300' : 'text-ink-500',
        className
      )}
    >
      {children}
    </p>
  );
}

export function SectionHeading({
  children,
  as: Tag = 'h2',
  className,
}: {
  children: ReactNode;
  as?: 'h2' | 'h3';
  className?: string;
}) {
  return (
    <Tag
      className={cn(
        'font-display text-display-lg font-medium tracking-[-0.03em] leading-[1.05] max-w-3xl text-ink-900',
        className
      )}
    >
      {children}
    </Tag>
  );
}

export function SectionLede({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn('text-lg md:text-xl text-ink-600 max-w-2xl mt-5 leading-relaxed', className)}>
      {children}
    </p>
  );
}
