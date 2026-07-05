import { cn } from "@/lib/cn";
import type { ReactNode, HTMLAttributes } from "react";

type Variant = "default" | "flat" | "bordered" | "ghost" | "highlight";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "article" | "section";
  variant?: Variant;
  padded?: boolean;
  children: ReactNode;
};

const variantStyles: Record<Variant, string> = {
  default: "border-border shadow-sm",
  flat: "border-transparent shadow-sm",
  bordered: "border-2 border-border",
  ghost: "border-2 border-dashed border-border bg-transparent",
  highlight: "border-2 border-primary-border",
};

export function Card({
  as: Tag = "div",
  variant = "default",
  padded = true,
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <Tag
      className={cn(
        "relative rounded-xl bg-background overflow-hidden transition-all duration-normal",
        "hover:shadow-lg hover:-translate-y-0.5",
        variantStyles[variant],
        padded && "p-6",
        variant === "ghost" && "hover:bg-primary-bg-subtle hover:border-solid hover:border-primary-fg-subtle",
        variant === "highlight" && "hover:border-primary",
        variant === "default" && "hover:border-border-strong",
        "focus-within:shadow-lg focus-within:border-primary-border",
        className,
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
}

export function CardImage({ alt, className, ...rest }: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      alt={alt ?? ""}
      className={cn(
        "w-full aspect-video object-cover block bg-muted",
        className,
      )}
      {...rest}
    />
  );
}

export function CardBody({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("flex flex-col gap-3", className)} {...rest}>
      {children}
    </div>
  );
}

export function CardTag({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex self-start px-2.5 py-0.5 font-sans text-2xs font-semibold uppercase tracking-wider",
        "text-primary-fg-muted bg-primary-bg rounded-full leading-none",
        className,
      )}
      {...rest}
    >
      {children}
    </span>
  );
}

export function CardTitle({ className, children, ...rest }: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={cn("font-sans text-md font-bold text-foreground leading-snug m-0", className)} {...rest}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...rest }: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn(
        "font-sans text-sm text-muted-foreground leading-relaxed m-0",
        "line-clamp-3",
        className,
      )}
      {...rest}
    >
      {children}
    </p>
  );
}

export function CardFooter({ className, children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-6 py-4 border-t border-border font-sans text-xs text-foreground/60",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
