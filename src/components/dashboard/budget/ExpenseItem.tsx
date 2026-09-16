"use client";

import React from "react";
import { Sparkles, Calendar, Store } from "lucide-react";
import { BudgetExpense, BUDGET_CATEGORIES } from "@/data/budgetDashboard";
import { formatIndianCurrency } from "@/lib/budgetDashboard";

interface ExpenseItemProps {
  expense: BudgetExpense;
}

export function ExpenseItem({ expense }: ExpenseItemProps) {
  const category = BUDGET_CATEGORIES.find((c) => c.id === expense.categoryId);
  const categoryName = category ? category.name : expense.categoryId;

  const paymentStyles: Record<string, string> = {
    PAID: "text-emerald-900 bg-emerald-100 border-emerald-300",
    PARTIAL: "text-[#161514] bg-[#F3EFEA] border-[#C5A880]",
    PENDING: "text-[#5A5650] bg-[#FAF8F5] border-[#161514]/20",
  };

  const statusStyles: Record<string, string> = {
    PAID: "text-[#161514] font-semibold",
    CONFIRMED: "text-[#161514] font-medium",
    PLANNED: "text-[#5A5650]",
  };

  return (
    <div className="p-4 sm:p-5 bg-[#FAF8F5] border-b border-[#161514]/12 hover:bg-[#F3EFEA]/40 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
      {/* Left: Title, Vendor, Category */}
      <div className="space-y-1 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-serif text-lg font-light text-[#161514]">
            {expense.title}
          </h4>

          {expense.custom && (
            <span className="inline-flex items-center gap-1 text-[9px] font-semibold tracking-wider uppercase px-2 py-0.5 bg-[#F3EFEA] text-[#C5A880] border border-[#C5A880]/30">
              <Sparkles className="w-2.5 h-2.5" />
              <span>Custom</span>
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs font-sans text-[#5A5650]">
          {expense.vendorName && (
            <div className="flex items-center gap-1">
              <Store className="w-3 h-3 text-[#C5A880]" />
              <span>{expense.vendorName}</span>
            </div>
          )}

          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-[#C5A880]" />
            <span>{expense.date}</span>
          </div>

          {expense.notes && (
            <span className="text-[11px] italic truncate max-w-xs">
              &quot;{expense.notes}&quot;
            </span>
          )}
        </div>
      </div>

      {/* Right: Meta Information (Category, Amount, Status, Payment) */}
      <div className="flex flex-wrap md:flex-nowrap items-center gap-4 text-xs font-sans">
        {/* Category Tag */}
        <span className="text-[10px] font-semibold tracking-[0.18em] uppercase text-[#5A5650] px-2.5 py-1 bg-[#F3EFEA] border border-[#161514]/10 whitespace-nowrap">
          {categoryName.toUpperCase()}
        </span>

        {/* Amount */}
        <span className="font-serif text-xl font-light text-[#161514] whitespace-nowrap">
          {formatIndianCurrency(expense.amount)}
        </span>

        {/* Expense Status */}
        <span
          className={`text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 bg-[#F3EFEA] border border-[#161514]/10 whitespace-nowrap ${
            statusStyles[expense.status]
          }`}
        >
          {expense.status}
        </span>

        {/* Payment Status */}
        <span
          className={`text-[10px] font-semibold tracking-[0.18em] uppercase px-2.5 py-1 border whitespace-nowrap ${
            paymentStyles[expense.paymentStatus]
          }`}
        >
          {expense.paymentStatus}
        </span>
      </div>
    </div>
  );
}
