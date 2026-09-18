"use client";

import React from "react";
import {
  VendorCalendarEvent,
  VendorAvailabilityBlock,
} from "@/data/vendorCalendar";
import {
  formatCalendarDate,
  formatCalendarEventType,
  isDateBlocked,
} from "@/lib/vendorCalendar";
import { AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";

interface CalendarNeedsAttentionProps {
  eventsNeedingAttention: VendorCalendarEvent[];
  blocks: VendorAvailabilityBlock[];
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const CalendarNeedsAttention: React.FC<CalendarNeedsAttentionProps> = ({
  eventsNeedingAttention,
  blocks,
  onSelectEvent,
}) => {
  const count = eventsNeedingAttention.length;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Action & Deadline Items
          </h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-[#5A5650]">
          {count > 0 ? `${count} ACTIONABLE` : "ALL CAUGHT UP"}
        </span>
      </div>

      {count === 0 ? (
        <div className="p-8 border border-dashed border-[#161514]/15 text-center bg-[#FAF8F5]/50">
          <CheckCircle2 className="w-8 h-8 text-[#C5A880] mx-auto mb-2 opacity-80" />
          <h3 className="font-serif text-base text-[#161514] font-medium mb-1">
            You&apos;re all caught up.
          </h3>
          <p className="text-xs text-[#5A5650]">
            No imminent preparation deadlines, payment milestones, or schedule conflicts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {eventsNeedingAttention.map((event) => {
            const isBlockedConflict = isDateBlocked(blocks, event.startDate);
            const isPayment = event.type === "PAYMENT_DUE";
            const isPrep = event.type === "PREPARATION";

            let urgencyLabel = "Attention Required";
            let urgencyBg = "bg-[#161514]/5 text-[#161514]";

            if (isBlockedConflict) {
              urgencyLabel = "Blocked Date Overlap Conflict";
              urgencyBg = "bg-rose-50 text-rose-800 border border-rose-200";
            } else if (isPayment) {
              urgencyLabel = "Payment Milestone Date";
              urgencyBg = "bg-amber-50 text-amber-800 border border-amber-200";
            } else if (isPrep) {
              urgencyLabel = "Imminent Preparation Task";
              urgencyBg = "bg-[#C5A880]/15 text-[#161514] border border-[#C5A880]/30";
            }

            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event)}
                className="group relative p-5 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 gap-2">
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 ${urgencyBg}`}
                    >
                      {urgencyLabel}
                    </span>
                    <span className="text-[11px] font-medium text-[#5A5650] uppercase tracking-wider">
                      {formatCalendarEventType(event.type)}
                    </span>
                  </div>

                  <h3 className="font-serif text-lg font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors mb-1">
                    {event.title}
                  </h3>

                  <p className="text-xs text-[#5A5650] mb-3 line-clamp-1">
                    {event.venue || event.location || event.description || "Operational task"}
                  </p>

                  <div className="text-xs text-[#5A5650]/80">
                    Target Date: <strong>{formatCalendarDate(event.startDate)}</strong>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#161514]/10 flex items-center justify-between text-xs font-medium text-[#161514] group-hover:translate-x-0.5 transition-transform">
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
