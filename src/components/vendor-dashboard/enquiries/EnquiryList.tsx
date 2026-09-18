"use client";

import React from "react";
import { VendorEnquiry } from "@/data/vendorEnquiries";
import { EnquiryListItem } from "./EnquiryListItem";

interface EnquiryListProps {
  enquiries: VendorEnquiry[];
  selectedEnquiryId?: string;
  onSelectEnquiry: (enquiry: VendorEnquiry) => void;
  onResetFilters: () => void;
}

export const EnquiryList: React.FC<EnquiryListProps> = ({
  enquiries,
  selectedEnquiryId,
  onSelectEnquiry,
  onResetFilters,
}) => {
  if (enquiries.length === 0) {
    return (
      <div className="py-12 px-4 border border-dashed border-[#161514]/20 text-center bg-[#FAF8F5]/60">
        <h3 className="font-serif text-lg text-[#161514] mb-2 font-medium">
          No enquiries match your active search or filters.
        </h3>
        <p className="text-xs text-[#5A5650] max-w-md mx-auto mb-4">
          Try loosening your filter selections or clearing your search term to see all available couple leads.
        </p>
        <button
          onClick={onResetFilters}
          className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs uppercase tracking-wider font-medium hover:bg-[#161514]/90 transition-colors"
        >
          Reset All Filters
        </button>
      </div>
    );
  }

  return (
    <section className="mb-12">
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto border border-[#161514]/10 bg-[#FAF8F5]">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#161514]/15 bg-[#161514]/[0.02]">
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                COUPLE & LOCATION
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                SERVICE & BUDGET
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                WEDDING DATE
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                STATUS
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                PRIORITY & DUE
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
                RECEIVED
              </th>
              <th className="py-3.5 px-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650] text-right">
                ACTION
              </th>
            </tr>
          </thead>
          <tbody>
            {enquiries.map((enquiry) => (
              <EnquiryListItem
                key={enquiry.id}
                enquiry={enquiry}
                onSelect={onSelectEnquiry}
                isSelected={enquiry.id === selectedEnquiryId}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card List View */}
      <div className="md:hidden space-y-3">
        {enquiries.map((enquiry) => (
          <EnquiryListItem
            key={enquiry.id}
            enquiry={enquiry}
            onSelect={onSelectEnquiry}
            isSelected={enquiry.id === selectedEnquiryId}
          />
        ))}
      </div>
    </section>
  );
};
