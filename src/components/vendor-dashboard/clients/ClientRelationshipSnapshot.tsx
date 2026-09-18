"use client";

import React from "react";
import { VendorClient } from "@/data/vendorClients";
import { formatContactPreference } from "@/lib/vendorClients";
import { Clock, Mail, Calendar } from "lucide-react";

interface ClientRelationshipSnapshotProps {
  client: VendorClient;
}

export const ClientRelationshipSnapshot: React.FC<ClientRelationshipSnapshotProps> = ({
  client,
}) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 bg-white border border-[#161514]/10 mb-8 text-xs">
      <div>
        <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
          <Calendar className="w-3.5 h-3.5 text-[#C5A880]" />
          Relationship Since
        </div>
        <div className="font-medium text-[#161514]">
          {new Date(client.createdAt).toLocaleDateString("en-IN", {
            month: "short",
            year: "numeric",
          })}
        </div>
        <div className="text-[10px] text-[#5A5650]">Source: {client.source}</div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
          <Clock className="w-3.5 h-3.5 text-[#C5A880]" />
          Last Contacted
        </div>
        <div className="font-medium text-[#161514]">
          {client.lastContactedAt
            ? new Date(client.lastContactedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            : "No record"}
        </div>
        <div className="text-[10px] text-[#5A5650]">
          Prefers {formatContactPreference(client.preferredContactMethod)}
        </div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
          <Mail className="w-3.5 h-3.5 text-[#C5A880]" />
          Contact Info
        </div>
        <div className="font-medium text-[#161514] truncate">{client.email}</div>
        <div className="text-[10px] text-[#5A5650]">{client.phone || "No phone"}</div>
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-[#5A5650] uppercase tracking-wider text-[10px] mb-1 font-semibold">
          Connected Assets
        </div>
        <div className="font-medium text-[#161514]">
          {client.bookingIds.length} Bookings &bull; {client.events.length} Events
        </div>
        <div className="text-[10px] text-[#5A5650]">
          {client.services.length} Services contracted
        </div>
      </div>
    </div>
  );
};
