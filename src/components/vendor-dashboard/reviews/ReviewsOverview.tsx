"use client";

import React from "react";
import { VendorReviewsSummary } from "@/data/vendorReviews";
import { Star, MessageSquare, ThumbsUp, Clock, CheckCircle2 } from "lucide-react";

interface ReviewsOverviewProps {
  summary: VendorReviewsSummary;
  activeFilterKey: string;
  onSelectMetricFilter: (filterKey: string) => void;
}

export const ReviewsOverview: React.FC<ReviewsOverviewProps> = ({
  summary,
  activeFilterKey,
  onSelectMetricFilter,
}) => {
  const metrics = [
    {
      id: "ALL",
      label: "TOTAL REVIEWS",
      value: summary.totalReviews.toString(),
      subtext: `${summary.publishedReviews} published on profile`,
      icon: Star,
      color: "text-[#C5A880]",
    },
    {
      id: "RATING",
      label: "AVERAGE RATING",
      value: `${summary.averageRating} ★`,
      subtext: "Based on published feedback",
      icon: Star,
      color: "text-amber-600",
    },
    {
      id: "AWAITING_RESPONSE",
      label: "AWAITING RESPONSE",
      value: summary.awaitingResponse.toString(),
      subtext: `${summary.respondedReviews} responses published`,
      icon: Clock,
      color: "text-rose-700",
      highlight: summary.awaitingResponse > 0,
    },
    {
      id: "RESPONSE_RATE",
      label: "RESPONSE RATE",
      value: `${calculateResponseRatePct(summary)}%`,
      subtext: "Vendor response practice",
      icon: MessageSquare,
      color: "text-emerald-700",
    },
  ];

  function calculateResponseRatePct(s: VendorReviewsSummary) {
    if (s.publishedReviews === 0) return 0;
    return Math.round((s.respondedReviews / s.publishedReviews) * 100);
  }

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isSelected = activeFilterKey === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMetricFilter(m.id)}
              className={`text-left p-6 transition-all duration-200 border rounded-sm relative overflow-hidden group ${
                isSelected
                  ? "bg-[#161514] text-[#FAF8F5] border-[#161514] shadow-md"
                  : m.highlight
                  ? "bg-rose-50/50 border-rose-200 hover:border-rose-300 text-[#161514]"
                  : "bg-[#FAF8F5] border-[#161514]/10 hover:border-[#C5A880] text-[#161514]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-semibold tracking-[0.2em] uppercase font-sans ${
                    isSelected ? "text-[#C5A880]" : "text-[#5A5650]"
                  }`}
                >
                  {m.label}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? "text-[#C5A880]" : m.color
                  }`}
                />
              </div>

              <div
                className={`font-serif text-3xl font-normal tracking-tight mb-1 ${
                  isSelected ? "text-[#FAF8F5]" : "text-[#161514]"
                }`}
              >
                {m.value}
              </div>

              <p
                className={`text-xs font-sans ${
                  isSelected ? "text-[#FAF8F5]/70" : "text-[#5A5650]"
                }`}
              >
                {m.subtext}
              </p>

              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Stats Row */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-xs text-[#5A5650]">
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center gap-1.5">
            <ThumbsUp className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>
              Helpful Votes: <strong className="text-[#161514]">{summary.totalHelpfulVotes}</strong>
            </span>
          </div>

          <div className="hidden sm:block text-[#161514]/20">•</div>

          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>
              Review Requests: <strong className="text-[#161514]">{summary.reviewRequestsCompleted} completed</strong> of {summary.reviewRequestsSent} sent
            </span>
          </div>
        </div>

        <div className="text-[11px] text-[#5A5650] font-sans">
          Derived deterministically from sample dataset
        </div>
      </div>
    </section>
  );
};
