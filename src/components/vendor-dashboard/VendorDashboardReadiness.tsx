"use client";

import React from "react";
import Link from "next/link";
import { FullVendorDashboardData } from "@/data/vendorDashboard";
import { CheckCircle2, Shield, ChevronRight } from "lucide-react";

interface VendorDashboardReadinessProps {
  data: FullVendorDashboardData;
}

export const VendorDashboardReadiness: React.FC<
  VendorDashboardReadinessProps
> = ({ data }) => {
  const profileComplete = data.profile.profileCompletion >= 80;
  const servicesReady = true; // Published active packages
  const portfolioReady = true; // Active portfolio items
  const availabilityReady = true; // Configured studio hours

  const isFullyReady = profileComplete && servicesReady && portfolioReady && availabilityReady;

  return (
    <section aria-label="Studio Readiness" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-4 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Shield className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Studio Readiness Status
          </h3>
        </div>

        {isFullyReady ? (
          <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200 rounded-sm flex items-center gap-1.5 self-start">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Ready for Public Enquiries
          </span>
        ) : (
          <Link
            href="/vendor/dashboard/business"
            className="text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] flex items-center gap-1 transition-colors self-start"
          >
            <span>Complete Profile ({data.profile.profileCompletion}%)</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        )}
      </div>

      {/* 4 Dimension Status List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {/* Dimension 1: Profile */}
        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#161514] block">Studio Profile</span>
            <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
              {data.profile.profileCompletion}% details added
            </span>
          </div>
          <CheckCircle2 className={`w-4 h-4 ${profileComplete ? "text-[#C5A880]" : "text-[#5A5650]/40"}`} />
        </div>

        {/* Dimension 2: Services */}
        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#161514] block">Services & Pricing</span>
            <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
              Packages Published
            </span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
        </div>

        {/* Dimension 3: Portfolio */}
        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#161514] block">Visual Portfolio</span>
            <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
              6 Gallery Albums
            </span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
        </div>

        {/* Dimension 4: Availability */}
        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-medium text-[#161514] block">Availability Hours</span>
            <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
              Configured & Active
            </span>
          </div>
          <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
        </div>
      </div>
    </section>
  );
};
