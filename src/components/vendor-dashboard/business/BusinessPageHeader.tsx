"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Edit2 } from "lucide-react";

interface BusinessPageHeaderProps {
  isEditing: boolean;
  onToggleEdit: () => void;
}

export function BusinessPageHeader({ isEditing, onToggleEdit }: BusinessPageHeaderProps) {
  return (
    <div className="space-y-4 border-b border-[#E8E2D9] pb-6">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="text-xs text-[#8C857B]">
        <ol className="flex items-center gap-2 font-mono">
          <li>Vendor Studio</li>
          <li>/</li>
          <li className="text-[#2C2A29] font-medium" aria-current="page">
            My Business
          </li>
        </ol>
      </nav>

      {/* Main Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div className="space-y-1 max-w-3xl">
          <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
            MY BUSINESS
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#2C2A29] font-light">
            Make your work easy to understand.
          </h1>
          <p className="text-xs sm:text-sm text-[#6E6B65] leading-relaxed pt-1">
            Keep the details behind your studio current so couples can discover what you create, where you work, and what makes your approach different.
          </p>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onToggleEdit}
            className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-medium uppercase tracking-wider rounded-md transition-colors ${
              isEditing
                ? "bg-[#2C2A29] text-white hover:bg-[#1A1918]"
                : "bg-white text-[#2C2A29] border border-[#2C2A29]/20 hover:bg-[#F2ECE4]"
            }`}
          >
            <Edit2 className="w-3.5 h-3.5" />
            <span>{isEditing ? "Done Editing" : "Edit Business"}</span>
          </button>

          <Link
            href="/vendors/the-frame-house"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#594B3C] bg-[#F2ECE4] border border-[#E5DEC9] rounded-md hover:bg-[#EAE4DB] transition-colors"
          >
            <span>View Public Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5 text-[#C5A880]" />
          </Link>
        </div>
      </div>
    </div>
  );
}
