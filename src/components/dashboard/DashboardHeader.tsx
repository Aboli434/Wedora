"use client";

import React from "react";
import { NotificationBell } from "@/components/common/NotificationBell";
import { useAuth } from "@/hooks/useAuth";

interface DashboardHeaderProps {
  greetingName?: string;
}

export function DashboardHeader({
  greetingName,
}: DashboardHeaderProps) {
  const { user } = useAuth();
  const displayName = greetingName || user?.fullName?.split(" ")[0]?.toUpperCase() || "PLANNER";
  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "WD";

  return (
    <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-[#161514]/15">
      {/* Greeting Title */}
      <div className="space-y-1">
        <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
          GOOD MORNING, {displayName}
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-light text-[#161514] tracking-tight">
          Here&apos;s what&apos;s happening with your celebration.
        </h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4 self-end sm:self-center">
        {/* Notifications Icon Button */}
        <NotificationBell />

        {/* Profile Avatar Indicator */}
        <div className="flex items-center gap-3 pl-2 border-l border-[#161514]/15">
          <div
            aria-label={`User profile ${user?.fullName || "User"}`}
            className="w-9 h-9 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-light border border-[#C5A880] select-none"
          >
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
