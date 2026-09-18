"use client";

import React, { useState } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  INITIAL_CALENDAR_EVENTS,
  INITIAL_AVAILABILITY_BLOCKS,
  VendorCalendarEvent,
  VendorAvailabilityBlock,
  CalendarView,
  CalendarEventStatus,
  CalendarEventType,
} from "@/data/vendorCalendar";
import {
  CalendarFilterState,
  calculateCalendarSummary,
  getCalendarEventsNeedingAttention,
  getUpcomingCalendarEvents,
  calculateCalendarConflicts,
  filterCalendarEvents,
  FIXED_TODAY_DATE,
} from "@/lib/vendorCalendar";
import {
  CalendarPageHeader,
  CalendarOverview,
  CalendarToolbar,
  CalendarMonthView,
  CalendarWeekView,
  CalendarAgendaView,
  CalendarFilters,
  CalendarNeedsAttention,
  UpcomingCalendarEvents,
  CalendarConflicts,
  CalendarEventDetail,
  CalendarEventEditor,
  AvailabilityBlockEditor,
  CalendarEmptyState,
  CalendarPageCTA,
} from "@/components/vendor-dashboard/calendar";
import { RefreshCw } from "lucide-react";

export default function VendorCalendarPage() {
  const [events, setEvents] = useState<VendorCalendarEvent[]>(
    INITIAL_CALENDAR_EVENTS
  );
  const [blocks, setBlocks] = useState<VendorAvailabilityBlock[]>(
    INITIAL_AVAILABILITY_BLOCKS
  );

  const [view, setView] = useState<CalendarView>("MONTH");
  const [currentDate, setCurrentDate] = useState<Date>(
    new Date(FIXED_TODAY_DATE)
  );
  const [selectedDateStr, setSelectedDateStr] = useState<string>(FIXED_TODAY_DATE);

  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [isEventEditorOpen, setIsEventEditorOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<VendorCalendarEvent | null>(
    null
  );
  const [isBlockEditorOpen, setIsBlockEditorOpen] = useState(false);

  const [filters, setFilters] = useState<CalendarFilterState>({
    type: "ALL",
    priority: "ALL",
    status: "ALL",
    bookingId: "ALL",
    searchQuery: "",
    sortBy: "DATE_ASC",
  });

  // Derived computations
  const summary = calculateCalendarSummary(events, blocks);
  const conflicts = calculateCalendarConflicts(events, blocks);
  const needsAttentionList = getCalendarEventsNeedingAttention(events, blocks);
  const upcomingList = getUpcomingCalendarEvents(events, 8);
  const nextUpEvent = upcomingList.length > 0 ? upcomingList[0] : null;
  const filteredEvents = filterCalendarEvents(events, filters);

  const selectedEvent =
    events.find((e) => e.id === selectedEventId) || null;

  // Handlers
  const handleFilterChange = (updates: Partial<CalendarFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      type: "ALL",
      priority: "ALL",
      status: "ALL",
      bookingId: "ALL",
      searchQuery: "",
      sortBy: "DATE_ASC",
    });
  };

  // Date Navigation Handlers
  const handlePrevPeriod = () => {
    const d = new Date(currentDate);
    if (view === "MONTH") {
      d.setMonth(d.getMonth() - 1);
    } else if (view === "WEEK") {
      d.setDate(d.getDate() - 7);
    } else {
      d.setDate(d.getDate() - 14);
    }
    setCurrentDate(d);
  };

  const handleNextPeriod = () => {
    const d = new Date(currentDate);
    if (view === "MONTH") {
      d.setMonth(d.getMonth() + 1);
    } else if (view === "WEEK") {
      d.setDate(d.getDate() + 7);
    } else {
      d.setDate(d.getDate() + 14);
    }
    setCurrentDate(d);
  };

  const handleToday = () => {
    const today = new Date(FIXED_TODAY_DATE);
    setCurrentDate(today);
    setSelectedDateStr(FIXED_TODAY_DATE);
  };

  const handleSelectEvent = (event: VendorCalendarEvent) => {
    setSelectedEventId(event.id);
  };

  const handleCloseDetail = () => {
    setSelectedEventId(null);
  };

  // Update Status
  const handleUpdateStatus = (
    eventId: string,
    newStatus: CalendarEventStatus
  ) => {
    const timestamp = new Date().toISOString();
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, status: newStatus, updatedAt: timestamp }
          : e
      )
    );
  };

  // Delete Event
  const handleDeleteEvent = (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
    setSelectedEventId(null);
  };

  // Save Event (Add / Edit)
  const handleSaveEvent = (partialEvent: Partial<VendorCalendarEvent>) => {
    const timestamp = new Date().toISOString();

    if (partialEvent.id) {
      // Edit existing
      setEvents((prev) =>
        prev.map((e) =>
          e.id === partialEvent.id
            ? { ...e, ...partialEvent, updatedAt: timestamp }
            : e
        )
      );
    } else {
      // Add new
      const newId = `evt-cal-${Date.now().toString().slice(-4)}`;
      const newEvent: VendorCalendarEvent = {
        id: newId,
        title: partialEvent.title || "Untitled Operational Event",
        description: partialEvent.description,
        type: partialEvent.type || "PREPARATION",
        status: partialEvent.status || "SCHEDULED",
        priority: partialEvent.priority || "NORMAL",
        startDate: partialEvent.startDate || FIXED_TODAY_DATE,
        endDate: partialEvent.endDate,
        startTime: partialEvent.startTime,
        endTime: partialEvent.endTime,
        allDay: partialEvent.allDay || false,
        coupleName: partialEvent.coupleName,
        venue: partialEvent.venue,
        location: partialEvent.location,
        notes: partialEvent.notes,
        createdAt: timestamp,
        updatedAt: timestamp,
      };

      setEvents((prev) => [newEvent, ...prev]);
    }
  };

  // Save Block Period
  const handleSaveBlock = (
    newBlock: Omit<VendorAvailabilityBlock, "id" | "createdAt">
  ) => {
    const timestamp = new Date().toISOString();
    const blockObj: VendorAvailabilityBlock = {
      id: `blk-${Date.now().toString().slice(-4)}`,
      ...newBlock,
      createdAt: timestamp,
    };
    setBlocks((prev) => [...prev, blockObj]);
  };

  const handleResetDataset = () => {
    setEvents(INITIAL_CALENDAR_EVENTS);
    setBlocks(INITIAL_AVAILABILITY_BLOCKS);
    handleResetFilters();
    handleToday();
    setSelectedEventId(null);
  };

  return (
    <VendorDashboardShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <CalendarPageHeader
          onAddEvent={() => {
            setEditingEvent(null);
            setIsEventEditorOpen(true);
          }}
          onBlockDates={() => setIsBlockEditorOpen(true)}
        />

        {events.length === 0 ? (
          <CalendarEmptyState
            onAddEvent={() => {
              setEditingEvent(null);
              setIsEventEditorOpen(true);
            }}
          />
        ) : (
          <>
            {/* Metrics & Next Up Overview */}
            <CalendarOverview
              summary={summary}
              nextUpEvent={nextUpEvent}
              activeTypeFilter={filters.type}
              onSelectTypeFilter={(type) =>
                handleFilterChange({
                  type: type as CalendarEventType | "ALL",
                })
              }
              onSelectAgendaView={() => setView("AGENDA")}
              onSelectEvent={handleSelectEvent}
            />

            {/* Schedule Conflicts Alert Banner */}
            <CalendarConflicts
              conflicts={conflicts}
              events={events}
              onSelectEvent={handleSelectEvent}
            />

            {/* Action & Deadline Items */}
            <CalendarNeedsAttention
              eventsNeedingAttention={needsAttentionList}
              blocks={blocks}
              onSelectEvent={handleSelectEvent}
            />

            {/* Calendar Controls & View Switcher */}
            <CalendarToolbar
              view={view}
              onViewChange={setView}
              currentDate={currentDate}
              onPrevPeriod={handlePrevPeriod}
              onNextPeriod={handleNextPeriod}
              onToday={handleToday}
            />

            {/* Filters Bar */}
            <CalendarFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredEvents.length}
            />

            {/* Calendar Views (MONTH / WEEK / AGENDA) */}
            {view === "MONTH" && (
              <CalendarMonthView
                currentDate={currentDate}
                selectedDateStr={selectedDateStr}
                onSelectDate={setSelectedDateStr}
                events={filteredEvents}
                blocks={blocks}
                onSelectEvent={handleSelectEvent}
              />
            )}

            {view === "WEEK" && (
              <CalendarWeekView
                currentDate={currentDate}
                events={filteredEvents}
                blocks={blocks}
                onSelectEvent={handleSelectEvent}
              />
            )}

            {view === "AGENDA" && (
              <CalendarAgendaView
                events={filteredEvents}
                onSelectEvent={handleSelectEvent}
              />
            )}

            {/* Chronological Preview */}
            <UpcomingCalendarEvents
              upcomingEvents={upcomingList}
              onSelectEvent={handleSelectEvent}
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
        <CalendarPageCTA />

        {/* Event Detail Side Panel */}
        <CalendarEventDetail
          event={selectedEvent}
          onClose={handleCloseDetail}
          onUpdateStatus={handleUpdateStatus}
          onDeleteEvent={handleDeleteEvent}
          onOpenEditModal={(evt) => {
            setEditingEvent(evt);
            setIsEventEditorOpen(true);
          }}
        />

        {/* Event Editor Modal */}
        <CalendarEventEditor
          isOpen={isEventEditorOpen}
          onClose={() => setIsEventEditorOpen(false)}
          eventToEdit={editingEvent}
          onSave={handleSaveEvent}
        />

        {/* Block Availability Dates Modal */}
        <AvailabilityBlockEditor
          isOpen={isBlockEditorOpen}
          onClose={() => setIsBlockEditorOpen(false)}
          onSaveBlock={handleSaveBlock}
        />
      </div>
    </VendorDashboardShell>
  );
}
