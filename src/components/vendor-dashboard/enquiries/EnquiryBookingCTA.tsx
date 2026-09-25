"use client";

import React, { useState } from "react";
import { EnquiryStatus } from "@/data/vendorEnquiries";
import { convertEnquiryToBookingApi } from "@/lib/api/endpoints";
import { CalendarCheck, ArrowRight, CheckCircle2, Loader2, AlertCircle, X } from "lucide-react";

interface EnquiryBookingCTAProps {
  status: EnquiryStatus;
  coupleName: string;
  enquiryId?: string;
  weddingId?: string;
  onConverted?: () => void;
}

export const EnquiryBookingCTA: React.FC<EnquiryBookingCTAProps> = ({
  status,
  coupleName,
  enquiryId,
  weddingId,
  onConverted,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [totalAmount, setTotalAmount] = useState("250000"); // ₹2.5L default
  const [advanceAmount, setAdvanceAmount] = useState("50000"); // ₹50k default
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  if (status !== "ACCEPTED") {
    return (
      <div className="p-4 bg-[#FAF8F5] border border-dashed border-[#161514]/15 text-xs text-[#5A5650] flex items-center justify-between mb-8">
        <span>Booking conversion becomes available once enquiry status is ACCEPTED.</span>
        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#5A5650]/70">
          STATUS: {status}
        </span>
      </div>
    );
  }

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!totalAmount || Number(totalAmount) <= 0) {
      setError("Please enter a valid total contract amount.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      if (weddingId && enquiryId) {
        // Convert paise value for backend API
        const totalPaise = String(Math.round(Number(totalAmount) * 100));
        const advancePaise = advanceAmount ? String(Math.round(Number(advanceAmount) * 100)) : undefined;

        await convertEnquiryToBookingApi(weddingId, enquiryId, {
          totalAmount: totalPaise,
          advanceAmount: advancePaise,
          notes: notes.trim() || undefined,
        });
      }

      setSuccess(true);
      if (onConverted) onConverted();
      setTimeout(() => {
        setIsOpen(false);
        setSuccess(false);
      }, 2000);
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : "Failed to convert enquiry to booking.";
      setError(errMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="bg-[#161514] text-[#FAF8F5] p-6 border border-[#161514] mb-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <CalendarCheck className="w-4 h-4 text-[#C5A880]" />
              <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#C5A880]">
                NEXT STEP: CONVERT TO BOOKING
              </span>
            </div>
            <h4 className="font-serif text-xl font-medium tracking-tight">
              Ready to turn {coupleName}&apos;s enquiry into a booking?
            </h4>
            <p className="text-xs text-[#FAF8F5]/70 mt-1 max-w-xl">
              Lock in dates, specify package contract details, and schedule initial retainer invoices in your booking schedule.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 bg-[#C5A880] text-[#161514] font-medium text-xs uppercase tracking-wider hover:bg-white transition-colors"
          >
            <span>Convert to Booking</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Conversion Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
        >
          <div className="bg-[#FAF8F5] border border-[#161514]/20 w-full max-w-md p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#161514]/15 pb-3">
              <h3 className="font-serif text-xl text-[#161514]">Convert Enquiry to Booking</h3>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close modal"
                className="p-1 text-[#5A5650] hover:text-[#161514]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {success ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Enquiry successfully converted to confirmed booking!</span>
              </div>
            ) : (
              <form onSubmit={handleConvert} className="space-y-4 text-xs font-sans">
                {error && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                <div className="space-y-1">
                  <label className="block uppercase tracking-wider text-[#161514] font-semibold">
                    Total Contract Amount (₹) <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    type="number"
                    min="1"
                    required
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    placeholder="e.g. 250000"
                    className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-[#161514] text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block uppercase tracking-wider text-[#161514] font-semibold">
                    Advance Retainer Amount (₹)
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={advanceAmount}
                    onChange={(e) => setAdvanceAmount(e.target.value)}
                    placeholder="e.g. 50000"
                    className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-[#161514] text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="block uppercase tracking-wider text-[#161514] font-semibold">
                    Contract Notes (Optional)
                  </label>
                  <textarea
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Terms, venue specifics, or package inclusions..."
                    className="w-full px-3 py-2 bg-white border border-[#161514]/15 text-[#161514] text-xs focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
                  />
                </div>

                <div className="pt-3 border-t border-[#161514]/15 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    disabled={isSubmitting}
                    className="px-4 py-2 border border-[#161514]/20 text-[#5A5650] hover:text-[#161514]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-5 py-2 bg-[#161514] text-[#FAF8F5] font-medium tracking-wider uppercase hover:bg-[#C5A880] hover:text-[#161514] disabled:opacity-50 transition-colors inline-flex items-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Converting...</span>
                      </>
                    ) : (
                      <span>Confirm Booking</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};
