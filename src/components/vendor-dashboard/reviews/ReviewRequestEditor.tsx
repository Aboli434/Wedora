"use client";

import React, { useState } from "react";
import { ReviewRequest } from "@/data/vendorReviews";
import { X, Send, ShieldAlert } from "lucide-react";

interface ReviewRequestEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (requestData: Partial<ReviewRequest>) => void;
}

export const ReviewRequestEditor: React.FC<ReviewRequestEditorProps> = ({
  isOpen,
  onClose,
  onSave,
}) => {
  const [coupleName, setCoupleName] = useState("");
  const clientReference = "CLI-2026-001";
  const [bookingId, setBookingId] = useState("BK-2026-001");
  const [service, setService] = useState("Full Wedding Photography & Cinematography");
  const [weddingDate, setWeddingDate] = useState("2026-11-15");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName.trim()) {
      setError("Couple name is required.");
      return;
    }
    setError(null);
    onSave({
      coupleName: coupleName.trim(),
      clientReference,
      bookingId,
      service,
      weddingDate,
      notes: notes.trim() || undefined,
      requestStatus: "REQUESTED",
      requestedAt: new Date().toISOString(),
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-req-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 rounded-sm w-full max-w-lg overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-[#161514] text-[#FAF8F5] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#C5A880]" />
            <span id="review-req-title" className="font-serif text-lg text-[#FAF8F5] font-normal">
              Send Review Invitation
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#FAF8F5]/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 bg-white space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label htmlFor="req-couple-name" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Couple Name *
              </label>
              <input
                id="req-couple-name"
                type="text"
                required
                value={coupleName}
                onChange={(e) => setCoupleName(e.target.value)}
                placeholder="e.g. Aditi & Arjun"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="req-booking-id" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Booking Ref / ID
                </label>
                <select
                  id="req-booking-id"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                >
                  <option value="BK-2026-001">BK-2026-001 (Aditi & Arjun)</option>
                  <option value="BK-2026-002">BK-2026-002 (Meera & Rohan)</option>
                  <option value="BK-2026-003">BK-2026-003 (Isha & Kunal)</option>
                  <option value="BK-2026-004">BK-2026-004 (Ananya & Kabir)</option>
                  <option value="BK-2026-005">BK-2026-005 (Priya & Dev)</option>
                </select>
              </div>

              <div>
                <label htmlFor="req-wedding-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Wedding Date
                </label>
                <input
                  id="req-wedding-date"
                  type="date"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="req-service" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Service Performed
              </label>
              <input
                id="req-service"
                type="text"
                value={service}
                onChange={(e) => setService(e.target.value)}
                placeholder="e.g. Destination Wedding Photography"
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
              />
            </div>

            <div>
              <label htmlFor="req-notes" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Internal Invitation Note
              </label>
              <textarea
                id="req-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional internal note (e.g. Sent after physical album delivery)..."
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
              />
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-[11px] text-[#5A5650]">
              <strong>Demo Action Notice:</strong> Demo only — no message or email has been sent externally.
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#161514]/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#161514]/20 bg-white text-[#161514] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#161514]/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927] transition-colors"
              >
                Log Review Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
