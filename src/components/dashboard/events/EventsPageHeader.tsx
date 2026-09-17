"use client";

import React from "react";
import Link from "next/link";
import { Plus, Heart, ChevronRight } from "lucide-react";

interface EventsPageHeaderProps {
  onAddEventClick: () => void;
}

export function EventsPageHeader({ onAddEventClick }: EventsPageHeaderProps) {
  return (
    <header className="space-y-6 pb-6 border-b border-[#161514]/10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-xs font-sans tracking-wider text-[#5A5650] uppercase">
          <li>
            <Link
              href="/dashboard"
              className="hover:text-[#161514] transition-colors focus:outline-none focus:underline"
            >
              Dashboard
            </Link>
          </li>
          <ChevronRight className="w-3 h-3 text-[#5A5650]/60" />
          <li className="text-[#161514] font-medium" aria-current="page">
            Events
          </li>
        </ol>
      </nav>

      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A880] font-semibold block">
            EVENT MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#161514] font-light tracking-tight leading-tight">
            Every part of the celebration, in rhythm.
          </h1>
          <p className="text-sm font-sans text-[#5A5650] leading-relaxed">
            Bring your ceremony timings, people, vendors, and final details together across every event.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Link
            href="/dashboard/wedding"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 border border-[#161514]/20 text-[#161514] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#161514]/5 transition-colors focus:outline-none"
          >
            <Heart className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View My Wedding</span>
          </Link>

          <button
            onClick={onAddEventClick}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Event</span>
          </button>
        </div>
      </div>
    </header>
  );
}
