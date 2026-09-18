"use client";

import React from "react";
import { VendorServicesSummary } from "@/data/vendorServices";
import { formatIndianCurrency } from "@/lib/vendorServices";

interface ServicesOverviewProps {
  summary: VendorServicesSummary;
}

export function ServicesOverview({ summary }: ServicesOverviewProps) {
  const formattedStarting = summary.startingPrice
    ? formatIndianCurrency(summary.startingPrice)
    : "Custom Quote";

  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-4">
        <h2 className="text-xs uppercase tracking-[0.2em] font-sans font-semibold text-[#8C857B]">
          Services Overview
        </h2>
        <span className="text-[10px] font-mono text-[#8C857B] bg-[#F2ECE4] px-2.5 py-0.5 rounded border border-[#E5DEC9]">
          ILLUSTRATIVE DEMO PRICING
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.totalServices).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            TOTAL SERVICES
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Configured offerings</span>
        </div>

        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.publicServices).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            PUBLIC LISTED
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Visible on directory</span>
        </div>

        <div className="space-y-1">
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2C2A29]">
            {String(summary.availableServices).padStart(2, "0")}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            AVAILABLE
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Open for enquiries</span>
        </div>

        <div className="space-y-1">
          <p className="font-serif text-2xl sm:text-3xl font-light text-[#2C2A29]">
            {formattedStarting}
          </p>
          <span className="text-[10px] font-sans uppercase tracking-widest text-[#8C857B] font-medium block">
            STARTING FROM
          </span>
          <span className="text-[11px] text-[#6E6B65] block">Base package rate</span>
        </div>
      </div>
    </section>
  );
}
