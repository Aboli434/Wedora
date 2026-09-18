"use client";

import React from "react";
import { VendorReview } from "@/data/vendorReviews";
import { formatResponseStatus } from "@/lib/vendorReviews";
import { Star, ArrowRight, Quote } from "lucide-react";

interface RecentReviewsProps {
  reviews: VendorReview[];
  onSelectReview: (reviewId: string) => void;
}

export const RecentReviews: React.FC<RecentReviewsProps> = ({
  reviews,
  onSelectReview,
}) => {
  const featured = reviews
    .filter((r) => r.status === "PUBLISHED")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4);

  if (featured.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Quote className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Recent Client Testimonials
          </h2>
        </div>
        <span className="text-xs text-[#5A5650] font-sans">
          Latest verified couple feedback
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {featured.map((review) => {
          const isResponded = review.responseStatus === "RESPONDED";

          return (
            <div
              key={review.id}
              onClick={() => onSelectReview(review.id)}
              className="p-6 border border-[#161514]/10 rounded-sm bg-[#FAF8F5] hover:border-[#C5A880] transition-all cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-1 text-[#C5A880]">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
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
                        : "bg-rose-100 text-rose-900"
                    }`}
                  >
                    {formatResponseStatus(review.responseStatus)}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-medium text-[#161514] mb-2 leading-tight">
                  &quot;{review.title}&quot;
                </h3>

                <p className="text-xs text-[#5A5650] font-sans leading-relaxed mb-4 line-clamp-3">
                  {review.review}
                </p>
              </div>

              <div className="pt-3 border-t border-[#161514]/10 flex items-center justify-between text-xs font-sans">
                <div>
                  <strong className="text-[#161514] font-medium block">
                    {review.reviewerName} ({review.coupleName})
                  </strong>
                  <span className="text-[10px] text-[#5A5650]">
                    {review.service} • {review.destination}
                  </span>
                </div>

                <button
                  type="button"
                  className="p-1 text-[#161514] hover:text-[#C5A880] transition-colors"
                  aria-label={`View details for review by ${review.reviewerName}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
