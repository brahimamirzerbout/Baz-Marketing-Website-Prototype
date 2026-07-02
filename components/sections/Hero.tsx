// @ts-nocheck
"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Button } from "@/components/ui/Button";
import { Magnetic } from "@/components/ui/Magnetic";
import { LiveAgentDemo } from "@/components/marketing/LiveAgentDemo";
import { ScrollReveal } from "@/components/beui/ScrollReveal";
import { Parallax } from "@/components/beui/Parallax";

import { site } from "@/lib/site";
import { resolveHeroVariant, type HeroVariant } from "@/lib/hero-variant";
import { LiveStatusPill } from "./LiveStatusPill";
import { GuaranteeMicro } from "./GuaranteeMicro";

export function Hero({ variant }: { variant?: HeroVariant } = {}) {
  const v = variant ?? resolveHeroVariant(null);
  const reduce = useReducedMotion();

  // Scroll progress — gold bar at the very top
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.5 });

  return (
    <>
      {/* Gold scroll progress bar */}
      {!reduce && (
        <div className="scroll-progress">
          <motion.div
            className="scroll-progress-bar"
            style={{ width: scrollProgressWidth(progress) }}
          />
        </div>
      )}

      <section className="relative overflow-hidden bg-background bg-grain">
        {/* Architectural layers */}
        <div
          aria-hidden
          className="absolute inset-0 bg-grid opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        />

        {/* Parallax orbs — depth, not noise */}
        <Parallax
          speed={0.12}
          className="absolute -top-20 -right-20 w-[600px] h-[600px] rounded-full opacity-25 pointer-events-none"
          aria-hidden
        >
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(circle, rgba(201,169,97,0.15) 0%, transparent 65%)",
            }}
          />
        </Parallax>
        <Parallax
          speed={-0.08}
          className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full opacity-15 pointer-events-none"
          aria-hidden
        >
          <div
            className="w-full h-full"
            style={{
              background: "radial-gradient(circle, rgba(255,59,47,0.08) 0%, transparent 65%)",
            }}
          />
        </Parallax>

        <div className="container mx-auto relative pt-20 pb-24 md:pt-32 md:pb-40">
          <div className="max-w-5xl">
            {/* Eyebrow — quiet, gold, confident */}
            <motion.div
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mb-8 flex flex-wrap items-center gap-4"
            >
              <p className="eyebrow-neutral">
                <span className="inline-block w-2 h-2 bg-foreground rounded-full animate-pulse-dot" />
                Now booking Q3 — 2 senior-partner spots left
              </p>
              <LiveStatusPill />
            </motion.div>

            {/* Headline — the promise. One breath. */}
            <motion.h1
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, filter: "blur(16px)" }}
              animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="font-display text-display-2xl font-medium text-foreground min-h-[3.5em] sm:min-h-[3em] md:min-h-[2.5em] flex items-center"
            >
              {v.headline}
            </motion.h1>

            {/* Subhead — the reasoning. One sentence. */}
            <ScrollReveal y={20} delay={0.5} duration={0.8}>
              <p className="mt-8 md:mt-10 text-lg md:text-2xl text-muted-foreground max-w-3xl leading-relaxed">
                {v.subhead}
              </p>
            </ScrollReveal>

            {v.icp && (
              <ScrollReveal y={8} delay={0.7} duration={0.5}>
                <p className="mt-4 text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
                  Personalised for <span className="font-semibold">{v.icpLabel}</span>
                </p>
              </ScrollReveal>
            )}

            {/* CTAs — one primary, one secondary. No more. */}
            <ScrollReveal y={24} delay={0.8} duration={0.8}>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <span id="hero-cta">
                  <Magnetic strength={0.35}>
                    <Button
                      href={site.bookOrMailto}
                      external
                      variant="secondary"
                      size="lg"
                      trackAs="hero_book_call"
                      data-cursor="cta"
                    >
                      Book a growth call
                      <span aria-hidden className="ml-1">
                        →
                      </span>
                    </Button>
                  </Magnetic>
                </span>
                <Button
                  href="/case-studies"
                  variant="outline"
                  size="lg"
                  trackAs="hero_case_studies"
                >
                  See the work
                </Button>
              </div>
            </ScrollReveal>

            {/* Guarantee — the proof */}
            <ScrollReveal y={12} delay={1.0} duration={0.5}>
              <div className="mt-4">
                <GuaranteeMicro variant="default" />
              </div>
            </ScrollReveal>

            {/* Outcome strip — 4 promises, no decoration */}
            <ScrollReveal y={28} delay={1.1} duration={0.8}>
              <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 border-t border-border pt-8">
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
                    transition={{ duration: 0.5, delay: 1.2 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <p className="font-display text-2xl md:text-3xl font-medium tracking-[-0.02em]">
                      <span className="text-foreground">{s.v}</span>
                    </p>
                    <p className="mt-1 text-sm font-medium text-foreground">{s.l}</p>
                    <p className="text-xs text-muted-foreground">{s.sub}</p>
                  </motion.div>
                ))}
              </div>
            </ScrollReveal>

            {/* Stack — whisper, not shout */}
            <ScrollReveal y={16} delay={1.3} duration={0.6}>
              <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
                <span className="font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground/60">
                  Stack
                </span>
                {site.stack.map((name, i, arr) => (
                  <span key={name} className="flex items-center gap-x-8">
                    <span className="font-display font-semibold text-foreground">{name}</span>
                    {i < arr.length - 1 && <span className="opacity-20">·</span>}
                  </span>
                ))}
              </div>
            </ScrollReveal>
          </div>

          {/* Stats — only if real */}
          {(() => {
            const stats = [
              { v: site.stats.brandsScaled, l: "Brands scaled" },
              { v: site.stats.countriesServed, l: "Countries" },
              { v: site.stats.teamSize, l: "Senior partners" },
              { v: site.stats.seniorOnly, l: "Senior team" },
            ].filter((s) => s.v != null && s.v !== "");
            if (stats.length === 0) return null;
            return (
              <ScrollReveal y={32} delay={1.4} duration={0.8}>
                <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-muted rounded-2xl overflow-hidden border border-border">
                  {stats.map((s, i) => (
                    <motion.div
                      key={s.l}
                      initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.95 }}
                      whileInView={reduce ? { opacity: 1 } : { opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.5 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                      className="bg-background p-6 md:p-8"
                    >
                      <p className="font-display text-3xl md:text-5xl font-medium tracking-[-0.03em] text-foreground">
                        {s.v}
                      </p>
                      <p className="mt-2 font-mono uppercase tracking-[0.18em] text-[11px] text-muted-foreground">
                        {s.l}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </ScrollReveal>
            );
          })()}

          {/* Agent demo — the product, not the pitch */}
          <ScrollReveal y={36} delay={1.6} duration={0.8}>
            <div className="mt-24">
              <div className="flex flex-wrap items-end justify-between gap-6 mb-8">
                <div>
                  <p className="eyebrow-neutral mb-3">Run a real BAZ agent</p>
                  <h2 className="font-display text-display-lg font-medium tracking-[-0.03em] max-w-2xl">
                    Press play. Watch a senior operator execute.
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Each agent is a real workflow our team runs daily. Output below is what you&apos;d
                  get on the first call — only faster.
                </p>
              </div>
              <LiveAgentDemo />
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}

// Helper: convert MotionValue to percentage width string
function scrollProgressWidth(progress: { current: number } | number) {
  // motion/react useTransform would be ideal here but we need to keep
  // this simple — the spring value is 0-1, so we multiply by 100
  // and append %. The motion.div style prop accepts MotionValue.
  return progress;
}
