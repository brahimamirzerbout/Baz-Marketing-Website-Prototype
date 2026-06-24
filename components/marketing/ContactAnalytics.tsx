'use client';

import { useEffect } from 'react';
import { track } from '@/lib/analytics';

/**
 * Contact page analytics. Fires contact_view with the service context
 * (if arrived from /contact?service=X). Combined with form_submit_success
 * (already wired) this gives end-to-end attribution:
 *
 *   service_view → contact_view → form_submit → form_submit_success
 *
 * The service slug becomes a first-class dimension so GA4 funnels can
 * be built per service.
 */
export function ContactAnalytics({ service }: { service?: string }) {
  useEffect(() => {
    track('contact_view', {
      service_slug: service || undefined,
      has_service_context: !!service,
    });
  }, [service]);
  return null;
}
