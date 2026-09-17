"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Calendar, CheckSquare } from "lucide-react";

export function GuestPageCTA() {
  return (
    <section className="bg-[#161514] text-[#FAF8F5] p-8 sm:p-10 border border-[#161514] space-y-6">
      <div className="max-w-2xl space-y-3">
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A880] font-semibold block">
          NEXT PLANNING STEP
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light leading-tight">
          Your guests are part of the story.
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#FAF8F5]/70 leading-relaxed">
          Once the guest list is clear, every event becomes easier to plan. Align your itinerary or review pending checklist priorities next.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        <Link
          href="/dashboard/events"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#C5A880] text-[#161514] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#FAF8F5] transition-all duration-300 focus:outline-none"
        >
          <Calendar className="w-4 h-4" />
          <span>Plan Events</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>

        <Link
          href="/dashboard/checklist"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#FAF8F5]/10 transition-all duration-300 focus:outline-none"
        >
          <CheckSquare className="w-4 h-4" />
          <span>Continue Planning</span>
        </Link>
      </div>
    </section>
  );
}
