"use client";

import React, { useState } from "react";
import { VendorEnquiry } from "@/data/vendorEnquiries";
import { validateEnquiryResponse } from "@/lib/vendorEnquiries";
import { Send, Save, Info, CheckCircle2 } from "lucide-react";

interface EnquiryResponseComposerProps {
  enquiry: VendorEnquiry;
  onSaveDraft: (draft: string) => void;
  onMarkResponseSent: (message: string) => void;
}

export const EnquiryResponseComposer: React.FC<EnquiryResponseComposerProps> = ({
  enquiry,
  onSaveDraft,
  onMarkResponseSent,
}) => {
  const defaultSubject = `Your ${enquiry.serviceRequested} Enquiry — The Frame House`;
  const [prevId, setPrevId] = useState(enquiry.id);
  const [message, setMessage] = useState(
    enquiry.draftResponse ||
      `Dear ${enquiry.coupleName}${enquiry.partnerName ? ` & ${enquiry.partnerName}` : ""},\n\nThank you for considering The Frame House for your upcoming celebration in ${enquiry.destination}. We would be thrilled to document your special days.\n\nBased on your requested events, we have availability and would love to schedule a introductory video call to walk through our signature deliverables.\n\nWarm regards,\nRiya Mehta\nThe Frame House`
  );

  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  if (enquiry.id !== prevId) {
    setPrevId(enquiry.id);
    setMessage(
      enquiry.draftResponse ||
        `Dear ${enquiry.coupleName}${enquiry.partnerName ? ` & ${enquiry.partnerName}` : ""},\n\nThank you for considering The Frame House for your upcoming celebration in ${enquiry.destination}. We would be thrilled to document your special days.\n\nBased on your requested events, we have availability and would love to schedule a introductory video call to walk through our signature deliverables.\n\nWarm regards,\nRiya Mehta\nThe Frame House`
    );
    setError(null);
    setFeedback(null);
  }

  const handleSaveDraft = () => {
    onSaveDraft(message);
    setFeedback("Draft response saved locally.");
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleSend = () => {
    const val = validateEnquiryResponse(message);
    if (!val.valid) {
      setError(val.error || "Invalid message format.");
      return;
    }
    setError(null);
    onMarkResponseSent(message);
    setFeedback("Response marked as sent! Demo only — no message was actually sent.");
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <h3 className="font-serif text-base font-medium text-[#161514]">
          Response Composer
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-[#5A5650]">
          OFFICIAL PROPOSAL & CORRESPONDENCE
        </span>
      </div>

      {/* Recipient & Subject Header */}
      <div className="space-y-3 mb-4 text-xs text-[#161514]">
        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-1 sm:gap-2">
          <span className="text-[#5A5650] font-medium uppercase tracking-wider text-[10px]">
            To:
          </span>
          <div className="sm:col-span-3 font-mono text-xs bg-white px-3 py-1.5 border border-[#161514]/10 text-[#161514]">
            {enquiry.email} ({enquiry.coupleName})
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-1 sm:gap-2">
          <span className="text-[#5A5650] font-medium uppercase tracking-wider text-[10px]">
            Subject:
          </span>
          <div className="sm:col-span-3 font-medium bg-white px-3 py-1.5 border border-[#161514]/10 text-[#161514]">
            {defaultSubject}
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="mb-3">
        <textarea
          rows={6}
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            if (error) setError(null);
          }}
          placeholder="Draft your proposal details, timeline availability, or call invitation here..."
          className="w-full p-3.5 bg-white border border-[#161514]/15 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] focus:border-[#C5A880] leading-relaxed"
        />
        <div className="flex items-center justify-between mt-1 text-[10px] text-[#5A5650]">
          <span>Character count: {message.length} / 3000</span>
          {error && <span className="text-rose-600 font-semibold">{error}</span>}
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div className="mb-4 p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Demo Notice + Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-[#161514]/10">
        <div className="flex items-center gap-1.5 text-[11px] text-[#5A5650]">
          <Info className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
          <span>Demo mode — sending will not contact the couple.</span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleSaveDraft}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 border border-[#161514]/20 text-[#161514] text-xs font-medium hover:bg-white transition-colors"
          >
            <Save className="w-3.5 h-3.5 text-[#5A5650]" />
            Save Draft
          </button>
          <button
            type="button"
            onClick={handleSend}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium hover:bg-[#161514]/90 transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-[#C5A880]" />
            Mark Response Sent
          </button>
        </div>
      </div>
    </div>
  );
};
