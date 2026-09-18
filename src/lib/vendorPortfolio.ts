import {
  VendorPortfolioItem,
  VendorPortfolioSummary,
  PortfolioCategory,
  PortfolioVisibility,
} from "@/data/vendorPortfolio";

export interface PortfolioFiltersState {
  search: string;
  category: string;
  visibility: string;
  featured: string;
  sortBy: "featured" | "updated" | "oldest" | "name" | "manual";
}

export interface PortfolioValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function formatPortfolioCategory(category: PortfolioCategory): string {
  switch (category) {
    case "WEDDINGS":
      return "Weddings";
    case "PRE_WEDDING":
      return "Pre-Wedding";
    case "DETAILS":
      return "Details";
    case "PORTRAITS":
      return "Portraits";
    case "DECOR":
      return "Decor & Floral";
    case "EVENTS":
      return "Events & Parties";
    case "OTHER":
      return "Other Work";
    default:
      return category;
  }
}

export function formatPortfolioVisibility(visibility: PortfolioVisibility): string {
  return visibility === "PUBLIC" ? "Public" : "Private";
}

export function getPortfolioCategories(items: VendorPortfolioItem[]): PortfolioCategory[] {
  const cats = new Set<PortfolioCategory>();
  items.forEach((i) => cats.add(i.category));
  return Array.from(cats);
}

export function getPublicPortfolioItems(items: VendorPortfolioItem[]): VendorPortfolioItem[] {
  return items.filter((i) => i.visibility === "PUBLIC");
}

export function getFeaturedPortfolioItems(items: VendorPortfolioItem[]): VendorPortfolioItem[] {
  return items.filter((i) => i.featured);
}

export function calculatePortfolioItemCompletion(item: VendorPortfolioItem): number {
  let points = 0;
  const maxPoints = 7;

  if (item.title?.trim()) points++;
  if (item.category) points++;
  if (item.imageSrc?.trim()) points++;
  if (item.imageAlt?.trim()) points++;
  if (item.description?.trim()) points++;
  if (item.location?.trim()) points++;
  if (item.coupleName?.trim() || item.eventType?.trim()) points++;

  return Math.round((points / maxPoints) * 100);
}

export function calculatePortfolioCompletion(items: VendorPortfolioItem[]): number {
  let points = 0;
  const maxPoints = 5;

  const publicCount = items.filter((i) => i.visibility === "PUBLIC").length;
  const featuredCount = items.filter((i) => i.featured).length;
  const categories = getPortfolioCategories(items);
  const completeItems = items.filter((i) => calculatePortfolioItemCompletion(i) >= 80).length;

  if (items.length >= 3) points++;
  if (publicCount >= 1) points++;
  if (featuredCount >= 1) points++;
  if (categories.length > 1) points++;
  if (completeItems >= Math.min(items.length, 3)) points++;

  return Math.round((points / maxPoints) * 100);
}

export function calculatePortfolioSummary(
  items: VendorPortfolioItem[]
): VendorPortfolioSummary {
  const publicItems = items.filter((i) => i.visibility === "PUBLIC").length;
  const featuredItems = items.filter((i) => i.featured).length;
  const categoryCount = getPortfolioCategories(items).length;
  const portfolioCompletion = calculatePortfolioCompletion(items);

  return {
    totalItems: items.length,
    publicItems,
    featuredItems,
    categoryCount,
    portfolioCompletion,
  };
}

export function getPortfolioItemsNeedingAttention(
  items: VendorPortfolioItem[]
): { item: VendorPortfolioItem; reason: string }[] {
  const issues: { item: VendorPortfolioItem; reason: string }[] = [];

  items.forEach((i) => {
    if (!i.imageAlt || i.imageAlt.trim().length < 5) {
      issues.push({ item: i, reason: "Missing image descriptive alt text" });
    } else if (i.visibility === "PRIVATE") {
      issues.push({ item: i, reason: "Work marked private (hidden from public profile)" });
    } else if (!i.description || i.description.trim().length < 15) {
      issues.push({ item: i, reason: "Incomplete description caption" });
    } else if (!i.location || !i.location.trim()) {
      issues.push({ item: i, reason: "Missing event location tag" });
    }
  });

  return issues;
}

export function validatePortfolioItem(
  item: Partial<VendorPortfolioItem>
): PortfolioValidationResult {
  const errors: Record<string, string> = {};

  if (!item.title || !item.title.trim()) {
    errors.title = "Portfolio title is required.";
  }

  if (!item.category) {
    errors.category = "Category selection is required.";
  }

  if (!item.imageSrc || !item.imageSrc.trim()) {
    errors.imageSrc = "Image source URL/asset path is required.";
  }

  if (!item.imageAlt || !item.imageAlt.trim()) {
    errors.imageAlt = "Image alt text is required for accessibility.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterPortfolioItems(
  items: VendorPortfolioItem[],
  filters: PortfolioFiltersState
): VendorPortfolioItem[] {
  return items.filter((item) => {
    // Search
    if (filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = (item.description || "").toLowerCase().includes(q);
      const matchLoc = (item.location || "").toLowerCase().includes(q);
      const matchCouple = (item.coupleName || "").toLowerCase().includes(q);
      if (!matchTitle && !matchDesc && !matchLoc && !matchCouple) return false;
    }

    // Category
    if (filters.category !== "ALL" && item.category !== filters.category) {
      return false;
    }

    // Visibility
    if (filters.visibility !== "ALL" && item.visibility !== filters.visibility) {
      return false;
    }

    // Featured
    if (filters.featured === "FEATURED" && !item.featured) return false;
    if (filters.featured === "NOT_FEATURED" && item.featured) return false;

    return true;
  });
}

export function sortPortfolioItems(
  items: VendorPortfolioItem[],
  sortBy: PortfolioFiltersState["sortBy"]
): VendorPortfolioItem[] {
  const sorted = [...items];

  switch (sortBy) {
    case "featured":
      return sorted.sort((a, b) => {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return a.sortOrder - b.sortOrder;
      });
    case "name":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "oldest":
      return sorted.sort((a, b) => a.sortOrder - b.sortOrder);
    case "updated":
      return sorted.sort((a, b) => b.id.localeCompare(a.id));
    case "manual":
    default:
      return sorted.sort((a, b) => a.sortOrder - b.sortOrder);
  }
}
