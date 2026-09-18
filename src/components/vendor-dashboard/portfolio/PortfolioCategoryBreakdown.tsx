"use client";

import React from "react";
import { VendorPortfolioItem, PortfolioCategory } from "@/data/vendorPortfolio";
import { formatPortfolioCategory } from "@/lib/vendorPortfolio";

interface PortfolioCategoryBreakdownProps {
  items: VendorPortfolioItem[];
}

export function PortfolioCategoryBreakdown({ items }: PortfolioCategoryBreakdownProps) {
  const counts: Record<string, number> = {};
  items.forEach((i) => {
    counts[i.category] = (counts[i.category] || 0) + 1;
  });

  const entries = Object.entries(counts) as [PortfolioCategory, number][];

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-4">
      <div className="border-b border-[#E8E2D9] pb-3">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Category Distribution</h2>
        <p className="text-xs text-[#6E6B65] mt-0.5">
          Breakdown of portfolio artwork across creative disciplines.
        </p>
      </div>

      <div className="flex flex-wrap gap-3">
        {entries.map(([cat, count]) => (
          <div
            key={cat}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#E8E2D9] text-xs font-mono"
          >
            <span className="font-sans font-medium text-[#2C2A29]">
              {formatPortfolioCategory(cat)}
            </span>
            <span className="text-[#C5A880] font-semibold">&bull; {count}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
