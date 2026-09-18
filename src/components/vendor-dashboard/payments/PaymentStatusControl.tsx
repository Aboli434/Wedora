"use client";

import React, { useState } from "react";
import { PaymentStatus } from "@/data/vendorPayments";
import { formatPaymentStatus } from "@/lib/vendorPayments";
import { ShieldAlert } from "lucide-react";

interface PaymentStatusControlProps {
  currentStatus: PaymentStatus;
  onUpdateStatus: (newStatus: PaymentStatus) => void;
}

export const PaymentStatusControl: React.FC<PaymentStatusControlProps> = ({
  currentStatus,
  onUpdateStatus,
}) => {
  const [confirmStatus, setConfirmStatus] = useState<PaymentStatus | null>(null);

  const getValidTransitions = (status: PaymentStatus): PaymentStatus[] => {
    switch (status) {
      case "PENDING":
        return ["PARTIALLY_PAID", "PAID", "OVERDUE", "CANCELLED"];
      case "PARTIALLY_PAID":
        return ["PAID", "OVERDUE", "CANCELLED"];
      case "OVERDUE":
        return ["PARTIALLY_PAID", "PAID", "CANCELLED"];
      case "PAID":
        return ["REFUNDED"];
      case "CANCELLED":
        return ["PENDING"];
      case "REFUNDED":
        return [];
      default:
        return [];
    }
  };

  const validOptions = getValidTransitions(currentStatus);

  const handleSelect = (status: PaymentStatus) => {
    if (status === "CANCELLED" || status === "REFUNDED") {
      setConfirmStatus(status);
    } else {
      onUpdateStatus(status);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] font-sans">
          Milestone Status Control
        </span>
        <span className="text-xs text-[#161514] font-medium font-sans">
          Current: <strong>{formatPaymentStatus(currentStatus)}</strong>
        </span>
      </div>

      {validOptions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {validOptions.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => handleSelect(opt)}
              className="px-3 py-1.5 bg-white border border-[#161514]/20 hover:border-[#C5A880] text-xs text-[#161514] font-medium rounded-sm font-sans transition-colors"
            >
              Mark as {formatPaymentStatus(opt)}
            </button>
          ))}
        </div>
      )}

      {/* Confirmation Box for Destructive / Financial Refund Actions */}
      {confirmStatus && (
        <div className="p-3 bg-rose-50 border border-rose-200 rounded-sm text-xs space-y-2">
          <div className="flex items-center gap-1.5 text-rose-900 font-semibold font-sans">
            <ShieldAlert className="w-4 h-4 text-rose-700" />
            Confirm status change to {formatPaymentStatus(confirmStatus)}?
          </div>
          <p className="text-[#5A5650] font-sans">
            This action updates the milestone status and ledger summary.
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
