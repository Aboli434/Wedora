"use client";

import React from "react";
import Link from "next/link";
import { UserPlus, ChevronRight } from "lucide-react";

interface GuestsPageHeaderProps {
  onAddGuestClick: () => void;
}

export function GuestsPageHeader({ onAddGuestClick }: GuestsPageHeaderProps) {
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
            Guests
          </li>
        </ol>
      </nav>

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div className="space-y-2 max-w-2xl">
          <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A880] font-semibold block">
            GUEST MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#161514] font-light tracking-tight leading-tight">
            Everyone who makes the celebration matter.
          </h1>
          <p className="text-sm font-sans text-[#5A5650] leading-relaxed">
            Keep your guest list organised, understand responses, and stay ahead of the details that make everyone feel considered.
          </p>
        </div>

        {/* Primary Action Button */}
        <div>
          <button
            onClick={onAddGuestClick}
            className="inline-flex items-center justify-center gap-2.5 px-6 py-3 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#C5A880] shadow-sm w-full sm:w-auto"
          >
            <UserPlus className="w-4 h-4" />
            <span>Add Guest</span>
          </button>
        </div>
      </div>
    </header>
  );
}
