// @ts-nocheck
"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Button } from "@/components/ui/Button";
import { LiveAgentDemo } from "@/components/marketing/LiveAgentDemo";
import { ScrollReveal } from "@/components/beui/ScrollReveal";

import { site } from "@/lib/site";
import { resolveHeroVariant, type HeroVariant } from "@/lib/hero-variant";
import { GuaranteeMicro } from "./GuaranteeMicro";

export function Hero({ variant }: { variant?: HeroVariant } = {}) {
  const v = variant ?? resolveHeroVariant(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <>
      {/* Scroll progress — orange bar */}
      {!reduce && (
        <div className="scroll-progress">
          <motion.div
            className="scroll-progress-bar"
            style={{ width: scrollProgressWidth(progress) }}
          />
        </div>
      )}

      <section className="relative overflow-hidden bg-ink">
        {/* Subtle dark grid overlay */}
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-30"
        />

        <div className="max-w-[86rem] mx-auto px-6 lg:px-8 relative pt-28 pb-24 sm:pt-36 sm:pb-32">
          {/* Eyebrow — orange, uppercase, wide tracking */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="mb-8"
          >
            <p className="text-sm font-semibold tracking-[0.3em] uppercase text-brand">
              <span className="inline-block w-2 h-2 bg-brand rounded-full animate-pulse-dot mr-3" />
              Now booking Q3 — 2 spots left
            </p>
          </motion.div>

          {/* Headline — two lines, uppercase display */}
          <motion.h1
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1], delay: 0.1 }}
            className="font-display text-hero font-normal uppercase tracking-tight leading-[1.05] text-white max-w-5xl"
          >
            <span className="block">{v.headline}</span>
            <span className="block mt-3 sm:mt-4 text-sand/40">{v.tagline}</span>
          </motion.h1>

          {/* CTA — pill button, orange fill */}
          <ScrollReveal y={20} delay={0.4} duration={0.5}>
            <div className="mt-10 sm:mt-14" id="hero-cta">
              <Button
                href={site.bookOrMailto}
                external
                variant="secondary"
                size="lg"
                trackAs="hero_book_call"
                className="rounded-full px-8 py-4 text-xs font-display font-semibold uppercase tracking-[0.2em] text-white bg-brand"
              >
                Book a growth call
                <span aria-hidden className="ml-2">→</span>
              </Button>
            </div>
          </ScrollReveal>

          {/* Guarantee */}
          <ScrollReveal y={12} delay={0.6} duration={0.5}>
            <div className="mt-5">
              <GuaranteeMicro variant="default" />
            </div>
          </ScrollReveal>

          {/* Outcome strip — 4 metrics */}
          <ScrollReveal y={20} delay={0.8} duration={0.5}>
            <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 border-t border-white/10 pt-8">
              {[
                { v: "$200K+", l: "Pipeline in 90 days", sub: "or month 4 free" },
                { v: "4×", l: "Pipeline coverage", sub: "≥ 3× target" },
                { v: "60s", l: "Loop tick", sub: "score → route → close" },
                { v: "100%", l: "Senior team", sub: "no juniors, ever" },
              ].map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
                  whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: [0.4, 0, 0.2, 1] }}
                >
                  <p className="font-display text-2xl sm:text-3xl font-normal uppercase tracking-tight text-white">
                    {s.v}
                  </p>
                  <p className="mt-1 text-sm font-medium text-sand">{s.l}</p>
                  <p className="text-xs text-stone">{s.sub}</p>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>

          {/* Stack row */}
          <ScrollReveal y={16} delay={1.0} duration={0.5}>
            <div className="mt-14 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-stone">
              <span className="font-mono uppercase tracking-[0.25em] text-[10px] text-stone/50">
                Stack
              </span>
              {site.stack.map((name, i, arr) => (
                <span key={name} className="flex items-center gap-x-8">
                  <span className="font-display font-semibold text-sand">{name}</span>
                  {i < arr.length - 1 && <span className="opacity-20">·</span>}
                </span>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats band — alternate bg-panel */}
      {(() => {
        const stats = [
          { v: site.stats.brandsScaled, l: "Brands scaled" },
          { v: site.stats.countriesServed, l: "Countries" },
          { v: site.stats.teamSize, l: "Senior partners" },
          { v: site.stats.seniorOnly, l: "Senior team" },
        ].filter((s) => s.v != null && s.v !== "");
        if (stats.length === 0) return null;
        return (
          <section className="bg-panel border-y border-white/[0.06]">
            <div className="max-w-[86rem] mx-auto px-6 lg:px-8 py-12 grid grid-cols-2 lg:grid-cols-4 gap-px">
              {stats.map((s, i) => (
                <motion.div
                  key={s.l}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
                  whileInView={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] }}
                  className="text-center py-4"
                >
                  <p className="font-display text-3xl sm:text-5xl font-normal uppercase tracking-tight text-white">
                    {s.v}
                  </p>
                  <p className="mt-2 font-sans text-[11px] tracking-[0.25em] uppercase text-stone">
                    {s.l}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>
        );
      })()}

      {/* Agent demo — bg-ink */}
      <section className="bg-ink py-24 sm:py-32">
        <div className="max-w-[86rem] mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-sm font-semibold tracking-[0.3em] uppercase text-brand mb-3">Run a real BAZ agent</p>
              <h2 className="font-display text-section font-normal uppercase tracking-tight text-white max-w-2xl">
                Press play. Watch a senior operator execute.
              </h2>
            </div>
            <p className="text-sm text-stone max-w-sm">
              Each agent is a real workflow our team runs daily. Output below is what you&apos;d
              get on the first call — only faster.
            </p>
          </div>
          <LiveAgentDemo />
        </div>
      </section>
    </>
  );
}

function scrollProgressWidth(progress: { current: number } | number) {
  return progress;
}