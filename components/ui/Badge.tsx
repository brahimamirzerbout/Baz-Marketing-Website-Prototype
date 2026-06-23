import { cn } from '@/lib/cn';
import type { ReactNode } from 'react';

type Variant = 'default' | 'accent' | 'success' | 'info' | 'warning' | 'ink';
type Size = 'sm' | 'md';

const variants: Record<Variant, string> = {
  default: 'bg-paper-300 text-ink-700',
  accent: 'bg-accent-soft text-accent-700',
  success: 'bg-green-50 text-green-700',
  info: 'bg-blue-50 text-blue-700',
  warning: 'bg-amber-50 text-amber-700',
  ink: 'bg-ink-900 text-paper',
};

const sizes: Record<Size, string> = {
  sm: 'text-[11px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className,
}: {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider',
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </span>
  );
}
