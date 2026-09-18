"use client";

import React, { useState, useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout/VendorDashboardShell";
import {
  VendorPayment,
  PaymentTransaction,
  VendorInvoice,
  PaymentStatus,
  INITIAL_VENDOR_PAYMENTS,
  INITIAL_PAYMENT_TRANSACTIONS,
  INITIAL_VENDOR_INVOICES,
} from "@/data/vendorPayments";
import {
  calculatePaymentsSummary,
  filterVendorPayments,
  PaymentFilterState,
  getPaymentsNeedingAttention,
} from "@/lib/vendorPayments";
import {
  PaymentsPageHeader,
  PaymentsOverview,
  PaymentsNeedsAttention,
  PaymentsSnapshot,
  PaymentPipeline,
  UpcomingPayments,
  PaymentFilters,
  PaymentList,
  PaymentDetail,
  PaymentTransactionList,
  InvoiceList,
  InvoiceDetail,
  PaymentReceiptPreview,
  PaymentEditor,
  PaymentsPageCTA,
} from "@/components/vendor-dashboard/payments";
import { CreditCard, Receipt, FileText } from "lucide-react";

export default function VendorPaymentsPage() {
  // Master Datasets State
  const [payments, setPayments] = useState<VendorPayment[]>(INITIAL_VENDOR_PAYMENTS);
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_PAYMENT_TRANSACTIONS);
  const [invoices, setInvoices] = useState<VendorInvoice[]>(INITIAL_VENDOR_INVOICES);

  // Active Workspace Tab State
  const [activeTab, setActiveTab] = useState<"ledger" | "transactions" | "invoices">("ledger");

  // Payment Filters State
  const [filters, setFilters] = useState<PaymentFilterState>({
    status: "ALL",
    type: "ALL",
    method: "ALL",
    dueState: "ALL",
    service: "ALL",
    destination: "ALL",
    searchQuery: "",
    sortBy: "newest",
  });

  // Modal / Drawer Selection States
  const [selectedPaymentId, setSelectedPaymentId] = useState<string | null>(null);
  const [selectedInvoiceId, setSelectedInvoiceId] = useState<string | null>(null);
  const [selectedReceiptTxn, setSelectedReceiptTxn] = useState<PaymentTransaction | null>(null);
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [editingPayment, setEditingPayment] = useState<VendorPayment | null>(null);

  // Derived summaries
  const summary = useMemo(() => calculatePaymentsSummary(payments, invoices), [payments, invoices]);
  const needsAttentionList = useMemo(() => getPaymentsNeedingAttention(payments, invoices), [payments, invoices]);

  // Derived filtered payments
  const filteredPayments = useMemo(() => {
    return filterVendorPayments(payments, filters);
  }, [payments, filters]);

  // Selected object references
  const selectedPayment = useMemo(() => {
    if (!selectedPaymentId) return null;
    return payments.find((p) => p.id === selectedPaymentId) || null;
  }, [payments, selectedPaymentId]);

  const selectedInvoice = useMemo(() => {
    if (!selectedInvoiceId) return null;
    return invoices.find((inv) => inv.id === selectedInvoiceId) || null;
  }, [invoices, selectedInvoiceId]);

  // Filter Control Handlers
  const handleFilterChange = (updates: Partial<PaymentFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      status: "ALL",
      type: "ALL",
      method: "ALL",
      dueState: "ALL",
      service: "ALL",
      destination: "ALL",
      searchQuery: "",
      sortBy: "newest",
    });
  };

  const handleResetDemoData = () => {
    setPayments(INITIAL_VENDOR_PAYMENTS);
    setTransactions(INITIAL_PAYMENT_TRANSACTIONS);
    setInvoices(INITIAL_VENDOR_INVOICES);
    handleResetFilters();
    setSelectedPaymentId(null);
    setSelectedInvoiceId(null);
    setSelectedReceiptTxn(null);
  };

  const handleMetricSelect = (metricKey: string) => {
    setActiveTab("ledger");
    handleResetFilters();
    if (metricKey === "PAID") {
      setFilters((prev) => ({ ...prev, status: "PAID" }));
    } else if (metricKey === "OVERDUE") {
      setFilters((prev) => ({ ...prev, status: "OVERDUE" }));
    } else if (metricKey === "OUTSTANDING") {
      setFilters((prev) => ({ ...prev, dueState: "DUE_SOON" }));
    }
  };

  // Record or Update Payment Handler
  const handleSavePayment = (
    paymentData: Partial<VendorPayment>,
    txnRef?: string
  ) => {
    const now = new Date().toISOString();

    if (editingPayment) {
      // Update existing payment
      setPayments((prev) =>
        prev.map((p) => {
          if (p.id === editingPayment.id) {
            return {
              ...p,
              ...paymentData,
              updatedAt: now,
            };
          }
          return p;
        })
      );
      setEditingPayment(null);
    } else {
      // Add new payment milestone record
      const newPayId = `pay_${Date.now()}`;
      const payRef = `PAY-2026-${Math.floor(100 + Math.random() * 900)}`;

      const newPayment: VendorPayment = {
        id: newPayId,
        paymentReference: payRef,
        bookingId: paymentData.bookingId || "BK-2026-001",
        clientReference: paymentData.clientReference || "CLI-2026-001",
        coupleName: paymentData.coupleName || "New Couple",
        service: paymentData.service || "Full Wedding Photography & Cinematography",
        packageName: paymentData.packageName || "Custom Package",
        destination: paymentData.destination || "Mumbai",
        weddingDate: paymentData.weddingDate || "2026-11-15",
        paymentType: paymentData.paymentType || "ADVANCE",
        amount: paymentData.amount || 100000,
        paidAmount: paymentData.paidAmount || 0,
        outstandingAmount: paymentData.outstandingAmount || paymentData.amount || 100000,
        dueDate: paymentData.dueDate || new Date().toISOString().split("T")[0],
        paidAt: paymentData.paidAmount && paymentData.paidAmount > 0 ? now : undefined,
        status: paymentData.status || "PENDING",
        paymentMethod: paymentData.paymentMethod || "UPI",
        notes: paymentData.notes,
        createdAt: now,
        updatedAt: now,
      };

      setPayments((prev) => [newPayment, ...prev]);

      // Record transaction if paid amount > 0
      if (paymentData.paidAmount && paymentData.paidAmount > 0) {
        const newTxn: PaymentTransaction = {
          id: `txn_${Date.now()}`,
          transactionReference: txnRef || `TXN-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          paymentId: newPayId,
          bookingId: newPayment.bookingId,
          clientReference: newPayment.clientReference,
          coupleName: newPayment.coupleName,
          amount: paymentData.paidAmount,
          transactionDate: now,
          paymentMethod: paymentData.paymentMethod || "UPI",
          paymentType: newPayment.paymentType,
          status: "SUCCESS",
          notes: "Recorded manual payment milestone receipt",
          createdAt: now,
        };
        setTransactions((prev) => [newTxn, ...prev]);
      }

      setIsRecordPaymentOpen(false);
      setSelectedPaymentId(newPayId);
    }
  };

  // Update Status Handler
  const handleUpdateStatus = (paymentId: string, newStatus: PaymentStatus) => {
    const now = new Date().toISOString();

    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === paymentId) {
          let updatedPaid = p.paidAmount;
          let updatedOutstanding = p.outstandingAmount;

          if (newStatus === "PAID") {
            updatedPaid = p.amount;
            updatedOutstanding = 0;
          } else if (newStatus === "CANCELLED" || newStatus === "REFUNDED") {
            updatedOutstanding = 0;
          }

          return {
            ...p,
            status: newStatus,
            paidAmount: updatedPaid,
            outstandingAmount: updatedOutstanding,
            paidAt: newStatus === "PAID" ? now : p.paidAt,
            updatedAt: now,
          };
        }
        return p;
      })
    );
  };

  // Notes Handlers
  const handleSaveNotes = (paymentId: string, noteContent: string) => {
    const now = new Date().toISOString();
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            notes: noteContent,
            updatedAt: now,
          };
        }
        return p;
      })
    );
  };

  const handleDeleteNotes = (paymentId: string) => {
    const now = new Date().toISOString();
    setPayments((prev) =>
      prev.map((p) => {
        if (p.id === paymentId) {
          return {
            ...p,
            notes: undefined,
            updatedAt: now,
          };
        }
        return p;
      })
    );
  };

  // Create Invoice Demo Handler
  const handleCreateInvoice = () => {
    const now = new Date().toISOString().split("T")[0];
    const newInvId = `inv_${Date.now()}`;
    const newInv: VendorInvoice = {
      id: newInvId,
      invoiceNumber: `INV-2026-${Math.floor(100 + Math.random() * 900)}`,
      bookingId: "BK-2026-001",
      clientReference: "CLI-2026-001",
      coupleName: "Aditi & Arjun",
      service: "Royal Heritage Collection (Udaipur)",
      issueDate: now,
      dueDate: "2026-11-01",
      subtotal: 750000,
      taxAmount: 0,
      totalAmount: 750000,
      paidAmount: 550000,
      outstandingAmount: 200000,
      status: "DRAFT",
      notes: "Newly created draft invoice statement.",
    };

    setInvoices((prev) => [newInv, ...prev]);
    setActiveTab("invoices");
    setSelectedInvoiceId(newInvId);
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 pb-16">
        {/* Page Header */}
        <PaymentsPageHeader
          onRecordPayment={() => setIsRecordPaymentOpen(true)}
          onCreateInvoice={handleCreateInvoice}
          onResetData={handleResetDemoData}
        />

        {/* Financial Overview Metrics */}
        <PaymentsOverview
          summary={summary}
          activeMetricFilter={filters.status}
          onSelectMetricFilter={handleMetricSelect}
        />

        {/* Financial Action Items */}
        <PaymentsNeedsAttention
          items={needsAttentionList}
          onSelectPayment={(id) => setSelectedPaymentId(id)}
        />

        {/* Collection Snapshot Analysis */}
        <PaymentsSnapshot summary={summary} payments={payments} />

        {/* Milestone Status Pipeline */}
        <PaymentPipeline
          payments={payments}
          activeStatus={filters.status}
          onSelectStatus={(st) => handleFilterChange({ status: st })}
        />

        {/* Upcoming Payment Schedule */}
        <UpcomingPayments
          payments={payments}
          onSelectPayment={(id) => setSelectedPaymentId(id)}
        />

        {/* Workspace Sub-Navigation Tabs */}
        <div className="border-b border-[#161514]/10">
          <div className="flex items-center gap-8 text-xs font-medium font-sans uppercase tracking-wider">
            <button
              type="button"
              onClick={() => setActiveTab("ledger")}
              className={`pb-3 border-b-2 transition-all inline-flex items-center gap-2 ${
                activeTab === "ledger"
                  ? "border-[#161514] text-[#161514] font-semibold"
                  : "border-transparent text-[#5A5650] hover:text-[#161514]"
              }`}
            >
              <CreditCard className="w-4 h-4 text-[#C5A880]" />
              Milestone Ledger ({payments.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("transactions")}
              className={`pb-3 border-b-2 transition-all inline-flex items-center gap-2 ${
                activeTab === "transactions"
                  ? "border-[#161514] text-[#161514] font-semibold"
                  : "border-transparent text-[#5A5650] hover:text-[#161514]"
              }`}
            >
              <Receipt className="w-4 h-4 text-[#C5A880]" />
              Transaction History ({transactions.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("invoices")}
              className={`pb-3 border-b-2 transition-all inline-flex items-center gap-2 ${
                activeTab === "invoices"
                  ? "border-[#161514] text-[#161514] font-semibold"
                  : "border-transparent text-[#5A5650] hover:text-[#161514]"
              }`}
            >
              <FileText className="w-4 h-4 text-[#C5A880]" />
              Invoices & Statements ({invoices.length})
            </button>
          </div>
        </div>

        {/* TAB 1: MILESTONE LEDGER */}
        {activeTab === "ledger" && (
          <div className="space-y-6">
            <PaymentFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredPayments.length}
            />

            <PaymentList
              payments={filteredPayments}
              selectedPaymentId={selectedPaymentId || undefined}
              onSelectPayment={(id) => setSelectedPaymentId(id)}
              onResetFilters={handleResetFilters}
              onRecordPayment={() => setIsRecordPaymentOpen(true)}
            />
          </div>
        )}

        {/* TAB 2: TRANSACTIONS */}
        {activeTab === "transactions" && (
          <PaymentTransactionList
            transactions={transactions}
            onSelectReceipt={(txn) => setSelectedReceiptTxn(txn)}
          />
        )}

        {/* TAB 3: INVOICES */}
        {activeTab === "invoices" && (
          <InvoiceList
            invoices={invoices}
            selectedInvoiceId={selectedInvoiceId || undefined}
            onSelectInvoice={(invId) => setSelectedInvoiceId(invId)}
            onCreateInvoice={handleCreateInvoice}
          />
        )}

        {/* Closing CTA */}
        <PaymentsPageCTA />
      </div>

      {/* Side-Panel Payment Detail Workspace */}
      <PaymentDetail
        payment={selectedPayment}
        transactions={transactions}
        invoices={invoices}
        onClose={() => setSelectedPaymentId(null)}
        onUpdateStatus={handleUpdateStatus}
        onSaveNotes={handleSaveNotes}
        onDeleteNotes={handleDeleteNotes}
        onOpenEditModal={(p) => setEditingPayment(p)}
        onSelectReceipt={(txn) => setSelectedReceiptTxn(txn)}
        onSelectInvoice={(invId) => {
          setSelectedPaymentId(null);
          setActiveTab("invoices");
          setSelectedInvoiceId(invId);
        }}
      />

      {/* Record / Edit Payment Modal */}
      {(isRecordPaymentOpen || editingPayment) && (
        <PaymentEditor
          isOpen={true}
          onClose={() => {
            setIsRecordPaymentOpen(false);
            setEditingPayment(null);
          }}
          paymentToEdit={editingPayment}
          onSave={handleSavePayment}
        />
      )}

      {/* Invoice Statement Modal Preview */}
      {selectedInvoice && (
        <InvoiceDetail
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoiceId(null)}
        />
      )}

      {/* Receipt Preview Modal */}
      {selectedReceiptTxn && (
        <PaymentReceiptPreview
          transaction={selectedReceiptTxn}
          onClose={() => setSelectedReceiptTxn(null)}
        />
      )}
    </VendorDashboardShell>
  );
}
