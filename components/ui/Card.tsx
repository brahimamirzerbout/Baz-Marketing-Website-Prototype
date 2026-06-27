import { cn } from '@/lib/cn';
import type { ReactNode, HTMLAttributes } from 'react';

type Props = HTMLAttributes<HTMLDivElement> & {
  as?: 'div' | 'article' | 'section';
  hover?: boolean;
  bordered?: boolean;
  padded?: boolean;
  children: ReactNode;
};

export function Card({
  as: Tag = 'div',
  hover = false,
  bordered = true,
  padded = true,
  className,
  children,
  ...rest
}: Props) {
  return (
    <Tag
      className={cn(
        'bg-paper-50 rounded-2xl',
        bordered && 'border border-ink-100',
        padded && 'p-6 md:p-7',
        hover && 'transition-all duration-200 hover:-translate-y-1 hover:shadow-lift hover:border-ink-200',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}
