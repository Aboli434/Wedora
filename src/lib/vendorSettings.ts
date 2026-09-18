import {
  VendorAccountProfile,
  VendorWorkspaceSettings,
  VendorNotificationPreferences,
  VendorCommunicationPreferences,
  VendorPrivacyPreferences,
  VendorSettingsData,
} from "../data/vendorSettings";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateVendorAccountProfile(
  account: VendorAccountProfile
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!account.firstName || account.firstName.trim().length === 0) {
    errors.firstName = "First name is required.";
  }

  if (!account.lastName || account.lastName.trim().length === 0) {
    errors.lastName = "Last name is required.";
  }

  if (!account.email || account.email.trim().length === 0) {
    errors.email = "Email address is required.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(account.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!account.phone || account.phone.trim().length === 0) {
    errors.phone = "Phone number is required.";
  } else if (account.phone.trim().length < 8) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!account.preferredContactMethod) {
    errors.preferredContactMethod = "Preferred contact method is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateWorkspaceSettings(
  workspace: VendorWorkspaceSettings
): ValidationResult {
  const errors: Record<string, string> = {};

  if (!workspace.businessName || workspace.businessName.trim().length === 0) {
    errors.businessName = "Business name is required.";
  }

  if (!workspace.category || workspace.category.trim().length === 0) {
    errors.category = "Business category is required.";
  }

  if (
    !workspace.businessLocation ||
    workspace.businessLocation.trim().length === 0
  ) {
    errors.businessLocation = "Primary business location is required.";
  }

  if (workspace.yearsExperience === undefined || workspace.yearsExperience < 0) {
    errors.yearsExperience = "Years of experience cannot be negative.";
  }

  if (workspace.teamSize === undefined || workspace.teamSize < 1) {
    errors.teamSize = "Team size must be at least 1.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getEnabledPreferenceCount(
  obj: Record<string, boolean>
): { enabled: number; total: number } {
  const keys = Object.keys(obj);
  const total = keys.length;
  const enabled = keys.filter((key) => obj[key] === true).length;
  return { enabled, total };
}

export function calculateEnabledNotificationCount(
  notifications: VendorNotificationPreferences
): { enabled: number; total: number } {
  return getEnabledPreferenceCount(
    notifications as unknown as Record<string, boolean>
  );
}

export function calculateEnabledCommunicationCount(
  communications: VendorCommunicationPreferences
): { enabled: number; total: number } {
  const channelToggles = {
    allowEmail: communications.allowEmail,
    allowPhone: communications.allowPhone,
    allowWhatsApp: communications.allowWhatsApp,
    allowSMS: communications.allowSMS,
  };
  return getEnabledPreferenceCount(channelToggles);
}

export function calculateEnabledPrivacyCount(
  privacy: VendorPrivacyPreferences
): { enabled: number; total: number } {
  return getEnabledPreferenceCount(
    privacy as unknown as Record<string, boolean>
  );
}

export function calculateVendorProfileCompletion(
  settings: VendorSettingsData
): number {
  const checks: boolean[] = [
    Boolean(settings.account.firstName?.trim()),
    Boolean(settings.account.lastName?.trim()),
    Boolean(settings.account.email?.trim()),
    Boolean(settings.account.phone?.trim()),
    Boolean(settings.account.preferredContactMethod),

    Boolean(settings.workspace.businessName?.trim()),
    Boolean(settings.workspace.category?.trim()),
    Boolean(settings.workspace.businessLocation?.trim()),
    Boolean(settings.workspace.serviceAreas.length > 0),
    settings.workspace.yearsExperience > 0,
    settings.workspace.teamSize > 0,
    Boolean(settings.workspace.website?.trim()),
    Boolean(settings.workspace.instagram?.trim()),

    Boolean(settings.communications.preferredContactMethod),
    Boolean(settings.availability.workingDays.length > 0),
    Boolean(settings.availability.defaultWorkingStart),
    Boolean(settings.availability.defaultWorkingEnd),
    Boolean(settings.availability.timezone),
    Boolean(settings.privacy.profileSearchable),
  ];

  const completed = checks.filter(Boolean).length;
  const total = checks.length;
  return Math.round((completed / total) * 100);
}

export function calculateSettingsCompletion(
  settings: VendorSettingsData
): number {
  return calculateVendorProfileCompletion(settings);
}

export function getSettingsCompletionMessage(percentage: number): string {
  if (percentage >= 90) {
    return "Your studio profile and preferences are fully optimized for enquiries.";
  }
  if (percentage >= 75) {
    return "Your workspace settings are in great shape. Complete remaining fields to maximize client trust.";
  }
  if (percentage >= 50) {
    return "Basic settings configured. Add social links and fine-tune enquiry controls.";
  }
  return "Complete your studio profile to start receiving qualified client enquiries.";
}

export function formatPreferredContactMethod(method: string): string {
  switch (method.toLowerCase()) {
    case "email":
      return "Email Communication";
    case "phone":
      return "Phone Call";
    case "whatsapp":
      return "WhatsApp Direct";
    default:
      return method;
  }
}

export function formatVisibility(visibility: string): string {
  switch (visibility.toLowerCase()) {
    case "public":
      return "Visible on Wedora Directory";
    case "unlisted":
      return "Unlisted (Direct Link Only)";
    case "private":
      return "Private (Internal Only)";
    default:
      return visibility;
  }
}

export function formatTimezone(tz: string): string {
  if (tz === "Asia/Kolkata") {
    return "Indian Standard Time (IST, GMT+5:30)";
  }
  return tz;
}

export function formatWorkingDays(days: string[]): string {
  if (days.length === 7) return "Everyday (7 days / week)";
  if (days.length === 6 && !days.includes("Sunday"))
    return "Mon – Sat (6 days / week)";
  if (days.length === 5 && !days.includes("Saturday") && !days.includes("Sunday"))
    return "Mon – Fri (5 days / week)";
  return `${days.length} days / week (${days.slice(0, 3).join(", ")}${
    days.length > 3 ? "..." : ""
  })`;
}

export function formatBusinessCategory(cat: string): string {
  return cat.trim();
}
