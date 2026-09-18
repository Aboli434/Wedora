"use client";

import React from "react";
import Link from "next/link";
import { VendorClient, ClientPriority } from "@/data/vendorClients";
import { formatClientStatus, formatWeddingStatus } from "@/lib/vendorClients";
import { Edit, MessageSquare, CalendarCheck, FileText } from "lucide-react";

interface ClientProfileHeaderProps {
  client: VendorClient;
  onOpenEditModal: () => void;
  onOpenRecordContact: () => void;
  onUpdatePriority: (priority: ClientPriority) => void;
}

export const ClientProfileHeader: React.FC<ClientProfileHeaderProps> = ({
  client,
  onOpenEditModal,
  onOpenRecordContact,
  onUpdatePriority,
}) => {
  return (
    <div className="bg-white border border-[#161514]/10 p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        {/* Couple & Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-[#161514] text-[#FAF8F5] flex items-center justify-center font-serif text-xl font-medium shrink-0">
            {client.avatarInitials}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-mono font-semibold text-[#5A5650] uppercase tracking-wider">
                {client.clientReference}
              </span>
              <span className="text-xs text-[#5A5650]">&bull;</span>
              <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 bg-[#161514] text-[#FAF8F5]">
                {formatClientStatus(client.relationshipStatus)}
              </span>
            </div>

            <h2 className="font-serif text-2xl md:text-3xl font-medium text-[#161514] tracking-tight">
              {client.coupleName}
              {client.partnerName ? ` & ${client.partnerName}` : ""}
            </h2>

            <div className="flex items-center gap-3 text-xs text-[#5A5650] mt-1">
              <span>{client.destination}</span>
              <span>&bull;</span>
              <span>{formatWeddingStatus(client.weddingStatus)}</span>
            </div>
          </div>
        </div>

        {/* Priority & Quick Action Buttons */}
        <div className="flex flex-col items-start md:items-end gap-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5A5650]">
              PRIORITY:
            </span>
            <div className="flex items-center gap-1">
              {(["HIGH", "NORMAL", "LOW"] as ClientPriority[]).map((p) => (
                <button
                  key={p}
                  onClick={() => onUpdatePriority(p)}
                  className={`px-2.5 py-1 text-[10px] font-medium transition-colors ${
                    client.priority === p
                      ? "bg-[#161514] text-[#FAF8F5]"
                      : "bg-[#FAF8F5] text-[#5A5650] border border-[#161514]/15 hover:bg-white"
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={onOpenEditModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-xs font-medium hover:bg-[#FAF8F5] transition-colors text-[#161514]"
            >
              <Edit className="w-3.5 h-3.5 text-[#5A5650]" />
              Edit Profile
            </button>
            <button
              onClick={onOpenRecordContact}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#161514]/90 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5 text-[#C5A880]" />
              Record Contact
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Shortcuts */}
      <div className="mt-6 pt-4 border-t border-[#161514]/10 flex items-center gap-4 text-xs flex-wrap">
        {client.bookingIds.length > 0 && (
          <Link
            href="/vendor/dashboard/bookings"
            className="inline-flex items-center gap-1 text-[#161514] font-medium hover:text-[#C5A880] transition-colors"
          >
            <CalendarCheck className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View Connected Bookings ({client.bookingIds.length})</span>
          </Link>
        )}

        {client.enquiryId && (
          <Link
            href="/vendor/dashboard/enquiries"
            className="inline-flex items-center gap-1 text-[#161514] font-medium hover:text-[#C5A880] transition-colors"
          >
            <FileText className="w-3.5 h-3.5 text-[#C5A880]" />
            <span>View Origin Enquiry #{client.enquiryId}</span>
          </Link>
        )}
      </div>
    </div>
  );
};
