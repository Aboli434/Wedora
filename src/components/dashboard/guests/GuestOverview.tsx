"use client";

import React from "react";
import { GuestSummary } from "@/data/guests";
import { Users, CheckCircle2, Clock, XCircle, UserCheck } from "lucide-react";

interface GuestOverviewProps {
  summary: GuestSummary;
}

export function GuestOverview({ summary }: GuestOverviewProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#161514]/10 pb-4">
        <div>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            GUEST LIST SUMMARY
          </span>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            RSVP Overview & Progress
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514]/5 border border-[#161514]/15 text-[10px] font-mono tracking-widest uppercase text-[#5A5650]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          ILLUSTRATIVE DEMO
        </span>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
        {/* Total Invited */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <Users className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Invited</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {summary.totalInvited}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Total guest invitations
          </span>
        </div>

        {/* Confirmed */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#2D4A3E] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E]" />
            <span>Confirmed</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2D4A3E]">
            {summary.confirmed}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Attending wedding
          </span>
        </div>

        {/* Pending */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#8C6D3B] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Pending</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#8C6D3B]">
            {summary.pending}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Awaiting response
          </span>
        </div>

        {/* Declined */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <XCircle className="w-3.5 h-3.5 text-[#5A5650]" />
            <span>Declined</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#5A5650]">
            {summary.declined}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Unable to attend
          </span>
        </div>

        {/* Plus-Ones */}
        <div className="space-y-1 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Plus-Ones</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {summary.plusOnes}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Companions included
          </span>
        </div>
      </div>

      {/* Response Rate Progress Bar */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-[#5A5650] uppercase tracking-wider">
            RSVP Response Rate
          </span>
          <span className="font-serif font-medium text-[#161514]">
            {summary.responseRate}% Responded ({summary.confirmed + summary.declined} of {summary.totalInvited})
          </span>
        </div>

        <div
          className="w-full h-2 bg-[#161514]/10 overflow-hidden relative"
          role="progressbar"
          aria-valuenow={summary.responseRate}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`RSVP response rate: ${summary.responseRate} percent.`}
        >
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 ease-out"
            style={{ width: `${summary.responseRate}%` }}
          />
        </div>
      </div>
    </section>
  );
}
