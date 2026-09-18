"use client";

import React from "react";
import { VendorPortfolioSummary } from "@/data/vendorPortfolio";

interface PortfolioOverviewProps {
  summary: VendorPortfolioSummary;
}

export function PortfolioOverview({ summary }: PortfolioOverviewProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-4">
        <h2 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8C857B]">
          Portfolio Overview
        </h2>
        <span className="text-[10px] font-mono text-[#8C857B] bg-[#F2ECE4] px-2.5 py-0.5 rounded border border-[#E5DEC9] self-start sm:self-auto">
          ILLUSTRATIVE DEMO GALLERY
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.totalItems).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            TOTAL WORK
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Curated studio items</span>
        </div>

        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.publicItems).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            PUBLIC
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Visible on directory</span>
        </div>

        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.featuredItems).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            FEATURED
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Signature showcase</span>
        </div>

        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.categoryCount).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            CATEGORIES
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Spanning creative disciplines</span>
        </div>
      </div>

      {/* Completion Progress Bar */}
      <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[#6E6B65] font-medium">Portfolio Readiness</span>
          <span className="font-mono text-[#C5A880] font-semibold">
            {summary.portfolioCompletion}% COMPLETE
          </span>
        </div>
        <div className="w-full h-1.5 bg-[#E8E2D9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
            style={{ width: `${summary.portfolioCompletion}%` }}
            role="progressbar"
            aria-valuenow={summary.portfolioCompletion}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Portfolio completion: ${summary.portfolioCompletion} percent`}
          />
        </div>
      </div>
    </section>
  );
}
