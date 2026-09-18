"use client";

import React, { useState } from "react";
import { Bell } from "lucide-react";
import { MOCK_VENDOR_DASHBOARD_DATA } from "@/data/vendorDashboard";

export function VendorHeader() {
  const { profile, summary } = MOCK_VENDOR_DASHBOARD_DATA;
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-[#FAF8F5] border-b border-[#E8E2D9] px-6 py-4 flex items-center justify-between sticky top-0 z-30">
      {/* Left Context Label */}
      <div className="flex items-center gap-3">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#8C857B] font-semibold hidden sm:inline-block">
          VENDOR STUDIO
        </span>
        <span className="hidden sm:inline-block text-[#D9D3C7]">•</span>
        <h1 className="font-serif text-lg md:text-xl text-[#2C2A29] font-light">
          {profile.businessName}
        </h1>
        <span className="text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded bg-[#F2ECE4] border border-[#E5DEC9] text-[#594B3C] font-medium hidden md:inline-block">
          {profile.category}
        </span>
      </div>

      {/* Right User & Notification Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Toggle */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            aria-label="View notifications"
            className="relative p-2 text-[#6E6B65] hover:text-[#2C2A29] hover:bg-[#F2ECE4] rounded-full transition-colors"
          >
            <Bell className="w-4 h-4" />
            {summary.awaitingResponseCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#C5A880]" />
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl shadow-xl p-4 space-y-3 z-50 text-xs">
              <div className="flex items-center justify-between border-b border-[#E8E2D9] pb-2">
                <span className="font-serif text-sm text-[#2C2A29]">Studio Alerts</span>
                <span className="text-[10px] font-mono text-[#8C857B]">{summary.awaitingResponseCount} pending</span>
              </div>
              <ul className="space-y-2">
                <li className="p-2 rounded bg-white border border-[#E8E2D9]">
                  <p className="font-medium text-[#2C2A29]">New Enquiry: Aarav &amp; Naina</p>
                  <p className="text-[11px] text-[#6E6B65] mt-0.5">Udaipur wedding requested for April 2027.</p>
                </li>
                <li className="p-2 rounded bg-white border border-[#E8E2D9]">
                  <p className="font-medium text-[#2C2A29]">Pending Review: Vikram &amp; Ananya</p>
                  <p className="text-[11px] text-[#6E6B65] mt-0.5">Pre-wedding proposal review awaiting reply.</p>
                </li>
              </ul>
              <div className="pt-1 text-center border-t border-[#E8E2D9]">
                <button
                  type="button"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-[#8C857B] hover:text-[#2C2A29]"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="w-px h-6 bg-[#E8E2D9]" />

        {/* Avatar & Owner Profile */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#2C2A29] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-medium tracking-widest border border-[#C5A880]/30 shadow-xs">
            {profile.avatarInitials}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-medium text-[#2C2A29] leading-tight">{profile.ownerName}</p>
            <p className="text-[10px] text-[#8C857B] leading-tight">{profile.businessName}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
