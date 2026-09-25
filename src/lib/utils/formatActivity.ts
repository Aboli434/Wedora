/**
 * Helper utility to map raw backend activity action codes and entity types
 * into human-readable, luxury-styled editorial display descriptions.
 */

export function formatActivityAction(action: string, metadata?: unknown): string {
  if (!action) return "Activity logged";

  // Check metadata for direct titles or descriptions if available
  const metaObj = metadata && typeof metadata === "object" ? (metadata as Record<string, unknown>) : null;
  if (metaObj?.title && typeof metaObj.title === "string") {
    return metaObj.title;
  }
  if (metaObj?.description && typeof metaObj.description === "string") {
    return metaObj.description;
  }

  const normalized = action.toUpperCase().trim();

  switch (normalized) {
    case "WEDDING_CREATED":
      return "Wedding Celebration Initialized";
    case "WEDDING_UPDATED":
      return "Wedding Details Updated";
    case "EVENT_CREATED":
      return "New Event Schedule Added";
    case "CHECKLIST_TASK_CREATED":
      return "Checklist Task Created";
    case "CHECKLIST_TASK_UPDATED":
      return "Checklist Progress Updated";
    case "EXPENSE_CREATED":
      return "New Expense Recorded";
    case "EXPENSE_UPDATED":
      return "Expense Entry Updated";
    case "GUEST_CREATED":
      return "Guest Invitation Added";
    case "GUEST_UPDATED":
      return "Guest RSVP/Attendance Updated";
    case "ENQUIRY_CREATED":
      return "Vendor Enquiry Submitted";
    case "ENQUIRY_STATUS_UPDATED":
      return "Enquiry Status Changed";
    case "ENQUIRY_MESSAGE_SENT":
      return "New Message Received";
    case "ENQUIRY_CONVERTED_TO_BOOKING":
      return "Enquiry Converted to Booking";
    case "BOOKING_CREATED":
      return "Vendor Booking Confirmed";
    case "BOOKING_STATUS_UPDATED":
      return "Booking Status Updated";
    case "BOOKING_SERVICE_ADDED":
      return "Service Item Added to Booking";
    case "BOOKING_EVENT_ADDED":
      return "Event Milestone Assigned to Booking";
    case "PAYMENT_MILESTONE_CREATED":
      return "Payment Schedule Milestone Created";
    case "PAYMENT_TRANSACTION_RECORDED":
      return "Payment Transaction Processed";
    case "REVIEW_CREATED":
      return "Vendor Experience Review Published";
    default:
      // Fallback formatting: convert SNAKE_CASE to Title Case
      return normalized
        .toLowerCase()
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
  }
}

export function formatActivityCategory(entityType?: string): string {
  if (!entityType) return "ACTIVITY";
  const normalized = entityType.toUpperCase().trim();
  switch (normalized) {
    case "WEDDING":
      return "CELEBRATION";
    case "CHECKLIST_TASK":
    case "CHECKLIST":
      return "CHECKLIST";
    case "EXPENSE":
    case "BUDGET":
    case "PAYMENT":
    case "PAYMENT_TRANSACTION":
      return "FINANCE";
    case "GUEST":
      return "GUESTS";
    case "ENQUIRY":
    case "ENQUIRY_MESSAGE":
      return "ENQUIRIES";
    case "BOOKING":
      return "BOOKING";
    case "REVIEW":
      return "REVIEWS";
    case "VENDOR":
      return "VENDOR";
    default:
      return normalized.replace(/_/g, " ");
  }
}
