"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Sparkles } from "lucide-react";
import {
  BUDGET_CATEGORIES,
  BudgetExpense,
  ExpenseStatus,
  PaymentStatus,
} from "@/data/budgetDashboard";

interface AddExpenseFormProps {
  onAddExpense: (expense: BudgetExpense) => void;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddExpenseForm({ onAddExpense, isOpen: controlledIsOpen, onOpenChange }: AddExpenseFormProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isFormOpen = controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  const setIsOpen = (open: boolean) => {
    setInternalIsOpen(open);
    if (onOpenChange) onOpenChange(open);
  };
  const [title, setTitle] = useState("");
  const [categoryId, setCategoryId] = useState("venue");
  const [vendorName, setVendorName] = useState("");
  const [amount, setAmount] = useState<string>("");
  const [date, setDueDate] = useState("2026-09-20");
  const [status, setStatus] = useState<ExpenseStatus>("CONFIRMED");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>("PARTIAL");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Please enter an expense title.");
      return;
    }

    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      setError("Please enter a valid amount greater than ₹0.");
      return;
    }

    const newExpense: BudgetExpense = {
      id: `exp-custom-${Date.now()}`,
      title: title.trim(),
      categoryId,
      vendorName: vendorName.trim() || undefined,
      amount: numAmount,
      date,
      status,
      paymentStatus,
      notes: notes.trim() || undefined,
      custom: true,
      createdAt: new Date().toISOString().split("T")[0],
    };

    onAddExpense(newExpense);

    // Reset & Close
    setTitle("");
    setVendorName("");
    setAmount("");
    setNotes("");
    setError("");
    setIsOpen(false);
  };

  return (
    <div>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full sm:w-auto px-6 py-3.5 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase inline-flex items-center justify-center gap-2 hover:bg-[#C5A880] hover:text-[#161514] transition-colors focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
      >
        <Plus className="w-4 h-4" />
        <span>Add Expense</span>
      </button>

      {/* Lightweight Modal Dialog */}
      <AnimatePresence>
        {isFormOpen && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Add Budget Expense Modal"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#161514]/60 backdrop-blur-xs overflow-y-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-lg bg-[#FAF8F5] p-6 sm:p-8 border border-[#161514]/20 shadow-xl space-y-6 my-8"
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#161514]/15 pb-4">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span className="text-[10px] font-semibold tracking-[0.2em] uppercase text-[#C5A880]">
                      RECORD EXPENSE
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl font-light text-[#161514]">
                    Add Budget Item
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close dialog"
                  className="p-1 text-[#5A5650] hover:text-[#161514] focus:outline-none"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Expense Title */}
                <div className="space-y-1">
                  <label htmlFor="exp-title" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Expense title <span className="text-[#C5A880]">*</span>
                  </label>
                  <input
                    id="exp-title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="e.g. Vintage Car Entry Rental Deposit"
                    className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                  {error && (
                    <p className="text-xs text-red-700 font-sans mt-1">
                      {error}
                    </p>
                  )}
                </div>

                {/* Category & Vendor Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="exp-cat" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Category <span className="text-[#C5A880]">*</span>
                    </label>
                    <select
                      id="exp-cat"
                      value={categoryId}
                      onChange={(e) => setCategoryId(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      {BUDGET_CATEGORIES.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="exp-vendor" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Vendor name (optional)
                    </label>
                    <input
                      id="exp-vendor"
                      type="text"
                      value={vendorName}
                      onChange={(e) => setVendorName(e.target.value)}
                      placeholder="e.g. Heritage Wheels"
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Amount & Date Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="exp-amount" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Amount (₹) <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="exp-amount"
                      type="number"
                      min="1"
                      required
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      placeholder="50000"
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="exp-date" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Date <span className="text-[#C5A880]">*</span>
                    </label>
                    <input
                      id="exp-date"
                      type="date"
                      required
                      value={date}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    />
                  </div>
                </div>

                {/* Status & Payment Status */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label htmlFor="exp-status" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Expense status
                    </label>
                    <select
                      id="exp-status"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as ExpenseStatus)}
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="PLANNED">Planned</option>
                      <option value="CONFIRMED">Confirmed</option>
                      <option value="PAID">Paid</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="exp-paymentStatus" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                      Payment status
                    </label>
                    <select
                      id="exp-paymentStatus"
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}
                      className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                    >
                      <option value="PENDING">Pending</option>
                      <option value="PARTIAL">Partial</option>
                      <option value="PAID">Paid</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div className="space-y-1">
                  <label htmlFor="exp-notes" className="block text-xs font-semibold tracking-wider uppercase text-[#161514]">
                    Notes (optional)
                  </label>
                  <input
                    id="exp-notes"
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add payment terms or receipt references..."
                    className="w-full px-4 py-2.5 bg-[#F3EFEA] border border-[#161514]/20 text-[#161514] placeholder-[#5A5650]/50 text-sm font-sans focus:outline-none focus:border-[#C5A880] transition-colors"
                  />
                </div>

                {/* Demo Disclaimer */}
                <p className="text-[11px] text-[#5A5650] italic pt-1">
                  Note: Expenses added in demo mode update budget statistics in temporary session state.
                </p>

                {/* Actions */}
                <div className="pt-3 border-t border-[#161514]/15 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#5A5650] hover:text-[#161514] transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-semibold tracking-[0.2em] uppercase hover:bg-[#C5A880] hover:text-[#161514] transition-colors"
                  >
                    Add Expense
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
