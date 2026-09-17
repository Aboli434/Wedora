"use client";

import React from "react";
import { VendorStatus } from "@/data/vendorsDashboard";
import { ArrowRight } from "lucide-react";

interface VendorStatusOverviewProps {
  statuses: Record<VendorStatus, number>;
}

const FLOW_STEPS: { key: VendorStatus; label: string; desc: string }[] = [
  { key: "SHORTLISTED", label: "Shortlisted", desc: "Saved for consideration" },
  { key: "ENQUIRY_SENT", label: "Enquiry Sent", desc: "Awaiting vendor response" },
  { key: "NEGOTIATING", label: "Negotiating", desc: "Reviewing quote & terms" },
  { key: "BOOKED", label: "Booked", desc: "Contract & deposit confirmed" },
  { key: "COMPLETED", label: "Completed", desc: "Event service delivered" },
];

export function VendorStatusOverview({ statuses }: VendorStatusOverviewProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          BOOKING PIPELINE
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Vendor Status Journey
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 relative">
        {FLOW_STEPS.map((step, idx) => {
          const count = statuses[step.key] || 0;
          const isBooked = step.key === "BOOKED";

          return (
            <div
              key={step.key}
              className={`p-4 border transition-all ${
                isBooked
                  ? "bg-[#2D4A3E]/5 border-[#2D4A3E]/30"
                  : "bg-white/60 border-[#161514]/10"
              } space-y-2 relative group`}
            >
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="text-[10px] font-mono tracking-widest uppercase text-[#C5A880]">
                  Step 0{idx + 1}
                </span>
                {idx < FLOW_STEPS.length - 1 && (
                  <ArrowRight className="w-3.5 h-3.5 text-[#5A5650]/40 hidden sm:block absolute -right-2.5 top-1/2 -translate-y-1/2 z-10 bg-[#FAF8F5] rounded-full p-0.5" />
                )}
              </div>

              <div>
                <p className={`font-serif text-3xl font-light ${isBooked ? "text-[#2D4A3E]" : "text-[#161514]"}`}>
                  {count}
                </p>
                <h3 className="font-serif text-base text-[#161514] font-medium leading-snug">
                  {step.label}
                </h3>
              </div>

              <p className="text-[11px] font-sans text-[#5A5650] leading-tight">
                {step.desc}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
