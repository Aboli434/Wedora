"use client";

import React, { useState, useMemo } from "react";
import { PaymentTransaction, PaymentMethod } from "@/data/vendorPayments";
import { filterTransactions, TransactionFilterState } from "@/lib/vendorPayments";
import { PaymentTransactionItem } from "./PaymentTransactionItem";
import { Search, Receipt } from "lucide-react";

interface PaymentTransactionListProps {
  transactions: PaymentTransaction[];
  onSelectReceipt?: (transaction: PaymentTransaction) => void;
}

export const PaymentTransactionList: React.FC<PaymentTransactionListProps> = ({
  transactions,
  onSelectReceipt,
}) => {
  const [filters, setFilters] = useState<TransactionFilterState>({
    method: "ALL",
    type: "ALL",
    status: "ALL",
    searchQuery: "",
    sortBy: "newest",
  });

  const filtered = useMemo(() => {
    return filterTransactions(transactions, filters);
  }, [transactions, filters]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#161514]/10">
        <div>
          <div className="flex items-center gap-2">
            <Receipt className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-xl text-[#161514] font-medium">
              Transaction History
            </h3>
          </div>
          <p className="text-xs text-[#5A5650] font-sans mt-0.5">
            Log of all recorded payment movements and bank transfers.
          </p>
        </div>

        <span className="text-xs text-[#5A5650] font-sans">
          Total Transactions: <strong className="text-[#161514]">{filtered.length}</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5A5650] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
            placeholder="Search transaction ref, couple..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />
        </div>

        {/* Method filter */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filters.method}
            onChange={(e) =>
              setFilters((p) => ({ ...p, method: e.target.value as PaymentMethod | "ALL" }))
            }
            className="px-2.5 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Methods</option>
            <option value="BANK_TRANSFER">Bank Transfer</option>
            <option value="UPI">UPI</option>
            <option value="CARD">Card</option>
            <option value="CASH">Cash</option>
          </select>

          <select
            value={filters.sortBy}
            onChange={(e) =>
              setFilters((p) => ({
                ...p,
                sortBy: e.target.value as TransactionFilterState["sortBy"],
              }))
            }
            className="px-2.5 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="highest_amount">Highest Amount</option>
          </select>
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-[#161514]/20 bg-[#FAF8F5]/60 rounded-sm">
          <p className="text-xs text-[#5A5650] font-sans">
            No transaction records match your search or filter options.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((txn) => (
            <PaymentTransactionItem
              key={txn.id}
              transaction={txn}
              onSelectReceipt={onSelectReceipt}
            />
          ))}
        </div>
      )}
    </section>
  );
};
