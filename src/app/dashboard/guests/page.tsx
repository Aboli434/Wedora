"use client";

import React, { useState, useEffect, useMemo } from "react";
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
import {
  getWeddingsApi,
  getGuestsApi,
  createGuestApi,
} from "@/lib/api/endpoints";

export default function GuestsPage() {
  const [guests, setGuests] = useState<Guest[]>(MOCK_GUESTS);
  const [weddingId, setWeddingId] = useState<string | null>(null);
  const [filters, setFilters] = useState<GuestFiltersState>({
    search: "",
    group: "ALL",
    status: "ALL",
    mealPreference: "ALL",
    plusOne: "ALL",
    event: "ALL",
  });
  const [sortBy, setSortBy] = useState<string>("name_asc");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadGuests() {
      try {
        setLoading(true);
        const weddings = await getWeddingsApi();
        if (weddings && weddings.length > 0) {
          const wId = weddings[0].id;
          if (isMounted) setWeddingId(wId);

          const apiGuests = await getGuestsApi(wId);
          if (Array.isArray(apiGuests) && isMounted) {
            const mapped: Guest[] = apiGuests.map((g) => ({
              id: g.id,
              name: g.name,
              email: g.email || "",
              phone: g.phone || "",
              group: (g.group as "FAMILY" | "FRIENDS" | "COLLEAGUES" | "OTHER") || "FRIENDS",
              status: (g.rsvpStatus as "INVITED" | "CONFIRMED" | "PENDING" | "DECLINED") || "PENDING",
              plusOne: g.plusOne,
              plusOneName: g.plusOneName || undefined,
              mealPreference: "VEGETARIAN",
              events: {
                mehendi: "YES",
                haldi: "YES",
                wedding: "YES",
                reception: "YES",
              },
              invitedAt: new Date().toISOString().split("T")[0],
            }));
            setGuests(mapped);
          }
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadGuests();
    return () => {
      isMounted = false;
    };
  }, []);

  // Derived Business Logic Calculations
  const summary = useMemo(() => calculateGuestSummary(guests), [guests]);
  const groupCounts = useMemo(() => calculateGroupCounts(guests), [guests]);
  const eventAttendance = useMemo(
    () => calculateEventAttendance(guests),
    [guests]
  );
  const needingAttention = useMemo(
    () => getGuestsNeedingAttention(guests),
    [guests]
  );

  const filtered = useMemo(
    () => filterGuests(guests, filters),
    [guests, filters]
  );
  const sortedAndFiltered = useMemo(
    () => sortGuests(filtered, sortBy),
    [filtered, sortBy]
  );

  const handleAddGuest = async (newGuest: Guest) => {
    setGuests((prev) => [newGuest, ...prev]);

    if (weddingId) {
      try {
        const created = await createGuestApi(weddingId, {
          name: newGuest.name,
          email: newGuest.email || undefined,
          phone: newGuest.phone || undefined,
          rsvpStatus: newGuest.status,
          plusOne: newGuest.plusOne,
          plusOneName: newGuest.plusOneName || undefined,
          group: newGuest.group,
        });

        setGuests((prev) =>
          prev.map((g) => (g.id === newGuest.id ? { ...g, id: created.id } : g))
        );
      } catch {
        // Retain local fallback
      }
    }
  };

  const handleClearFilters = () => {
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

  return (
    <DashboardShell>
      <GuestsPageHeader onAddGuestClick={() => setIsAddModalOpen(true)} />

      {loading ? (
        <div className="p-8 text-center text-xs text-[#5A5650] font-sans">Loading guest directory...</div>
      ) : (
        <div className="space-y-8">
          <GuestOverview summary={summary} />
          <GuestNeedsAttention
            items={needingAttention}
            onSelectGuest={(guestId) => {
              const found = guests.find((g) => g.id === guestId);
              if (found) setSelectedGuest(found);
            }}
          />
          <GuestGroupBreakdown groups={groupCounts} />
          <GuestEventOverview events={eventAttendance} />
          <GuestFilters
            filters={filters}
            onFilterChange={(updated) => setFilters((prev) => ({ ...prev, ...updated }))}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalGuests={guests.length}
            filteredCount={sortedAndFiltered.length}
            onResetFilters={handleClearFilters}
          />
          <GuestList
            guests={sortedAndFiltered}
            totalGuests={guests.length}
            onSelectGuest={setSelectedGuest}
            onClearFilters={handleClearFilters}
            onAddGuest={() => setIsAddModalOpen(true)}
          />
          <GuestPageCTA />
        </div>
      )}

      <AddGuestForm
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddGuest={handleAddGuest}
      />

      <GuestDetail
        guest={selectedGuest}
        onClose={() => setSelectedGuest(null)}
      />
    </DashboardShell>
  );
}
