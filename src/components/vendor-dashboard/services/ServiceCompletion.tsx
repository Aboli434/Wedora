"use client";

import React from "react";
import { VendorService } from "@/data/vendorServices";
import { calculateServiceCompletion } from "@/lib/vendorServices";

interface ServiceCompletionProps {
  service: VendorService;
}

export function ServiceCompletion({ service }: ServiceCompletionProps) {
  const score = calculateServiceCompletion(service);

  let advice = "Service profile is complete and clear.";
  if (!service.description || service.description.length < 30) {
    advice = "Add a detailed description to help couples understand your approach.";
  } else if (!service.inclusions || service.inclusions.length === 0) {
    advice = "Add package inclusions so couples know what is included.";
  } else if (!service.delivery) {
    advice = "Add gallery delivery details to clarify turnaround times.";
  } else if (score < 100) {
    advice = "Add duration & package details to reach 100% completion.";
  }

  return (
    <div className="p-4 rounded-lg bg-white border border-[#E8E2D9] space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-[#2C2A29]">Service Profile Completion</span>
        <span className="font-mono text-[#C5A880] font-semibold">{score}% Complete</span>
      </div>

      <div className="w-full h-1.5 bg-[#E8E2D9] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#C5A880] transition-all duration-500 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>

      <p className="text-[11px] text-[#6E6B65] italic">{advice}</p>
    </div>
  );
}
