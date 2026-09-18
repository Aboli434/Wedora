"use client";

import React from "react";
import { VendorCalendarEvent } from "@/data/vendorCalendar";
import {
  formatCalendarDate,
  formatCalendarEventType,
} from "@/lib/vendorCalendar";
import { Calendar, Clock, MapPin, ArrowUpRight } from "lucide-react";

interface UpcomingCalendarEventsProps {
  upcomingEvents: VendorCalendarEvent[];
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const UpcomingCalendarEvents: React.FC<UpcomingCalendarEventsProps> = ({
  upcomingEvents,
  onSelectEvent,
}) => {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Chronological Schedule Preview
          </h2>
        </div>
        <span className="text-xs uppercase tracking-widest text-[#5A5650]">
          NEXT 8 ITEMS
        </span>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="p-6 border border-dashed border-[#161514]/15 bg-[#FAF8F5] text-center text-xs text-[#5A5650]">
          No upcoming events recorded on calendar.
        </div>
      ) : (
        <div className="space-y-3">
          {upcomingEvents.map((evt) => (
            <div
              key={evt.id}
              onClick={() => onSelectEvent(evt)}
              className="group p-4 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 cursor-pointer transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 bg-[#161514] text-[#FAF8F5]">
                    {formatCalendarEventType(evt.type)}
                  </span>
                  <span className="text-xs font-serif font-medium text-[#C5A880]">
                    {formatCalendarDate(evt.startDate)}
                  </span>
                </div>

                <h3 className="font-serif text-lg font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors mb-1">
                  {evt.title}
                </h3>

                <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-[#5A5650]">
                  {evt.startTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
                      <span>{evt.startTime} - {evt.endTime}</span>
                    </div>
                  )}
                  {(evt.venue || evt.location) && (
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
                      <span>{evt.venue || evt.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between md:justify-end gap-3 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#161514]/10">
                <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 border border-[#161514]/15 text-[#5A5650]">
                  {evt.priority}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(evt);
                  }}
                  className="p-1.5 text-[#161514] hover:text-[#C5A880] transition-colors"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
