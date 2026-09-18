"use client";

import React from "react";
import { ServiceFiltersState } from "@/lib/vendorServices";
import { Search, RotateCcw } from "lucide-react";

interface ServiceFiltersProps {
  filters: ServiceFiltersState;
  onChange: (updated: ServiceFiltersState) => void;
  categories: string[];
}

export function ServiceFilters({ filters, onChange, categories }: ServiceFiltersProps) {
  const handleReset = () => {
    onChange({
      search: "",
      category: "ALL",
      pricingType: "ALL",
      availability: "ALL",
      visibility: "ALL",
      sortBy: "updated",
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
            placeholder="Search services by name, category, or description..."
            className="w-full bg-white border border-[#DCD5C9] rounded-lg pl-10 pr-4 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          />
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <label htmlFor="sortBy" className="text-xs text-[#8C857B] font-medium hidden sm:inline-block">
            Sort by:
          </label>
          <select
            id="sortBy"
            value={filters.sortBy}
            onChange={(e) =>
              onChange({ ...filters, sortBy: e.target.value as ServiceFiltersState["sortBy"] })
            }
            className="bg-white border border-[#DCD5C9] rounded-lg px-3 py-2 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="updated">Recently Updated / Featured</option>
            <option value="name">Name (A-Z)</option>
            <option value="priceAsc">Price (Low to High)</option>
            <option value="priceDesc">Price (High to Low)</option>
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
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-[#E8E2D9]">
        {/* Category Filter */}
        <div>
          <label htmlFor="categoryFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Category
          </label>
          <select
            id="categoryFilter"
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Pricing Type Filter */}
        <div>
          <label htmlFor="pricingTypeFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Pricing Type
          </label>
          <select
            id="pricingTypeFilter"
            value={filters.pricingType}
            onChange={(e) => onChange({ ...filters, pricingType: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Pricing Types</option>
            <option value="STARTING_FROM">Starting From</option>
            <option value="FIXED">Fixed Price</option>
            <option value="CUSTOM_QUOTE">Custom Quote</option>
          </select>
        </div>

        {/* Availability Filter */}
        <div>
          <label htmlFor="availabilityFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Availability
          </label>
          <select
            id="availabilityFilter"
            value={filters.availability}
            onChange={(e) => onChange({ ...filters, availability: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Availability</option>
            <option value="AVAILABLE">Available</option>
            <option value="LIMITED">Limited</option>
            <option value="UNAVAILABLE">Unavailable</option>
          </select>
        </div>

        {/* Visibility Filter */}
        <div>
          <label htmlFor="visibilityFilter" className="text-[10px] uppercase tracking-wider text-[#8C857B] font-medium block mb-1">
            Visibility
          </label>
          <select
            id="visibilityFilter"
            value={filters.visibility}
            onChange={(e) => onChange({ ...filters, visibility: e.target.value })}
            className="w-full bg-white border border-[#DCD5C9] rounded-md px-2.5 py-1.5 text-xs text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Visibility</option>
            <option value="PUBLIC">Public</option>
            <option value="PRIVATE">Private</option>
          </select>
        </div>
      </div>
    </div>
  );
}
