"use client";

import React from "react";
import { VendorPayment } from "@/data/vendorPayments";
import {
  formatIndianCurrency,
  formatPaymentType,
  getPaymentDueState,
} from "@/lib/vendorPayments";
import { Calendar, AlertCircle, ArrowRight } from "lucide-react";

interface UpcomingPaymentsProps {
  payments: VendorPayment[];
  onSelectPayment: (paymentId: string) => void;
}

export const UpcomingPayments: React.FC<UpcomingPaymentsProps> = ({
  payments,
  onSelectPayment,
}) => {
  const upcomingList = payments
    .filter(
      (p) =>
        p.status === "PENDING" ||
        p.status === "PARTIALLY_PAID" ||
        p.status === "OVERDUE"
    )
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
    .slice(0, 6);

  if (upcomingList.length === 0) {
    return (
      <section className="mb-12">
        <div className="p-6 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-center">
          <p className="text-xs text-[#5A5650] font-sans">
            No upcoming or outstanding payments scheduled.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Upcoming Payment Schedule
          </h2>
        </div>
        <span className="text-xs text-[#5A5650] font-sans">
          Next 6 upcoming financial milestones
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {upcomingList.map((payment) => {
          const dueState = getPaymentDueState(payment);
          const isOverdue = dueState === "OVERDUE";
          const isDueSoon = dueState === "DUE_SOON";

          return (
            <div
              key={payment.id}
              onClick={() => onSelectPayment(payment.id)}
              className={`p-5 border rounded-sm transition-all duration-200 cursor-pointer bg-[#FAF8F5] flex flex-col justify-between hover:shadow-xs ${
                isOverdue
                  ? "border-rose-300 hover:border-rose-400 bg-rose-50/30"
                  : isDueSoon
                  ? "border-amber-300 hover:border-amber-400"
                  : "border-[#161514]/15 hover:border-[#C5A880]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#C5A880] font-sans">
                    {formatPaymentType(payment.paymentType)}
                  </span>

                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans flex items-center gap-1 ${
                      isOverdue
                        ? "bg-rose-100 text-rose-800"
                        : isDueSoon
                        ? "bg-amber-100 text-amber-900"
                        : "bg-[#161514]/10 text-[#161514]"
                    }`}
                  >
                    {isOverdue && <AlertCircle className="w-3 h-3 text-rose-700" />}
                    {dueState}
                  </span>
                </div>

                <h3 className="font-serif text-base text-[#161514] font-medium mb-1">
                  {payment.coupleName}
                </h3>
                <p className="text-xs text-[#5A5650] font-sans truncate mb-3">
                  {payment.service} ({payment.destination})
                </p>
              </div>

              <div className="pt-3 border-t border-[#161514]/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block font-sans">
                    Due: {payment.dueDate}
                  </span>
                  <span className="font-serif text-base font-semibold text-[#161514]">
                    {formatIndianCurrency(payment.outstandingAmount)}
                  </span>
                </div>

                <button
                  type="button"
                  className="p-1.5 text-[#161514] hover:text-[#C5A880] transition-colors"
                  aria-label={`View details for ${payment.coupleName}`}
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
