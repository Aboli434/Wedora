"use client";

import React from "react";
import Link from "next/link";
import { VendorDashboardSummary } from "@/data/vendorDashboard";
import { ArrowRight } from "lucide-react";

interface VendorPaymentSnapshotProps {
  summary: VendorDashboardSummary;
}

export function VendorPaymentSnapshot({ summary }: VendorPaymentSnapshotProps) {
  const formatCurrency = (val: number) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(val);

  const percentageReceived = Math.round(
    (summary.amountReceived / summary.totalBookedValue) * 100
  );

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Payment snapshot</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            Based on confirmed demo bookings.
          </p>
        </div>
        <Link
          href="/vendor/dashboard/payments"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors group self-start sm:self-auto"
        >
          <span>View payments</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            TOTAL BOOKED VALUE
          </span>
          <p className="font-serif text-2xl md:text-3xl font-light text-[#2C2A29]">
            {formatCurrency(summary.totalBookedValue)}
          </p>
          <span className="text-[11px] text-[#6E6B65]">Agreed package contracts</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            AMOUNT RECEIVED
          </span>
          <p className="font-serif text-2xl md:text-3xl font-light text-emerald-950">
            {formatCurrency(summary.amountReceived)}
          </p>
          <span className="text-[11px] text-[#6E6B65]">{percentageReceived}% collected to date</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            OUTSTANDING BALANCE
          </span>
          <p className="font-serif text-2xl md:text-3xl font-light text-[#2C2A29]">
            {formatCurrency(summary.outstandingPayments)}
          </p>
          <span className="text-[11px] text-[#6E6B65]">Pending milestone instalments</span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs text-[#6E6B65]">
          <span>Collection Progress</span>
          <span className="font-mono">{percentageReceived}% Collected</span>
        </div>
        <div className="w-full h-2 bg-[#E8E2D9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
            style={{ width: `${percentageReceived}%` }}
            role="progressbar"
            aria-valuenow={percentageReceived}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Collection progress: ${percentageReceived} percent`}
          />
        </div>
      </div>
    </section>
  );
}
