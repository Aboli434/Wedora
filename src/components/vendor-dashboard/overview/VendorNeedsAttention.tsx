"use client";

import React from "react";
import Link from "next/link";
import { VendorActionItem } from "@/data/vendorDashboard";
import { ArrowUpRight } from "lucide-react";

interface VendorNeedsAttentionProps {
  items: VendorActionItem[];
}

export function VendorNeedsAttention({ items }: VendorNeedsAttentionProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Needs attention</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            A few things are worth checking before the next enquiry or booking.
          </p>
        </div>
        <span className="text-[10px] font-mono uppercase tracking-wider text-[#8C857B] bg-[#F2ECE4] px-2.5 py-1 rounded border border-[#E5DEC9] self-start sm:self-auto">
          {items.length} Action Items
        </span>
      </div>

      {items.length === 0 ? (
        <p className="text-sm text-[#8C857B] italic py-4">Everything is up to date.</p>
      ) : (
        <div className="divide-y divide-[#E8E2D9]">
          {items.map((item) => (
            <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded border ${
                      item.priority === "HIGH"
                        ? "bg-amber-50 text-amber-900 border-amber-200"
                        : item.priority === "MEDIUM"
                        ? "bg-stone-100 text-stone-800 border-stone-200"
                        : "bg-neutral-100 text-neutral-700 border-neutral-200"
                    }`}
                  >
                    {item.priority} PRIORITY
                  </span>
                  <h3 className="text-sm font-medium text-[#2C2A29]">{item.title}</h3>
                </div>
                <p className="text-xs text-[#6E6B65]">{item.description}</p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                {item.dueDate && (
                  <span className="text-xs text-[#8C857B] font-mono">{item.dueDate}</span>
                )}
                <Link
                  href="/vendor/dashboard/enquiries"
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors"
                >
                  <span>Review</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
