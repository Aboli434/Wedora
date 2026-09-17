"use client";

import React from "react";
import { WeddingEvent } from "@/data/eventsDashboard";
import { formatEventStatus } from "@/lib/eventsDashboard";
import { Users, Store, ChevronRight } from "lucide-react";

interface UpcomingEventsProps {
  events: WeddingEvent[];
  onSelectEvent: (eventId: string) => void;
}

export function UpcomingEvents({ events, onSelectEvent }: UpcomingEventsProps) {
  const sortedEvents = [...events].sort((a, b) => {
    const dateA = new Date(`${a.date} ${a.startTime}`).getTime();
    const dateB = new Date(`${b.date} ${b.startTime}`).getTime();
    return dateA - dateB;
  });

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          CELEBRATION ITINERARY
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Upcoming Wedding Functions
        </h2>
      </div>

      <div className="space-y-4">
        {sortedEvents.map((event, idx) => {
          const statusInfo = formatEventStatus(event.status);
          const num = (idx + 1).toString().padStart(2, "0");

          return (
            <div
              key={event.id}
              onClick={() => onSelectEvent(event.id)}
              className="p-5 bg-white border border-[#161514]/15 hover:border-[#C5A880] cursor-pointer transition-colors space-y-4 group"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#161514]/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm font-semibold tracking-widest text-[#C5A880] px-2.5 py-1 bg-[#C5A880]/10 border border-[#C5A880]/20">
                    {num}
                  </span>
                  <div>
                    <h3 className="font-serif text-xl text-[#161514] font-medium group-hover:text-[#C5A880] transition-colors">
                      {event.name}
                    </h3>
                    <span className="text-xs font-sans text-[#5A5650]">
                      {event.date} • {event.startTime} — {event.endTime}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`inline-block px-2.5 py-1 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
                  >
                    {statusInfo.label}
                  </span>
                  <ChevronRight className="w-4 h-4 text-[#5A5650] group-hover:text-[#161514] group-hover:translate-x-0.5 transition-all hidden sm:block" />
                </div>
              </div>

              {/* Description & Venue info */}
              <p className="text-xs font-sans text-[#5A5650] leading-relaxed">
                {event.description}
              </p>

              {/* Venue & Counts Pill */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-[#161514]/10 text-xs font-sans text-[#5A5650]">
                <div>
                  <span className="text-[10px] text-[#5A5650]/70 uppercase block">Location</span>
                  <span className="text-[#161514] font-medium">{event.venue}, {event.city}</span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{event.confirmedGuests} / {event.expectedGuests} Guests</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Store className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{event.vendors.length} Vendors</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
