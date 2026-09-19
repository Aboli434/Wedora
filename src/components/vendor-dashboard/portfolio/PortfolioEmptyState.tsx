"use client";

import React from "react";
import { Plus } from "lucide-react";

interface PortfolioEmptyStateProps {
  onAddWork: () => void;
}

export function PortfolioEmptyState({ onAddWork }: PortfolioEmptyStateProps) {
  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        PORTFOLIO &amp; WORK
      </span>

      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
        Show your work.
      </h2>

      <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        A strong portfolio helps couples understand your style before they enquire.
      </p>

      <div className="pt-2">
        <button
          type="button"
          onClick={onAddWork}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Add portfolio work</span>
        </button>
      </div>
    </div>
  );
}

