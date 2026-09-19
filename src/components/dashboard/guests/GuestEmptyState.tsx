"use client";

import React from "react";
import { RotateCcw, Plus } from "lucide-react";

interface GuestEmptyStateProps {
  isFiltered?: boolean;
  onAddGuest?: () => void;
  onClearFilters?: () => void;
}

export function GuestEmptyState({
  isFiltered = false,
  onAddGuest,
  onClearFilters,
}: GuestEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          GUEST LIST
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
          No guests match your filters.
        </h3>
        <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
          Try adjusting your search query or clearing active filters to view your guest list again.
        </p>
        {onClearFilters && (
          <button
            type="button"
            onClick={onClearFilters}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Clear active filters</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        GUEST LIST
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
        Start building your guest list.
      </h2>
      <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Keep everyone attending your celebration organised in one place.
      </p>
      {onAddGuest && (
        <button
          type="button"
          onClick={onAddGuest}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Add your first guest</span>
        </button>
      )}
    </div>
  );
}
