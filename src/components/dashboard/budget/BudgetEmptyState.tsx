"use client";

import React from "react";
import { RotateCcw, Plus } from "lucide-react";

interface BudgetEmptyStateProps {
  isFiltered?: boolean;
  onAddExpense?: () => void;
  onClearFilters?: () => void;
}

export function BudgetEmptyState({
  isFiltered = false,
  onAddExpense,
  onClearFilters,
}: BudgetEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="p-10 md:p-12 bg-[#FAF8F5] border border-[#161514]/15 text-center space-y-4 max-w-xl mx-auto my-6">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          WEDDING BUDGET
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
          Budget items not found.
        </h3>
        <p className="font-sans text-xs text-[#5A5650] max-w-sm mx-auto leading-relaxed">
          Try changing your category selection, payment status filter, or search keywords.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear active filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-10 md:p-12 bg-[#FAF8F5] border border-[#161514]/15 text-center space-y-4 max-w-xl mx-auto my-6">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        WEDDING BUDGET
      </span>
      <h2 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
        Give your celebration a budget.
      </h2>
      <p className="font-sans text-xs text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Set your overall plan first, then keep spending decisions connected to it.
      </p>
      {onAddExpense && (
        <button
          type="button"
          onClick={onAddExpense}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Set your budget</span>
        </button>
      )}
    </div>
  );
}

