"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function BudgetPageHeader() {
  return (
    <div className="space-y-4 pb-6 border-b border-[#161514]/15">
      {/* Minimal Editorial Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#5A5650] tracking-wider uppercase">
        <Link href="/dashboard" className="hover:text-[#161514] transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
        <span className="text-[#161514] font-medium">Budget</span>
      </nav>

      {/* Header Titles */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            FINANCIAL WORKSPACE
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] tracking-tight">
            Plan every rupee with clarity.
          </h1>
        </div>

        <p className="text-xs font-sans text-[#5A5650] italic">
          Your celebration budget, organized in one place.
        </p>
      </div>
    </div>
  );
}
