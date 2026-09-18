"use client";

import React, { useState } from "react";
import { BookingStatus } from "@/data/vendorBookings";
import { canTransitionBookingStatus, formatBookingStatus } from "@/lib/vendorBookings";

interface BookingStatusControlProps {
  currentStatus: BookingStatus;
  onChangeStatus: (newStatus: BookingStatus) => void;
}

export const BookingStatusControl: React.FC<BookingStatusControlProps> = ({
  currentStatus,
  onChangeStatus,
}) => {
  const [showConfirm, setShowConfirm] = useState<BookingStatus | null>(null);

  const allStatuses: BookingStatus[] = [
    "INQUIRY",
    "CONFIRMED",
    "IN_PROGRESS",
    "COMPLETED",
    "CANCELLED",
  ];

  const handleSelect = (target: BookingStatus) => {
    if (target === currentStatus) return;

    if (target === "CANCELLED") {
      setShowConfirm(target);
    } else {
      onChangeStatus(target);
    }
  };

  return (
    <div className="bg-white border border-[#161514]/10 p-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
          BOOKING OPERATIONS STATUS
        </span>
        <span className="text-xs font-serif italic text-[#161514]">
          Current: <strong>{formatBookingStatus(currentStatus)}</strong>
        </span>
      </div>

      <div className="flex flex-wrap gap-2">
        {allStatuses.map((status) => {
          const isCurrent = status === currentStatus;
          const isAllowed = canTransitionBookingStatus(currentStatus, status);

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
              {formatBookingStatus(status)}
              {isCurrent && " ✓"}
            </button>
          );
        })}
      </div>

      {/* Confirmation Dialog overlay for CANCELLED */}
      {showConfirm && (
        <div className="mt-4 p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs flex items-center justify-between gap-3">
          <div>
            <strong>Confirm cancellation?</strong> Changing booking status to{" "}
            <span className="uppercase font-semibold">{showConfirm}</span> will release scheduled dates and halt milestone tracking.
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => {
                onChangeStatus(showConfirm);
                setShowConfirm(null);
              }}
              className="px-2.5 py-1 bg-rose-800 text-white text-[11px] font-semibold uppercase tracking-wider"
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
