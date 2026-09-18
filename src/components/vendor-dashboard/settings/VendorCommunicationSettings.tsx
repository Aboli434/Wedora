"use client";

import React from "react";
import { VendorCommunicationPreferences } from "@/data/vendorSettings";
import { MessageSquare, Mail, Phone, Smartphone, Info } from "lucide-react";

interface VendorCommunicationSettingsProps {
  communications: VendorCommunicationPreferences;
  onUpdate: (updatedComms: VendorCommunicationPreferences) => void;
}

export const VendorCommunicationSettings: React.FC<
  VendorCommunicationSettingsProps
> = ({ communications, onUpdate }) => {
  const handlePreferredChange = (
    method: "email" | "phone" | "whatsapp"
  ) => {
    onUpdate({
      ...communications,
      preferredContactMethod: method,
    });
  };

  const handleChannelToggle = (
    key: "allowEmail" | "allowPhone" | "allowWhatsApp" | "allowSMS" | "marketingUpdates"
  ) => {
    onUpdate({
      ...communications,
      [key]: !communications[key],
    });
  };

  return (
    <div id="communication" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Communication Channels & Reachability
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Configure how couples and Wedora concierges can connect with your studio team.
        </p>
      </div>

      {/* Preferred Channel Radio Selector */}
      <div className="space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
          Primary Preferred Contact Method
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { id: "email", label: "Email Direct", desc: "Best for formal quotes & detailed contracts", icon: Mail },
            { id: "phone", label: "Phone Call", desc: "Best for urgent event availability & calls", icon: Phone },
            { id: "whatsapp", label: "WhatsApp Chat", desc: "Best for quick client Q&A & photo samples", icon: Smartphone },
          ].map((option) => {
            const Icon = option.icon;
            const isSelected = communications.preferredContactMethod === option.id;
            return (
              <button
                key={option.id}
                type="button"
                onClick={() =>
                  handlePreferredChange(option.id as "email" | "phone" | "whatsapp")
                }
                className={`p-4 rounded-sm border text-left transition-colors flex flex-col justify-between ${
                  isSelected
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15 hover:border-[#161514]/30"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium">{option.label}</span>
                    <Icon className={`w-4 h-4 ${isSelected ? "text-[#C5A880]" : "text-[#5A5650]"}`} />
                  </div>
                  <p
                    className={`text-[11px] ${
                      isSelected ? "text-[#FAF8F5]/80" : "text-[#5A5650]"
                    }`}
                  >
                    {option.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-[#161514]/10 text-[10px] uppercase tracking-wider font-semibold">
                  {isSelected ? "Selected Channel" : "Click to select"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Allowed Channels Toggles */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
          Allowed Communication Channels
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { key: "allowEmail", label: "Allow Email Inquiries", desc: "Receive lead details to riya@framehouse.example" },
            { key: "allowPhone", label: "Allow Phone Inquiries", desc: "Allow verified couples to see studio phone number" },
            { key: "allowWhatsApp", label: "Allow WhatsApp Direct", desc: "Enable 'Chat on WhatsApp' button on directory profile" },
            { key: "allowSMS", label: "Allow SMS Notifications", desc: "Receive text message reminders for urgent client leads" },
          ].map((channel) => {
            const val = communications[channel.key as keyof VendorCommunicationPreferences] as boolean;
            return (
              <div
                key={channel.key}
                onClick={() =>
                  handleChannelToggle(channel.key as "allowEmail" | "allowPhone" | "allowWhatsApp" | "allowSMS")
                }
                className="flex items-start justify-between p-3.5 bg-white hover:bg-[#FAF8F5] border border-[#161514]/10 rounded-sm cursor-pointer transition-colors"
              >
                <div>
                  <span className="text-xs font-medium text-[#161514] block">
                    {channel.label}
                  </span>
                  <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
                    {channel.desc}
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
      </div>

      {/* Marketing Preference */}
      <div className="pt-4 border-t border-[#161514]/10">
        <div
          onClick={() => handleChannelToggle("marketingUpdates")}
          className="flex items-start justify-between p-3.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm cursor-pointer hover:bg-[#161514]/5 transition-colors"
        >
          <div>
            <span className="text-xs font-medium text-[#161514] block">
              Wedora Industry Insights & Marketing Updates
            </span>
            <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans">
              Receive monthly luxury wedding trends, vendor spotlight tips, and feature updates.
            </span>
          </div>

          <div
            className={`w-9 h-5 rounded-full transition-colors p-0.5 shrink-0 ${
              communications.marketingUpdates ? "bg-[#161514]" : "bg-[#161514]/20"
            }`}
          >
            <div
              className={`w-4 h-4 rounded-full bg-[#FAF8F5] transition-transform ${
                communications.marketingUpdates ? "translate-x-4" : "translate-x-0"
              }`}
            />
          </div>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="text-[11px] text-[#5A5650] bg-[#C5A880]/10 p-3 rounded-sm border border-[#C5A880]/20 flex items-center gap-2">
        <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
        <span>
          These preferences are saved only for this frontend demo — no actual messaging integration or external API calls.
        </span>
      </div>
    </div>
  );
};
