"use client";

import React from "react";
import { VendorClient } from "@/data/vendorClients";
import { calculateClientCompletion } from "@/lib/vendorClients";

interface ClientCompletionProps {
  client: VendorClient;
}

export const ClientCompletion: React.FC<ClientCompletionProps> = ({ client }) => {
  const completionPct = calculateClientCompletion(client);

  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
          CLIENT PROFILE COMPLETENESS
        </span>
        <span className="font-serif text-lg font-medium text-[#161514]">
          {completionPct}%
        </span>
      </div>

      <div className="w-full h-2 bg-[#161514]/10 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-[#161514] transition-all duration-300"
          style={{ width: `${completionPct}%` }}
        />
      </div>

      <p className="text-[11px] text-[#5A5650] leading-relaxed">
        Operational record completeness based on contact data, destination, wedding date, venue, contracted services, and pending actions.
      </p>
    </div>
  );
};
