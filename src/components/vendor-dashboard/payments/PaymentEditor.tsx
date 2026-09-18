"use client";

import React, { useState } from "react";
import {
  VendorPayment,
  PaymentType,
  PaymentMethod,
  PaymentStatus,
} from "@/data/vendorPayments";
import { X, ShieldAlert } from "lucide-react";

interface PaymentEditorProps {
  isOpen: boolean;
  onClose: () => void;
  paymentToEdit?: VendorPayment | null;
  onSave: (payment: Partial<VendorPayment>, txnRef?: string) => void;
}

export const PaymentEditor: React.FC<PaymentEditorProps> = ({
  isOpen,
  onClose,
  paymentToEdit,
  onSave,
}) => {
  const isEdit = !!paymentToEdit;

  const [coupleName, setCoupleName] = useState(paymentToEdit?.coupleName || "");
  const [bookingId, setBookingId] = useState(paymentToEdit?.bookingId || "BK-2026-001");
  const clientReference = paymentToEdit?.clientReference || "CLI-2026-001";
  const service = paymentToEdit?.service || "Full Wedding Photography & Cinematography";
  const packageName = paymentToEdit?.packageName || "Royal Heritage Collection";
  const destination = paymentToEdit?.destination || "Udaipur";
  const weddingDate = paymentToEdit?.weddingDate || "2026-11-15";

  const [paymentType, setPaymentType] = useState<PaymentType>(paymentToEdit?.paymentType || "ADVANCE");
  const [amount, setAmount] = useState<number>(paymentToEdit?.amount || 150000);
  const [paidAmount, setPaidAmount] = useState<number>(paymentToEdit?.paidAmount || 150000);
  const [dueDate, setDueDate] = useState<string>(paymentToEdit?.dueDate || new Date().toISOString().split("T")[0]);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(paymentToEdit?.paymentMethod || "UPI");
  const [transactionRef, setTransactionRef] = useState<string>(() => `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [notes, setNotes] = useState<string>(paymentToEdit?.notes || "");

  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coupleName.trim()) {
      setError("Couple name is required.");
      return;
    }
    if (!amount || amount <= 0) {
      setError("Payment milestone amount must be greater than zero.");
      return;
    }
    if (!dueDate) {
      setError("Due date is required.");
      return;
    }

    const calculatedOutstanding = Math.max(0, amount - paidAmount);
    let computedStatus: PaymentStatus = "PENDING";
    if (paidAmount >= amount) {
      computedStatus = "PAID";
    } else if (paidAmount > 0) {
      computedStatus = "PARTIALLY_PAID";
    }

    onSave(
      {
        coupleName: coupleName.trim(),
        bookingId,
        clientReference,
        service,
        packageName,
        destination,
        weddingDate,
        paymentType,
        amount,
        paidAmount,
        outstandingAmount: calculatedOutstanding,
        dueDate,
        status: computedStatus,
        paymentMethod,
        notes: notes.trim() || undefined,
        paidAt: paidAmount > 0 ? new Date().toISOString() : undefined,
      },
      transactionRef.trim() || undefined
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-editor-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 rounded-sm w-full max-w-xl overflow-hidden shadow-2xl my-8 relative">
        {/* Header */}
        <div className="bg-[#161514] text-[#FAF8F5] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span id="payment-editor-title" className="font-serif text-lg text-[#FAF8F5] font-normal">
              {isEdit ? "Edit Financial Milestone" : "Record Payment Milestone"}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#FAF8F5]/70 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 bg-white space-y-4">
          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 text-xs rounded-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-700 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
            {/* Couple & Booking Select */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="pay-couple" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Couple Name *
                </label>
                <input
                  id="pay-couple"
                  type="text"
                  required
                  value={coupleName}
                  onChange={(e) => setCoupleName(e.target.value)}
                  placeholder="e.g. Aditi & Arjun"
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="pay-booking-id" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Booking Ref / ID
                </label>
                <select
                  id="pay-booking-id"
                  value={bookingId}
                  onChange={(e) => setBookingId(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                >
                  <option value="BK-2026-001">BK-2026-001 (Aditi & Arjun)</option>
                  <option value="BK-2026-002">BK-2026-002 (Meera & Rohan)</option>
                  <option value="BK-2026-003">BK-2026-003 (Isha & Kunal)</option>
                  <option value="BK-2026-004">BK-2026-004 (Ananya & Kabir)</option>
                  <option value="BK-2026-005">BK-2026-005 (Priya & Dev)</option>
                </select>
              </div>
            </div>

            {/* Payment Type & Channel */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="pay-type" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Milestone Type
                </label>
                <select
                  id="pay-type"
                  value={paymentType}
                  onChange={(e) => setPaymentType(e.target.value as PaymentType)}
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                >
                  <option value="ADVANCE">Booking Advance Deposit</option>
                  <option value="INSTALLMENT">Milestone Installment</option>
                  <option value="FINAL_PAYMENT">Final Settlement</option>
                  <option value="ADD_ON">Add-on Package Service</option>
                  <option value="REFUND">Refund / Adjustment</option>
                </select>
              </div>

              <div>
                <label htmlFor="pay-method" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Payment Channel / Method
                </label>
                <select
                  id="pay-method"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                >
                  <option value="UPI">UPI (GPay / PhonePe / Paytm)</option>
                  <option value="BANK_TRANSFER">Bank Transfer / NEFT / RTGS</option>
                  <option value="CARD">Credit / Debit Card</option>
                  <option value="CASH">Cash</option>
                  <option value="OTHER">Other Channel</option>
                </select>
              </div>
            </div>

            {/* Total Milestone Amount & Paid Amount */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="pay-total-amount" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Total Milestone Amount (₹) *
                </label>
                <input
                  id="pay-total-amount"
                  type="number"
                  required
                  value={amount || ""}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  placeholder="150000"
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-mono"
                />
              </div>

              <div>
                <label htmlFor="pay-paid-amount" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Amount Received So Far (₹)
                </label>
                <input
                  id="pay-paid-amount"
                  type="number"
                  value={paidAmount || ""}
                  onChange={(e) => setPaidAmount(Number(e.target.value))}
                  placeholder="150000"
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-mono"
                />
              </div>
            </div>

            {/* Due Date & Transaction Ref */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label htmlFor="pay-due-date" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Milestone Due Date *
                </label>
                <input
                  id="pay-due-date"
                  type="date"
                  required
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
                />
              </div>

              <div>
                <label htmlFor="pay-txn-ref" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                  Bank / UPI Transaction Ref #
                </label>
                <input
                  id="pay-txn-ref"
                  type="text"
                  value={transactionRef}
                  onChange={(e) => setTransactionRef(e.target.value)}
                  placeholder="e.g. TXN-2026-9912"
                  className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-mono"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label htmlFor="pay-notes" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Internal Operational Notes
              </label>
              <textarea
                id="pay-notes"
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional payment notes or bank confirmation details..."
                className="w-full p-2.5 bg-white border border-[#161514]/20 focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm"
              />
            </div>

            <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-[11px] text-[#5A5650]">
              <strong>Demo Action Notice:</strong> Demo only — no real money movement or payment gateway processing will occur.
            </div>

            {/* Buttons */}
            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#161514]/10">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#161514]/20 bg-white text-[#161514] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#161514]/5"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927] transition-colors"
              >
                {isEdit ? "Update Milestone" : "Record Payment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
