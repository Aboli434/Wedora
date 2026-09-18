"use client";

import React from "react";
import { CalendarConflict } from "@/lib/vendorCalendar";
import { VendorCalendarEvent } from "@/data/vendorCalendar";
import { AlertTriangle, ArrowRight } from "lucide-react";

interface CalendarConflictsProps {
  conflicts: CalendarConflict[];
  events: VendorCalendarEvent[];
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const CalendarConflicts: React.FC<CalendarConflictsProps> = ({
  conflicts,
  events,
  onSelectEvent,
}) => {
  if (conflicts.length === 0) return null;

  return (
    <section className="mb-8 p-4 bg-rose-50 border border-rose-200 text-rose-950">
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-rose-200">
        <AlertTriangle className="w-4 h-4 text-rose-700 shrink-0" />
        <h3 className="font-serif text-base font-medium text-rose-950">
          Schedule Conflicts Detected ({conflicts.length})
        </h3>
      </div>

      <div className="space-y-3 text-xs">
        {conflicts.map((cnf) => {
          const firstEvt = events.find((e) => cnf.eventIds.includes(e.id));

          return (
            <div
              key={cnf.id}
              className="p-3 bg-white border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-rose-800 block mb-0.5">
                  {cnf.title}
                </span>
                <p className="text-rose-900 leading-relaxed">{cnf.description}</p>
              </div>

              {firstEvt && (
                <button
                  onClick={() => onSelectEvent(firstEvt)}
                  className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 bg-rose-900 text-white text-[11px] font-medium uppercase tracking-wider hover:bg-rose-950 transition-colors"
                >
                  <span>Resolve Event</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};
