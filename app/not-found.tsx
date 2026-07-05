/**
 * Custom 404 — Pattern 70 from anti-AI-slop research.
 * Specific, not generic. Named, not anonymous.
 * Includes the path the user was looking for.
 */
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { site } from "@/lib/site";

export const metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <Section tone="paper" size="xl">
      <div className="max-w-2xl">
        {/* Oversized 404 — Pattern 6: oversized number labels */}
        <p
          aria-hidden
          className="font-display text-[144px] md:text-[233px] font-bold leading-none tracking-[-0.04em] text-muted-foreground/[0.06] select-none -mb-8"
        >
          404
        </p>
        <Eyebrow>Page not found</Eyebrow>
        <h1 className="font-display text-display-xl font-medium tracking-[-0.04em]">
          This page isn&apos;t where you expected.
        </h1>
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
          Either it moved, or we haven&apos;t built it yet. If you think this is a broken link from
          our site, the email at the bottom of this page goes to a real person — let us know.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button
            href={site.bookOrMailto}
            external
            variant="secondary"
            size="lg"
            trackAs="404_book_call"
          >
            Book a growth call →
          </Button>
          <Button href="/contact" variant="outline" size="lg" trackAs="404_contact">
            Tell us what you were looking for
          </Button>
          <Button href="/" variant="ghost" size="lg" trackAs="404_home">
            Back to home
          </Button>
        </div>
        <p className="mt-12 text-sm text-muted-foreground">
          Or write us at{" "}
          <a href={`mailto:${site.email}`} className="text-accent underline hover:no-underline">
            {site.email}
          </a>{" "}
          — we read every one.
        </p>
      </div>
    </Section>
  );
}