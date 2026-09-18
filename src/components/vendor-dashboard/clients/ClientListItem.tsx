"use client";

import React from "react";
import { VendorClient } from "@/data/vendorClients";
import {
  formatClientStatus,
  formatClientPriority,
  formatContactPreference,
} from "@/lib/vendorClients";
import { MapPin, Calendar, ArrowUpRight } from "lucide-react";

interface ClientListItemProps {
  client: VendorClient;
  onSelect: (client: VendorClient) => void;
  isSelected?: boolean;
}

export const ClientListItem: React.FC<ClientListItemProps> = ({
  client,
  onSelect,
  isSelected = false,
}) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "LEAD":
        return "bg-amber-100 text-amber-900 border border-amber-300";
      case "ACTIVE":
        return "bg-[#161514] text-[#FAF8F5]";
      case "UPCOMING":
        return "bg-[#C5A880]/20 text-[#161514] border border-[#C5A880]/40";
      case "COMPLETED":
        return "bg-emerald-100 text-emerald-800 border border-emerald-300";
      case "INACTIVE":
        return "bg-gray-100 text-gray-600 line-through opacity-70";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      {/* Desktop Table Row */}
      <tr
        onClick={() => onSelect(client)}
        className={`hidden md:table-row border-b border-[#161514]/10 cursor-pointer transition-colors group ${
          isSelected
            ? "bg-[#161514]/5"
            : "hover:bg-[#161514]/[0.02]"
        }`}
      >
        {/* Client & Initials */}
        <td className="py-4 px-4 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-medium shrink-0">
              {client.avatarInitials}
            </div>
            <div>
              <div className="font-serif text-base text-[#161514] font-medium group-hover:text-[#C5A880] transition-colors">
                {client.coupleName}
                {client.partnerName ? ` & ${client.partnerName}` : ""}
              </div>
              <div className="text-[10px] font-mono text-[#5A5650] mt-0.5">
                {client.clientReference} &bull; Prefers {formatContactPreference(client.preferredContactMethod)}
              </div>
            </div>
          </div>
        </td>

        {/* Relationship */}
        <td className="py-4 px-4 text-xs">
          <span
            className={`inline-block text-[10px] uppercase font-semibold tracking-wider px-2.5 py-1 ${getStatusBadge(
              client.relationshipStatus
            )}`}
          >
            {formatClientStatus(client.relationshipStatus)}
          </span>
        </td>

        {/* Wedding Date & Destination */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="flex items-center gap-1.5 font-medium">
            <Calendar className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
            <span>
              {client.weddingDate
                ? new Date(client.weddingDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })
                : "Flexible"}
            </span>
          </div>
          <div className="text-[11px] text-[#5A5650] flex items-center gap-1 mt-0.5">
            <MapPin className="w-3 h-3 text-[#5A5650]/60 shrink-0" />
            <span className="line-clamp-1">{client.destination}</span>
          </div>
        </td>

        {/* Services */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="line-clamp-1 max-w-[180px] font-medium">
            {client.services.join(", ")}
          </div>
          <div className="text-[10px] text-[#5A5650]">
            {client.bookingIds.length} Connected Booking{client.bookingIds.length !== 1 ? "s" : ""}
          </div>
        </td>

        {/* Next Action */}
        <td className="py-4 px-4 text-xs text-[#161514]">
          <div className="line-clamp-1 max-w-[200px] text-[11px]">
            {client.nextAction || "No pending milestone action"}
          </div>
        </td>

        {/* Last Contact */}
        <td className="py-4 px-4 text-xs text-[#5A5650]">
          {client.lastContactedAt
            ? new Date(client.lastContactedAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
              })
            : "Not recorded"}
        </td>

        {/* Priority & Action */}
        <td className="py-4 px-4 text-xs text-right">
          <div className="flex items-center justify-end gap-2">
            <span className="text-[10px] uppercase font-semibold tracking-wider text-[#5A5650] border px-2 py-0.5 border-[#161514]/15">
              {formatClientPriority(client.priority)}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(client);
              }}
              className="p-1 text-[#161514] hover:text-[#C5A880] transition-colors"
            >
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </td>
      </tr>

      {/* Mobile Stacked Card View */}
      <div
        onClick={() => onSelect(client)}
        className="md:hidden p-4 border border-[#161514]/10 mb-3 bg-[#FAF8F5] cursor-pointer hover:border-[#161514]/30 transition-all"
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className={`text-[10px] uppercase font-semibold tracking-wider px-2 py-0.5 ${getStatusBadge(
              client.relationshipStatus
            )}`}
          >
            {formatClientStatus(client.relationshipStatus)}
          </span>
          <span className="text-[10px] font-mono text-[#5A5650]">
            {client.clientReference}
          </span>
        </div>

        <div className="flex items-center gap-3 mb-2">
          <div className="w-8 h-8 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xs font-medium shrink-0">
            {client.avatarInitials}
          </div>
          <div>
            <h3 className="font-serif text-lg font-medium text-[#161514]">
              {client.coupleName}
              {client.partnerName ? ` & ${client.partnerName}` : ""}
            </h3>
            <p className="text-xs text-[#5A5650]">{client.destination}</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-[#5A5650] pt-2 border-t border-[#161514]/10">
          <div>{client.services[0] || "Client Package"}</div>
          <div className="font-medium text-[#161514]">
            {client.weddingDate
              ? new Date(client.weddingDate).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                })
              : "Flexible"}
          </div>
        </div>
      </div>
    </>
  );
};
