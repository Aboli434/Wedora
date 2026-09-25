"use client";

import React, { useEffect } from "react";
import { VendorReview, ReviewStatus, ReviewActivity as ActivityItem } from "@/data/vendorReviews";
import { formatReviewSource } from "@/lib/vendorReviews";
import { ReviewStatusControl } from "./ReviewStatusControl";
import { ReviewResponseComposer } from "./ReviewResponseComposer";
import { ReviewActivity } from "./ReviewActivity";
import { ReviewNotes } from "./ReviewNotes";
import { ContextualLink } from "@/components/common/ContextualLink";
import {
  X,
  Star,
  Clock,
} from "lucide-react";

interface ReviewDetailProps {
  review: VendorReview | null;
  onClose: () => void;
  onUpdateStatus: (reviewId: string, newStatus: ReviewStatus) => void;
  onSubmitResponse: (reviewId: string, responseText: string) => void;
  onSaveNotes: (reviewId: string, notes: string) => void;
  onDeleteNotes: (reviewId: string) => void;
}

export const ReviewDetail: React.FC<ReviewDetailProps> = ({
  review,
  onClose,
  onUpdateStatus,
  onSubmitResponse,
  onSaveNotes,
  onDeleteNotes,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!review) return null;

  const isResponded = review.responseStatus === "RESPONDED";

  // Mock activity history for the review
  const activities: ActivityItem[] = [
    {
      id: `act_rec_${review.id}`,
      reviewId: review.id,
      type: "REVIEW_RECEIVED",
      description: `Review received via ${formatReviewSource(review.source)}`,
      timestamp: review.createdAt,
    },
    ...(isResponded && review.respondedAt
      ? [
          {
            id: `act_resp_${review.id}`,
            reviewId: review.id,
            type: "RESPONSE_SENT" as const,
            description: "Vendor public response published",
            timestamp: review.respondedAt,
          },
        ]
      : []),
  ];

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/50 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-detail-title"
    >
      <div className="w-full max-w-2xl bg-[#FAF8F5] h-full overflow-y-auto border-l border-[#161514]/20 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Header */}
          <div className="bg-[#161514] text-[#FAF8F5] p-6 flex items-start justify-between sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#C5A880] font-semibold">
                  {review.reviewReference}
                </span>
                <span className="text-xs text-[#FAF8F5]/60">•</span>
                <span className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-sans">
                  {formatReviewSource(review.source)}
                </span>
              </div>

              <h2 id="review-detail-title" className="font-serif text-2xl font-normal text-[#FAF8F5]">
                {review.reviewerName} ({review.coupleName})
              </h2>
              <p className="text-xs text-[#FAF8F5]/70 font-sans mt-0.5">
                {review.service} • {review.destination}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#FAF8F5]/70 hover:text-white transition-colors"
              aria-label="Close review drawer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body Content */}
          <div className="p-6 space-y-8 font-sans">
            {/* Rating & Review Hero Box */}
            <div className="p-6 bg-white border border-[#161514]/10 rounded-sm shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
                <div className="flex items-center gap-1.5 text-[#C5A880]">
                  <span className="font-serif text-2xl font-bold text-[#161514] mr-1">
                    {review.rating}.0
                  </span>
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className={`w-4 h-4 ${
                        s <= review.rating
                          ? "fill-[#C5A880] text-[#C5A880]"
                          : "text-[#161514]/20"
                      }`}
                    />
                  ))}
                </div>

                <span className="text-xs text-[#5A5650] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  Received: {review.createdAt.split("T")[0]}
                </span>
              </div>

              <div>
                <h3 className="font-serif text-xl font-medium text-[#161514] mb-2">
                  &quot;{review.title}&quot;
                </h3>
                <p className="text-sm text-[#161514] leading-relaxed italic bg-[#FAF8F5] p-4 border border-[#161514]/10 rounded-sm">
                  {review.review}
                </p>
              </div>

              <div className="text-xs text-[#5A5650] flex items-center justify-between">
                <span>Helpful votes: <strong>{review.helpfulCount}</strong></span>
                <span>Package: <strong>{review.packageName}</strong></span>
              </div>
            </div>

            {/* Status Control */}
            <div className="p-4 bg-white border border-[#161514]/10 rounded-sm">
              <ReviewStatusControl
                currentStatus={review.status}
                onUpdateStatus={(st) => onUpdateStatus(review.id, st)}
              />
            </div>

            {/* Vendor Response Composer & Display */}
            <div className="p-5 bg-white border border-[#161514]/10 rounded-sm">
              <ReviewResponseComposer
                existingResponse={review.response}
                onSubmitResponse={(text) => onSubmitResponse(review.id, text)}
              />
            </div>

            {/* Related Client & Booking Context Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContextualLink
                label="Client Dossier"
                value={review.coupleName}
                href="/vendor/dashboard/clients"
                actionLabel="View client profile"
              />
              <ContextualLink
                label="Booking Contract"
                value={`#${review.bookingId}`}
                href="/vendor/dashboard/bookings"
                actionLabel="View booking"
              />
            </div>

            {/* Lifecycle Activity */}
            <div className="p-4 bg-white border border-[#161514]/10 rounded-sm">
              <ReviewActivity activities={activities} />
            </div>

            {/* Private Vendor Notes */}
            <div className="p-4 bg-white border border-[#161514]/10 rounded-sm">
              <ReviewNotes
                reviewId={review.id}
                notes={review.privateNote}
                onSaveNotes={onSaveNotes}
                onDeleteNotes={onDeleteNotes}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#161514]/10 flex items-center justify-end gap-3 sticky bottom-0 z-10 font-sans">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-[#161514]/20 text-[#161514] bg-white hover:bg-[#161514]/5 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
