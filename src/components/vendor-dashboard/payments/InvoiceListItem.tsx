"use client";

import React from "react";
import { VendorInvoice } from "@/data/vendorPayments";
import {
  formatIndianCurrency,
  formatInvoiceStatus,
} from "@/lib/vendorPayments";
import { FileText, ChevronRight } from "lucide-react";

interface InvoiceListItemProps {
  invoice: VendorInvoice;
  isSelected: boolean;
  onSelect: () => void;
}

export const InvoiceListItem: React.FC<InvoiceListItemProps> = ({
  invoice,
  isSelected,
  onSelect,
}) => {
  const isPaid = invoice.status === "PAID";

  return (
    <div
      onClick={onSelect}
      className={`p-4 border rounded-sm transition-all cursor-pointer bg-[#FAF8F5] flex items-center justify-between gap-4 ${
        isSelected
          ? "border-[#C5A880] ring-1 ring-[#C5A880] bg-white"
          : "border-[#161514]/10 hover:border-[#C5A880]"
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-white border border-[#161514]/10 rounded-sm text-[#161514]">
          <FileText className="w-5 h-5 text-[#C5A880]" />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="font-mono text-xs font-semibold text-[#161514]">
              {invoice.invoiceNumber}
            </span>
            <span
              className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-xs font-sans ${
                isPaid
                  ? "bg-emerald-100 text-emerald-900"
                  : invoice.status === "DRAFT"
                  ? "bg-gray-200 text-gray-800"
                  : "bg-amber-100 text-amber-900"
              }`}
            >
              {formatInvoiceStatus(invoice.status)}
            </span>
          </div>

          <h4 className="font-serif text-base font-medium text-[#161514]">
            {invoice.coupleName}
          </h4>
          <p className="text-xs text-[#5A5650] font-sans truncate max-w-[280px]">
            {invoice.service} • Issue Date: {invoice.issueDate}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right font-sans">
          <span className="text-[10px] text-[#5A5650] uppercase tracking-wider block">
            Total Invoice
          </span>
          <span className="font-serif text-base font-semibold text-[#161514]">
            {formatIndianCurrency(invoice.totalAmount)}
          </span>
          {invoice.outstandingAmount > 0 && (
            <span className="text-[10px] text-amber-900 block font-sans font-medium">
              Due: {formatIndianCurrency(invoice.outstandingAmount)}
            </span>
          )}
        </div>

        <ChevronRight className="w-4 h-4 text-[#5A5650]" />
      </div>
    </div>
  );
};
