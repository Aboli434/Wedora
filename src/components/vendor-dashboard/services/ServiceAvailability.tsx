"use client";

import React from "react";
import { ServiceAvailabilityType } from "@/data/vendorServices";

interface ServiceAvailabilityProps {
  availability: ServiceAvailabilityType;
  onChange: (status: ServiceAvailabilityType) => void;
}

const OPTIONS: {
  value: ServiceAvailabilityType;
  label: string;
  description: string;
}[] = [
  {
    value: "AVAILABLE",
    label: "Available",
    description: "This service is currently open for enquiries.",
  },
  {
    value: "LIMITED",
    label: "Limited",
    description: "Accepting a limited number of bookings.",
  },
  {
    value: "UNAVAILABLE",
    label: "Unavailable",
    description: "Not currently accepting enquiries.",
  },
];

export function ServiceAvailability({ availability, onChange }: ServiceAvailabilityProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block">
        Booking Availability
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {OPTIONS.map((opt) => {
          const isSelected = availability === opt.value;
          return (
            <button
              type="button"
              key={opt.value}
              onClick={() => onChange(opt.value)}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                isSelected
                  ? "bg-[#2C2A29] text-white border-[#2C2A29] shadow-xs"
                  : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium">{opt.label}</span>
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#C5A880]" />}
              </div>
              <p className={`text-[11px] mt-1 ${isSelected ? "text-neutral-300" : "text-[#6E6B65]"}`}>
                {opt.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
