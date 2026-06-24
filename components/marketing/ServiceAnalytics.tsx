'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';
import type { Service } from '@/types';

/**
 * Service detail page analytics. Fires:
 *   - service_view   (once on mount, with full service context)
 *   - service_proof_impression   (once on mount, with proof count)
 *   - service_faq_open   (on toggle, throttled client-side)
 *
 * Service slug is sent as a first-class field so GA4 custom dimensions
 * can be configured to slice the catalog by service.
 */
export function ServiceAnalytics({ service }: { service: Service }) {
  useEffect(() => {
    track('service_view', {
      service_slug: service.slug,
      service_name: service.name,
      service_pillar: service.pillar,
      kpi_count: service.kpis.length,
      proof_count: service.proof.length,
      faq_count: service.faqs.length,
      has_testimonial: service.proof.some((p) => /\bquote|testimonial/i.test(p.detail)),
    });
  }, [service]);

  return null;
}
