"use client";

import React from "react";
import { VendorEnquiry } from "@/data/vendorEnquiries";
import { calculateResponseDueStatus } from "@/lib/vendorEnquiries";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

interface EnquiryResponseDueProps {
  enquiry: VendorEnquiry;
}

export const EnquiryResponseDue: React.FC<EnquiryResponseDueProps> = ({ enquiry }) => {
  const dueInfo = calculateResponseDueStatus(enquiry);

  if (dueInfo.state === "NO_DEADLINE") {
    return (
      <div className="flex items-center gap-2 text-xs text-[#5A5650] py-2 px-3 bg-[#FAF8F5] border border-[#161514]/10">
        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>Response SLA satisfied or archived.</span>
      </div>
    );
  }

  const styles = {
    OVERDUE: "bg-rose-50 text-rose-800 border-rose-200",
    DUE_SOON: "bg-amber-50 text-amber-900 border-amber-200",
    ON_TIME: "bg-[#FAF8F5] text-[#161514] border-[#161514]/15",
  };

  const icons = {
    OVERDUE: <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />,
    DUE_SOON: <Clock className="w-4 h-4 text-amber-600 shrink-0" />,
    ON_TIME: <Clock className="w-4 h-4 text-[#C5A880] shrink-0" />,
  };

  return (
    <div
      className={`p-3.5 border flex items-center justify-between gap-3 text-xs mb-6 ${
        styles[dueInfo.state as keyof typeof styles]
      }`}
    >
      <div className="flex items-center gap-2.5">
        {icons[dueInfo.state as keyof typeof icons]}
        <div>
          <div className="font-semibold uppercase tracking-wider text-[10px]">
            RESPONSE TIMELINE: {dueInfo.label}
          </div>
          <p className="text-[11px] opacity-90">
            {dueInfo.state === "OVERDUE"
              ? "The couple expects a response. Prompt communication increases booking conversion."
              : dueInfo.state === "DUE_SOON"
              ? "High intent lead. Send a proposal or schedule a phone consultation."
              : "Standard response window active."}
          </p>
        </div>
      </div>
    </div>
  );
};
