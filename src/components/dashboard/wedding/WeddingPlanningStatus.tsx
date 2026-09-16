"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckSquare, Wallet, Users } from "lucide-react";
import { WeddingPlanningStatusSummary } from "@/data/wedding";

interface WeddingPlanningStatusProps {
  summary: WeddingPlanningStatusSummary;
}

export function WeddingPlanningStatus({ summary }: WeddingPlanningStatusProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="border-b border-[#161514]/15 pb-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
          OVERVIEW
        </span>
        <h3 className="font-serif text-2xl font-light text-[#161514]">
          Planning at a Glance
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* CHECKLIST */}
        <div className="p-6 bg-[#F3EFEA] border border-[#161514]/12 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650]">
              CHECKLIST
            </span>
            <CheckSquare className="w-4 h-4 text-[#C5A880]" />
          </div>

          <div className="space-y-1">
            <span className="font-serif text-3xl font-light text-[#161514] block">
              {summary.checklistPercent}%
            </span>
            <span className="text-xs font-sans text-[#5A5650] block">
              {summary.checklistText}
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#FAF8F5] border border-[#161514]/10 overflow-hidden">
            <div
              className="h-full bg-[#161514]"
              style={{ width: `${summary.checklistPercent}%` }}
            />
          </div>

          <div className="pt-2 border-t border-[#161514]/10">
            <Link
              href="/dashboard/checklist"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
            >
              <span>View checklist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* BUDGET */}
        <div className="p-6 bg-[#F3EFEA] border border-[#161514]/12 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650]">
                BUDGET
              </span>
              {summary.isBudgetIllustrative && (
                <span className="text-[8px] font-semibold tracking-wider uppercase px-1.5 py-0.5 bg-[#FAF8F5] text-[#5A5650] border border-[#161514]/10">
                  ILLUSTRATIVE
                </span>
              )}
            </div>
            <Wallet className="w-4 h-4 text-[#C5A880]" />
          </div>

          <div className="space-y-1">
            <span className="font-serif text-3xl font-light text-[#161514] block">
              {summary.budgetAmount}
            </span>
            <span className="text-xs font-sans text-[#5A5650] block">
              Estimated budget
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#FAF8F5] border border-[#161514]/10 overflow-hidden">
            <div className="h-full bg-[#C5A880] w-[53%]" />
          </div>

          <div className="pt-2 border-t border-[#161514]/10">
            <Link
              href="/dashboard/budget"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
            >
              <span>View budget</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* GUESTS */}
        <div className="p-6 bg-[#F3EFEA] border border-[#161514]/12 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650]">
              GUESTS
            </span>
            <Users className="w-4 h-4 text-[#C5A880]" />
          </div>

          <div className="space-y-1">
            <span className="font-serif text-3xl font-light text-[#161514] block">
              {summary.guestCountInvited}
            </span>
            <span className="text-xs font-sans text-[#5A5650] block">
              {summary.guestCountConfirmed} confirmed RSVPs
            </span>
          </div>

          <div className="w-full h-1.5 bg-[#FAF8F5] border border-[#161514]/10 overflow-hidden">
            <div className="h-full bg-[#5A5650] w-[67%]" />
          </div>

          <div className="pt-2 border-t border-[#161514]/10">
            <Link
              href="/dashboard/guests"
              className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
            >
              <span>Manage guests</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
