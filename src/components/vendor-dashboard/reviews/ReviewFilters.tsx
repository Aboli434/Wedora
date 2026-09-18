"use client";

import React from "react";
import { ReviewFilterState, ReviewSortOption } from "@/lib/vendorReviews";
import {
  ReviewStatus,
  ReviewResponseStatus,
  ReviewSource,
  ReviewRating,
} from "@/data/vendorReviews";
import { Search, RotateCcw } from "lucide-react";

interface ReviewFiltersProps {
  filters: ReviewFilterState;
  onFilterChange: (updates: Partial<ReviewFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const ReviewFilters: React.FC<ReviewFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.status !== "ALL" ||
    filters.rating !== "ALL" ||
    filters.responseStatus !== "ALL" ||
    filters.service !== "ALL" ||
    filters.destination !== "ALL" ||
    filters.source !== "ALL" ||
    filters.searchQuery.trim() !== "" ||
    filters.sortBy !== "newest";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/10 p-5 mb-6 rounded-sm font-sans">
      {/* Search & Sort Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        {/* Search */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search couple, reviewer, keyword, title..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/20 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />
        </div>

        {/* Count & Sort Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs text-[#5A5650]">
            Showing <strong className="text-[#161514]">{totalFilteredCount}</strong> reviews
          </span>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({ sortBy: e.target.value as ReviewSortOption })
            }
            className="px-3 py-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="highest_rating">Sort: Highest Rating</option>
            <option value="lowest_rating">Sort: Lowest Rating</option>
            <option value="awaiting_response">Sort: Awaiting Response</option>
            <option value="most_helpful">Sort: Most Helpful Votes</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5A5650] hover:text-[#161514] hover:bg-[#161514]/5 transition-colors rounded-sm"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Review Status */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Review Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as ReviewStatus | "ALL",
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Statuses</option>
            <option value="PUBLISHED">Published</option>
            <option value="PENDING">Pending</option>
            <option value="HIDDEN">Hidden</option>
            <option value="FLAGGED">Flagged</option>
          </select>
        </div>

        {/* Rating Filter */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Star Rating
          </label>
          <select
            value={filters.rating}
            onChange={(e) =>
              onFilterChange({
                rating:
                  e.target.value === "ALL"
                    ? "ALL"
                    : (Number(e.target.value) as ReviewRating),
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        {/* Response Status */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Vendor Response
          </label>
          <select
            value={filters.responseStatus}
            onChange={(e) =>
              onFilterChange({
                responseStatus: e.target.value as ReviewResponseStatus | "ALL",
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Responses</option>
            <option value="NOT_RESPONDED">Awaiting Response</option>
            <option value="RESPONDED">Responded</option>
          </select>
        </div>

        {/* Source */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Review Source
          </label>
          <select
            value={filters.source}
            onChange={(e) =>
              onFilterChange({
                source: e.target.value as ReviewSource | "ALL",
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Sources</option>
            <option value="WEDORA">Wedora Marketplace</option>
            <option value="DIRECT">Direct Client Feedback</option>
            <option value="BOOKING_FOLLOW_UP">Post-Event Request</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Destination
          </label>
          <select
            value={filters.destination}
            onChange={(e) => onFilterChange({ destination: e.target.value })}
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Destinations</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Goa">Goa</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
            Service Category
          </label>
          <select
            value={filters.service}
            onChange={(e) => onFilterChange({ service: e.target.value })}
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Services</option>
            <option value="Photography">Photography</option>
            <option value="Cinematography">Cinematography / Film</option>
          </select>
        </div>
      </div>
    </div>
  );
};
