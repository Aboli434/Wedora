"use client";

import React from "react";
import { ReviewRequest } from "@/data/vendorReviews";
import { X, Send, CheckCircle2 } from "lucide-react";

interface ReviewRequestDetailProps {
  request: ReviewRequest | null;
  onClose: () => void;
  onMarkCompleted: (requestId: string) => void;
}

export const ReviewRequestDetail: React.FC<ReviewRequestDetailProps> = ({
  request,
  onClose,
  onMarkCompleted,
}) => {
  if (!request) return null;

  const isCompleted = request.requestStatus === "COMPLETED";

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto font-sans"
      role="dialog"
      aria-modal="true"
      aria-labelledby="req-detail-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 rounded-sm w-full max-w-lg overflow-hidden shadow-2xl my-8">
        <div className="bg-[#161514] text-[#FAF8F5] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-[#C5A880]" />
            <span id="req-detail-title" className="font-serif text-lg text-[#FAF8F5]">
              Review Request Detail
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

        <div className="p-6 bg-white space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block">
                Couple Name
              </span>
              <h4 className="font-serif text-xl font-medium text-[#161514]">
                {request.coupleName}
              </h4>
            </div>

            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs ${
                isCompleted
                  ? "bg-emerald-100 text-emerald-900"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              {request.requestStatus}
            </span>
          </div>

          <div className="space-y-2 text-[#5A5650] divide-y divide-[#161514]/10">
            <div className="flex justify-between pt-1">
              <span>Client Reference:</span>
              <strong className="text-[#161514] font-mono">{request.clientReference}</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span>Booking Ref:</span>
              <strong className="text-[#161514] font-mono">#{request.bookingId}</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span>Service Performed:</span>
              <strong className="text-[#161514]">{request.service}</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span>Wedding Date:</span>
              <strong className="text-[#161514]">{request.weddingDate}</strong>
            </div>
            {request.requestedAt && (
              <div className="flex justify-between pt-2">
                <span>Invitation Sent Date:</span>
                <strong className="text-[#161514]">{request.requestedAt.split("T")[0]}</strong>
              </div>
            )}
            {request.notes && (
              <div className="flex justify-between pt-2">
                <span>Internal Notes:</span>
                <span className="text-[#161514] italic">{request.notes}</span>
              </div>
            )}
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-[11px] text-[#5A5650]">
            <strong>Demo Request Notice:</strong> Demo request entry — no real external email or messaging service was triggered.
          </div>
        </div>

        <div className="bg-[#FAF8F5] p-4 border-t border-[#161514]/10 flex items-center justify-between">
          {!isCompleted ? (
            <button
              type="button"
              onClick={() => {
                onMarkCompleted(request.id);
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-800 text-white text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-emerald-900"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark Completed
            </button>
          ) : (
            <span className="text-xs text-emerald-800 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Request Completed
            </span>
          )}

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
