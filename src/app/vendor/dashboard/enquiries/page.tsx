"use client";

import React, { useState, useEffect } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  INITIAL_VENDOR_ENQUIRIES,
  VendorEnquiry,
  EnquiryStatus,
  EnquiryPriority,
} from "@/data/vendorEnquiries";
import {
  EnquiryFilterState,
  calculateEnquiriesSummary,
  calculateStatusCounts,
  getEnquiriesNeedingAttention,
  filterVendorEnquiries,
} from "@/lib/vendorEnquiries";
import {
  EnquiriesPageHeader,
  EnquiriesOverview,
  EnquiriesNeedsAttention,
  EnquiryPipeline,
  EnquiryFilters,
  EnquiryList,
  EnquiryDetail,
  EnquiriesEmptyState,
  EnquiriesPageCTA,
} from "@/components/vendor-dashboard/enquiries";
import {
  getVendorEnquiriesApi,
  updateVendorEnquiryStatusApi,
} from "@/lib/api/endpoints";

export default function VendorEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<VendorEnquiry[]>(
    INITIAL_VENDOR_ENQUIRIES
  );
  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<EnquiryFilterState>({
    status: "ALL",
    priority: "ALL",
    service: "ALL",
    destination: "ALL",
    contactMethod: "ALL",
    unread: "ALL",
    searchQuery: "",
    sortBy: "NEWEST",
  });

  useEffect(() => {
    let isMounted = true;
    async function loadEnquiries() {
      try {
        setLoading(true);
        const apiEnquiries = await getVendorEnquiriesApi();
        if (Array.isArray(apiEnquiries) && isMounted) {
          const mapped: VendorEnquiry[] = apiEnquiries.map((eq) => ({
            id: eq.id,
            coupleName: `Client (${eq.weddingId.slice(0, 8)})`,
            email: "client@wedora.com",
            phone: "+91 98765 43210",
            weddingDate: eq.eventDate ? new Date(eq.eventDate).toISOString().split("T")[0] : undefined,
            dateStatus: "CONFIRMED",
            destination: "Destination Venue",
            guestCount: eq.guestCount || 100,
            serviceRequested: "Full Service",
            budgetRange: eq.estimatedBudget ? `₹${(Number(eq.estimatedBudget) / 100).toLocaleString()}` : "Flexible",
            message: eq.message,
            status: (eq.status as EnquiryStatus) || "NEW",
            priority: "NORMAL",
            source: "WEDORA",
            receivedAt: new Date(eq.createdAt).toLocaleDateString(),
            lastUpdatedAt: new Date(eq.updatedAt).toLocaleDateString(),
            preferredContactMethod: "EMAIL",
            notes: eq.referenceCode ? `Ref: ${eq.referenceCode}` : undefined,
            unread: false,
            activities: [],
          }));
          setEnquiries(mapped);
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadEnquiries();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derived computations
  const summary = calculateEnquiriesSummary(enquiries);
  const statusCounts = calculateStatusCounts(enquiries);
  const needsAttentionList = getEnquiriesNeedingAttention(enquiries);
  const filteredEnquiries = filterVendorEnquiries(enquiries, filters);

  const selectedEnquiry = enquiries.find((e) => e.id === selectedEnquiryId) || null;

  const handleUpdateStatus = async (id: string, newStatus: EnquiryStatus) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
    );

    try {
      await updateVendorEnquiryStatusApi(id, newStatus);
    } catch {
      // Retain optimistic state
    }
  };

  const handleUpdatePriority = (id: string, priority: EnquiryPriority) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, priority } : e))
    );
  };

  const handleToggleUnread = (id: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, unread: !e.unread } : e))
    );
  };

  const handleSaveNotes = (id: string, notes: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, notes } : e))
    );
  };

  const handleDeleteNotes = (id: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, notes: undefined } : e))
    );
  };

  const handleSaveDraft = (id: string, draftResponse: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, draftResponse } : e))
    );
  };

  const handleMarkResponseSent = (id: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: "RESPONDED" as EnquiryStatus } : e))
    );
  };

  const handleResetFilters = () => {
    setFilters({
      status: "ALL",
      priority: "ALL",
      service: "ALL",
      destination: "ALL",
      contactMethod: "ALL",
      unread: "ALL",
      searchQuery: "",
      sortBy: "NEWEST",
    });
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 pb-12">
        <EnquiriesPageHeader onFilterNew={() => setFilters((prev) => ({ ...prev, status: "NEW" }))} />

        {loading ? (
          <div className="p-8 text-center text-xs text-[#6E6B65] font-sans">Loading enquiries...</div>
        ) : (
          <>
            <EnquiriesOverview
              summary={summary}
              activeFilterStatus={filters.status}
              onSelectStatusFilter={(s) => setFilters((prev) => ({ ...prev, status: s as "ALL" | EnquiryStatus }))}
            />
            <EnquiriesNeedsAttention enquiriesNeedingAttention={needsAttentionList} onSelectEnquiry={(e) => setSelectedEnquiryId(e.id)} />
            <EnquiryPipeline statusCounts={statusCounts} activeStatus={filters.status} onSelectStatus={(s) => setFilters((prev) => ({ ...prev, status: s as "ALL" | EnquiryStatus }))} />
            <EnquiryFilters filters={filters} onFilterChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))} onResetFilters={handleResetFilters} totalFilteredCount={filteredEnquiries.length} />

            {filteredEnquiries.length === 0 ? (
              <EnquiriesEmptyState />
            ) : (
              <EnquiryList
                enquiries={filteredEnquiries}
                selectedEnquiryId={selectedEnquiryId || undefined}
                onSelectEnquiry={(e) => setSelectedEnquiryId(e.id)}
                onResetFilters={handleResetFilters}
              />
            )}

            <EnquiriesPageCTA />
          </>
        )}

        <EnquiryDetail
          enquiry={selectedEnquiry}
          onClose={() => setSelectedEnquiryId(null)}
          onUpdateStatus={handleUpdateStatus}
          onUpdatePriority={handleUpdatePriority}
          onToggleUnread={handleToggleUnread}
          onSaveDraft={handleSaveDraft}
          onMarkResponseSent={handleMarkResponseSent}
          onSaveNotes={handleSaveNotes}
          onDeleteNotes={handleDeleteNotes}
        />
      </div>
    </VendorDashboardShell>
  );
}
