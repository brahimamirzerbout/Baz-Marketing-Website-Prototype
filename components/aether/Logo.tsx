import Link from "next/link";
import { cn } from "@/lib/cn";

type LogoProps = {
  href?: string;
  variant?: "default" | "compact" | "icon" | "on-dark";
  className?: string;
};

export function Logo({ href = "/", variant = "default", className }: LogoProps) {
  const mark = (
    <span
      className={cn(
        "inline-grid place-items-center rounded-xl font-sans font-extrabold leading-none shadow-md",
        "bg-gradient-to-br from-primary to-accent text-primary-foreground",
        variant === "compact" && "size-8 text-sm rounded-lg",
        variant === "icon" && "size-9 text-base",
        variant !== "compact" && variant !== "icon" && "size-10 text-lg",
      )}
    >
      B
    </span>
  );

  const wordmark = (
    <span
      className={cn(
        "font-sans font-extrabold tracking-tight bg-clip-text text-transparent",
        "bg-gradient-to-br from-foreground to-primary",
        variant === "on-dark" && "from-primary-foreground to-primary-30",
        variant === "compact" && "text-base",
        variant !== "compact" && "text-xl",
        variant === "icon" && "hidden",
      )}
    >
      BAZ
    </span>
  );

  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-3 no-underline text-foreground isolate",
        "focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 focus-visible:rounded-md",
        className,
      )}
      aria-label="BAZ — home"
    >
      {mark}
      {wordmark}
    </Link>
  );
}
