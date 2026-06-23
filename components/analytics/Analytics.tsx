'use client';

import Script from 'next/script';
import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * GA4 + GTM bootstrap. Reads NEXT_PUBLIC_GA4_ID. If empty,
 * the page still pushes to dataLayer so events can be observed
 * in dev tools, but no GA4-specific network calls happen.
 */
export function Analytics() {
  const id = process.env.NEXT_PUBLIC_GA4_ID;

  useEffect(() => {
    // Surface page view to any listeners
    track('page_view', { path: location.pathname, title: document.title });
  }, []);

  if (!id) return null;

  return (
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true, send_page_view: true });
        `}
      </Script>
    </>
  );
}
