"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckSquare } from "lucide-react";
import { ChecklistSummaryData } from "@/data/dashboard";

interface ChecklistProgressProps {
  checklist: ChecklistSummaryData;
}

export function ChecklistProgress({ checklist }: ChecklistProgressProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            TASKS
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Checklist Progress
          </h3>
        </div>

        <CheckSquare className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="space-y-4">
        <div>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#5A5650] block">
            PROGRESS
          </span>
          <span className="font-serif text-4xl font-light text-[#161514]">
            {checklist.percentageComplete}% COMPLETE
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#F3EFEA] overflow-hidden border border-[#161514]/10">
          <div
            className="h-full bg-[#161514] transition-all duration-500"
            style={{ width: `${checklist.percentageComplete}%` }}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="p-3 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
              COMPLETED
            </span>
            <span className="font-serif text-2xl font-light text-[#161514] block">
              {checklist.completed}
            </span>
          </div>

          <div className="p-3 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
              REMAINING
            </span>
            <span className="font-serif text-2xl font-light text-[#C5A880] block">
              {checklist.remaining}
            </span>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t border-[#161514]/15 flex items-center justify-between">
        <Link
          href="/dashboard/checklist"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <span>View checklist</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
