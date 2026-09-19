"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import {
  VendorPayment,
  PaymentTransaction,
  VendorInvoice,
  PaymentStatus,
} from "@/data/vendorPayments";
import {
  formatIndianCurrency,
  formatPaymentType,
  formatPaymentMethod,
  calculatePaymentCompletion,
} from "@/lib/vendorPayments";
import { PaymentStatusControl } from "./PaymentStatusControl";
import { PaymentNotes } from "./PaymentNotes";
import { ContextualLink } from "@/components/common/ContextualLink";
import {
  X,
  FileText,
  Edit,
} from "lucide-react";

interface PaymentDetailProps {
  payment: VendorPayment | null;
  transactions: PaymentTransaction[];
  invoices: VendorInvoice[];
  onClose: () => void;
  onUpdateStatus: (paymentId: string, newStatus: PaymentStatus) => void;
  onSaveNotes: (paymentId: string, notes: string) => void;
  onDeleteNotes: (paymentId: string) => void;
  onOpenEditModal: (payment: VendorPayment) => void;
  onSelectReceipt?: (txn: PaymentTransaction) => void;
  onSelectInvoice?: (invoiceId: string) => void;
}

export const PaymentDetail: React.FC<PaymentDetailProps> = ({
  payment,
  transactions,
  invoices,
  onClose,
  onUpdateStatus,
  onSaveNotes,
  onDeleteNotes,
  onOpenEditModal,
  onSelectReceipt,
  onSelectInvoice,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!payment) return null;

  const completionPct = calculatePaymentCompletion(payment);

  // Filter linked transactions
  const relatedTxns = transactions.filter(
    (t) => t.paymentId === payment.id || t.bookingId === payment.bookingId
  );

  // Filter linked invoice
  const linkedInvoice = invoices.find(
    (inv) => inv.id === payment.invoiceId || inv.bookingId === payment.bookingId
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/50 backdrop-blur-xs flex justify-end transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="payment-detail-title"
    >
      <div className="w-full max-w-2xl bg-[#FAF8F5] h-full overflow-y-auto border-l border-[#161514]/20 shadow-2xl flex flex-col justify-between">
        <div>
          {/* Top Bar Header */}
          <div className="bg-[#161514] text-[#FAF8F5] p-6 flex items-start justify-between sticky top-0 z-10">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-mono text-xs text-[#C5A880] font-semibold">
                  {payment.paymentReference}
                </span>
                <span className="text-xs text-[#FAF8F5]/60">•</span>
                <span className="text-xs uppercase tracking-wider text-[#FAF8F5]/80 font-sans">
                  {formatPaymentType(payment.paymentType)}
                </span>
              </div>

              <h2 id="payment-detail-title" className="font-serif text-2xl font-normal text-[#FAF8F5]">
                {payment.coupleName}
              </h2>
              <p className="text-xs text-[#FAF8F5]/70 font-sans mt-0.5">
                {payment.service} ({payment.destination})
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-[#FAF8F5]/70 hover:text-white transition-colors"
              aria-label="Close detail panel"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Dossier Content Body */}
          <div className="p-6 space-y-8">
            {/* Financial Summary Highlight */}
            <div className="p-5 bg-white border border-[#161514]/10 rounded-sm shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#161514]/10">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block font-sans">
                    Total Milestone Amount
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#161514]">
                    {formatIndianCurrency(payment.amount)}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block font-sans">
                    Milestone Due Date
                  </span>
                  <span className="font-serif text-base font-semibold text-[#161514]">
                    {payment.dueDate}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div>
                <div className="flex justify-between items-center text-xs font-sans mb-1.5">
                  <span className="text-[#5A5650]">
                    Received: <strong className="text-emerald-800">{formatIndianCurrency(payment.paidAmount)}</strong>
                  </span>
                  <span className="text-[#5A5650]">
                    Balance: <strong className="text-amber-900">{formatIndianCurrency(payment.outstandingAmount)}</strong>
                  </span>
                </div>
                <div className="w-full h-2.5 bg-[#161514]/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#161514] transition-all duration-300"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
                <div className="text-right text-[10px] text-[#5A5650] mt-1 font-sans">
                  {completionPct}% Collected
                </div>
              </div>
            </div>

            {/* Status & Priority Control */}
            <div className="p-4 bg-white border border-[#161514]/10 rounded-sm">
              <PaymentStatusControl
                currentStatus={payment.status}
                onUpdateStatus={(status) => onUpdateStatus(payment.id, status)}
              />
            </div>

            {/* Client & Booking Context */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ContextualLink
                label="Client Record"
                value={payment.coupleName}
                href="/vendor/dashboard/clients"
                actionLabel="View client profile"
              />
              <ContextualLink
                label="Booking Contract"
                value={`#${payment.bookingId}`}
                href="/vendor/dashboard/bookings"
                actionLabel="View booking"
              />
            </div>

            {/* Linked Transactions */}
            <div className="space-y-3">
              <h3 className="font-serif text-lg font-medium text-[#161514]">
                Linked Payment Transactions
              </h3>
              {relatedTxns.length === 0 ? (
                <p className="text-xs text-[#5A5650] font-sans italic p-3 bg-white border border-[#161514]/10 rounded-sm">
                  No payment transaction logs recorded for this milestone yet.
                </p>
              ) : (
                <div className="space-y-2">
                  {relatedTxns.map((txn) => (
                    <div
                      key={txn.id}
                      className="p-3 bg-white border border-[#161514]/10 rounded-sm flex items-center justify-between text-xs font-sans"
                    >
                      <div>
                        <span className="font-mono font-semibold text-[#161514] block">
                          {txn.transactionReference}
                        </span>
                        <span className="text-[#5A5650]">
                          {formatPaymentMethod(txn.paymentMethod)} • {txn.transactionDate.split("T")[0]}
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-serif text-sm font-semibold text-emerald-800 block">
                          +{formatIndianCurrency(txn.amount)}
                        </span>
                        {onSelectReceipt && (
                          <button
                            type="button"
                            onClick={() => onSelectReceipt(txn)}
                            className="text-[11px] text-[#C5A880] underline hover:text-[#161514]"
                          >
                            Receipt
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Linked Invoice */}
            {linkedInvoice && (
              <div className="p-4 bg-white border border-[#161514]/10 rounded-sm space-y-2 font-sans">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#161514]">
                    <FileText className="w-4 h-4 text-[#C5A880]" />
                    Linked Statement Invoice: {linkedInvoice.invoiceNumber}
                  </div>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-xs bg-gray-100 text-gray-800">
                    {linkedInvoice.status}
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-[#5A5650]">
                  <span>Total Amount: <strong>{formatIndianCurrency(linkedInvoice.totalAmount)}</strong></span>
                  {onSelectInvoice && (
                    <button
                      type="button"
                      onClick={() => onSelectInvoice(linkedInvoice.id)}
                      className="text-xs text-[#C5A880] underline font-medium hover:text-[#161514]"
                    >
                      View Invoice Statement
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Private Vendor Notes */}
            <PaymentNotes
              paymentId={payment.id}
              notes={payment.notes}
              onSaveNotes={onSaveNotes}
              onDeleteNotes={onDeleteNotes}
            />
          </div>
        </div>

        {/* Bottom Drawer Actions Footer */}
        <div className="p-4 bg-[#FAF8F5] border-t border-[#161514]/10 flex items-center justify-between gap-3 sticky bottom-0 z-10">
          <button
            type="button"
            onClick={() => onOpenEditModal(payment)}
            className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider rounded-sm hover:bg-[#2c2927] transition-colors"
          >
            <Edit className="w-3.5 h-3.5 text-[#C5A880]" />
            Edit Milestone
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 border border-[#161514]/20 text-[#161514] bg-white hover:bg-[#161514]/5 text-xs font-medium uppercase tracking-wider rounded-sm transition-colors"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};
