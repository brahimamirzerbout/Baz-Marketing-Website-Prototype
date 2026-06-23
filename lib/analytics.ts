/**
 * Lightweight, dependency-free analytics layer.
 * Pushes to window.dataLayer (works with GTM and GA4), and
 * also dispatches a CustomEvent for in-app handlers.
 *
 * Disable in env by leaving NEXT_PUBLIC_GA4_ID empty — the
 * dataLayer.push still runs (so it can be wired to other tools),
 * but no GA4-specific calls are made.
 */
declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type EventName =
  | 'page_view'
  | 'cta_click'
  | 'form_submit'
  | 'form_submit_success'
  | 'form_submit_error'
  | 'case_study_view'
  | 'service_view'
  | 'pricing_view'
  | 'newsletter_signup'
  | 'book_call_click'
  | 'phone_click'
  | 'email_click'
  | 'outbound_link'
  | 'search';

type EventPayload = Record<string, string | number | boolean | undefined>;

export function track(event: EventName, payload: EventPayload = {}) {
  if (typeof window === 'undefined') return;

  const enriched = { event, ts: Date.now(), ...payload };
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(enriched);

  // GA4 event format
  if (typeof window.gtag === 'function') {
    window.gtag('event', event, payload);
  }

  // Custom DOM event for in-app listeners
  window.dispatchEvent(new CustomEvent('baz:track', { detail: enriched }));
}

/**
 * Click handler factory: wraps an action so the click is tracked
 * before navigation/handler runs.
 */
export function trackedClick<E extends React.MouseEvent>(
  event: EventName,
  payload: EventPayload,
  action?: (e: E) => void
) {
  return (e: E) => {
    track(event, payload);
    action?.(e);
  };
}
