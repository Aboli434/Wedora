"use client";

import React from "react";
import Link from "next/link";
import { CalendarCheck, ArrowUpRight } from "lucide-react";

interface ClientBookingsProps {
  bookingIds: string[];
  coupleName: string;
}

export const ClientBookings: React.FC<ClientBookingsProps> = ({
  bookingIds,
  coupleName,
}) => {
  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-base font-medium text-[#161514]">
            Connected Bookings ({bookingIds.length})
          </h3>
        </div>
        <Link
          href="/vendor/dashboard/bookings"
          className="text-xs text-[#C5A880] hover:underline flex items-center gap-1 font-medium"
        >
          <span>Open Bookings Workspace</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {bookingIds.length === 0 ? (
        <p className="text-xs text-[#5A5650] italic">
          No confirmed contract bookings attached to {coupleName} yet.
        </p>
      ) : (
        <div className="space-y-3 text-xs">
          {bookingIds.map((bId) => (
            <div
              key={bId}
              className="p-3 bg-[#FAF8F5] border border-[#161514]/10 flex items-center justify-between gap-3"
            >
              <div>
                <span className="font-mono text-[10px] text-[#5A5650] uppercase font-semibold block">
                  BOOKING REFERENCE #{bId}
                </span>
                <div className="font-serif text-base font-medium text-[#161514]">
                  Wedding Photography & Cinematography Contract
                </div>
              </div>
              <Link
                href="/vendor/dashboard/bookings"
                className="px-3 py-1.5 bg-[#161514] text-[#FAF8F5] text-[11px] font-medium uppercase tracking-wider hover:bg-[#161514]/90"
              >
                View Dossier
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
