"use client";

import React from "react";
import { CommunicationPreferences, PreferredContactMethod } from "@/data/settings";
import { formatContactMethod } from "@/lib/settings";

interface CommunicationSettingsProps {
  communications: CommunicationPreferences;
  onChange: (updated: CommunicationPreferences) => void;
}

const METHODS: PreferredContactMethod[] = ["Email", "Phone", "WhatsApp"];

export function CommunicationSettings({ communications, onChange }: CommunicationSettingsProps) {
  const handlePreferredChange = (method: PreferredContactMethod) => {
    onChange({
      ...communications,
      preferredContactMethod: method,
    });
  };

  const handleToggle = (key: "emailUpdates" | "whatsappUpdates" | "phoneUpdates") => {
    onChange({
      ...communications,
      [key]: !communications[key],
    });
  };

  return (
    <section id="communication" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">How you&apos;d like to hear from us</h2>
          <p className="text-sm text-[#6E6B65] mt-1">
            Choose the channels you&apos;d prefer for important planning updates.
          </p>
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F2ECE4] border border-[#E5DEC9] text-xs font-medium text-[#594B3C]">
          <span>Preferred channel: {communications.preferredContactMethod}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block mb-3">
            Primary Contact Method
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {METHODS.map((method) => {
              const isSelected = communications.preferredContactMethod === method;
              return (
                <button
                  type="button"
                  key={method}
                  onClick={() => handlePreferredChange(method)}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg border text-sm font-medium transition-all ${
                    isSelected
                      ? "bg-[#2C2A29] text-white border-[#2C2A29] shadow-sm"
                      : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
                  }`}
                >
                  <span>{formatContactMethod(method)}</span>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-[#C5A880]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#E8E2D9] pt-5 space-y-4">
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
            Channel Subscriptions
          </label>

          <div className="divide-y divide-[#E8E2D9]">
            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2C2A29]">Email updates</p>
                <p className="text-xs text-[#6E6B65]">Receive digests, milestone reminders, and vendor summaries.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={communications.emailUpdates}
                aria-label="Toggle email updates"
                onClick={() => handleToggle("emailUpdates")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
                  communications.emailUpdates ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    communications.emailUpdates ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2C2A29]">WhatsApp updates</p>
                <p className="text-xs text-[#6E6B65]">Instant RSVP notifications and urgent schedule changes.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={communications.whatsappUpdates}
                aria-label="Toggle WhatsApp updates"
                onClick={() => handleToggle("whatsappUpdates")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
                  communications.whatsappUpdates ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    communications.whatsappUpdates ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            <div className="py-3.5 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#2C2A29]">Phone updates</p>
                <p className="text-xs text-[#6E6B65]">Direct calls from concierge for high-priority vendor issues.</p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={communications.phoneUpdates}
                aria-label="Toggle phone updates"
                onClick={() => handleToggle("phoneUpdates")}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
                  communications.phoneUpdates ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    communications.phoneUpdates ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E8E2D9]">
        <p className="text-xs text-[#8C857B] italic">
          Demo only — Wedora does not send real messages or connect to external channels in this demo.
        </p>
      </div>
    </section>
  );
}
