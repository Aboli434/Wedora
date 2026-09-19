"use client";

import React, { useState } from "react";
import {
  BUDGET_CATEGORIES,
  INITIAL_TOTAL_BUDGET,
  MOCK_BUDGET_EXPENSES,
  BudgetExpense,
} from "@/data/budgetDashboard";
import {
  calculateBudgetSummary,
  calculateCategoryTotals,
  filterExpenses,
  generateBudgetInsights,
  sortExpenses,
} from "@/lib/budgetDashboard";
import { DashboardShell } from "@/components/dashboard/DashboardShell";
import {
  BudgetPageHeader,
  BudgetOverview,
  BudgetBreakdown,
  BudgetCategoryList,
  ExpenseFilters,
  ExpenseList,
  AddExpenseForm,
  BudgetInsights,
  BudgetPageCTA,
} from "@/components/dashboard/budget";

export default function BudgetPage() {
  const [totalBudget] = useState<number>(INITIAL_TOTAL_BUDGET);
  const [categories] = useState(BUDGET_CATEGORIES);
  const [expenses, setExpenses] = useState<BudgetExpense[]>(MOCK_BUDGET_EXPENSES);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);

  // Filters & Sort State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [paymentStatus, setPaymentStatus] = useState<string>("all");
  const [expenseStatus, setExpenseStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  // Calculations via pure functions
  const summary = calculateBudgetSummary(expenses, categories, totalBudget);
  const categoryTotals = calculateCategoryTotals(expenses, categories, totalBudget);
  const insights = generateBudgetInsights(summary, categoryTotals, expenses);

  const filteredExpenses = sortExpenses(
    filterExpenses(
      expenses,
      categoryId,
      paymentStatus,
      expenseStatus,
      searchQuery
    ),
    sortBy
  );

  // Handlers
  const handleAddExpense = (newExpense: BudgetExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);
  };

  const handleClearFilters = () => {
    setSearchQuery("");
    setCategoryId("all");
    setPaymentStatus("all");
    setExpenseStatus("all");
    setSortBy("newest");
  };

  return (
    <DashboardShell>
      {/* 1. Header */}
      <BudgetPageHeader onAddExpenseClick={() => setIsAddExpenseOpen(true)} />

      {/* 2. Main Budget Overview */}
      <BudgetOverview summary={summary} />

      {/* 3. Budget Allocation Spectrum */}
      <BudgetBreakdown categoryTotals={categoryTotals} />

      {/* 4. Category Grid Breakdown */}
      <BudgetCategoryList categories={categoryTotals} />

      {/* 5. Expense Ledger Management */}
      <div className="space-y-6 pt-4 border-t border-[#161514]/15">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <span className="text-[11px] font-semibold tracking-[0.25em] uppercase text-[#C5A880]">
              EXPENSE LEDGER
            </span>
            <h3 className="font-serif text-2xl font-light text-[#161514]">
              Recorded Expenses
            </h3>
          </div>

          <AddExpenseForm
            onAddExpense={handleAddExpense}
            isOpen={isAddExpenseOpen}
            onOpenChange={setIsAddExpenseOpen}
          />
        </div>

        <ExpenseFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          categoryId={categoryId}
          onCategoryChange={setCategoryId}
          paymentStatus={paymentStatus}
          onPaymentStatusChange={setPaymentStatus}
          expenseStatus={expenseStatus}
          onExpenseStatusChange={setExpenseStatus}
          sortBy={sortBy}
          onSortChange={setSortBy}
        />

        <ExpenseList
          expenses={filteredExpenses}
          totalExpenses={expenses.length}
          onClearFilters={handleClearFilters}
          onAddExpense={() => setIsAddExpenseOpen(true)}
        />
      </div>

      {/* 6. Derived Observations */}
      <BudgetInsights insights={insights} />

      {/* 7. Closing CTA */}
      <BudgetPageCTA />
    </DashboardShell>
  );
}
