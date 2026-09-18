"use client";

import React, { useState, useMemo } from "react";
import { ReviewRequest, RequestStatus } from "@/data/vendorReviews";
import { filterReviewRequests, ReviewRequestFilterState } from "@/lib/vendorReviews";
import { ReviewRequestListItem } from "./ReviewRequestListItem";
import { Search, Send, Plus } from "lucide-react";

interface ReviewRequestListProps {
  requests: ReviewRequest[];
  selectedRequestId?: string;
  onSelectRequest: (requestId: string) => void;
  onRequestReview: () => void;
}

export const ReviewRequestList: React.FC<ReviewRequestListProps> = ({
  requests,
  selectedRequestId,
  onSelectRequest,
  onRequestReview,
}) => {
  const [filters, setFilters] = useState<ReviewRequestFilterState>({
    status: "ALL",
    searchQuery: "",
    sortBy: "newest",
  });

  const filtered = useMemo(() => {
    return filterReviewRequests(requests, filters);
  }, [requests, filters]);

  return (
    <section className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#161514]/10">
        <div>
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-xl text-[#161514] font-medium">
              Review Invitations & Requests
            </h3>
          </div>
          <p className="text-xs text-[#5A5650] font-sans mt-0.5">
            Log of post-event feedback invitations sent to couples.
          </p>
        </div>

        <button
          type="button"
          onClick={onRequestReview}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          Request a Review
        </button>
      </div>

      {/* Filter controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5A5650] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
            placeholder="Search couple, booking ID..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((p) => ({ ...p, status: e.target.value as RequestStatus | "ALL" }))
            }
            className="px-2.5 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Request Statuses</option>
            <option value="REQUESTED">Requested</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-[#161514]/20 bg-[#FAF8F5]/60 rounded-sm">
          <p className="text-xs text-[#5A5650]">
            No review request logs match your search.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((req) => (
            <ReviewRequestListItem
              key={req.id}
              request={req}
              isSelected={selectedRequestId === req.id}
              onSelect={() => onSelectRequest(req.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
