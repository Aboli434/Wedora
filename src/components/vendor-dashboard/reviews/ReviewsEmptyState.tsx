"use client";

import React from "react";
import { Star, RotateCcw, MessageSquarePlus } from "lucide-react";

interface ReviewsEmptyStateProps {
  type?: "filtered" | "empty";
  onResetFilters?: () => void;
  onRequestReview?: () => void;
}

export const ReviewsEmptyState: React.FC<ReviewsEmptyStateProps> = ({
  type = "empty",
  onResetFilters,
  onRequestReview,
}) => {
  if (type === "filtered") {
    return (
      <div className="py-16 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5]/60 rounded-sm font-sans">
        <Star className="w-8 h-8 text-[#5A5650] mx-auto mb-3 opacity-60" />
        <h3 className="font-serif text-xl text-[#161514] mb-2 font-medium">
          No reviews match these filters.
        </h3>
        <p className="text-xs text-[#5A5650] max-w-md mx-auto mb-6 leading-relaxed">
          Try adjusting your rating, review status, response filter, or search keywords to view feedback.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="py-16 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5]/60 rounded-sm font-sans">
      <Star className="w-10 h-10 text-[#C5A880] mx-auto mb-4" />
      <h3 className="font-serif text-2xl text-[#161514] mb-2 font-normal">
        No client reviews recorded yet.
      </h3>
      <p className="text-sm text-[#5A5650] max-w-md mx-auto mb-6 leading-relaxed">
        Send review invitations to your past couples after delivering their wedding albums and films.
      </p>
      {onRequestReview && (
        <button
          type="button"
          onClick={onRequestReview}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
        >
          <MessageSquarePlus className="w-4 h-4 text-[#C5A880]" />
          Request First Review
        </button>
      )}
    </div>
  );
};
