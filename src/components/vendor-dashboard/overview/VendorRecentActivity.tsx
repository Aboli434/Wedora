"use client";

import React from "react";
import { VendorActivity } from "@/data/vendorDashboard";

interface VendorRecentActivityProps {
  activities: VendorActivity[];
}

export function VendorRecentActivity({ activities }: VendorRecentActivityProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-4">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Recent activity</h2>
        <p className="text-xs text-[#6E6B65] mt-0.5">
          Chronological record of recent studio events and updates.
        </p>
      </div>

      <div className="relative border-l border-[#E8E2D9] ml-3 pl-6 space-y-6">
        {activities.map((act) => (
          <div key={act.id} className="relative space-y-1">
            {/* Timeline Dot */}
            <span className="absolute -left-[31px] top-1 w-2.5 h-2.5 rounded-full bg-[#C5A880] ring-4 ring-[#FAF8F5]" />

            <div className="flex items-center justify-between gap-4">
              <h3 className="text-sm font-medium text-[#2C2A29]">{act.title}</h3>
              <span className="text-[11px] font-mono text-[#8C857B] shrink-0">
                {act.timestamp}
              </span>
            </div>

            <p className="text-xs text-[#6E6B65] leading-relaxed">{act.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
