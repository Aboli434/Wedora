"use client";

import React from "react";
import { Plus } from "lucide-react";

interface PortfolioEmptyStateProps {
  onAddWork: () => void;
}

export function PortfolioEmptyState({ onAddWork }: PortfolioEmptyStateProps) {
  return (
    <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-10 md:p-14 text-center space-y-4 max-w-2xl mx-auto">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        YOUR WORK
      </span>

      <h2 className="font-serif text-3xl md:text-4xl text-[#2C2A29] font-light">
        Start with the work you&apos;re proudest of.
      </h2>

      <p className="text-sm text-[#6E6B65] max-w-md mx-auto leading-relaxed">
        Add a few considered pieces so couples can understand your visual style before they enquire.
      </p>

      <div className="pt-2">
        <button
          type="button"
          onClick={onAddWork}
          className="inline-flex items-center gap-2 px-6 py-3 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] hover:bg-[#1A1918] transition-colors rounded-md shadow-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          <span>Add Your First Work</span>
        </button>
      </div>
    </div>
  );
}
