#!/usr/bin/env node
/**
 * Standalone sitemap generator. Next.js generates /sitemap.xml automatically
 * from `app/sitemap.ts`. This script exists so you can also generate the file
 * statically before `next build` (useful for CDN pre-upload, SEO crawlers,
 * or when serving the OG image as a static asset separately).
 *
 * Output: public/sitemap.xml
 */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const SITE = process.env.NEXT_PUBLIC_SITE_URL || 'https://baz.agency';
const NOW = new Date().toISOString();

const staticRoutes = [
  { loc: '/', priority: '1.0', changefreq: 'weekly' },
  { loc: '/about', priority: '0.7', changefreq: 'monthly' },
  { loc: '/services', priority: '0.9', changefreq: 'weekly' },
  { loc: '/case-studies', priority: '0.9', changefreq: 'weekly' },
  { loc: '/insights', priority: '0.9', changefreq: 'weekly' },
  { loc: '/industries', priority: '0.8', changefreq: 'monthly' },
  { loc: '/contact', priority: '0.8', changefreq: 'monthly' },
  { loc: '/privacy', priority: '0.3', changefreq: 'yearly' },
  { loc: '/terms', priority: '0.3', changefreq: 'yearly' },
];

const services = [
  'strategy-consulting', 'paid-media', 'seo-organic', 'web-design-development',
  'content-copywriting', 'analytics-tracking', 'ai-search-automation',
  'crm-lifecycle', 'creative-cro',
];

const caseSlugs = [
  'viralvista-growth-engine', 'northwind-fintech-seo', 'engageera-saas-launch',
  'saffron-hospitality-multi-location', 'meridian-devtools-ai-search',
  'buzzbeacon-content-engine',
];

const postSlugs = [
  'compounding-seo', 'paid-attribution-after-ios', 'winning-the-ai-overview',
  'cro-without-slop', 'editorial-as-moat', 'the-90-day-plan',
];

const industries = [
  'dtc-ecommerce', 'b2b-saas', 'fintech', 'hospitality',
  'ai-devtools', 'professional-services',
];

const urls = [
  ...staticRoutes.map((r) => ({ ...r })),
  ...services.map((slug) => ({ loc: `/services/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...caseSlugs.map((slug) => ({ loc: `/case-studies/${slug}`, priority: '0.7', changefreq: 'monthly' })),
  ...postSlugs.map((slug) => ({ loc: `/insights/${slug}`, priority: '0.6', changefreq: 'monthly' })),
  ...industries.map((slug) => ({ loc: `/industries/${slug}`, priority: '0.6', changefreq: 'monthly' })),
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url>\n    <loc>${SITE}${u.loc}</loc>\n    <lastmod>${NOW}</lastmod>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '../public/sitemap.xml');
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, xml, 'utf8');
console.log(`✅ Wrote ${urls.length} URLs to ${outPath}`);
