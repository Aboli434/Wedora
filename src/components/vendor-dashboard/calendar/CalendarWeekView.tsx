"use client";

import React from "react";
import {
  VendorCalendarEvent,
  VendorAvailabilityBlock,
} from "@/data/vendorCalendar";
import {
  getEventsForDate,
  isDateBlocked,
  getAvailabilityForDate,
  formatCalendarEventType,
} from "@/lib/vendorCalendar";
import { FIXED_TODAY_DATE } from "@/lib/vendorCalendar";
import { ArrowUpRight } from "lucide-react";

interface CalendarWeekViewProps {
  currentDate: Date;
  events: VendorCalendarEvent[];
  blocks: VendorAvailabilityBlock[];
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const CalendarWeekView: React.FC<CalendarWeekViewProps> = ({
  currentDate,
  events,
  blocks,
  onSelectEvent,
}) => {
  // Get Monday of current week
  const curr = new Date(currentDate);
  const dayOfWeek = curr.getDay() === 0 ? 6 : curr.getDay() - 1; // Monday = 0
  const monday = new Date(curr);
  monday.setDate(curr.getDate() - dayOfWeek);

  const weekDays: { dateStr: string; dayName: string; formattedDate: string }[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const dayName = d.toLocaleDateString("en-IN", { weekday: "short" });
    const formattedDate = d.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
    });

    weekDays.push({ dateStr, dayName, formattedDate });
  }

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

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-4 md:p-6 mb-8">
      <div className="mb-4 pb-2 border-b border-[#161514]/10">
        <h3 className="font-serif text-lg font-medium text-[#161514]">
          Week Overview ({weekDays[0].formattedDate} - {weekDays[6].formattedDate})
        </h3>
      </div>

      {/* Desktop 7-Column Stacked Days Grid */}
      <div className="hidden lg:grid grid-cols-7 gap-3">
        {weekDays.map(({ dateStr, dayName, formattedDate }) => {
          const isToday = dateStr === FIXED_TODAY_DATE;
          const dayEvents = getEventsForDate(events, dateStr);
          const isBlocked = isDateBlocked(blocks, dateStr);
          const blockObj = isBlocked ? getAvailabilityForDate(blocks, dateStr) : undefined;

          return (
            <div
              key={dateStr}
              className={`p-3 border transition-colors flex flex-col justify-between ${
                isToday ? "bg-white border-[#C5A880] ring-1 ring-[#C5A880]" : "bg-white border-[#161514]/15"
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#161514]/10">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650]">
                    {dayName}
                  </span>
                  <span className={`text-xs font-serif font-medium ${isToday ? "text-[#C5A880]" : "text-[#161514]"}`}>
                    {formattedDate}
                  </span>
                </div>

                {isBlocked && (
                  <div className="mb-2 p-1.5 bg-rose-50 text-rose-900 border border-rose-200 text-[10px] font-semibold">
                    Blocked: {blockObj?.reason || "Unavailable"}
                  </div>
                )}

                <div className="space-y-2">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className={`p-2 cursor-pointer transition-opacity hover:opacity-90 text-[11px] ${getEventTypeBadge(
                        evt.type
                      )}`}
                    >
                      <div className="font-semibold truncate">{evt.title}</div>
                      <div className="text-[10px] opacity-80 mt-0.5">
                        {evt.startTime ? `${evt.startTime} - ${evt.endTime}` : "All day"}
                      </div>
                    </div>
                  ))}

                  {dayEvents.length === 0 && !isBlocked && (
                    <div className="text-[10px] text-[#5A5650]/60 italic py-4 text-center">
                      No events
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Mobile Stacked Day-by-Day Agenda */}
      <div className="lg:hidden space-y-4">
        {weekDays.map(({ dateStr, dayName, formattedDate }) => {
          const isToday = dateStr === FIXED_TODAY_DATE;
          const dayEvents = getEventsForDate(events, dateStr);
          const isBlocked = isDateBlocked(blocks, dateStr);

          return (
            <div
              key={dateStr}
              className={`p-4 border bg-white ${
                isToday ? "border-[#C5A880] ring-1 ring-[#C5A880]" : "border-[#161514]/15"
              }`}
            >
              <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#161514]/10">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#C5A880]">
                    {dayName}
                  </span>
                  <span className="text-sm font-serif font-medium text-[#161514]">
                    {formattedDate}
                  </span>
                  {isToday && (
                    <span className="text-[9px] font-semibold uppercase px-2 py-0.5 bg-[#161514] text-[#FAF8F5]">
                      Today
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#5A5650]">
                  {dayEvents.length} items
                </span>
              </div>

              {isBlocked && (
                <div className="mb-2 p-2 bg-rose-50 border border-rose-200 text-rose-900 text-xs">
                  Blocked date period
                </div>
              )}

              {dayEvents.length === 0 ? (
                <div className="text-xs text-[#5A5650] italic py-1">Clear day schedule</div>
              ) : (
                <div className="space-y-2">
                  {dayEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => onSelectEvent(evt)}
                      className="p-3 bg-[#FAF8F5] border border-[#161514]/10 cursor-pointer flex items-center justify-between gap-3"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className={`text-[9px] font-semibold uppercase tracking-wider px-1.5 py-0.5 ${getEventTypeBadge(
                              evt.type
                            )}`}
                          >
                            {formatCalendarEventType(evt.type)}
                          </span>
                          <span className="text-xs text-[#5A5650]">
                            {evt.startTime ? `${evt.startTime} - ${evt.endTime}` : "All Day"}
                          </span>
                        </div>
                        <div className="font-serif text-sm font-medium text-[#161514]">
                          {evt.title}
                        </div>
                      </div>
                      <ArrowUpRight className="w-4 h-4 text-[#C5A880] shrink-0" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
