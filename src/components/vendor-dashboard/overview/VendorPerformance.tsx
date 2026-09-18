"use client";

import React from "react";
import { VendorDashboardSummary } from "@/data/vendorDashboard";

interface VendorPerformanceProps {
  summary: VendorDashboardSummary;
}

export function VendorPerformance({ summary }: VendorPerformanceProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-4">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Business performance</h2>
        <p className="text-xs text-[#6E6B65] mt-0.5">
          Illustrative performance metrics for the current planning season.
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            ENQUIRIES THIS MONTH
          </span>
          <p className="font-serif text-3xl font-light text-[#2C2A29]">
            {summary.monthlyEnquiries}
          </p>
          <span className="text-[11px] text-[#6E6B65] block">Incoming couple requests</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            RESPONSE RATE
          </span>
          <p className="font-serif text-3xl font-light text-[#2C2A29]">
            {summary.responseRate}%
          </p>
          <span className="text-[11px] text-[#6E6B65] block">Replied within 24 hours</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            PROFILE VIEWS
          </span>
          <p className="font-serif text-3xl font-light text-[#2C2A29]">
            {summary.profileViews}
          </p>
          <span className="text-[11px] text-[#6E6B65] block">Directory page visits</span>
        </div>

        <div className="space-y-1">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#8C857B] font-semibold">
            SHORTLISTED
          </span>
          <p className="font-serif text-3xl font-light text-[#2C2A29]">
            {summary.shortlistedCount}
          </p>
          <span className="text-[11px] text-[#6E6B65] block">Saved by active couples</span>
        </div>
      </div>
    </section>
  );
}
