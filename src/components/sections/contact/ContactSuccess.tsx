"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw, CheckCircle2 } from "lucide-react";

interface ContactSuccessProps {
  onReset: () => void;
}

export function ContactSuccess({ onReset }: ContactSuccessProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 sm:p-12 bg-[#FAF8F5] border border-[#161514]/15 space-y-8"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-center gap-3">
        <CheckCircle2 className="w-6 h-6 text-[#C5A880]" />
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          THANK YOU
        </span>
      </div>

      <div className="space-y-4">
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light text-[#161514] leading-[1.18] tracking-tight">
          We have your starting point.
        </h3>
        <p className="font-sans text-base sm:text-lg text-[#5A5650] font-light leading-relaxed max-w-xl">
          Your enquiry has been captured for this demonstration. In the connected Wedora experience, this is where your conversation would begin.
        </p>
      </div>

      <div className="pt-6 border-t border-[#161514]/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <Link
          href="/register"
          className="px-6 py-3.5 bg-[#C5A880] text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
        >
          <span>Plan Your Wedding</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>

        <Link
          href="/"
          className="px-6 py-3.5 bg-transparent text-[#161514] border border-[#161514]/30 text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors"
        >
          <span>Back to Home</span>
        </Link>
      </div>

      <div className="pt-4 border-t border-[#161514]/10 flex items-center justify-between">
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase text-[#161514] hover:text-[#C5A880] transition-colors py-2 focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Start another enquiry</span>
        </button>

        <span className="text-[11px] text-[#5A5650] italic">
          Frontend Demonstration Mode
        </span>
      </div>
    </motion.div>
  );
}
