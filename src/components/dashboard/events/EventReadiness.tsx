"use client";

import React from "react";
import { WeddingEvent } from "@/data/eventsDashboard";
import { calculateEventReadiness, calculateEventTaskProgress } from "@/lib/eventsDashboard";

interface EventReadinessProps {
  events: WeddingEvent[];
}

export function EventReadiness({ events }: EventReadinessProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          PREPARATION METRICS
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Individual Event Readiness
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {events.map((event) => {
          const readiness = calculateEventReadiness(event);
          const taskProgress = calculateEventTaskProgress(event);

          let interpretation = "Needs attention";
          let interpretationClass = "text-[#8C6D3B]";
          if (readiness >= 90) {
            interpretation = "Nearly ready";
            interpretationClass = "text-[#2D4A3E]";
          } else if (readiness >= 75) {
            interpretation = "On track";
            interpretationClass = "text-[#2D4A3E]";
          }

          return (
            <div
              key={event.id}
              className="p-4 bg-white/60 border border-[#161514]/10 space-y-3"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-serif text-lg text-[#161514] font-medium">
                    {event.name}
                  </h3>
                  <span className="text-xs font-sans text-[#5A5650]">
                    Date: {event.date}
                  </span>
                </div>
                <span className={`text-xs font-sans uppercase tracking-wider font-semibold ${interpretationClass}`}>
                  {interpretation}
                </span>
              </div>

              {/* Progress Bar & Percent */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-sans">
                  <span className="text-[#5A5650]">Planning Readiness</span>
                  <span className="font-serif font-medium text-[#161514]">{readiness}%</span>
                </div>

                <div
                  className="w-full h-2 bg-[#161514]/10 overflow-hidden"
                  role="progressbar"
                  aria-valuenow={readiness}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${event.name} readiness: ${readiness} percent.`}
                >
                  <div
                    className="h-full bg-[#C5A880] transition-all duration-500"
                    style={{ width: `${readiness}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-sans text-[#5A5650] pt-1">
                <span>Task completion: {taskProgress}%</span>
                <span>{event.vendors.length} Vendors confirmed</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
