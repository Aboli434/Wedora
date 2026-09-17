"use client";

import React from "react";
import { SearchX, RotateCcw } from "lucide-react";

interface VendorEmptyStateProps {
  onClearFilters: () => void;
}

export function VendorEmptyState({ onClearFilters }: VendorEmptyStateProps) {
  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-12 text-center space-y-4 max-w-xl mx-auto my-6">
      <div className="w-12 h-12 rounded-full bg-[#161514]/5 flex items-center justify-center mx-auto text-[#5A5650]">
        <SearchX className="w-6 h-6 text-[#C5A880]" />
      </div>

      <div className="space-y-1">
        <h3 className="font-serif text-2xl text-[#161514] font-light">
          No vendors match those filters.
        </h3>
        <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
          Try adjusting your search query or clearing one of your active filters to view your vendor workspace.
        </p>
      </div>

      <button
        onClick={onClearFilters}
        className="inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        <span>Clear filters</span>
      </button>
    </div>
  );
}
