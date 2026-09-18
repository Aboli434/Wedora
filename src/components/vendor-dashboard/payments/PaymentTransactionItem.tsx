"use client";

import React from "react";
import { PaymentTransaction } from "@/data/vendorPayments";
import {
  formatIndianCurrency,
  formatPaymentMethod,
  formatPaymentType,
} from "@/lib/vendorPayments";
import { CheckCircle2, ArrowUpRight } from "lucide-react";

interface PaymentTransactionItemProps {
  transaction: PaymentTransaction;
  onSelectReceipt?: (transaction: PaymentTransaction) => void;
}

export const PaymentTransactionItem: React.FC<PaymentTransactionItemProps> = ({
  transaction,
  onSelectReceipt,
}) => {
  return (
    <div className="p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#C5A880] transition-colors">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-semibold text-[#161514]">
            {transaction.transactionReference}
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-emerald-100 text-emerald-900 font-sans flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-700" />
            {transaction.status}
          </span>
        </div>

        <div className="font-serif text-base font-medium text-[#161514]">
          {transaction.coupleName}
        </div>

        <p className="text-xs text-[#5A5650] font-sans">
          {formatPaymentType(transaction.paymentType)} via{" "}
          <strong>{formatPaymentMethod(transaction.paymentMethod)}</strong>
        </p>

        {transaction.notes && (
          <p className="text-[11px] text-[#5A5650] italic font-sans">
            &quot;{transaction.notes}&quot;
          </p>
        )}
      </div>

      <div className="flex sm:flex-col items-start sm:items-end justify-between sm:justify-center gap-1 border-t sm:border-0 pt-2 sm:pt-0 border-[#161514]/10">
        <span className="font-serif text-base font-semibold text-emerald-900">
          +{formatIndianCurrency(transaction.amount)}
        </span>
        <span className="text-[10px] text-[#5A5650] font-sans">
          {transaction.transactionDate.split("T")[0]}
        </span>

        {onSelectReceipt && (
          <button
            type="button"
            onClick={() => onSelectReceipt(transaction)}
            className="text-xs text-[#C5A880] hover:text-[#161514] transition-colors font-sans underline flex items-center gap-0.5 mt-1"
          >
            <span>View Receipt</span>
            <ArrowUpRight className="w-3 h-3" />
          </button>
        )}
      </div>
    </div>
  );
};
