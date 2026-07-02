// @ts-nocheck
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/content/services";

const servicesByGroup = {
  Strategy: services.filter((s) => s.pillar === "owned" || s.pillar === "platform").slice(0, 4),
  Growth: services.filter((s) => s.pillar === "earned" || s.pillar === "paid").slice(0, 4),
};

export function Footer() {
  return (
    <footer className="mt-24 bg-background text-foreground border-t border-border">
      <div className="container mx-auto py-20 md:py-28">
        {/* Top — brand + CTA */}
        <div className="grid lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-7">
            <Link href="/" className="flex items-center gap-3" aria-label={site.name}>
              <span className="royal-seal">B</span>
              <span className="font-display text-lg tracking-[-0.02em]">BAZ</span>
            </Link>
            <p className="mt-6 text-lg text-muted-foreground max-w-md leading-relaxed font-light">
              Senior-only growth partner. Strategy, execution, and reporting in one system — or pay
              nothing for month four.
            </p>
          </div>
          <div className="lg:col-span-5 flex flex-col gap-3 lg:items-end justify-end">
            <a
              href={site.bookOrMailto}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 h-12 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-sm transition-colors"
            >
              Book a growth call →
            </a>
            <a
              href={`mailto:${site.email}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {site.email}
            </a>
          </div>
        </div>

        {/* Middle — link columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-20">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
              Company
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/our-story" className="hover:text-foreground transition-colors">
                  Our story
                </Link>
              </li>
              <li>
                <Link href="/methodology" className="hover:text-foreground transition-colors">
                  Methodology
                </Link>
              </li>
              <li>
                <Link href="/stance" className="hover:text-foreground transition-colors">
                  Our stance
                </Link>
              </li>
              <li>
                <Link href="/vs-others" className="hover:text-foreground transition-colors">
                  vs others
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
              Work
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-foreground transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-foreground transition-colors">
                  Case studies
                </Link>
              </li>
              <li>
                <Link href="/industries" className="hover:text-foreground transition-colors">
                  Industries
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-foreground transition-colors">
                  Insights
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-foreground transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
              Hub
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link href="/hub" className="hover:text-foreground transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/hub/cockpit" className="hover:text-foreground transition-colors">
                  Cockpit
                </Link>
              </li>
              <li>
                <Link href="/hub/triangle" className="hover:text-foreground transition-colors">
                  Triangle
                </Link>
              </li>
              <li>
                <Link href="/hub/nova" className="hover:text-foreground transition-colors">
                  Nova AI
                </Link>
              </li>
              <li>
                <Link href="/hub/intelligence" className="hover:text-foreground transition-colors">
                  Intelligence
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
              Services
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {servicesByGroup.Strategy.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {s.name.split("—")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
              Growth
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              {servicesByGroup.Growth.slice(0, 4).map((s) => (
                <li key={s.slug}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="hover:text-foreground transition-colors"
                  >
                    {s.name.split("—")[0].trim()}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60 mb-4">
              Elsewhere
            </p>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={site.social.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={site.social.twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-foreground transition-colors"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <Link href="/feed.xml" className="hover:text-foreground transition-colors">
                  RSS
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-foreground transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom — quiet signature */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground/60">
            © {new Date().getFullYear()} {site.name}. Algiers · MENA · EU · US
          </p>
          <p className="text-[11px] font-mono uppercase tracking-[0.16em] text-muted-foreground/40">
            Senior team · No juniors
          </p>
        </div>
      </div>
    </footer>
  );
}
