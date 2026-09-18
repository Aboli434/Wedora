"use client";

import React from "react";
import { VendorClientsSummary } from "@/data/vendorClients";

interface ClientsOverviewProps {
  summary: VendorClientsSummary;
  activeFilterStatus: string;
  onSelectStatusFilter: (status: string) => void;
}

export const ClientsOverview: React.FC<ClientsOverviewProps> = ({
  summary,
  activeFilterStatus,
  onSelectStatusFilter,
}) => {
  const metrics = [
    {
      id: "ALL",
      label: "TOTAL CLIENTS",
      value: summary.totalClients,
      subtext: "All registered accounts",
    },
    {
      id: "ACTIVE",
      label: "ACTIVE CLIENTS",
      value: summary.activeClients,
      subtext: "Current contract work",
    },
    {
      id: "UPCOMING",
      label: "UPCOMING",
      value: summary.upcomingClients,
      subtext: "Future celebrations",
    },
    {
      id: "LEAD",
      label: "LEADS",
      value: summary.leadClients,
      subtext: "Initial relationship stage",
    },
    {
      id: "COMPLETED",
      label: "COMPLETED",
      value: summary.completedClients,
      subtext: "Delivered accounts",
    },
    {
      id: "NEEDS_ATTENTION",
      label: "NEEDS ATTENTION",
      value: summary.clientsNeedingAttention,
      subtext: "Action or follow-up required",
      highlight: summary.clientsNeedingAttention > 0,
    },
  ];

  return (
    <section className="mb-12">
      {/* Primary Metrics Bar */}
      <div className="py-6 border-t border-b border-[#161514]/10 bg-[#FAF8F5] mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#161514]/10 gap-y-6 lg:gap-y-0">
          {metrics.map((metric) => {
            const isSelected = activeFilterStatus === metric.id;

            return (
              <button
                key={metric.id}
                onClick={() => onSelectStatusFilter(metric.id)}
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

      {/* Relationship Totals Banner */}
      <div className="bg-[#161514] text-[#FAF8F5] p-4 border border-[#161514] flex flex-col sm:flex-row items-center justify-around gap-4 text-center sm:text-left">
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
            CONTRACT BOOKINGS:
          </span>
          <span className="font-serif text-xl font-light text-[#FAF8F5]">
            {summary.totalBookings} Total Bookings Connected
          </span>
        </div>
        <div className="hidden sm:block text-[#FAF8F5]/30">|</div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880]">
            SCHEDULED EVENTS:
          </span>
          <span className="font-serif text-xl font-light text-[#FAF8F5]">
            {summary.upcomingEvents} Upcoming Ceremony Shoots
          </span>
        </div>
      </div>
    </section>
  );
};
