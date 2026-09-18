"use client";

import React from "react";
import Link from "next/link";
import { Plus, ArrowUpRight } from "lucide-react";

interface PortfolioPageHeaderProps {
  onAddWork: () => void;
}

export function PortfolioPageHeader({ onAddWork }: PortfolioPageHeaderProps) {
  return (
    <div className="space-y-4 border-b border-[#E8E2D9] pb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8C857B]">
        <ol className="flex items-center gap-2 font-mono">
          <li>Vendor Studio</li>
          <li>/</li>
          <li className="text-[#2C2A29] font-medium" aria-current="page">
            Portfolio
          </li>
        </ol>
      </nav>

      {/* Main Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 max-w-3xl">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            PORTFOLIO MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#2C2A29] font-light">
            Let your work speak first.
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B65] leading-relaxed pt-1">
            Curate the images that help couples understand your style, your eye, and the celebrations you create for.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onAddWork}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] hover:bg-[#1A1918] transition-colors rounded-md shadow-xs"
          >
            <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Add Work</span>
          </button>

          <Link
            href="/vendors/the-frame-house"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#594B3C] bg-[#F2ECE4] border border-[#E5DEC9] rounded-md hover:bg-[#EAE4DB] transition-colors"
          >
            <span>View Public Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
