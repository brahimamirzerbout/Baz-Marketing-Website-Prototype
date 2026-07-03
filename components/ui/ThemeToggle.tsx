// @ts-nocheck
"use client";

import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/beui/utils";

/**
 * ThemeToggle — beUI-inspired with View Transition API.
 * Works with baz/ existing data-theme attribute system.
 */

const VT_STYLE_ID = "baz-theme-vt";
const VT_CSS = `
html[data-baz-vt="circle"]::view-transition-old(root) {
  animation: none; mix-blend-mode: normal;
}
html[data-baz-vt="circle"]::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: baz-circle-reveal 650ms cubic-bezier(0.4, 0, 0.2, 1);
}
@keyframes baz-circle-reveal {
  from { clip-path: circle(0% at var(--baz-vt-origin, 50% 100%)); }
  to   { clip-path: circle(150% at var(--baz-vt-origin, 50% 100%)); }
}
@media (prefers-reduced-motion: reduce) {
  html[data-baz-vt]::view-transition-new(root) { animation: none; }
}
`;

function getTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

function setTheme(mode: "light" | "dark") {
  const root = document.documentElement;
  if (mode === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.remove("dark");
  }
  root.setAttribute("data-theme", mode);
  try {
    localStorage.setItem("baz:theme", mode);
  } catch {}
}

export function ThemeToggle({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const [mounted, setMounted] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setMounted(true);
    setDark(getTheme() === "dark");
  }, []);

  useEffect(() => {
    if (document.getElementById(VT_STYLE_ID)) return;
    const el = document.createElement("style");
    el.id = VT_STYLE_ID;
    el.textContent = VT_CSS;
    document.head.appendChild(el);
  }, []);

  async function toggle() {
    const next = dark ? "light" : "dark";
    const apply = () => {
      setTheme(next);
      setDark(next === "dark");
    };

    if (reduce || typeof document === "undefined" || !("startViewTransition" in document)) {
      apply();
      return;
    }

    const root = document.documentElement;
    root.style.setProperty("--baz-vt-origin", "50% 100%");
    root.dataset.bazVt = "circle";

    const vt = (
      document as Document & { startViewTransition?: (cb: () => void) => void }
    ).startViewTransition(apply);
    try {
      await vt.finished;
    } finally {
      delete root.dataset.bazVt;
    }
  }

  return (
    <button
      type="button"
      aria-label={mounted && dark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={toggle}
      className={cn(
        "relative inline-flex items-center justify-center p-2 rounded-full",
        "border border-border",
        "text-foreground",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted && dark ? (
          <motion.span
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            <Sun className="w-4 h-4" />
          </motion.span>
        ) : mounted ? (
          <motion.span
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.25 }}
            className="inline-flex"
          >
            <Moon className="w-4 h-4" />
          </motion.span>
        ) : (
          <span className="w-4 h-4 inline-block" aria-hidden="true" />
        )}
      </AnimatePresence>
    </button>
  );
}
