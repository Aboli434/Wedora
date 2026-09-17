"use client";

import React from "react";
import { WeddingEvent } from "@/data/eventsDashboard";
import { EventTableRow, EventCard } from "./EventListItem";
import { EventEmptyState } from "./EventEmptyState";

interface EventListProps {
  events: WeddingEvent[];
  onSelectEvent: (event: WeddingEvent) => void;
  onClearFilters: () => void;
}

export function EventList({
  events,
  onSelectEvent,
  onClearFilters,
}: EventListProps) {
  if (events.length === 0) {
    return <EventEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-4">
      {/* Desktop Editorial Table View */}
      <div className="hidden md:block overflow-x-auto bg-[#FAF8F5] border border-[#161514]/15">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#161514]/15 bg-[#161514]/[0.03]">
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Event Function
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Date & Time
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Venue & City
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Readiness
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Attendance
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <EventTableRow
                key={event.id}
                event={event}
                onSelect={onSelectEvent}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked Card View */}
      <div className="md:hidden space-y-3">
        {events.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onSelect={onSelectEvent}
          />
        ))}
      </div>
    </div>
  );
}
