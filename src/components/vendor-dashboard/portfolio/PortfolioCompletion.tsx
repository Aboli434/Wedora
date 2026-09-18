"use client";

import React from "react";
import { VendorPortfolioItem } from "@/data/vendorPortfolio";
import { calculatePortfolioCompletion } from "@/lib/vendorPortfolio";

interface PortfolioCompletionProps {
  items: VendorPortfolioItem[];
}

export function PortfolioCompletion({ items }: PortfolioCompletionProps) {
  const score = calculatePortfolioCompletion(items);

  const publicCount = items.filter((i) => i.visibility === "PUBLIC").length;
  const featuredCount = items.filter((i) => i.featured).length;

  let advice = "Your portfolio gallery is comprehensive and well-structured.";
  if (items.length < 3) {
    advice = "Add at least 3 portfolio works so couples can explore your style.";
  } else if (publicCount < 1) {
    advice = "Add at least one public work to make your studio discoverable.";
  } else if (featuredCount < 1) {
    advice = "Feature your signature work to showcase it prominently at the top.";
  } else if (score < 100) {
    advice = "Complete missing alt text or captions to reach 100% completion.";
  }

  return (
    <div className="p-4 rounded-lg bg-white border border-[#E8E2D9] space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#2C2A29]">Portfolio Completeness</span>
        <span className="font-mono text-[#C5A880] font-semibold">{score}% COMPLETE</span>
      </div>

      <div className="w-full h-1.5 bg-[#E8E2D9] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-[11px] text-[#6E6B65] italic">{advice}</p>
    </div>
  );
}
