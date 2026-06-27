import Link from 'next/link';
import { posts } from '@/content/posts';
import { Badge } from '@/components/ui/Badge';

const categoryLabel: Record<string, { name: string; tone: 'accent' | 'info' | 'success' | 'warning' }> = {
  strategy: { name: 'Strategy', tone: 'accent' },
  seo: { name: 'SEO', tone: 'info' },
  paid: { name: 'Paid', tone: 'warning' },
  analytics: { name: 'Analytics', tone: 'success' },
  content: { name: 'Content', tone: 'accent' },
  ai: { name: 'AI', tone: 'info' },
};

export function PostsList() {
  return (
    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      {posts.map((p, i) => {
        const cat = categoryLabel[p.category];
        return (
          <li key={p.slug}>
            <Link
              href={`/insights/${p.slug}`}
              className="reveal group block bg-paper-50 rounded-2xl p-6 md:p-7 border border-ink-100 hover:border-ink-900 hover:-translate-y-1 hover:shadow-lift transition-all duration-200 h-full"
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className="flex items-center justify-between mb-6">
                <Badge variant={cat.tone}>{cat.name}</Badge>
                <span className="text-xs text-ink-400 font-mono">{p.readingMin} min read</span>
              </div>
              <h3 className="font-display text-2xl font-medium tracking-[-0.02em] leading-tight">{p.title}</h3>
              <p className="mt-3 text-sm text-ink-600 line-clamp-3">{p.excerpt}</p>
              <div className="mt-6 pt-4 border-t border-ink-100 flex items-center justify-between text-sm">
                <span className="text-ink-500">{p.author}</span>
                <span className="text-ink-400 font-mono text-xs">
                  {new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
