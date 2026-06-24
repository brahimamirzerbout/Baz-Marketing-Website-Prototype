import type { Service } from '@/types';
import { Button } from '@/components/ui/Button';
import { site } from '@/lib/site';
import { Breadcrumb } from '@/components/sections/Breadcrumb';
import { Badge } from '@/components/ui/Badge';

const pillarTone: Record<string, 'accent' | 'info' | 'success' | 'warning'> = {
  owned: 'accent',
  earned: 'info',
  paid: 'warning',
  data: 'success',
  platform: 'accent',
};

export function ServiceHero({ service }: { service: Service }) {
  return (
    <section className="relative bg-paper overflow-hidden">
      <div aria-hidden className="absolute inset-0 bg-grid opacity-50 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      <div className="container mx-auto relative pt-12 pb-16 md:pt-16 md:pb-24">
        <Breadcrumb items={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: service.name },
        ]} />
        <div className="max-w-4xl">
          <Badge variant={pillarTone[service.pillar]} className="mb-6">{service.hero.eyebrow}</Badge>
          <h1 className="font-display text-display-2xl font-medium text-ink-900 tracking-[-0.04em]">
            {service.hero.headline}
          </h1>
          <p className="mt-6 text-lg md:text-2xl text-ink-600 leading-relaxed max-w-3xl">
            {service.hero.sub}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-3">
            <Button href={site.bookOrMailto} external variant="secondary" size="lg" trackAs="service_book_call">
              {service.cta.primary}
              <span aria-hidden>→</span>
            </Button>
            <Button href={`/contact?service=${encodeURIComponent(service.slug)}`} variant="outline" size="lg" trackAs="service_audit_cta">
              Get a {service.name.split(' ')[0]} proposal →
            </Button>
            {service.cta.secondary && (
              <Button href="/case-studies" variant="outline" size="lg" trackAs="service_secondary_cta">
                {service.cta.secondary}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
