"use client";

import React from "react";
import { Calendar } from "lucide-react";

interface EventOverviewProps {
  events: {
    mehendi: { yes: number; no: number; pending: number };
    haldi: { yes: number; no: number; pending: number };
    wedding: { yes: number; no: number; pending: number };
    reception: { yes: number; no: number; pending: number };
  };
}

const EVENT_CONFIG = [
  { key: "mehendi", label: "Mehendi & Sangeet", date: "12 Feb 2027" },
  { key: "haldi", label: "Haldi Celebration", date: "13 Feb 2027" },
  { key: "wedding", label: "Wedding Ceremony", date: "14 Feb 2027" },
  { key: "reception", label: "Grand Reception", date: "14 Feb 2027" },
] as const;

export function GuestEventOverview({ events }: EventOverviewProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          SCHEDULE ATTENDANCE
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Event Attendance Breakdown
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {EVENT_CONFIG.map((ev) => {
          const stats = events[ev.key];

          return (
            <div
              key={ev.key}
              className="border border-[#161514]/10 p-4 bg-white/50 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#161514] font-medium leading-snug">
                    {ev.label}
                  </h3>
                  <span className="text-[11px] font-sans text-[#5A5650] flex items-center gap-1.5 mt-0.5">
                    <Calendar className="w-3 h-3 text-[#C5A880]" />
                    {ev.date}
                  </span>
                </div>
              </div>

              {/* Attendance Counts Pill Row */}
              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#161514]/10 text-center">
                <div className="bg-[#2D4A3E]/5 border border-[#2D4A3E]/15 py-1.5 px-1">
                  <span className="block font-serif text-lg font-light text-[#2D4A3E]">
                    {stats.yes}
                  </span>
                  <span className="block text-[9px] font-sans uppercase tracking-wider text-[#2D4A3E]">
                    Attending
                  </span>
                </div>

                <div className="bg-[#161514]/5 border border-[#161514]/10 py-1.5 px-1">
                  <span className="block font-serif text-lg font-light text-[#5A5650]">
                    {stats.no}
                  </span>
                  <span className="block text-[9px] font-sans uppercase tracking-wider text-[#5A5650]">
                    Declined
                  </span>
                </div>

                <div className="bg-[#C5A880]/10 border border-[#C5A880]/20 py-1.5 px-1">
                  <span className="block font-serif text-lg font-light text-[#8C6D3B]">
                    {stats.pending}
                  </span>
                  <span className="block text-[9px] font-sans uppercase tracking-wider text-[#8C6D3B]">
                    Pending
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
