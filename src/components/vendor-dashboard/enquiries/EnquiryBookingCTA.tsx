"use client";

import React, { useState } from "react";
import { EnquiryStatus } from "@/data/vendorEnquiries";
import { CalendarCheck, ArrowRight, Sparkles } from "lucide-react";

interface EnquiryBookingCTAProps {
  status: EnquiryStatus;
  coupleName: string;
}

export const EnquiryBookingCTA: React.FC<EnquiryBookingCTAProps> = ({
  status,
  coupleName,
}) => {
  const [showDemoNotice, setShowDemoNotice] = useState(false);

  if (status !== "ACCEPTED") {
    return (
      <div className="p-4 bg-[#FAF8F5] border border-dashed border-[#161514]/15 text-xs text-[#5A5650] flex items-center justify-between">
        <span>Booking conversion becomes available once status is ACCEPTED.</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5A5650]/70">
          STATUS: {status}
        </span>
      </div>
    );
  }

  return (
    <div className="bg-[#161514] text-[#FAF8F5] p-6 border border-[#161514] mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <CalendarCheck className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#C5A880]">
              NEXT STEP: CONVERT TO BOOKING
            </span>
          </div>
          <h4 className="font-serif text-xl font-medium tracking-tight">
            Ready to turn {coupleName}&apos;s enquiry into a booking?
          </h4>
          <p className="text-xs text-[#FAF8F5]/70 mt-1 max-w-xl">
            Lock in dates, specify package contract details, and schedule initial retainer invoices in your booking schedule.
          </p>
        </div>

        <button
          onClick={() => setShowDemoNotice(true)}
          className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#C5A880] text-[#161514] font-medium text-xs uppercase tracking-wider hover:bg-[#C5A880]/90 transition-colors"
        >
          <span>Create Booking</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {showDemoNotice && (
        <div className="mt-4 p-3 bg-[#FAF8F5]/10 border border-[#C5A880]/30 text-xs text-[#FAF8F5] flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#C5A880] shrink-0" />
          <span>
            <strong>Demo notice:</strong> Booking creation will be connected when Vendor Bookings is implemented.
          </span>
        </div>
      )}
    </div>
  );
};
