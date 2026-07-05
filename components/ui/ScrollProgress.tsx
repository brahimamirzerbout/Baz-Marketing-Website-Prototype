"use client";

import { useScroll, useSpring, motion, useReducedMotion } from "motion/react";

export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  if (reduce) return null;

  return (
    <div className="scroll-progress" aria-hidden>
      <motion.div
        className="scroll-progress-bar"
        style={{ scaleX: progress, transformOrigin: "0% 50%" }}
      />
    </div>
  );
}
