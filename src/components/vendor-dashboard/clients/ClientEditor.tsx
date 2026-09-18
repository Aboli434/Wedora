"use client";

import React, { useState } from "react";
import {
  VendorClient,
  ClientRelationshipStatus,
  ClientPriority,
  ClientSource,
  ClientContactPreference,
  ClientWeddingStatus,
} from "@/data/vendorClients";
import { X, Check } from "lucide-react";

interface ClientEditorProps {
  isOpen: boolean;
  onClose: () => void;
  clientToEdit?: VendorClient | null;
  onSave: (client: Partial<VendorClient>) => void;
}

export const ClientEditor: React.FC<ClientEditorProps> = ({
  isOpen,
  onClose,
  clientToEdit,
  onSave,
}) => {
  const isEdit = !!clientToEdit;

  const [coupleName, setCoupleName] = useState(clientToEdit?.coupleName || "");
  const [partnerName, setPartnerName] = useState(clientToEdit?.partnerName || "");
  const [email, setEmail] = useState(clientToEdit?.email || "");
  const [phone, setPhone] = useState(clientToEdit?.phone || "");
  const [alternatePhone, setAlternatePhone] = useState(clientToEdit?.alternatePhone || "");
  const [preferredContactMethod, setPreferredContactMethod] =
    useState<ClientContactPreference>(
      clientToEdit?.preferredContactMethod || "EMAIL"
    );

  const [destination, setDestination] = useState(clientToEdit?.destination || "Mumbai");
  const [venue, setVenue] = useState(clientToEdit?.venue || "");
  const [weddingDate, setWeddingDate] = useState(clientToEdit?.weddingDate || "");
  const [weddingDateStatus, setWeddingDateStatus] = useState<"CONFIRMED" | "FLEXIBLE">(
    clientToEdit?.weddingDateStatus || "CONFIRMED"
  );
  const [guestCount, setGuestCount] = useState<number | undefined>(
    clientToEdit?.guestCount || 150
  );

  const [relationshipStatus, setRelationshipStatus] =
    useState<ClientRelationshipStatus>(clientToEdit?.relationshipStatus || "ACTIVE");
  const [priority, setPriority] = useState<ClientPriority>(
    clientToEdit?.priority || "NORMAL"
  );
  const [weddingStatus, setWeddingStatus] = useState<ClientWeddingStatus>(
    clientToEdit?.weddingStatus || "PLANNING"
  );
  const [source, setSource] = useState<ClientSource>(
    clientToEdit?.source || "DIRECT"
  );

  const [servicesInput, setServicesInput] = useState(
    clientToEdit?.services.join(", ") || "Wedding Photography & Cinematography"
  );
  const [nextAction, setNextAction] = useState(clientToEdit?.nextAction || "");
  const [nextActionDate, setNextActionDate] = useState(clientToEdit?.nextActionDate || "");
  const [notes, setNotes] = useState(clientToEdit?.notes || "");

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName.trim()) {
      setError("Couple name is required.");
      return;
    }
    if (!email.trim()) {
      setError("Email address is required.");
      return;
    }

    const services = servicesInput
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const initials = coupleName
      .split(" ")
      .map((n) => n[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    setError(null);
    onSave({
      id: clientToEdit?.id,
      coupleName,
      partnerName,
      email,
      phone,
      alternatePhone,
      preferredContactMethod,
      destination,
      venue,
      weddingDate,
      weddingDateStatus,
      guestCount,
      relationshipStatus,
      priority,
      weddingStatus,
      source,
      avatarInitials: initials || "WD",
      services,
      nextAction,
      nextActionDate,
      notes,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161514]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
              {isEdit ? "EDIT CLIENT PROFILE" : "NEW CLIENT ACCOUNT"}
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#161514]">
              {isEdit ? `Edit ${clientToEdit.coupleName}` : "Create Client Account"}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#161514] hover:bg-[#161514]/10 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {/* Couple & Partner */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="client-couple-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Couple Primary Name *
              </label>
              <input
                id="client-couple-name"
                type="text"
                required
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="e.g. Aditi Sharma"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-partner-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Partner Name
              </label>
              <input
                id="client-partner-name"
                type="text"
                value={partnerName}
                onChange={(e) => setPartnerName(e.target.value)}
                placeholder="e.g. Arjun Kapoor"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Email, Phone, Alt Phone & Pref */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label htmlFor="client-email" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Email Address *
              </label>
              <input
                id="client-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="couple@weddingdemo.in"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-phone" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Phone Number
              </label>
              <input
                id="client-phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 00000"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-alt-phone" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Alternate Phone
              </label>
              <input
                id="client-alt-phone"
                type="tel"
                value={alternatePhone}
                onChange={(e) => setAlternatePhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-pref-contact" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Preferred Channel
              </label>
              <select
                id="client-pref-contact"
                value={preferredContactMethod}
                onChange={(e) =>
                  setPreferredContactMethod(
                    e.target.value as ClientContactPreference
                  )
                }
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="EMAIL">Email</option>
                <option value="PHONE">Phone Call</option>
                <option value="WHATSAPP">WhatsApp</option>
              </select>
            </div>
          </div>

          {/* Destination & Venue */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label htmlFor="client-destination" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Destination
              </label>
              <input
                id="client-destination"
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Udaipur"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-venue" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Venue
              </label>
              <input
                id="client-venue"
                type="text"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
                placeholder="e.g. Jagmandir Island Palace"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-guest-count" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Guest Count
              </label>
              <input
                id="client-guest-count"
                type="number"
                value={guestCount || ""}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                placeholder="150"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Date & Date Status */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="client-wedding-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Wedding Date
              </label>
              <input
                id="client-wedding-date"
                type="date"
                value={weddingDate}
                onChange={(e) => setWeddingDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-date-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Date Status
              </label>
              <select
                id="client-date-status"
                value={weddingDateStatus}
                onChange={(e) =>
                  setWeddingDateStatus(e.target.value as "CONFIRMED" | "FLEXIBLE")
                }
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="CONFIRMED">Confirmed Date</option>
                <option value="FLEXIBLE">Flexible Dates</option>
              </select>
            </div>
          </div>

          {/* Relationship Status, Priority, Wedding State & Source */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div>
              <label htmlFor="client-relationship-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Relationship Stage
              </label>
              <select
                id="client-relationship-status"
                value={relationshipStatus}
                onChange={(e) =>
                  setRelationshipStatus(
                    e.target.value as ClientRelationshipStatus
                  )
                }
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="LEAD">Lead / Discovery</option>
                <option value="ACTIVE">Active Client</option>
                <option value="UPCOMING">Upcoming Celebration</option>
                <option value="COMPLETED">Completed Account</option>
                <option value="INACTIVE">Inactive / Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="client-priority-select" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Priority Level
              </label>
              <select
                id="client-priority-select"
                value={priority}
                onChange={(e) => setPriority(e.target.value as ClientPriority)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="NORMAL">Normal Priority</option>
                <option value="HIGH">High Priority</option>
                <option value="LOW">Low Priority</option>
              </select>
            </div>
            <div>
              <label htmlFor="client-wedding-status" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Wedding State
              </label>
              <select
                id="client-wedding-status"
                value={weddingStatus}
                onChange={(e) =>
                  setWeddingStatus(e.target.value as ClientWeddingStatus)
                }
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="PLANNING">In Planning</option>
                <option value="UPCOMING">Upcoming Wedding</option>
                <option value="IN_PROGRESS">Active Wedding Week</option>
                <option value="COMPLETED">Wedding Concluded</option>
                <option value="DATE_FLEXIBLE">Dates Flexible</option>
              </select>
            </div>
            <div>
              <label htmlFor="client-source-select" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Client Source
              </label>
              <select
                id="client-source-select"
                value={source}
                onChange={(e) => setSource(e.target.value as ClientSource)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              >
                <option value="WEDORA">Wedora Marketplace</option>
                <option value="ENQUIRY">Enquiry Form</option>
                <option value="BOOKING">Booking Referral</option>
                <option value="DIRECT">Direct Contact</option>
                <option value="PUBLIC_PROFILE">Public Profile</option>
              </select>
            </div>
          </div>

          {/* Services */}
          <div>
            <label htmlFor="client-services-input" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Associated Services (Comma separated)
            </label>
            <input
              id="client-services-input"
              type="text"
              value={servicesInput}
              onChange={(e) => setServicesInput(e.target.value)}
              placeholder="e.g. Wedding Photography, Drone Coverage"
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Next Action & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label htmlFor="client-next-action" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Pending Next Action
              </label>
              <input
                id="client-next-action"
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                placeholder="e.g. Confirm pre-wedding permits"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
            <div>
              <label htmlFor="client-next-action-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Action Target Date
              </label>
              <input
                id="client-next-action-date"
                type="date"
                value={nextActionDate}
                onChange={(e) => setNextActionDate(e.target.value)}
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="client-notes-textarea" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Private Vendor Notes
            </label>
            <textarea
              id="client-notes-textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Internal vendor notes..."
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#161514]/10">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#161514]/20 text-[#161514]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#161514] text-[#FAF8F5] font-medium uppercase tracking-wider"
            >
              <Check className="w-4 h-4 text-[#C5A880]" />
              {isEdit ? "Update Client" : "Save Client Account"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
