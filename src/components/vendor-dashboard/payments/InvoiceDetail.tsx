"use client";

import React from "react";
import { VendorInvoice } from "@/data/vendorPayments";
import { formatIndianCurrency, formatInvoiceStatus } from "@/lib/vendorPayments";
import { X, Download } from "lucide-react";

interface InvoiceDetailProps {
  invoice: VendorInvoice | null;
  onClose: () => void;
}

export const InvoiceDetail: React.FC<InvoiceDetailProps> = ({
  invoice,
  onClose,
}) => {
  if (!invoice) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#161514]/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="invoice-title"
    >
      <div className="bg-[#FAF8F5] border border-[#161514]/20 rounded-sm w-full max-w-2xl overflow-hidden shadow-2xl my-8 relative">
        {/* Top Header Controls */}
        <div className="bg-[#161514] text-[#FAF8F5] p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-[#C5A880] font-medium font-sans">
              STATEMENT PREVIEW
            </span>
            <span className="text-xs text-[#FAF8F5]/60">•</span>
            <span className="font-mono text-xs">{invoice.invoiceNumber}</span>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1 text-[#FAF8F5]/70 hover:text-white transition-colors"
            aria-label="Close invoice modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Paper Document */}
        <div className="p-8 space-y-8 bg-white text-[#161514] font-sans">
          {/* Header Branding & Reference */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-[#161514]/15">
            <div>
              <span className="font-serif text-2xl text-[#161514] font-medium tracking-wide block">
                The Frame House
              </span>
              <p className="text-xs text-[#5A5650] mt-1 font-sans">
                Fine Art Wedding Photography & Cinematography Studio
              </p>
              <p className="text-[11px] text-[#5A5650] mt-0.5 font-sans">
                Mumbai • Udaipur • Jaipur • Goa
              </p>
            </div>

            <div className="text-left sm:text-right font-sans">
              <div id="invoice-title" className="font-serif text-xl font-bold uppercase tracking-wider text-[#161514]">
                INVOICE
              </div>
              <span className="font-mono text-sm font-semibold text-[#C5A880] block mt-0.5">
                {invoice.invoiceNumber}
              </span>
              <div className="mt-2 space-y-0.5 text-xs text-[#5A5650]">
                <div>Issue Date: <strong>{invoice.issueDate}</strong></div>
                <div>Due Date: <strong>{invoice.dueDate}</strong></div>
              </div>
            </div>
          </div>

          {/* Bill To & Booking Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
                Billed To (Couple)
              </span>
              <h4 className="font-serif text-lg font-medium text-[#161514]">
                {invoice.coupleName}
              </h4>
              <span className="text-xs text-[#5A5650] block font-mono">
                Client ID: {invoice.clientReference}
              </span>
            </div>

            <div>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-[#5A5650] block mb-1">
                Booking Reference
              </span>
              <span className="font-mono text-sm font-medium text-[#161514] block">
                #{invoice.bookingId}
              </span>
              <span className="text-xs text-[#5A5650] block">
                Status: <strong>{formatInvoiceStatus(invoice.status)}</strong>
              </span>
            </div>
          </div>

          {/* Items Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b-2 border-[#161514] text-[10px] uppercase tracking-wider text-[#5A5650]">
                  <th className="py-2.5 font-semibold">Service Description</th>
                  <th className="py-2.5 text-right font-semibold">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#161514]/10 text-xs">
                <tr>
                  <td className="py-3 font-medium text-[#161514]">
                    {invoice.service}
                    {invoice.notes && (
                      <span className="block text-[11px] text-[#5A5650] font-normal mt-0.5">
                        {invoice.notes}
                      </span>
                    )}
                  </td>
                  <td className="py-3 text-right font-serif font-medium text-[#161514]">
                    {formatIndianCurrency(invoice.subtotal)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Totals Summary */}
          <div className="flex flex-col items-end pt-4 border-t border-[#161514]/15 space-y-1.5 font-sans">
            <div className="flex items-center justify-between w-64 text-xs text-[#5A5650]">
              <span>Subtotal:</span>
              <span className="font-serif text-sm font-medium text-[#161514]">
                {formatIndianCurrency(invoice.subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between w-64 text-xs text-[#5A5650]">
              <span>Taxes / Adjustments:</span>
              <span className="font-serif text-sm font-medium text-[#161514]">
                {formatIndianCurrency(invoice.taxAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between w-64 pt-2 border-t border-[#161514]/20 text-sm font-semibold text-[#161514]">
              <span>Total Invoice:</span>
              <span className="font-serif text-lg text-[#161514]">
                {formatIndianCurrency(invoice.totalAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between w-64 text-xs text-emerald-800">
              <span>Amount Paid:</span>
              <span className="font-serif text-sm font-medium">
                {formatIndianCurrency(invoice.paidAmount)}
              </span>
            </div>
            <div className="flex items-center justify-between w-64 text-xs font-semibold text-amber-900">
              <span>Balance Due:</span>
              <span className="font-serif text-base">
                {formatIndianCurrency(invoice.outstandingAmount)}
              </span>
            </div>
          </div>

          {/* Legal Notice */}
          <div className="p-3 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm text-[11px] text-[#5A5650] text-center font-sans">
            <strong>Demo Invoice Notice:</strong> This statement is an operational representation for Wedora Vendor Studio demonstration. It is not a tax document or legal tax invoice.
          </div>
        </div>

        {/* Modal Actions */}
        <div className="bg-[#FAF8F5] border-t border-[#161514]/10 p-4 flex items-center justify-between">
          <span className="text-xs text-[#5A5650] font-sans">
            Status: <strong className="text-[#161514]">{formatInvoiceStatus(invoice.status)}</strong>
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => alert("Demo statement download initiated.")}
              className="px-4 py-2 border border-[#161514]/20 bg-white text-[#161514] text-xs font-medium uppercase tracking-wider hover:bg-[#161514]/5 rounded-sm inline-flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              Download Demo
            </button>

            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] rounded-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
