"use client";

import React from "react";
import { Calendar, Plus } from "lucide-react";

interface CalendarEmptyStateProps {
  onAddEvent?: () => void;
}

export const CalendarEmptyState: React.FC<CalendarEmptyStateProps> = ({
  onAddEvent,
}) => {
  return (
    <div className="py-20 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5] my-8 max-w-2xl mx-auto">
      <Calendar className="w-10 h-10 text-[#C5A880] mx-auto mb-4 stroke-1" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
        CALENDAR SCHEDULE
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-medium mb-3">
        Your calendar is clear for now.
      </h2>
      <p className="text-xs md:text-sm text-[#5A5650] max-w-md mx-auto mb-6 leading-relaxed">
        Manage dates, ceremony shoots, preparation deadlines, and milestone dates in one place. Schedule your first operational entry to get started.
      </p>
      {onAddEvent && (
        <button
          onClick={onAddEvent}
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90 transition-colors"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Add Event</span>
        </button>
      )}
    </div>
  );
};
