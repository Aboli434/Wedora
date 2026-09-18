"use client";

import React from "react";
import { VendorPayment } from "@/data/vendorPayments";
import { PaymentListItem } from "./PaymentListItem";
import { PaymentsEmptyState } from "./PaymentsEmptyState";

interface PaymentListProps {
  payments: VendorPayment[];
  selectedPaymentId?: string;
  onSelectPayment: (paymentId: string) => void;
  onResetFilters: () => void;
  onRecordPayment: () => void;
}

export const PaymentList: React.FC<PaymentListProps> = ({
  payments,
  selectedPaymentId,
  onSelectPayment,
  onResetFilters,
  onRecordPayment,
}) => {
  if (payments.length === 0) {
    return (
      <PaymentsEmptyState
        type="filtered"
        onResetFilters={onResetFilters}
        onRecordPayment={onRecordPayment}
      />
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {/* DESKTOP LEDGER TABLE */}
      <div className="hidden md:block overflow-x-auto border border-[#161514]/10 rounded-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#161514] text-[#FAF8F5] text-[10px] font-semibold uppercase tracking-[0.15em] font-sans border-b border-[#161514]">
              <th className="py-3.5 px-4 font-normal">Ref</th>
              <th className="py-3.5 px-4 font-normal">Client & Service</th>
              <th className="py-3.5 px-4 font-normal">Milestone Type</th>
              <th className="py-3.5 px-4 font-normal">Due Date</th>
              <th className="py-3.5 px-4 font-normal">Booked</th>
              <th className="py-3.5 px-4 font-normal">Paid</th>
              <th className="py-3.5 px-4 font-normal">Outstanding</th>
              <th className="py-3.5 px-4 font-normal">Status</th>
              <th className="py-3.5 px-4 text-right font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#161514]/10 bg-[#FAF8F5]">
            {payments.map((payment) => (
              <PaymentListItem
                key={payment.id}
                payment={payment}
                isSelected={selectedPaymentId === payment.id}
                onSelect={() => onSelectPayment(payment.id)}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE STACKED CARDS */}
      <div className="md:hidden">
        {payments.map((payment) => (
          <PaymentListItem
            key={payment.id}
            payment={payment}
            isSelected={selectedPaymentId === payment.id}
            onSelect={() => onSelectPayment(payment.id)}
          />
        ))}
      </div>
    </div>
  );
};
