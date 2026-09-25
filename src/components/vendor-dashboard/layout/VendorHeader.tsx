"use client";

import React from "react";
import { NotificationBell } from "@/components/common/NotificationBell";
import { useAuth } from "@/hooks/useAuth";
import { MOCK_VENDOR_DASHBOARD_DATA } from "@/data/vendorDashboard";

export function VendorHeader() {
  const { user } = useAuth();
  const vendorProfile = (user?.profile as { businessName?: string; category?: string } | null) || MOCK_VENDOR_DASHBOARD_DATA.profile;

  return (
    <header className="bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Left Context Label */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8C857B] font-semibold hidden sm:inline-block">
          VENDOR STUDIO
        </span>
        <span className="hidden sm:inline-block text-[#D9D3C7]">•</span>
        <h1 className="font-serif text-lg md:text-xl text-[#2C2A29] font-light">
          {vendorProfile.businessName || "Vendor Studio"}
        </h1>
        {vendorProfile.category && (
          <span className="text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2ECE4] border border-[#E5DEC9] text-[#594B3C] font-medium hidden md:inline-block">
            {vendorProfile.category}
          </span>
        )}
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-4">
        <NotificationBell />
      </div>
    </header>
  );
}
