"use client";

import React, { useState, useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout/VendorDashboardShell";
import {
  VendorClient,
  ClientRelationshipStatus,
  ClientPriority,
  ClientContactPreference,
  INITIAL_VENDOR_CLIENTS,
  ClientActivity,
} from "@/data/vendorClients";
import {
  calculateClientsSummary,
  filterVendorClients,
  ClientFilterState,
  getClientsNeedingAttention,
} from "@/lib/vendorClients";
import {
  ClientsPageHeader,
  ClientsOverview,
  ClientsNeedsAttention,
  ClientFilters,
  ClientList,
  ClientDetail,
  ClientEditor,
  RecordContactModal,
  ClientsPageCTA,
} from "@/components/vendor-dashboard/clients";

export default function VendorClientsPage() {
  // Master clients state
  const [clients, setClients] = useState<VendorClient[]>(INITIAL_VENDOR_CLIENTS);

  // Filters state
  const [filters, setFilters] = useState<ClientFilterState>({
    relationshipStatus: "ALL",
    priority: "ALL",
    weddingStatus: "ALL",
    service: "ALL",
    destination: "ALL",
    searchQuery: "",
    sortBy: "RECENTLY_UPDATED",
  });

  // Modal / Drawer states
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [isAddEditorOpen, setIsAddEditorOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<VendorClient | null>(null);
  const [recordingContactClient, setRecordingContactClient] = useState<VendorClient | null>(null);

  // Derived summaries
  const summary = useMemo(() => calculateClientsSummary(clients), [clients]);
  const needsAttentionList = useMemo(() => getClientsNeedingAttention(clients), [clients]);

  // Derived filtered client list
  const filteredClients = useMemo(() => {
    return filterVendorClients(clients, filters);
  }, [clients, filters]);

  // Selected client object
  const selectedClient = useMemo(() => {
    if (!selectedClientId) return null;
    return clients.find((c) => c.id === selectedClientId) || null;
  }, [clients, selectedClientId]);

  // Filter handlers
  const handleFilterChange = (updates: Partial<ClientFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      relationshipStatus: "ALL",
      priority: "ALL",
      weddingStatus: "ALL",
      service: "ALL",
      destination: "ALL",
      searchQuery: "",
      sortBy: "RECENTLY_UPDATED",
    });
  };

  const handleStatusFilterSelect = (status: string) => {
    handleResetFilters();
    if (status !== "ALL") {
      setFilters((prev) => ({
        ...prev,
        relationshipStatus: status as ClientRelationshipStatus | "ALL",
      }));
    }
  };

  // Add / Edit Client Handler
  const handleSaveClient = (clientData: Partial<VendorClient>) => {
    const now = new Date().toISOString();

    if (editingClient) {
      // Update existing
      setClients((prev) =>
        prev.map((c) => {
          if (c.id === editingClient.id) {
            const updated: VendorClient = {
              ...c,
              ...clientData,
              updatedAt: now,
              activities: [
                {
                  id: `act_${Date.now()}`,
                  type: "STATUS_CHANGED",
                  description: "Client profile updated",
                  timestamp: now,
                },
                ...c.activities,
              ],
            };
            return updated;
          }
          return c;
        })
      );
      setEditingClient(null);
    } else {
      // Create new client
      const newId = `cli_${Date.now()}`;
      const couple = clientData.coupleName || "New Couple";
      const initials = couple
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);

      const newClient: VendorClient = {
        id: newId,
        clientReference: `CLI-2026-${Math.floor(100 + Math.random() * 900)}`,
        coupleName: couple,
        partnerName: clientData.partnerName || "",
        email: clientData.email || "",
        phone: clientData.phone || "",
        alternatePhone: clientData.alternatePhone,
        preferredContactMethod: clientData.preferredContactMethod || "EMAIL",
        destination: clientData.destination || "Mumbai",
        venue: clientData.venue,
        weddingDate: clientData.weddingDate,
        weddingDateStatus: clientData.weddingDateStatus || "CONFIRMED",
        guestCount: clientData.guestCount,
        relationshipStatus: clientData.relationshipStatus || "LEAD",
        priority: clientData.priority || "NORMAL",
        source: clientData.source || "DIRECT",
        avatarInitials: initials,
        enquiryId: clientData.enquiryId,
        bookingIds: clientData.bookingIds || [],
        serviceIds: clientData.serviceIds || [],
        services: clientData.services || ["Wedding Photography"],
        notes: clientData.notes,
        nextAction: clientData.nextAction || "Initial consultation",
        nextActionDate: clientData.nextActionDate || new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
        createdAt: now,
        updatedAt: now,
        weddingStatus: clientData.weddingStatus || "PLANNING",
        events: clientData.events || [],
        activities: [
          {
            id: `act_${Date.now()}`,
            type: "CLIENT_ADDED",
            description: "Client profile created in workspace",
            timestamp: now,
          },
        ],
      };

      setClients((prev) => [newClient, ...prev]);
      setIsAddEditorOpen(false);
      setSelectedClientId(newId);
    }
  };

  // Update Status
  const handleUpdateStatus = (clientId: string, newStatus: ClientRelationshipStatus) => {
    const now = new Date().toISOString();
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          const newAct: ClientActivity = {
            id: `act_${Date.now()}`,
            type: "STATUS_CHANGED",
            description: `Relationship status changed to ${newStatus}`,
            timestamp: now,
          };
          return {
            ...c,
            relationshipStatus: newStatus,
            updatedAt: now,
            activities: [newAct, ...c.activities],
          };
        }
        return c;
      })
    );
  };

  // Update Priority
  const handleUpdatePriority = (clientId: string, priority: ClientPriority) => {
    const now = new Date().toISOString();
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          const newAct: ClientActivity = {
            id: `act_${Date.now()}`,
            type: "STATUS_CHANGED",
            description: `Priority updated to ${priority}`,
            timestamp: now,
          };
          return {
            ...c,
            priority,
            updatedAt: now,
            activities: [newAct, ...c.activities],
          };
        }
        return c;
      })
    );
  };

  // Save / Edit Notes
  const handleSaveNotes = (clientId: string, noteContent: string) => {
    const now = new Date().toISOString();
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          const newAct: ClientActivity = {
            id: `act_${Date.now()}`,
            type: "NOTE_ADDED",
            description: `Updated internal note: "${noteContent.slice(0, 40)}${noteContent.length > 40 ? "..." : ""}"`,
            timestamp: now,
          };
          return {
            ...c,
            notes: noteContent,
            updatedAt: now,
            activities: [newAct, ...c.activities],
          };
        }
        return c;
      })
    );
  };

  // Delete Notes
  const handleDeleteNotes = (clientId: string) => {
    const now = new Date().toISOString();
    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          return {
            ...c,
            notes: undefined,
            updatedAt: now,
          };
        }
        return c;
      })
    );
  };

  // Record Contact Handler
  const handleRecordContact = (
    method: ClientContactPreference,
    summaryText: string,
    nextFollowUpDate?: string
  ) => {
    if (!recordingContactClient) return;

    const now = new Date().toISOString();
    const clientId = recordingContactClient.id;

    setClients((prev) =>
      prev.map((c) => {
        if (c.id === clientId) {
          const newAct: ClientActivity = {
            id: `act_${Date.now()}`,
            type: "CONTACTED",
            description: `Logged ${method} contact: ${summaryText}`,
            timestamp: now,
          };
          return {
            ...c,
            lastContactedAt: now,
            nextAction: summaryText || c.nextAction,
            nextActionDate: nextFollowUpDate || c.nextActionDate,
            updatedAt: now,
            activities: [newAct, ...c.activities],
          };
        }
        return c;
      })
    );

    setRecordingContactClient(null);
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 pb-16">
        {/* Page Header */}
        <ClientsPageHeader
          onAddClient={() => setIsAddEditorOpen(true)}
          onFilterActive={() => handleStatusFilterSelect("ACTIVE")}
        />

        {/* Overview Editorial Metrics */}
        <ClientsOverview
          summary={summary}
          activeFilterStatus={filters.relationshipStatus}
          onSelectStatusFilter={handleStatusFilterSelect}
        />

        {/* Needs Attention Follow-up Section */}
        <ClientsNeedsAttention
          clientsNeedingAttention={needsAttentionList}
          onSelectClient={(client) => setSelectedClientId(client.id)}
        />

        {/* Filters & Directory */}
        <div className="space-y-6">
          <ClientFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            totalFilteredCount={filteredClients.length}
          />

          <ClientList
            clients={filteredClients}
            selectedClientId={selectedClientId || undefined}
            onSelectClient={(client) => setSelectedClientId(client.id)}
            onResetFilters={handleResetFilters}
          />
        </div>

        {/* Closing CTA */}
        <ClientsPageCTA />
      </div>

      {/* Detail Side-Panel Workspace */}
      <ClientDetail
        client={selectedClient}
        onClose={() => setSelectedClientId(null)}
        onUpdateStatus={handleUpdateStatus}
        onUpdatePriority={handleUpdatePriority}
        onSaveNotes={handleSaveNotes}
        onDeleteNotes={handleDeleteNotes}
        onOpenEditModal={(client) => setEditingClient(client)}
        onOpenRecordContact={(client) => setRecordingContactClient(client)}
      />

      {/* Add / Edit Client Modal */}
      <ClientEditor
        isOpen={isAddEditorOpen || !!editingClient}
        onClose={() => {
          setIsAddEditorOpen(false);
          setEditingClient(null);
        }}
        clientToEdit={editingClient}
        onSave={handleSaveClient}
      />

      {/* Record Contact Modal */}
      {recordingContactClient && (
        <RecordContactModal
          isOpen={true}
          onClose={() => setRecordingContactClient(null)}
          client={recordingContactClient}
          onRecordContact={handleRecordContact}
        />
      )}
    </VendorDashboardShell>
  );
}
