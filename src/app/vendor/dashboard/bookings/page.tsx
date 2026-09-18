"use client";

import React, { useState } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  INITIAL_VENDOR_BOOKINGS,
  VendorBooking,
  BookingStatus,
  BookingEventStatus,
  BookingActivity,
  BookingPaymentStatus,
} from "@/data/vendorBookings";
import {
  BookingFilterState,
  calculateBookingsSummary,
  calculateBookingStatusCounts,
  calculateUpcomingBookings,
  calculateBookingsNeedingAttention,
  filterVendorBookings,
  formatBookingStatus,
  formatIndianCurrency,
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
import { RefreshCw } from "lucide-react";

export default function VendorBookingsPage() {
  const [bookings, setBookings] = useState<VendorBooking[]>(
    INITIAL_VENDOR_BOOKINGS
  );

  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null
  );

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<VendorBooking | null>(
    null
  );

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

  // Derived computations
  const summary = calculateBookingsSummary(bookings);
  const statusCounts = calculateBookingStatusCounts(bookings);
  const upcomingList = calculateUpcomingBookings(bookings, 5);
  const needsAttentionList = calculateBookingsNeedingAttention(bookings);
  const filteredBookings = filterVendorBookings(bookings, filters);

  const selectedBooking =
    bookings.find((b) => b.id === selectedBookingId) || null;

  // Filter Handlers
  const handleFilterChange = (updates: Partial<BookingFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
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

  // Detail Panel Handlers
  const handleOpenDetail = (booking: VendorBooking) => {
    setSelectedBookingId(booking.id);
  };

  const handleCloseDetail = () => {
    setSelectedBookingId(null);
  };

  // Status Change
  const handleUpdateStatus = (bookingId: string, newStatus: BookingStatus) => {
    const timestamp = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        const newActivity: BookingActivity = {
          id: `act-bk-${Date.now()}`,
          type: "STATUS_CHANGED",
          description: `Booking status changed from ${formatBookingStatus(
            b.bookingStatus
          )} to ${formatBookingStatus(newStatus)}.`,
          timestamp,
        };

        return {
          ...b,
          bookingStatus: newStatus,
          updatedAt: timestamp,
          activities: [newActivity, ...b.activities],
        };
      })
    );
  };

  // Record Payment
  const handleRecordPayment = (bookingId: string, amount: number) => {
    const timestamp = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        const newReceived = b.amountReceived + amount;
        const newOutstanding = Math.max(0, b.totalAmount - newReceived);

        let pStatus: BookingPaymentStatus = b.paymentStatus;
        if (newReceived >= b.totalAmount) {
          pStatus = "PAID";
        } else if (newReceived > 0) {
          pStatus = "PARTIALLY_PAID";
        }

        const newActivity: BookingActivity = {
          id: `act-bk-${Date.now()}`,
          type: "PAYMENT_RECEIVED",
          description: `Recorded payment of ${formatIndianCurrency(amount)}.`,
          timestamp,
        };

        return {
          ...b,
          amountReceived: newReceived,
          amountOutstanding: newOutstanding,
          paymentStatus: pStatus,
          updatedAt: timestamp,
          activities: [newActivity, ...b.activities],
        };
      })
    );
  };

  // Event Status Update
  const handleUpdateEventStatus = (
    bookingId: string,
    eventId: string,
    newStatus: BookingEventStatus
  ) => {
    const timestamp = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        const updatedEvents = b.events.map((e) =>
          e.id === eventId ? { ...e, status: newStatus } : e
        );

        const eventName = b.events.find((e) => e.id === eventId)?.name || "Event";

        const newActivity: BookingActivity = {
          id: `act-bk-${Date.now()}`,
          type: "EVENT_UPDATED",
          description: `Updated ${eventName} status to ${newStatus}.`,
          timestamp,
        };

        return {
          ...b,
          events: updatedEvents,
          updatedAt: timestamp,
          activities: [newActivity, ...b.activities],
        };
      })
    );
  };

  // Save Notes
  const handleSaveNotes = (bookingId: string, notes: string) => {
    const timestamp = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;

        const newActivity: BookingActivity = {
          id: `act-bk-${Date.now()}`,
          type: "NOTE_UPDATED",
          description: "Updated internal operation notes.",
          timestamp,
        };

        return {
          ...b,
          notes,
          updatedAt: timestamp,
          activities: [newActivity, ...b.activities],
        };
      })
    );
  };

  // Delete Notes
  const handleDeleteNotes = (bookingId: string) => {
    const timestamp = new Date().toISOString();
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== bookingId) return b;
        return {
          ...b,
          notes: undefined,
          updatedAt: timestamp,
        };
      })
    );
  };

  // Add / Edit Save Handler
  const handleSaveBooking = (partialBooking: Partial<VendorBooking>) => {
    const timestamp = new Date().toISOString();

    if (partialBooking.id) {
      // Edit existing
      setBookings((prev) =>
        prev.map((b) => {
          if (b.id !== partialBooking.id) return b;

          const updated: VendorBooking = {
            ...b,
            ...partialBooking,
            updatedAt: timestamp,
          };

          return updated;
        })
      );
    } else {
      // Add new
      const newId = `bk-${Date.now().toString().slice(-4)}`;
      const newRef = `WED-2027-${Math.floor(100 + Math.random() * 900)}`;

      const newBooking: VendorBooking = {
        id: newId,
        bookingReference: newRef,
        coupleName: partialBooking.coupleName || "Demo Couple",
        partnerName: partialBooking.partnerName,
        email: partialBooking.email || "demo@weddingdemo.in",
        phone: partialBooking.phone,
        weddingDate: partialBooking.weddingDate || "2027-03-01",
        weddingDateStatus: partialBooking.weddingDateStatus || "CONFIRMED",
        destination: partialBooking.destination || "Mumbai",
        venue: partialBooking.venue,
        guestCount: partialBooking.guestCount || 150,
        serviceName:
          partialBooking.serviceName || "Wedding Photography & Cinematography",
        packageName:
          partialBooking.packageName || "Signature Luxury Package",
        bookingStatus: partialBooking.bookingStatus || "CONFIRMED",
        paymentStatus: partialBooking.paymentStatus || "NOT_STARTED",
        source: partialBooking.source || "DIRECT",
        totalAmount: partialBooking.totalAmount || 3500000,
        amountReceived: partialBooking.amountReceived || 0,
        amountOutstanding:
          (partialBooking.totalAmount || 3500000) -
          (partialBooking.amountReceived || 0),
        nextPaymentDue: partialBooking.nextPaymentDue,
        nextPaymentAmount: partialBooking.nextPaymentAmount,
        notes: partialBooking.notes,
        createdAt: timestamp,
        updatedAt: timestamp,
        events: [
          {
            id: `evt-${Date.now()}-1`,
            name: "Main Wedding Ceremony",
            date: partialBooking.weddingDate || "2027-03-01",
            status: "PLANNED",
            guestCount: partialBooking.guestCount || 150,
          },
        ],
        activities: [
          {
            id: `act-${Date.now()}`,
            type: "CREATED",
            description: `Booking reference ${newRef} created in studio workspace.`,
            timestamp,
          },
        ],
      };

      setBookings((prev) => [newBooking, ...prev]);
    }
  };

  const handleResetDataset = () => {
    setBookings(INITIAL_VENDOR_BOOKINGS);
    handleResetFilters();
    setSelectedBookingId(null);
  };

  return (
    <VendorDashboardShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <BookingsPageHeader
          onAddBooking={() => {
            setEditingBooking(null);
            setIsEditorOpen(true);
          }}
          onFilterUpcoming={() => handleFilterChange({ timeframe: "UPCOMING" })}
        />

        {bookings.length === 0 ? (
          <BookingsEmptyState />
        ) : (
          <>
            {/* Metrics Overview */}
            <BookingsOverview
              summary={summary}
              activeFilterStatus={filters.status}
              activePaymentFilter={filters.paymentStatus}
              onSelectStatusFilter={(status) => {
                if (status === "UPCOMING") {
                  handleFilterChange({ timeframe: "UPCOMING", status: "ALL" });
                } else {
                  handleFilterChange({
                    status: status as BookingStatus | "ALL",
                    timeframe: "ALL",
                  });
                }
              }}
              onSelectPaymentFilter={(payStatus) =>
                handleFilterChange({
                  paymentStatus: payStatus as BookingFilterState["paymentStatus"],
                })
              }
            />

            {/* Action & Attention Items */}
            <BookingsNeedsAttention
              bookingsNeedingAttention={needsAttentionList}
              onSelectBooking={handleOpenDetail}
            />

            {/* Pipeline visualizer */}
            <BookingPipeline
              statusCounts={statusCounts}
              activeStatus={filters.status}
              onSelectStatus={(status) =>
                handleFilterChange({
                  status: status as BookingStatus | "ALL",
                })
              }
            />

            {/* Upcoming Celebrations Preview */}
            <UpcomingBookings
              upcomingBookings={upcomingList}
              onSelectBooking={handleOpenDetail}
            />

            {/* Filters Bar */}
            <BookingFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredBookings.length}
            />

            {/* Bookings List */}
            <BookingList
              bookings={filteredBookings}
              selectedBookingId={selectedBookingId || undefined}
              onSelectBooking={handleOpenDetail}
              onResetFilters={handleResetFilters}
            />
          </>
        )}

        {/* Reset Demo Dataset Footer Control */}
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

        {/* Closing CTA */}
        <BookingsPageCTA />

        {/* Detail Side Panel */}
        <BookingDetail
          booking={selectedBooking}
          onClose={handleCloseDetail}
          onUpdateStatus={handleUpdateStatus}
          onRecordPayment={handleRecordPayment}
          onUpdateEventStatus={handleUpdateEventStatus}
          onSaveNotes={handleSaveNotes}
          onDeleteNotes={handleDeleteNotes}
          onOpenEditModal={(b) => {
            setEditingBooking(b);
            setIsEditorOpen(true);
          }}
        />

        {/* Add / Edit Modal */}
        <BookingEditor
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          bookingToEdit={editingBooking}
          onSave={handleSaveBooking}
        />
      </div>
    </VendorDashboardShell>
  );
}
