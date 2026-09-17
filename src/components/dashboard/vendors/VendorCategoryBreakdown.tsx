"use client";

import React from "react";
import { VendorCategory } from "@/data/vendorsDashboard";
import { formatVendorCategory } from "@/lib/vendorsDashboard";

interface VendorCategoryBreakdownProps {
  categories: Record<VendorCategory, { count: number; percentage: number }>;
}

export function VendorCategoryBreakdown({
  categories,
}: VendorCategoryBreakdownProps) {
  // Only show categories with count > 0 to keep layout clean
  const activeCategories = (Object.keys(categories) as VendorCategory[]).filter(
    (key) => categories[key].count > 0
  );

  return (
    <section className="bg-[#FAF8F5] border border-[#161514]/15 p-6 sm:p-8 space-y-6">
      <div className="border-b border-[#161514]/10 pb-4">
        <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold block">
          CATEGORY ALLOCATION
        </span>
        <h2 className="font-serif text-2xl text-[#161514] font-light">
          Vendor Categories
        </h2>
      </div>

      <div className="space-y-4">
        {activeCategories.map((catKey) => {
          const item = categories[catKey];
          return (
            <div key={catKey} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-sans">
                <span className="font-medium text-[#161514] uppercase tracking-wider">
                  {formatVendorCategory(catKey)}
                </span>
                <span className="text-[#5A5650]">
                  <strong className="text-[#161514] font-serif text-sm mr-1">
                    {item.count}
                  </strong>
                  ({item.percentage}%)
                </span>
              </div>

              {/* Progress Bar */}
              <div
                className="w-full h-1.5 bg-[#161514]/10 overflow-hidden"
                role="progressbar"
                aria-valuenow={item.percentage}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${formatVendorCategory(catKey)}: ${item.count} vendors (${item.percentage} percent).`}
              >
                <div
                  className="h-full bg-[#161514] transition-all duration-500 ease-out"
                  style={{ width: `${item.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
