"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { BudgetResultData, formatIndianRupees } from "@/lib/budgetCalculator";
import { Edit3, RotateCcw } from "lucide-react";

interface BudgetResultProps {
  result: BudgetResultData;
  onEdit: () => void;
  onReset: () => void;
}

export function BudgetResult({ result, onEdit, onReset }: BudgetResultProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="space-y-12">
      {/* Top Estimate Card Highlight */}
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
        className="p-8 sm:p-12 bg-[#161514] text-[#FAF8F5] text-center relative overflow-hidden border border-[#C5A880]/30 shadow-xl"
      >
        <span className="text-[10px] sm:text-[11px] font-semibold tracking-[0.3em] uppercase text-[#C5A880] mb-3 block">
          ILLUSTRATIVE ESTIMATE
        </span>

        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-[#FAF8F5] tracking-tight mb-4">
          {result.formattedTotal}
        </h2>

        <p className="font-sans text-sm sm:text-base text-[#FAF8F5]/80 font-light max-w-xl mx-auto leading-relaxed">
          Based on the details you shared, here&apos;s a thoughtful starting point for your celebration.
        </p>

        {/* Action Controls Bar */}
        <div className="mt-8 pt-6 border-t border-[#FAF8F5]/15 flex flex-wrap items-center justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={onEdit}
            className="inline-flex items-center gap-2 border-[#FAF8F5]/40 text-[#FAF8F5] hover:bg-[#FAF8F5] hover:text-[#161514]"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit your plan</span>
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={onReset}
            className="inline-flex items-center gap-2 text-[#FAF8F5]/70 hover:text-[#C5A880]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Start again</span>
          </Button>
        </div>
      </motion.div>

      {/* Breakdown Section */}
      <div className="space-y-6">
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
          Category Allocation Breakdown
        </h3>

        <div className="space-y-5 border-t border-[#161514]/15 pt-6">
          {result.breakdown.map((item, idx) => (
            <div key={item.key} className="space-y-2">
              <div className="flex items-center justify-between text-xs sm:text-sm font-sans">
                <span className="font-medium text-[#161514]">{item.label}</span>
                <div className="flex items-center gap-3">
                  <span className="text-[#5A5650] font-light">
                    {formatIndianRupees(item.amount)}
                  </span>
                  <span className="font-semibold text-[#161514] w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>

              {/* Allocation Bar */}
              <div className="h-2 w-full bg-[#161514]/10 overflow-hidden">
                <motion.div
                  initial={shouldReduceMotion ? { width: `${item.percentage}%` } : { width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 0.8, delay: idx * 0.08, ease: [0.25, 1, 0.5, 1] }}
                  className="h-full bg-[#C5A880]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Editorial Interpretation Note */}
      <div className="p-6 sm:p-8 bg-[#F3EFEA] border border-[#161514]/10 space-y-3">
        <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
          READING THE ESTIMATE
        </span>
        <h4 className="font-serif text-xl sm:text-2xl font-light text-[#161514]">
          A starting point, not a final number.
        </h4>
        <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed">
          Your actual wedding budget will depend on the venue, vendors, guest experience, season, availability, and the choices that make the celebration uniquely yours.
        </p>
      </div>
    </div>
  );
}
