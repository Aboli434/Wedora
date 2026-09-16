"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CheckSquare, AlertCircle, Clock, Calendar } from "lucide-react";
import { ChecklistProgressStats } from "@/lib/checklist";

interface ChecklistOverviewProps {
  stats: ChecklistProgressStats;
}

export function ChecklistOverview({ stats }: ChecklistOverviewProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            PROGRESS METRICS
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Your Planning Progress
          </h3>
        </div>

        <CheckSquare className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Main Progress Bar & Large Percentage */}
        <div className="lg:col-span-6 space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="font-serif text-4xl sm:text-5xl font-light text-[#161514]">
              {stats.percentageComplete}%{" "}
              <span className="font-serif text-2xl text-[#C5A880]">COMPLETE</span>
            </span>
            <span className="text-xs font-sans text-[#5A5650] uppercase tracking-wider">
              {stats.completedCount} / {stats.totalCount} Tasks
            </span>
          </div>

          <div className="w-full h-2.5 bg-[#F3EFEA] border border-[#161514]/10 overflow-hidden">
            <div
              className="h-full bg-[#161514] transition-all duration-500"
              style={{ width: `${stats.percentageComplete}%` }}
            />
          </div>
        </div>

        {/* Secondary Metric Cards */}
        <div className="lg:col-span-6 grid grid-cols-3 gap-3">
          <div className="p-3.5 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[#C5A880]">
              <AlertCircle className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
                HIGH PRIORITY
              </span>
            </div>
            <span className="font-serif text-2xl font-light text-[#161514] block">
              {stats.highPriorityRemaining}
            </span>
          </div>

          <div className="p-3.5 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <div className="flex items-center gap-1.5 text-[#C5A880]">
              <Calendar className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
                DUE THIS WEEK
              </span>
            </div>
            <span className="font-serif text-2xl font-light text-[#161514] block">
              {stats.dueSoonCount}
            </span>
          </div>

          <div className="p-3.5 bg-[#F3EFEA] border border-[#161514]/10 space-y-1">
            <div className="flex items-center gap-1.5 text-amber-700">
              <Clock className="w-3.5 h-3.5" />
              <span className="text-[10px] font-semibold tracking-wider uppercase text-[#5A5650]">
                OVERDUE
              </span>
            </div>
            <span className="font-serif text-2xl font-light text-[#161514] block">
              {stats.overdueCount}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
