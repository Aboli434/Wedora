"use client";

import React from "react";
import { CreditCard, RotateCcw, Plus } from "lucide-react";

interface PaymentsEmptyStateProps {
  type?: "filtered" | "empty";
  onResetFilters?: () => void;
  onRecordPayment?: () => void;
}

export const PaymentsEmptyState: React.FC<PaymentsEmptyStateProps> = ({
  type = "empty",
  onResetFilters,
  onRecordPayment,
}) => {
  if (type === "filtered") {
    return (
      <div className="py-16 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5]/60 rounded-sm">
        <CreditCard className="w-8 h-8 text-[#5A5650] mx-auto mb-3 opacity-60" />
        <h3 className="font-serif text-xl text-[#161514] mb-2 font-medium">
          No payment records match your active filters or search.
        </h3>
        <p className="text-xs text-[#5A5650] max-w-md mx-auto mb-6 font-sans leading-relaxed">
          Try resetting your status, milestone type, payment channel, or due schedule filters to view available payments.
        </p>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#C5A880]" />
            Reset All Filters
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="py-16 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5]/60 rounded-sm">
      <CreditCard className="w-10 h-10 text-[#C5A880] mx-auto mb-4" />
      <h3 className="font-serif text-2xl text-[#161514] mb-2 font-normal">
        No payment milestones recorded yet.
      </h3>
      <p className="text-sm text-[#5A5650] max-w-md mx-auto mb-6 font-sans leading-relaxed">
        Keep your client financial relationships, deposits, and outstanding balances organized in one place.
      </p>
      {onRecordPayment && (
        <button
          type="button"
          onClick={onRecordPayment}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
        >
          <Plus className="w-4 h-4 text-[#C5A880]" />
          Record First Payment
        </button>
      )}
    </div>
  );
};
