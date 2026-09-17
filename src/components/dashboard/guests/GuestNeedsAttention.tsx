"use client";

import React from "react";
import { NeedsAttentionItem } from "@/lib/guests";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface GuestNeedsAttentionProps {
  items: NeedsAttentionItem[];
  onSelectGuest: (guestId: string) => void;
}

export function GuestNeedsAttention({
  items,
  onSelectGuest,
}: GuestNeedsAttentionProps) {
  if (items.length === 0) {
    return (
      <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-3">
        <div className="flex items-center gap-3 text-[#2D4A3E]">
          <CheckCircle2 className="w-5 h-5 text-[#2D4A3E]" />
          <h3 className="font-serif text-lg text-[#161514]">All Guest Details Up to Date</h3>
        </div>
        <p className="text-xs font-sans text-[#5A5650] leading-relaxed">
          Every guest currently has their RSVP status, meal preferences, plus-one details, and event attendance recorded.
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
            A few details still need a response or a final check.
          </p>
        </div>
      </div>

      <div className="divide-y divide-[#161514]/10">
        {items.map((item) => (
          <div
            key={item.id}
            className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#161514]/[0.02] px-2 transition-colors"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-serif text-base text-[#161514] font-medium">
                  {item.guestName}
                </span>
                <span className="text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border border-[#161514]/15 text-[#5A5650]">
                  {item.status}
                </span>
              </div>
              <p className="text-xs font-sans text-[#5A5650]">
                {item.reason}
              </p>
            </div>

            <button
              onClick={() => onSelectGuest(item.guestId)}
              className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#161514] hover:text-[#C5A880] font-medium transition-colors focus:outline-none focus:underline self-start sm:self-center"
            >
              <span>View guest</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
