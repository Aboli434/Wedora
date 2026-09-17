import {
  DashboardVendor,
  VendorCategory,
  VendorStatus,
  PaymentStatus,
  VendorEvent,
  VendorSummary,
  VendorPaymentSummary,
  VendorActionItem,
} from "@/data/vendorsDashboard";

export interface VendorFiltersState {
  search: string;
  category: string; // "ALL" | VendorCategory
  status: string; // "ALL" | VendorStatus
  paymentStatus: string; // "ALL" | PaymentStatus
  event: string; // "ALL" | VendorEvent
}

export function formatIndianCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateVendorSummary(vendors: DashboardVendor[]): VendorSummary {
  const totalVendors = vendors.length;
  let bookedVendors = 0;
  let pendingEnquiries = 0;
  let shortlistedVendors = 0;
  let needingAction = 0;
  let totalCommitted = 0;
  let totalPaid = 0;

  vendors.forEach((v) => {
    if (v.status === "BOOKED" || v.status === "COMPLETED") {
      bookedVendors++;
    } else if (v.status === "ENQUIRY_SENT" || v.status === "NEGOTIATING") {
      pendingEnquiries++;
    } else if (v.status === "SHORTLISTED") {
      shortlistedVendors++;
    }

    if (
      v.status === "ENQUIRY_SENT" ||
      v.status === "NEGOTIATING" ||
      v.paymentStatus === "DUE" ||
      (v.status === "SHORTLISTED" && !v.enquirySentAt)
    ) {
      needingAction++;
    }

    if (v.amount) {
      totalCommitted += v.amount;
    }
    if (v.amountPaid) {
      totalPaid += v.amountPaid;
    }
  });

  const totalOutstanding = Math.max(0, totalCommitted - totalPaid);

  return {
    totalVendors,
    bookedVendors,
    pendingEnquiries,
    shortlistedVendors,
    needingAction,
    totalCommitted,
    totalPaid,
    totalOutstanding,
  };
}

export function calculateVendorPaymentSummary(
  vendors: DashboardVendor[]
): VendorPaymentSummary {
  let totalCommitted = 0;
  let totalPaid = 0;
  let vendorsWithPayments = 0;

  vendors.forEach((v) => {
    if (v.amount && v.amount > 0) {
      vendorsWithPayments++;
      totalCommitted += v.amount;
      if (v.amountPaid) {
        totalPaid += v.amountPaid;
      }
    }
  });

  const totalOutstanding = Math.max(0, totalCommitted - totalPaid);

  return {
    totalCommitted,
    totalPaid,
    totalOutstanding,
    vendorsWithPayments,
  };
}

export function calculateVendorCategoryCounts(vendors: DashboardVendor[]) {
  const categories: Record<VendorCategory, { count: number; percentage: number }> = {
    PLANNING: { count: 0, percentage: 0 },
    PHOTOGRAPHY: { count: 0, percentage: 0 },
    DECOR: { count: 0, percentage: 0 },
    VENUE: { count: 0, percentage: 0 },
    CATERING: { count: 0, percentage: 0 },
    MUSIC: { count: 0, percentage: 0 },
    BRIDAL: { count: 0, percentage: 0 },
    MAKEUP: { count: 0, percentage: 0 },
    TRAVEL: { count: 0, percentage: 0 },
    OTHER: { count: 0, percentage: 0 },
  };

  const total = vendors.length;
  if (total === 0) return categories;

  vendors.forEach((v) => {
    if (categories[v.category]) {
      categories[v.category].count++;
    }
  });

  (Object.keys(categories) as VendorCategory[]).forEach((catKey) => {
    categories[catKey].percentage = Math.round(
      (categories[catKey].count / total) * 100
    );
  });

  return categories;
}

export function calculateVendorStatusCounts(vendors: DashboardVendor[]) {
  const statuses: Record<VendorStatus, number> = {
    SHORTLISTED: 0,
    ENQUIRY_SENT: 0,
    NEGOTIATING: 0,
    BOOKED: 0,
    COMPLETED: 0,
    CANCELLED: 0,
  };

  vendors.forEach((v) => {
    if (statuses[v.status] !== undefined) {
      statuses[v.status]++;
    }
  });

  return statuses;
}

