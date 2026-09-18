"use client";

import React from "react";
import { CalendarFilterState } from "@/lib/vendorCalendar";
import { Search, RotateCcw } from "lucide-react";

interface CalendarFiltersProps {
  filters: CalendarFilterState;
  onFilterChange: (updates: Partial<CalendarFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const CalendarFilters: React.FC<CalendarFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.type !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.status !== "ALL" ||
    filters.bookingId !== "ALL" ||
    filters.searchQuery.trim() !== "" ||
    filters.sortBy !== "DATE_ASC";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/10 p-5 mb-8">
      {/* Search & Sort Row */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search events, couples, venues, references..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] transition-colors"
          />
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
          <span className="text-xs text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{totalFilteredCount}</strong> events
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-calendar-by" className="text-xs uppercase tracking-wider text-[#5A5650] shrink-0">
              Sort:
            </label>
            <select
              id="sort-calendar-by"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as CalendarFilterState["sortBy"],
                })
              }
              className="bg-white border border-[#161514]/15 text-xs text-[#161514] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="DATE_ASC">Date (Soonest First)</option>
              <option value="DATE_DESC">Date (Latest First)</option>
              <option value="PRIORITY">Highest Priority</option>
              <option value="RECENTLY_UPDATED">Recently Updated</option>
              <option value="TYPE">Event Type</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-[#161514]/10">
        {/* Type */}
        <div>
          <label htmlFor="filter-calendar-type" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Event Type
          </label>
          <select
            id="filter-calendar-type"
            value={filters.type}
            onChange={(e) =>
              onFilterChange({
                type: e.target.value as CalendarFilterState["type"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Event Types</option>
            <option value="BOOKING">Booking Hold</option>
            <option value="WEDDING_EVENT">Wedding Event</option>
            <option value="PAYMENT_DUE">Payment Milestone</option>
            <option value="PREPARATION">Preparation</option>
            <option value="REMINDER">Reminder</option>
            <option value="BLOCKED">Blocked Dates</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="filter-calendar-priority" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Priority
          </label>
          <select
            id="filter-calendar-priority"
            value={filters.priority}
            onChange={(e) =>
              onFilterChange({
                priority: e.target.value as CalendarFilterState["priority"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Priorities</option>
            <option value="HIGH">High Priority</option>
            <option value="NORMAL">Normal Priority</option>
            <option value="LOW">Low Priority</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label htmlFor="filter-calendar-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Status
          </label>
          <select
            id="filter-calendar-status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as CalendarFilterState["status"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Statuses</option>
            <option value="SCHEDULED">Scheduled</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Booking Connection */}
        <div>
          <label htmlFor="filter-calendar-booking" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Related Booking
          </label>
          <select
            id="filter-calendar-booking"
            value={filters.bookingId}
            onChange={(e) => onFilterChange({ bookingId: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Bookings</option>
            <option value="bk-101">Aditi & Arjun (WED-2027-101)</option>
            <option value="bk-102">Ananya & Kabir (WED-2026-102)</option>
            <option value="bk-103">Priya & Dev (WED-2026-103)</option>
            <option value="bk-104">Meera & Rohan (WED-2027-104)</option>
            <option value="bk-107">Isha & Kunal (WED-2027-107)</option>
          </select>
        </div>
      </div>

      {/* Reset Trigger */}
      {isFiltered && (
        <div className="mt-4 pt-3 border-t border-[#161514]/10 flex items-center justify-end">
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs text-[#5A5650] hover:text-[#161514] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Reset filters & search</span>
          </button>
        </div>
      )}
    </div>
  );
};
