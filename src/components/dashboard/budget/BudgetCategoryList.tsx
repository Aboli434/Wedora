"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { CategorySummaryStat } from "@/lib/budgetDashboard";
import { BudgetCategoryItem } from "./BudgetCategoryItem";

interface BudgetCategoryListProps {
  categories: CategorySummaryStat[];
}

export function BudgetCategoryList({ categories }: BudgetCategoryListProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="space-y-6"
    >
      <div className="border-b border-[#161514]/15 pb-4">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880] block">
          CATEGORIES
        </span>
        <h3 className="font-serif text-2xl font-light text-[#161514]">
          Category Breakdown
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <BudgetCategoryItem key={cat.id} category={cat} />
        ))}
      </div>
    </motion.div>
  );
}
