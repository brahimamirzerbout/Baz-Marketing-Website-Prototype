"use client";
import { useEffect, useRef } from "react";

/**
 * ÆTHER Monochrome — silk background + scroll-progress bar.
 * Cursor effect removed.
 */
export function AetherBackground() {
  const progRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Theme bootstrap: default dark, honor localStorage 'aether-theme'
    try {
      const t = localStorage.getItem("aether-theme");
      if (t === "light") document.documentElement.classList.remove("dark");
      else document.documentElement.classList.add("dark");
    } catch {
      document.documentElement.classList.add("dark");
    }

    const cProg = progRef.current;
    const onScroll = () => {
      if (!cProg) return;
      const h = document.documentElement.scrollHeight - window.innerHeight;
      cProg.style.width = (h > 0 ? (window.scrollY / h) * 100 : 0) + "%";
    };

    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    onScroll();

    return () => {
      document.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div className="scroll-progress" ref={progRef} aria-hidden />
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