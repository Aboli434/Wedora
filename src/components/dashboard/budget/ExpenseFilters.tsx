"use client";

import React from "react";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { BUDGET_CATEGORIES } from "@/data/budgetDashboard";

interface ExpenseFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  categoryId: string;
  onCategoryChange: (categoryId: string) => void;
  paymentStatus: string;
  onPaymentStatusChange: (status: string) => void;
  expenseStatus: string;
  onExpenseStatusChange: (status: string) => void;
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export function ExpenseFilters({
  searchQuery,
  onSearchChange,
  categoryId,
  onCategoryChange,
  paymentStatus,
  onPaymentStatusChange,
  expenseStatus,
  onExpenseStatusChange,
  sortBy,
  onSortChange,
}: ExpenseFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 p-4 bg-[#F3EFEA] border border-[#161514]/15">
      {/* Search Bar */}
      <div className="relative flex-1 max-w-md">
        <Search className="w-4 h-4 text-[#5A5650] absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search expenses or vendors..."
          className="w-full pl-9 pr-4 py-2 bg-[#FAF8F5] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/60 text-xs font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
        />
      </div>

      {/* Filter & Sort Dropdowns */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-sans">
        {/* Category Filter */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <Filter className="w-3.5 h-3.5 text-[#C5A880]" />
          <label htmlFor="filter-expense-cat" className="sr-only">
            Filter by category
          </label>
          <select
            id="filter-expense-cat"
            value={categoryId}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">Category: All</option>
            {BUDGET_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Payment Status Filter */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <label htmlFor="filter-payment-status" className="sr-only">
            Filter by payment status
          </label>
          <select
            id="filter-payment-status"
            value={paymentStatus}
            onChange={(e) => onPaymentStatusChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">Payment: All</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Expense Status Filter */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <label htmlFor="filter-expense-status" className="sr-only">
            Filter by expense status
          </label>
          <select
            id="filter-expense-status"
            value={expenseStatus}
            onChange={(e) => onExpenseStatusChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="all">Status: All</option>
            <option value="planned">Planned</option>
            <option value="confirmed">Confirmed</option>
            <option value="paid">Paid</option>
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-1.5 bg-[#FAF8F5] px-3 py-2 border border-[#161514]/20">
          <ArrowUpDown className="w-3.5 h-3.5 text-[#C5A880]" />
          <label htmlFor="sort-expenses" className="sr-only">
            Sort expenses
          </label>
          <select
            id="sort-expenses"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className="bg-transparent text-[#161514] font-medium uppercase tracking-wider text-xs focus:outline-none cursor-pointer"
          >
            <option value="newest">Sort: Newest</option>
            <option value="oldest">Sort: Oldest</option>
            <option value="highestAmount">Highest Amount</option>
            <option value="lowestAmount">Lowest Amount</option>
          </select>
        </div>
      </div>
    </div>
  );
}
