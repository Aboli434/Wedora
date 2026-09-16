"use client";

import React from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { Button } from "@/components/ui/Button";

export function HeroContent() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  const headlineLineVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.25, 1, 0.5, 1] as const },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-3xl space-y-4 sm:space-y-6 lg:space-y-8 text-left"
    >
      {/* Eyebrow */}
      <motion.div variants={itemVariants} className="inline-block">
        <span className="caption tracking-[0.3em] text-[var(--accent-gold)] bg-[#161514] px-3.5 py-1.5 border border-[var(--accent-gold)]/30 shadow-xs">
          Wedding Planning, Reimagined
        </span>
      </motion.div>

      {/* Main Headline with Split Line Reveal */}
      <div className="space-y-1 sm:space-y-2">
        <div className="overflow-hidden">
          <motion.h1
            variants={headlineLineVariants}
            className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.04] font-light text-[var(--text-light)]"
          >
            Your Story.
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            variants={headlineLineVariants}
            className="font-serif italic text-5xl sm:text-7xl lg:text-8xl tracking-tight leading-[1.04] font-light text-[var(--accent-gold)]"
          >
            Our Celebration.
          </motion.h1>
        </div>
      </div>

      {/* Supporting Text */}
      <motion.p
        variants={itemVariants}
        className="font-sans text-base sm:text-lg lg:text-xl text-[var(--text-light)]/80 max-w-xl font-normal leading-relaxed tracking-wide"
      >
        From intimate beginnings to unforgettable celebrations, we bring every detail of your wedding together beautifully.
      </motion.p>

      {/* CTA Actions */}
      <motion.div
        variants={itemVariants}
        className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4"
      >
        <Link href="/register">
          <Button variant="primary" size="lg">
            Plan Your Wedding
          </Button>
        </Link>

        <Link href="/real-weddings">
          <Button
            variant="outline"
            size="lg"
            className="text-white border-white/50 hover:border-white hover:bg-white hover:text-[#161514]"
          >
            Explore Weddings
          </Button>
        </Link>
      </motion.div>
    </motion.div>
  );
}
