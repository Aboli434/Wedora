"use client";

import React from "react";
import Link from "next/link";
import { FullVendorDashboardData } from "@/data/vendorDashboard";
import { MessageSquare, CalendarCheck, CreditCard, ChevronRight } from "lucide-react";

interface VendorDashboardBusinessHealthProps {
  data: FullVendorDashboardData;
}

export const VendorDashboardBusinessHealth: React.FC<
  VendorDashboardBusinessHealthProps
> = ({ data }) => {
  const { summary } = data;

  return (
    <section aria-label="Business Health Snapshot" className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#161514] flex items-center gap-2 font-sans">
          <CreditCard className="w-4 h-4 text-[#C5A880]" />
          BUSINESS HEALTH SNAPSHOT
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Enquiries Card */}
        <div className="bg-white border border-[#161514]/10 rounded-sm p-5 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650] flex items-center gap-1.5">
                <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
                CLIENT LEADS
              </span>
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {summary.activeEnquiries} <span className="text-sm font-sans text-[#5A5650] font-normal">Active Leads</span>
            </div>
            <p className="text-xs text-[#5A5650] mt-1 font-sans">
              {summary.awaitingResponseCount} awaiting studio response
            </p>
          </div>

          <div className="pt-3 border-t border-[#161514]/5">
            <Link
              href="/vendor/dashboard/enquiries"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>View Enquiries</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Bookings Card */}
        <div className="bg-white border border-[#161514]/10 rounded-sm p-5 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650] flex items-center gap-1.5">
                <CalendarCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                CONFIRMED CONTRACTS
              </span>
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {summary.upcomingBookings} <span className="text-sm font-sans text-[#5A5650] font-normal">Upcoming Shoots</span>
            </div>
            <p className="text-xs text-[#5A5650] mt-1 font-sans">
              {summary.confirmedBookings} total booked season contracts
            </p>
          </div>

          <div className="pt-3 border-t border-[#161514]/5">
            <Link
              href="/vendor/dashboard/bookings"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>View Bookings</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Financial Snapshot */}
        <div className="bg-white border border-[#161514]/10 rounded-sm p-5 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650] flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5 text-[#C5A880]" />
                OUTSTANDING RETAINERS
              </span>
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              ₹{(summary.outstandingPayments / 100000).toFixed(1)}L
            </div>
            <p className="text-xs text-[#5A5650] mt-1 font-sans">
              ₹{(summary.amountReceived / 100000).toFixed(1)}L received to date
            </p>
          </div>

          <div className="pt-3 border-t border-[#161514]/5">
            <Link
              href="/vendor/dashboard/payments"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>View Payments</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
