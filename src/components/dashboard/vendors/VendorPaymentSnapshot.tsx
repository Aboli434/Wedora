"use client";

import React from "react";
import { DashboardVendor, VendorPaymentSummary } from "@/data/vendorsDashboard";
import {
  formatIndianCurrency,
  formatPaymentStatus,
  calculatePaymentProgress,
} from "@/lib/vendorsDashboard";
import { CreditCard } from "lucide-react";

interface VendorPaymentSnapshotProps {
  paymentSummary: VendorPaymentSummary;
  vendors: DashboardVendor[];
  onSelectVendor: (vendorId: string) => void;
}

export function VendorPaymentSnapshot({
  paymentSummary,
  vendors,
  onSelectVendor,
}: VendorPaymentSnapshotProps) {
  // Only show vendors with recorded financial amounts
  const paymentVendors = vendors.filter((v) => v.amount && v.amount > 0);

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#161514]/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              FINANCIAL SCHEDULE
            </span>
          </div>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            Vendor Payment Snapshot
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514]/5 border border-[#161514]/15 text-[10px] font-mono tracking-widest uppercase text-[#5A5650]">
          ILLUSTRATIVE DEMO
        </span>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total Committed */}
        <div className="p-4 bg-white/60 border border-[#161514]/10 space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5650]">
            Total Committed
          </span>
          <p className="font-serif text-2xl text-[#161514] font-light">
            {formatIndianCurrency(paymentSummary.totalCommitted)}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Across {paymentSummary.vendorsWithPayments} contracted vendors
          </span>
        </div>

        {/* Total Paid */}
        <div className="p-4 bg-white/60 border border-[#161514]/10 space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#2D4A3E]">
            Total Paid
          </span>
          <p className="font-serif text-2xl text-[#2D4A3E] font-light">
            {formatIndianCurrency(paymentSummary.totalPaid)}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Cleared deposits & fees
          </span>
        </div>

        {/* Outstanding Balance */}
        <div className="p-4 bg-white/60 border border-[#161514]/10 space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C6D3B]">
            Outstanding Balance
          </span>
          <p className="font-serif text-2xl text-[#8C6D3B] font-light">
            {formatIndianCurrency(paymentSummary.totalOutstanding)}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Remaining instalments due
          </span>
        </div>
      </div>

      {/* Per-Vendor Payment Ledger */}
      <div className="space-y-3 pt-2">
        <span className="block text-xs font-sans uppercase tracking-wider text-[#161514] font-semibold">
          Vendor Financial Breakdown
        </span>

        <div className="divide-y divide-[#161514]/10 bg-white/40 border border-[#161514]/10">
          {paymentVendors.map((vendor) => {
            const progress = calculatePaymentProgress(vendor);
            const statusInfo = formatPaymentStatus(vendor.paymentStatus);
            const amount = vendor.amount || 0;
            const paid = vendor.amountPaid || 0;
            const outstanding = Math.max(0, amount - paid);

            return (
              <div
                key={vendor.id}
                onClick={() => onSelectVendor(vendor.id)}
                className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#161514]/[0.02] cursor-pointer transition-colors"
              >
                {/* Vendor Info */}
                <div className="space-y-1 md:w-1/3">
                  <div className="flex items-center gap-2">
                    <span className="font-serif text-base text-[#161514] font-medium">
                      {vendor.name}
                    </span>
                    <span
                      className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${statusInfo.badgeClass}`}
                    >
                      {statusInfo.label}
                    </span>
                  </div>
                  <span className="text-xs font-sans text-[#5A5650] block">
                    {vendor.location}
                  </span>
                </div>

                {/* Amounts Breakdown */}
                <div className="grid grid-cols-3 gap-3 text-xs font-sans md:w-1/3">
                  <div>
                    <span className="block text-[10px] text-[#5A5650] uppercase">Total</span>
                    <span className="font-serif text-sm font-medium text-[#161514]">
                      {formatIndianCurrency(amount)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#2D4A3E] uppercase">Paid</span>
                    <span className="font-serif text-sm font-medium text-[#2D4A3E]">
                      {formatIndianCurrency(paid)}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-[#8C6D3B] uppercase">Due</span>
                    <span className="font-serif text-sm font-medium text-[#8C6D3B]">
                      {formatIndianCurrency(outstanding)}
                    </span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="md:w-1/4 space-y-1">
                  <div className="flex justify-between text-[11px] font-sans">
                    <span className="text-[#5A5650]">Paid</span>
                    <span className="font-medium text-[#161514]">{progress}%</span>
                  </div>
                  <div
                    className="w-full h-1.5 bg-[#161514]/10 overflow-hidden"
                    role="progressbar"
                    aria-valuenow={progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={`${vendor.name} payment progress: ${progress} percent.`}
                  >
                    <div
                      className="h-full bg-[#C5A880] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
