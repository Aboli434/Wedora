"use client";

import React from "react";
import { GuestFiltersState } from "@/lib/guests";
import { Search, RotateCcw } from "lucide-react";

interface GuestFiltersProps {
  filters: GuestFiltersState;
  onFilterChange: (updated: Partial<GuestFiltersState>) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalGuests: number;
  filteredCount: number;
  onResetFilters: () => void;
}

export function GuestFilters({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  totalGuests,
  filteredCount,
  onResetFilters,
}: GuestFiltersProps) {
  const isFiltered =
    filters.search !== "" ||
    filters.group !== "ALL" ||
    filters.status !== "ALL" ||
    filters.mealPreference !== "ALL" ||
    filters.plusOne !== "ALL" ||
    filters.event !== "ALL";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-4">
      {/* Top Search & Active Count Row */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search guests by name, notes, group, email..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/70 focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-colors"
          />
        </div>

        {/* Count & Reset */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-sans">
          <span className="text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{filteredCount}</strong> of{" "}
            <strong className="text-[#161514] font-medium">{totalGuests}</strong> guests
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

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-[#161514]/10">
        {/* Group Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Group
          </label>
          <select
            value={filters.group}
            onChange={(e) => onFilterChange({ group: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Groups</option>
            <option value="FAMILY">Family</option>
            <option value="FRIENDS">Friends</option>
            <option value="COLLEAGUES">Colleagues</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* RSVP Status Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            RSVP Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Responses</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="PENDING">Pending</option>
            <option value="DECLINED">Declined</option>
            <option value="INVITED">Invited</option>
          </select>
        </div>

        {/* Meal Preference Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Meal
          </label>
          <select
            value={filters.mealPreference}
            onChange={(e) => onFilterChange({ mealPreference: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Preferences</option>
            <option value="VEGETARIAN">Vegetarian</option>
            <option value="NON_VEGETARIAN">Non-Vegetarian</option>
            <option value="VEGAN">Vegan</option>
            <option value="JAIN">Jain</option>
            <option value="OTHER">Other</option>
            <option value="NOT_SPECIFIED">Not Specified</option>
          </select>
        </div>

        {/* Plus-One Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Plus-One
          </label>
          <select
            value={filters.plusOne}
            onChange={(e) => onFilterChange({ plusOne: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Guests</option>
            <option value="WITH_PLUS_ONE">With Plus-One</option>
            <option value="WITHOUT_PLUS_ONE">Without Plus-One</option>
          </select>
        </div>

        {/* Event Attendance Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Event
          </label>
          <select
            value={filters.event}
            onChange={(e) => onFilterChange({ event: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Events</option>
            <option value="mehendi">Mehendi & Sangeet</option>
            <option value="haldi">Haldi Celebration</option>
            <option value="wedding">Wedding Ceremony</option>
            <option value="reception">Grand Reception</option>
          </select>
        </div>

        {/* Sort Select */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="name_asc">Name A–Z</option>
            <option value="name_desc">Name Z–A</option>
            <option value="updated">Recently Updated</option>
            <option value="status">RSVP Status</option>
          </select>
        </div>
      </div>
    </div>
  );
}
