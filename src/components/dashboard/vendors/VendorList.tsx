"use client";

import React from "react";
import { DashboardVendor } from "@/data/vendorsDashboard";
import { VendorTableRow, VendorCard } from "./VendorListItem";
import { VendorEmptyState } from "./VendorEmptyState";

interface VendorListProps {
  vendors: DashboardVendor[];
  onSelectVendor: (vendor: DashboardVendor) => void;
  onClearFilters: () => void;
}

export function VendorList({
  vendors,
  onSelectVendor,
  onClearFilters,
}: VendorListProps) {
  if (vendors.length === 0) {
    return <VendorEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="space-y-4">
      {/* Desktop Editorial Table View */}
      <div className="hidden md:block overflow-x-auto bg-[#FAF8F5] border border-[#161514]/15">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#161514]/15 bg-[#161514]/[0.03]">
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Vendor
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Category
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Event
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Status
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Payment
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold">
                Next Action
              </th>
              <th className="py-3 px-4 text-[10px] font-sans uppercase tracking-[0.2em] text-[#5A5650] font-semibold text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {vendors.map((vendor) => (
              <VendorTableRow
                key={vendor.id}
                vendor={vendor}
                onSelect={onSelectVendor}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Stacked View */}
      <div className="md:hidden space-y-3">
        {vendors.map((vendor) => (
          <VendorCard
            key={vendor.id}
            vendor={vendor}
            onSelect={onSelectVendor}
          />
        ))}
      </div>
    </div>
  );
}
