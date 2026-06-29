import type { Metadata } from 'next';
import { site } from './site';

type SeoInput = {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  type?: 'website' | 'article';
  publishedTime?: string;
  noindex?: boolean;
};

/**
 * Builds a Next.js Metadata object with consistent Open Graph, Twitter,
 * canonical URL, and theme color. Pass a path (without site origin) and
 * we'll construct the canonical automatically.
 */
export function buildMetadata({
  title,
  description = site.description,
  path = '/',
  image = '/og/default.png',
  type = 'website',
  publishedTime,
  noindex = false,
}: SeoInput = {}): Metadata {
  const fullTitle = title ? `${title} · ${site.shortName}` : `${site.name} — ${site.tagline}`;
  const url = new URL(path, site.url).toString();
  const img = new URL(image, site.url).toString();

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(site.url),
    alternates: { canonical: url },
    openGraph: {
      type,
      siteName: site.name,
      title: fullTitle,
      description,
      url,
      images: [{ url: img, width: 1200, height: 630, alt: fullTitle }],
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [img],
      site: '@bazagency',
      creator: '@bazagency',
    },
    robots: noindex
      ? { index: false, follow: false }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-snippet': -1 } },
    icons: { icon: '/favicon.svg' },
  };
}

/**
 * Next.js 14 requires themeColor in a separate `viewport` export.
 * Apply alongside `metadata` in each page or layout.
 */
export const viewport = {
  themeColor: '#ff3b2f',
  width: 'device-width',
  initialScale: 1,
  colorScheme: 'light dark',
};

type JsonLd = Record<string, any> | Record<string, any>[];

/**
 * Renders JSON-LD structured data. Use inside a server component.
 * Pass a single object or an array of @graph nodes.
 */
export function jsonLd(data: JsonLd) {
  return {
    __html: JSON.stringify(data).replace(/</g, '\\u003c'),
  };
}

export function organizationLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: new URL('/og/logo.svg', site.url).toString(),
    email: site.email,
    sameAs: Object.values(site.social),
  };
}

export function websiteLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: site.name,
    url: site.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${site.url}/insights?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };
}

export function professionalServiceLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: site.name,
    url: site.url,
    image: new URL('/og/default.png', site.url).toString(),
    description: site.description,
    areaServed: ['MENA', 'EU', 'US'],
    priceRange: '$$$',
    email: site.email,
    telephone: site.phone,
  };
}

export function faqLd(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbLd(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.url, site.url).toString(),
    })),
  };
}

export function articleLd(post: { title: string; excerpt: string; slug: string; author: string; publishedAt: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    url: new URL(`/insights/${post.slug}`, site.url).toString(),
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: { '@type': 'Organization', name: site.name, logo: { '@type': 'ImageObject', url: new URL('/og/logo.svg', site.url).toString() } },
  };
}
