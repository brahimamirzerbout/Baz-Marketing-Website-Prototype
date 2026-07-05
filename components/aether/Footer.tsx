import Link from "next/link";
import { cn } from "@/lib/cn";
import { Logo } from "./Logo";

type FooterColumn = {
  heading: string;
  links: { href: string; label: string; external?: boolean }[];
};

type FooterProps = {
  columns?: FooterColumn[];
  className?: string;
};

const defaultColumns: FooterColumn[] = [
  {
    heading: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/our-story", label: "Our story" },
      { href: "/methodology", label: "Methodology" },
      { href: "/stance", label: "Our stance" },
    ],
  },
  {
    heading: "Work",
    links: [
      { href: "/services", label: "Services" },
      { href: "/case-studies", label: "Case studies" },
      { href: "/industries", label: "Industries" },
      { href: "/insights", label: "Insights" },
    ],
  },
  {
    heading: "Hub",
    links: [
      { href: "/hub", label: "Dashboard" },
      { href: "/hub/cockpit", label: "Cockpit" },
      { href: "/hub/triangle", label: "Triangle" },
      { href: "/pulse", label: "Pulse" },
    ],
  },
  {
    heading: "Elsewhere",
    links: [
      { href: "https://linkedin.com", label: "LinkedIn", external: true },
      { href: "https://twitter.com", label: "Twitter / X", external: true },
      { href: "/privacy", label: "Privacy" },
      { href: "/terms", label: "Terms" },
    ],
  },
];

export function Footer({ columns = defaultColumns, className }: FooterProps) {
  return (
    <footer className={cn("mt-24 bg-background text-foreground border-t border-border", className)}>
      <div className="container mx-auto py-20 md:py-28">
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <Logo />
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed font-light">
              Senior-only growth partner. Strategy, execution, and reporting in one system — or pay
              nothing for month four.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end justify-end">
            <a
              href="/book"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary-hover font-medium text-sm transition-colors"
            >
              Book a growth call →
            </a>
            <a
              href="mailto:hello@baz.agency"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              hello@baz.agency
            </a>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {columns.map((col) => (
            <div key={col.heading}>
              <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
                {col.heading}
              </p>
              <ul className="space-y-3 text-sm text-muted-foreground">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-foreground transition-colors"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href} className="hover:text-foreground transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/60">
            &copy; {new Date().getFullYear()} BAZ. Algiers &middot; MENA &middot; EU &middot; US
          </p>
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/40">
            Senior team &middot; No juniors
          </p>
        </div>
      </div>
    </footer>
  );
}
