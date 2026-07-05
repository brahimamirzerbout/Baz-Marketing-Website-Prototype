import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { site } from '@/lib/site';
import { organizationLd, websiteLd, jsonLd } from '@/lib/seo';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@/components/analytics/Analytics';
import { ScrollReveal } from '@/components/marketing/ScrollReveal';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { ThemeProvider } from '@/components/ui/ThemeProvider';
import { SmoothScroll } from '@/components/ui/SmoothScroll';
import { AetherBackground } from '@/components/ui/AetherBackground';
import '../brand/css/blackswan-tokens.css';  /* → aether-tokens.css via @import */
import '../brand/css/variables-unified.css'; /* Stitch + Protocol overlay */
import '../brand/css/stitch-bridge.css';     /* Stitch Material 3 → ÆTHER bridge */
import '../brand/css/typography.css';
import '../brand/css/buttons.css';
import '../brand/css/cards.css';
import '../brand/css/forms.css';
import '../brand/css/utilities.css';
import './aether-monochrome.css';
import './globals.css';

const sans = localFont({
  src: [
    { path: '../public/fonts/inter/inter-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/inter/inter-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/inter/inter-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/inter/inter-700.woff2', weight: '700', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-sans',
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
  adjustFontFallback: false,
});

const display = localFont({
  src: [
    { path: '../public/fonts/fraunces/fraunces-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-500.woff2', weight: '500', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-600.woff2', weight: '600', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-700.woff2', weight: '700', style: 'normal' },
    { path: '../public/fonts/fraunces/fraunces-900.woff2', weight: '900', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-display',
  fallback: ['ui-serif', 'Georgia', 'serif'],
  adjustFontFallback: false,
});

const mono = localFont({
  src: [
    { path: '../public/fonts/jetbrains-mono/jetbrainsmono-400.woff2', weight: '400', style: 'normal' },
    { path: '../public/fonts/jetbrains-mono/jetbrainsmono-500.woff2', weight: '500', style: 'normal' },
  ],
  display: 'swap',
  variable: '--font-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'monospace'],
  adjustFontFallback: false,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s` },
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
  themeColor: '#C8A55A',  // Æther gold (seed 41)
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // next-themes handles the cookie + localStorage + data-theme attribute
  // synchronously via its own inline script. No server-side cookie read here.
  return (
    <html lang="en" suppressHydrationWarning className={`${sans.variable} ${display.variable} ${mono.variable} dark`} data-theme="dark">
      <body className="bg-background text-foreground antialiased royal-entrance">
        {/*
          Belt-and-braces pre-paint script: next-themes also injects its own
          equivalent script, but we keep this one so any non-Chromium browser
          or a stale cache still renders the right <html data-theme="…"> before
          React hydrates (avoids flash of wrong theme).
        */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){document.documentElement.classList.add('dark');document.documentElement.setAttribute('data-theme','dark');})();`,
          }}
        />
        <AetherBackground />
        <ThemeProvider>
          <a href="#main" className="skip">Skip to content</a>
          {/* Cursor removed */}
          <ScrollProgress />
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CookieBanner />
          <ScrollReveal />
          <Analytics />
          <VercelAnalytics />
          <SpeedInsights />
          <SmoothScroll />
        </ThemeProvider>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={jsonLd([organizationLd(), websiteLd()])}
        />
      </body>
    </html>
  );
}