export function getVendorActions(vendors: DashboardVendor[]): VendorActionItem[] {
  const actions: VendorActionItem[] = [];

  vendors.forEach((v) => {
    // 1. Payment due
    if (v.paymentStatus === "DUE") {
      actions.push({
        id: `act-pay-${v.id}`,
        vendorId: v.id,
        vendorName: v.name,
        category: v.category,
        reason: "Instalment or booking payment currently due",
        status: v.status,
        nextAction: v.nextAction || "Process due payment",
        nextActionDate: v.nextActionDate,
      });
    }

    // 2. Enquiry Sent & awaiting response
    if (v.status === "ENQUIRY_SENT") {
      actions.push({
        id: `act-enq-${v.id}`,
        vendorId: v.id,
        vendorName: v.name,
        category: v.category,
        reason: "Enquiry submitted, awaiting vendor response & quote",
        status: v.status,
        nextAction: v.nextAction || "Follow up on initial enquiry",
        nextActionDate: v.nextActionDate,
      });
    }

    // 3. Negotiating contract
    if (v.status === "NEGOTIATING") {
      actions.push({
        id: `act-neg-${v.id}`,
        vendorId: v.id,
        vendorName: v.name,
        category: v.category,
        reason: "Terms or acoustic rider under review",
        status: v.status,
        nextAction: v.nextAction || "Review quote & contract terms",
        nextActionDate: v.nextActionDate,
      });
    }

    // 4. Shortlisted but enquiry not yet sent
    if (v.status === "SHORTLISTED") {
      actions.push({
        id: `act-short-${v.id}`,
        vendorId: v.id,
        vendorName: v.name,
        category: v.category,
        reason: "Shortlisted vendor awaiting formal enquiry",
        status: v.status,
        nextAction: v.nextAction || "Send enquiry to vendor",
        nextActionDate: v.nextActionDate,
      });
    }
  });

  return actions;
}

export function getUpcomingVendorActions(vendors: DashboardVendor[]): DashboardVendor[] {
  return vendors
    .filter((v) => v.nextAction && v.nextActionDate)
    .sort((a, b) => {
      const dateA = new Date(a.nextActionDate!).getTime();
      const dateB = new Date(b.nextActionDate!).getTime();
      return dateA - dateB;
    });
}

export function searchDashboardVendors(
  vendors: DashboardVendor[],
  query: string
): DashboardVendor[] {
  if (!query || query.trim() === "") return vendors;
  const q = query.toLowerCase().trim();

  return vendors.filter((v) => {
    const matchName = v.name.toLowerCase().includes(q);
    const matchCategory = formatVendorCategory(v.category).toLowerCase().includes(q);
    const matchLocation = v.location.toLowerCase().includes(q);
    const matchDesc = v.description.toLowerCase().includes(q);
    const matchAction = v.nextAction ? v.nextAction.toLowerCase().includes(q) : false;
    const matchNotes = v.notes ? v.notes.toLowerCase().includes(q) : false;

    return (
      matchName ||
      matchCategory ||
      matchLocation ||
      matchDesc ||
      matchAction ||
      matchNotes
    );
  });
}

export function filterDashboardVendors(
  vendors: DashboardVendor[],
  filters: VendorFiltersState
): DashboardVendor[] {
  let result = searchDashboardVendors(vendors, filters.search);

  if (filters.category && filters.category !== "ALL") {
    result = result.filter((v) => v.category === filters.category);
  }

  if (filters.status && filters.status !== "ALL") {
    result = result.filter((v) => v.status === filters.status);
  }

  if (filters.paymentStatus && filters.paymentStatus !== "ALL") {
    result = result.filter((v) => v.paymentStatus === filters.paymentStatus);
  }

  if (filters.event && filters.event !== "ALL") {
    result = result.filter(
      (v) => v.event === filters.event || v.event === "ALL_EVENTS"
    );
  }

  return result;
}

