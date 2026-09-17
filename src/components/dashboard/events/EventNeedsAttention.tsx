"use client";

import React from "react";
import { EventActionItem } from "@/data/eventsDashboard";
import { formatEventStatus } from "@/lib/eventsDashboard";
import { AlertCircle, CheckCircle2, ChevronRight } from "lucide-react";

interface EventNeedsAttentionProps {
  items: EventActionItem[];
  onSelectEvent: (eventId: string) => void;
}

export function EventNeedsAttention({
  items,
  onSelectEvent,
}: EventNeedsAttentionProps) {
  if (items.length === 0) {
    return (
      <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 space-y-3">
        <div className="flex items-center gap-3 text-[#2D4A3E]">
          <CheckCircle2 className="w-5 h-5 text-[#2D4A3E]" />
          <h3 className="font-serif text-lg text-[#161514]">Your event plans are on track</h3>
        </div>
        <p className="text-xs font-sans text-[#5A5650] leading-relaxed">
          Every celebration function currently has all vendor confirmations, task schedules, and preparations on schedule.
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
            A few details still need a final check before each celebration is ready.
          </p>
        </div>
      </div>

      <div className="divide-y divide-[#161514]/10">
        {items.map((item) => {
          const statusInfo = formatEventStatus(item.status);
          return (
            <div
              key={item.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group hover:bg-[#161514]/[0.02] px-2 transition-colors"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-serif text-base text-[#161514] font-medium">
                    {item.eventName}
                  </span>
                  <span
                    className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                  <span className="text-xs font-sans text-[#5A5650]">
                    Date: {item.date}
                  </span>
                </div>
                <p className="text-xs font-sans text-[#5A5650]">
                  {item.issue}
                </p>
              </div>

              <button
                onClick={() => onSelectEvent(item.eventId)}
                className="inline-flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider text-[#161514] hover:text-[#C5A880] font-medium transition-colors focus:outline-none focus:underline self-start sm:self-center"
              >
                <span>View event</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
