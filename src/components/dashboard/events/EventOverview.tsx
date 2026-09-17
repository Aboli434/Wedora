"use client";

import React from "react";
import { EventSummary } from "@/data/eventsDashboard";
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";

interface EventOverviewProps {
  summary: EventSummary;
}

export function EventOverview({ summary }: EventOverviewProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      {/* Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#161514]/10 pb-4">
        <div>
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            ITINERARY OVERVIEW
          </span>
          <h2 className="font-serif text-2xl text-[#161514] font-light">
            Celebration Functions & Readiness
          </h2>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#161514]/5 border border-[#161514]/15 text-[10px] font-mono tracking-widest uppercase text-[#5A5650]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
          ILLUSTRATIVE DEMO
        </span>
      </div>

      {/* Grid of Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {/* Total Events */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Total Functions</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {summary.totalEvents}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Wedding celebration functions
          </span>
        </div>

        {/* Upcoming */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#8C6D3B] uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>Upcoming</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#8C6D3B]">
            {summary.upcomingEvents}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Scheduled ahead
          </span>
        </div>

        {/* Ready */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#2D4A3E] uppercase tracking-wider">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#2D4A3E]" />
            <span>Fully Ready</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#2D4A3E]">
            {summary.readyEvents}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            100% planning complete
          </span>
        </div>

        {/* Needs Attention */}
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-sans text-[#5A5650] uppercase tracking-wider">
            <AlertCircle className="w-3.5 h-3.5 text-[#5A5650]" />
            <span>Needs Attention</span>
          </div>
          <p className="font-serif text-3xl sm:text-4xl font-light text-[#161514]">
            {summary.eventsNeedingAttention}
          </p>
          <span className="text-[11px] font-sans text-[#5A5650]">
            Pending tasks or vendors
          </span>
        </div>
      </div>

      {/* Overall Event Readiness Progress */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-2">
        <div className="flex items-center justify-between text-xs font-sans">
          <span className="text-[#5A5650] uppercase tracking-wider">
            Overall Event Readiness
          </span>
          <span className="font-serif font-medium text-[#161514]">
            {summary.overallReadiness}% Prepared ({summary.completedTasks} of {summary.totalTasks} planning tasks complete)
          </span>
        </div>

        <div
          className="w-full h-2 bg-[#161514]/10 overflow-hidden relative"
          role="progressbar"
          aria-valuenow={summary.overallReadiness}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Overall Event Readiness: ${summary.overallReadiness} percent.`}
        >
          <div
            className="h-full bg-[#C5A880] transition-all duration-500 ease-out"
            style={{ width: `${summary.overallReadiness}%` }}
          />
        </div>
      </div>
    </section>
  );
}
