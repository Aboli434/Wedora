"use client";

import React from "react";
import { DashboardVendor } from "@/data/vendorsDashboard";
import { formatVendorCategory, formatVendorStatus } from "@/lib/vendorsDashboard";
import { Calendar, ChevronRight } from "lucide-react";

interface VendorUpcomingActionsProps {
  vendors: DashboardVendor[];
  onSelectVendor: (vendorId: string) => void;
}

export function VendorUpcomingActions({
  vendors,
  onSelectVendor,
}: VendorUpcomingActionsProps) {
  if (vendors.length === 0) {
    return (
      <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-2">
        <h3 className="font-serif text-lg text-[#161514]">Upcoming Vendor Milestones</h3>
        <p className="text-xs font-sans text-[#5A5650]">
          No vendor actions are due soon.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          TIMELINE & MILESTONES
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Upcoming Vendor Actions
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {vendors.map((vendor) => {
          const statusInfo = formatVendorStatus(vendor.status);
          return (
            <div
              key={vendor.id}
              onClick={() => onSelectVendor(vendor.id)}
              className="p-4 border border-[#161514]/10 bg-white/60 hover:border-[#C5A880] cursor-pointer transition-colors space-y-3 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="font-serif text-base text-[#161514] font-medium group-hover:text-[#C5A880] transition-colors">
                    {vendor.name}
                  </span>
                  <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650] block">
                    {formatVendorCategory(vendor.category)}
                  </span>
                </div>
                <span
                  className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${statusInfo.badgeClass}`}
                >
                  {statusInfo.label}
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-xs font-sans text-[#161514] font-medium">
                  {vendor.nextAction}
                </p>
                {vendor.nextActionDate && (
                  <div className="flex items-center gap-1.5 text-[11px] font-sans text-[#8C6D3B]">
                    <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>Target Date: {vendor.nextActionDate}</span>
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-[#161514]/10 flex items-center justify-between text-xs font-sans">
                <span className="text-[#5A5650]">
                  Location: {vendor.location}
                </span>
                <span className="inline-flex items-center gap-1 text-[#161514] font-medium uppercase tracking-wider text-[10px] group-hover:text-[#C5A880]">
                  Details
                  <ChevronRight className="w-3 h-3 text-[#C5A880]" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
