"use client";

import React from "react";
import Link from "next/link";
import { CalendarCheck, ArrowRight } from "lucide-react";

export const BookingsEmptyState: React.FC = () => {
  return (
    <div className="py-20 px-6 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5] my-8 max-w-2xl mx-auto">
      <CalendarCheck className="w-10 h-10 text-[#C5A880] mx-auto mb-4 stroke-1" />
      <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-2">
        YOUR BOOKINGS
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-medium mb-3">
        Your confirmed celebrations will appear here.
      </h2>
      <p className="text-xs md:text-sm text-[#5A5650] max-w-md mx-auto mb-6 leading-relaxed">
        Manage dates, payments, event schedules, and milestone progress for every couple. Convert leads from your enquiry pipeline to start your first booking dossier.
      </p>
      <Link
        href="/vendor/dashboard/enquiries"
        className="inline-flex items-center gap-2 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90 transition-colors"
      >
        <span>View Enquiry Workspace</span>
        <ArrowRight className="w-3.5 h-3.5 text-[#C5A880]" />
      </Link>
    </div>
  );
};