export function sortDashboardVendors(
  vendors: DashboardVendor[],
  sortBy: string
): DashboardVendor[] {
  const list = [...vendors];

  switch (sortBy) {
    case "name_asc":
      return list.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return list.sort((a, b) => b.name.localeCompare(a.name));
    case "updated":
      return list.sort((a, b) => {
        const dateA = a.updatedAt || a.bookingDate || a.enquirySentAt || "";
        const dateB = b.updatedAt || b.bookingDate || b.enquirySentAt || "";
        return new Date(dateB).getTime() - new Date(dateA).getTime();
      });
    case "status":
      const statusOrder: Record<VendorStatus, number> = {
        BOOKED: 1,
        NEGOTIATING: 2,
        ENQUIRY_SENT: 3,
        SHORTLISTED: 4,
        COMPLETED: 5,
        CANCELLED: 6,
      };
      return list.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
    case "outstanding":
      return list.sort((a, b) => {
        const outA = (a.amount || 0) - (a.amountPaid || 0);
        const outB = (b.amount || 0) - (b.amountPaid || 0);
        return outB - outA;
      });
    case "booking_date":
      return list.sort((a, b) => {
        const dateA = a.bookingDate ? new Date(a.bookingDate).getTime() : 0;
        const dateB = b.bookingDate ? new Date(b.bookingDate).getTime() : 0;
        return dateB - dateA;
      });
    default:
      return list;
  }
}

export function calculatePaymentProgress(vendor: DashboardVendor): number {
  if (!vendor.amount || vendor.amount === 0) return 0;
  const paid = vendor.amountPaid || 0;
  return Math.min(100, Math.round((paid / vendor.amount) * 100));
}

export function formatVendorStatus(status: VendorStatus): {
  label: string;
  badgeClass: string;
} {
  switch (status) {
    case "BOOKED":
      return {
        label: "Booked",
        badgeClass: "bg-[#2D4A3E]/10 text-[#2D4A3E] border-[#2D4A3E]/20",
      };
    case "ENQUIRY_SENT":
      return {
        label: "Enquiry Sent",
        badgeClass: "bg-[#C5A880]/15 text-[#8C6D3B] border-[#C5A880]/30",
      };
    case "NEGOTIATING":
      return {
        label: "Negotiating",
        badgeClass: "bg-[#8C6D3B]/10 text-[#8C6D3B] border-[#8C6D3B]/25",
      };
    case "SHORTLISTED":
      return {
        label: "Shortlisted",
        badgeClass: "bg-[#161514]/5 text-[#5A5650] border-[#161514]/15",
      };
    case "COMPLETED":
      return {
        label: "Completed",
        badgeClass: "bg-[#2D4A3E]/5 text-[#2D4A3E] border-[#2D4A3E]/15",
      };
    case "CANCELLED":
      return {
        label: "Cancelled",
        badgeClass: "bg-red-50 text-red-700 border-red-200",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
}

export function formatPaymentStatus(status: PaymentStatus): {
  label: string;
  badgeClass: string;
} {
  switch (status) {
    case "PAID":
      return {
        label: "Fully Paid",
        badgeClass: "bg-[#2D4A3E]/10 text-[#2D4A3E] border-[#2D4A3E]/20",
      };
    case "PARTIAL":
      return {
        label: "Deposit Paid",
        badgeClass: "bg-[#C5A880]/15 text-[#8C6D3B] border-[#C5A880]/30",
      };
    case "DUE":
      return {
        label: "Payment Due",
        badgeClass: "bg-[#8C6D3B]/20 text-[#8C6D3B] border-[#8C6D3B]/40 font-semibold",
      };
    case "NOT_STARTED":
      return {
        label: "Not Started",
        badgeClass: "bg-[#161514]/5 text-[#5A5650] border-[#161514]/15",
      };
    default:
      return {
        label: status,
        badgeClass: "bg-gray-100 text-gray-700 border-gray-200",
      };
  }
}

export function formatVendorCategory(category: VendorCategory): string {
  switch (category) {
    case "PLANNING":
      return "Wedding Planning";
    case "PHOTOGRAPHY":
      return "Photography";
    case "DECOR":
      return "Decor & Design";
    case "VENUE":
      return "Venue";
    case "CATERING":
      return "Catering";
    case "MUSIC":
      return "Music & Entertainment";
    case "BRIDAL":
      return "Bridal & Couture";
    case "MAKEUP":
      return "Makeup & Hair";
    case "TRAVEL":
      return "Travel & Logistics";
    case "OTHER":
      return "Other Services";
    default:
      return category;
  }
}

export function formatVendorEvent(event: VendorEvent): string {
  switch (event) {
    case "ALL_EVENTS":
      return "All Wedding Events";
    case "MEHENDI":
      return "Mehendi & Sangeet";
    case "HALDI":
      return "Haldi Celebration";
    case "WEDDING":
      return "Wedding Ceremony";
    case "RECEPTION":
      return "Grand Reception";
    default:
      return event;
  }
}
