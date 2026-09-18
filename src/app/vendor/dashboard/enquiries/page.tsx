"use client";

import React, { useState } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  INITIAL_VENDOR_ENQUIRIES,
  VendorEnquiry,
  EnquiryStatus,
  EnquiryPriority,
  EnquiryActivity,
} from "@/data/vendorEnquiries";
import {
  EnquiryFilterState,
  calculateEnquiriesSummary,
  calculateStatusCounts,
  getEnquiriesNeedingAttention,
  filterVendorEnquiries,
  formatEnquiryStatus,
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
import { RefreshCw } from "lucide-react";

export default function VendorEnquiriesPage() {
  const [enquiries, setEnquiries] = useState<VendorEnquiry[]>(
    INITIAL_VENDOR_ENQUIRIES
  );

  const [selectedEnquiryId, setSelectedEnquiryId] = useState<string | null>(
    null
  );

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

  // Derived computations
  const summary = calculateEnquiriesSummary(enquiries);
  const statusCounts = calculateStatusCounts(enquiries);
  const needsAttentionList = getEnquiriesNeedingAttention(enquiries);
  const filteredEnquiries = filterVendorEnquiries(enquiries, filters);

  const selectedEnquiry =
    enquiries.find((e) => e.id === selectedEnquiryId) || null;

  // Handlers
  const handleFilterChange = (updates: Partial<EnquiryFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
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

  const handleOpenDetail = (enquiry: VendorEnquiry) => {
    setSelectedEnquiryId(enquiry.id);

    // Automatically mark as read when opened if it was unread
    if (enquiry.unread) {
      setEnquiries((prev) =>
        prev.map((item) =>
          item.id === enquiry.id ? { ...item, unread: false } : item
        )
      );
    }
  };

  const handleCloseDetail = () => {
    setSelectedEnquiryId(null);
  };

  const handleUpdateStatus = (
    enquiryId: string,
    newStatus: EnquiryStatus
  ) => {
    const timestamp = new Date().toISOString();
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== enquiryId) return e;

        const newActivity: EnquiryActivity = {
          id: `act-${Date.now()}`,
          enquiryId,
          type: "STATUS_CHANGED",
          description: `Status changed from ${formatEnquiryStatus(
            e.status
          )} to ${formatEnquiryStatus(newStatus)}.`,
          createdAt: timestamp,
        };

        return {
          ...e,
          status: newStatus,
          lastUpdatedAt: timestamp,
          activities: [newActivity, ...e.activities],
        };
      })
    );
  };

  const handleUpdatePriority = (
    enquiryId: string,
    priority: EnquiryPriority
  ) => {
    const timestamp = new Date().toISOString();
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== enquiryId) return e;
        return {
          ...e,
          priority,
          lastUpdatedAt: timestamp,
        };
      })
    );
  };

  const handleToggleUnread = (enquiryId: string) => {
    setEnquiries((prev) =>
      prev.map((e) => (e.id === enquiryId ? { ...e, unread: !e.unread } : e))
    );
  };

  const handleSaveDraft = (enquiryId: string, draftResponse: string) => {
    const timestamp = new Date().toISOString();
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== enquiryId) return e;

        const newActivity: EnquiryActivity = {
          id: `act-${Date.now()}`,
          enquiryId,
          type: "RESPONSE_DRAFTED",
          description: "Saved draft response.",
          createdAt: timestamp,
        };

        return {
          ...e,
          draftResponse,
          lastUpdatedAt: timestamp,
          activities: [newActivity, ...e.activities],
        };
      })
    );
  };

  const handleMarkResponseSent = (enquiryId: string) => {
    const timestamp = new Date().toISOString();
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== enquiryId) return e;

        const newActivity: EnquiryActivity = {
          id: `act-${Date.now()}`,
          enquiryId,
          type: "RESPONSE_SENT",
          description: "Official proposal & availability response sent.",
          createdAt: timestamp,
        };

        return {
          ...e,
          status: "RESPONDED",
          unread: false,
          draftResponse: undefined,
          lastUpdatedAt: timestamp,
          activities: [newActivity, ...e.activities],
        };
      })
    );
  };

  const handleSaveNotes = (enquiryId: string, notes: string) => {
    const timestamp = new Date().toISOString();
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== enquiryId) return e;

        const newActivity: EnquiryActivity = {
          id: `act-${Date.now()}`,
          enquiryId,
          type: "NOTE_ADDED",
          description: "Updated internal studio note.",
          createdAt: timestamp,
        };

        return {
          ...e,
          notes,
          lastUpdatedAt: timestamp,
          activities: [newActivity, ...e.activities],
        };
      })
    );
  };

  const handleDeleteNotes = (enquiryId: string) => {
    const timestamp = new Date().toISOString();
    setEnquiries((prev) =>
      prev.map((e) => {
        if (e.id !== enquiryId) return e;
        return {
          ...e,
          notes: undefined,
          lastUpdatedAt: timestamp,
        };
      })
    );
  };

  const handleResetDataset = () => {
    setEnquiries(INITIAL_VENDOR_ENQUIRIES);
    handleResetFilters();
    setSelectedEnquiryId(null);
  };

  return (
    <VendorDashboardShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <EnquiriesPageHeader
          onFilterNew={() => handleFilterChange({ status: "NEW" })}
        />

        {enquiries.length === 0 ? (
          <EnquiriesEmptyState />
        ) : (
          <>
            {/* Metric Overview */}
            <EnquiriesOverview
              summary={summary}
              activeFilterStatus={filters.status}
              onSelectStatusFilter={(status) => {
                if (status === "UNREAD") {
                  handleFilterChange({ unread: "UNREAD", status: "ALL" });
                } else {
                  handleFilterChange({ status: status as EnquiryStatus | "ALL", unread: "ALL" });
                }
              }}
            />

            {/* Needs Attention */}
            <EnquiriesNeedsAttention
              enquiriesNeedingAttention={needsAttentionList}
              onSelectEnquiry={handleOpenDetail}
            />

            {/* Pipeline visualizer */}
            <EnquiryPipeline
              statusCounts={statusCounts}
              activeStatus={filters.status}
              onSelectStatus={(status) =>
                handleFilterChange({
                  status: status as EnquiryStatus | "ALL",
                })
              }
            />

            {/* Filters bar */}
            <EnquiryFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredEnquiries.length}
            />

            {/* Enquiries List */}
            <EnquiryList
              enquiries={filteredEnquiries}
              selectedEnquiryId={selectedEnquiryId || undefined}
              onSelectEnquiry={handleOpenDetail}
              onResetFilters={handleResetFilters}
            />
          </>
        )}

        {/* Reset Demo Data Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-[#161514]/10 text-xs text-[#5A5650]">
          <span>Frontend Interactive State Workspace</span>
          <button
            onClick={handleResetDataset}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 border border-[#161514]/20 text-[#161514] hover:bg-[#FAF8F5] transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#C5A880]" />
            Reset Demo Dataset
          </button>
        </div>

        {/* Bottom CTA */}
        <EnquiriesPageCTA />

        {/* Detail Side Panel Modal */}
        <EnquiryDetail
          enquiry={selectedEnquiry}
          onClose={handleCloseDetail}
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
