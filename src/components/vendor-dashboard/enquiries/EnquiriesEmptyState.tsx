"use client";

import React from "react";
import Link from "next/link";
import { Compass, Briefcase } from "lucide-react";

export const EnquiriesEmptyState: React.FC = () => {
  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-10 md:p-12 text-center space-y-4 max-w-xl mx-auto my-6">
      <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
        CLIENT ENQUIRIES
      </span>
      <h2 className="font-serif text-2xl md:text-3xl text-[#161514] font-light">
        Your next enquiry will appear here.
      </h2>
      <p className="text-xs font-sans text-[#5A5650] max-w-sm mx-auto leading-relaxed">
        Keep your studio profile, services, and portfolio ready so couples can discover your work.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <Link
          href="/vendors"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 min-h-[44px] bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Compass className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>View public profile</span>
        </Link>
        <Link
          href="/vendor/dashboard/portfolio"
          className="inline-flex items-center justify-center gap-2 px-5 py-3 min-h-[44px] text-xs font-sans uppercase tracking-[0.15em] text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <Briefcase className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Complete portfolio</span>
        </Link>
      </div>
    </div>
  );
};

