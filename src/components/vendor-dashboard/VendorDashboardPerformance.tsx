"use client";

import React from "react";
import Link from "next/link";
import { FullVendorDashboardData } from "@/data/vendorDashboard";
import { Star, MessageSquare, Clock, ChevronRight } from "lucide-react";

interface VendorDashboardPerformanceProps {
  data: FullVendorDashboardData;
}

export const VendorDashboardPerformance: React.FC<
  VendorDashboardPerformanceProps
> = ({ data }) => {
  return (
    <div className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-4 shadow-xs">
      <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
        <div>
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block font-sans">
            REPUTATION & SLA
          </span>
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Studio Performance Metrics
          </h3>
        </div>
        <Link
          href="/vendor/dashboard/reviews"
          className="text-xs font-medium uppercase tracking-wider text-[#5A5650] hover:text-[#161514] flex items-center gap-1 transition-colors"
        >
          <span>Reviews Workspace</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
        {/* Rating */}
        <div className="p-3.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A5650] text-[10px] uppercase tracking-wider font-semibold">
            <span>Average Rating</span>
            <Star className="w-3.5 h-3.5 text-[#C5A880] fill-[#C5A880]" />
          </div>
          <div className="font-serif text-2xl font-medium text-[#161514]">
            4.9 <span className="text-xs font-sans text-[#5A5650]">/ 5.0</span>
          </div>
          <p className="text-[11px] text-[#5A5650] font-sans">
            Based on 7 verified client reviews
          </p>
        </div>

        {/* Response Rate */}
        <div className="p-3.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A5650] text-[10px] uppercase tracking-wider font-semibold">
            <span>Response Rate</span>
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
          </div>
          <div className="font-serif text-2xl font-medium text-[#161514]">
            {data.summary.responseRate}%
          </div>
          <p className="text-[11px] text-[#5A5650] font-sans">
            SLA responses within 12 hours
          </p>
        </div>

        {/* Profile Views */}
        <div className="p-3.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm space-y-1">
          <div className="flex items-center justify-between text-[#5A5650] text-[10px] uppercase tracking-wider font-semibold">
            <span>Directory Impressions</span>
            <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
          </div>
          <div className="font-serif text-2xl font-medium text-[#161514]">
            {data.summary.profileViews}
          </div>
          <p className="text-[11px] text-[#5A5650] font-sans">
            Monthly studio profile views
          </p>
        </div>
      </div>
    </div>
  );
};
