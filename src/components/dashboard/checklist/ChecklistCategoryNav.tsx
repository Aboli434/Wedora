"use client";

import React from "react";
import { CHECKLIST_CATEGORIES, ChecklistTask } from "@/data/checklist";

interface ChecklistCategoryNavProps {
  selectedCategory: string;
  onSelectCategory: (categoryId: string) => void;
  tasks: ChecklistTask[];
}

export function ChecklistCategoryNav({
  selectedCategory,
  onSelectCategory,
  tasks,
}: ChecklistCategoryNavProps) {
  return (
    <div className="border-b border-[#161514]/15">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 -mb-px">
        {CHECKLIST_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;

          const count =
            cat.id === "all"
              ? tasks.length
              : tasks.filter((t) => t.categoryId === cat.id).length;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory(cat.id)}
              className={`px-4 py-3 text-xs font-semibold tracking-[0.18em] uppercase transition-colors flex items-center gap-2 whitespace-nowrap border-b-2 ${
                isSelected
                  ? "border-[#C5A880] text-[#161514] font-bold"
                  : "border-transparent text-[#5A5650] hover:text-[#161514] hover:border-[#161514]/20"
              }`}
            >
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-1.5 py-0.5 rounded-none border transition-colors ${
                  isSelected
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#F3EFEA] text-[#5A5650] border-[#161514]/10"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
