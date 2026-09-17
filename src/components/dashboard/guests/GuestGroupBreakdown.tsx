"use client";

import React from "react";
import { GuestGroup } from "@/data/guests";

interface GroupBreakdownProps {
  groups: Record<GuestGroup, { count: number; percentage: number }>;
}

const GROUP_LABELS: Record<GuestGroup, string> = {
  FAMILY: "Family",
  FRIENDS: "Friends",
  COLLEAGUES: "Colleagues",
  OTHER: "Other Guests",
};

export function GuestGroupBreakdown({ groups }: GroupBreakdownProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          DISTRIBUTION
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Guest Groups
        </h2>
      </div>

      <div className="space-y-5">
        {(Object.keys(groups) as GuestGroup[]).map((groupKey) => {
          const item = groups[groupKey];
          return (
            <div key={groupKey} className="space-y-2">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-medium text-[#161514] uppercase tracking-wider">
                  {GROUP_LABELS[groupKey]}
                </span>
                <span className="text-[#5A5650]">
                  <strong className="text-[#161514] font-serif text-sm mr-1">{item.count}</strong>
                  ({item.percentage}% of total)
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className="w-full h-2 bg-[#161514]/10 overflow-hidden"
                role="progressbar"
                aria-valuenow={item.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${GROUP_LABELS[groupKey]}: ${item.count} guests (${item.percentage} percent).`}
              >
                <div
                  className="h-full bg-[#161514] transition-all duration-500 ease-out"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
