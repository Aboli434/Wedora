"use client";

import React, { useState, useMemo } from "react";
import { DashboardShell } from "@/components/dashboard";
import { MOCK_DASHBOARD_VENDORS, DashboardVendor } from "@/data/vendorsDashboard";
import {
  calculateVendorSummary,
  calculateVendorPaymentSummary,
  calculateVendorCategoryCounts,
  calculateVendorStatusCounts,
  getVendorActions,
  getUpcomingVendorActions,
  filterDashboardVendors,
  sortDashboardVendors,
  VendorFiltersState,
} from "@/lib/vendorsDashboard";
import {
  VendorsPageHeader,
  VendorOverview,
  VendorNeedsAttention,
  VendorCategoryBreakdown,
  VendorStatusOverview,
  VendorPaymentSnapshot,
  VendorUpcomingActions,
  VendorFilters,
  VendorList,
  AddVendorForm,
  VendorDetail,
  VendorPageCTA,
} from "@/components/dashboard/vendors";

export default function VendorsDashboardPage() {
  // Local state for interactive demo behavior
  const [vendors, setVendors] = useState<DashboardVendor[]>(MOCK_DASHBOARD_VENDORS);
  const [filters, setFilters] = useState<VendorFiltersState>({
    search: "",
    category: "ALL",
    status: "ALL",
    paymentStatus: "ALL",
    event: "ALL",
  });
  const [sortBy, setSortBy] = useState<string>("updated");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<DashboardVendor | null>(null);

  // Derived Business Logic Calculations
  const summary = useMemo(() => calculateVendorSummary(vendors), [vendors]);
  const paymentSummary = useMemo(() => calculateVendorPaymentSummary(vendors), [vendors]);
  const categoryCounts = useMemo(() => calculateVendorCategoryCounts(vendors), [vendors]);
  const statusCounts = useMemo(() => calculateVendorStatusCounts(vendors), [vendors]);
  const attentionItems = useMemo(() => getVendorActions(vendors), [vendors]);
  const upcomingActions = useMemo(() => getUpcomingVendorActions(vendors), [vendors]);

  // Filtered & Sorted Vendors List
  const filteredVendors = useMemo(() => {
    const list = filterDashboardVendors(vendors, filters);
    return sortDashboardVendors(list, sortBy);
  }, [vendors, filters, sortBy]);

  // Handlers
  const handleFilterChange = (updated: Partial<VendorFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      category: "ALL",
      status: "ALL",
      paymentStatus: "ALL",
      event: "ALL",
    });
    setSortBy("updated");
  };

  const handleAddVendor = (newVendor: DashboardVendor) => {
    setVendors((prev) => [newVendor, ...prev]);
  };

  const handleSelectVendorById = (vendorId: string) => {
    const target = vendors.find((v) => v.id === vendorId);
    if (target) {
      setSelectedVendor(target);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-10 max-w-7xl mx-auto pb-12">
        {/* Page Header */}
        <VendorsPageHeader
          onAddVendorClick={() => setIsAddModalOpen(true)}
        />

        {/* Vendor Overview Summary */}
        <VendorOverview summary={summary} />

        {/* Needs Attention Alert List */}
        <VendorNeedsAttention
          items={attentionItems}
          onSelectVendor={handleSelectVendorById}
        />

        {/* Category Breakdown & Status Journey Flow Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <VendorCategoryBreakdown categories={categoryCounts} />
          <VendorStatusOverview statuses={statusCounts} />
        </div>

        {/* Payment Snapshot */}
        <VendorPaymentSnapshot
          paymentSummary={paymentSummary}
          vendors={vendors}
          onSelectVendor={handleSelectVendorById}
        />

        {/* Upcoming Vendor Actions */}
        <VendorUpcomingActions
          vendors={upcomingActions}
          onSelectVendor={handleSelectVendorById}
        />

        {/* Private Vendor Directory Workspace */}
        <div className="space-y-6 pt-4 border-t border-[#161514]/15">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              MY VENDORS DIRECTORY
            </span>
            <h2 className="font-serif text-3xl text-[#161514] font-light">
              Your Vendor Workspace & Contracts
            </h2>
          </div>

          <VendorFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalVendors={vendors.length}
            filteredCount={filteredVendors.length}
            onResetFilters={handleResetFilters}
          />

          <VendorList
            vendors={filteredVendors}
            onSelectVendor={setSelectedVendor}
            onClearFilters={handleResetFilters}
          />
        </div>

        {/* Closing CTA */}
        <VendorPageCTA />

        {/* Add Vendor Modal Dialog */}
        <AddVendorForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddVendor={handleAddVendor}
        />

        {/* Vendor Detail Modal Dossier */}
        <VendorDetail
          vendor={selectedVendor}
          onClose={() => setSelectedVendor(null)}
        />
      </div>
    </DashboardShell>
  );
}
