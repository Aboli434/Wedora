"use client";

import React from "react";
import { ReviewActionItem } from "@/data/vendorReviews";
import { AlertCircle, ArrowRight, Star } from "lucide-react";

interface ReviewsNeedsAttentionProps {
  items: ReviewActionItem[];
  onSelectReview: (reviewId: string) => void;
  onSelectRequest?: (requestId: string) => void;
}

export const ReviewsNeedsAttention: React.FC<ReviewsNeedsAttentionProps> = ({
  items,
  onSelectReview,
}) => {
  if (items.length === 0) {
    return (
      <section className="mb-12">
        <div className="p-6 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-center">
          <p className="text-xs text-[#5A5650] font-sans">
            No reputation items require urgent attention. All reviews have been addressed.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Reputation Action Items
          </h2>
        </div>
        <span className="text-xs text-[#5A5650] font-sans font-medium">
          {items.length} item{items.length !== 1 ? "s" : ""} requiring attention
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isHighPriority = item.priority === "HIGH";

          return (
            <div
              key={item.id}
              className={`p-5 border rounded-sm transition-all duration-200 bg-[#FAF8F5] flex flex-col justify-between ${
                isHighPriority
                  ? "border-rose-300 hover:border-rose-400"
                  : "border-[#161514]/15 hover:border-[#C5A880]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
                      isHighPriority
                        ? "bg-rose-100 text-rose-800"
                        : "bg-[#C5A880]/15 text-[#8C6D3F]"
                    }`}
                  >
                    {item.type.replace("_", " ")}
                  </span>
                  {item.rating && (
                    <span className="text-xs text-[#161514] font-medium font-sans flex items-center gap-1">
                      {item.rating} <Star className="w-3 h-3 text-[#C5A880] fill-[#C5A880]" />
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base text-[#161514] font-medium mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A5650] leading-relaxed mb-4 font-sans line-clamp-2">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#161514]/10 flex items-center justify-between">
                <span className="text-xs text-[#5A5650] font-sans">Review Action</span>
                {item.reviewId && (
                  <button
                    type="button"
                    onClick={() => onSelectReview(item.reviewId!)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#161514] hover:text-[#C5A880] transition-colors"
                  >
                    View Review
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
