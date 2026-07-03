import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type Variant = "default" | "accent" | "success" | "info" | "warning" | "ink";
type Size = "sm" | "md";

const variants: Record<Variant, string> = {
  default: "bg-muted/70 text-foreground dark:bg-muted dark:text-foreground",
  accent: "bg-accent-soft text-primary",
  success: "bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-300",
  info: "bg-[hsla(210,75%,60%,0.089)] text-[hsl(210,75%,60%)]",
  warning: "bg-[hsla(38,85%,58%,0.089)] text-[hsl(38,85%,58%)]",
  ink: "bg-primary text-foreground dark:bg-background dark:text-foreground",
};

const sizes: Record<Size, string> = {
  sm: "text-[11px] px-2 py-0.5",
  md: "text-xs px-2.5 py-1",
};

export function Badge({
  children,
  variant = "default",
  size = "md",
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
        "inline-flex items-center gap-1.5 rounded-full font-mono uppercase tracking-wider",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
