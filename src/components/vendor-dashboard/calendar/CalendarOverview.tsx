"use client";

import React from "react";
import { VendorCalendarSummary, VendorCalendarEvent } from "@/data/vendorCalendar";
import { formatCalendarDate } from "@/lib/vendorCalendar";
import { Clock, ArrowRight } from "lucide-react";

interface CalendarOverviewProps {
  summary: VendorCalendarSummary;
  nextUpEvent?: VendorCalendarEvent | null;
  activeTypeFilter: string;
  onSelectTypeFilter: (type: string) => void;
  onSelectAgendaView: () => void;
  onSelectEvent: (event: VendorCalendarEvent) => void;
}

export const CalendarOverview: React.FC<CalendarOverviewProps> = ({
  summary,
  nextUpEvent,
  activeTypeFilter,
  onSelectTypeFilter,
  onSelectAgendaView,
  onSelectEvent,
}) => {
  const metrics = [
    {
      id: "UPCOMING",
      label: "UPCOMING",
      value: summary.upcomingEvents,
      subtext: "Events ahead",
      onClick: () => onSelectAgendaView(),
    },
    {
      id: "TODAY",
      label: "TODAY",
      value: summary.todayEvents,
      subtext: "18 Sept 2026",
      highlight: summary.todayEvents > 0,
      onClick: () => onSelectAgendaView(),
    },
    {
      id: "WEDDING_EVENT",
      label: "WEDDING EVENTS",
      value: summary.weddingEvents,
      subtext: "Ceremony shoots",
      onClick: () => onSelectTypeFilter("WEDDING_EVENT"),
    },
    {
      id: "PREPARATION",
      label: "PREPARATION",
      value: summary.preparationEvents,
      subtext: "Permits & shot lists",
      onClick: () => onSelectTypeFilter("PREPARATION"),
    },
    {
      id: "PAYMENT_DUE",
      label: "PAYMENTS DUE",
      value: summary.paymentDueEvents,
      subtext: "Milestone dates",
      highlight: summary.paymentDueEvents > 0,
      onClick: () => onSelectTypeFilter("PAYMENT_DUE"),
    },
    {
      id: "BLOCKED",
      label: "BLOCKED DATES",
      value: `${summary.blockedDates} days`,
      subtext: "Unavailable ranges",
      onClick: () => onSelectTypeFilter("BLOCKED"),
    },
  ];

  return (
    <section className="mb-12">
      {/* Primary Metrics Bar */}
      <div className="py-6 border-t border-b border-[#161514]/10 bg-[#FAF8F5] mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#161514]/10 gap-y-6 lg:gap-y-0">
          {metrics.map((metric) => {
            const isSelected = activeTypeFilter === metric.id;

            return (
              <button
                key={metric.id}
                onClick={metric.onClick}
                className={`text-left px-4 lg:px-6 py-2 transition-all focus:outline-none focus:ring-1 focus:ring-[#C5A880] group ${
                  isSelected ? "bg-[#161514]/5" : "hover:bg-[#161514]/[0.02]"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[11px] font-semibold tracking-[0.15em] text-[#5A5650] uppercase group-hover:text-[#161514] transition-colors">
                    {metric.label}
                  </span>
                  {metric.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
                  )}
                </div>
                <div className="font-serif text-2xl lg:text-3xl font-light text-[#161514] tracking-tight mb-1">
                  {metric.value}
                </div>
                <div className="text-[11px] text-[#5A5650]/80">
                  {metric.subtext}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Next Up Preview Banner */}
      {nextUpEvent && (
        <div
          onClick={() => onSelectEvent(nextUpEvent)}
          className="bg-[#161514] text-[#FAF8F5] p-5 border border-[#161514] cursor-pointer hover:bg-[#161514]/95 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
        >
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
                NEXT UP ON CALENDAR
              </span>
              <span className="text-xs text-[#FAF8F5]/50">&bull;</span>
              <span className="text-xs text-[#FAF8F5]/80 flex items-center gap-1 font-mono">
                <Clock className="w-3 h-3 text-[#C5A880]" />
                {formatCalendarDate(nextUpEvent.startDate)}
              </span>
            </div>
            <h4 className="font-serif text-xl font-medium tracking-tight text-[#FAF8F5] group-hover:text-[#C5A880] transition-colors">
              {nextUpEvent.title}
            </h4>
            <p className="text-xs text-[#FAF8F5]/70 mt-0.5 line-clamp-1">
              {nextUpEvent.description || nextUpEvent.venue || nextUpEvent.location || "Scheduled operational item"}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-medium text-[#C5A880] shrink-0">
            <span>View Details</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      )}
    </section>
  );
};
