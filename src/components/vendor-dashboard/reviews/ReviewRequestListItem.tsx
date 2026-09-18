"use client";

import React from "react";
import { ReviewRequest } from "@/data/vendorReviews";
import { Send, ChevronRight } from "lucide-react";

interface ReviewRequestListItemProps {
  request: ReviewRequest;
  isSelected: boolean;
  onSelect: () => void;
}

export const ReviewRequestListItem: React.FC<ReviewRequestListItemProps> = ({
  request,
  isSelected,
  onSelect,
}) => {
  const isCompleted = request.requestStatus === "COMPLETED";

  return (
    <div
      onClick={onSelect}
      className={`p-4 border rounded-sm transition-all cursor-pointer bg-[#FAF8F5] flex items-center justify-between gap-4 ${
        isSelected
          ? "border-[#C5A880] ring-1 ring-[#C5A880] bg-white"
          : "border-[#161514]/10 hover:border-[#C5A880]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-white border border-[#161514]/10 rounded-sm text-[#161514]">
          <Send className="w-4 h-4 text-[#C5A880]" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <h4 className="font-serif text-base font-medium text-[#161514]">
              {request.coupleName}
            </h4>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
                isCompleted
                  ? "bg-emerald-100 text-emerald-900"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              {request.requestStatus}
            </span>
          </div>

          <p className="text-xs text-[#5A5650] font-sans truncate max-w-[280px]">
            {request.service} • Wedding: {request.weddingDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right font-sans text-xs text-[#5A5650]">
          {request.requestedAt && (
            <span className="block">Sent: {request.requestedAt.split("T")[0]}</span>
          )}
          {request.completedAt && (
            <span className="block font-medium text-emerald-800">
              Submitted: {request.completedAt.split("T")[0]}
            </span>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-[#5A5650]" />
      </div>
    </div>
  );
};
