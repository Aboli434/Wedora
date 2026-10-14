"use client";

import React from "react";
import { NotificationBell } from "@/components/common/NotificationBell";
import { useAuth } from "@/hooks/useAuth";
import { formatVendorCategory } from "@/lib/vendorCategory";
import { LogOut } from "lucide-react";

export function VendorHeader() {
  const { user, logout } = useAuth();
  const vendorProfile = user?.profile as { businessName?: string; category?: string } | null;

  const businessName = vendorProfile?.businessName || (user?.fullName ? `${user.fullName} Studio` : "Vendor Studio");
  const displayCategory = vendorProfile?.category ? formatVendorCategory(vendorProfile.category) : null;

  const initials = user?.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "VS";

  return (
    <header className="bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Left Context Label */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8C857B] font-semibold hidden sm:inline-block">
          VENDOR STUDIO
        </span>
        <span className="hidden sm:inline-block text-[#D9D3C7]">•</span>
        <h1 className="font-serif text-lg md:text-xl text-[#2C2A29] font-light">
          {businessName}
        </h1>
        {displayCategory && (
          <span className="text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2ECE4] border border-[#E5DEC9] text-[#594B3C] font-medium hidden md:inline-block">
            {displayCategory}
          </span>
        )}
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-4">
        <NotificationBell />

        <div className="flex items-center gap-3 pl-3 border-l border-[#E8E2D9]">
          <div
            aria-label={`Vendor user ${user?.fullName || "User"}`}
            className="w-8 h-8 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-light border border-[#C5A880] select-none"
            title={user?.fullName || "Vendor"}
          >
            {initials}
          </div>
          <button
            onClick={logout}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-[#8C857B] hover:text-[#161514] transition-colors uppercase tracking-wider font-semibold cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
