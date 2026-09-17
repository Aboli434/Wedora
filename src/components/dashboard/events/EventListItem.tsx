"use client";

import React from "react";
import { WeddingEvent } from "@/data/eventsDashboard";
import {
  formatEventStatus,
  formatEventType,
  calculateEventReadiness,
} from "@/lib/eventsDashboard";
import { ChevronRight } from "lucide-react";

interface EventListItemProps {
  event: WeddingEvent;
  onSelect: (event: WeddingEvent) => void;
}

export function EventTableRow({ event, onSelect }: EventListItemProps) {
  const statusInfo = formatEventStatus(event.status);
  const readiness = calculateEventReadiness(event);

  return (
    <tr
      onClick={() => onSelect(event)}
      className="border-b border-[#161514]/10 hover:bg-[#161514]/[0.02] cursor-pointer transition-colors group"
    >
      {/* Event Name & Type */}
      <td className="py-4 px-4 align-middle">
        <div className="space-y-0.5">
          <span className="font-serif text-base text-[#161514] font-medium block group-hover:text-[#C5A880] transition-colors">
            {event.name}
          </span>
          <span className="text-xs font-sans text-[#5A5650] block">
            {formatEventType(event.type)}
          </span>
        </div>
      </td>

      {/* Date & Time */}
      <td className="py-4 px-4 align-middle">
        <div className="space-y-0.5 text-xs font-sans text-[#5A5650]">
          <span className="text-[#161514] font-medium block">{event.date}</span>
          <span>{event.startTime} — {event.endTime}</span>
        </div>
      </td>

      {/* Venue */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650]">
        <span className="text-[#161514] font-medium block">{event.venue}</span>
        <span>{event.city}</span>
      </td>

      {/* Status */}
      <td className="py-4 px-4 align-middle">
        <span
          className={`inline-block px-2.5 py-1 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
        >
          {statusInfo.label}
        </span>
      </td>

      {/* Readiness */}
      <td className="py-4 px-4 align-middle">
        <div className="space-y-1 w-28">
          <div className="flex justify-between text-[10px] font-sans text-[#5A5650]">
            <span>Readiness</span>
            <span className="font-medium text-[#161514]">{readiness}%</span>
          </div>
          <div
            className="w-full h-1.5 bg-[#161514]/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={readiness}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`${event.name} readiness: ${readiness} percent.`}
          >
            <div
              className="h-full bg-[#C5A880] transition-all duration-500"
              style={{ width: `${readiness}%` }}
            />
          </div>
        </div>
      </td>

      {/* Guests & Vendors */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650]">
        <div className="space-y-0.5">
          <span>{event.confirmedGuests} / {event.expectedGuests} Guests</span>
          <span className="text-[11px] block">{event.vendors.length} Vendors</span>
        </div>
      </td>

      {/* Arrow Action */}
      <td className="py-4 px-4 align-middle text-right">
        <ChevronRight className="w-4 h-4 text-[#5A5650] group-hover:text-[#161514] group-hover:translate-x-0.5 transition-all inline-block" />
      </td>
    </tr>
  );
}

export function EventCard({ event, onSelect }: EventListItemProps) {
  const statusInfo = formatEventStatus(event.status);
  const readiness = calculateEventReadiness(event);

  return (
    <div
      onClick={() => onSelect(event)}
      className="bg-white border border-[#161514]/15 p-4 space-y-3 cursor-pointer hover:border-[#C5A880] transition-colors"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#161514]/10 pb-2.5">
        <div>
          <h3 className="font-serif text-lg text-[#161514] font-medium">
            {event.name}
          </h3>
          <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650]">
            {event.date} • {event.startTime}
          </span>
        </div>

        <span
          className={`inline-block px-2.5 py-1 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
        >
          {statusInfo.label}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2 text-xs font-sans text-[#5A5650]">
        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#5A5650]/70">
            Venue
          </span>
          <span className="text-[#161514] font-medium">
            {event.venue}, {event.city}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#5A5650]/70">
            Readiness
          </span>
          <span className="text-[#161514] font-medium">
            {readiness}% Prepared
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#161514]/10 text-xs font-sans text-[#5A5650]">
        <span>{event.confirmedGuests} Confirmed Guests</span>
        <span className="inline-flex items-center gap-1 text-[#161514] font-medium uppercase tracking-wider text-[11px]">
          Event Details
          <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
        </span>
      </div>
    </div>
  );
}

export const EventListItem = EventTableRow;
