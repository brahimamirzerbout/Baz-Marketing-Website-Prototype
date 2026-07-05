"use client";
import { useEffect } from "react";

/**
 * ÆTHER Monochrome — silk background.
 */
export function AetherBackground() {
  useEffect(() => {
    // Theme bootstrap: default dark, honor localStorage 'aether-theme'
    try {
      const t = localStorage.getItem("aether-theme");
      if (t === "light") document.documentElement.classList.remove("dark");
      else document.documentElement.classList.add("dark");
    } catch {
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <>
      {/* Silk Background */}
      <div className="silk-bg" aria-hidden>
        <div className="silk-layer silk-layer-1" />
        <div className="silk-layer silk-layer-2" />
        <div className="silk-layer silk-layer-3" />
        <div className="silk-layer silk-layer-4" />
        <div className="silk-sheen" />
        <svg className="silk-weave" width="100%" height="100%" preserveAspectRatio="none">
          <filter id="silkWeave">
            <feTurbulence type="fractalNoise" baseFrequency="0.006 0.012" numOctaves={2} seed={4}>
              <animate
                attributeName="baseFrequency"
                values="0.006 0.012;0.01 0.008;0.006 0.012"
                dur="30s"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#silkWeave)" />
        </svg>
      </div>
    </>
  );
}