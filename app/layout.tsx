import type { Metadata, Viewport } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { site } from '@/lib/site';
import { organizationLd, websiteLd, jsonLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Analytics } from '@/components/analytics/Analytics';
import { ScrollReveal } from '@/components/marketing/ScrollReveal';
import { Cursor } from '@/components/ui/Cursor';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
  adjustFontFallback: false,
});
const fraunces = Fraunces({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fraunces',
  fallback: ['Georgia', 'ui-serif', 'serif'],
  adjustFontFallback: false,
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.shortName}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  generator: 'Next.js',
  keywords: [
    'growth marketing agency',
    'SEO agency',
    'paid media agency',
    'content agency',
    'analytics agency',
    'AI search optimization',
    'CRO agency',
    'BAZ',
  ],
  openGraph: {
    type: 'website',
    siteName: site.name,
    locale: 'en_US',
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
  },
  twitter: { card: 'summary_large_image', site: '@bazagency' },
  alternates: { canonical: site.url },
  robots: { index: true, follow: true },
  icons: { icon: '/favicon.svg' },
};

export const viewport: Viewport = {
  themeColor: '#ff3b2f',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable} ${mono.variable}`}>
      <body className="bg-paper text-ink-900 antialiased">
        <a href="#main" className="skip">Skip to content</a>
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <CookieBanner />
        <ScrollReveal />
        <Analytics />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organizationLd(), websiteLd()])}
        />
      </body>
    </html>
  );
}
