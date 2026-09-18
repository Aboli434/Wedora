"use client";

import React from "react";
import { VendorReviewsSummary } from "@/data/vendorReviews";
import { Star, ShieldCheck } from "lucide-react";

interface RatingSnapshotProps {
  summary: VendorReviewsSummary;
}

export const RatingSnapshot: React.FC<RatingSnapshotProps> = ({ summary }) => {
  const total = summary.publishedReviews || 1;

  const distribution = [
    { stars: 5, count: summary.fiveStarCount, pct: Math.round((summary.fiveStarCount / total) * 100) },
    { stars: 4, count: summary.fourStarCount, pct: Math.round((summary.fourStarCount / total) * 100) },
    { stars: 3, count: summary.threeStarCount, pct: Math.round((summary.threeStarCount / total) * 100) },
    { stars: 2, count: summary.twoStarCount, pct: Math.round((summary.twoStarCount / total) * 100) },
    { stars: 1, count: summary.oneStarCount, pct: Math.round((summary.oneStarCount / total) * 100) },
  ];

  return (
    <section className="mb-12 bg-[#FAF8F5] border border-[#161514]/10 p-6 lg:p-8 rounded-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#161514]/10">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1 font-sans">
            RATING DISTRIBUTION & ANALYSIS
          </span>
          <h2 className="font-serif text-xl md:text-2xl font-normal text-[#161514]">
            Client Feedback Breakdown
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] bg-white border border-[#161514]/10 px-3 py-1.5 rounded-sm">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Factual score derived from {summary.publishedReviews} verified reviews</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
        {/* Average Rating Hero Display */}
        <div className="p-6 bg-white border border-[#161514]/10 rounded-sm text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-2 font-sans">
            Overall Client Rating
          </span>

          <div className="font-serif text-5xl text-[#161514] font-normal mb-2">
            {summary.averageRating}
            <span className="text-xl text-[#5A5650] font-sans font-normal ml-1">/ 5.0</span>
          </div>

          <div className="flex items-center justify-center gap-1 text-[#C5A880] mb-2">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={`w-4 h-4 ${
                  s <= Math.round(summary.averageRating)
                    ? "fill-[#C5A880] text-[#C5A880]"
                    : "text-[#161514]/20"
                }`}
              />
            ))}
          </div>

          <p className="text-xs text-[#5A5650] font-sans">
            Calculated across {summary.publishedReviews} published couple reviews
          </p>
        </div>

        {/* Rating Breakdown Bars */}
        <div className="lg:col-span-2 space-y-3 font-sans">
          {distribution.map((item) => (
            <div key={item.stars} className="flex items-center gap-4 text-xs">
              <span className="w-12 text-[#161514] font-medium flex items-center gap-1">
                {item.stars} <Star className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
              </span>

              <div className="flex-1 h-2.5 bg-[#161514]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#161514] transition-all duration-300"
                  style={{ width: `${item.pct}%` }}
                  role="progressbar"
                  aria-valuenow={item.pct}
                  aria-valuemin={0}
                  aria-valuemax={100}
                />
              </div>

              <span className="w-20 text-right text-[#5A5650] font-mono">
                {item.count} ({item.pct}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
