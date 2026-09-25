"use client";

import React, { useState, useEffect, useMemo } from "react";
import { VendorDashboardShell } from "@/components/vendor-dashboard/layout";
import {
  MOCK_VENDOR_SERVICES,
  VendorService,
  PricingType,
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
import {
  getVendorServicesApi,
  createVendorServiceApi,
} from "@/lib/api/endpoints";

export default function VendorServicesPage() {
  const [services, setServices] = useState<VendorService[]>(MOCK_VENDOR_SERVICES);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    let isMounted = true;
    async function loadServices() {
      try {
        setLoading(true);
        const apiServices = await getVendorServicesApi();
        if (Array.isArray(apiServices) && isMounted) {
          const mapped: VendorService[] = apiServices.map((s) => ({
            id: s.id,
            name: s.name,
            category: "Wedding Photography",
            shortDescription: s.description || "Comprehensive vendor service package.",
            description: s.description || "Comprehensive vendor service package.",
            pricingType: (s.pricingType === "FIXED" ? "FIXED" : "STARTING_FROM") as PricingType,
            price: Number(s.price) / 100,
            currency: "INR",
            duration: "Full Event",
            delivery: "Digital Delivery",
            inclusions: ["Professional Service", "Dedicated Team"],
            addOns: [],
            availability: "AVAILABLE",
            visibility: "PUBLIC",
            featured: false,
            updatedAt: new Date(s.updatedAt).toLocaleDateString(),
          }));
          setServices(mapped);
        }
      } catch {
        // Retain initial state on network failure
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadServices();
    return () => {
      isMounted = false;
    };
  }, []);

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

  const handleCreateOrUpdateService = async (serviceData: Partial<VendorService>) => {
    if (serviceData.name && serviceData.price) {
      try {
        const created = await createVendorServiceApi({
          name: serviceData.name,
          price: String(Math.round(serviceData.price * 100)),
          description: serviceData.description,
          pricingType: serviceData.pricingType === "FIXED" ? "FIXED" : "PACKAGE",
        });

        const newServiceItem: VendorService = {
          id: created.id,
          name: created.name,
          category: "Wedding Photography",
          shortDescription: created.description || "",
          description: created.description || "",
          pricingType: (created.pricingType === "FIXED" ? "FIXED" : "STARTING_FROM") as PricingType,
          price: Number(created.price) / 100,
          currency: "INR",
          inclusions: ["Professional Service"],
          addOns: [],
          availability: "AVAILABLE",
          visibility: "PUBLIC",
          featured: false,
          updatedAt: new Date(created.updatedAt).toLocaleDateString(),
        };

        setServices((prev) => [newServiceItem, ...prev]);
      } catch {
        // Fallback
      }
    }
    setIsEditorOpen(false);
    setEditingService(null);
  };

  const handleDuplicateService = (s: VendorService) => {
    const dup: VendorService = { ...s, id: `${s.id}-copy`, name: `${s.name} (Copy)` };
    setServices((prev) => [dup, ...prev]);
  };

  const handleToggleVisibility = (s: VendorService) => {
    setServices((prev) =>
      prev.map((item) => (item.id === s.id ? { ...item, visibility: item.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC" } : item))
    );
  };

  const handleDeleteService = (id: string) => {
    setServices((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <VendorDashboardShell>
      <div className="space-y-8 pb-12">
        <ServicesPageHeader onAddService={() => { setEditingService(null); setIsEditorOpen(true); }} />

        {loading ? (
          <div className="p-8 text-center text-xs text-[#6E6B65] font-sans">Loading services...</div>
        ) : (
          <>
            <ServicesOverview summary={summary} />
            {featuredService && (
              <FeaturedService
                service={featuredService}
                onEdit={(s) => { setEditingService(s); setIsEditorOpen(true); }}
                onDuplicate={handleDuplicateService}
                onToggleVisibility={handleToggleVisibility}
              />
            )}
            <ServicesNeedsAttention services={services} onSelectService={(s) => { setEditingService(s); setIsEditorOpen(true); }} />

            <ServiceFilters
              filters={filters}
              onChange={setFilters}
              categories={categories}
            />

            {filteredServices.length === 0 ? (
              <ServicesEmptyState onAddService={() => { setEditingService(null); setIsEditorOpen(true); }} />
            ) : (
              <ServiceList
                services={filteredServices}
                onEdit={(s) => { setEditingService(s); setIsEditorOpen(true); }}
                onDuplicate={handleDuplicateService}
                onToggleVisibility={handleToggleVisibility}
                onDelete={handleDeleteService}
              />
            )}

            <ServicesPageCTA />
          </>
        )}

        <ServiceEditor
          isOpen={isEditorOpen}
          service={editingService}
          onClose={() => { setIsEditorOpen(false); setEditingService(null); }}
          onSave={handleCreateOrUpdateService}
        />
      </div>
    </VendorDashboardShell>
  );
}
