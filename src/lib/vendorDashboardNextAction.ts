import { FullVendorDashboardData } from "../data/vendorDashboard";

export interface VendorNextActionItem {
  id: string;
  category: string;
  title: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
}

export function getVendorDashboardNextAction(
  data: FullVendorDashboardData
): VendorNextActionItem {
  const newEnquiry = data.enquiries.find((e) => e.status === "NEW");

  // Priority 1: Unresponded new enquiry
  if (newEnquiry) {
    return {
      id: "v-act-enquiry",
      category: "NEW CLIENT LEAD",
      title: "Respond to your new enquiry",
      description: `New enquiry received from ${newEnquiry.coupleNames} for ${newEnquiry.destination} on ${newEnquiry.weddingDate}.`,
      ctaLabel: "Review Enquiry →",
      ctaHref: "/vendor/dashboard/enquiries",
    };
  }

  // Priority 2: Incomplete business profile
  if (data.profile.profileCompletion < 80) {
    return {
      id: "v-act-profile",
      category: "STUDIO PROFILE",
      title: "Complete your studio profile",
      description: `Your profile is ${data.profile.profileCompletion}% complete. Add remaining portfolio photos and fine-tune team details.`,
      ctaLabel: "Complete Studio Profile →",
      ctaHref: "/vendor/dashboard/business",
    };
  }

  // Priority 3: Confirmed upcoming bookings
  if (data.bookings && data.bookings.length > 0) {
    const nextBooking = data.bookings[0];
    return {
      id: "v-act-booking",
      category: "UPCOMING EVENT",
      title: "Review upcoming shoot details",
      description: `Confirmed shoot for ${nextBooking.coupleNames} in ${nextBooking.location} on ${nextBooking.eventDate}.`,
      ctaLabel: "View Booking →",
      ctaHref: "/vendor/dashboard/bookings",
    };
  }

  // Priority 4: Outstanding payments
  if (data.summary.outstandingPayments > 0) {
    return {
      id: "v-act-payment",
      category: "FINANCIAL MILESTONE",
      title: "Review your payment schedule",
      description: `Outstanding balance of ₹${(data.summary.outstandingPayments / 100000).toFixed(1)}L across active bookings.`,
      ctaLabel: "View Payments →",
      ctaHref: "/vendor/dashboard/payments",
    };
  }

  // Priority 5: Default Operational Schedule
  return {
    id: "v-act-calendar",
    category: "OPERATIONAL CALENDAR",
    title: "Review your upcoming work schedule",
    description: "Check your studio calendar schedule and buffer hours for upcoming wedding shoots.",
    ctaLabel: "View Calendar →",
    ctaHref: "/vendor/dashboard/calendar",
  };
}
