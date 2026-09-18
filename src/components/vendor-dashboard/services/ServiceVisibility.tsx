"use client";

import React from "react";
import { ServiceVisibilityType } from "@/data/vendorServices";

interface ServiceVisibilityProps {
  visibility: ServiceVisibilityType;
  onChange: (status: ServiceVisibilityType) => void;
}

export function ServiceVisibility({ visibility, onChange }: ServiceVisibilityProps) {
  return (
    <div className="space-y-3">
      <label className="text-xs uppercase tracking-wider text-[#2C2A29] font-medium block">
        Public Visibility
      </label>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onChange("PUBLIC")}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            visibility === "PUBLIC"
              ? "bg-[#2C2A29] text-white border-[#2C2A29] shadow-xs"
              : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Public</span>
            {visibility === "PUBLIC" && <span className="w-2 h-2 rounded-full bg-[#C5A880]" />}
          </div>
          <p className={`text-[11px] mt-1 ${visibility === "PUBLIC" ? "text-neutral-300" : "text-[#6E6B65]"}`}>
            Visible to couples on your Wedora profile.
          </p>
        </button>

        <button
          type="button"
          onClick={() => onChange("PRIVATE")}
          className={`p-3.5 rounded-lg border text-left transition-all ${
            visibility === "PRIVATE"
              ? "bg-[#2C2A29] text-white border-[#2C2A29] shadow-xs"
              : "bg-white text-[#2C2A29] border-[#DCD5C9] hover:bg-[#F7F4EF]"
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium">Private</span>
            {visibility === "PRIVATE" && <span className="w-2 h-2 rounded-full bg-[#C5A880]" />}
          </div>
          <p className={`text-[11px] mt-1 ${visibility === "PRIVATE" ? "text-neutral-300" : "text-[#6E6B65]"}`}>
            Only visible inside your vendor studio.
          </p>
        </button>
      </div>
    </div>
  );
}
