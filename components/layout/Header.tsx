"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { SearchBox } from "./SearchBox";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { services } from "@/content/services";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/marketing-hub", label: "Marketing Hub", badge: "LIVE" },
  { href: "/hub", label: "Hub" },
  { href: "/methodology", label: "Methodology" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/insights", label: "Insights" },
  { href: "/pricing", label: "Pricing" },
  { href: "/about", label: "About" },
];

export function Header() {
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
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-background border-b border-transparent",
      )}
    >
      <div className="container mx-auto flex items-center justify-between h-16 md:h-18">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group" aria-label={`${site.name} — home`}>
          <span className="royal-seal">B</span>
          <span className="font-display font-bold text-lg tracking-[-0.02em] whitespace-nowrap">
            BAZ
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Primary">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="relative px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors inline-flex items-center gap-1.5"
            >
              {item.label}
              {(item as { badge?: React.ReactNode }).badge && (
                <span className="inline-flex items-center gap-1 text-[9px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[hsla(41,72%,68%,0.089)] text-accent">
                  <span className="inline-block w-1 h-1 rounded-full bg-accent animate-pulse" />
                  {(item as { badge?: React.ReactNode }).badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-2">
          <SearchBox />
          <Button href="/contact" variant="ghost" size="sm" trackAs="header_contact">
            Talk to us
          </Button>
          <Button
            href={site.bookOrMailto}
            external
            variant="primary"
            size="sm"
            trackAs="header_book_call"
          >
            Book a growth call
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden grid place-items-center w-10 h-10 rounded-md hover:bg-muted text-foreground"
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
      </div>

      {/* Mobile sheet */}
      <div
        className={cn(
          "lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background transition-all duration-300",
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
              className="block py-3 text-2xl font-display tracking-[-0.02em] border-b border-border text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <details className="py-3 border-b border-border">
            <summary className="text-2xl font-display tracking-[-0.02em] list-none cursor-pointer flex items-center justify-between text-foreground">
              Services{" "}
              <span aria-hidden className="text-muted-foreground text-base">
                +
              </span>
            </summary>
            <ul className="mt-4 pl-2 grid gap-2">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    onClick={() => setOpen(false)}
                    className="block py-1.5 text-base text-muted-foreground"
                  >
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </details>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              href={site.bookOrMailto}
              external
              variant="primary"
              size="lg"
              trackAs="mobile_book_call"
            >
              Book a growth call
            </Button>
            <Button
              href="/contact"
              variant="outline"
              size="lg"
              trackAs="mobile_contact"
              className="w-full"
            >
              Talk to us
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
