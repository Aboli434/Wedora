"use client";

import React from "react";
import Link from "next/link";
import { VendorEnquiry } from "@/data/vendorDashboard";
import { ArrowRight } from "lucide-react";

interface VendorEnquiriesSnapshotProps {
  enquiries: VendorEnquiry[];
}

export function VendorEnquiriesSnapshot({ enquiries }: VendorEnquiriesSnapshotProps) {
  return (
    <section className="bg-[#FAF8F5] border border-[#E8E2D9] rounded-xl p-6 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E8E2D9] pb-4">
        <div>
          <h2 className="font-serif text-2xl text-[#2C2A29]">Enquiries</h2>
          <p className="text-xs text-[#6E6B65] mt-0.5">
            Recent couples exploring your work.
          </p>
        </div>
        <Link
          href="/vendor/dashboard/enquiries"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#2C2A29] hover:text-[#C5A880] transition-colors group self-start sm:self-auto"
        >
          <span>View all enquiries</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#C5A880] group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      <div className="divide-y divide-[#E8E2D9]">
        {enquiries.map((enq) => (
          <div
            key={enq.id}
            className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <h3 className="font-serif text-lg text-[#2C2A29] font-medium">
                  {enq.coupleNames}
                </h3>
                <span
                  className={`text-[9px] font-mono tracking-wider uppercase px-2 py-0.5 rounded border ${
                    enq.status === "NEW"
                      ? "bg-amber-100/70 text-amber-900 border-amber-300"
                      : enq.status === "SHORTLISTED"
                      ? "bg-emerald-50 text-emerald-900 border-emerald-200"
                      : "bg-[#F2ECE4] text-[#594B3C] border-[#E5DEC9]"
                  }`}
                >
                  {enq.status}
                </span>
              </div>
              <p className="text-xs text-[#6E6B65]">
                {enq.serviceRequested} &bull; {enq.destination}
              </p>
            </div>

            <div className="sm:text-right shrink-0 text-xs text-[#8C857B] space-y-0.5">
              <p className="font-medium text-[#2C2A29]">{enq.weddingDate}</p>
              <p className="font-mono text-[11px]">Received {enq.receivedDate}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
