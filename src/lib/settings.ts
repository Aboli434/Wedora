import {
  ClientProfile,
  WeddingPreferences,
  NotificationPreferences,
  CommunicationPreferences,
  PrivacyPreferences,
  PreferredContactMethod,
} from "@/data/settings";

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateClientProfile(profile: ClientProfile): ValidationResult {
  const errors: Record<string, string> = {};

  if (!profile.firstName || profile.firstName.trim() === "") {
    errors.firstName = "First name is required.";
  }

  if (!profile.lastName || profile.lastName.trim() === "") {
    errors.lastName = "Last name is required.";
  }

  if (
    !profile.email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email.trim())
  ) {
    errors.email = "Please enter a valid email address.";
  }

  if (!profile.phone || profile.phone.trim().length < 8) {
    errors.phone = "Please enter a valid phone number.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function validateWeddingPreferences(
  preferences: WeddingPreferences
): ValidationResult {
  const errors: Record<string, string> = {};

  if (preferences.guestTarget === undefined || preferences.guestTarget < 0) {
    errors.guestTarget = "Guest target must be a positive number.";
  }

  if (!preferences.destination || preferences.destination.trim() === "") {
    errors.destination = "Destination is required.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function getEnabledNotificationCount(
  notifications: NotificationPreferences
): number {
  return Object.values(notifications).filter(Boolean).length;
}

export function getEnabledCommunicationCount(
  communications: CommunicationPreferences
): number {
  const { emailUpdates, whatsappUpdates, phoneUpdates } = communications;
  return [emailUpdates, whatsappUpdates, phoneUpdates].filter(Boolean).length;
}

export function calculateProfileCompletion(
  profile: ClientProfile,
  weddingPrefs: WeddingPreferences,
  notifications: NotificationPreferences,
  communications: CommunicationPreferences,
  privacy: PrivacyPreferences
): number {
  let fieldsCount = 0;
  let completedCount = 0;

  // Profile fields (4)
  fieldsCount += 4;
  if (profile.firstName.trim()) completedCount++;
  if (profile.lastName.trim()) completedCount++;
  if (profile.email.trim()) completedCount++;
  if (profile.phone.trim()) completedCount++;

  // Wedding Prefs fields (4)
  fieldsCount += 4;
  if (weddingPrefs.weddingStyle) completedCount++;
  if (weddingPrefs.destination.trim()) completedCount++;
  if (weddingPrefs.guestTarget > 0) completedCount++;
  if (weddingPrefs.numberOfEvents) completedCount++;

  // Notification setup (1)
  fieldsCount += 1;
  if (getEnabledNotificationCount(notifications) > 0) completedCount++;

  // Communication setup (1)
  fieldsCount += 1;
  if (communications.preferredContactMethod) completedCount++;

  // Privacy setup (1)
  fieldsCount += 1;
  if (privacy.profileVisibility) completedCount++;

  return Math.round((completedCount / fieldsCount) * 100);
}

export function formatContactMethod(method: PreferredContactMethod): string {
  switch (method) {
    case "WhatsApp":
      return "WhatsApp Message";
    case "Email":
      return "Email Update";
    case "Phone":
      return "Phone Call";
    default:
      return method;
  }
}

export function formatVisibility(visibility: string): string {
  return visibility;
}
