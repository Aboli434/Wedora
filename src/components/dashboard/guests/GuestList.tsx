"use client";

import React from "react";
import { Guest } from "@/data/guests";
import { GuestTableRow, GuestCard } from "./GuestListItem";
import { GuestEmptyState } from "./GuestEmptyState";

interface GuestListProps {
  guests: Guest[];
  totalGuests?: number;
  onSelectGuest: (guest: Guest) => void;
  onClearFilters: () => void;
  onAddGuest?: () => void;
}

export function GuestList({
  guests,
  totalGuests = 0,
  onSelectGuest,
  onClearFilters,
  onAddGuest,
}: GuestListProps) {
  if (guests.length === 0) {
    return (
      <GuestEmptyState
        isFiltered={totalGuests > 0}
        onAddGuest={onAddGuest}
        onClearFilters={onClearFilters}
      />
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto bg-[#FAF8F5] border border-[#161514]/15">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#161514]/15 bg-[#161514]/[0.03]">
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Guest Name
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Group
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                RSVP
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Plus-One
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Meal
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Events
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {guests.map((guest) => (
              <GuestTableRow
                key={guest.id}
                guest={guest}
                onSelect={onSelectGuest}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="md:hidden space-y-3">
        {guests.map((guest) => (
          <GuestCard
            key={guest.id}
            guest={guest}
            onSelect={onSelectGuest}
          />
        ))}
      </div>
    </div>
  );
}
