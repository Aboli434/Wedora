"use client";

import React from "react";
import { VendorCalendarEvent } from "@/data/vendorCalendar";
import {
  groupEventsByDate,
  formatCalendarDate,
  formatCalendarEventType,
} from "@/lib/vendorCalendar";
import { Calendar, MapPin, ArrowUpRight } from "lucide-react";

interface CalendarAgendaViewProps {
  events: VendorCalendarEvent[];
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const CalendarAgendaView: React.FC<CalendarAgendaViewProps> = ({
  events,
  onSelectEvent,
}) => {
  const grouped = groupEventsByDate(events);
  const sortedDates = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  const getEventTypeBadge = (type: string) => {
    switch (type) {
      case "BOOKING":
        return "bg-[#161514] text-[#FAF8F5]";
      case "WEDDING_EVENT":
        return "bg-[#C5A880] text-[#161514] font-medium";
      case "PAYMENT_DUE":
        return "bg-rose-100 text-rose-900 border border-rose-300 font-semibold";
      case "PREPARATION":
        return "bg-amber-100 text-amber-900 border border-amber-300";
      case "REMINDER":
        return "bg-blue-50 text-blue-900 border border-blue-200";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (sortedDates.length === 0) {
    return (
      <div className="p-8 border border-dashed border-[#161514]/20 bg-[#FAF8F5] text-center text-xs text-[#5A5650] my-6">
        No events match your agenda criteria.
      </div>
    );
  }

  return (
    <div className="space-y-6 mb-8">
      {sortedDates.map((dateStr) => {
        const dateEvents = grouped[dateStr];

        return (
          <div key={dateStr} className="bg-[#FAF8F5] border border-[#161514]/15 p-5">
            <div className="flex items-center gap-2 pb-3 mb-4 border-b border-[#161514]/10">
              <Calendar className="w-4 h-4 text-[#C5A880]" />
              <h3 className="font-serif text-lg font-medium text-[#161514]">
                {formatCalendarDate(dateStr)}
              </h3>
              <span className="text-xs text-[#5A5650] ml-auto">
                {dateEvents.length} item{dateEvents.length > 1 ? "s" : ""}
              </span>
            </div>

            <div className="space-y-3">
              {dateEvents.map((evt) => (
                <div
                  key={evt.id}
                  onClick={() => onSelectEvent(evt)}
                  className="group p-4 bg-white border border-[#161514]/10 hover:border-[#161514]/30 cursor-pointer transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 ${getEventTypeBadge(
                          evt.type
                        )}`}
                      >
                        {formatCalendarEventType(evt.type)}
                      </span>
                      <span className="text-xs text-[#5A5650]">
                        {evt.startTime ? `${evt.startTime} - ${evt.endTime}` : "All Day"}
                      </span>
                      {evt.bookingReference && (
                        <span className="text-[10px] font-mono text-[#5A5650] uppercase">
                          {evt.bookingReference}
                        </span>
                      )}
                    </div>

                    <h4 className="font-serif text-lg font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors">
                      {evt.title}
                    </h4>

                    {(evt.venue || evt.location || evt.description) && (
                      <div className="text-xs text-[#5A5650] flex items-center gap-1 mt-1">
                        <MapPin className="w-3.5 h-3.5 text-[#5A5650]/60 shrink-0" />
                        <span>
                          {evt.venue || evt.location || evt.description}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#161514]/10">
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] border px-2 py-0.5 border-[#161514]/15">
                      {evt.priority}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEvent(evt);
                      }}
                      className="inline-flex items-center gap-1 text-xs text-[#161514] font-medium group-hover:text-[#C5A880] transition-colors"
                    >
                      <span>View</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
