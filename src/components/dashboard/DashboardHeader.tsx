"use client";

import React from "react";
import { Bell } from "lucide-react";

interface DashboardHeaderProps {
  greetingName?: string;
}

export function DashboardHeader({
  greetingName = "ADITI",
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#161514]/15">
      {/* Greeting Title */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          GOOD MORNING, {greetingName}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#161514] tracking-tight">
          Here&apos;s what&apos;s happening with your celebration.
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 self-end sm:self-center">
        {/* Notifications Icon Button */}
        <button
          type="button"
          aria-label="View notifications"
          className="relative p-2.5 bg-[#F3EFEA] border border-[#161514]/15 text-[#161514] hover:border-[#C5A880] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#C5A880] rounded-full" />
        </button>

        {/* Profile Avatar Indicator */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#161514]/15">
          <div
            aria-label="User profile Aditi & Arjun"
            className="w-9 h-9 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-light border border-[#C5A880] select-none"
          >
            AA
          </div>
        </div>
      </div>
    </header>
  );
}
