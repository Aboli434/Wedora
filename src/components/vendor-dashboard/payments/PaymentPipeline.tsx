"use client";

import React from "react";
import { VendorPayment, PaymentStatus } from "@/data/vendorPayments";
import { formatIndianCurrency } from "@/lib/vendorPayments";

interface PaymentPipelineProps {
  payments: VendorPayment[];
  activeStatus: PaymentStatus | "ALL";
  onSelectStatus: (status: PaymentStatus | "ALL") => void;
}

export const PaymentPipeline: React.FC<PaymentPipelineProps> = ({
  payments,
  activeStatus,
  onSelectStatus,
}) => {
  const statuses: { status: PaymentStatus; label: string }[] = [
    { status: "PENDING", label: "Pending" },
    { status: "PARTIALLY_PAID", label: "Partially Paid" },
    { status: "PAID", label: "Paid in Full" },
    { status: "OVERDUE", label: "Overdue" },
    { status: "CANCELLED", label: "Cancelled" },
    { status: "REFUNDED", label: "Refunded" },
  ];

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#161514]/10">
        <h3 className="font-serif text-base font-medium text-[#161514]">
          Milestone Status Flow
        </h3>
        {activeStatus !== "ALL" && (
          <button
            type="button"
            onClick={() => onSelectStatus("ALL")}
            className="text-xs text-[#C5A880] hover:text-[#161514] transition-colors font-sans underline"
          >
            Show All Statuses
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {statuses.map(({ status, label }) => {
          const matching = payments.filter((p) => p.status === status);
          const count = matching.length;
          const totalAmt = matching.reduce((sum, p) => sum + p.amount, 0);
          const isSelected = activeStatus === status;

          return (
            <button
              key={status}
              type="button"
              onClick={() => onSelectStatus(isSelected ? "ALL" : status)}
              className={`p-3.5 text-left border rounded-sm transition-all font-sans ${
                isSelected
                  ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                  : "bg-[#FAF8F5] border-[#161514]/10 hover:border-[#C5A880] text-[#161514]"
              }`}
            >
              <div className="flex items-center justify-between gap-1 mb-1">
                <span
                  className={`text-[10px] font-semibold uppercase tracking-wider ${
                    isSelected ? "text-[#C5A880]" : "text-[#5A5650]"
                  }`}
                >
                  {label}
                </span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-[#C5A880] text-[#161514]"
                      : "bg-[#161514]/10 text-[#161514]"
                  }`}
                >
                  {count}
                </span>
              </div>

              <div
                className={`font-serif text-sm font-medium ${
                  isSelected ? "text-[#FAF8F5]" : "text-[#161514]"
                }`}
              >
                {formatIndianCurrency(totalAmt)}
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
