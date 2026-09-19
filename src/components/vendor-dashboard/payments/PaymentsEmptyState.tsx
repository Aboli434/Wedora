"use client";

import React from "react";
import Link from "next/link";
import { RotateCcw, CalendarCheck } from "lucide-react";

interface PaymentsEmptyStateProps {
  type?: "filtered" | "empty";
  onResetFilters?: () => void;
  onRecordPayment?: () => void;
}

export const PaymentsEmptyState: React.FC<PaymentsEmptyStateProps> = ({
  type = "empty",
  onResetFilters,
}) => {
  if (type === "filtered") {
    return (
      <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6 font-sans">
        <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          PAYMENTS &amp; INVOICES
        </span>
        <h3 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
          No payment records match your active filters.
        </h3>
        <p className="text-xs text-[#5A5650] max-w-sm mx-auto leading-relaxed">
          Try resetting your status, milestone type, payment channel, or due schedule filters.
        </p>
        {onResetFilters && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6 font-sans">
      <span className="text-[10px] tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        PAYMENTS &amp; INVOICES
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
        Your payment activity will appear here.
      </h2>
      <p className="text-xs text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Once bookings and payment records are connected, you can track what has been received and what is due.
      </p>
      <div className="pt-2">
        <Link
          href="/vendor/dashboard/bookings"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <CalendarCheck className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>View bookings</span>
        </Link>
      </div>
    </div>
  );
};

