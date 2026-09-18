"use client";

import React from "react";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import { getPortfolioItemsNeedingAttention } from "@/lib/vendorPortfolio";
import { AlertCircle, CheckCircle2, ArrowRight } from "lucide-react";

interface PortfolioNeedsAttentionProps {
  items: VendorPortfolioItem[];
  onSelectWork: (item: VendorPortfolioItem) => void;
}

export function PortfolioNeedsAttention({ items, onSelectWork }: PortfolioNeedsAttentionProps) {
  const issues = getPortfolioItemsNeedingAttention(items);

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-4">
      <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Needs attention</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            Refine your portfolio metadata to maximize discovery by inquiring couples.
          </p>
        </div>
        <span className="text-[10px] font-mono text-[#8C857B] bg-[#F2ECE4] px-2.5 py-0.5 rounded border border-[#E5DEC9]">
          {issues.length} Items
        </span>
      </div>

      {issues.length === 0 ? (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs text-emerald-950 font-medium">
          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
          <span>Your portfolio is ready to be discovered on Wedora.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {issues.map(({ item, reason }, idx) => (
            <div
              key={`${item.id}-${idx}`}
              className="flex items-center justify-between p-3.5 rounded-lg bg-white border border-[#E8E2D9] text-xs hover:border-[#DCD5C9] transition-colors"
            >
              <div className="flex items-center gap-2.5 pr-2">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <div>
                  <p className="font-medium text-[#2C2A29]">{item.title}</p>
                  <p className="text-[11px] text-[#8C857B]">{reason}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectWork(item)}
                className="inline-flex items-center gap-1 text-[11px] font-medium text-[#C5A880] hover:text-[#2C2A29] shrink-0"
              >
                <span>Edit</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
