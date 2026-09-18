"use client";

import React, { useState } from "react";
import { EnquiryStatus } from "@/data/vendorEnquiries";
import { canTransitionStatus, formatEnquiryStatus } from "@/lib/vendorEnquiries";

interface EnquiryStatusControlProps {
  currentStatus: EnquiryStatus;
  onChangeStatus: (newStatus: EnquiryStatus) => void;
}

export const EnquiryStatusControl: React.FC<EnquiryStatusControlProps> = ({
  currentStatus,
  onChangeStatus,
}) => {
  const [showConfirm, setShowConfirm] = useState<EnquiryStatus | null>(null);

  const allStatuses: EnquiryStatus[] = [
    "NEW",
    "REVIEWING",
    "RESPONDED",
    "NEGOTIATING",
    "ACCEPTED",
    "DECLINED",
    "CLOSED",
  ];

  const handleSelect = (target: EnquiryStatus) => {
    if (target === currentStatus) return;

    // Destructive or sensitive status changes require confirmation
    if (target === "DECLINED" || target === "CLOSED") {
      setShowConfirm(target);
    } else {
      onChangeStatus(target);
    }
  };

  return (
    <div className="bg-white border border-[#161514]/10 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
          ENQUIRY STATUS
        </span>
        <span className="text-xs font-serif italic text-[#161514]">
          Current: <strong>{formatEnquiryStatus(currentStatus)}</strong>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {allStatuses.map((status) => {
          const isCurrent = status === currentStatus;
          const isAllowed = canTransitionStatus(currentStatus, status);

          return (
            <button
              key={status}
              disabled={!isAllowed && !isCurrent}
              onClick={() => handleSelect(status)}
              className={`px-3 py-1.5 text-xs font-medium transition-all ${
                isCurrent
                  ? "bg-[#161514] text-[#FAF8F5] border border-[#161514]"
                  : isAllowed
                  ? "bg-[#FAF8F5] text-[#161514] border border-[#161514]/20 hover:border-[#161514] hover:bg-white"
                  : "bg-gray-100 text-gray-400 border border-transparent cursor-not-allowed opacity-50"
              }`}
            >
              {formatEnquiryStatus(status)}
              {isCurrent && " ✓"}
            </button>
          );
        })}
      </div>

      {/* Confirmation Dialog overlay for Declined / Closed */}
      {showConfirm && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 text-amber-900 text-xs rounded-none flex items-center justify-between gap-3">
          <div>
            <strong>Confirm status change?</strong> Changing status to{" "}
            <span className="uppercase font-semibold">{showConfirm}</span> will update the pipeline status.
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onChangeStatus(showConfirm);
                setShowConfirm(null);
              }}
              className="px-2.5 py-1 bg-[#161514] text-[#FAF8F5] text-[11px] font-semibold uppercase tracking-wider"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowConfirm(null)}
              className="px-2.5 py-1 border border-[#161514]/20 text-[#161514] text-[11px] font-medium"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
