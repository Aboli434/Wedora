"use client";

import React, { useState, useMemo } from "react";
import { VendorInvoice, InvoiceStatus } from "@/data/vendorPayments";
import { filterInvoices, InvoiceFilterState } from "@/lib/vendorPayments";
import { InvoiceListItem } from "./InvoiceListItem";
import { Search, FileText, Plus } from "lucide-react";

interface InvoiceListProps {
  invoices: VendorInvoice[];
  selectedInvoiceId?: string;
  onSelectInvoice: (invoiceId: string) => void;
  onCreateInvoice: () => void;
}

export const InvoiceList: React.FC<InvoiceListProps> = ({
  invoices,
  selectedInvoiceId,
  onSelectInvoice,
  onCreateInvoice,
}) => {
  const [filters, setFilters] = useState<InvoiceFilterState>({
    status: "ALL",
    searchQuery: "",
    sortBy: "newest",
  });

  const filtered = useMemo(() => {
    return filterInvoices(invoices, filters);
  }, [invoices, filters]);

  return (
    <section className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-[#161514]/10">
        <div>
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C5A880]" />
            <h3 className="font-serif text-xl text-[#161514] font-medium">
              Invoices & Billing Statements
            </h3>
          </div>
          <p className="text-xs text-[#5A5650] font-sans mt-0.5">
            Manage client invoice records and billing notices.
          </p>
        </div>

        <button
          type="button"
          onClick={onCreateInvoice}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#161514] text-[#FAF8F5] text-xs font-medium uppercase tracking-wider hover:bg-[#2c2927] transition-colors rounded-sm"
        >
          <Plus className="w-3.5 h-3.5 text-[#C5A880]" />
          Create Invoice
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-[#FAF8F5] border border-[#161514]/10 rounded-sm">
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-[#5A5650] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters((p) => ({ ...p, searchQuery: e.target.value }))}
            placeholder="Search invoice number, client..."
            className="w-full pl-8 pr-3 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filters.status}
            onChange={(e) =>
              setFilters((p) => ({ ...p, status: e.target.value as InvoiceStatus | "ALL" }))
            }
            className="px-2.5 py-1.5 bg-white border border-[#161514]/20 text-xs text-[#161514] focus:outline-none focus:ring-1 focus:ring-[#C5A880] rounded-sm font-sans"
          >
            <option value="ALL">All Invoice Statuses</option>
            <option value="DRAFT">Draft</option>
            <option value="ISSUED">Issued</option>
            <option value="PAID">Paid</option>
            <option value="VOID">Void</option>
          </select>
        </div>
      </div>

      {/* Invoice List */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center border border-dashed border-[#161514]/20 bg-[#FAF8F5]/60 rounded-sm">
          <p className="text-xs text-[#5A5650] font-sans">
            No invoice records match your search or status filter.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((inv) => (
            <InvoiceListItem
              key={inv.id}
              invoice={inv}
              isSelected={selectedInvoiceId === inv.id}
              onSelect={() => onSelectInvoice(inv.id)}
            />
          ))}
        </div>
      )}
    </section>
  );
};
