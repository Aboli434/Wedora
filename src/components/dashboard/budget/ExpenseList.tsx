"use client";

import React from "react";
import { BudgetExpense } from "@/data/budgetDashboard";
import { ExpenseItem } from "./ExpenseItem";
import { BudgetEmptyState } from "./BudgetEmptyState";

interface ExpenseListProps {
  expenses: BudgetExpense[];
  onClearFilters: () => void;
}

export function ExpenseList({
  expenses,
  onClearFilters,
}: ExpenseListProps) {
  if (expenses.length === 0) {
    return <BudgetEmptyState onClearFilters={onClearFilters} />;
  }

  return (
    <div className="bg-[#FAF8F5] border border-[#161514]/15 overflow-hidden">
      {/* Desktop Header */}
      <div className="hidden md:flex items-center justify-between px-5 py-3 bg-[#F3EFEA] border-b border-[#161514]/15 text-[10px] font-semibold tracking-[0.2em] uppercase text-[#5A5650]">
        <span>EXPENSE &amp; VENDOR</span>
        <div className="flex items-center gap-10 pr-2">
          <span className="w-24 text-left">CATEGORY</span>
          <span className="w-24 text-right">AMOUNT</span>
          <span className="w-20 text-left">STATUS</span>
          <span className="w-20 text-left">PAYMENT</span>
        </div>
      </div>

      {/* Expense Items */}
      <div className="divide-y divide-[#161514]/12">
        {expenses.map((expense) => (
          <ExpenseItem key={expense.id} expense={expense} />
        ))}
      </div>
    </div>
  );
}
