"use client";

import React from "react";
import { VendorBookingsSummary } from "@/data/vendorBookings";
import { formatIndianCurrency } from "@/lib/vendorBookings";

interface BookingsOverviewProps {
  summary: VendorBookingsSummary;
  activeFilterStatus: string;
  activePaymentFilter: string;
  onSelectStatusFilter: (status: string) => void;
  onSelectPaymentFilter: (paymentStatus: string) => void;
}

export const BookingsOverview: React.FC<BookingsOverviewProps> = ({
  summary,
  activeFilterStatus,
  activePaymentFilter,
  onSelectStatusFilter,
  onSelectPaymentFilter,
}) => {
  const statusMetrics = [
    {
      id: "ALL",
      type: "STATUS",
      label: "TOTAL BOOKINGS",
      value: summary.totalBookings,
      subtext: "All contract holds & confirmed",
    },
    {
      id: "CONFIRMED",
      type: "STATUS",
      label: "CONFIRMED",
      value: summary.confirmedBookings,
      subtext: "Retainer secured",
    },
    {
      id: "UPCOMING",
      type: "TIMEFRAME",
      label: "UPCOMING",
      value: summary.upcomingBookings,
      subtext: "Celebrations ahead",
    },
    {
      id: "IN_PROGRESS",
      type: "STATUS",
      label: "IN PROGRESS",
      value: summary.confirmedBookings > 0 ? 1 : 0, // In progress count
      subtext: "Pre-production / active",
    },
    {
      id: "COMPLETED",
      type: "STATUS",
      label: "COMPLETED",
      value: summary.completedBookings,
      subtext: "Deliverables handed over",
    },
    {
      id: "OVERDUE",
      type: "PAYMENT",
      label: "OVERDUE PAYMENT",
      value: formatIndianCurrency(summary.overdueAmount),
      subtext: summary.overdueAmount > 0 ? "Requires follow-up" : "All payments current",
      highlight: summary.overdueAmount > 0,
    },
  ];

  const financialMetrics = [
    {
      label: "TOTAL BOOKED VALUE",
      value: formatIndianCurrency(summary.totalBookedValue),
      subtext: "Gross contract volume",
    },
    {
      label: "AMOUNT RECEIVED",
      value: formatIndianCurrency(summary.totalReceived),
      subtext: `${Math.round(
        (summary.totalReceived / (summary.totalBookedValue || 1)) * 100
      )}% collected`,
    },
    {
      label: "AMOUNT OUTSTANDING",
      value: formatIndianCurrency(summary.totalOutstanding),
      subtext: "Pending milestones",
    },
  ];

  return (
    <section className="mb-12">
      {/* Primary Status Metrics Bar */}
      <div className="py-6 border-t border-b border-[#161514]/10 bg-[#FAF8F5] mb-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 divide-y lg:divide-y-0 lg:divide-x divide-[#161514]/10 gap-y-6 lg:gap-y-0">
          {statusMetrics.map((metric) => {
            let isSelected = false;
            if (metric.type === "STATUS") {
              isSelected = activeFilterStatus === metric.id;
            } else if (metric.type === "PAYMENT") {
              isSelected = activePaymentFilter === metric.id;
            }

            return (
              <button
                key={metric.id}
                onClick={() => {
                  if (metric.type === "PAYMENT") {
                    onSelectPaymentFilter(metric.id);
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
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
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

      {/* Financial Health Summary Banner */}
      <div className="bg-[#161514] text-[#FAF8F5] p-5 border border-[#161514]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-[#FAF8F5]/15">
          {financialMetrics.map((fin, idx) => (
            <div key={idx} className={`${idx > 0 ? "pt-4 md:pt-0 md:pl-6" : ""}`}>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1">
                {fin.label}
              </span>
              <div className="font-serif text-2xl font-light text-[#FAF8F5] tracking-tight mb-0.5">
                {fin.value}
              </div>
              <div className="text-[11px] text-[#FAF8F5]/60">{fin.subtext}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
