import Link from 'next/link';
import { Section, Eyebrow, SectionHeading } from '@/components/ui/Section';
import { Card } from '@/components/ui/Card';
import { buildMetadata } from '@/lib/seo';

export const metadata = buildMetadata({ title: 'Admin', path: '/admin', noindex: true });

export default function AdminIndexPage() {
  const tiles = [
    { href: '/admin/leads', name: 'Leads', tagline: 'Contact-form submissions. Newest first. Click reply to email back.' },
    { href: '/admin/analytics', name: 'Analytics', tagline: 'Attribution, AdStock, RFM, budget optimizer. Four interactive tools.' },
    { href: '/admin/canva', name: 'Canva', tagline: 'In-house design assets. Brand kit + 6 templates, PNG/SVG export.' },
    { href: '/admin/monitors', name: 'Monitors', tagline: 'Live health: build, API, leads, AI spend, Core Web Vitals.' },
    { href: '/admin/integrations', name: 'Integrations', tagline: 'Connected services. 14 tools across 6 categories.' },
    { href: '/console', name: 'Operator Console', tagline: 'Pipeline, scout list, activity tracker, income calculator, AI tools.' },
  ];
  return (
    <Section tone="paper" size="lg">
      <Eyebrow>Admin</Eyebrow>
      <h1 className="font-display text-display-xl font-medium tracking-[-0.035em]">Internal tools.</h1>
      <SectionHeading>Operations dashboards and design tools.</SectionHeading>
      <div className="mt-10 grid sm:grid-cols-2 gap-4 max-w-4xl">
        {tiles.map((t) => (
          <Link key={t.href} href={t.href}>
            <Card className="card-hover p-6">
              <p className="font-mono uppercase tracking-[0.18em] text-[11px] text-accent">{t.name}</p>
              <p className="mt-2 font-display text-2xl font-medium tracking-[-0.02em]">{t.tagline.split('.')[0]}.</p>
              <p className="mt-1 text-ink-600 text-sm">{t.tagline.split('.').slice(1).join('.').trim()}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  );
}
