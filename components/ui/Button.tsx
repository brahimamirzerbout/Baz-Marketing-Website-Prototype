'use client';

import Link from 'next/link';
import { cn } from '@/lib/cn';
import { trackedClick } from '@/lib/analytics';
import type { ComponentProps, ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'soft';
type Size = 'sm' | 'md' | 'lg';

const base =
  'inline-flex items-center justify-center gap-2 font-medium rounded-full transition-all duration-200 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 ' +
  'focus-visible:ring-offset-paper disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap';

const variants: Record<Variant, string> = {
  primary:
    'bg-ink-900 text-paper hover:bg-ink-800 shadow-soft hover:shadow-lift hover:-translate-y-0.5',
  secondary:
    'bg-accent text-white hover:bg-accent-600 shadow-soft hover:shadow-lift hover:-translate-y-0.5',
  ghost:
    'bg-transparent text-ink-900 hover:bg-ink-100',
  outline:
    'bg-transparent text-ink-900 border border-ink-200 hover:border-ink-900 hover:bg-paper',
  soft:
    'bg-paper-300 text-ink-900 hover:bg-paper-400 border border-paper-400',
};

const sizes: Record<Size, string> = {
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-[15px]',
  lg: 'h-14 px-7 text-base',
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
  children: ReactNode;
  trackAs?: string;
  trackPayload?: Record<string, string | number | boolean>;
};

type ButtonAsLinkProps = CommonProps & {
  href: string;
  external?: boolean;
  onClick?: never;
};

type ButtonAsButtonProps = CommonProps & ComponentProps<'button'> & {
  href?: never;
};

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = 'primary',
    size = 'md',
    className,
    children,
    trackAs,
    trackPayload,
  } = props;

  const classes = cn(base, variants[variant], sizes[size], className);

  if ('href' in props && props.href) {
    const { href, external } = props;
    const clickHandler = trackAs
      ? trackedClick('cta_click', { label: trackAs, href, ...(trackPayload || {}) })
      : undefined;

    if (external || /^https?:\/\//.test(href)) {
      return (
        <a
          href={href}
          target={external ? '_blank' : undefined}
          rel={external ? 'noopener noreferrer' : undefined}
          className={classes}
          onClick={clickHandler}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} onClick={clickHandler}>
        {children}
      </Link>
    );
  }

  const { onClick: userOnClick, ...rest } = props as ButtonAsButtonProps;
  const clickHandler = trackAs
    ? trackedClick('cta_click', { label: trackAs, ...(trackPayload || {}) }, userOnClick)
    : userOnClick;

  return (
    <button className={classes} onClick={clickHandler} {...rest}>
      {children}
    </button>
  );
}
