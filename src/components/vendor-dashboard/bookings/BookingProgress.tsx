"use client";

import React from "react";
import { VendorBooking } from "@/data/vendorBookings";
import { calculateBookingProgress } from "@/lib/vendorBookings";

interface BookingProgressProps {
  booking: VendorBooking;
}

export const BookingProgress: React.FC<BookingProgressProps> = ({ booking }) => {
  const progressPct = calculateBookingProgress(booking);

  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
          OPERATIONAL READINESS PROGRESS
        </span>
        <span className="font-serif text-lg font-medium text-[#161514]">
          {progressPct}%
        </span>
      </div>

      <div className="w-full h-2.5 bg-[#161514]/10 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-[#161514] transition-all duration-300"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      <p className="text-[11px] text-[#5A5650] leading-relaxed">
        Weighted operational score derived from contract status ({booking.bookingStatus}), venue/event schedule readiness, and milestone financial collection.
      </p>
    </div>
  );
};
