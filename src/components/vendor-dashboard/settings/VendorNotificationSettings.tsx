"use client";

import React from "react";
import { VendorNotificationPreferences } from "@/data/vendorSettings";
import { calculateEnabledNotificationCount } from "@/lib/vendorSettings";
import { Bell, CheckCircle, BellOff, Info } from "lucide-react";

interface VendorNotificationSettingsProps {
  notifications: VendorNotificationPreferences;
  onUpdate: (updatedNotifications: VendorNotificationPreferences) => void;
}

export const VendorNotificationSettings: React.FC<
  VendorNotificationSettingsProps
> = ({ notifications, onUpdate }) => {
  const { enabled, total } = calculateEnabledNotificationCount(notifications);

  const toggleItems: { key: keyof VendorNotificationPreferences; title: string; desc: string }[] = [
    { key: "newEnquiry", title: "New Enquiry Alerts", desc: "Instant notifications when a new couple submits a booking inquiry" },
    { key: "enquiryReminder", title: "Enquiry Response Reminders", desc: "Alerts when an unresponded enquiry is approaching SLA limits" },
    { key: "bookingCreated", title: "Booking Confirmation Alerts", desc: "Notifications when an enquiry transitions to a confirmed booking" },
    { key: "bookingReminder", title: "Booking Milestone Reminders", desc: "Upcoming wedding date and shoot preparation milestones" },
    { key: "paymentDue", title: "Payment Milestone Due", desc: "Notifications when installment payment dates are approaching" },
    { key: "paymentReceived", title: "Payment Received Receipts", desc: "Alerts when clients record advance or full payment transactions" },
    { key: "reviewReceived", title: "New Client Review Posted", desc: "Instant alert when a couple posts a review for your studio" },
    { key: "reviewResponseReminder", title: "Review Response Reminders", desc: "Reminders to post studio acknowledgments for new reviews" },
    { key: "calendarReminder", title: "Calendar & Schedule Alerts", desc: "Daily operational schedule summaries and buffer warnings" },
    { key: "profileIncomplete", title: "Profile Optimization Hints", desc: "Suggestions when new directory features or profile gaps exist" },
  ];

  const handleToggle = (key: keyof VendorNotificationPreferences) => {
    onUpdate({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  const handleEnableAll = () => {
    const allTrue = { ...notifications };
    toggleItems.forEach((item) => {
      allTrue[item.key] = true;
    });
    onUpdate(allTrue);
  };

  const handleDisableAll = () => {
    const allFalse = { ...notifications };
    toggleItems.forEach((item) => {
      allFalse[item.key] = false;
    });
    onUpdate(allFalse);
  };

  return (
    <div id="notifications" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header & Quick Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#161514]/10 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-xl font-medium text-[#161514]">
              Notification Preferences
            </h3>
          </div>
          <p className="text-xs text-[#5A5650] mt-1 font-sans">
            Choose which operational updates, reminders, and alerts your studio receives.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 self-start">
          <button
            type="button"
            onClick={handleEnableAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
          >
            <CheckCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            Enable All
          </button>
          <button
            type="button"
            onClick={handleDisableAll}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-[#5A5650] text-xs font-medium uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
          >
            <BellOff className="w-3.5 h-3.5" />
            Disable All
          </button>
        </div>
      </div>

      {/* Dynamic Summary Banner */}
      <div className="flex items-center justify-between p-3.5 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-xs">
        <span className="font-medium text-[#161514]">
          {enabled} of {total} notification types active
        </span>
        <span className="text-[11px] font-mono text-[#5A5650]">
          {Math.round((enabled / total) * 100)}% Coverage
        </span>
      </div>

      {/* Toggles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {toggleItems.map((item) => {
          const isChecked = notifications[item.key];
          return (
            <div
              key={item.key}
              onClick={() => handleToggle(item.key)}
              className="flex items-start justify-between p-3.5 bg-white hover:bg-[#FAF8F5] border border-[#161514]/10 rounded-sm cursor-pointer transition-colors"
            >
              <div className="pr-3">
                <span className="text-xs font-medium text-[#161514] block">
                  {item.title}
                </span>
                <span className="text-[11px] text-[#5A5650] block mt-0.5 font-sans leading-relaxed">
                  {item.desc}
                </span>
              </div>

              <div
                className={`w-9 h-5 rounded-full transition-colors p-0.5 shrink-0 ${
                  isChecked ? "bg-[#161514]" : "bg-[#161514]/20"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-[#FAF8F5] transition-transform ${
                    isChecked ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Notice */}
      <div className="text-[11px] text-[#5A5650] bg-[#C5A880]/10 p-3 rounded-sm border border-[#C5A880]/20 flex items-center gap-2">
        <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
        <span>
          Demo alert rules: No actual email, SMS, or push notifications are dispatched during this session demo.
        </span>
      </div>
    </div>
  );
};
