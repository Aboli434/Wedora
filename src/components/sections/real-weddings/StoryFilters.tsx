"use client";

import React from "react";
import { WEDDING_FILTER_TAGS } from "@/data/realWeddings";

interface StoryFiltersProps {
  selectedTag: string;
  onSelectTag: (tag: string) => void;
}

export function StoryFilters({ selectedTag, onSelectTag }: StoryFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 sm:gap-3 py-6 border-y border-[#161514]/10 mb-12">
      <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#161514]/60 mr-2">
        Style:
      </span>
      {WEDDING_FILTER_TAGS.map((tag) => {
        const isActive = selectedTag === tag;
        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={`px-4 py-2 text-xs font-sans tracking-[0.15em] uppercase transition-all duration-300 cursor-pointer ${
              isActive
                ? "bg-[#161514] text-[#FAF8F5] font-medium"
                : "bg-transparent text-[#161514]/70 hover:text-[#161514] hover:bg-[#161514]/5"
            }`}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
