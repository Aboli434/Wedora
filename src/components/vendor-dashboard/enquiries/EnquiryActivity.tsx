"use client";

import React from "react";
import { EnquiryActivity as ActivityType } from "@/data/vendorEnquiries";
import { Clock } from "lucide-react";

interface EnquiryActivityProps {
  activities: ActivityType[];
}

export const EnquiryActivity: React.FC<EnquiryActivityProps> = ({ activities }) => {
  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <h3 className="font-serif text-base font-medium text-[#161514]">
          Activity History
        </h3>
        <span className="text-[10px] uppercase tracking-wider text-[#5A5650]">
          TIMELINE AUDIT
        </span>
      </div>

      {activities.length === 0 ? (
        <p className="text-xs text-[#5A5650] italic">No recorded activity history.</p>
      ) : (
        <div className="relative pl-4 space-y-4 before:absolute before:left-1.5 before:top-2 before:bottom-2 before:w-px before:bg-[#161514]/15">
          {activities.map((act) => (
            <div key={act.id} className="relative">
              <div className="absolute -left-4 top-1.5 w-2.5 h-2.5 rounded-full bg-[#FAF8F5] border-2 border-[#C5A880]" />
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-1">
                <span className="font-medium text-[#161514]">{act.description}</span>
                <span className="text-[10px] text-[#5A5650]/80 flex items-center gap-1 shrink-0">
                  <Clock className="w-3 h-3 text-[#5A5650]/60" />
                  {new Date(act.createdAt).toLocaleString("en-IN", {
                    day: "numeric",
                    month: "short",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
