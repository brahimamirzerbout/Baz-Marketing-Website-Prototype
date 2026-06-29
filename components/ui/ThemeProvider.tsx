"use client";

/**
 * next-themes ThemeProvider for BAZ.
 *
 * BAZ used to manage theme via a hand-rolled cookie + localStorage pair.
 * We migrated to next-themes (pinned v0.4.6, Mar 2025 last release, dominant
 * 19.7M weekly DLs) for: zero-FOUC SSR, cookie-first so the server-rendered
 * HTML already carries the correct data-theme, and a single source of truth.
 *
 * storageKey is set to "baz:theme" so existing user preferences in
 * localStorage are preserved.
 */
import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ReactNode } from "react";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      storageKey="baz:theme"
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}
