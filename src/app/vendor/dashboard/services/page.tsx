"use client";

import React, { useState, useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  MOCK_VENDOR_SERVICES,
  VendorService,
} from "@/data/vendorServices";
import {
  calculateServicesSummary,
  filterVendorServices,
  sortVendorServices,
  ServiceFiltersState,
} from "@/lib/vendorServices";
import {
  ServicesPageHeader,
  ServicesOverview,
  FeaturedService,
  ServicesNeedsAttention,
  ServiceFilters,
  ServiceList,
  ServiceEditor,
  ServicesEmptyState,
  ServicesPageCTA,
} from "@/components/vendor-dashboard/services";
import { Info } from "lucide-react";

export default function VendorServicesPage() {
  const [services, setServices] = useState<VendorService[]>(MOCK_VENDOR_SERVICES);
  const [filters, setFilters] = useState<ServiceFiltersState>({
    search: "",
    category: "ALL",
    pricingType: "ALL",
    availability: "ALL",
    visibility: "ALL",
    sortBy: "updated",
  });

  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingService, setEditingService] = useState<VendorService | null>(null);
  const [sessionNotice, setSessionNotice] = useState<string | null>(null);

  // Derived Summary & Categories
  const summary = useMemo(() => calculateServicesSummary(services), [services]);

  const categories = useMemo(() => {
    const cats = new Set(services.map((s) => s.category));
    return Array.from(cats);
  }, [services]);

  // Derived Filtered & Sorted Services
  const filteredServices = useMemo(() => {
    const filtered = filterVendorServices(services, filters);
    return sortVendorServices(filtered, filters.sortBy);
  }, [services, filters]);

  // Featured Service
  const featuredService = useMemo(
    () => services.find((s) => s.featured) || (services.length > 0 ? services[0] : null),
    [services]
  );

  // Actions
  const handleOpenAddModal = () => {
    setEditingService(null);
    setIsEditorOpen(true);
  };

  const handleEditService = (service: VendorService) => {
    setEditingService(service);
    setIsEditorOpen(true);
  };

  const handleSaveService = (savedService: VendorService) => {
    setServices((prev) => {
      const exists = prev.some((s) => s.id === savedService.id);
      let updatedList: VendorService[];

      if (savedService.featured) {
        // Unfeature others if this one is featured
        prev = prev.map((s) => ({ ...s, featured: false }));
      }

      if (exists) {
        updatedList = prev.map((s) => (s.id === savedService.id ? savedService : s));
      } else {
        updatedList = [savedService, ...prev];
      }

      return updatedList;
    });

    setSessionNotice(`Service "${savedService.name}" saved for this session.`);
    setTimeout(() => setSessionNotice(null), 5000);
  };

  const handleDuplicateService = (serviceToDuplicate: VendorService) => {
    const duplicated: VendorService = {
      ...serviceToDuplicate,
      id: `srv-${Date.now()}`,
      name: `${serviceToDuplicate.name} (Copy)`,
      featured: false,
      updatedAt: "Just now",
    };

    setServices((prev) => [duplicated, ...prev]);
    setSessionNotice(`Duplicated "${serviceToDuplicate.name}".`);
    setTimeout(() => setSessionNotice(null), 4000);
  };

  const handleToggleVisibility = (service: VendorService) => {
    const nextVisibility = service.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setServices((prev) =>
      prev.map((s) => (s.id === service.id ? { ...s, visibility: nextVisibility } : s))
    );
    setSessionNotice(`"${service.name}" marked as ${nextVisibility.toLowerCase()}.`);
    setTimeout(() => setSessionNotice(null), 4000);
  };

  const handleDeleteService = (serviceId: string) => {
    const target = services.find((s) => s.id === serviceId);
    setServices((prev) => prev.filter((s) => s.id !== serviceId));
    if (target) {
      setSessionNotice(`Deleted service "${target.name}".`);
      setTimeout(() => setSessionNotice(null), 4000);
    }
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 max-w-6xl mx-auto">
        {/* Page Header */}
        <ServicesPageHeader onAddService={handleOpenAddModal} />

        {/* Overview Metrics */}
        <ServicesOverview summary={summary} />

        {/* Session Notice */}
        {sessionNotice && (
          <div className="flex items-center gap-2.5 px-4 py-3 rounded-lg bg-[#F2ECE4] border border-[#E5DEC9] text-xs text-[#594B3C]">
            <Info className="w-4 h-4 text-[#C5A880] shrink-0" />
            <span>{sessionNotice}</span>
          </div>
        )}

        {/* Featured Signature Service */}
        {featuredService && (
          <FeaturedService
            service={featuredService}
            onEdit={handleEditService}
            onDuplicate={handleDuplicateService}
            onToggleVisibility={handleToggleVisibility}
          />
        )}

        {/* Needs Attention items */}
        {services.length > 0 && (
          <ServicesNeedsAttention
            services={services}
            onSelectService={handleEditService}
          />
        )}

        {/* Filters & Search Bar */}
        {services.length > 0 && (
          <ServiceFilters
            filters={filters}
            onChange={setFilters}
            categories={categories}
          />
        )}

        {/* Services Table/List or Empty State */}
        {services.length === 0 ? (
          <ServicesEmptyState onAddService={handleOpenAddModal} />
        ) : (
          <ServiceList
            services={filteredServices}
            onEdit={handleEditService}
            onDuplicate={handleDuplicateService}
            onToggleVisibility={handleToggleVisibility}
            onDelete={handleDeleteService}
          />
        )}

        {/* Page Closing CTA */}
        <ServicesPageCTA />

        {/* Service Editor Modal Window */}
        <ServiceEditor
          service={editingService}
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSave={handleSaveService}
        />
      </div>
    </VendorDashboardShell>
  );
}
