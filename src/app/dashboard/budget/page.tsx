"use client";

import React, { useState, useEffect } from "react";
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
import {
  getWeddingsApi,
  getBudgetSummaryApi,
  getExpensesApi,
  createExpenseApi,
} from "@/lib/api/endpoints";

export default function BudgetPage() {
  const [totalBudget, setTotalBudget] = useState<number>(INITIAL_TOTAL_BUDGET);
  const [weddingId, setWeddingId] = useState<string | null>(null);
  const [categories] = useState(BUDGET_CATEGORIES);
  const [expenses, setExpenses] = useState<BudgetExpense[]>(MOCK_BUDGET_EXPENSES);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters & Sort State
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("all");
  const [paymentStatus, setPaymentStatus] = useState<string>("all");
  const [expenseStatus, setExpenseStatus] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("newest");

  useEffect(() => {
    let isMounted = true;
    async function loadBudgetData() {
      try {
        setLoading(true);
        const weddings = await getWeddingsApi();
        if (weddings && weddings.length > 0) {
          const w = weddings[0];
          if (isMounted) {
            setWeddingId(w.id);
            setTotalBudget(Number(w.totalBudget) / 100);
          }

          const [budgetRes, expensesRes] = await Promise.all([
            getBudgetSummaryApi(w.id).catch(() => null),
            getExpensesApi(w.id).catch(() => []),
          ]);

          if (isMounted && Array.isArray(expensesRes)) {
            const mapped: BudgetExpense[] = expensesRes.map((e) => ({
              id: e.id,
              title: e.vendorName,
              vendorName: e.vendorName,
              categoryId: e.category.toLowerCase(),
              amount: Number(e.amount) / 100,
              date: e.paymentDueDate
                ? new Date(e.paymentDueDate).toISOString().split("T")[0]
                : new Date().toISOString().split("T")[0],
              status: e.status === "PAID" ? "PAID" : "CONFIRMED",
              paymentStatus:
                e.status === "PAID"
                  ? "PAID"
                  : e.paidAmount && Number(e.paidAmount) > 0
                  ? "PARTIAL"
                  : "PENDING",
              notes: e.notes || undefined,
            }));
            setExpenses(mapped);
          }

          if (isMounted && budgetRes && budgetRes.summary) {
            setTotalBudget(Number(budgetRes.summary.totalAllocated) / 100 || Number(w.totalBudget) / 100);
          }
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBudgetData();
    return () => {
      isMounted = false;
    };
  }, []);

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
  const handleAddExpense = async (newExpense: BudgetExpense) => {
    setExpenses((prev) => [newExpense, ...prev]);

    if (weddingId) {
      try {
        const created = await createExpenseApi(weddingId, {
          vendorName: newExpense.vendorName || newExpense.title,
          category: (newExpense.categoryId.toUpperCase() || "OTHER") as string,
          amount: String(Math.round(newExpense.amount * 100)),
          paidAmount: String(Math.round((newExpense.paymentStatus === "PAID" ? newExpense.amount : 0) * 100)),
          paymentDueDate: newExpense.date || undefined,
          notes: newExpense.notes,
        });

        setExpenses((prev) =>
          prev.map((e) => (e.id === newExpense.id ? { ...e, id: created.id } : e))
        );
      } catch {
        // Retain local fallback
      }
    }
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
      <BudgetPageHeader onAddExpenseClick={() => setIsAddExpenseOpen(true)} />

      {loading ? (
        <div className="p-8 text-center text-xs text-[#5A5650] font-sans">Loading budget & expenses...</div>
      ) : (
        <div className="space-y-8">
          <BudgetOverview summary={summary} />
          <BudgetInsights insights={insights} />
          <BudgetBreakdown categoryTotals={categoryTotals} />
          <BudgetCategoryList categories={categoryTotals} />
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
          <BudgetPageCTA />
        </div>
      )}

      <AddExpenseForm
        isOpen={isAddExpenseOpen}
        onOpenChange={setIsAddExpenseOpen}
        onAddExpense={handleAddExpense}
      />
    </DashboardShell>
  );
}
