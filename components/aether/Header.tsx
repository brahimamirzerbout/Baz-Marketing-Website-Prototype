"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

type NavItem = {
  href: string;
  label: string;
  badge?: string;
};

type HeaderProps = {
  nav?: NavItem[];
  className?: string;
};

const defaultNav: NavItem[] = [
  { href: "/services", label: "Services" },
  { href: "/methodology", label: "Methodology" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header({ nav = defaultNav, className }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-sticky flex items-center justify-between px-6 py-4",
        "backdrop-blur-[16px] saturate-[180%] transition-all duration-normal",
        scrolled
          ? "bg-background/92 shadow-md border-b border-border"
          : "bg-background/80 border-b border-transparent",
        className,
      )}
    >
      <div className="flex-shrink-0">
        <Logo />
      </div>

      <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
        {nav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="relative px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
          >
            {item.label}
            {item.badge && (
              <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-primary/10 text-accent">
                <span className="inline-block w-1 h-1 rounded-full bg-accent animate-pulse" />
                {item.badge}
              </span>
            )}
          </Link>
        ))}
      </nav>

      <div className="hidden lg:flex items-center gap-3">
        <Link
          href="/contact"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-md bg-transparent text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          Talk to us
        </Link>
        <Link
          href="/book"
          className="inline-flex items-center justify-center gap-2 px-5 py-2 text-sm font-semibold rounded-md bg-primary text-primary-foreground hover:bg-primary-hover shadow-sm hover:shadow-md transition-all"
        >
          Book a growth call
        </Link>
      </div>

      <button
        className="lg:hidden grid place-items-center size-10 rounded-md hover:bg-muted text-foreground"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span aria-hidden className="relative w-5 h-3.5">
          <span
            className={cn(
              "absolute left-0 right-0 h-0.5 bg-foreground transition-all duration-300",
              open ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute left-0 right-0 h-0.5 bg-foreground transition-all duration-300",
              open ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0",
            )}
          />
        </span>
      </button>

      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 z-overlay bg-background transition-all duration-300",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        aria-hidden={!open}
      >
        <div className="container mx-auto py-8 flex flex-col gap-2 h-full overflow-y-auto">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-2xl font-display tracking-tight border-b border-border text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col gap-3">
            <Link
              href="/book"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover"
            >
              Book a growth call
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="inline-flex items-center justify-center gap-2 h-12 px-7 text-sm font-semibold rounded-lg bg-transparent text-foreground border border-border hover:bg-muted"
            >
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
