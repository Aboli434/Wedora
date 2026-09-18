"use client";

import React from "react";
import { VendorBookingPreferences } from "@/data/vendorSettings";
import { CalendarCheck, ShieldCheck, Percent, Info } from "lucide-react";

interface VendorBookingSettingsProps {
  bookings: VendorBookingPreferences;
  onUpdate: (updatedBookings: VendorBookingPreferences) => void;
}

export const VendorBookingSettings: React.FC<VendorBookingSettingsProps> = ({
  bookings,
  onUpdate,
}) => {
  const handleToggle = (key: keyof VendorBookingPreferences) => {
    onUpdate({
      ...bookings,
      [key]: !bookings[key],
    });
  };

  const handleSelectPercentage = (pct: number) => {
    onUpdate({
      ...bookings,
      defaultAdvancePercentage: pct,
    });
  };

  return (
    <div id="bookings" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Booking Rules & Advance Retention
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Configure default booking approval workflows, advance deposit percentages, and add-on policies.
        </p>
      </div>

      {/* Main Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {[
          { key: "acceptNewBookings", title: "Accept New Bookings", desc: "Allow leads to transition to active booking drafts" },
          { key: "requireBookingConfirmation", title: "Manual Studio Confirmation", desc: "Require studio owner review before contract finalization" },
          { key: "requireAdvancePayment", title: "Require Retainer Advance", desc: "Mandate advance deposit payment to lock wedding dates" },
          { key: "allowDateFlexibility", title: "Allow Date Flexibility", desc: "Permit clients to request date changes with advance notice" },
          { key: "allowAddOns", title: "Allow Service Add-Ons", desc: "Permit clients to add drone or album upgrades post-booking" },
        ].map((item) => {
          const val = bookings[item.key as keyof VendorBookingPreferences] as boolean;
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key as keyof VendorBookingPreferences)}
              className="flex items-start justify-between p-3.5 bg-white hover:bg-[#FAF8F5] border border-[#161514]/10 rounded-sm cursor-pointer transition-colors"
            >
              <div>
                <span className="text-xs font-medium text-[#161514] block">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
                  {item.desc}
                </span>
              </div>

              <div
                className={`w-9 h-5 rounded-full transition-colors p-0.5 shrink-0 ${
                  val ? "bg-[#161514]" : "bg-[#161514]/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#FAF8F5] transition-transform ${
                    val ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Advance Percentage Deposit Selection (Conditional) */}
      {bookings.requireAdvancePayment && (
        <div className="pt-4 border-t border-[#161514]/10 space-y-3 bg-[#FAF8F5] p-4 rounded-sm border">
          <div className="flex items-center gap-2">
            <Percent className="w-4 h-4 text-[#C5A880]" />
            <label className="text-xs font-semibold uppercase tracking-wider text-[#161514]">
              Default Advance Retainer Percentage
            </label>
          </div>
          <p className="text-xs text-[#5A5650]">
            The percentage of total package cost required upfront to secure the date on your calendar.
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            {[25, 30, 40, 50, 60].map((pct) => (
              <button
                key={pct}
                type="button"
                onClick={() => handleSelectPercentage(pct)}
                className={`px-4 py-2 text-xs font-medium rounded-sm border transition-colors ${
                  bookings.defaultAdvancePercentage === pct
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-white text-[#161514] border-[#161514]/15 hover:border-[#161514]/30"
                }`}
              >
                {pct}% Retainer
              </button>
            ))}
          </div>

          <div className="text-[11px] text-[#5A5650] mt-2 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>
              Remaining balance balance auto-scheduled into milestone invoices before event date.
            </span>
          </div>
        </div>
      )}

      {/* Demo Notice */}
      <div className="text-[11px] text-[#5A5650] bg-[#C5A880]/10 p-3 rounded-sm border border-[#C5A880]/20 flex items-center gap-2">
        <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
        <span>
          Demo booking preference — no payment processing or banking integration occurs in this view.
        </span>
      </div>
    </div>
  );
};
