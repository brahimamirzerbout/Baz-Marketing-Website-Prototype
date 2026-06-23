'use client';

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'baz:cookie-consent';

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch { /* ignore */ }
  }, []);

  function decide(value: 'accept' | 'decline') {
    try { localStorage.setItem(STORAGE_KEY, value); } catch { /* ignore */ }
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed bottom-4 inset-x-4 md:bottom-6 md:right-6 md:left-auto z-50 max-w-md md:ml-auto"
    >
      <div className="bg-white rounded-2xl shadow-lift border border-ink-100 p-5 md:p-6">
        <p className="font-display text-lg leading-snug mb-2">We use cookies for analytics.</p>
        <p className="text-sm text-ink-600 mb-4">
          We use first-party analytics (no third-party tracking) to understand which pages
          convert. You can opt out anytime.
        </p>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => decide('accept')}
            className="inline-flex items-center justify-center h-10 px-4 rounded-full bg-ink-900 text-paper text-sm font-medium hover:bg-ink-800 transition-colors"
          >
            Accept
          </button>
          <button
            onClick={() => decide('decline')}
            className="inline-flex items-center justify-center h-10 px-4 rounded-full border border-ink-200 hover:border-ink-900 text-sm font-medium transition-colors"
          >
            Decline
          </button>
        </div>
      </div>
    </div>
  );
}
