"use client";

import React from "react";
import { VendorFiltersState } from "@/lib/vendorsDashboard";
import { Search, RotateCcw } from "lucide-react";

interface VendorFiltersProps {
  filters: VendorFiltersState;
  onFilterChange: (updated: Partial<VendorFiltersState>) => void;
  sortBy: string;
  onSortChange: (sort: string) => void;
  totalVendors: number;
  filteredCount: number;
  onResetFilters: () => void;
}

export function VendorFilters({
  filters,
  onFilterChange,
  sortBy,
  onSortChange,
  totalVendors,
  filteredCount,
  onResetFilters,
}: VendorFiltersProps) {
  const isFiltered =
    filters.search !== "" ||
    filters.category !== "ALL" ||
    filters.status !== "ALL" ||
    filters.paymentStatus !== "ALL" ||
    filters.event !== "ALL";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-4">
      {/* Top Search & Result Counter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-lg">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search your vendors by name, category, location, notes..."
            value={filters.search}
            onChange={(e) => onFilterChange({ search: e.target.value })}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/70 focus:outline-none focus:ring-1 focus:ring-[#C5A880] transition-colors"
          />
        </div>

        {/* Counter & Clear Action */}
        <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-sans">
          <span className="text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{filteredCount}</strong> of{" "}
            <strong className="text-[#161514] font-medium">{totalVendors}</strong> vendors
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-[#161514]/10">
        {/* Category Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Category
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFilterChange({ category: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Categories</option>
            <option value="PLANNING">Planning</option>
            <option value="PHOTOGRAPHY">Photography</option>
            <option value="DECOR">Decor & Design</option>
            <option value="VENUE">Venue</option>
            <option value="CATERING">Catering</option>
            <option value="MUSIC">Music & Entertainment</option>
            <option value="BRIDAL">Bridal & Couture</option>
            <option value="MAKEUP">Makeup & Hair</option>
            <option value="TRAVEL">Travel & Logistics</option>
            <option value="OTHER">Other Services</option>
          </select>
        </div>

        {/* Booking Status Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Booking Status
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFilterChange({ status: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Statuses</option>
            <option value="SHORTLISTED">Shortlisted</option>
            <option value="ENQUIRY_SENT">Enquiry Sent</option>
            <option value="NEGOTIATING">Negotiating</option>
            <option value="BOOKED">Booked</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Payment Status Filter */}
        <div className="space-y-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Payment Status
          </label>
          <select
            value={filters.paymentStatus}
            onChange={(e) => onFilterChange({ paymentStatus: e.target.value })}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Payments</option>
            <option value="NOT_STARTED">Not Started</option>
            <option value="PARTIAL">Deposit Paid</option>
            <option value="PAID">Fully Paid</option>
            <option value="DUE">Payment Due</option>
          </select>
        </div>

        {/* Event Filter */}
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
            <option value="ALL_EVENTS">All Wedding Functions</option>
            <option value="MEHENDI">Mehendi & Sangeet</option>
            <option value="HALDI">Haldi Celebration</option>
            <option value="WEDDING">Wedding Ceremony</option>
            <option value="RECEPTION">Grand Reception</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="space-y-1 col-span-2 sm:col-span-1">
          <label className="block text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="w-full py-2 px-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="updated">Recently Updated</option>
            <option value="name_asc">Name A–Z</option>
            <option value="name_desc">Name Z–A</option>
            <option value="status">Status</option>
            <option value="outstanding">Highest Outstanding</option>
            <option value="booking_date">Booking Date</option>
          </select>
        </div>
      </div>
    </div>
  );
}
