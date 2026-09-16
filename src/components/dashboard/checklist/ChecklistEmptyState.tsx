"use client";

import React from "react";
import { SearchX } from "lucide-react";

interface ChecklistEmptyStateProps {
  onClearFilters: () => void;
}

export function ChecklistEmptyState({
  onClearFilters,
}: ChecklistEmptyStateProps) {
  return (
    <div className="p-12 bg-[#FAF8F5] border border-[#161514]/15 text-center space-y-4">
      <div className="w-12 h-12 mx-auto rounded-full bg-[#F3EFEA] flex items-center justify-center text-[#C5A880]">
        <SearchX className="w-6 h-6" />
      </div>

      <div className="space-y-1">
        <h4 className="font-serif text-2xl font-light text-[#161514]">
          No Tasks Found
        </h4>
        <p className="font-sans text-xs sm:text-sm text-[#5A5650] font-light max-w-sm mx-auto">
          Try changing your filters, category selection, or search terms to find what you&apos;re looking for.
        </p>
      </div>

      <div className="pt-2">
        <button
          type="button"
          onClick={onClearFilters}
          className="px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.18em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          Clear filters
        </button>
      </div>
    </div>
  );
}
