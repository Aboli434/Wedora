"use client";

import React, { useState } from "react";
import { VendorBusinessProfile } from "@/data/vendorBusiness";
import { X, Plus, MapPin } from "lucide-react";

interface ServiceAreasProps {
  profile: VendorBusinessProfile;
  serviceAreas: string[];
  onChange: (updated: string[]) => void;
}

const COMMON_CITIES = [
  "Mumbai",
  "Pune",
  "Udaipur",
  "Jaipur",
  "Goa",
  "Delhi NCR",
  "Bengaluru",
  "Hyderabad",
  "Kolkata",
  "International / Destination",
];

export function ServiceAreas({ profile, serviceAreas, onChange }: ServiceAreasProps) {
  const [newCityInput, setNewCityInput] = useState("");

  const handleAddCity = (cityToAdd: string) => {
    const trimmed = cityToAdd.trim();
    if (!trimmed || serviceAreas.includes(trimmed)) return;
    onChange([...serviceAreas, trimmed]);
    setNewCityInput("");
  };

  const handleRemoveCity = (cityToRemove: string) => {
    onChange(serviceAreas.filter((c) => c !== cityToRemove));
  };

  return (
    <section id="service-areas" className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="border-b border-[#E8E2D9] pb-5">
        <h2 className="font-serif text-2xl text-[#2C2A29]">Where you work</h2>
        <p className="text-xs text-[#6E6B65] mt-1">
          Help couples understand where your studio is available for destination and local celebrations.
        </p>
      </div>

      <div className="space-y-6">
        {/* Primary Base Location */}
        <div className="p-4 rounded-lg bg-white border border-[#E8E2D9] flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#F2ECE4] border border-[#E5DEC9] flex items-center justify-center shrink-0 text-[#C5A880]">
            <MapPin className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] uppercase tracking-wider text-[#8C857B] font-semibold block">
              PRIMARY STUDIO BASE
            </span>
            <p className="text-sm font-medium text-[#2C2A29]">{profile.location}</p>
          </div>
        </div>

        {/* Selected Service Areas Chips */}
        <div className="space-y-3">
          <label className="text-xs uppercase tracking-wider text-[#8C857B] font-medium block">
            Active Destination &amp; Travel Service Areas
          </label>
          <div className="flex flex-wrap gap-2">
            {serviceAreas.map((city) => (
              <span
                key={city}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#DCD5C9] text-xs font-medium text-[#2C2A29] shadow-2xs"
              >
                <span>{city}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveCity(city)}
                  className="text-[#8C857B] hover:text-rose-700 focus:outline-none"
                  aria-label={`Remove ${city} from service areas`}
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>

        {/* Quick Add Suggestions */}
        <div className="space-y-2 pt-2 border-t border-[#E8E2D9]">
          <span className="text-[11px] text-[#8C857B] font-medium block">
            Add common wedding destinations:
          </span>
          <div className="flex flex-wrap gap-2">
            {COMMON_CITIES.filter((c) => !serviceAreas.includes(c)).map((city) => (
              <button
                type="button"
                key={city}
                onClick={() => handleAddCity(city)}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#F2ECE4] hover:bg-[#EAE4DB] border border-[#E5DEC9] text-xs text-[#594B3C] transition-colors"
              >
                <Plus className="w-3 h-3 text-[#C5A880]" />
                <span>{city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Custom Input */}
        <div className="flex gap-2 max-w-md">
          <input
            type="text"
            value={newCityInput}
            onChange={(e) => setNewCityInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddCity(newCityInput);
              }
            }}
            placeholder="Add custom location..."
            className="flex-1 bg-white border border-[#DCD5C9] rounded-lg px-3.5 py-2 text-sm text-[#2C2A29] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
          />
          <button
            type="button"
            onClick={() => handleAddCity(newCityInput)}
            className="px-4 py-2 text-xs font-medium uppercase tracking-wider text-white bg-[#2C2A29] rounded-md hover:bg-[#1A1918]"
          >
            Add
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-[#E8E2D9]">
        <p className="text-xs text-[#8C857B] italic">
          Demo availability only — no real address or geolocation tracking.
        </p>
      </div>
    </section>
  );
}
