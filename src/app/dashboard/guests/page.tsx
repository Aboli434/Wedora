"use client";

import React, { useState, useMemo } from "react";
import { DashboardShell } from "@/components/dashboard";
import { MOCK_GUESTS, Guest } from "@/data/guests";
import {
  calculateGuestSummary,
  calculateGroupCounts,
  calculateEventAttendance,
  getGuestsNeedingAttention,
  filterGuests,
  sortGuests,
  GuestFiltersState,
} from "@/lib/guests";
import {
  GuestsPageHeader,
  GuestOverview,
  GuestNeedsAttention,
  GuestGroupBreakdown,
  GuestEventOverview,
  GuestFilters,
  GuestList,
  AddGuestForm,
  GuestDetail,
  GuestPageCTA,
} from "@/components/dashboard/guests";

export default function GuestsPage() {
  // Local state for demo interactive behavior
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);
  const [filters, setFilters] = useState<GuestFiltersState>({
    search: "",
    group: "ALL",
    status: "ALL",
    mealPreference: "ALL",
    plusOne: "ALL",
    event: "ALL",
  });
  const [sortBy, setSortBy] = useState<string>("name_asc");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);

  // Derived Business Logic Calculations
  const summary = useMemo(() => calculateGuestSummary(guests), [guests]);
  const groupCounts = useMemo(() => calculateGroupCounts(guests), [guests]);
  const eventAttendance = useMemo(
    () => calculateEventAttendance(guests),
    [guests]
  );
  const attentionItems = useMemo(
    () => getGuestsNeedingAttention(guests),
    [guests]
  );

  // Filtered & Sorted Guest Directory
  const filteredGuests = useMemo(() => {
    const list = filterGuests(guests, filters);
    return sortGuests(list, sortBy);
  }, [guests, filters, sortBy]);

  // Handlers
  const handleFilterChange = (updated: Partial<GuestFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      group: "ALL",
      status: "ALL",
      mealPreference: "ALL",
      plusOne: "ALL",
      event: "ALL",
    });
    setSortBy("name_asc");
  };

  const handleAddGuest = (newGuest: Guest) => {
    setGuests((prev) => [newGuest, ...prev]);
  };

  const handleSelectGuestById = (guestId: string) => {
    const target = guests.find((g) => g.id === guestId);
    if (target) {
      setSelectedGuest(target);
    }
  };

  return (
    <DashboardShell>
      <div className="space-y-10 max-w-7xl mx-auto pb-12">
        {/* Page Header */}
        <GuestsPageHeader
          onAddGuestClick={() => setIsAddModalOpen(true)}
        />

        {/* Guest Financial & RSVP Overview */}
        <GuestOverview summary={summary} />

        {/* Needs Attention Section */}
        <GuestNeedsAttention
          items={attentionItems}
          onSelectGuest={handleSelectGuestById}
        />

        {/* Group Breakdown & Event Attendance Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <GuestGroupBreakdown
            groups={groupCounts}
          />
          <GuestEventOverview events={eventAttendance} />
        </div>

        {/* Guest Directory Section */}
        <div className="space-y-6 pt-4 border-t border-[#161514]/15">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              GUEST DIRECTORY
            </span>
            <h2 className="font-serif text-3xl text-[#161514] font-light">
              Guest Registry & Details
            </h2>
          </div>

          <GuestFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalGuests={guests.length}
            filteredCount={filteredGuests.length}
            onResetFilters={handleResetFilters}
          />

          <GuestList
            guests={filteredGuests}
            totalGuests={guests.length}
            onSelectGuest={setSelectedGuest}
            onClearFilters={handleResetFilters}
            onAddGuest={() => setIsAddModalOpen(true)}
          />
        </div>

        {/* Closing CTA */}
        <GuestPageCTA />

        {/* Add Guest Modal Form */}
        <AddGuestForm
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onAddGuest={handleAddGuest}
        />

        {/* Guest Detail Modal View */}
        <GuestDetail
          guest={selectedGuest}
          onClose={() => setSelectedGuest(null)}
        />
      </div>
    </DashboardShell>
  );
}
