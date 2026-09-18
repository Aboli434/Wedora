"use client";

import React from "react";
import { PortfolioFiltersState } from "@/lib/vendorPortfolio";
import { Search, RotateCcw } from "lucide-react";

interface PortfolioFiltersProps {
  filters: PortfolioFiltersState;
  onChange: (updated: PortfolioFiltersState) => void;
}

const CATEGORY_OPTIONS: { value: string; label: string }[] = [
  { value: "ALL", label: "All Categories" },
  { value: "WEDDINGS", label: "Weddings" },
  { value: "PRE_WEDDING", label: "Pre-Wedding" },
  { value: "PORTRAITS", label: "Portraits" },
  { value: "DETAILS", label: "Details" },
  { value: "DECOR", label: "Decor & Floral" },
  { value: "EVENTS", label: "Events & Parties" },
  { value: "OTHER", label: "Other Work" },
];

export function PortfolioFilters({ filters, onChange }: PortfolioFiltersProps) {
  const handleReset = () => {
    onChange({
      search: "",
      category: "ALL",
      visibility: "ALL",
      featured: "ALL",
      sortBy: "featured",
    });
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-5 space-y-4">
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#8C857B] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onChange({ ...filters, search: e.target.value })}
            placeholder="Search portfolio by title, location, description, or couple name..."
            className="w-full bg-white border border-[#DCD5C9] rounded-lg pl-10 pr-4 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="portSortBy" className="text-xs text-[#8C857B] font-medium hidden sm:inline-block">
            Sort by:
          </label>
          <select
            id="portSortBy"
            value={filters.sortBy}
            onChange={(e) =>
              onChange({ ...filters, sortBy: e.target.value as PortfolioFiltersState["sortBy"] })
            }
            className="bg-white border border-[#DCD5C9] rounded-lg px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="featured">Featured First</option>
            <option value="updated">Recently Updated</option>
            <option value="name">Title (A-Z)</option>
            <option value="oldest">Oldest First</option>
            <option value="manual">Manual Gallery Order</option>
          </select>

          <button
            type="button"
            onClick={handleReset}
            className="p-2 text-[#8C857B] hover:text-[#2C2A29] bg-white border border-[#DCD5C9] rounded-lg transition-colors"
            title="Reset Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Select Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#E8E2D9]">
        {/* Category Filter */}
        <div>
          <label htmlFor="portCategoryFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Category
          </label>
          <select
            id="portCategoryFilter"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            {CATEGORY_OPTIONS.map((cat) => (
              <option key={cat.value} value={cat.value}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>

        {/* Visibility Filter */}
        <div>
          <label htmlFor="portVisibilityFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Visibility
          </label>
          <select
            id="portVisibilityFilter"
            value={filters.visibility}
            onChange={(e) => onChange({ ...filters, visibility: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Visibility</option>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>

        {/* Featured Filter */}
        <div>
          <label htmlFor="portFeaturedFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Featured Status
          </label>
          <select
            id="portFeaturedFilter"
            value={filters.featured}
            onChange={(e) => onChange({ ...filters, featured: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Work</option>
            <option value="FEATURED">Featured Signature Work</option>
            <option value="NOT_FEATURED">Standard Gallery Work</option>
          </select>
        </div>
      </div>
    </div>
  );
}
