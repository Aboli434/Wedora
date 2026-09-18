"use client";

import React from "react";
import { ReviewActivity as ActivityItem } from "@/data/vendorReviews";
import { History } from "lucide-react";

interface ReviewActivityProps {
  activities: ActivityItem[];
}

export const ReviewActivity: React.FC<ReviewActivityProps> = ({ activities }) => {
  if (activities.length === 0) {
    return (
      <div className="p-3 bg-white border border-[#161514]/10 rounded-sm text-xs text-[#5A5650] italic font-sans">
        No lifecycle activities recorded for this review yet.
      </div>
    );
  }

  return (
    <div className="space-y-3 pt-4 border-t border-[#161514]/10 font-sans">
      <div className="flex items-center gap-1.5 text-[#161514] mb-2">
        <History className="w-4 h-4 text-[#C5A880]" />
        <h4 className="font-serif text-base font-medium">Review Lifecycle Activity</h4>
      </div>

      <div className="relative border-l border-[#161514]/15 pl-4 space-y-3">
        {activities.map((act) => (
          <div key={act.id} className="relative text-xs">
            <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A880] border-2 border-white" />
            <p className="text-[#161514] font-medium leading-tight">
              {act.description}
            </p>
            <span className="text-[10px] text-[#5A5650] block mt-0.5">
              {act.timestamp.replace("T", " ").replace("Z", "")}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
