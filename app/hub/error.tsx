"use client";

import Link from "next/link";
import { motion } from "motion/react";

export default function HubError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="bg-background text-foreground py-24 md:py-40">
      <div className="container mx-auto">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-mono uppercase tracking-[0.18em] text-[11px] mb-4 text-muted-foreground"
          >
            Hub Error
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-display-2xl font-medium tracking-[-0.04em]"
          >
            Something went wrong in the Hub.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-lg text-muted-foreground"
          >
            {error.message || "An unexpected error occurred. Try again."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button
              onClick={reset}
              className="inline-flex items-center gap-2 px-5 h-12 rounded-full bg-accent text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Try again
            </button>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-5 h-12 rounded-full border border-border hover:border-foreground font-medium transition-colors"
            >
              Back to home
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
