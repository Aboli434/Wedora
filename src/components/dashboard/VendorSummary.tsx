"use client";

import React from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Store, CheckCircle2, Clock } from "lucide-react";
import { VendorSummaryData } from "@/data/dashboard";

interface VendorSummaryProps {
  vendors: VendorSummaryData;
}

export function VendorSummary({ vendors }: VendorSummaryProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35, ease: [0.25, 1, 0.5, 1] }}
      className="p-8 bg-[#FAF8F5] border border-[#161514]/15 space-y-6 flex flex-col justify-between"
    >
      <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
        <div className="space-y-0.5">
          <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
            CREATIVE TEAM
          </span>
          <h3 className="font-serif text-2xl font-light text-[#161514]">
            Vendor Curation
          </h3>
        </div>

        <Store className="w-5 h-5 text-[#C5A880]" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider uppercase text-[#5A5650]">
            PARTNER STATUS
          </span>
          <span className="text-xs font-semibold tracking-wider uppercase text-[#161514]">
            {vendors.bookedCount} BOOKED • {vendors.pendingCount} PENDING
          </span>
        </div>

        {/* Vendor Categories List */}
        <div className="space-y-2.5">
          {vendors.featuredVendors.map((item) => (
            <div
              key={item.category}
              className="flex items-center justify-between p-3 bg-[#F3EFEA] border border-[#161514]/10 text-xs font-sans"
            >
              <div>
                <span className="font-semibold text-[#161514] block">
                  {item.category}
                </span>
                <span className="text-[#5A5650] text-[11px]">
                  {item.vendorName}
                </span>
              </div>

              <span
                className={`inline-flex items-center gap-1 text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 ${
                  item.status === "Booked"
                    ? "text-emerald-800 bg-emerald-100/60"
                    : "text-[#C5A880] bg-[#FAF8F5]"
                }`}
              >
                {item.status === "Booked" ? (
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                ) : (
                  <Clock className="w-3 h-3 text-[#C5A880]" />
                )}
                <span>{item.status}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-[#161514]/15 flex items-center justify-between">
        <Link
          href="/dashboard/vendors"
          className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#161514] hover:text-[#C5A880] transition-colors"
        >
          <span>View vendors</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </motion.div>
  );
}
