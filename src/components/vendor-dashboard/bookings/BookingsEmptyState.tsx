"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, Calendar } from "lucide-react";

export const BookingsEmptyState: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        CONFIRMED BOOKINGS
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
        Confirmed work will appear here.
      </h2>
      <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Accepted enquiries can become bookings that you can manage from one place.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/vendor/dashboard/enquiries"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>View enquiries</span>
        </Link>
        <Link
          href="/vendor/dashboard/calendar"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-sans uppercase tracking-[0.15em] text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>View calendar</span>
        </Link>
      </div>
    </div>
  );
};

