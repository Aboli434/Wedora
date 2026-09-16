"use client";

import React from "react";
import { BLOG_CATEGORIES } from "@/data/blog";

interface BlogFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function BlogFilters({
  selectedCategory,
  onSelectCategory,
}: BlogFiltersProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-4 border-y border-[#161514]/10 mb-8">
      <div className="flex items-center gap-2 sm:gap-3 min-w-max">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#161514]/60 mr-2">
          Category:
        </span>
        {BLOG_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
                isActive
                  ? "bg-[#161514] text-[#FAF8F5] font-medium"
                  : "bg-transparent text-[#161514]/70 hover:text-[#161514] hover:bg-[#161514]/5"
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}
