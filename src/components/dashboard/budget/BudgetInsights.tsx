"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { BudgetInsight } from "@/lib/budgetDashboard";

interface BudgetInsightsProps {
  insights: BudgetInsight[];
}

export function BudgetInsights({ insights }: BudgetInsightsProps) {
  const shouldReduceMotion = useReducedMotion();

  if (insights.length === 0) return null;

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.25, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex items-center gap-2 border-b border-[#161514]/15 pb-4">
        <Sparkles className="w-4 h-4 text-[#C5A880]" />
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#161514]">
          BUDGET OBSERVATIONS
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {insights.map((item) => (
          <div
            key={item.id}
            className="p-5 bg-[#F3EFEA] border border-[#161514]/12 space-y-2"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block">
              {item.title}
            </span>
            <p className="font-sans text-xs text-[#5A5650] font-light leading-relaxed">
              {item.text}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
