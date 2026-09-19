"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Plus } from "lucide-react";

interface ChecklistPageHeaderProps {
  completedCount: number;
  totalCount: number;
  onAddTaskClick?: () => void;
}

export function ChecklistPageHeader({
  completedCount,
  totalCount,
  onAddTaskClick,
}: ChecklistPageHeaderProps) {
  return (
    <div className="space-y-4 pb-6 border-b border-[#161514]/15">
      {/* Minimal Editorial Breadcrumb */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-sans text-[#5A5650] tracking-wider uppercase">
        <Link href="/dashboard" className="hover:text-[#161514] transition-colors">
          Dashboard
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
        <span className="text-[#161514] font-medium">Checklist</span>
      </nav>

      {/* Header Titles & Dynamic Count */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="space-y-1">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            THE CHECKLIST
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light text-[#161514] tracking-tight">
            Everything that needs to happen, thoughtfully organized.
          </h1>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="px-3.5 py-2 bg-[#F3EFEA] border border-[#161514]/15 text-xs font-semibold tracking-widest uppercase text-[#161514] whitespace-nowrap text-center">
            {completedCount} of {totalCount} tasks complete
          </div>

          {onAddTaskClick && (
            <button
              onClick={onAddTaskClick}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none shadow-sm shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>Add Task</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
