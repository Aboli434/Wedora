"use client";

import React from "react";
import { ClientFilterState } from "@/lib/vendorClients";
import { Search, RotateCcw } from "lucide-react";

interface ClientFiltersProps {
  filters: ClientFilterState;
  onFilterChange: (updates: Partial<ClientFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const ClientFilters: React.FC<ClientFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.relationshipStatus !== "ALL" ||
    filters.priority !== "ALL" ||
    filters.weddingStatus !== "ALL" ||
    filters.service !== "ALL" ||
    filters.destination !== "ALL" ||
    filters.searchQuery.trim() !== "" ||
    filters.sortBy !== "RECENTLY_UPDATED";

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
            placeholder="Search couples, references, destinations, services..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] transition-colors"
          />
        </div>

        {/* Sort & Count */}
        <div className="flex items-center justify-between md:justify-end w-full md:w-auto gap-4">
          <span className="text-xs text-[#5A5650]">
            Showing <strong className="text-[#161514] font-medium">{totalFilteredCount}</strong> clients
          </span>

          <div className="flex items-center gap-2">
            <label htmlFor="sort-clients-by" className="text-xs uppercase tracking-wider text-[#5A5650] shrink-0">
              Sort:
            </label>
            <select
              id="sort-clients-by"
              value={filters.sortBy}
              onChange={(e) =>
                onFilterChange({
                  sortBy: e.target.value as ClientFilterState["sortBy"],
                })
              }
              className="bg-white border border-[#161514]/15 text-xs text-[#161514] px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="RECENTLY_UPDATED">Recently Updated</option>
              <option value="NAME_ASC">Couple Name (A-Z)</option>
              <option value="NAME_DESC">Couple Name (Z-A)</option>
              <option value="WEDDING_DATE_SOONEST">Wedding Date (Soonest)</option>
              <option value="WEDDING_DATE_LATEST">Wedding Date (Latest)</option>
              <option value="RECENTLY_CONTACTED">Recently Contacted</option>
              <option value="PRIORITY">Highest Priority</option>
            </select>
          </div>
        </div>
      </div>

      {/* Filter Selects Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-3 border-t border-[#161514]/10">
        {/* Relationship Status */}
        <div>
          <label htmlFor="filter-relationship-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Relationship Status
          </label>
          <select
            id="filter-relationship-status"
            value={filters.relationshipStatus}
            onChange={(e) =>
              onFilterChange({
                relationshipStatus: e.target.value as ClientFilterState["relationshipStatus"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Stages</option>
            <option value="LEAD">Lead / Discovery</option>
            <option value="ACTIVE">Active Client</option>
            <option value="UPCOMING">Upcoming Celebration</option>
            <option value="COMPLETED">Completed Account</option>
            <option value="INACTIVE">Inactive / Closed</option>
          </select>
        </div>

        {/* Priority */}
        <div>
          <label htmlFor="filter-client-priority" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Priority
          </label>
          <select
            id="filter-client-priority"
            value={filters.priority}
            onChange={(e) =>
              onFilterChange({
                priority: e.target.value as ClientFilterState["priority"],
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

        {/* Wedding Status */}
        <div>
          <label htmlFor="filter-wedding-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Wedding Status
          </label>
          <select
            id="filter-wedding-status"
            value={filters.weddingStatus}
            onChange={(e) =>
              onFilterChange({
                weddingStatus: e.target.value as ClientFilterState["weddingStatus"],
              })
            }
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Wedding States</option>
            <option value="PLANNING">In Planning</option>
            <option value="UPCOMING">Upcoming Wedding</option>
            <option value="IN_PROGRESS">Active Wedding Week</option>
            <option value="COMPLETED">Wedding Concluded</option>
            <option value="DATE_FLEXIBLE">Dates Flexible</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label htmlFor="filter-client-service" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Service
          </label>
          <select
            id="filter-client-service"
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
          <label htmlFor="filter-client-destination" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Destination
          </label>
          <select
            id="filter-client-destination"
            value={filters.destination}
            onChange={(e) => onFilterChange({ destination: e.target.value })}
            className="w-full bg-white border border-[#161514]/15 text-xs text-[#161514] px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          >
            <option value="ALL">All Destinations</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Goa">Goa</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Pune">Pune</option>
            <option value="Delhi">Delhi</option>
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
