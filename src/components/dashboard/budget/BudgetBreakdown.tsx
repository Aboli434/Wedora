"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CategorySummaryStat } from "@/lib/budgetDashboard";

interface BudgetBreakdownProps {
  categoryTotals: CategorySummaryStat[];
}

export function BudgetBreakdown({ categoryTotals }: BudgetBreakdownProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="border-b border-[#161514]/15 pb-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
          ALLOCATION SPECTRUM
        </span>
        <h3 className="font-serif text-2xl font-light text-[#161514]">
          Where Your Budget Goes
        </h3>
      </div>

      {/* Category Horizontal Bar Breakdown */}
      <div className="space-y-4">
        {categoryTotals.map((cat) => (
          <div key={cat.id} className="space-y-1.5 p-3 bg-[#F3EFEA] border border-[#161514]/10">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-sans">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-[#161514]">{cat.name}</span>
                <span className="text-[10px] text-[#5A5650] uppercase tracking-wider">
                  ({cat.budgetPercentage}% of total)
                </span>
              </div>

              <div className="text-right">
                <span className="font-medium text-[#161514]">
                  {cat.formattedSpent}
                </span>
                <span className="text-[#5A5650]"> / {cat.formattedPlanned}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-[#FAF8F5] border border-[#161514]/10 overflow-hidden">
              <div
                className={`h-full transition-all duration-500 ${
                  cat.isOverBudget ? "bg-amber-800" : "bg-[#161514]"
                }`}
                style={{ width: `${Math.min(cat.spentPercentage, 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
