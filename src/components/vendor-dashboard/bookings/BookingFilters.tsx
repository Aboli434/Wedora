"use client";

import React from "react";
import { BookingFilterState } from "@/lib/vendorBookings";
import { Search, RotateCcw } from "lucide-react";

interface BookingFiltersProps {
  filters: BookingFilterState;
  onFilterChange: (updates: Partial<BookingFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const BookingFilters: React.FC<BookingFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.status !== "ALL" ||
    filters.paymentStatus !== "ALL" ||
    filters.service !== "ALL" ||
    filters.destination !== "ALL" ||
    filters.source !== "ALL" ||
    filters.timeframe !== "ALL" ||
    filters.searchQuery.trim() !== "" ||
    filters.sortBy !== "WEDDING_DATE_SOONEST";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/10 p-5 mb-8">
      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search couples, references, venues, services..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] transition-colors"
          />
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
          <span className="text-xs text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{totalFilteredCount}</strong> bookings
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-bookings-by" className="text-xs uppercase tracking-wider text-[#5A5650] shrink-0">
              Sort:
            </label>
            <select
              id="sort-bookings-by"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as BookingFilterState["sortBy"],
                })
              }
              className="bg-white border border-[#161514]/15 text-xs text-[#161514] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="WEDDING_DATE_SOONEST">Wedding Date (Soonest)</option>
              <option value="WEDDING_DATE_LATEST">Wedding Date (Latest)</option>
              <option value="RECENTLY_UPDATED">Recently Updated</option>
              <option value="RECENTLY_CREATED">Recently Created</option>
              <option value="VALUE_HIGH">Highest Booked Value</option>
              <option value="OUTSTANDING_HIGH">Highest Outstanding Payment</option>
              <option value="PAYMENT_DUE_SOONEST">Next Payment Due Soonest</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-[#161514]/10">
        {/* Booking Status */}
        <div>
          <label htmlFor="filter-booking-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Booking Status
          </label>
          <select
            id="filter-booking-status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as BookingFilterState["status"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Statuses</option>
            <option value="INQUIRY">Hold / Inquiry</option>
            <option value="CONFIRMED">Confirmed</option>
            <option value="IN_PROGRESS">In Progress</option>
            <option value="COMPLETED">Completed</option>
            <option value="CANCELLED">Cancelled</option>
          </select>
        </div>

        {/* Payment Status */}
        <div>
          <label htmlFor="filter-booking-payment-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Payment Status
          </label>
          <select
            id="filter-booking-payment-status"
            value={filters.paymentStatus}
            onChange={(e) =>
              onFilterChange({
                paymentStatus: e.target.value as BookingFilterState["paymentStatus"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Payment States</option>
            <option value="NOT_STARTED">Unpaid / Pending Deposit</option>
            <option value="PARTIALLY_PAID">Partially Paid</option>
            <option value="PAID">Paid in Full</option>
            <option value="OVERDUE">Overdue Payment</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="filter-booking-service" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Service
          </label>
          <select
            id="filter-booking-service"
            value={filters.service}
            onChange={(e) => onFilterChange({ service: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Services</option>
            <option value="Photography">Photography</option>
            <option value="Cinematography">Cinematography</option>
            <option value="Storytelling">Storytelling</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="filter-booking-destination" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Destination
          </label>
          <select
            id="filter-booking-destination"
            value={filters.destination}
            onChange={(e) => onFilterChange({ destination: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Destinations</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Goa">Goa</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Source */}
        <div>
          <label htmlFor="filter-booking-source" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Lead Source
          </label>
          <select
            id="filter-booking-source"
            value={filters.source}
            onChange={(e) => onFilterChange({ source: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Sources</option>
            <option value="ENQUIRY">Enquiry Conversion</option>
            <option value="WEDORA">Wedora Network</option>
            <option value="PUBLIC_PROFILE">Public Profile</option>
            <option value="DIRECT">Direct Client</option>
          </select>
        </div>

        {/* Timeframe */}
        <div>
          <label htmlFor="filter-booking-timeframe" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Time Horizon
          </label>
          <select
            id="filter-booking-timeframe"
            value={filters.timeframe}
            onChange={(e) =>
              onFilterChange({
                timeframe: e.target.value as BookingFilterState["timeframe"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Dates</option>
            <option value="UPCOMING">Upcoming Only</option>
            <option value="PAST">Past / Completed</option>
          </select>
        </div>
      </div>

      {/* Clear filters trigger */}
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
