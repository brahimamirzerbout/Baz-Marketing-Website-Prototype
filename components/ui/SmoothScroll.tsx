"use client";
import "lenis/dist/lenis.css";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * SmoothScroll — initializes Lenis smooth scroll on mount and tears it
 * down on unmount. Side-effect-only component: renders null. Place once
 * near the bottom of <body> (inside layout.tsx).
 *
 * Reference: https://github.com/darkroomengineering/lenis (v1.x)
 * App Router pattern: client component with useEffect, no provider needed.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const lenis = new Lenis({
      duration: 1.2,
      smoothWheel: true,
    });

    let rafId = 0;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return null;
}
