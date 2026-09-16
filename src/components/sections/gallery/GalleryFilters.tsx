"use client";

import React from "react";
import { GALLERY_CATEGORIES } from "@/data/gallery";

interface GalleryFiltersProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export function GalleryFilters({
  selectedCategory,
  onSelectCategory,
}: GalleryFiltersProps) {
  return (
    <div className="w-full overflow-x-auto no-scrollbar py-6 border-y border-[#161514]/10 mb-12">
      <div className="flex items-center gap-2 sm:gap-4 min-w-max">
        <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#161514]/60 mr-2">
          Category:
        </span>
        {GALLERY_CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 text-xs font-sans tracking-[0.18em] uppercase transition-all duration-300 cursor-pointer ${
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
