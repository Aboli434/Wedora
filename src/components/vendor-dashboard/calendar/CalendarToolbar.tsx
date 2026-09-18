"use client";

import React from "react";
import { CalendarView } from "@/data/vendorCalendar";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";

interface CalendarToolbarProps {
  view: CalendarView;
  onViewChange: (view: CalendarView) => void;
  currentDate: Date;
  onPrevPeriod: () => void;
  onNextPeriod: () => void;
  onToday: () => void;
}

export const CalendarToolbar: React.FC<CalendarToolbarProps> = ({
  view,
  onViewChange,
  currentDate,
  onPrevPeriod,
  onNextPeriod,
  onToday,
}) => {
  const monthYearLabel = currentDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/10 p-4 mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
      {/* Date Navigation */}
      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
        <div className="flex items-center border border-[#161514]/20 bg-white">
          <button
            onClick={onPrevPeriod}
            className="p-2 hover:bg-[#FAF8F5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            aria-label="Previous period"
          >
            <ChevronLeft className="w-4 h-4 text-[#161514]" />
          </button>
          <button
            onClick={onToday}
            className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#161514] border-x border-[#161514]/20 hover:bg-[#FAF8F5] transition-colors"
          >
            Today
          </button>
          <button
            onClick={onNextPeriod}
            className="p-2 hover:bg-[#FAF8F5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            aria-label="Next period"
          >
            <ChevronRight className="w-4 h-4 text-[#161514]" />
          </button>
        </div>

        <h2 className="font-serif text-xl font-medium text-[#161514] tracking-tight">
          {monthYearLabel}
        </h2>
      </div>

      {/* View Switcher (MONTH / WEEK / AGENDA) */}
      <div className="flex items-center gap-1 bg-white border border-[#161514]/15 p-1 w-full sm:w-auto justify-center">
        {(["MONTH", "WEEK", "AGENDA"] as CalendarView[]).map((v) => {
          const isSelected = view === v;
          return (
            <button
              key={v}
              onClick={() => onViewChange(v)}
              className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-all ${
                isSelected
                  ? "bg-[#161514] text-[#FAF8F5]"
                  : "text-[#5A5650] hover:text-[#161514] hover:bg-[#FAF8F5]"
              }`}
            >
              {v === "MONTH" ? (
                "Month"
              ) : v === "WEEK" ? (
                "Week"
              ) : (
                <span className="flex items-center gap-1">
                  <CalendarIcon className="w-3 h-3 text-[#C5A880]" />
                  Agenda
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
