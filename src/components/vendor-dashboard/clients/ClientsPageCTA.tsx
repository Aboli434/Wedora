"use client";

import React from "react";
import Link from "next/link";
import { MessageSquare, CalendarCheck, ArrowRight } from "lucide-react";

export const ClientsPageCTA: React.FC = () => {
  return (
    <section className="bg-[#161514] text-[#FAF8F5] rounded-xl p-8 md:p-12 relative overflow-hidden my-12 border border-[#C5A880]/20">
      <div className="relative z-10 max-w-3xl">
        <span className="text-[#C5A880] text-xs uppercase tracking-[0.2em] font-medium block mb-3 font-sans">
          CLIENT RELATIONSHIP EXCELLENCE
        </span>
        <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#FAF8F5] font-normal mb-4 leading-tight">
          Keep the relationship as considered as the work.
        </h2>
        <p className="text-[#5A5650] text-sm md:text-base leading-relaxed mb-8 max-w-2xl font-sans">
          From the first conversation to the final delivery, keep every important detail, wedding timeline, and operational action connected in one place.
        </p>

        <div className="flex flex-wrap items-center gap-4">
          <Link
            href="/vendor/dashboard/enquiries"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#C5A880] text-[#161514] font-medium text-xs tracking-wider uppercase hover:bg-[#b0936b] transition-colors rounded-sm"
          >
            <MessageSquare className="w-4 h-4" />
            View Enquiries
            <ArrowRight className="w-4 h-4 ml-1" />
          </Link>
          <Link
            href="/vendor/dashboard/bookings"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#C5A880]/40 text-[#FAF8F5] font-medium text-xs tracking-wider uppercase hover:bg-[#FAF8F5]/5 transition-colors rounded-sm"
          >
            <CalendarCheck className="w-4 h-4 text-[#C5A880]" />
            View Bookings
          </Link>
        </div>
      </div>

      {/* Decorative luxury watermark */}
      <div className="absolute right-[-40px] bottom-[-40px] opacity-5 pointer-events-none font-serif text-[180px] leading-none text-[#C5A880] select-none hidden md:block">
        Wedora
      </div>
    </section>
  );
};
