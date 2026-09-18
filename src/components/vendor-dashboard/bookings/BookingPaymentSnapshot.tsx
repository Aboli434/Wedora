"use client";

import React, { useState } from "react";
import { VendorBooking } from "@/data/vendorBookings";
import {
  formatIndianCurrency,
  calculateAmountOutstanding,
  calculatePaymentProgress,
  getPaymentDueStatus,
  formatPaymentStatus,
} from "@/lib/vendorBookings";
import { CreditCard, CheckCircle2, Sparkles, PlusCircle } from "lucide-react";

interface BookingPaymentSnapshotProps {
  booking: VendorBooking;
  onRecordPayment: (amount: number) => void;
}

export const BookingPaymentSnapshot: React.FC<BookingPaymentSnapshotProps> = ({
  booking,
  onRecordPayment,
}) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentInput, setPaymentInput] = useState(
    booking.nextPaymentAmount || booking.amountOutstanding
  );
  const [feedback, setFeedback] = useState<string | null>(null);

  const outstanding = calculateAmountOutstanding(booking);
  const progressPct = calculatePaymentProgress(booking);
  const dueInfo = getPaymentDueStatus(booking);

  const handleApplyPayment = () => {
    const num = Number(paymentInput);
    if (isNaN(num) || num <= 0 || num > outstanding) {
      setFeedback(`Please enter a valid amount up to ${formatIndianCurrency(outstanding)}.`);
      return;
    }

    onRecordPayment(num);
    setFeedback(`Recorded demo payment of ${formatIndianCurrency(num)}. Payment records are session-only.`);
    setShowPaymentModal(false);
    setTimeout(() => setFeedback(null), 4000);
  };

  return (
    <div className="bg-white border border-[#161514]/10 p-5 mb-8">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
        <div className="flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-[#C5A880]" />
          <h3 className="font-serif text-base font-medium text-[#161514]">
            Financial Milestone Snapshot
          </h3>
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-[#5A5650]">
          {formatPaymentStatus(booking.paymentStatus)}
        </span>
      </div>

      {/* Figures Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
            Total Contract
          </span>
          <div className="font-serif text-xl text-[#161514] font-medium">
            {formatIndianCurrency(booking.totalAmount)}
          </div>
        </div>

        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
            Amount Received
          </span>
          <div className="font-serif text-xl text-emerald-800 font-medium">
            {formatIndianCurrency(booking.amountReceived)}
          </div>
        </div>

        <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
            Outstanding Balance
          </span>
          <div className="font-serif text-xl text-[#161514] font-medium">
            {formatIndianCurrency(outstanding)}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-xs text-[#5A5650] mb-1">
          <span>Payment Progress</span>
          <span className="font-semibold text-[#161514]">{progressPct}%</span>
        </div>
        <div className="w-full h-2 bg-[#161514]/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#C5A880] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {/* Next Payment Due Banner */}
      {outstanding > 0 && booking.bookingStatus !== "CANCELLED" && (
        <div
          className={`p-3.5 border flex items-center justify-between gap-3 text-xs mb-4 ${
            dueInfo.state === "OVERDUE"
              ? "bg-rose-50 border-rose-200 text-rose-900"
              : dueInfo.state === "DUE_SOON"
              ? "bg-amber-50 border-amber-200 text-amber-900"
              : "bg-[#FAF8F5] border-[#161514]/15 text-[#161514]"
          }`}
        >
          <div>
            <div className="font-semibold uppercase tracking-wider text-[10px]">
              NEXT PAYMENT: {dueInfo.label}
            </div>
            <p className="text-[11px] opacity-90">
              Amount due: <strong>{formatIndianCurrency(booking.nextPaymentAmount || outstanding)}</strong>
            </p>
          </div>

          <button
            onClick={() => {
              setPaymentInput(booking.nextPaymentAmount || outstanding);
              setShowPaymentModal(true);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#161514]/90 transition-colors shrink-0"
          >
            <PlusCircle className="w-3.5 h-3.5 text-[#C5A880]" />
            Mark Payment Received
          </button>
        </div>
      )}

      {feedback && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2 mb-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{feedback}</span>
        </div>
      )}

      {/* Modal for Demo Payment Recording */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161514]/60 p-4">
          <div className="bg-[#FAF8F5] border border-[#161514]/20 p-6 max-w-md w-full shadow-2xl">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#161514]/10">
              <h4 className="font-serif text-lg font-medium text-[#161514]">
                Mark Payment Received (Demo)
              </h4>
              <span className="text-[10px] uppercase tracking-wider text-[#5A5650]">
                SESSION TEST
              </span>
            </div>

            <p className="text-xs text-[#5A5650] mb-4">
              Enter the payment amount received from {booking.coupleName}. Full financial accounting will connect when Vendor Payments is launched.
            </p>

            <div className="mb-4">
              <label htmlFor="payment-amount-input" className="block text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] mb-1">
                Payment Amount (₹)
              </label>
              <input
                id="payment-amount-input"
                type="number"
                value={paymentInput}
                onChange={(e) => setPaymentInput(Number(e.target.value))}
                max={outstanding}
                className="w-full p-2.5 bg-white border border-[#161514]/20 text-sm font-medium text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880]"
              />
              <span className="text-[10px] text-[#5A5650] mt-1 block">
                Max allowable: {formatIndianCurrency(outstanding)}
              </span>
            </div>

            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#161514]/10">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 border border-[#161514]/20 text-xs text-[#161514]"
              >
                Cancel
              </button>
              <button
                onClick={handleApplyPayment}
                className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider"
              >
                Apply Payment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notice */}
      <div className="flex items-center gap-1.5 text-[11px] text-[#5A5650]">
        <Sparkles className="w-3.5 h-3.5 text-[#C5A880] shrink-0" />
        <span>Demo action — payment records will be managed in Vendor Payments.</span>
      </div>
    </div>
  );
};
