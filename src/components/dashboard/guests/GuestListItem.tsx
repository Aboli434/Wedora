"use client";

import React from "react";
import { Guest } from "@/data/guests";
import { formatGuestStatus, formatMealPreference } from "@/lib/guests";
import { ChevronRight, Calendar } from "lucide-react";

interface GuestListItemProps {
  guest: Guest;
  onSelect: (guest: Guest) => void;
}

export function GuestTableRow({ guest, onSelect }: GuestListItemProps) {
  const statusInfo = formatGuestStatus(guest.status);

  const attendingEventsCount = Object.values(guest.events).filter(
    (val) => val === "YES"
  ).length;

  return (
    <tr
      onClick={() => onSelect(guest)}
      className="border-b border-[#161514]/10 hover:bg-[#161514]/[0.02] cursor-pointer transition-colors group"
    >
      {/* Guest Name & Contact */}
      <td className="py-4 px-4 align-middle">
        <div className="space-y-0.5">
          <span className="font-serif text-base text-[#161514] font-medium block group-hover:text-[#C5A880] transition-colors">
            {guest.name}
          </span>
          {guest.email && (
            <span className="text-xs font-sans text-[#5A5650] block">
              {guest.email}
            </span>
          )}
        </div>
      </td>

      {/* Group */}
      <td className="py-4 px-4 align-middle">
        <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650]">
          {guest.group}
        </span>
      </td>

      {/* RSVP Status */}
      <td className="py-4 px-4 align-middle">
        <span
          className={`inline-block px-2.5 py-1 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
        >
          {statusInfo.label}
        </span>
      </td>

      {/* Plus-One */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650]">
        {guest.plusOne ? (
          <div>
            <span className="text-[#161514] font-medium block">
              +1 {guest.plusOneName || "(Name missing)"}
            </span>
          </div>
        ) : (
          <span className="text-[#5A5650]/60">Solo</span>
        )}
      </td>

      {/* Meal Preference */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650]">
        {formatMealPreference(guest.mealPreference)}
      </td>

      {/* Event Attendance Summary */}
      <td className="py-4 px-4 align-middle text-xs font-sans text-[#5A5650]">
        <span className="inline-flex items-center gap-1 bg-[#161514]/5 px-2 py-0.5 text-[11px]">
          <Calendar className="w-3 h-3 text-[#C5A880]" />
          {attendingEventsCount} of 4 events
        </span>
      </td>

      {/* Arrow Action */}
      <td className="py-4 px-4 align-middle text-right">
        <ChevronRight className="w-4 h-4 text-[#5A5650] group-hover:text-[#161514] group-hover:translate-x-0.5 transition-all inline-block" />
      </td>
    </tr>
  );
}

export function GuestCard({ guest, onSelect }: GuestListItemProps) {
  const statusInfo = formatGuestStatus(guest.status);

  const attendingEventsCount = Object.values(guest.events).filter(
    (val) => val === "YES"
  ).length;

  return (
    <div
      onClick={() => onSelect(guest)}
      className="bg-white border border-[#161514]/15 p-4 space-y-3 cursor-pointer hover:border-[#C5A880] transition-colors"
    >
      <div className="flex items-start justify-between gap-3 border-b border-[#161514]/10 pb-2.5">
        <div>
          <h3 className="font-serif text-lg text-[#161514] font-medium">
            {guest.name}
          </h3>
          <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650]">
            {guest.group}
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
            Plus-One
          </span>
          <span className="text-[#161514]">
            {guest.plusOne ? guest.plusOneName || "Yes (Name missing)" : "No plus-one"}
          </span>
        </div>

        <div>
          <span className="block text-[10px] uppercase tracking-wider text-[#5A5650]/70">
            Meal
          </span>
          <span className="text-[#161514]">
            {formatMealPreference(guest.mealPreference)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-[#161514]/10 text-xs font-sans">
        <span className="text-[#5A5650]">
          Attending {attendingEventsCount} of 4 events
        </span>
        <span className="inline-flex items-center gap-1 text-[#161514] font-medium uppercase tracking-wider text-[11px]">
          View guest profile
          <ChevronRight className="w-3.5 h-3.5 text-[#C5A880]" />
        </span>
      </div>
    </div>
  );
}

export const GuestListItem = GuestTableRow;
