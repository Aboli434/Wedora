"use client";

import React, { useEffect } from "react";
import {
  VendorClient,
  ClientRelationshipStatus,
  ClientPriority,
} from "@/data/vendorClients";
import { ClientProfileHeader } from "./ClientProfileHeader";
import { ClientRelationshipSnapshot } from "./ClientRelationshipSnapshot";
import { ClientStatusControl } from "./ClientStatusControl";
import { ClientCompletion } from "./ClientCompletion";
import { ClientContactActions } from "./ClientContactActions";
import { ClientBookings } from "./ClientBookings";
import { ClientUpcomingEvents } from "./ClientUpcomingEvents";
import { ClientServices } from "./ClientServices";
import { ClientNotes } from "./ClientNotes";
import { ClientActivity } from "./ClientActivity";
import { ContextualLink } from "@/components/common/ContextualLink";
import { X } from "lucide-react";

interface ClientDetailProps {
  client: VendorClient | null;
  onClose: () => void;
  onUpdateStatus: (clientId: string, newStatus: ClientRelationshipStatus) => void;
  onUpdatePriority: (clientId: string, priority: ClientPriority) => void;
  onSaveNotes: (clientId: string, notes: string) => void;
  onDeleteNotes: (clientId: string) => void;
  onOpenEditModal: (client: VendorClient) => void;
  onOpenRecordContact: (client: VendorClient) => void;
}

export const ClientDetail: React.FC<ClientDetailProps> = ({
  client,
  onClose,
  onUpdateStatus,
  onUpdatePriority,
  onSaveNotes,
  onDeleteNotes,
  onOpenEditModal,
  onOpenRecordContact,
}) => {
  // ESC key listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!client) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#161514]/60 backdrop-blur-xs transition-opacity duration-200"
      aria-modal="true"
      role="dialog"
      aria-labelledby="client-detail-title"
    >
      {/* Click outside to close */}
      <div className="flex-1 hidden md:block cursor-pointer" onClick={onClose} />

      {/* Side Panel Workspace */}
      <div className="w-full max-w-3xl bg-[#FAF8F5] h-full overflow-y-auto border-l border-[#161514]/20 p-6 md:p-8 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between pb-6 mb-6 border-b border-[#161514]/10">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
                CLIENT RELATIONSHIP DOSSIER
              </span>
              <span className="text-xs text-[#161514] font-mono font-semibold px-2 py-0.5 bg-white border border-[#161514]/15">
                {client.clientReference}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#C5A880]"
              aria-label="Close client dossier"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Profile Header */}
          <ClientProfileHeader
            client={client}
            onOpenEditModal={() => onOpenEditModal(client)}
            onOpenRecordContact={() => onOpenRecordContact(client)}
            onUpdatePriority={(p) => onUpdatePriority(client.id, p)}
          />

          {/* Relationship Stage Control */}
          <ClientStatusControl
            currentStatus={client.relationshipStatus}
            onChangeStatus={(st) => onUpdateStatus(client.id, st)}
          />

          {/* Snapshot Summary */}
          <ClientRelationshipSnapshot client={client} />

          {/* Operational Completeness Bar */}
          <ClientCompletion client={client} />

          {/* Direct Communication Actions (Demo) */}
          <ClientContactActions client={client} />

          {/* Connected Contract Bookings */}
          <ClientBookings
            bookingIds={client.bookingIds}
            coupleName={client.coupleName}
          />

          {/* Scheduled Ceremony Events */}
          <ClientUpcomingEvents events={client.events} />

          {/* Associated Services */}
          <ClientServices services={client.services} />

          {/* Connected Original Enquiry if available */}
          {client.enquiryId && (
            <div className="mb-8 p-4 bg-white border border-[#161514]/10 text-xs">
              <ContextualLink
                label="Enquiry"
                value={`Original enquiry #${client.enquiryId}`}
                href="/vendor/dashboard/enquiries"
                linkText="View original enquiry →"
              />
            </div>
          )}

          {/* Private Notes */}
          <ClientNotes
            notes={client.notes}
            onSaveNotes={(n) => onSaveNotes(client.id, n)}
            onDeleteNotes={() => onDeleteNotes(client.id)}
          />

          {/* Activity Trail */}
          <ClientActivity activities={client.activities} />
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-[#161514]/10 flex items-center justify-between">
          <span className="text-xs text-[#5A5650]">
            Last modified {new Date(client.updatedAt).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
