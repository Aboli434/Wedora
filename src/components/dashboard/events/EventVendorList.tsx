"use client";

import React from "react";
import { EventVendor } from "@/data/eventsDashboard";
import { Store, CheckCircle2, Clock } from "lucide-react";

interface EventVendorListProps {
  vendors: EventVendor[];
}

export function EventVendorList({ vendors }: EventVendorListProps) {
  if (vendors.length === 0) {
    return (
      <p className="text-xs font-sans text-[#5A5650] italic">
        No vendors currently assigned to this function.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold flex items-center gap-1">
        <Store className="w-3.5 h-3.5 text-[#C5A880]" />
        Assigned Creative Partners
      </span>

      <div className="divide-y divide-[#161514]/10 bg-white/60 border border-[#161514]/10">
        {vendors.map((v) => (
          <div
            key={v.id}
            className="p-3 flex items-center justify-between gap-3 text-xs font-sans"
          >
            <div>
              <span className="font-serif text-sm text-[#161514] font-medium block">
                {v.vendorName}
              </span>
              <span className="text-[11px] text-[#5A5650]">
                {v.category}
              </span>
            </div>

            <span
              className={`inline-flex items-center gap-1 text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${
                v.status === "CONFIRMED"
                  ? "bg-[#2D4A3E]/10 text-[#2D4A3E] border-[#2D4A3E]/20"
                  : "bg-[#C5A880]/15 text-[#8C6D3B] border-[#C5A880]/30"
              }`}
            >
              {v.status === "CONFIRMED" ? (
                <CheckCircle2 className="w-3 h-3 text-[#2D4A3E]" />
              ) : (
                <Clock className="w-3 h-3 text-[#C5A880]" />
              )}
              {v.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
