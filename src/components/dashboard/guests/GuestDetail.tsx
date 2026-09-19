"use client";

import React, { useEffect } from "react";
import { Guest } from "@/data/guests";
import { formatGuestStatus, formatMealPreference } from "@/lib/guests";
import { ContextualLink } from "@/components/common/ContextualLink";
import { X, Mail, Phone, UserCheck, Utensils } from "lucide-react";

interface GuestDetailProps {
  guest: Guest | null;
  onClose: () => void;
}

export function GuestDetail({ guest, onClose }: GuestDetailProps) {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && guest) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [guest, onClose]);

  if (!guest) return null;

  const statusInfo = formatGuestStatus(guest.status);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guest-detail-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-lg my-8 p-6 sm:p-8 space-y-6 shadow-2xl relative">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[#161514]/15 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
                GUEST PROFILE
              </span>
              <span
                className={`inline-block px-2 py-0.5 border text-[10px] font-sans uppercase tracking-wider ${statusInfo.badgeClass}`}
              >
                {statusInfo.label}
              </span>
            </div>
            <h2 id="guest-detail-title" className="font-serif text-2xl text-[#161514] font-medium">
              {guest.name}
            </h2>
            <span className="text-xs font-sans uppercase tracking-wider text-[#5A5650] block">
              Group: {guest.group}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="p-1 text-[#5A5650] hover:text-[#161514] transition-colors focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Profile Content */}
        <div className="space-y-5 text-xs font-sans text-[#161514]">
          {/* Contact Details */}
          <div className="space-y-2 border-b border-[#161514]/10 pb-4">
            <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
              Contact Information
            </span>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-[#5A5650]">
                <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{guest.email || "No email recorded"}</span>
              </div>
              <div className="flex items-center gap-2 text-[#5A5650]">
                <Phone className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{guest.phone || "No phone recorded"}</span>
              </div>
            </div>
          </div>

          {/* Plus-One & Meal Details */}
          <div className="grid grid-cols-2 gap-4 border-b border-[#161514]/10 pb-4">
            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold mb-1">
                Plus-One Companion
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <UserCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>
                  {guest.plusOne
                    ? guest.plusOneName || "Included (Name missing)"
                    : "No plus-one"}
                </span>
              </div>
            </div>

            <div>
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold mb-1">
                Meal Preference
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <Utensils className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{formatMealPreference(guest.mealPreference)}</span>
              </div>
            </div>
          </div>

          {/* Event Attendance Schedule */}
          <div className="space-y-2 border-b border-[#161514]/10 pb-4">
            <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
              Event Attendance
            </span>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 border border-[#161514]/10 bg-white/60">
                <span className="block text-[10px] text-[#5A5650] uppercase">Mehendi & Sangeet</span>
                <span className="font-serif font-medium text-[#161514]">
                  {guest.events.mehendi === "YES"
                    ? "Attending"
                    : guest.events.mehendi === "NO"
                    ? "Declined"
                    : "Pending"}
                </span>
              </div>

              <div className="p-2 border border-[#161514]/10 bg-white/60">
                <span className="block text-[10px] text-[#5A5650] uppercase">Haldi Celebration</span>
                <span className="font-serif font-medium text-[#161514]">
                  {guest.events.haldi === "YES"
                    ? "Attending"
                    : guest.events.haldi === "NO"
                    ? "Declined"
                    : "Pending"}
                </span>
              </div>

              <div className="p-2 border border-[#161514]/10 bg-white/60">
                <span className="block text-[10px] text-[#5A5650] uppercase">Wedding Ceremony</span>
                <span className="font-serif font-medium text-[#161514]">
                  {guest.events.wedding === "YES"
                    ? "Attending"
                    : guest.events.wedding === "NO"
                    ? "Declined"
                    : "Pending"}
                </span>
              </div>

              <div className="p-2 border border-[#161514]/10 bg-white/60">
                <span className="block text-[10px] text-[#5A5650] uppercase">Grand Reception</span>
                <span className="font-serif font-medium text-[#161514]">
                  {guest.events.reception === "YES"
                    ? "Attending"
                    : guest.events.reception === "NO"
                    ? "Declined"
                    : "Pending"}
                </span>
              </div>
            </div>

            <div className="pt-2">
              <ContextualLink
                label="Wedding Schedule"
                value="4 Main Celebrations"
                href="/dashboard/events"
                actionLabel="View wedding events"
              />
            </div>
          </div>

          {/* Notes */}
          {guest.notes && (
            <div className="space-y-1">
              <span className="block text-[10px] uppercase tracking-wider text-[#5A5650] font-semibold">
                Notes & Instructions
              </span>
              <p className="text-xs font-sans text-[#5A5650] leading-relaxed bg-white/60 p-3 border border-[#161514]/10">
                {guest.notes}
              </p>
            </div>
          )}
        </div>

        {/* Footer Close Button */}
        <div className="border-t border-[#161514]/15 pt-4 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-[0.15em] hover:bg-[#C5A880] hover:text-[#161514] transition-all"
          >
            Close Profile
          </button>
        </div>
      </div>
    </div>
  );
}
