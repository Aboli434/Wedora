"use client";

import React from "react";
import { VendorPayment, VendorPaymentsSummary } from "@/data/vendorPayments";
import { formatIndianCurrency, calculatePaymentProgress } from "@/lib/vendorPayments";
import { ShieldCheck } from "lucide-react";

interface PaymentsSnapshotProps {
  summary: VendorPaymentsSummary;
  payments: VendorPayment[];
}

export const PaymentsSnapshot: React.FC<PaymentsSnapshotProps> = ({
  summary,
  payments,
}) => {
  const collectionRate = calculatePaymentProgress(
    summary.totalReceived,
    summary.totalBookedValue
  );

  // Group by Payment Type
  const typeBreakdown = [
    {
      type: "ADVANCE",
      label: "Advance Deposits",
      amount: payments
        .filter((p) => p.paymentType === "ADVANCE")
        .reduce((sum, p) => sum + p.amount, 0),
      received: payments
        .filter((p) => p.paymentType === "ADVANCE")
        .reduce((sum, p) => sum + p.paidAmount, 0),
    },
    {
      type: "INSTALLMENT",
      label: "Milestone Installments",
      amount: payments
        .filter((p) => p.paymentType === "INSTALLMENT")
        .reduce((sum, p) => sum + p.amount, 0),
      received: payments
        .filter((p) => p.paymentType === "INSTALLMENT")
        .reduce((sum, p) => sum + p.paidAmount, 0),
    },
    {
      type: "FINAL_PAYMENT",
      label: "Final Settlements",
      amount: payments
        .filter((p) => p.paymentType === "FINAL_PAYMENT")
        .reduce((sum, p) => sum + p.amount, 0),
      received: payments
        .filter((p) => p.paymentType === "FINAL_PAYMENT")
        .reduce((sum, p) => sum + p.paidAmount, 0),
    },
  ];

  return (
    <section className="mb-12 bg-[#FAF8F5] border border-[#161514]/10 p-6 lg:p-8 rounded-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-[#161514]/10">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1 font-sans">
            COLLECTION & LEDGER ANALYSIS
          </span>
          <h2 className="font-serif text-xl md:text-2xl font-normal text-[#161514]">
            Financial Position & Milestone Breakdown
          </h2>
        </div>

        <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] bg-white border border-[#161514]/10 px-3 py-1.5 rounded-sm">
          <ShieldCheck className="w-4 h-4 text-[#C5A880]" />
          <span>Real-time collection rate: <strong className="text-[#161514] font-semibold">{collectionRate}%</strong></span>
        </div>
      </div>

      {/* Progress Bar Visualization */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs font-sans mb-2">
          <span className="text-[#5A5650]">
            Received: <strong className="text-[#161514]">{formatIndianCurrency(summary.totalReceived)}</strong>
          </span>
          <span className="text-[#5A5650]">
            Booked Target: <strong className="text-[#161514]">{formatIndianCurrency(summary.totalBookedValue)}</strong>
          </span>
        </div>

        <div className="w-full h-3 bg-[#161514]/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
            style={{ width: `${collectionRate}%` }}
            aria-valuenow={collectionRate}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          />
        </div>

        <div className="flex justify-between items-center text-[11px] text-[#5A5650] mt-1.5 font-sans">
          <span>{collectionRate}% Collected</span>
          <span>Outstanding: {formatIndianCurrency(summary.totalOutstanding)} ({100 - collectionRate}%)</span>
        </div>
      </div>

      {/* Payment Type Breakdown Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {typeBreakdown.map((item) => {
          const typeProgress = calculatePaymentProgress(item.received, item.amount);

          return (
            <div
              key={item.type}
              className="p-4 bg-white border border-[#161514]/10 rounded-sm"
            >
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1 font-sans">
                {item.label}
              </span>
              <div className="font-serif text-lg text-[#161514] font-medium mb-1">
                {formatIndianCurrency(item.amount)}
              </div>

              <div className="flex items-center justify-between text-xs text-[#5A5650] font-sans mb-2">
                <span>Received: {formatIndianCurrency(item.received)}</span>
                <span className="font-medium text-[#161514]">{typeProgress}%</span>
              </div>

              <div className="w-full h-1.5 bg-[#161514]/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#161514] transition-all duration-300"
                  style={{ width: `${typeProgress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
