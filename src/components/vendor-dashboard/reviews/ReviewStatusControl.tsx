"use client";

import React, { useState } from "react";
import { ReviewStatus } from "@/data/vendorReviews";
import { formatReviewStatus, canTransitionReviewStatus } from "@/lib/vendorReviews";
import { ShieldAlert } from "lucide-react";

interface ReviewStatusControlProps {
  currentStatus: ReviewStatus;
  onUpdateStatus: (newStatus: ReviewStatus) => void;
}

export const ReviewStatusControl: React.FC<ReviewStatusControlProps> = ({
  currentStatus,
  onUpdateStatus,
}) => {
  const [confirmStatus, setConfirmStatus] = useState<ReviewStatus | null>(null);

  const allStatuses: ReviewStatus[] = ["PUBLISHED", "PENDING", "HIDDEN", "FLAGGED"];
  const validTransitions = allStatuses.filter((s) => canTransitionReviewStatus(currentStatus, s));

  const handleSelect = (status: ReviewStatus) => {
    if (status === "HIDDEN" || status === "FLAGGED") {
      setConfirmStatus(status);
    } else {
      onUpdateStatus(status);
    }
  };

  return (
    <div className="space-y-3 font-sans">
      <div className="flex items-center justify-between text-xs">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650]">
          Review Visibility & Status
        </span>
        <span className="text-[#161514] font-medium">
          Current: <strong>{formatReviewStatus(currentStatus)}</strong>
        </span>
      </div>

      {validTransitions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {validTransitions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className="px-3 py-1.5 bg-white border border-[#161514]/20 hover:border-[#C5A880] text-xs text-[#161514] font-medium rounded-sm transition-colors"
            >
              Mark as {formatReviewStatus(opt)}
            </button>
          ))}
        </div>
      )}

      {/* Confirmation Box for Hide/Flag */}
      {confirmStatus && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-rose-900 font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            Confirm status change to {formatReviewStatus(confirmStatus)}?
          </div>
          <p className="text-[#5A5650]">
            This action updates the visibility state of this review on your Wedora public studio profile.
          </p>
          <div className="flex items-center gap-2 pt-1">
            <button
              type="button"
              onClick={() => {
                onUpdateStatus(confirmStatus);
                setConfirmStatus(null);
              }}
              className="px-3 py-1 bg-rose-800 text-white text-[11px] font-medium rounded-xs hover:bg-rose-900"
            >
              Confirm Update
            </button>
            <button
              type="button"
              onClick={() => setConfirmStatus(null)}
              className="px-3 py-1 bg-white border border-rose-200 text-xs text-[#161514] rounded-xs"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
