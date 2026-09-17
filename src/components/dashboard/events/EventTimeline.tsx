"use client";

import React from "react";
import { WeddingEvent } from "@/data/eventsDashboard";
import { formatEventStatus } from "@/lib/eventsDashboard";
import { Clock, MapPin, ChevronRight } from "lucide-react";

interface EventTimelineProps {
  events: WeddingEvent[];
  onSelectEvent: (eventId: string) => void;
}

export function EventTimeline({ events, onSelectEvent }: EventTimelineProps) {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`).getTime();
    const dateB = new Date(`${b.date} ${b.startTime}`).getTime();
    return dateA - dateB;
  });

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          WEDDING SCHEDULE
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Chronological Event Timeline
        </h2>
      </div>

      {/* Desktop Horizontal / Mobile Vertical Timeline */}
      <div className="relative">
        {/* Horizontal Connector Line for Desktop */}
        <div className="hidden lg:block absolute top-12 left-8 right-8 h-0.5 bg-[#161514]/15 -z-0" />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 relative z-10">
          {sortedEvents.map((event, idx) => {
            const statusInfo = formatEventStatus(event.status);
            const num = (idx + 1).toString().padStart(2, "0");

            return (
              <div
                key={event.id}
                onClick={() => onSelectEvent(event.id)}
                className="bg-white border border-[#161514]/15 p-5 space-y-4 hover:border-[#C5A880] cursor-pointer transition-colors group relative"
              >
                {/* Number & Date Row */}
                <div className="flex items-center justify-between border-b border-[#161514]/10 pb-3">
                  <span className="font-mono text-xs font-semibold tracking-widest text-[#C5A880]">
                    {num}
                  </span>
                  <span
                    className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 border ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                </div>

                {/* Event Name & Info */}
                <div className="space-y-1.5">
                  <h3 className="font-serif text-lg text-[#161514] font-medium leading-snug group-hover:text-[#C5A880] transition-colors">
                    {event.name}
                  </h3>
                  <div className="space-y-1 text-xs font-sans text-[#5A5650]">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{event.date} • {event.startTime}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                      <span>{event.venue}, {event.city}</span>
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-2 border-t border-[#161514]/10 flex items-center justify-between text-xs font-sans">
                  <span className="text-[#5A5650]">
                    {event.confirmedGuests} Confirmed
                  </span>
                  <span className="inline-flex items-center gap-1 text-[#161514] font-medium uppercase tracking-wider text-[10px] group-hover:text-[#C5A880]">
                    Details
                    <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
