"use client";

import React from "react";
import { VendorPayment } from "@/data/vendorPayments";
import {
  formatIndianCurrency,
  formatPaymentStatus,
  formatPaymentType,
  formatPaymentMethod,
  getPaymentDueState,
} from "@/lib/vendorPayments";
import { AlertCircle, ChevronRight } from "lucide-react";

interface PaymentListItemProps {
  payment: VendorPayment;
  isSelected: boolean;
  onSelect: () => void;
}

export const PaymentListItem: React.FC<PaymentListItemProps> = ({
  payment,
  isSelected,
  onSelect,
}) => {
  const dueState = getPaymentDueState(payment);
  const isOverdue = dueState === "OVERDUE";
  const isPaid = payment.status === "PAID";

  return (
    <>
      {/* DESKTOP TABLE ROW */}
      <tr
        onClick={onSelect}
        className={`hidden md:table-row cursor-pointer transition-colors border-b border-[#161514]/10 ${
          isSelected
            ? "bg-[#C5A880]/15"
            : "bg-[#FAF8F5] hover:bg-white"
        }`}
      >
        {/* Payment Ref */}
        <td className="py-4 px-4 align-middle">
          <span className="font-mono text-xs font-semibold text-[#161514] block">
            {payment.paymentReference}
          </span>
          <span className="text-[10px] text-[#5A5650] font-sans block">
            Ref #{payment.bookingId}
          </span>
        </td>

        {/* Client & Booking */}
        <td className="py-4 px-4 align-middle">
          <span className="font-serif text-sm font-medium text-[#161514] block">
            {payment.coupleName}
          </span>
          <span className="text-xs text-[#5A5650] font-sans truncate max-w-[200px] block">
            {payment.service}
          </span>
        </td>

        {/* Milestone Type */}
        <td className="py-4 px-4 align-middle">
          <span className="text-xs text-[#161514] font-medium font-sans block">
            {formatPaymentType(payment.paymentType)}
          </span>
          <span className="text-[10px] text-[#5A5650] font-sans block">
            {formatPaymentMethod(payment.paymentMethod)}
          </span>
        </td>

        {/* Due Date */}
        <td className="py-4 px-4 align-middle font-sans text-xs">
          <span
            className={`${
              isOverdue
                ? "text-rose-800 font-semibold"
                : "text-[#161514]"
            }`}
          >
            {payment.dueDate}
          </span>
          {payment.paidAt && (
            <span className="text-[10px] text-[#5A5650] block">
              Paid: {payment.paidAt.split("T")[0]}
            </span>
          )}
        </td>

        {/* Total Amount */}
        <td className="py-4 px-4 align-middle font-serif text-sm text-[#161514] font-medium">
          {formatIndianCurrency(payment.amount)}
        </td>

        {/* Paid Amount */}
        <td className="py-4 px-4 align-middle font-serif text-sm text-emerald-800 font-medium">
          {formatIndianCurrency(payment.paidAmount)}
        </td>

        {/* Outstanding */}
        <td className="py-4 px-4 align-middle font-serif text-sm font-semibold">
          <span
            className={
              payment.outstandingAmount > 0
                ? "text-amber-900"
                : "text-[#5A5650]"
            }
          >
            {formatIndianCurrency(payment.outstandingAmount)}
          </span>
        </td>

        {/* Status */}
        <td className="py-4 px-4 align-middle">
          <span
            className={`inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-xs font-sans ${
              isPaid
                ? "bg-emerald-100 text-emerald-900"
                : isOverdue
                ? "bg-rose-100 text-rose-900"
                : payment.status === "PARTIALLY_PAID"
                ? "bg-amber-100 text-amber-900"
                : "bg-[#161514]/10 text-[#161514]"
            }`}
          >
            {isOverdue && <AlertCircle className="w-3 h-3 text-rose-700" />}
            {formatPaymentStatus(payment.status)}
          </span>
        </td>

        {/* Action */}
        <td className="py-4 px-4 align-middle text-right">
          <button
            type="button"
            className="p-1.5 text-[#5A5650] hover:text-[#161514] transition-colors"
            title="View Details"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </td>
      </tr>

      {/* MOBILE CARD VIEW */}
      <div
        onClick={onSelect}
        className={`md:hidden p-4 border rounded-sm transition-all cursor-pointer bg-[#FAF8F5] mb-3 ${
          isSelected
            ? "border-[#C5A880] ring-1 ring-[#C5A880]"
            : "border-[#161514]/10 hover:border-[#C5A880]"
        }`}
      >
        <div className="flex items-center justify-between gap-2 mb-2">
          <span className="font-mono text-xs text-[#5A5650]">
            {payment.paymentReference}
          </span>
          <span
            className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
              isPaid
                ? "bg-emerald-100 text-emerald-900"
                : isOverdue
                ? "bg-rose-100 text-rose-900"
                : payment.status === "PARTIALLY_PAID"
                ? "bg-amber-100 text-amber-900"
                : "bg-[#161514]/10 text-[#161514]"
            }`}
          >
            {formatPaymentStatus(payment.status)}
          </span>
        </div>

        <h4 className="font-serif text-base font-medium text-[#161514] mb-1">
          {payment.coupleName}
        </h4>
        <p className="text-xs text-[#5A5650] font-sans mb-3">
          {formatPaymentType(payment.paymentType)} • {payment.service}
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#161514]/10 text-xs font-sans">
          <div>
            <span className="text-[10px] text-[#5A5650] block">Total</span>
            <span className="font-serif font-medium text-[#161514]">
              {formatIndianCurrency(payment.amount)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5A5650] block">Paid</span>
            <span className="font-serif font-medium text-emerald-800">
              {formatIndianCurrency(payment.paidAmount)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-[#5A5650] block">Balance</span>
            <span className="font-serif font-medium text-amber-900">
              {formatIndianCurrency(payment.outstandingAmount)}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
