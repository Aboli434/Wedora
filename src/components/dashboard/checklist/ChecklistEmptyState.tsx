"use client";

import React from "react";
import { RotateCcw, Plus } from "lucide-react";

interface ChecklistEmptyStateProps {
  isFiltered?: boolean;
  onAddTask?: () => void;
  onClearFilters?: () => void;
}

export function ChecklistEmptyState({
  isFiltered = false,
  onAddTask,
  onClearFilters,
}: ChecklistEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="p-10 md:p-12 bg-[#FAF8F5] border border-[#161514]/15 text-center space-y-4 max-w-xl mx-auto my-6">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          PLANNING CHECKLIST
        </span>
        <h3 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
          No tasks match your filters.
        </h3>
        <p className="font-sans text-xs text-[#5A5650] max-w-sm mx-auto leading-relaxed">
          Try changing your filters, category selection, or search terms to find what you&apos;re looking for.
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
        PLANNING CHECKLIST
      </span>
      <h2 className="font-serif text-2xl md:text-3xl font-light text-[#161514]">
        Start with your planning checklist.
      </h2>
      <p className="font-sans text-xs text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Turn the big picture into manageable steps, one decision at a time.
      </p>
      {onAddTask && (
        <button
          type="button"
          onClick={onAddTask}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.15em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Add your first task</span>
        </button>
      )}
    </div>
  );
}

