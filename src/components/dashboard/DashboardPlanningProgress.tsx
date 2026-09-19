"use client";

import React from "react";
import Link from "next/link";
import { ClientDashboardData } from "@/data/dashboard";
import { Sliders, Users, Building2, Wallet, ChevronRight } from "lucide-react";

interface DashboardPlanningProgressProps {
  data: ClientDashboardData;
}

export const DashboardPlanningProgress: React.FC<
  DashboardPlanningProgressProps
> = ({ data }) => {
  const overallPercentage = data.checklist.percentageComplete;

  return (
    <section aria-label="Planning Progress & Essential Snapshots" className="space-y-6">
      {/* Overall Planning Progress Header Card */}
      <div className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] flex items-center gap-1.5 font-sans">
              <Sliders className="w-3.5 h-3.5" />
              OVERALL WEDDING PLANNING PROGRESS
            </span>
            <h3 className="font-serif text-2xl text-[#161514] font-medium mt-1">
              Celebration Readiness
            </h3>
          </div>
          <div className="font-serif text-4xl text-[#161514] font-light">
            {overallPercentage}% <span className="text-xs font-sans text-[#5A5650] uppercase tracking-wider">Completed</span>
          </div>
        </div>

        {/* Unified Progress Bar */}
        <div className="w-full h-2.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-full overflow-hidden p-0.5">
          <div
            className="h-full bg-[#161514] rounded-full transition-all duration-700"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>

        {/* 3 Supporting Dimensions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 text-xs text-[#5A5650] border-t border-[#161514]/5">
          <div>
            <span className="font-semibold text-[#161514] block">Checklist Tasks</span>
            <span>{data.checklist.completed} of {data.checklist.total} milestones completed</span>
          </div>
          <div>
            <span className="font-semibold text-[#161514] block">Vendor Curation</span>
            <span>{data.vendors.bookedCount} booked, {data.vendors.pendingCount} pending</span>
          </div>
          <div>
            <span className="font-semibold text-[#161514] block">Guest Confirmations</span>
            <span>{data.guests.confirmed} of {data.guests.totalInvited} RSVPs confirmed</span>
          </div>
        </div>
      </div>

      {/* 3 Navigation-Oriented Essential Snapshot Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Guests Snapshot */}
        <div className="bg-white border border-[#161514]/10 rounded-sm p-5 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650] flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-[#C5A880]" />
                GUESTS & RSVPS
              </span>
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {data.guests.confirmed} <span className="text-sm font-sans text-[#5A5650] font-normal">/ {data.guests.totalInvited} Confirmed</span>
            </div>
            <p className="text-xs text-[#5A5650] mt-1 font-sans">
              {data.guests.pending} pending responses
            </p>
          </div>

          <div className="pt-3 border-t border-[#161514]/5">
            <Link
              href="/dashboard/guests"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>View Guestlist</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Vendors Snapshot */}
        <div className="bg-white border border-[#161514]/10 rounded-sm p-5 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650] flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-[#C5A880]" />
                VENDORS & STUDIOS
              </span>
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {data.vendors.bookedCount} <span className="text-sm font-sans text-[#5A5650] font-normal">Booked</span>
            </div>
            <p className="text-xs text-[#5A5650] mt-1 font-sans">
              {data.vendors.pendingCount} category selections pending
            </p>
          </div>

          <div className="pt-3 border-t border-[#161514]/5">
            <Link
              href="/dashboard/vendors"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>View Vendors</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Budget Snapshot */}
        <div className="bg-white border border-[#161514]/10 rounded-sm p-5 space-y-3 flex flex-col justify-between hover:border-[#161514]/30 transition-colors shadow-xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold uppercase tracking-widest text-[#5A5650] flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5 text-[#C5A880]" />
                BUDGET ALLOCATION
              </span>
            </div>
            <div className="font-serif text-3xl font-medium text-[#161514]">
              {data.budget.spent}
            </div>
            <p className="text-xs text-[#5A5650] mt-1 font-sans">
              of {data.budget.totalEstimated} estimated budget
            </p>
          </div>

          <div className="pt-3 border-t border-[#161514]/5">
            <Link
              href="/dashboard/budget"
              className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-[#161514] hover:text-[#C5A880] transition-colors group"
            >
              <span>View Budget</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
