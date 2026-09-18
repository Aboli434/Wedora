"use client";

import React from "react";
import {
  PaymentFilterState,
  PaymentSortOption,
} from "@/lib/vendorPayments";
import {
  PaymentStatus,
  PaymentType,
  PaymentMethod,
} from "@/data/vendorPayments";
import { Search, RotateCcw } from "lucide-react";

interface PaymentFiltersProps {
  filters: PaymentFilterState;
  onFilterChange: (updates: Partial<PaymentFilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const PaymentFilters: React.FC<PaymentFiltersProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount,
}) => {
  const isFiltered =
    filters.status !== "ALL" ||
    filters.type !== "ALL" ||
    filters.method !== "ALL" ||
    filters.dueState !== "ALL" ||
    filters.service !== "ALL" ||
    filters.destination !== "ALL" ||
    filters.searchQuery.trim() !== "" ||
    filters.sortBy !== "newest";

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/10 p-5 mb-6 rounded-sm">
      {/* Search & Sort Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4">
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 text-[#5A5650] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search payment ref, client, couple, invoice..."
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#161514]/20 text-xs text-[#161514] placeholder-[#5A5650]/60 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />
        </div>

        {/* Sort & Count */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <span className="text-xs text-[#5A5650] font-sans">
            Showing <strong className="text-[#161514]">{totalFilteredCount}</strong> records
          </span>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({ sortBy: e.target.value as PaymentSortOption })
            }
            className="px-3 py-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="newest">Sort: Newest First</option>
            <option value="oldest">Sort: Oldest First</option>
            <option value="highest_amount">Sort: Highest Amount</option>
            <option value="lowest_amount">Sort: Lowest Amount</option>
            <option value="highest_outstanding">Sort: Highest Outstanding</option>
            <option value="due_date_soonest">Sort: Due Date Soonest</option>
            <option value="due_date_latest">Sort: Due Date Latest</option>
          </select>

          {isFiltered && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#5A5650] hover:text-[#161514] hover:bg-[#161514]/5 transition-colors rounded-sm"
              title="Reset all filters"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Filter Dropdowns Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Status */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1 font-sans">
            Payment Status
          </label>
          <select
            value={filters.status}
            onChange={(e) =>
              onFilterChange({
                status: e.target.value as PaymentStatus | "ALL",
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Statuses</option>
            <option value="PENDING">Pending</option>
            <option value="PARTIALLY_PAID">Partially Paid</option>
            <option value="PAID">Paid in Full</option>
            <option value="OVERDUE">Overdue</option>
            <option value="CANCELLED">Cancelled</option>
            <option value="REFUNDED">Refunded</option>
          </select>
        </div>

        {/* Milestone Type */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1 font-sans">
            Milestone Type
          </label>
          <select
            value={filters.type}
            onChange={(e) =>
              onFilterChange({
                type: e.target.value as PaymentType | "ALL",
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Types</option>
            <option value="ADVANCE">Advance Deposit</option>
            <option value="INSTALLMENT">Installment</option>
            <option value="FINAL_PAYMENT">Final Settlement</option>
            <option value="ADD_ON">Add-on Service</option>
            <option value="REFUND">Refund</option>
          </select>
        </div>

        {/* Payment Method */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1 font-sans">
            Payment Channel
          </label>
          <select
            value={filters.method}
            onChange={(e) =>
              onFilterChange({
                method: e.target.value as PaymentMethod | "ALL",
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Channels</option>
            <option value="BANK_TRANSFER">Bank Transfer / NEFT</option>
            <option value="UPI">UPI Transfer</option>
            <option value="CARD">Credit / Debit Card</option>
            <option value="CASH">Cash</option>
            <option value="OTHER">Other</option>
          </select>
        </div>

        {/* Due State */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1 font-sans">
            Due Schedule
          </label>
          <select
            value={filters.dueState}
            onChange={(e) =>
              onFilterChange({
                dueState: e.target.value as PaymentFilterState["dueState"],
              })
            }
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Due States</option>
            <option value="OVERDUE">Overdue</option>
            <option value="DUE_SOON">Due within 14 Days</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="PAID">Fully Settled</option>
          </select>
        </div>

        {/* Destination */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1 font-sans">
            Destination
          </label>
          <select
            value={filters.destination}
            onChange={(e) => onFilterChange({ destination: e.target.value })}
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Destinations</option>
            <option value="Udaipur">Udaipur</option>
            <option value="Jaipur">Jaipur</option>
            <option value="Goa">Goa</option>
            <option value="Mumbai">Mumbai</option>
          </select>
        </div>

        {/* Service */}
        <div>
          <label className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1 font-sans">
            Service
          </label>
          <select
            value={filters.service}
            onChange={(e) => onFilterChange({ service: e.target.value })}
            className="w-full p-2 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Services</option>
            <option value="Photography">Photography</option>
            <option value="Film">Cinematography / Film</option>
          </select>
        </div>
      </div>
    </div>
  );
};
