"use client";

import React from "react";
import { VendorPaymentsSummary } from "@/data/vendorPayments";
import { formatIndianCurrency } from "@/lib/vendorPayments";
import { Wallet, ArrowDownRight, Clock, AlertTriangle, FileCheck } from "lucide-react";

interface PaymentsOverviewProps {
  summary: VendorPaymentsSummary;
  activeMetricFilter: string;
  onSelectMetricFilter: (filterKey: string) => void;
}

export const PaymentsOverview: React.FC<PaymentsOverviewProps> = ({
  summary,
  activeMetricFilter,
  onSelectMetricFilter,
}) => {
  const metrics = [
    {
      id: "ALL",
      label: "TOTAL BOOKED",
      amount: formatIndianCurrency(summary.totalBookedValue),
      subtext: `${summary.totalPayments} total milestone records`,
      icon: Wallet,
      highlight: false,
    },
    {
      id: "PAID",
      label: "RECEIVED",
      amount: formatIndianCurrency(summary.totalReceived),
      subtext: `${summary.paidPayments} fully paid payments`,
      icon: ArrowDownRight,
      highlight: false,
      color: "text-emerald-700",
    },
    {
      id: "OUTSTANDING",
      label: "OUTSTANDING",
      amount: formatIndianCurrency(summary.totalOutstanding),
      subtext: `${summary.pendingPayments} pending payments`,
      icon: Clock,
      highlight: false,
      color: "text-amber-800",
    },
    {
      id: "OVERDUE",
      label: "OVERDUE",
      amount: formatIndianCurrency(summary.overdueAmount),
      subtext: `${summary.overduePayments} payment overdue`,
      icon: AlertTriangle,
      highlight: true,
      color: "text-rose-700",
    },
  ];

  return (
    <section className="mb-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isSelected = activeMetricFilter === m.id;

          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onSelectMetricFilter(m.id)}
              className={`text-left p-6 transition-all duration-200 border rounded-sm relative overflow-hidden group ${
                isSelected
                  ? "bg-[#161514] text-[#FAF8F5] border-[#161514] shadow-md"
                  : m.highlight
                  ? "bg-rose-50/50 border-rose-200/80 hover:border-rose-300 text-[#161514]"
                  : "bg-[#FAF8F5] border-[#161514]/10 hover:border-[#C5A880] text-[#161514]"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`text-[11px] font-semibold tracking-[0.2em] uppercase font-sans ${
                    isSelected ? "text-[#C5A880]" : "text-[#5A5650]"
                  }`}
                >
                  {m.label}
                </span>
                <Icon
                  className={`w-4 h-4 ${
                    isSelected ? "text-[#C5A880]" : m.color || "text-[#5A5650]"
                  }`}
                />
              </div>

              <div
                className={`font-serif text-2xl lg:text-3xl font-normal tracking-tight mb-1 ${
                  isSelected ? "text-[#FAF8F5]" : "text-[#161514]"
                }`}
              >
                {m.amount}
              </div>

              <p
                className={`text-xs font-sans ${
                  isSelected ? "text-[#FAF8F5]/70" : "text-[#5A5650]"
                }`}
              >
                {m.subtext}
              </p>

              {/* Bottom active indicator line */}
              {isSelected && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C5A880]" />
              )}
            </button>
          );
        })}
      </div>

      {/* Secondary Quick Finance Indicators */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-4 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-xs text-[#5A5650]">
        <div className="flex flex-wrap items-center gap-6">
          <div>
            <span className="font-semibold uppercase tracking-wider text-[#161514] mr-2">
              DUE WITHIN 14 DAYS:
            </span>
            <span className="font-serif text-sm font-medium text-[#161514]">
              {formatIndianCurrency(summary.dueSoonAmount)}
            </span>
          </div>

          <div className="hidden sm:block text-[#161514]/20">•</div>

          <div>
            <span className="font-semibold uppercase tracking-wider text-[#161514] mr-2">
              INVOICES ISSUED:
            </span>
            <span className="font-serif text-sm font-medium text-[#161514]">
              {summary.totalInvoices} total ({summary.paidInvoices} paid)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[#C5A880] font-medium font-sans">
          <FileCheck className="w-3.5 h-3.5" />
          <span>Calculated deterministically from active milestone ledgers</span>
        </div>
      </div>
    </section>
  );
};
