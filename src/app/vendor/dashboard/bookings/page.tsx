"use client";

import React, { useState, useEffect } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  INITIAL_VENDOR_BOOKINGS,
  VendorBooking,
  BookingStatus,
  BookingPaymentStatus,
} from "@/data/vendorBookings";
import {
  BookingFilterState,
  calculateBookingsSummary,
  calculateBookingStatusCounts,
  calculateUpcomingBookings,
  calculateBookingsNeedingAttention,
  filterVendorBookings,
} from "@/lib/vendorBookings";
import {
  BookingsPageHeader,
  BookingsOverview,
  BookingsNeedsAttention,
  BookingPipeline,
  UpcomingBookings,
  BookingFilters,
  BookingList,
  BookingDetail,
  BookingEditor,
  BookingsEmptyState,
  BookingsPageCTA,
} from "@/components/vendor-dashboard/bookings";
import {
  getVendorBookingsApi,
  updateVendorBookingStatusApi,
} from "@/lib/api/endpoints";

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState<VendorBooking[]>(INITIAL_VENDOR_BOOKINGS);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<VendorBooking | null>(null);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState<BookingFilterState>({
    status: "ALL",
    paymentStatus: "ALL",
    service: "ALL",
    destination: "ALL",
    source: "ALL",
    timeframe: "ALL",
    searchQuery: "",
    sortBy: "WEDDING_DATE_SOONEST",
  });

  useEffect(() => {
    let isMounted = true;
    async function loadBookings() {
      try {
        setLoading(true);
        const apiBookings = await getVendorBookingsApi();
        if (Array.isArray(apiBookings) && isMounted) {
          const mapped: VendorBooking[] = apiBookings.map((bk) => ({
            id: bk.id,
            bookingReference: bk.referenceCode,
            coupleName: `Client (${bk.weddingId.slice(0, 8)})`,
            email: "client@wedora.com",
            phone: "+91 98765 43210",
            weddingDate: new Date(bk.createdAt).toISOString().split("T")[0],
            weddingDateStatus: "CONFIRMED",
            destination: "Udaipur",
            venue: "Palace Resort",
            guestCount: 150,
            serviceName: bk.services?.[0]?.serviceName || "Wedding Service",
            packageName: "Custom Package",
            bookingStatus: (bk.status as BookingStatus) || "CONFIRMED",
            paymentStatus:
              Number(bk.paidAmount) >= Number(bk.totalAmount) && Number(bk.totalAmount) > 0
                ? ("PAID" as BookingPaymentStatus)
                : ("PARTIALLY_PAID" as BookingPaymentStatus),
            source: "WEDORA",
            totalAmount: Number(bk.totalAmount) / 100,
            amountReceived: Number(bk.paidAmount) / 100,
            amountOutstanding: Math.max(0, (Number(bk.totalAmount) - Number(bk.paidAmount)) / 100),
            createdAt: new Date(bk.createdAt).toISOString(),
            updatedAt: new Date(bk.updatedAt).toISOString(),
            notes: bk.notes || undefined,
            events: [],
            activities: [],
          }));
          setBookings(mapped);
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadBookings();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derived computations
  const summary = calculateBookingsSummary(bookings);
  const statusCounts = calculateBookingStatusCounts(bookings);
  const upcomingBookingsList = calculateUpcomingBookings(bookings);
  const attentionItems = calculateBookingsNeedingAttention(bookings);
  const filteredBookings = filterVendorBookings(bookings, filters);

  const selectedBooking = bookings.find((b) => b.id === selectedBookingId) || null;

  const handleStatusChange = async (id: string, newStatus: BookingStatus) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, bookingStatus: newStatus } : b))
    );

    try {
      await updateVendorBookingStatusApi(id, newStatus);
    } catch {
      // Retain optimistic UI state
    }
  };

  const handleSaveBooking = (savedBooking: Partial<VendorBooking>) => {
    if (savedBooking.id) {
      setBookings((prev) =>
        prev.map((b) => (b.id === savedBooking.id ? { ...b, ...savedBooking } : b))
      );
    }
    setIsEditorOpen(false);
    setEditingBooking(null);
  };

  const handleResetFilters = () => {
    setFilters({
      status: "ALL",
      paymentStatus: "ALL",
      service: "ALL",
      destination: "ALL",
      source: "ALL",
      timeframe: "ALL",
      searchQuery: "",
      sortBy: "WEDDING_DATE_SOONEST",
    });
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 pb-12">
        <BookingsPageHeader
          onAddBooking={() => {
            setEditingBooking(null);
            setIsEditorOpen(true);
          }}
          onFilterUpcoming={() =>
            setFilters((prev) => ({ ...prev, timeframe: "UPCOMING" }))
          }
        />

        {loading ? (
          <div className="p-8 text-center text-xs text-[#6E6B65] font-sans">Loading bookings...</div>
        ) : (
          <>
            <BookingsOverview
              summary={summary}
              activeFilterStatus={filters.status}
              activePaymentFilter={filters.paymentStatus}
              onSelectStatusFilter={(s) => setFilters((prev) => ({ ...prev, status: s as BookingStatus | "ALL" }))}
              onSelectPaymentFilter={(ps) => setFilters((prev) => ({ ...prev, paymentStatus: ps as BookingPaymentStatus | "ALL" }))}
            />
            <BookingsNeedsAttention bookingsNeedingAttention={attentionItems} onSelectBooking={(b) => setSelectedBookingId(b.id)} />
            <BookingPipeline statusCounts={statusCounts} activeStatus={filters.status} onSelectStatus={(s) => setFilters((prev) => ({ ...prev, status: s as BookingStatus | "ALL" }))} />
            <UpcomingBookings upcomingBookings={upcomingBookingsList} onSelectBooking={(b) => setSelectedBookingId(b.id)} />
            <BookingFilters
              filters={filters}
              onFilterChange={(updates) => setFilters((prev) => ({ ...prev, ...updates }))}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredBookings.length}
            />

            {filteredBookings.length === 0 ? (
              <BookingsEmptyState />
            ) : (
              <BookingList
                bookings={filteredBookings}
                selectedBookingId={selectedBookingId || undefined}
                onSelectBooking={(b) => setSelectedBookingId(b.id)}
                onResetFilters={handleResetFilters}
              />
            )}

            <BookingsPageCTA />
          </>
        )}

        <BookingDetail
          booking={selectedBooking}
          onClose={() => setSelectedBookingId(null)}
          onUpdateStatus={handleStatusChange}
          onRecordPayment={() => {}}
          onUpdateEventStatus={() => {}}
          onSaveNotes={() => {}}
          onDeleteNotes={() => {}}
          onOpenEditModal={(b) => {
            setEditingBooking(b);
            setIsEditorOpen(true);
          }}
        />

        <BookingEditor
          isOpen={isEditorOpen}
          bookingToEdit={editingBooking}
          onClose={() => {
            setIsEditorOpen(false);
            setEditingBooking(null);
          }}
          onSave={handleSaveBooking}
        />
      </div>
    </VendorDashboardShell>
  );
}
