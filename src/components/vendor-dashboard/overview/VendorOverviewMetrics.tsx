"use client";

import React from "react";
import { VendorDashboardSummary } from "@/data/vendorDashboard";

interface VendorOverviewMetricsProps {
  summary: VendorDashboardSummary;
}

export function VendorOverviewMetrics({ summary }: VendorOverviewMetricsProps) {
  const formattedOutstanding = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(summary.outstandingPayments);

  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8C857B]">
          Studio Metrics Overview
        </h2>
        <span className="text-[10px] font-mono text-[#8C857B] italic">
          Illustrative demo metrics
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1: New Enquiries */}
        <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-5 space-y-2 flex flex-col justify-between hover:border-[#DCD5C9] transition-colors">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-medium">
            New Enquiries
          </span>
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl text-[#2C2A29] font-light">
              {summary.activeEnquiries}
            </p>
            <p className="text-xs text-[#6E6B65]">
              {summary.awaitingResponseCount} awaiting response
            </p>
          </div>
        </div>

        {/* Metric 2: Upcoming Bookings */}
        <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-5 space-y-2 flex flex-col justify-between hover:border-[#DCD5C9] transition-colors">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-medium">
            Upcoming Bookings
          </span>
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl text-[#2C2A29] font-light">
              {summary.upcomingBookings}
            </p>
            <p className="text-xs text-[#6E6B65]">
              Confirmed celebrations
            </p>
          </div>
        </div>

        {/* Metric 3: Outstanding Payments */}
        <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-5 space-y-2 flex flex-col justify-between hover:border-[#DCD5C9] transition-colors">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-medium">
            Outstanding Payments
          </span>
          <div className="space-y-1">
            <p className="font-serif text-2xl md:text-3xl text-[#2C2A29] font-light">
              {formattedOutstanding}
            </p>
            <p className="text-xs text-[#6E6B65]">
              Pending milestone balances
            </p>
          </div>
        </div>

        {/* Metric 4: Profile Views */}
        <div className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-5 space-y-2 flex flex-col justify-between hover:border-[#DCD5C9] transition-colors">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-medium">
            Profile Views
          </span>
          <div className="space-y-1">
            <p className="font-serif text-3xl md:text-4xl text-[#2C2A29] font-light">
              {summary.profileViews}
            </p>
            <p className="text-xs text-[#6E6B65]">
              Couples viewed this month
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
