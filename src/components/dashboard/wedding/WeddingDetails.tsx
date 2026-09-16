"use client";

import React, { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Edit2, X, Info } from "lucide-react";
import { WeddingProfile } from "@/data/wedding";

interface WeddingDetailsProps {
  profile: WeddingProfile;
}

export function WeddingDetails({ profile }: WeddingDetailsProps) {
  const shouldReduceMotion = useReducedMotion();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const detailsList = [
    { label: "WEDDING DATE", value: profile.weddingDate },
    { label: "DESTINATION", value: profile.destination },
    { label: "WEDDING STYLE", value: profile.style },
    { label: "GUEST TARGET", value: profile.guestTarget },
    { label: "NUMBER OF EVENTS", value: profile.eventCountText },
    { label: "PLANNING STATUS", value: profile.planningStatus },
  ];

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            SPECIFICATIONS
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Wedding Details
          </h3>
        </div>

        <button
          type="button"
          onClick={() => setIsEditModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#F3EFEA] border border-[#161514]/15 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:bg-[#161514] hover:text-[#FAF8F5] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
        >
          <Edit2 className="w-3.5 h-3.5 text-[#C5A880]" />
          <span>Edit wedding details</span>
        </button>
      </div>

      {/* Editorial Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
        {detailsList.map((item) => (
          <div
            key={item.label}
            className="p-4 bg-[#F3EFEA] border border-[#161514]/10 space-y-1"
          >
            <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650] block">
              {item.label}
            </span>
            <span className="font-serif text-lg font-light text-[#161514] block">
              {item.value}
            </span>
          </div>
        ))}
      </div>

      {/* Lightweight Demo Edit Modal */}
      <AnimatePresence>
        {isEditModalOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Edit Wedding Details Demo Modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161514]/60 backdrop-blur-xs"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-md bg-[#FAF8F5] p-6 sm:p-8 border border-[#161514]/20 shadow-xl space-y-6"
            >
              <div className="flex items-center justify-between border-b border-[#161514]/15 pb-3">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4 text-[#C5A880]" />
                  <span className="text-xs font-semibold tracking-[0.2em] uppercase text-[#161514]">
                    DEMO MODE
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  aria-label="Close dialog"
                  className="p-1 text-[#5A5650] hover:text-[#161514] focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif text-2xl font-light text-[#161514]">
                  Edit Wedding Details
                </h4>
                <p className="font-sans text-sm text-[#5A5650] font-light leading-relaxed">
                  Wedding details editing will be connected to your Wedora account once the backend service is available.
                </p>
              </div>

              <div className="pt-4 border-t border-[#161514]/15">
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className="w-full py-3 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-colors"
                >
                  Close Demo Notice
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
