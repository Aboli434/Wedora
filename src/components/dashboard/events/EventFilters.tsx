"use client";

import React from "react";
import { EventFiltersState } from "@/lib/eventsDashboard";
import { Search, RotateCcw } from "lucide-react";

interface EventFiltersProps {
  filters: EventFiltersState;
  onFilterChange: (updated: Partial<EventFiltersState>) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalEvents: number;
  filteredCount: number;
  onResetFilters: () => void;
}

export function EventFilters({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  totalEvents,
  filteredCount,
  onResetFilters,
}: EventFiltersProps) {
  const isFiltered =
    filters.search !== "" ||
    filters.type !== "ALL" ||
    filters.status !== "ALL" ||
    filters.date !== "ALL" ||
    filters.readiness !== "ALL";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-4">
      {/* Top Search & Active Count Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search events by name, venue, city, description..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/70 focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-colors"
          />
        </div>

        {/* Counter & Clear Action */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-sans">
          <span className="text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{filteredCount}</strong> of{" "}
            <strong className="text-[#161514] font-medium">{totalEvents}</strong> events
          </span>

          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#5A5650] hover:text-[#161514] transition-colors underline underline-offset-4 focus:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Dropdown Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2 border-t border-[#161514]/10">
        {/* Event Type Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Event Type
          </label>
          <select
            value={filters.type}
            onChange={(e) => onFilterChange({ type: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Functions</option>
            <option value="MEHENDI">Mehendi & Sangeet</option>
            <option value="HALDI">Haldi Celebration</option>
            <option value="WEDDING">Wedding Ceremony</option>
            <option value="RECEPTION">Grand Reception</option>
            <option value="OTHER">Other Function</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Planning Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Statuses</option>
            <option value="PLANNING">Initial Setup</option>
            <option value="IN_PROGRESS">In Planning</option>
            <option value="READY">Ready</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Date Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Date Timeline
          </label>
          <select
            value={filters.date}
            onChange={(e) => onFilterChange({ date: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Dates</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Readiness Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Readiness
          </label>
          <select
            value={filters.readiness}
            onChange={(e) => onFilterChange({ readiness: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Readiness</option>
            <option value="NEEDS_ATTENTION">Needs Attention (&lt;75%)</option>
            <option value="ON_TRACK">On Track (75%-89%)</option>
            <option value="READY">Fully Ready (90%+)</option>
          </select>
        </div>

        {/* Sort Select */}
        <div className="space-y-1 col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="date_asc">Date — Earliest First</option>
            <option value="date_desc">Date — Latest First</option>
            <option value="name_asc">Name A–Z</option>
            <option value="readiness">Readiness</option>
            <option value="updated">Recently Updated</option>
          </select>
        </div>
      </div>
    </div>
  );
}
