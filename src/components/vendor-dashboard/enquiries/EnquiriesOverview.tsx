"use client";

import React from "react";
import { VendorEnquiriesSummary } from "@/data/vendorEnquiries";

interface EnquiriesOverviewProps {
  summary: VendorEnquiriesSummary;
  activeFilterStatus: string;
  onSelectStatusFilter: (status: string) => void;
}

export const EnquiriesOverview: React.FC<EnquiriesOverviewProps> = ({
  summary,
  activeFilterStatus,
  onSelectStatusFilter,
}) => {
  const metrics = [
    {
      id: "ALL",
      label: "TOTAL ENQUIRIES",
      value: summary.total,
      subtext: "All received leads",
    },
    {
      id: "NEW",
      label: "NEW",
      value: summary.newCount,
      subtext: "Requires initial review",
      highlight: summary.newCount > 0,
    },
    {
      id: "AWAITING",
      label: "AWAITING RESPONSE",
      value: summary.awaitingResponse,
      subtext: "New & reviewing",
    },
    {
      id: "NEGOTIATING",
      label: "NEGOTIATING",
      value: summary.negotiatingCount,
      subtext: "Active proposals",
    },
    {
      id: "ACCEPTED",
      label: "ACCEPTED",
      value: summary.acceptedCount,
      subtext: "Ready for booking",
    },
    {
      id: "UNREAD",
      label: "UNREAD",
      value: summary.unreadCount,
      subtext: "Unseen messages",
      highlight: summary.unreadCount > 0,
    },
  ];

  return (
    <section className="mb-12">
      <div className="py-6 border-t border-b border-[#161514]/10 bg-[#FAF8F5]">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#161514]/10 gap-y-6 lg:gap-y-0">
          {metrics.map((metric) => {
            const isSelected =
              activeFilterStatus === metric.id ||
              (metric.id === "AWAITING" && activeFilterStatus === "REVIEWING");

            return (
              <button
                key={metric.id}
                onClick={() => {
                  if (metric.id === "UNREAD") {
                    onSelectStatusFilter("UNREAD");
                  } else if (metric.id === "AWAITING") {
                    onSelectStatusFilter("REVIEWING");
                  } else {
                    onSelectStatusFilter(metric.id);
                  }
                }}
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
                <div className="font-serif text-3xl font-light text-[#161514] tracking-tight mb-1">
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
    </section>
  );
};
