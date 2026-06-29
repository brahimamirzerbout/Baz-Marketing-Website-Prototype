'use client';

import { useCallback, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

/**
 * Light/dark theme toggle.
 *
 * Backed by next-themes which handles cookie + localStorage + <html
 * data-theme> attribute swap. We keep `storageKey="baz:theme"` in the
 * ThemeProvider so existing user preference in localStorage is honored.
 *
 * Adds a smooth color transition on switch by toggling the `theme-transition`
 * class for 250ms (prefers-reduced-motion aware, see globals.css).
 *
 * Keyboard shortcut: Cmd/Ctrl + Shift + L toggles theme from anywhere on the
 * page — same as GitHub / Linear / Notion. Suppressed when the user is typing
 * in an input or textarea so it doesn't hijack form work.
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = useCallback(() => {
    const root = document.documentElement;
    const current = resolvedTheme || theme || 'light';
    const next = current === 'light' ? 'dark' : 'light';
    // brief global transition for the color flip; scrubbed after 250ms
    // so it doesn't slow down unrelated interactions.
    root.classList.add('theme-transition');
    setTheme(next);
    window.setTimeout(() => root.classList.remove('theme-transition'), 260);
  }, [theme, resolvedTheme, setTheme]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (!(e.metaKey || e.ctrlKey) || !e.shiftKey || e.altKey) return;
      if (e.key !== 'L' && e.key !== 'l') return;
      const t = e.target as HTMLElement | null;
      if (t) {
        const tag = t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || t.isContentEditable) return;
      }
      e.preventDefault();
      toggle();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [toggle]);

  // While pre-hydration we don't know what the stored value is — render a
  // neutral placeholder of the same size to avoid layout shift.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme (Cmd/Ctrl + Shift + L)"
        title="Toggle theme (Cmd/Ctrl + Shift + L)"
        className="theme-toggle"
        // Inline-block keeps the button taking up its real width so layout
        // doesn't jump when the real icon appears.
        style={{ opacity: 0, width: 16, height: 16 }}
      />
    );
  }

  const current = resolvedTheme || theme || 'light';
  const next = current === 'light' ? 'dark' : 'light';

  return (
    <button
      type="button"
      aria-label={`Switch to ${next} theme (Cmd/Ctrl + Shift + L)`}
      title={`Switch to ${next} theme (Cmd/Ctrl + Shift + L)`}
      onClick={toggle}
      className="theme-toggle"
    >
      <span aria-hidden style={{ display: 'inline-block', width: 16, height: 16 }}>
        {current === 'light' ? (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        )}
      </span>
    </button>
  );
}
