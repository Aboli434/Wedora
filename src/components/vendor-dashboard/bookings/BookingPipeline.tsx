"use client";

import React from "react";
import { BookingStatus } from "@/data/vendorBookings";
import { ChevronRight } from "lucide-react";

interface BookingPipelineProps {
  statusCounts: Record<BookingStatus, number>;
  activeStatus: string;
  onSelectStatus: (status: string) => void;
}

export const BookingPipeline: React.FC<BookingPipelineProps> = ({
  statusCounts,
  activeStatus,
  onSelectStatus,
}) => {
  const mainFlow: { id: BookingStatus; label: string; desc: string }[] = [
    { id: "INQUIRY", label: "Hold / Inquiry", desc: "Date hold reserved" },
    { id: "CONFIRMED", label: "Confirmed", desc: "Retainer deposit paid" },
    { id: "IN_PROGRESS", label: "In Progress", desc: "Pre-production / shot list" },
    { id: "COMPLETED", label: "Completed", desc: "Deliverables handed over" },
  ];

  const cancelledCount = statusCounts.CANCELLED || 0;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <h2 className="font-serif text-lg font-medium text-[#161514]">
          Booking Operations Pipeline
        </h2>
        <button
          onClick={() => onSelectStatus("ALL")}
          className={`text-xs uppercase tracking-wider font-medium transition-colors ${
            activeStatus === "ALL"
              ? "text-[#C5A880] underline underline-offset-4"
              : "text-[#5A5650] hover:text-[#161514]"
          }`}
        >
          View All Stages
        </button>
      </div>

      {/* Main linear pipeline flow */}
      <div className="bg-[#FAF8F5] border border-[#161514]/10 p-4 md:p-6 mb-3">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 relative">
          {mainFlow.map((stage, idx) => {
            const count = statusCounts[stage.id] || 0;
            const isSelected = activeStatus === stage.id;

            return (
              <div key={stage.id} className="relative flex items-center">
                <button
                  onClick={() => onSelectStatus(stage.id)}
                  className={`w-full text-left p-3.5 border transition-all ${
                    isSelected
                      ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
                      : "bg-[#FAF8F5] border-[#161514]/15 hover:border-[#161514]/40 text-[#161514]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`text-[10px] font-semibold tracking-widest uppercase ${
                        isSelected ? "text-[#C5A880]" : "text-[#5A5650]"
                      }`}
                    >
                      Stage 0{idx + 1}
                    </span>
                    <span
                      className={`text-xs font-serif font-medium px-2 py-0.5 rounded-full ${
                        isSelected
                          ? "bg-[#FAF8F5]/20 text-[#FAF8F5]"
                          : "bg-[#161514]/5 text-[#161514]"
                      }`}
                    >
                      {count}
                    </span>
                  </div>

                  <div className="font-serif text-base font-medium mb-0.5">
                    {stage.label}
                  </div>
                  <div
                    className={`text-[11px] leading-tight ${
                      isSelected ? "text-[#FAF8F5]/70" : "text-[#5A5650]/80"
                    }`}
                  >
                    {stage.desc}
                  </div>
                </button>

                {idx < mainFlow.length - 1 && (
                  <ChevronRight className="hidden md:block w-4 h-4 text-[#161514]/20 absolute -right-2 z-10 bg-[#FAF8F5] rounded-full" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Cancelled Status separate toggle */}
      <div className="flex items-center justify-end gap-3 text-xs text-[#5A5650]">
        <span className="uppercase tracking-widest text-[10px] text-[#5A5650]/70">
          Archived / Inactive:
        </span>
        <button
          onClick={() => onSelectStatus("CANCELLED")}
          className={`px-3 py-1 border text-xs transition-colors ${
            activeStatus === "CANCELLED"
              ? "bg-[#161514] text-[#FAF8F5] border-[#161514]"
              : "bg-white border-[#161514]/15 hover:border-[#161514]/30 text-[#161514]"
          }`}
        >
          Cancelled ({cancelledCount})
        </button>
      </div>
    </section>
  );
};
