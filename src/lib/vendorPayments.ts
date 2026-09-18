import {
  VendorPayment,
  PaymentTransaction,
  VendorInvoice,
  VendorPaymentsSummary,
  PaymentStatus,
  PaymentMethod,
  PaymentType,
  InvoiceStatus,
  PaymentActionItem,
} from "@/data/vendorPayments";

export interface PaymentFilterState {
  status: PaymentStatus | "ALL";
  type: PaymentType | "ALL";
  method: PaymentMethod | "ALL";
  dueState: "ALL" | "OVERDUE" | "DUE_SOON" | "UPCOMING" | "PAID";
  service: string;
  destination: string;
  searchQuery: string;
  sortBy: PaymentSortOption;
}

export type PaymentSortOption =
  | "newest"
  | "oldest"
  | "highest_amount"
  | "lowest_amount"
  | "highest_outstanding"
  | "due_date_soonest"
  | "due_date_latest";

export interface TransactionFilterState {
  method: PaymentMethod | "ALL";
  type: PaymentType | "ALL";
  status: "ALL" | "SUCCESS" | "PENDING" | "FAILED";
  searchQuery: string;
  sortBy: "newest" | "oldest" | "highest_amount" | "lowest_amount";
}

export interface InvoiceFilterState {
  status: InvoiceStatus | "ALL";
  searchQuery: string;
  sortBy: "newest" | "oldest" | "highest_total" | "highest_outstanding" | "due_date";
}

/**
 * Format currency in Indian Numbering System (e.g. ₹24,60,000)
 */
export function formatIndianCurrency(amount: number): string {
  if (isNaN(amount)) return "₹0";
  const isNegative = amount < 0;
  const absAmount = Math.abs(amount);
  const formatted = new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(absAmount);
  return `${isNegative ? "-" : ""}₹${formatted}`;
}

/**
 * Formatter labels
 */
export function formatPaymentStatus(status: PaymentStatus): string {
  switch (status) {
    case "PENDING":
      return "Pending Payment";
    case "PARTIALLY_PAID":
      return "Partially Paid";
    case "PAID":
      return "Paid in Full";
    case "OVERDUE":
      return "Payment Overdue";
    case "CANCELLED":
      return "Cancelled";
    case "REFUNDED":
      return "Refunded";
    default:
      return status;
  }
}

export function formatPaymentMethod(method?: PaymentMethod): string {
  if (!method) return "Not Specified";
  switch (method) {
    case "BANK_TRANSFER":
      return "Bank Transfer / NEFT";
    case "UPI":
      return "UPI Transfer";
    case "CASH":
      return "Cash";
    case "CARD":
      return "Credit / Debit Card";
    case "OTHER":
      return "Other Channel";
    default:
      return method;
  }
}

export function formatPaymentType(type: PaymentType): string {
  switch (type) {
    case "ADVANCE":
      return "Booking Advance";
    case "INSTALLMENT":
      return "Milestone Installment";
    case "FINAL_PAYMENT":
      return "Final Settlement";
    case "ADD_ON":
      return "Add-on Services";
    case "REFUND":
      return "Refund / Adjustment";
    default:
      return type;
  }
}

export function formatInvoiceStatus(status: InvoiceStatus): string {
  switch (status) {
    case "DRAFT":
      return "Draft";
    case "ISSUED":
      return "Issued & Awaiting";
    case "PAID":
      return "Fully Settled";
    case "VOID":
      return "Voided";
    default:
      return status;
  }
}

/**
 * Deterministic Due State
 */
