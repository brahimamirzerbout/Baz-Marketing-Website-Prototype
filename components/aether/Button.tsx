"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode, ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "danger";
type Size = "xs" | "sm" | "md" | "lg" | "xl";

const base =
  "inline-flex items-center justify-center gap-2 font-sans font-semibold leading-none " +
  "border-2 border-transparent rounded-md cursor-pointer no-underline whitespace-nowrap " +
  "select-none relative overflow-hidden " +
  "transition-all duration-fast " +
  "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 " +
  "disabled:opacity-45 disabled:cursor-not-allowed disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary text-primary-foreground hover:bg-primary-hover hover:shadow-md active:bg-primary-active",
  secondary:
    "bg-primary-bg text-primary-fg-muted border-primary-bg-hover hover:bg-primary-bg-hover hover:border-primary-fg-subtle active:bg-primary-bg",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground",
  outline:
    "bg-transparent text-foreground border-border-strong hover:border-primary-border hover:text-primary-fg hover:bg-primary-bg-subtle",
  danger:
    "bg-danger text-primary-foreground hover:bg-danger-hover hover:shadow-md active:brightness-95",
};

const sizes: Record<Size, string> = {
  xs: "px-2.5 py-1 text-xs rounded-sm",
  sm: "px-3 py-1.5 text-xs rounded-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-md rounded-lg",
  xl: "px-10 py-4 text-lg rounded-xl",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  block?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonAsLinkProps = CommonProps & {
  href: string;
  external?: boolean;
};

type ButtonAsButtonProps = CommonProps & ComponentProps<"button"> & {
  href?: never;
  external?: never;
};

export type ButtonProps = ButtonAsLinkProps | ButtonAsButtonProps;

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    block = false,
    className,
    children,
    ...rest
  } = props as CommonProps & Record<string, unknown>;

  const classes = cn(
    base,
    variants[variant as Variant],
    sizes[size as Size],
    block && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentProps<"button">)}>
      {children}
    </button>
  );
}
