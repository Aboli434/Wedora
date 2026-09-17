"use client";

import React from "react";
import Link from "next/link";
import { Users, ExternalLink } from "lucide-react";

interface EventGuestSummaryProps {
  expected: number;
  confirmed: number;
  pending: number;
}

export function EventGuestSummary({
  expected,
  confirmed,
  pending,
}: EventGuestSummaryProps) {
  return (
    <div className="space-y-2 border-b border-[#161514]/10 pb-4">
      <div className="flex items-center justify-between">
        <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold flex items-center gap-1">
          <Users className="w-3.5 h-3.5 text-[#C5A880]" />
          Event Guest Attendance
        </span>
        <Link
          href="/dashboard/guests"
          className="inline-flex items-center gap-1 text-[11px] font-sans uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <span>View Guests</span>
          <ExternalLink className="w-3 h-3 text-[#C5A880]" />
        </Link>
      </div>

      <div className="grid grid-cols-3 gap-3 p-3 bg-white/60 border border-[#161514]/10 text-center text-xs font-sans">
        <div>
          <span className="block text-[10px] text-[#5A5650] uppercase">Expected</span>
          <span className="font-serif text-lg font-light text-[#161514]">
            {expected}
          </span>
        </div>

        <div>
          <span className="block text-[10px] text-[#2D4A3E] uppercase">Confirmed</span>
          <span className="font-serif text-lg font-light text-[#2D4A3E]">
            {confirmed}
          </span>
        </div>

        <div>
          <span className="block text-[10px] text-[#8C6D3B] uppercase">Pending</span>
          <span className="font-serif text-lg font-light text-[#8C6D3B]">
            {pending}
          </span>
        </div>
      </div>
    </div>
  );
}