export function getPaymentDueState(
  payment: VendorPayment
): "OVERDUE" | "DUE_SOON" | "UPCOMING" | "PAID" {
  if (payment.status === "PAID") return "PAID";
  if (payment.status === "OVERDUE") return "OVERDUE";

  const today = new Date("2026-09-18T00:00:00Z");
  const due = new Date(payment.dueDate);
  const diffDays = Math.ceil((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays < 0) return "OVERDUE";
  if (diffDays <= 14) return "DUE_SOON";
  return "UPCOMING";
}

/**
 * High-level Financial Calculations
 */
export function calculateTotalBookedValue(payments: VendorPayment[]): number {
  return payments.reduce((acc, p) => acc + p.amount, 0);
}

export function calculateTotalReceived(payments: VendorPayment[]): number {
  return payments.reduce((acc, p) => acc + p.paidAmount, 0);
}

export function calculateTotalOutstanding(payments: VendorPayment[]): number {
  return payments.reduce((acc, p) => acc + p.outstandingAmount, 0);
}

export function calculateOverdueAmount(payments: VendorPayment[]): number {
  return payments
    .filter((p) => p.status === "OVERDUE" || getPaymentDueState(p) === "OVERDUE")
    .reduce((acc, p) => acc + p.outstandingAmount, 0);
}

export function calculateDueSoonAmount(payments: VendorPayment[]): number {
  return payments
    .filter((p) => getPaymentDueState(p) === "DUE_SOON")
    .reduce((acc, p) => acc + p.outstandingAmount, 0);
}

export function calculatePaymentProgress(paid: number, total: number): number {
  if (total <= 0) return 0;
  return Math.min(100, Math.round((paid / total) * 100));
}

export function calculatePaymentsSummary(
  payments: VendorPayment[],
  invoices: VendorInvoice[]
): VendorPaymentsSummary {
  const totalBookedValue = calculateTotalBookedValue(payments);
  const totalReceived = calculateTotalReceived(payments);
  const totalOutstanding = calculateTotalOutstanding(payments);
  const overdueAmount = calculateOverdueAmount(payments);
  const dueSoonAmount = calculateDueSoonAmount(payments);

  const paidPayments = payments.filter((p) => p.status === "PAID").length;
  const pendingPayments = payments.filter((p) => p.status === "PENDING" || p.status === "PARTIALLY_PAID").length;
  const overduePayments = payments.filter((p) => p.status === "OVERDUE" || getPaymentDueState(p) === "OVERDUE").length;

  const paidInvoices = invoices.filter((i) => i.status === "PAID").length;
  const outstandingInvoices = invoices.filter((i) => i.outstandingAmount > 0).length;

  return {
    totalBookedValue,
    totalReceived,
    totalOutstanding,
    overdueAmount,
    dueSoonAmount,
    totalPayments: payments.length,
    paidPayments,
    pendingPayments,
    overduePayments,
    totalInvoices: invoices.length,
    paidInvoices,
    outstandingInvoices,
  };
}

export function getPaymentsNeedingAttention(
  payments: VendorPayment[],
  invoices: VendorInvoice[]
): PaymentActionItem[] {
  const items: PaymentActionItem[] = [];

  // Overdue payments
  payments.forEach((p) => {
    if (p.status === "OVERDUE" || getPaymentDueState(p) === "OVERDUE") {
      items.push({
        id: `att_overdue_${p.id}`,
        type: "OVERDUE",
        title: `Overdue Payment: ${p.coupleName}`,
        description: `${formatPaymentType(p.paymentType)} of ${formatIndianCurrency(p.outstandingAmount)} was due on ${p.dueDate}.`,
        paymentId: p.id,
        bookingId: p.bookingId,
        dueDate: p.dueDate,
        priority: "HIGH",
        amount: p.outstandingAmount,
      });
    }
  });

  // Due Soon payments
  payments.forEach((p) => {
    if (getPaymentDueState(p) === "DUE_SOON" && p.status !== "OVERDUE") {
      items.push({
        id: `att_duesoon_${p.id}`,
        type: "DUE_SOON",
        title: `Payment Due Soon: ${p.coupleName}`,
        description: `${formatPaymentType(p.paymentType)} of ${formatIndianCurrency(p.outstandingAmount)} due on ${p.dueDate}.`,
        paymentId: p.id,
        bookingId: p.bookingId,
        dueDate: p.dueDate,
        priority: "NORMAL",
        amount: p.outstandingAmount,
      });
    }
  });

  // Partially paid items
  payments.forEach((p) => {
    if (p.status === "PARTIALLY_PAID") {
      items.push({
        id: `att_partial_${p.id}`,
        type: "PARTIAL_PAYMENT",
        title: `Partial Balance: ${p.coupleName}`,
        description: `Paid ${formatIndianCurrency(p.paidAmount)} of ${formatIndianCurrency(p.amount)}. Outstanding balance: ${formatIndianCurrency(p.outstandingAmount)}.`,
        paymentId: p.id,
        bookingId: p.bookingId,
        priority: "NORMAL",
        amount: p.outstandingAmount,
      });
    }
  });

  // Invoices needing issuance
  invoices.forEach((inv) => {
    if (inv.status === "DRAFT") {
      items.push({
        id: `att_inv_${inv.id}`,
        type: "INVOICE_PENDING",
        title: `Draft Invoice: ${inv.coupleName}`,
        description: `Invoice ${inv.invoiceNumber} is in draft and ready to be issued.`,
        bookingId: inv.bookingId,
        priority: "LOW",
        amount: inv.totalAmount,
      });
    }
  });

  return items;
}

export function getUpcomingPayments(payments: VendorPayment[]): VendorPayment[] {
  return payments
    .filter((p) => p.status === "PENDING" || p.status === "PARTIALLY_PAID" || p.status === "OVERDUE")
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
}

export function getRecentTransactions(
  transactions: PaymentTransaction[]
): PaymentTransaction[] {
  return [...transactions].sort(
    (a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime()
  );
}

/**
 * Filter, Search, Sort for Payments
 */
export function searchVendorPayments(
  payments: VendorPayment[],
  query: string
): VendorPayment[] {
  const q = query.trim().toLowerCase();
  if (!q) return payments;

  return payments.filter((p) => {
    return (
      p.coupleName.toLowerCase().includes(q) ||
      p.paymentReference.toLowerCase().includes(q) ||
      p.clientReference.toLowerCase().includes(q) ||
      p.bookingId.toLowerCase().includes(q) ||
      p.service.toLowerCase().includes(q) ||
      p.packageName.toLowerCase().includes(q) ||
      p.destination.toLowerCase().includes(q) ||
      (p.notes || "").toLowerCase().includes(q) ||
      (p.invoiceId || "").toLowerCase().includes(q)
    );
  });
}

export function filterVendorPayments(
  payments: VendorPayment[],
  filters: PaymentFilterState
): VendorPayment[] {
  let result = searchVendorPayments(payments, filters.searchQuery);

  if (filters.status !== "ALL") {
    result = result.filter((p) => p.status === filters.status);
  }

  if (filters.type !== "ALL") {
    result = result.filter((p) => p.paymentType === filters.type);
  }

  if (filters.method !== "ALL") {
    result = result.filter((p) => p.paymentMethod === filters.method);
  }

  if (filters.dueState !== "ALL") {
    result = result.filter((p) => getPaymentDueState(p) === filters.dueState);
  }

  if (filters.service !== "ALL") {
    result = result.filter((p) => p.service.toLowerCase().includes(filters.service.toLowerCase()));
  }

  if (filters.destination !== "ALL") {
    result = result.filter((p) => p.destination.toLowerCase() === filters.destination.toLowerCase());
  }

  return sortVendorPayments(result, filters.sortBy);
}

export function sortVendorPayments(
  payments: VendorPayment[],
  sortBy: PaymentSortOption
): VendorPayment[] {
  const copy = [...payments];

  switch (sortBy) {
    case "newest":
      return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    case "oldest":
      return copy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    case "highest_amount":
      return copy.sort((a, b) => b.amount - a.amount);
    case "lowest_amount":
      return copy.sort((a, b) => a.amount - b.amount);
    case "highest_outstanding":
      return copy.sort((a, b) => b.outstandingAmount - a.outstandingAmount);
    case "due_date_soonest":
      return copy.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    case "due_date_latest":
      return copy.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime());
    default:
      return copy;
  }
}

/**
 * Filter and Sort for Transactions
 */
export function filterTransactions(
  transactions: PaymentTransaction[],
  filters: TransactionFilterState
): PaymentTransaction[] {
  const q = filters.searchQuery.trim().toLowerCase();

  const result = transactions.filter((t) => {
    if (q) {
      const match =
        t.coupleName.toLowerCase().includes(q) ||
        t.transactionReference.toLowerCase().includes(q) ||
        t.clientReference.toLowerCase().includes(q) ||
        t.bookingId.toLowerCase().includes(q) ||
        (t.notes || "").toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.method !== "ALL" && t.paymentMethod !== filters.method) return false;
    if (filters.type !== "ALL" && t.paymentType !== filters.type) return false;
    if (filters.status !== "ALL" && t.status !== filters.status) return false;

    return true;
  });

  return sortTransactions(result, filters.sortBy);
}

export function sortTransactions(
  transactions: PaymentTransaction[],
  sortBy: TransactionFilterState["sortBy"]
): PaymentTransaction[] {
  const copy = [...transactions];
  switch (sortBy) {
    case "newest":
      return copy.sort((a, b) => new Date(b.transactionDate).getTime() - new Date(a.transactionDate).getTime());
    case "oldest":
      return copy.sort((a, b) => new Date(a.transactionDate).getTime() - new Date(b.transactionDate).getTime());
    case "highest_amount":
      return copy.sort((a, b) => b.amount - a.amount);
    case "lowest_amount":
      return copy.sort((a, b) => a.amount - b.amount);
    default:
      return copy;
  }
}

/**
 * Filter and Sort for Invoices
 */
export function filterInvoices(
  invoices: VendorInvoice[],
  filters: InvoiceFilterState
): VendorInvoice[] {
  const q = filters.searchQuery.trim().toLowerCase();

  const result = invoices.filter((inv) => {
    if (q) {
      const match =
        inv.coupleName.toLowerCase().includes(q) ||
        inv.invoiceNumber.toLowerCase().includes(q) ||
        inv.clientReference.toLowerCase().includes(q) ||
        inv.bookingId.toLowerCase().includes(q) ||
        inv.service.toLowerCase().includes(q);
      if (!match) return false;
    }

    if (filters.status !== "ALL" && inv.status !== filters.status) return false;
    return true;
  });

  return sortInvoices(result, filters.sortBy);
}

export function sortInvoices(
  invoices: VendorInvoice[],
  sortBy: InvoiceFilterState["sortBy"]
): VendorInvoice[] {
  const copy = [...invoices];
  switch (sortBy) {
    case "newest":
      return copy.sort((a, b) => new Date(b.issueDate).getTime() - new Date(a.issueDate).getTime());
    case "oldest":
      return copy.sort((a, b) => new Date(a.issueDate).getTime() - new Date(b.issueDate).getTime());
    case "highest_total":
      return copy.sort((a, b) => b.totalAmount - a.totalAmount);
    case "highest_outstanding":
      return copy.sort((a, b) => b.outstandingAmount - a.outstandingAmount);
    case "due_date":
      return copy.sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
    default:
      return copy;
  }
}

export function calculatePaymentCompletion(payment: VendorPayment): number {
  if (payment.amount <= 0) return 0;
  return Math.min(100, Math.round((payment.paidAmount / payment.amount) * 100));
}
