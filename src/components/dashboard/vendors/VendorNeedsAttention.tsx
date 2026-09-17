"use client";

import React from "react";
import { VendorActionItem } from "@/data/vendorsDashboard";
import { formatVendorCategory, formatVendorStatus } from "@/lib/vendorsDashboard";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface VendorNeedsAttentionProps {
  items: VendorActionItem[];
  onSelectVendor: (vendorId: string) => void;
}

export function VendorNeedsAttention({
  items,
  onSelectVendor,
}: VendorNeedsAttentionProps) {
  if (items.length === 0) {
    return (
      <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-3">
        <div className="flex items-center gap-3 text-[#2D4A3E]">
          <CheckCircle2 className="w-5 h-5 text-[#2D4A3E]" />
          <h3 className="font-serif text-lg text-[#161514]">Your vendor list is up to date</h3>
        </div>
        <p className="text-xs font-sans text-[#5A5650] leading-relaxed">
          All vendor enquiries, contract negotiations, and payment instalments are currently on track.
        </p>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="flex items-start justify-between gap-4 border-b border-[#161514]/10 pb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#C5A880]" />
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              ACTION REQUIRED
            </span>
          </div>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            Needs Attention ({items.length})
          </h2>
          <p className="text-xs font-sans text-[#5A5650]">
            A few vendor decisions and follow-ups are still waiting on you.
          </p>
        </div>
      </div>

      <div className="divide-y divide-[#161514]/10">
        {items.map((item) => {
          const statusInfo = formatVendorStatus(item.status);
          return (
            <div
              key={item.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#161514]/[0.02] px-2 transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-base text-[#161514] font-medium">
                    {item.vendorName}
                  </span>
                  <span className="text-[10px] font-sans uppercase tracking-wider text-[#5A5650] bg-[#161514]/5 px-2 py-0.5 border border-[#161514]/10">
                    {formatVendorCategory(item.category)}
                  </span>
                  <span
                    className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#5A5650]">
                  {item.reason}
                </p>
                {item.nextAction && (
                  <span className="text-[11px] font-sans text-[#8C6D3B] font-medium block">
                    Next step: {item.nextAction}
                  </span>
                )}
              </div>

              <button
                onClick={() => onSelectVendor(item.vendorId)}
                className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#161514] hover:text-[#C5A880] font-medium transition-colors focus:outline-none focus:underline self-start sm:self-center"
              >
                <span>View vendor</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
