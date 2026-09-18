"use client";

import React from "react";
import { VendorReviewsSummary } from "@/data/vendorReviews";
import { MessageSquare } from "lucide-react";

interface ResponseSnapshotProps {
  summary: VendorReviewsSummary;
}

export const ResponseSnapshot: React.FC<ResponseSnapshotProps> = ({ summary }) => {
  const ratePct = summary.publishedReviews > 0
    ? Math.round((summary.respondedReviews / summary.publishedReviews) * 100)
    : 0;

  return (
    <section className="mb-12 bg-white border border-[#161514]/10 p-6 rounded-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#161514]/10 mb-6">
        <div className="flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-lg font-medium text-[#161514]">
            Vendor Response Practice
          </h3>
        </div>

        <span className="text-xs text-[#5A5650] font-sans">
          Response Rate: <strong className="text-[#161514]">{ratePct}%</strong>
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
        <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
            Published Reviews
          </span>
          <span className="font-serif text-2xl font-normal text-[#161514]">
            {summary.publishedReviews}
          </span>
          <p className="text-[11px] text-[#5A5650] mt-1">
            Total public couple feedback
          </p>
        </div>

        <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
            Vendor Responses Sent
          </span>
          <span className="font-serif text-2xl font-normal text-emerald-800">
            {summary.respondedReviews}
          </span>
          <p className="text-[11px] text-[#5A5650] mt-1">
            Acknowledged couple reviews
          </p>
        </div>

        <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
            Awaiting Response
          </span>
          <span className="font-serif text-2xl font-normal text-rose-800">
            {summary.awaitingResponse}
          </span>
          <p className="text-[11px] text-[#5A5650] mt-1">
            Reviews pending vendor reply
          </p>
        </div>
      </div>

      <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-xs text-[#5A5650] font-sans">
        <strong>Studio Response Note:</strong> {summary.respondedReviews} of {summary.publishedReviews} published reviews have an official vendor response recorded.
      </div>
    </section>
  );
};
