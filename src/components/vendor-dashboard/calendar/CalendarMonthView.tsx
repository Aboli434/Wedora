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
  formatCalendarDate,
  formatCalendarEventType,
} from "@/lib/vendorCalendar";
import { FIXED_TODAY_DATE } from "@/lib/vendorCalendar";
import { ArrowUpRight } from "lucide-react";

interface CalendarMonthViewProps {
  currentDate: Date;
  selectedDateStr: string;
  onSelectDate: (dateStr: string) => void;
  events: VendorCalendarEvent[];
  blocks: VendorAvailabilityBlock[];
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const CalendarMonthView: React.FC<CalendarMonthViewProps> = ({
  currentDate,
  selectedDateStr,
  onSelectDate,
  events,
  blocks,
  onSelectEvent,
}) => {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Calculate 7-column grid (Monday-first)
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Monday = 0, Sunday = 6
  let startingDayOfWeek = firstDayOfMonth.getDay() - 1;
  if (startingDayOfWeek === -1) startingDayOfWeek = 6;

  const totalDaysInMonth = lastDayOfMonth.getDate();

  // Grid cells generation
  const days: { dateStr: string; isCurrentMonth: boolean; dayNumber: number }[] = [];

  // Trailing days from previous month
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startingDayOfWeek - 1; i >= 0; i--) {
    const prevDay = prevMonthLastDay - i;
    const prevDate = new Date(year, month - 1, prevDay);
    const dateStr = prevDate.toISOString().split("T")[0];
    days.push({ dateStr, isCurrentMonth: false, dayNumber: prevDay });
  }

  // Days of current month
  for (let day = 1; day <= totalDaysInMonth; day++) {
    const d = new Date(year, month, day);
    // Format YYYY-MM-DD manually to avoid timezone shift
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;
    days.push({ dateStr, isCurrentMonth: true, dayNumber: day });
  }

  // Trailing days for next month to complete 35 or 42 grid cells
  const remainingCells = (7 - (days.length % 7)) % 7;
  for (let day = 1; day <= remainingCells; day++) {
    const nextDate = new Date(year, month + 1, day);
    const dateStr = nextDate.toISOString().split("T")[0];
    days.push({ dateStr, isCurrentMonth: false, dayNumber: day });
  }

  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  // Selected Date Events for Day Drawer
  const selectedDayEvents = getEventsForDate(events, selectedDateStr);
  const selectedDayBlock = getAvailabilityForDate(blocks, selectedDateStr);

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
      case "BLOCKED":
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Month Calendar Grid */}
      <div className="bg-[#FAF8F5] border border-[#161514]/15 overflow-hidden">
        {/* Weekday Header */}
        <div className="grid grid-cols-7 border-b border-[#161514]/15 bg-[#161514]/[0.03]">
          {weekdays.map((w, idx) => (
            <div
              key={w}
              className={`py-2.5 px-2 text-center text-[10px] font-semibold uppercase tracking-[0.15em] ${
                idx >= 5 ? "text-[#C5A880]" : "text-[#5A5650]"
              }`}
            >
              {w}
            </div>
          ))}
        </div>

        {/* Month Days Grid */}
        <div className="grid grid-cols-7 divide-x divide-y divide-[#161514]/10">
          {days.map(({ dateStr, isCurrentMonth, dayNumber }) => {
            const isToday = dateStr === FIXED_TODAY_DATE;
            const isSelected = dateStr === selectedDateStr;
            const dayEvents = getEventsForDate(events, dateStr);
            const isBlocked = isDateBlocked(blocks, dateStr);
            const blockObj = isBlocked ? getAvailabilityForDate(blocks, dateStr) : undefined;

            return (
              <div
                key={dateStr}
                onClick={() => onSelectDate(dateStr)}
                className={`min-h-[100px] sm:min-h-[120px] p-1.5 sm:p-2 cursor-pointer transition-all flex flex-col justify-between group ${
                  !isCurrentMonth ? "bg-gray-50/60 opacity-40" : "bg-white"
                } ${isSelected ? "ring-2 ring-inset ring-[#C5A880]" : ""} ${
                  isBlocked ? "bg-rose-50/30" : ""
                }`}
              >
                <div>
                  {/* Date Number Header */}
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-xs font-serif font-medium w-6 h-6 flex items-center justify-center rounded-full ${
                        isToday
                          ? "bg-[#161514] text-[#FAF8F5]"
                          : isSelected
                          ? "bg-[#C5A880] text-[#161514]"
                          : "text-[#161514]"
                      }`}
                    >
                      {dayNumber}
                    </span>

                    {isBlocked && (
                      <span
                        className="text-[9px] font-semibold uppercase tracking-wider text-rose-800 bg-rose-100 px-1 py-0.5"
                        title={blockObj?.title || "Blocked Date"}
                      >
                        Blocked
                      </span>
                    )}
                  </div>

                  {/* Day Events Chips */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 2).map((evt) => (
                      <button
                        key={evt.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEvent(evt);
                        }}
                        className={`w-full text-left px-1.5 py-0.5 text-[10px] truncate leading-tight transition-opacity hover:opacity-80 block ${getEventTypeBadge(
                          evt.type
                        )}`}
                      >
                        {evt.coupleName ? `${evt.coupleName}: ` : ""}
                        {evt.title}
                      </button>
                    ))}

                    {dayEvents.length > 2 && (
                      <span className="text-[10px] font-semibold text-[#5A5650] block pt-0.5">
                        +{dayEvents.length - 2} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Bottom Day Indicator */}
                {dayEvents.length > 0 && (
                  <div className="w-1.5 h-1.5 rounded-full bg-[#C5A880] self-end mt-1" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Selected Day Agenda Drawer Below Grid */}
      <div className="bg-white border border-[#161514]/10 p-5">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-0.5">
              SELECTED DAY AGENDA
            </span>
            <h3 className="font-serif text-xl font-medium text-[#161514]">
              {formatCalendarDate(selectedDateStr)}
            </h3>
          </div>
          <span className="text-xs text-[#5A5650]">
            {selectedDayEvents.length} items scheduled
          </span>
        </div>

        {selectedDayBlock && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-900 text-xs">
            <strong>Blocked Date:</strong> {selectedDayBlock.title} ({selectedDayBlock.reason}).{" "}
            {selectedDayBlock.notes}
          </div>
        )}

        {selectedDayEvents.length === 0 ? (
          <p className="text-xs text-[#5A5650] italic py-3">
            No events or reminders scheduled for this date.
          </p>
        ) : (
          <div className="space-y-3">
            {selectedDayEvents.map((evt) => (
              <div
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="group p-4 bg-[#FAF8F5] border border-[#161514]/10 hover:border-[#161514]/30 cursor-pointer transition-all flex items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 ${getEventTypeBadge(
                        evt.type
                      )}`}
                    >
                      {formatCalendarEventType(evt.type)}
                    </span>
                    <span className="text-xs text-[#5A5650]">
                      {evt.startTime ? `${evt.startTime} - ${evt.endTime || ""}` : "All Day"}
                    </span>
                  </div>
                  <h4 className="font-serif text-base font-medium text-[#161514] group-hover:text-[#C5A880] transition-colors">
                    {evt.title}
                  </h4>
                  <p className="text-xs text-[#5A5650] mt-0.5">
                    {evt.venue || evt.location || evt.description || "Operational item"}
                  </p>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEvent(evt);
                  }}
                  className="p-1.5 text-[#161514] hover:text-[#C5A880] transition-colors shrink-0"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
