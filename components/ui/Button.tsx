// @ts-nocheck
"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import { trackedClick } from "@/lib/analytics";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "soft";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 " +
  "focus-visible:ring-offset-background disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md hover:-translate-y-px",
  secondary:
    "bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md hover:-translate-y-px",
  ghost: "bg-transparent text-foreground hover:bg-muted",
  outline: "bg-transparent text-foreground border border-border hover:bg-muted",
  soft: "bg-muted text-foreground hover:bg-muted/70",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-10 px-5 text-sm",
  lg: "h-12 px-7 text-base",
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

type ButtonAsButtonProps = CommonProps &
  ComponentProps<"button"> & {
    href?: never;
  };

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    className,
    children,
    trackAs,
    trackPayload,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(base, variants[variant as Variant], sizes[size as Size], className);

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={classes}
          onClick={() => trackAs && trackedClick(trackAs as any, trackPayload)}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className={classes}
        onClick={() => trackAs && trackedClick(trackAs as any, trackPayload)}
      >
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
