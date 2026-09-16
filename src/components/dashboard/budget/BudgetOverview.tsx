"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { BudgetSummaryStats } from "@/lib/budgetDashboard";

interface BudgetOverviewProps {
  summary: BudgetSummaryStats;
}

export function BudgetOverview({ summary }: BudgetOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-8"
    >
      {/* Header & Total Budget */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#161514]/15 pb-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              TOTAL WEDDING BUDGET
            </span>
            <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#F3EFEA] text-[#5A5650] border border-[#161514]/10">
              ILLUSTRATIVE DEMO
            </span>
          </div>

          <h2 className="font-serif text-4xl sm:text-5xl font-light text-[#161514] tracking-tight">
            {summary.formattedTotalBudget}
          </h2>
        </div>

        {/* Link to public calculator */}
        <div className="p-4 bg-[#F3EFEA] border border-[#161514]/10 space-y-1 max-w-sm">
          <Link
            href="/budget-calculator"
            className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors group"
          >
            <span>Revisit the budget calculator</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <p className="text-[11px] font-sans text-[#5A5650] font-light leading-normal">
            Use the calculator for an illustrative starting estimate.
          </p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="font-medium text-[#161514]">
            {summary.spentPercentage}% of total budget spent ({summary.formattedSpentTotal})
          </span>
          <span className="text-[#5A5650]">
            {summary.formattedRemainingBudget} remaining
          </span>
        </div>

        <div className="w-full h-3 bg-[#F3EFEA] border border-[#161514]/10 overflow-hidden">
          <div
            className="h-full bg-[#C5A880] transition-all duration-500"
            style={{ width: `${Math.min(summary.spentPercentage, 100)}%` }}
          />
        </div>
      </div>

      {/* 3 Key Financial Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <div className="p-5 bg-[#F3EFEA] border border-[#161514]/12 space-y-1">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650] block">
            PLANNED ALLOCATION
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-light text-[#161514] block">
            {summary.formattedPlannedTotal}
          </span>
        </div>

        <div className="p-5 bg-[#F3EFEA] border border-[#161514]/12 space-y-1">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650] block">
            RECORDED EXPENSES
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-light text-[#161514] block">
            {summary.formattedSpentTotal}
          </span>
        </div>

        <div className="p-5 bg-[#F3EFEA] border border-[#161514]/12 space-y-1">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650] block">
            REMAINING BALANCE
          </span>
          <span className="font-serif text-2xl sm:text-3xl font-light text-[#C5A880] block">
            {summary.formattedRemainingBudget}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
