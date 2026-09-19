"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, Plus, Compass } from "lucide-react";

interface VendorEmptyStateProps {
  isFiltered?: boolean;
  onAddVendor?: () => void;
  onClearFilters?: () => void;
}

export function VendorEmptyState({
  isFiltered = false,
  onAddVendor,
  onClearFilters,
}: VendorEmptyStateProps) {
  if (isFiltered) {
    return (
      <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          VENDOR TEAM
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
          No vendors match your filters.
        </h3>
        <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
          Try adjusting your search query or clearing active filters to view your vendor team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
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
          <Link
            href="/vendors"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-sans uppercase tracking-[0.15em] text-[#161514] hover:text-[#C5A880] transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Explore vendors</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        VENDOR TEAM
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
        Start building your vendor team.
      </h2>
      <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Discover and shortlist the creative partners who will bring your celebration together.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/vendors"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-[0.15em] font-medium hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Explore vendors</span>
        </Link>
        {onAddVendor && (
          <button
            type="button"
            onClick={onAddVendor}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-sans uppercase tracking-[0.15em] text-[#161514] hover:text-[#C5A880] transition-colors"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Add a vendor</span>
          </button>
        )}
      </div>
    </div>
  );
}

