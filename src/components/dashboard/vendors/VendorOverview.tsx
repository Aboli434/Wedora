"use client";

import React from "react";
import { VendorSummary } from "@/data/vendorsDashboard";
import { formatIndianCurrency } from "@/lib/vendorsDashboard";
import { Store, CheckCircle2, Clock, Bookmark, CreditCard } from "lucide-react";

interface VendorOverviewProps {
  summary: VendorSummary;
}

export function VendorOverview({ summary }: VendorOverviewProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#161514]/10 pb-4">
        <div>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            VENDOR WORKSPACE SUMMARY
          </span>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            Creative Team Overview
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514]/5 border border-[#161514]/15 text-[10px] font-mono tracking-widest uppercase text-[#5A5650]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          ILLUSTRATIVE DEMO
        </span>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Total Vendors */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <Store className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Total Vendors</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {summary.totalVendors}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            In active workspace
          </span>
        </div>

        {/* Booked */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#2D4A3E] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E]" />
            <span>Booked</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2D4A3E]">
            {summary.bookedVendors}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Contracts confirmed
          </span>
        </div>

        {/* Pending Enquiries */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#8C6D3B] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pending</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#8C6D3B]">
            {summary.pendingEnquiries}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Enquiries & negotiations
          </span>
        </div>

        {/* Shortlisted */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <Bookmark className="w-3.5 h-3.5 text-[#5A5650]" />
            <span>Shortlisted</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#5A5650]">
            {summary.shortlistedVendors}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Saved for consideration
          </span>
        </div>

        {/* Payments Outstanding */}
        <div className="space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#161514] uppercase tracking-wider">
            <CreditCard className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Outstanding</span>
          </div>
          <p className="font-serif text-2xl sm:text-3xl font-light text-[#161514]">
            {formatIndianCurrency(summary.totalOutstanding)}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Remaining payment balance
          </span>
        </div>
      </div>
    </section>
  );
}
