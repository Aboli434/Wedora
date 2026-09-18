"use client";

import React, { useState } from "react";
import { VendorClient, ClientContactPreference } from "@/data/vendorClients";
import { X, Check } from "lucide-react";

interface RecordContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  client: VendorClient;
  onRecordContact: (
    method: ClientContactPreference,
    summary: string,
    nextFollowUpDate?: string
  ) => void;
}

export const RecordContactModal: React.FC<RecordContactModalProps> = ({
  isOpen,
  onClose,
  client,
  onRecordContact,
}) => {
  const [method, setMethod] = useState<ClientContactPreference>(
    client.preferredContactMethod || "EMAIL"
  );
  const [summary, setSummary] = useState("");
  const [nextFollowUpDate, setNextFollowUpDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) {
      setError("Interaction summary is required.");
      return;
    }

    setError(null);
    onRecordContact(method, summary, nextFollowUpDate || undefined);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#161514]/60 p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 max-w-md w-full p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#161514]/10">
          <div>
            <span className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A880] uppercase">
              RECORD CONTACT LOG
            </span>
            <h3 className="font-serif text-2xl font-medium text-[#161514]">
              {client.coupleName}
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
          <div>
            <label htmlFor="contact-method-select" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Contact Channel
            </label>
            <select
              id="contact-method-select"
              value={method}
              onChange={(e) =>
                setMethod(e.target.value as ClientContactPreference)
              }
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            >
              <option value="EMAIL">Email Outreach</option>
              <option value="PHONE">Phone Call</option>
              <option value="WHATSAPP">WhatsApp Message</option>
            </select>
          </div>

          <div>
            <label htmlFor="contact-summary-input" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Interaction Summary *
            </label>
            <textarea
              id="contact-summary-input"
              rows={3}
              required
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="e.g. Discussed shot list preferences for Udaipur ceremony..."
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

          <div>
            <label htmlFor="next-followup-date-input" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
              Next Follow-Up Date (Optional)
            </label>
            <input
              id="next-followup-date-input"
              type="date"
              value={nextFollowUpDate}
              onChange={(e) => setNextFollowUpDate(e.target.value)}
              className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
            />
          </div>

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
              Record Log
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
