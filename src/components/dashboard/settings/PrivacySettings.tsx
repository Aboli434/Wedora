"use client";

import React from "react";
import { PrivacyPreferences } from "@/data/settings";

interface PrivacySettingsProps {
  privacy: PrivacyPreferences;
  onChange: (updated: PrivacyPreferences) => void;
}

export function PrivacySettings({ privacy, onChange }: PrivacySettingsProps) {
  const handleProfileVisibilityChange = (value: "Private" | "Wedora team only") => {
    onChange({
      ...privacy,
      profileVisibility: value,
    });
  };

  const handleVendorVisibilityChange = (
    value: "Only when needed" | "Always visible to booked vendors"
  ) => {
    onChange({
      ...privacy,
      vendorContactVisibility: value,
    });
  };

  const handleAnalyticsToggle = () => {
    onChange({
      ...privacy,
      analyticsConsent: !privacy.analyticsConsent,
    });
  };

  return (
    <section id="privacy" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-5">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Privacy &amp; visibility</h2>
        <p className="text-sm text-[#6E6B65] mt-1">
          Choose how information connected to your wedding is shared.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block mb-2">
            Profile Visibility
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(["Private", "Wedora team only"] as const).map((opt) => {
              const isSelected = privacy.profileVisibility === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleProfileVisibilityChange(opt)}
                  className={`text-left p-3.5 rounded-lg border text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#2C2A29] text-white border-[#2C2A29]"
                      : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
                  }`}
                >
                  <p>{opt}</p>
                  <p className={`text-xs mt-0.5 ${isSelected ? "text-neutral-300" : "text-[#6E6B65]"}`}>
                    {opt === "Private"
                      ? "Only you and your partner can view workspace details."
                      : "Allow dedicated Wedora planners to view wedding progress."}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block mb-2">
            Vendor Contact Visibility
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {(["Only when needed", "Always visible to booked vendors"] as const).map((opt) => {
              const isSelected = privacy.vendorContactVisibility === opt;
              return (
                <button
                  type="button"
                  key={opt}
                  onClick={() => handleVendorVisibilityChange(opt)}
                  className={`text-left p-3.5 rounded-lg border text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#2C2A29] text-white border-[#2C2A29]"
                      : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
                  }`}
                >
                  <p>{opt}</p>
                  <p className={`text-xs mt-0.5 ${isSelected ? "text-neutral-300" : "text-[#6E6B65]"}`}>
                    {opt === "Only when needed"
                      ? "Vendors receive contact details only upon booking confirmation."
                      : "Booked vendors can access phone/email directly from their dashboard."}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-[#E8E2D9] flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium text-[#2C2A29]">Analytics consent</p>
            <p className="text-xs text-[#6E6B65] mt-0.5">
              Allow Wedora to use anonymous planning activity to improve the user experience.
            </p>
          </div>

          <button
            type="button"
            role="switch"
            aria-checked={privacy.analyticsConsent}
            aria-label="Toggle analytics consent"
            onClick={handleAnalyticsToggle}
            className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
              privacy.analyticsConsent ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
            }`}
          >
            <span
              className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                privacy.analyticsConsent ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E8E2D9]">
        <p className="text-xs text-[#8C857B] italic">
          Demo only — frontend simulation. No actual analytics scripts or tracking services are loaded.
        </p>
      </div>
    </section>
  );
}
