"use client";

import React from "react";
import { PaymentTransaction } from "@/data/vendorPayments";
import {
  formatIndianCurrency,
  formatPaymentMethod,
  formatPaymentType,
} from "@/lib/vendorPayments";
import { X, CheckCircle2, ShieldCheck } from "lucide-react";

interface PaymentReceiptPreviewProps {
  transaction: PaymentTransaction | null;
  onClose: () => void;
}

export const PaymentReceiptPreview: React.FC<PaymentReceiptPreviewProps> = ({
  transaction,
  onClose,
}) => {
  if (!transaction) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="receipt-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 rounded-sm w-full max-w-lg overflow-hidden shadow-2xl my-8">
        {/* Header */}
        <div className="bg-[#161514] text-[#FAF8F5] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#C5A880]" />
            <span id="receipt-title" className="text-xs uppercase tracking-widest text-[#FAF8F5] font-medium font-sans">
              PAYMENT RECEIPT
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#FAF8F5]/70 hover:text-white transition-colors"
            aria-label="Close receipt modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Receipt Content */}
        <div className="p-6 bg-white space-y-6 font-sans">
          <div className="text-center pb-4 border-b border-[#161514]/10">
            <span className="font-serif text-xl text-[#161514] font-medium block">
              The Frame House
            </span>
            <span className="text-xs text-[#5A5650] block mt-0.5">
              Official Payment Acknowledgment Receipt
            </span>
            <span className="font-mono text-xs text-[#C5A880] block mt-1">
              Receipt #{transaction.transactionReference}
            </span>
          </div>

          <div className="text-center py-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block">
              Amount Received
            </span>
            <span className="font-serif text-3xl font-bold text-emerald-900 block my-1">
              {formatIndianCurrency(transaction.amount)}
            </span>
            <span className="text-xs text-emerald-800 font-medium inline-flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              Status: Verified Success
            </span>
          </div>

          <div className="space-y-3 text-xs text-[#5A5650] divide-y divide-[#161514]/10">
            <div className="flex justify-between pt-2">
              <span>Client / Couple:</span>
              <strong className="text-[#161514]">{transaction.coupleName}</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span>Client ID:</span>
              <span className="font-mono text-[#161514]">{transaction.clientReference}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span>Booking ID:</span>
              <span className="font-mono text-[#161514]">#{transaction.bookingId}</span>
            </div>
            <div className="flex justify-between pt-2">
              <span>Payment Type:</span>
              <strong className="text-[#161514]">{formatPaymentType(transaction.paymentType)}</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span>Payment Method:</span>
              <strong className="text-[#161514]">{formatPaymentMethod(transaction.paymentMethod)}</strong>
            </div>
            <div className="flex justify-between pt-2">
              <span>Date & Time:</span>
              <strong className="text-[#161514]">{transaction.transactionDate.replace("T", " ").replace("Z", "")}</strong>
            </div>
            {transaction.notes && (
              <div className="flex justify-between pt-2">
                <span>Reference Notes:</span>
                <span className="text-[#161514] italic">{transaction.notes}</span>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#161514]/10 text-center">
            <p className="text-[11px] text-[#5A5650]">
              Demo receipt — no real payment was processed.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF8F5] p-4 border-t border-[#161514]/10 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] rounded-sm"
          >
            Close Receipt
          </button>
        </div>
      </div>
    </div>
  );
};
