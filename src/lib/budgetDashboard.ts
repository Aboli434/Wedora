import {
  BudgetCategory,
  BudgetExpense,
} from "@/data/budgetDashboard";

export interface BudgetSummaryStats {
  totalBudget: number;
  formattedTotalBudget: string;
  plannedTotal: number;
  formattedPlannedTotal: string;
  spentTotal: number;
  formattedSpentTotal: string;
  remainingBudget: number;
  formattedRemainingBudget: string;
  spentPercentage: number;
  isOverBudget: boolean;
}

export interface CategorySummaryStat {
  id: string;
  name: string;
  plannedAmount: number;
  formattedPlanned: string;
  spentAmount: number;
  formattedSpent: string;
  remainingAmount: number;
  formattedRemaining: string;
  spentPercentage: number;
  budgetPercentage: number; // percentage of overall wedding budget
  isOverBudget: boolean;
  isFullyAllocated: boolean;
}

export interface BudgetInsight {
  id: string;
  title: string;
  text: string;
}

/**
 * Formats a number in Indian Rupee currency format (e.g. ₹35,00,000 or ₹50,000).
 */
export function formatIndianCurrency(amount: number): string {
  if (isNaN(amount)) return "₹0";
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `₹${formatted}`;
}

/**
 * Calculates high-level budget metrics from total budget, categories, and expenses.
 */
export function calculateBudgetSummary(
  expenses: BudgetExpense[],
  categories: BudgetCategory[],
  totalBudget: number = 3500000
): BudgetSummaryStats {
  const plannedTotal = categories.reduce((sum, c) => sum + c.plannedAmount, 0);
  const spentTotal = expenses.reduce((sum, e) => sum + e.amount, 0);
  const remainingBudget = totalBudget - spentTotal;
  const spentPercentage =
    totalBudget > 0 ? Math.round((spentTotal / totalBudget) * 100) : 0;
  const isOverBudget = spentTotal > totalBudget;

  return {
    totalBudget,
    formattedTotalBudget: formatIndianCurrency(totalBudget),
    plannedTotal,
    formattedPlannedTotal: formatIndianCurrency(plannedTotal),
    spentTotal,
    formattedSpentTotal: formatIndianCurrency(spentTotal),
    remainingBudget,
    formattedRemainingBudget: formatIndianCurrency(remainingBudget),
    spentPercentage,
    isOverBudget,
  };
}

/**
 * Calculates category-by-category financial metrics.
 */
export function calculateCategoryTotals(
  expenses: BudgetExpense[],
  categories: BudgetCategory[],
  totalBudget: number = 3500000
): CategorySummaryStat[] {
  return categories.map((cat) => {
    const categoryExpenses = expenses.filter((e) => e.categoryId === cat.id);
    const spentAmount = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);
    const plannedAmount = cat.plannedAmount;
    const remainingAmount = plannedAmount - spentAmount;
    const spentPercentage =
      plannedAmount > 0 ? Math.round((spentAmount / plannedAmount) * 100) : 0;
    const budgetPercentage =
      totalBudget > 0 ? Math.round((plannedAmount / totalBudget) * 100) : 0;
    const isOverBudget = spentAmount > plannedAmount;
    const isFullyAllocated = spentAmount === plannedAmount;

    return {
      id: cat.id,
      name: cat.name,
      plannedAmount,
      formattedPlanned: formatIndianCurrency(plannedAmount),
      spentAmount,
      formattedSpent: formatIndianCurrency(spentAmount),
      remainingAmount,
      formattedRemaining: formatIndianCurrency(remainingAmount),
      spentPercentage,
      budgetPercentage,
      isOverBudget,
      isFullyAllocated,
    };
  });
}

/**
 * Filters expenses based on category, payment status, expense status, and search query.
 */
export function filterExpenses(
  expenses: BudgetExpense[],
  categoryId: string = "all",
  paymentStatus: string = "all",
  expenseStatus: string = "all",
  searchQuery: string = ""
): BudgetExpense[] {
  return expenses.filter((e) => {
    // Category Filter
    if (categoryId !== "all" && e.categoryId !== categoryId) {
      return false;
    }

    // Payment Status Filter
    if (
      paymentStatus !== "all" &&
      e.paymentStatus.toLowerCase() !== paymentStatus.toLowerCase()
    ) {
      return false;
    }

    // Expense Status Filter
    if (
      expenseStatus !== "all" &&
      e.status.toLowerCase() !== expenseStatus.toLowerCase()
    ) {
      return false;
    }

    // Search Query
    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      const titleMatch = e.title.toLowerCase().includes(q);
      const vendorMatch = e.vendorName?.toLowerCase().includes(q) || false;
      const notesMatch = e.notes?.toLowerCase().includes(q) || false;
      if (!titleMatch && !vendorMatch && !notesMatch) {
        return false;
      }
    }

    return true;
  });
}

/**
 * Sorts expenses by date, amount, or created timestamp.
 */
export function sortExpenses(
  expenses: BudgetExpense[],
  sortBy: string = "newest"
): BudgetExpense[] {
  const cloned = [...expenses];

  if (sortBy === "newest") {
    return cloned.sort((a, b) => b.date.localeCompare(a.date));
  }
  if (sortBy === "oldest") {
    return cloned.sort((a, b) => a.date.localeCompare(b.date));
  }
  if (sortBy === "highestAmount") {
    return cloned.sort((a, b) => b.amount - a.amount);
  }
  if (sortBy === "lowestAmount") {
    return cloned.sort((a, b) => a.amount - b.amount);
  }

  return cloned;
}

/**
 * Generates 2-3 calculated observations based on live data.
 */
export function generateBudgetInsights(
  summary: BudgetSummaryStats,
  categoryTotals: CategorySummaryStat[],
  expenses: BudgetExpense[]
): BudgetInsight[] {
  const insights: BudgetInsight[] = [];

  // Top category insight
  const sortedByPlanned = [...categoryTotals].sort(
    (a, b) => b.plannedAmount - a.plannedAmount
  );
  if (sortedByPlanned.length > 0) {
    const topCat = sortedByPlanned[0];
    insights.push({
      id: "insight-1",
      title: `${topCat.name} Category Allocation`,
      text: `${topCat.name} represents ${topCat.budgetPercentage}% of your total planned celebration budget (${topCat.formattedPlanned}).`,
    });
  }

  // Pending payments insight
  const pendingPayments = expenses.filter(
    (e) => e.paymentStatus === "PENDING" || e.paymentStatus === "PARTIAL"
  );
  if (pendingPayments.length > 0) {
    insights.push({
      id: "insight-2",
      title: "Pending Payment Schedule",
      text: `${pendingPayments.length} logged expenses have partial or pending balance payments scheduled for future fulfillment.`,
    });
  }

  // Budget progress insight
  insights.push({
    id: "insight-3",
    title: "Overall Budget Progress",
    text: `You have currently recorded ${summary.formattedSpentTotal} in expenses (${summary.spentPercentage}% of total budget), leaving ${summary.formattedRemainingBudget} available.`,
  });

  return insights;
}
