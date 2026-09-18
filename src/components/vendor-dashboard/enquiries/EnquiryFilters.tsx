"use client";

import React from "react";
import { EnquiryFilterState } from "@/lib/vendorEnquiries";
import { Search, RotateCcw } from "lucide-react";

interface EnquiryFiltersProps {
  filters: EnquiryFilterState;
  onFilterChange: (updates: Partial<EnquiryFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const EnquiryFilters: React.FC<EnquiryFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.status !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.service !== "ALL" ||
    filters.destination !== "ALL" ||
    filters.contactMethod !== "ALL" ||
    filters.unread !== "ALL" ||
    filters.searchQuery.trim() !== "" ||
    filters.sortBy !== "NEWEST";

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
            placeholder="Search couples, destinations, services..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] transition-colors"
          />
        </div>

        {/* Sorting + Count */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
          <span className="text-xs text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{totalFilteredCount}</strong> enquiries
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-by" className="text-xs uppercase tracking-wider text-[#5A5650] shrink-0">
              Sort:
            </label>
            <select
              id="sort-by"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as EnquiryFilterState["sortBy"],
                })
              }
              className="bg-white border border-[#161514]/15 text-xs text-[#161514] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="NEWEST">Newest Received</option>
              <option value="OLDEST">Oldest Received</option>
              <option value="WEDDING_DATE">Upcoming Wedding Date</option>
              <option value="RESPONSE_DUE">Response Due Soonest</option>
              <option value="PRIORITY">Highest Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-3 border-t border-[#161514]/10">
        {/* Status */}
        <div>
          <label htmlFor="filter-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Status
          </label>
          <select
            id="filter-status"
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as EnquiryFilterState["status"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Statuses</option>
            <option value="NEW">New</option>
            <option value="REVIEWING">Reviewing</option>
            <option value="RESPONDED">Responded</option>
            <option value="NEGOTIATING">Negotiating</option>
            <option value="ACCEPTED">Accepted</option>
            <option value="DECLINED">Declined</option>
            <option value="CLOSED">Closed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="filter-priority" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Priority
          </label>
          <select
            id="filter-priority"
            value={filters.priority}
            onChange={(e) =>
              onFilterChange({
                priority: e.target.value as EnquiryFilterState["priority"],
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

        {/* Service */}
        <div>
          <label htmlFor="filter-service" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Service
          </label>
          <select
            id="filter-service"
            value={filters.service}
            onChange={(e) => onFilterChange({ service: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Services</option>
            <option value="Photography">Photography</option>
            <option value="Pre-Wedding">Pre-Wedding</option>
            <option value="Cinematography">Cinematography</option>
            <option value="Storytelling">Storytelling</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label htmlFor="filter-destination" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Destination
          </label>
          <select
            id="filter-destination"
            value={filters.destination}
            onChange={(e) => onFilterChange({ destination: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Destinations</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Goa">Goa</option>
            <option value="Delhi">Delhi</option>
          </select>
        </div>

        {/* Contact Method */}
        <div>
          <label htmlFor="filter-contact-method" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Preferred Contact
          </label>
          <select
            id="filter-contact-method"
            value={filters.contactMethod}
            onChange={(e) => onFilterChange({ contactMethod: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Methods</option>
            <option value="EMAIL">Email</option>
            <option value="PHONE">Phone</option>
            <option value="WHATSAPP">WhatsApp</option>
          </select>
        </div>

        {/* Read / Unread */}
        <div>
          <label htmlFor="filter-unread" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Read State
          </label>
          <select
            id="filter-unread"
            value={filters.unread}
            onChange={(e) =>
              onFilterChange({
                unread: e.target.value as EnquiryFilterState["unread"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All</option>
            <option value="UNREAD">Unread Only</option>
            <option value="READ">Read Only</option>
          </select>
        </div>
      </div>

      {/* Clear Filters reset trigger */}
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
