"use client";

import React from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";

interface BusinessContactPreferencesProps {
  profile: VendorBusinessProfile;
  onChange: (updated: Partial<VendorBusinessProfile>) => void;
}

const METHODS: ("Email" | "Phone" | "WhatsApp")[] = ["Email", "Phone", "WhatsApp"];

export function BusinessContactPreferences({ profile, onChange }: BusinessContactPreferencesProps) {
  const handleMethodSelect = (method: "Email" | "Phone" | "WhatsApp") => {
    onChange({ preferredContactMethod: method });
  };

  const handleToggleWedora = () => {
    onChange({ allowWedoraEnquiries: !profile.allowWedoraEnquiries });
  };

  const handleTogglePublicContact = () => {
    onChange({ showPublicContactDetails: !profile.showPublicContactDetails });
  };

  return (
    <section id="contact" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-5">
        <h2 className="font-serif text-2xl text-[#2C2A29]">How couples can reach you</h2>
        <p className="text-xs text-[#6E6B65] mt-1">
          Configure preferred enquiry channels and contact detail visibility.
        </p>
      </div>

      <div className="space-y-6">
        {/* Preferred Enquiry Method */}
        <div>
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block mb-3">
            Primary Preferred Enquiry Channel
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {METHODS.map((method) => {
              const isSelected = profile.preferredContactMethod === method;
              return (
                <button
                  type="button"
                  key={method}
                  onClick={() => handleMethodSelect(method)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#2C2A29] text-white border-[#2C2A29]"
                      : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
                  }`}
                >
                  <span>{method} Enquiry</span>
                  {isSelected && <span className="w-2 h-2 rounded-full bg-[#C5A880]" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Toggles */}
        <div className="border-t border-[#E8E2D9] pt-5 space-y-4">
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
            Channel Permissions
          </label>

          <div className="divide-y divide-[#E8E2D9]">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2C2A29]">Allow enquiries through Wedora</p>
                <p className="text-xs text-[#6E6B65]">Couples can submit direct enquiry forms on your public page.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={profile.allowWedoraEnquiries}
                aria-label="Toggle Wedora enquiries"
                onClick={handleToggleWedora}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
                  profile.allowWedoraEnquiries ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    profile.allowWedoraEnquiries ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2C2A29]">Allow couples to view contact details</p>
                <p className="text-xs text-[#6E6B65]">Display business phone and email on confirmed bookings.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={profile.showPublicContactDetails}
                aria-label="Toggle public contact details"
                onClick={handleTogglePublicContact}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
                  profile.showPublicContactDetails ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    profile.showPublicContactDetails ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E8E2D9]">
        <p className="text-xs text-[#8C857B] italic">
          Contact settings are not connected in this demo — frontend simulation.
        </p>
      </div>
    </section>
  );
}
