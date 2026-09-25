"use client";

import React, { useState, useEffect, useMemo } from "react";
import { DashboardShell } from "@/components/dashboard";
import { MOCK_DASHBOARD_VENDORS, DashboardVendor, VendorStatus } from "@/data/vendorsDashboard";
import {
  calculateVendorSummary,
  calculateVendorPaymentSummary,
  calculateVendorCategoryCounts,
  calculateVendorStatusCounts,
  getVendorActions,
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
import {
  getWeddingsApi,
  getClientEnquiriesApi,
  getClientBookingsApi,
} from "@/lib/api/endpoints";

export default function VendorsDashboardPage() {
  const [vendors, setVendors] = useState<DashboardVendor[]>(MOCK_DASHBOARD_VENDORS);
  const [filters, setFilters] = useState<VendorFiltersState>({
    search: "",
    category: "ALL",
    status: "ALL",
    paymentStatus: "ALL",
    event: "ALL",
  });
  const [sortBy, setSortBy] = useState<string>("updated");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState<DashboardVendor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadVendorData() {
      try {
        setLoading(true);
        const weddings = await getWeddingsApi();
        if (weddings && weddings.length > 0) {
          const wId = weddings[0].id;

          const [enquiriesRes, bookingsRes] = await Promise.all([
            getClientEnquiriesApi(wId).catch(() => []),
            getClientBookingsApi(wId).catch(() => []),
          ]);

          if (isMounted && (Array.isArray(enquiriesRes) || Array.isArray(bookingsRes))) {
            const mappedEnquiries: DashboardVendor[] = (enquiriesRes || []).map((eq) => ({
              id: eq.id,
              slug: eq.vendorId,
              name: `Vendor (${eq.vendorId.slice(0, 8)})`,
              category: "PHOTOGRAPHY" as const,
              location: "Mumbai",
              description: "Wedora registered vendor partner.",
              imageSrc: "/images/wedding/wedora-vendor-frame-house.jpg",
              imageAlt: "Vendor partner",
              status: (eq.status as VendorStatus) || "ENQUIRY_SENT",
              paymentStatus: "NOT_STARTED" as const,
              event: "ALL_EVENTS" as const,
              contactEmail: "vendor@wedora.com",
              notes: eq.message,
              amount: Number(eq.estimatedBudget || 0) / 100,
              amountPaid: 0,
            }));

            const mappedBookings: DashboardVendor[] = (bookingsRes || []).map((bk) => ({
              id: bk.id,
              slug: bk.vendorId,
              name: `Booked Vendor (${bk.vendorId.slice(0, 8)})`,
              category: "DECOR" as const,
              location: "Udaipur",
              description: "Contracted vendor partner.",
              imageSrc: "/images/wedding/wedora-vendor-mitti-marigold.jpg",
              imageAlt: "Contracted vendor",
              status: "BOOKED" as const,
              paymentStatus:
                Number(bk.paidAmount) >= Number(bk.totalAmount) && Number(bk.totalAmount) > 0
                  ? ("PAID" as const)
                  : ("PARTIAL" as const),
              event: "ALL_EVENTS" as const,
              contactEmail: "booked@wedora.com",
              notes: bk.notes || undefined,
              amount: Number(bk.totalAmount) / 100,
              amountPaid: Number(bk.paidAmount) / 100,
            }));

            setVendors([...mappedBookings, ...mappedEnquiries]);
          }
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadVendorData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derived Business Logic Calculations
  const summary = useMemo(() => calculateVendorSummary(vendors), [vendors]);
  const paymentSummary = useMemo(() => calculateVendorPaymentSummary(vendors), [vendors]);
  const categoryCounts = useMemo(() => calculateVendorCategoryCounts(vendors), [vendors]);
  const statusCounts = useMemo(() => calculateVendorStatusCounts(vendors), [vendors]);
  const attentionItems = useMemo(() => getVendorActions(vendors), [vendors]);

  // Filtered & Sorted Vendors List
  const filteredVendors = useMemo(() => {
    const list = filterDashboardVendors(vendors, filters);
    return sortDashboardVendors(list, sortBy);
  }, [vendors, filters, sortBy]);

  const handleAddVendor = (newVendor: DashboardVendor) => {
    setVendors((prev) => [newVendor, ...prev]);
  };

  const handleClearFilters = () => {
    setFilters({
      search: "",
      category: "ALL",
      status: "ALL",
      paymentStatus: "ALL",
      event: "ALL",
    });
    setSortBy("updated");
  };

  return (
    <DashboardShell>
      <VendorsPageHeader onAddVendorClick={() => setIsAddModalOpen(true)} />

      {loading ? (
        <div className="p-8 text-center text-xs text-[#5A5650] font-sans">Loading vendor team...</div>
      ) : (
        <div className="space-y-8">
          <VendorOverview summary={summary} />
          <VendorNeedsAttention
            items={attentionItems}
            onSelectVendor={(vendorId) => {
              const found = vendors.find((v) => v.id === vendorId);
              if (found) setSelectedVendor(found);
            }}
          />
          <VendorCategoryBreakdown categories={categoryCounts} />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <VendorStatusOverview statuses={statusCounts} />
            <VendorPaymentSnapshot
              paymentSummary={paymentSummary}
              vendors={vendors}
              onSelectVendor={(vendorId) => {
                const found = vendors.find((v) => v.id === vendorId);
                if (found) setSelectedVendor(found);
              }}
            />
          </div>

          <VendorUpcomingActions
            vendors={vendors}
            onSelectVendor={(vendorId) => {
              const found = vendors.find((v) => v.id === vendorId);
              if (found) setSelectedVendor(found);
            }}
          />

          <VendorFilters
            filters={filters}
            onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalVendors={vendors.length}
            filteredCount={filteredVendors.length}
            onResetFilters={handleClearFilters}
          />

          <VendorList
            vendors={filteredVendors}
            totalVendors={vendors.length}
            onSelectVendor={setSelectedVendor}
            onClearFilters={handleClearFilters}
            onAddVendor={() => setIsAddModalOpen(true)}
          />

          <VendorPageCTA />
        </div>
      )}

      <AddVendorForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddVendor={handleAddVendor}
      />

      <VendorDetail
        vendor={selectedVendor}
        onClose={() => setSelectedVendor(null)}
      />
    </DashboardShell>
  );
}
