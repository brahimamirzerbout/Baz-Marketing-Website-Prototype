import Link from 'next/link';
import { posts } from '@/content/posts';
import { Section, Eyebrow, SectionHeading, SectionLede } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';

const categoryLabel: Record<string, { name: string; tone: 'accent' | 'info' | 'success' | 'warning' }> = {
  strategy: { name: 'Strategy', tone: 'accent' },
  seo: { name: 'SEO', tone: 'info' },
  paid: { name: 'Paid', tone: 'warning' },
  analytics: { name: 'Analytics', tone: 'success' },
  content: { name: 'Content', tone: 'accent' },
  ai: { name: 'AI', tone: 'info' },
};

export function InsightsPreview() {
  const recent = posts.slice(0, 3);
  return (
    <Section tone="paper" size="lg">
      <div className="grid lg:grid-cols-12 gap-10 mb-14">
        <div className="lg:col-span-7">
          <Eyebrow>From the playbook</Eyebrow>
          <SectionHeading>Insights, not blog spam.</SectionHeading>
          <SectionLede>
            Six-pillar perspectives on what's actually working in growth marketing — written
            by the partners, not by content mills.
          </SectionLede>
        </div>
        <div className="lg:col-span-5 flex items-end lg:justify-end">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 font-medium text-ink-900 hover:text-accent transition-colors"
          >
            All insights <span aria-hidden>→</span>
          </Link>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-5">
        {recent.map((p, i) => {
          const cat = categoryLabel[p.category];
          return (
            <Link
              key={p.slug}
              href={`/insights/${p.slug}`}
              className="reveal group flex flex-col bg-paper-50 rounded-2xl p-6 md:p-7 border border-ink-100 dark:border-paper-200 hover:border-ink-900 dark:hover:border-paper-50 hover:-translate-y-1 hover:shadow-lift transition-all duration-200"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <Badge variant={cat.tone}>{cat.name}</Badge>
                <span className="text-xs text-ink-400 font-mono">{p.readingMin} min read</span>
              </div>
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] leading-tight">
                {p.title}
              </h3>
              <p className="mt-3 text-sm text-ink-600 line-clamp-3">{p.excerpt}</p>
              <div className="mt-auto pt-6 flex items-center justify-between text-sm">
                <span className="text-ink-500">{p.author}</span>
                <span className="text-ink-300 dark:text-ink-400 group-hover:text-accent group-hover:translate-x-0.5 transition-all">Read →</span>
              </div>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
