"use client";

import React from "react";
import { CategorySummaryStat } from "@/lib/budgetDashboard";

interface BudgetCategoryItemProps {
  category: CategorySummaryStat;
}

export function BudgetCategoryItem({ category }: BudgetCategoryItemProps) {
  return (
    <div className="p-6 bg-[#FAF8F5] border border-[#161514]/15 space-y-4 flex flex-col justify-between">
      <div className="flex items-start justify-between gap-2 border-b border-[#161514]/10 pb-3">
        <div className="space-y-0.5">
          <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880] block">
            {category.budgetPercentage}% OF BUDGET
          </span>
          <h4 className="font-serif text-xl font-light text-[#161514]">
            {category.name}
          </h4>
        </div>

        {category.isOverBudget && (
          <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-amber-100 text-amber-900 border border-amber-300">
            OVER BUDGET
          </span>
        )}

        {category.isFullyAllocated && (
          <span className="text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#F3EFEA] text-[#161514] border border-[#161514]/20">
            FULLY ALLOCATED
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between text-xs font-sans text-[#5A5650]">
            <span>{category.spentPercentage}% Allocated</span>
            <span>{category.formattedRemaining} left</span>
          </div>
          <div className="w-full h-2 bg-[#F3EFEA] border border-[#161514]/10 overflow-hidden">
            <div
              className={`h-full transition-all duration-500 ${
                category.isOverBudget ? "bg-amber-800" : "bg-[#C5A880]"
              }`}
              style={{ width: `${Math.min(category.spentPercentage, 100)}%` }}
            />
          </div>
        </div>

        {/* Planned vs Spent */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#161514]/10 text-xs">
          <div className="p-2 bg-[#F3EFEA]/60">
            <span className="text-[9px] uppercase text-[#5A5650] tracking-wider block">
              PLANNED
            </span>
            <span className="font-medium text-[#161514]">
              {category.formattedPlanned}
            </span>
          </div>

          <div className="p-2 bg-[#F3EFEA]/60">
            <span className="text-[9px] uppercase text-[#5A5650] tracking-wider block">
              SPENT
            </span>
            <span className="font-medium text-[#161514]">
              {category.formattedSpent}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
