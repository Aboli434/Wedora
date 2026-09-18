"use client";

import React from "react";
import { VendorReview } from "@/data/vendorReviews";
import { ReviewListItem } from "./ReviewListItem";
import { ReviewsEmptyState } from "./ReviewsEmptyState";

interface ReviewListProps {
  reviews: VendorReview[];
  selectedReviewId?: string;
  onSelectReview: (reviewId: string) => void;
  onResetFilters: () => void;
  onRequestReview: () => void;
}

export const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  selectedReviewId,
  onSelectReview,
  onResetFilters,
  onRequestReview,
}) => {
  if (reviews.length === 0) {
    return (
      <ReviewsEmptyState
        type="filtered"
        onResetFilters={onResetFilters}
        onRequestReview={onRequestReview}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* DESKTOP TABLE */}
      <div className="hidden md:block overflow-x-auto border border-[#161514]/10 rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#161514] text-[#FAF8F5] text-[10px] font-semibold uppercase tracking-[0.15em] font-sans border-b border-[#161514]">
              <th className="py-3.5 px-4 font-normal">Reviewer & Couple</th>
              <th className="py-3.5 px-4 font-normal">Rating</th>
              <th className="py-3.5 px-4 font-normal">Service & Destination</th>
              <th className="py-3.5 px-4 font-normal">Wedding Date</th>
              <th className="py-3.5 px-4 font-normal">Status</th>
              <th className="py-3.5 px-4 font-normal">Response</th>
              <th className="py-3.5 px-4 font-normal">Date Received</th>
              <th className="py-3.5 px-4 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#161514]/10 bg-[#FAF8F5]">
            {reviews.map((review) => (
              <ReviewListItem
                key={review.id}
                review={review}
                isSelected={selectedReviewId === review.id}
                onSelect={() => onSelectReview(review.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE STACKED CARDS */}
      <div className="md:hidden">
        {reviews.map((review) => (
          <ReviewListItem
            key={review.id}
            review={review}
            isSelected={selectedReviewId === review.id}
            onSelect={() => onSelectReview(review.id)}
          />
        ))}
      </div>
    </div>
  );
};
