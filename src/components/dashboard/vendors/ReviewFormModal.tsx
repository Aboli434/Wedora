"use client";

import React, { useState } from "react";
import { postReviewApi } from "@/lib/api/endpoints";
import { Star, X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";

interface ReviewFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  weddingId: string;
  bookingId: string;
  vendorName: string;
  onSuccess?: () => void;
}

export function ReviewFormModal({
  isOpen,
  onClose,
  weddingId,
  bookingId,
  vendorName,
  onSuccess,
}: ReviewFormModalProps) {
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please share your feedback or experience comments.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      await postReviewApi(weddingId, bookingId, {
        rating,
        title: title.trim() || undefined,
        comment: comment.trim(),
      });

      setSuccess(true);
      if (onSuccess) onSuccess();
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to publish review.";
      setError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-lg my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div>
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              PUBLISH EXPERIENCE REVIEW
            </span>
            <h2 className="font-serif text-2xl text-[#161514] font-light mt-0.5">
              Review {vendorName}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close review dialog"
            className="p-1 text-[#5A5650] hover:text-[#161514] focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <div>
              <strong className="block font-medium">Review Published!</strong>
              <span className="text-[11px] text-emerald-700">
                Your rating and experience notes have been added to {vendorName}&apos;s public profile.
              </span>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs font-sans">
            {error && (
              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Star Rating Selection */}
            <div className="space-y-2">
              <label className="block uppercase tracking-wider text-[#161514] font-semibold">
                Rating <span className="text-[#C5A880]">*</span>
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1 focus:outline-none transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        (hoverRating || rating) >= star
                          ? "text-[#C5A880] fill-[#C5A880]"
                          : "text-[#161514]/20"
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-medium text-[#161514] ml-2">
                  {rating} out of 5 stars
                </span>
              </div>
            </div>

            {/* Optional Title */}
            <div className="space-y-1.5">
              <label htmlFor="review-title" className="block uppercase tracking-wider text-[#161514] font-semibold">
                Headline / Title (Optional)
              </label>
              <input
                id="review-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Unforgettable photography & serene professionalism"
                className="w-full px-3 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            {/* Comment Body */}
            <div className="space-y-1.5">
              <label htmlFor="review-comment" className="block uppercase tracking-wider text-[#161514] font-semibold">
                Your Review <span className="text-[#C5A880]">*</span>
              </label>
              <textarea
                id="review-comment"
                rows={4}
                required
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Tell other couples about the craftsmanship, punctuality, and experience..."
                className="w-full px-3.5 py-2.5 bg-white border border-[#161514]/15 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#161514]/15 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="px-4 py-2.5 border border-[#161514]/20 text-[#5A5650] hover:text-[#161514]"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 bg-[#161514] text-[#FAF8F5] font-medium tracking-[0.15em] uppercase hover:bg-[#C5A880] hover:text-[#161514] disabled:opacity-50 transition-colors inline-flex items-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <span>Submit Review</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
