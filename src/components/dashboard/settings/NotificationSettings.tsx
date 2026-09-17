"use client";

import React from "react";
import { NotificationPreferences } from "@/data/settings";
import { getEnabledNotificationCount } from "@/lib/settings";

interface NotificationSettingsProps {
  notifications: NotificationPreferences;
  onChange: (updated: NotificationPreferences) => void;
}

interface NotificationItem {
  key: keyof NotificationPreferences;
  title: string;
  description: string;
}

const ITEMS: NotificationItem[] = [
  {
    key: "planningReminders",
    title: "Planning reminders",
    description: "Receive reminders when an important planning task is approaching.",
  },
  {
    key: "upcomingEventReminders",
    title: "Upcoming event reminders",
    description: "Get timely notifications before pre-wedding & wedding ceremonies.",
  },
  {
    key: "guestUpdates",
    title: "Guest updates",
    description: "Stay notified when guests submit RSVPs or update dietary preferences.",
  },
  {
    key: "vendorUpdates",
    title: "Vendor updates",
    description: "Receive alerts on proposal updates, contract status, and vendor messages.",
  },
  {
    key: "budgetAlerts",
    title: "Budget alerts",
    description: "Get notified when category targets or payment due dates are reached.",
  },
  {
    key: "checklistReminders",
    title: "Checklist reminders",
    description: "Weekly summary of outstanding checklist items and upcoming deadlines.",
  },
];

export function NotificationSettings({ notifications, onChange }: NotificationSettingsProps) {
  const enabledCount = getEnabledNotificationCount(notifications);
  const totalCount = ITEMS.length;

  const handleToggle = (key: keyof NotificationPreferences) => {
    onChange({
      ...notifications,
      [key]: !notifications[key],
    });
  };

  return (
    <section id="notifications" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#E8E2D9] pb-5">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Planning notifications</h2>
          <p className="text-sm text-[#6E6B65] mt-1">
            Choose the moments when Wedora should keep you informed.
          </p>
        </div>
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-[#F2ECE4] border border-[#E5DEC9] text-xs font-medium text-[#594B3C]">
          <span>{enabledCount} of {totalCount} notifications enabled</span>
        </div>
      </div>

      <div className="divide-y divide-[#E8E2D9]">
        {ITEMS.map((item) => {
          const isChecked = notifications[item.key];
          return (
            <div key={item.key} className="py-4 first:pt-0 last:pb-0 flex items-start justify-between gap-4">
              <div className="pr-4">
                <label id={`label-${item.key}`} className="text-sm font-medium text-[#2C2A29] cursor-pointer" onClick={() => handleToggle(item.key)}>
                  {item.title}
                </label>
                <p className="text-xs text-[#6E6B65] mt-0.5">{item.description}</p>
              </div>

              <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                aria-labelledby={`label-${item.key}`}
                onClick={() => handleToggle(item.key)}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#C5A880] focus:ring-offset-2 ${
                  isChecked ? "bg-[#2C2A29]" : "bg-[#D9D3C7]"
                }`}
              >
                <span
                  aria-hidden="true"
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    isChecked ? "translate-x-5" : "translate-x-0"
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>

      <div className="pt-2 border-t border-[#E8E2D9]">
        <p className="text-xs text-[#8C857B] italic">
          Demo only — changes update the active session view instantly.
        </p>
      </div>
    </section>
  );
}
