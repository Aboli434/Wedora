"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Wallet } from "lucide-react";
import { BudgetSummaryData } from "@/data/dashboard";

interface BudgetSnapshotProps {
  budget: BudgetSummaryData;
}

export function BudgetSnapshot({ budget }: BudgetSnapshotProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              FINANCES
            </span>
            <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#F3EFEA] text-[#5A5650] border border-[#161514]/10">
              ILLUSTRATIVE
            </span>
          </div>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Budget Overview
          </h3>
        </div>

        <Wallet className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#5A5650] block">
            ESTIMATED BUDGET
          </span>
          <span className="font-serif text-4xl font-light text-[#161514]">
            {budget.totalEstimated}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5 pt-2">
          <div className="flex justify-between text-xs font-sans text-[#5A5650]">
            <span>{budget.percentageSpent}% Spent</span>
            <span>{budget.remaining} Remaining</span>
          </div>
          <div className="w-full h-2 bg-[#F3EFEA] overflow-hidden border border-[#161514]/10">
            <div
              className="h-full bg-[#C5A880] transition-all duration-500"
              style={{ width: `${budget.percentageSpent}%` }}
            />
          </div>
        </div>

        {/* Breakdown Stats */}
        <div className="grid grid-cols-3 gap-2 pt-2 text-center border-t border-[#161514]/10">
          <div className="p-2 bg-[#F3EFEA]/60">
            <span className="text-[10px] uppercase text-[#5A5650] tracking-wider block">
              PLANNED
            </span>
            <span className="text-xs font-medium text-[#161514]">
              {budget.planned}
            </span>
          </div>
          <div className="p-2 bg-[#F3EFEA]/60">
            <span className="text-[10px] uppercase text-[#5A5650] tracking-wider block">
              SPENT
            </span>
            <span className="text-xs font-medium text-[#161514]">
              {budget.spent}
            </span>
          </div>
          <div className="p-2 bg-[#F3EFEA]/60">
            <span className="text-[10px] uppercase text-[#5A5650] tracking-wider block">
              REMAINING
            </span>
            <span className="text-xs font-medium text-[#C5A880]">
              {budget.remaining}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#161514]/15 flex items-center justify-between">
        <Link
          href="/dashboard/budget"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <span>View budget</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
