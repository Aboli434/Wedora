import {
  VendorService,
  VendorAddOn,
  VendorServicesSummary,
  PricingType,
  ServiceAvailabilityType,
  ServiceVisibilityType,
} from "@/data/vendorServices";

export interface ServiceFiltersState {
  search: string;
  category: string;
  pricingType: string;
  availability: string;
  visibility: string;
  sortBy: "updated" | "name" | "priceAsc" | "priceDesc";
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function formatIndianCurrency(amount?: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) return "N/A";
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatPricingType(type: PricingType): string {
  switch (type) {
    case "STARTING_FROM":
      return "Starting From";
    case "FIXED":
      return "Fixed Price";
    case "CUSTOM_QUOTE":
      return "Custom Quote";
    default:
      return type;
  }
}

export function formatAvailability(status: ServiceAvailabilityType): string {
  switch (status) {
    case "AVAILABLE":
      return "Available";
    case "LIMITED":
      return "Limited";
    case "UNAVAILABLE":
      return "Unavailable";
    default:
      return status;
  }
}

export function formatVisibility(visibility: ServiceVisibilityType): string {
  return visibility === "PUBLIC" ? "Public" : "Private";
}

export function calculateStartingPrice(services: VendorService[]): number | undefined {
  const pricedServices = services
    .filter((s) => s.visibility === "PUBLIC" && s.price && s.price > 0)
    .map((s) => s.price as number);

  if (pricedServices.length === 0) return undefined;
  return Math.min(...pricedServices);
}

export function calculateServicesSummary(services: VendorService[]): VendorServicesSummary {
  const publicServices = services.filter((s) => s.visibility === "PUBLIC").length;
  const availableServices = services.filter((s) => s.availability !== "UNAVAILABLE").length;
  const startingPrice = calculateStartingPrice(services);

  return {
    totalServices: services.length,
    publicServices,
    availableServices,
    startingPrice,
  };
}

export function getPublicServices(services: VendorService[]): VendorService[] {
  return services.filter((s) => s.visibility === "PUBLIC");
}

export function getAvailableServices(services: VendorService[]): VendorService[] {
  return services.filter((s) => s.availability !== "UNAVAILABLE");
}

export function getServicesNeedingAttention(services: VendorService[]): {
  service: VendorService;
  reason: string;
}[] {
  const issues: { service: VendorService; reason: string }[] = [];

  services.forEach((s) => {
    if (s.pricingType !== "CUSTOM_QUOTE" && (!s.price || s.price <= 0)) {
      issues.push({ service: s, reason: "Missing price value" });
    } else if (!s.inclusions || s.inclusions.length === 0) {
      issues.push({ service: s, reason: "No inclusions listed" });
    } else if (s.visibility === "PRIVATE") {
      issues.push({ service: s, reason: "Service marked private" });
    } else if (s.availability === "LIMITED") {
      issues.push({ service: s, reason: "Limited booking availability" });
    } else if (!s.description || s.description.trim().length < 30) {
      issues.push({ service: s, reason: "Incomplete description" });
    }
  });

  return issues;
}

export function calculateServiceCompletion(service: VendorService): number {
  let points = 0;
  const maxPoints = 8;

  if (service.name?.trim()) points++;
  if (service.category?.trim()) points++;
  if (service.shortDescription?.trim()) points++;
  if (service.description?.trim()) points++;
  if (service.pricingType === "CUSTOM_QUOTE" || (service.price && service.price > 0)) points++;
  if (service.duration?.trim()) points++;
  if (service.delivery?.trim()) points++;
  if (service.inclusions && service.inclusions.length > 0) points++;

  return Math.round((points / maxPoints) * 100);
}

export function validateVendorService(service: Partial<VendorService>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!service.name || !service.name.trim()) {
    errors.name = "Service name is required.";
  }

  if (!service.category || !service.category.trim()) {
    errors.category = "Category is required.";
  }

  if (!service.shortDescription || !service.shortDescription.trim()) {
    errors.shortDescription = "Short description is required.";
  } else if (service.shortDescription.length > 180) {
    errors.shortDescription = "Short description cannot exceed 180 characters.";
  }

  if (service.pricingType !== "CUSTOM_QUOTE") {
    if (service.price === undefined || service.price === null || isNaN(service.price) || service.price < 0) {
      errors.price = "Please enter a valid positive price.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateVendorAddOn(addOn: Partial<VendorAddOn>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!addOn.name || !addOn.name.trim()) {
    errors.name = "Add-on name is required.";
  }

  if (addOn.pricingType === "FIXED") {
    if (addOn.price === undefined || addOn.price === null || isNaN(addOn.price) || addOn.price < 0) {
      errors.price = "Add-on price must be a positive number.";
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterVendorServices(
  services: VendorService[],
  filters: ServiceFiltersState
): VendorService[] {
  return services.filter((s) => {
    // Search filter
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchName = s.name.toLowerCase().includes(q);
      const matchCat = s.category.toLowerCase().includes(q);
      const matchDesc = s.shortDescription.toLowerCase().includes(q);
      if (!matchName && !matchCat && !matchDesc) return false;
    }

    // Category filter
    if (filters.category !== "ALL" && s.category !== filters.category) {
      return false;
    }

    // Pricing type filter
    if (filters.pricingType !== "ALL" && s.pricingType !== filters.pricingType) {
      return false;
    }

    // Availability filter
    if (filters.availability !== "ALL" && s.availability !== filters.availability) {
      return false;
    }

    // Visibility filter
    if (filters.visibility !== "ALL" && s.visibility !== filters.visibility) {
      return false;
    }

    return true;
  });
}

export function sortVendorServices(
  services: VendorService[],
  sortBy: ServiceFiltersState["sortBy"]
): VendorService[] {
  const sorted = [...services];

  switch (sortBy) {
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "priceAsc":
      return sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
    case "priceDesc":
      return sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
    case "updated":
    default:
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return b.id.localeCompare(a.id);
      });
  }
}
