"use client";

import React from "react";
import { PaymentActionItem } from "@/data/vendorPayments";
import { AlertCircle, ArrowRight, Clock } from "lucide-react";

interface PaymentsNeedsAttentionProps {
  items: PaymentActionItem[];
  onSelectPayment: (paymentId: string) => void;
  onSelectInvoice?: (bookingId: string) => void;
}

export const PaymentsNeedsAttention: React.FC<PaymentsNeedsAttentionProps> = ({
  items,
  onSelectPayment,
}) => {
  if (items.length === 0) {
    return (
      <section className="mb-12">
        <div className="p-6 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-center">
          <p className="text-xs text-[#5A5650] font-sans">
            No financial items require urgent attention. All milestones are up to date.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C5A880]" />
          <h2 className="font-serif text-lg font-medium text-[#161514]">
            Financial Action Items
          </h2>
        </div>
        <span className="text-xs text-[#5A5650] font-sans font-medium">
          {items.length} item{items.length !== 1 ? "s" : ""} requiring review
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((item) => {
          const isHighPriority = item.priority === "HIGH";

          return (
            <div
              key={item.id}
              className={`p-5 border rounded-sm transition-all duration-200 bg-[#FAF8F5] flex flex-col justify-between ${
                isHighPriority
                  ? "border-rose-300 hover:border-rose-400"
                  : "border-[#161514]/15 hover:border-[#C5A880]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
                      isHighPriority
                        ? "bg-rose-100 text-rose-800"
                        : "bg-[#C5A880]/15 text-[#8C6D3F]"
                    }`}
                  >
                    {item.type.replace("_", " ")}
                  </span>
                  {item.dueDate && (
                    <span className="text-[11px] text-[#5A5650] font-sans flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {item.dueDate}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-base text-[#161514] font-medium mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#5A5650] leading-relaxed mb-4 font-sans">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#161514]/10 flex items-center justify-between">
                {item.amount !== undefined ? (
                  <span className="font-serif text-sm font-semibold text-[#161514]">
                    ₹{item.amount.toLocaleString("en-IN")}
                  </span>
                ) : (
                  <span className="text-xs text-[#5A5650]">Action required</span>
                )}

                {item.paymentId && (
                  <button
                    type="button"
                    onClick={() => onSelectPayment(item.paymentId!)}
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#161514] hover:text-[#C5A880] transition-colors"
                  >
                    View Payment
                    <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
