"use client";

import React from "react";
import Link from "next/link";
import { FileText, RefreshCw, CreditCard } from "lucide-react";

interface PaymentsPageHeaderProps {
  onRecordPayment: () => void;
  onCreateInvoice: () => void;
  onResetData: () => void;
}

export const PaymentsPageHeader: React.FC<PaymentsPageHeaderProps> = ({
  onRecordPayment,
  onCreateInvoice,
  onResetData,
}) => {
  return (
    <header className="mb-10 pb-8 border-b border-[#161514]/10">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="mb-4">
        <ol className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#5A5650]">
          <li>
            <Link
              href="/vendor/dashboard"
              className="hover:text-[#161514] transition-colors"
            >
              Vendor Studio
            </Link>
          </li>
          <li>/</li>
          <li className="font-semibold text-[#161514]" aria-current="page">
            Payments & Finance
          </li>
        </ol>
      </nav>

      {/* Main Header Content */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A880] block mb-1 font-sans">
            FINANCE WORKSPACE
          </span>
          <h1 className="font-serif text-3xl md:text-4xl text-[#161514] font-normal leading-tight">
            Know what has been booked, received, and what comes next.
          </h1>
          <p className="text-[#5A5650] text-sm md:text-base mt-2 max-w-2xl font-sans leading-relaxed">
            Keep every payment, outstanding amount, and financial commitment connected to the celebrations you are creating together.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onRecordPayment}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#161514] text-[#FAF8F5] text-xs font-medium tracking-wider uppercase hover:bg-[#2c2927] transition-colors rounded-sm shadow-xs"
          >
            <CreditCard className="w-4 h-4 text-[#C5A880]" />
            Record Payment
          </button>

          <button
            type="button"
            onClick={onCreateInvoice}
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-[#161514]/20 bg-[#FAF8F5] text-[#161514] text-xs font-medium tracking-wider uppercase hover:bg-[#161514]/5 transition-colors rounded-sm"
          >
            <FileText className="w-4 h-4 text-[#5A5650]" />
            Create Invoice
          </button>

          <button
            type="button"
            onClick={onResetData}
            title="Reset to default demo financial dataset"
            className="p-2.5 border border-[#161514]/15 text-[#5A5650] hover:text-[#161514] hover:bg-[#161514]/5 transition-colors rounded-sm"
            aria-label="Reset Demo Dataset"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Demo Workspace Notice */}
      <div className="mt-6 inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded-sm text-xs text-[#161514]">
        <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880] animate-pulse" />
        <span className="font-medium">Demo finance workspace</span> — payment processing and invoicing integrations are not connected yet. Session-only demo data.
      </div>
    </header>
  );
};
