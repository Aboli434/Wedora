"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, Users, Store } from "lucide-react";

export function EventPageCTA() {
  return (
    <section className="bg-[#161514] text-[#FAF8F5] p-8 sm:p-10 border border-[#161514] space-y-6">
      <div className="max-w-2xl space-y-3">
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A880] font-semibold block">
          CELEBRATION COORDINATION
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl text-[#FAF8F5] font-light leading-tight">
          Bring every moment into focus.
        </h2>
        <p className="text-xs sm:text-sm font-sans text-[#FAF8F5]/70 leading-relaxed">
          When the events are clear, the rest of the celebration becomes easier to coordinate. Keep your guest responses and vendor team aligned.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
        <Link
          href="/dashboard/guests"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#C5A880] text-[#161514] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#FAF8F5] transition-all duration-300 focus:outline-none"
        >
          <Users className="w-4 h-4" />
          <span>Manage Guests</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </Link>

        <Link
          href="/dashboard/vendors"
          className="inline-flex items-center justify-center gap-2.5 px-6 py-3 border border-[#FAF8F5]/30 text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#FAF8F5]/10 transition-all duration-300 focus:outline-none"
        >
          <Store className="w-4 h-4" />
          <span>Manage Vendors</span>
        </Link>
      </div>
    </section>
  );
}
