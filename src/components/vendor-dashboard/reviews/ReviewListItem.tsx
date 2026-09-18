"use client";

import React from "react";
import { VendorReview } from "@/data/vendorReviews";
import {
  formatReviewStatus,
  formatResponseStatus,
} from "@/lib/vendorReviews";
import { Star, ChevronRight, MessageSquare, AlertCircle } from "lucide-react";

interface ReviewListItemProps {
  review: VendorReview;
  isSelected: boolean;
  onSelect: () => void;
}

export const ReviewListItem: React.FC<ReviewListItemProps> = ({
  review,
  isSelected,
  onSelect,
}) => {
  const isResponded = review.responseStatus === "RESPONDED";
  const isFlagged = review.status === "FLAGGED";
  const isHidden = review.status === "HIDDEN";

  return (
    <>
      {/* DESKTOP TABLE ROW */}
      <tr
        onClick={onSelect}
        className={`hidden md:table-row cursor-pointer transition-colors border-b border-[#161514]/10 ${
          isSelected
            ? "bg-[#C5A880]/15"
            : "bg-[#FAF8F5] hover:bg-white"
        }`}
      >
        {/* Reviewer & Couple */}
        <td className="py-4 px-4 align-middle">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-semibold shrink-0">
              {review.reviewerInitials}
            </div>
            <div>
              <span className="font-serif text-sm font-medium text-[#161514] block">
                {review.reviewerName}
              </span>
              <span className="text-xs text-[#5A5650] font-sans block">
                {review.coupleName}
              </span>
            </div>
          </div>
        </td>

        {/* Rating */}
        <td className="py-4 px-4 align-middle font-sans">
          <div className="flex items-center gap-1 text-[#C5A880]">
            <span className="font-serif text-sm font-bold text-[#161514] mr-1">
              {review.rating}.0
            </span>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${
                  s <= review.rating
                    ? "fill-[#C5A880] text-[#C5A880]"
                    : "text-[#161514]/20"
                }`}
              />
            ))}
          </div>
        </td>

        {/* Service & Destination */}
        <td className="py-4 px-4 align-middle">
          <span className="text-xs text-[#161514] font-medium font-sans block truncate max-w-[200px]">
            {review.service}
          </span>
          <span className="text-[10px] text-[#5A5650] font-sans block">
            {review.destination}
          </span>
        </td>

        {/* Wedding Date */}
        <td className="py-4 px-4 align-middle font-sans text-xs text-[#5A5650]">
          {review.weddingDate}
        </td>

        {/* Status */}
        <td className="py-4 px-4 align-middle">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
              isFlagged
                ? "bg-rose-100 text-rose-900"
                : isHidden
                ? "bg-gray-200 text-gray-800"
                : "bg-emerald-100 text-emerald-900"
            }`}
          >
            {isFlagged && <AlertCircle className="w-3 h-3 text-rose-700" />}
            {formatReviewStatus(review.status)}
          </span>
        </td>

        {/* Response Status */}
        <td className="py-4 px-4 align-middle">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs font-sans ${
              isResponded
                ? "bg-emerald-100 text-emerald-900"
                : "bg-amber-100 text-amber-900"
            }`}
          >
            <MessageSquare className="w-3 h-3" />
            {formatResponseStatus(review.responseStatus)}
          </span>
        </td>

        {/* Date */}
        <td className="py-4 px-4 align-middle font-sans text-xs text-[#5A5650]">
          {review.createdAt.split("T")[0]}
        </td>

        {/* Actions */}
        <td className="py-4 px-4 align-middle text-right">
          <button
            type="button"
            className="p-1.5 text-[#5A5650] hover:text-[#161514] transition-colors"
            title="View Details"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </td>
      </tr>

      {/* MOBILE CARD VIEW */}
      <div
        onClick={onSelect}
        className={`md:hidden p-4 border rounded-sm transition-all cursor-pointer bg-[#FAF8F5] mb-3 ${
          isSelected
            ? "border-[#C5A880] ring-1 ring-[#C5A880]"
            : "border-[#161514]/10 hover:border-[#C5A880]"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1 text-[#C5A880]">
            <span className="font-serif text-sm font-bold text-[#161514] mr-1">
              {review.rating}.0
            </span>
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-3 h-3 ${
                  s <= review.rating
                    ? "fill-[#C5A880] text-[#C5A880]"
                    : "text-[#161514]/20"
                }`}
              />
            ))}
          </div>

          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
              isResponded
                ? "bg-emerald-100 text-emerald-900"
                : "bg-amber-100 text-amber-900"
            }`}
          >
            {formatResponseStatus(review.responseStatus)}
          </span>
        </div>

        <h4 className="font-serif text-base font-medium text-[#161514] mb-1">
          &quot;{review.title}&quot;
        </h4>
        <p className="text-xs text-[#5A5650] font-sans leading-relaxed mb-3 line-clamp-2">
          {review.review}
        </p>

        <div className="pt-2 border-t border-[#161514]/10 flex items-center justify-between text-xs font-sans text-[#5A5650]">
          <span>{review.reviewerName} ({review.coupleName})</span>
          <span>{review.createdAt.split("T")[0]}</span>
        </div>
      </div>
    </>
  );
};
