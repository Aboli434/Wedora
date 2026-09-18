"use client";

import React from "react";
import { VendorEnquiryPreferences } from "@/data/vendorSettings";
import { Inbox, Check, Clock, CalendarDays } from "lucide-react";

interface VendorEnquirySettingsProps {
  enquiries: VendorEnquiryPreferences;
  onUpdate: (updatedEnquiries: VendorEnquiryPreferences) => void;
}

export const ALL_EVENT_TYPES = [
  "Wedding Ceremony",
  "Reception",
  "Sangeet",
  "Mehendi",
  "Haldi",
  "Engagement",
  "Pre-Wedding Shoot",
  "Cocktail Party",
];

export const VendorEnquirySettings: React.FC<VendorEnquirySettingsProps> = ({
  enquiries,
  onUpdate,
}) => {
  const handleToggle = (key: keyof VendorEnquiryPreferences) => {
    onUpdate({
      ...enquiries,
      [key]: !enquiries[key],
    });
  };

  const handleSelectNumber = (
    key: "responseReminderHours" | "minimumLeadTimeDays",
    val: number
  ) => {
    onUpdate({
      ...enquiries,
      [key]: val,
    });
  };

  const handleEventTypeToggle = (eventType: string) => {
    const current = enquiries.preferredEventTypes || [];
    const exists = current.includes(eventType);
    const updated = exists
      ? current.filter((t) => t !== eventType)
      : [...current, eventType];

    onUpdate({
      ...enquiries,
      preferredEventTypes: updated,
    });
  };

  return (
    <div id="enquiries" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Inbox className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Enquiry & Lead Intake Rules
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Define how client inquiries are accepted, SLA response triggers, and preferred wedding events.
        </p>
      </div>

      {/* Main Feature Toggles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {[
          { key: "acceptNewEnquiries", title: "Accept New Enquiries", desc: "Allow couples to submit new lead forms via Wedora" },
          { key: "autoAcknowledgeEnquiries", title: "Auto-Acknowledge Receipts", desc: "Send instant automated receipt note to inquiring couples" },
          { key: "weekendEnquiries", title: "Weekend Intake Enabled", desc: "Accept incoming lead notifications on Saturdays & Sundays" },
        ].map((item) => {
          const val = enquiries[item.key as keyof VendorEnquiryPreferences] as boolean;
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key as keyof VendorEnquiryPreferences)}
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

      {/* Response SLA Reminder Option */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-3">
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
          <label className="text-xs font-semibold uppercase tracking-wider text-[#161514]">
            Response SLA Warning Timing
          </label>
        </div>
        <p className="text-xs text-[#5A5650]">
          Trigger internal reminder warnings when an inquiry remains unresponded.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {[4, 12, 24, 48].map((hours) => (
            <button
              key={hours}
              type="button"
              onClick={() => handleSelectNumber("responseReminderHours", hours)}
              className={`px-4 py-2 text-xs font-medium rounded-sm border transition-colors ${
                enquiries.responseReminderHours === hours
                  ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                  : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15 hover:border-[#161514]/30"
              }`}
            >
              {hours} Hours SLA
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Lead Time */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-3.5 h-3.5 text-[#C5A880]" />
          <label className="text-xs font-semibold uppercase tracking-wider text-[#161514]">
            Minimum Booking Lead Time
          </label>
        </div>
        <p className="text-xs text-[#5A5650]">
          Minimum advance notice required before event date to accept inquiries.
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {[0, 3, 7, 14, 30].map((days) => (
            <button
              key={days}
              type="button"
              onClick={() => handleSelectNumber("minimumLeadTimeDays", days)}
              className={`px-4 py-2 text-xs font-medium rounded-sm border transition-colors ${
                enquiries.minimumLeadTimeDays === days
                  ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                  : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15 hover:border-[#161514]/30"
              }`}
            >
              {days === 0 ? "Same Day Allowed" : `${days} Days Advance`}
            </button>
          ))}
        </div>
      </div>

      {/* Preferred Event Types Multi-Select */}
      <div className="pt-4 border-t border-[#161514]/10 space-y-3">
        <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
          Preferred Event Ceremonies
        </label>
        <p className="text-xs text-[#5A5650]">
          Select ceremony types your studio specializes in capturing or servicing.
        </p>

        <div className="flex flex-wrap gap-2 pt-1">
          {ALL_EVENT_TYPES.map((eventType) => {
            const isSelected = (enquiries.preferredEventTypes || []).includes(eventType);
            return (
              <button
                key={eventType}
                type="button"
                onClick={() => handleEventTypeToggle(eventType)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm text-xs font-medium border transition-colors ${
                  isSelected
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#5A5650] hover:text-[#161514] border-[#161514]/15"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-[#C5A880]" />}
                {eventType}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
