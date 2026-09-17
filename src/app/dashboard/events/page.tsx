"use client";

import React, { useState, useMemo } from "react";
import { DashboardShell } from "@/components/dashboard";
import { MOCK_EVENTS, WeddingEvent } from "@/data/eventsDashboard";
import {
  calculateEventSummary,
  getUpcomingEvents,
  getEventsNeedingAttention,
  filterEvents,
  sortEvents,
  EventFiltersState,
} from "@/lib/eventsDashboard";
import {
  EventsPageHeader,
  EventOverview,
  EventNeedsAttention,
  EventTimeline,
  UpcomingEvents,
  EventReadiness,
  EventFilters,
  EventList,
  AddEventForm,
  EventDetail,
  EventPageCTA,
} from "@/components/dashboard/events";

export default function EventsDashboardPage() {
  // Local state for interactive demo behavior
  const [events, setEvents] = useState<WeddingEvent[]>(MOCK_EVENTS);
  const [filters, setFilters] = useState<EventFiltersState>({
    search: "",
    type: "ALL",
    status: "ALL",
    date: "ALL",
    readiness: "ALL",
  });
  const [sortBy, setSortBy] = useState<string>("date_asc");

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<WeddingEvent | null>(null);
  const [editingEvent, setEditingEvent] = useState<WeddingEvent | null>(null);

  // Derived Business Logic Calculations
  const summary = useMemo(() => calculateEventSummary(events), [events]);
  const upcomingEvents = useMemo(() => getUpcomingEvents(events), [events]);
  const attentionItems = useMemo(() => getEventsNeedingAttention(events), [events]);

  // Filtered & Sorted Events List
  const filteredEvents = useMemo(() => {
    const list = filterEvents(events, filters);
    return sortEvents(list, sortBy);
  }, [events, filters, sortBy]);

  // Handlers
  const handleFilterChange = (updated: Partial<EventFiltersState>) => {
    setFilters((prev) => ({ ...prev, ...updated }));
  };

  const handleResetFilters = () => {
    setFilters({
      search: "",
      type: "ALL",
      status: "ALL",
      date: "ALL",
      readiness: "ALL",
    });
    setSortBy("date_asc");
  };

  const handleSaveEvent = (savedEvent: WeddingEvent) => {
    setEvents((prev) => {
      const exists = prev.some((e) => e.id === savedEvent.id);
      if (exists) {
        return prev.map((e) => (e.id === savedEvent.id ? savedEvent : e));
      }
      return [savedEvent, ...prev];
    });

    if (selectedEvent && selectedEvent.id === savedEvent.id) {
      setSelectedEvent(savedEvent);
    }
  };

  const handleToggleTask = (eventId: string, taskId: string) => {
    setEvents((prev) =>
      prev.map((ev) => {
        if (ev.id !== eventId) return ev;

        const updatedTasks = ev.tasks.map((t) => {
          if (t.id !== taskId) return t;
          return {
            ...t,
            status: (t.status === "COMPLETED" ? "TODO" : "COMPLETED") as WeddingEvent["tasks"][0]["status"],
          };
        });

        const updatedEv = { ...ev, tasks: updatedTasks };

        if (selectedEvent && selectedEvent.id === eventId) {
          setSelectedEvent(updatedEv);
        }

        return updatedEv;
      })
    );
  };

  const handleSelectEventById = (eventId: string) => {
    const target = events.find((e) => e.id === eventId);
    if (target) {
      setSelectedEvent(target);
    }
  };

  const handleStartEdit = (event: WeddingEvent) => {
    setEditingEvent(event);
    setIsAddModalOpen(true);
  };

  return (
    <DashboardShell>
      <div className="space-y-10 max-w-7xl mx-auto pb-12">
        {/* Page Header */}
        <EventsPageHeader
          onAddEventClick={() => {
            setEditingEvent(null);
            setIsAddModalOpen(true);
          }}
        />

        {/* Event Overview Summary */}
        <EventOverview summary={summary} />

        {/* Needs Attention Alert List */}
        <EventNeedsAttention
          items={attentionItems}
          onSelectEvent={handleSelectEventById}
        />

        {/* Chronological Timeline */}
        <EventTimeline
          events={events}
          onSelectEvent={handleSelectEventById}
        />

        {/* Upcoming Celebration Itinerary */}
        <UpcomingEvents
          events={upcomingEvents}
          onSelectEvent={handleSelectEventById}
        />

        {/* Event Readiness Breakdown */}
        <EventReadiness events={events} />

        {/* Events Directory & Registry */}
        <div className="space-y-6 pt-4 border-t border-[#161514]/15">
          <div className="space-y-1">
            <span className="text-[10px] font-sans tracking-[0.25em] uppercase text-[#C5A880] font-semibold">
              EVENT REGISTRY
            </span>
            <h2 className="font-serif text-3xl text-[#161514] font-light">
              All Celebration Functions
            </h2>
          </div>

          <EventFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            sortBy={sortBy}
            onSortChange={setSortBy}
            totalEvents={events.length}
            filteredCount={filteredEvents.length}
            onResetFilters={handleResetFilters}
          />

          <EventList
            events={filteredEvents}
            onSelectEvent={setSelectedEvent}
            onClearFilters={handleResetFilters}
          />
        </div>

        {/* Closing CTA */}
        <EventPageCTA />

        {/* Add / Edit Event Modal Dialog */}
        <AddEventForm
          key={editingEvent ? editingEvent.id : isAddModalOpen ? "open-new" : "closed"}
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setEditingEvent(null);
          }}
          onAddEvent={handleSaveEvent}
          initialData={editingEvent}
        />

        {/* Event Detail Modal Dossier */}
        <EventDetail
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
          onEdit={handleStartEdit}
          onToggleTask={handleToggleTask}
        />
      </div>
    </DashboardShell>
  );
}
