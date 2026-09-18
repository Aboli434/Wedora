"use client";

import React from "react";
import { VendorAvailabilityPreferences } from "@/data/vendorSettings";
import { formatWorkingDays, formatTimezone } from "@/lib/vendorSettings";
import { Clock, Info } from "lucide-react";

interface VendorAvailabilitySettingsProps {
  availability: VendorAvailabilityPreferences;
  onUpdate: (updatedAvailability: VendorAvailabilityPreferences) => void;
}

export const ALL_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const VendorAvailabilitySettings: React.FC<
  VendorAvailabilitySettingsProps
> = ({ availability, onUpdate }) => {
  const handleWorkingDayToggle = (day: string) => {
    const current = availability.workingDays || [];
    const exists = current.includes(day);
    const updated = exists
      ? current.filter((d) => d !== day)
      : [...current, day];

    onUpdate({
      ...availability,
      workingDays: updated,
    });
  };

  const handleChangeField = (
    key: keyof VendorAvailabilityPreferences,
    value: unknown
  ) => {
    onUpdate({
      ...availability,
      [key]: value,
    });
  };

  return (
    <div id="availability" className="bg-white border border-[#161514]/10 rounded-sm p-6 space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Clock className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-xl font-medium text-[#161514]">
            Studio Availability & Operational Hours
          </h3>
        </div>
        <p className="text-xs text-[#5A5650] mt-1 font-sans">
          Configure active studio workdays, team shoot buffers, and max daily event limits.
        </p>
      </div>

      {/* Working Days Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold uppercase tracking-wider text-[#161514]">
            Studio Working Days
          </label>
          <span className="text-xs font-mono text-[#5A5650]">
            {formatWorkingDays(availability.workingDays)}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {ALL_DAYS.map((day) => {
            const isSelected = availability.workingDays.includes(day);
            return (
              <button
                key={day}
                type="button"
                onClick={() => handleWorkingDayToggle(day)}
                className={`px-3.5 py-2 text-xs font-medium rounded-sm border transition-colors ${
                  isSelected
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#5A5650] hover:text-[#161514] border-[#161514]/15"
                }`}
              >
                {day.slice(0, 3)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Default Working Hours & Timezone */}
      <div className="pt-4 border-t border-[#161514]/10 grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div>
          <label htmlFor="workingStart" className="block text-xs font-medium text-[#161514] mb-1.5">
            Default Daily Start Time
          </label>
          <input
            id="workingStart"
            type="time"
            value={availability.defaultWorkingStart}
            onChange={(e) => handleChangeField("defaultWorkingStart", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514]"
          />
        </div>

        <div>
          <label htmlFor="workingEnd" className="block text-xs font-medium text-[#161514] mb-1.5">
            Default Daily End Time
          </label>
          <input
            id="workingEnd"
            type="time"
            value={availability.defaultWorkingEnd}
            onChange={(e) => handleChangeField("defaultWorkingEnd", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514]"
          />
        </div>

        <div>
          <label htmlFor="timezone" className="block text-xs font-medium text-[#161514] mb-1.5">
            Studio Operating Timezone
          </label>
          <select
            id="timezone"
            value={availability.timezone}
            onChange={(e) => handleChangeField("timezone", e.target.value)}
            className="w-full px-3 py-2 text-xs border border-[#161514]/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-[#161514]"
          >
            <option value="Asia/Kolkata">Asia/Kolkata (IST +5:30)</option>
            <option value="Asia/Dubai">Asia/Dubai (GST +4:00)</option>
            <option value="Europe/London">Europe/London (GMT/BST)</option>
            <option value="America/New_York">America/New_York (EST)</option>
          </select>
          <p className="text-[10px] text-[#5A5650] mt-1">
            {formatTimezone(availability.timezone)}
          </p>
        </div>
      </div>

      {/* Buffers & Max Events */}
      <div className="pt-4 border-t border-[#161514]/10 grid grid-cols-1 sm:grid-cols-3 gap-5">
        {/* Buffer Before */}
        <div>
          <label className="block text-xs font-medium text-[#161514] mb-1.5">
            Prep Buffer Before Event
          </label>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((hours) => (
              <button
                key={hours}
                type="button"
                onClick={() => handleChangeField("bufferBeforeEventHours", hours)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border ${
                  availability.bufferBeforeEventHours === hours
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15"
                }`}
              >
                {hours}h
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#5A5650] mt-1 block">
            Setup & travel gear check time
          </span>
        </div>

        {/* Buffer After */}
        <div>
          <label className="block text-xs font-medium text-[#161514] mb-1.5">
            Wrap Buffer After Event
          </label>
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((hours) => (
              <button
                key={hours}
                type="button"
                onClick={() => handleChangeField("bufferAfterEventHours", hours)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border ${
                  availability.bufferAfterEventHours === hours
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15"
                }`}
              >
                {hours}h
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#5A5650] mt-1 block">
            Data offload & return travel buffer
          </span>
        </div>

        {/* Max Events Per Day */}
        <div>
          <label className="block text-xs font-medium text-[#161514] mb-1.5">
            Max Events Serviced / Day
          </label>
          <div className="flex items-center gap-1.5">
            {[1, 2, 3, 4].map((count) => (
              <button
                key={count}
                type="button"
                onClick={() => handleChangeField("maxEventsPerDay", count)}
                className={`px-3 py-1.5 text-xs font-medium rounded-sm border ${
                  availability.maxEventsPerDay === count
                    ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                    : "bg-[#FAF8F5] text-[#161514] border-[#161514]/15"
                }`}
              >
                {count} {count === 1 ? "Event" : "Events"}
              </button>
            ))}
          </div>
          <span className="text-[10px] text-[#5A5650] mt-1 block">
            Auto-block date once limit is reached
          </span>
        </div>
      </div>

      {/* Demo Notice */}
      <div className="text-[11px] text-[#5A5650] bg-[#C5A880]/10 p-3 rounded-sm border border-[#C5A880]/20 flex items-center gap-2">
        <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
        <span>
          These preferences are used only to demonstrate future scheduling behavior — they do not modify the existing Calendar dataset automatically.
        </span>
      </div>
    </div>
  );
};
