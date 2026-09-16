"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export function BudgetPageCTA() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 sm:p-10 bg-[#161514] text-[#FAF8F5] border border-[#161514] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6"
    >
      <div className="space-y-2 max-w-xl">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
          KEEP THE BIG PICTURE IN SIGHT
        </span>
        <h3 className="font-serif text-2xl sm:text-3xl font-light text-[#FAF8F5] leading-snug">
          Every thoughtful decision brings your celebration closer.
        </h3>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto">
        <Link
          href="/dashboard/checklist"
          className="px-6 py-3.5 bg-[#C5A880] text-[#161514] font-semibold text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:bg-white transition-colors whitespace-nowrap"
        >
          <span>Continue Planning</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>

        <Link
          href="/dashboard/vendors"
          className="px-6 py-3.5 bg-transparent text-[#FAF8F5] border border-[#FAF8F5]/30 text-xs tracking-[0.2em] uppercase inline-flex items-center justify-center hover:border-[#C5A880] hover:text-[#C5A880] transition-colors whitespace-nowrap"
        >
          <span>Explore Vendors</span>
        </Link>
      </div>
    </motion.div>
  );
}
