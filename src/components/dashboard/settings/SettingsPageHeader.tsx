"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function SettingsPageHeader() {
  return (
    <header className="space-y-4 pb-6 border-b border-[#161514]/10">
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
            Settings
          </li>
        </ol>
      </nav>

      {/* Main Title Row */}
      <div className="space-y-1.5 max-w-2xl">
        <span className="text-[10px] font-sans tracking-[0.3em] uppercase text-[#C5A880] font-semibold block">
          ACCOUNT & PREFERENCES
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#161514] font-light tracking-tight leading-tight">
          Make Wedora work the way you plan.
        </h1>
        <p className="text-sm font-sans text-[#5A5650] leading-relaxed">
          Keep your profile, planning preferences, notifications, and account choices in one place.
        </p>
      </div>
    </header>
  );
}
