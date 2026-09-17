export interface ClientProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatarInitials: string;
}

export type WeddingStyle =
  | "Intimate"
  | "Classic"
  | "Grand"
  | "Editorial"
  | "Traditional"
  | "Modern";

export interface WeddingPreferences {
  weddingStyle: WeddingStyle;
  destination: string;
  guestTarget: number;
  numberOfEvents: string; // "1" | "2" | "3" | "4+"
  planningVisibility: "Private" | "Shared with Wedora team";
}

export interface NotificationPreferences {
  planningReminders: boolean;
  upcomingEventReminders: boolean;
  guestUpdates: boolean;
  vendorUpdates: boolean;
  budgetAlerts: boolean;
  checklistReminders: boolean;
}

export type PreferredContactMethod = "Email" | "Phone" | "WhatsApp";

export interface CommunicationPreferences {
  preferredContactMethod: PreferredContactMethod;
  emailUpdates: boolean;
  whatsappUpdates: boolean;
  phoneUpdates: boolean;
}

export interface PrivacyPreferences {
  profileVisibility: "Private" | "Wedora team only";
  vendorContactVisibility: "Only when needed" | "Always visible to booked vendors";
  analyticsConsent: boolean;
}

export interface FullSettingsData {
  profile: ClientProfile;
  weddingPreferences: WeddingPreferences;
  notificationPreferences: NotificationPreferences;
  communicationPreferences: CommunicationPreferences;
  privacyPreferences: PrivacyPreferences;
}

export const MOCK_SETTINGS_DATA: FullSettingsData = {
  profile: {
    firstName: "Aditi",
    lastName: "Sharma",
    email: "aditi.sharma@demo-wedora.com",
    phone: "+91 98000 12345",
    avatarInitials: "AS",
  },
  weddingPreferences: {
    weddingStyle: "Editorial",
    destination: "Udaipur",
    guestTarget: 150,
    numberOfEvents: "4+",
    planningVisibility: "Shared with Wedora team",
  },
  notificationPreferences: {
    planningReminders: true,
    upcomingEventReminders: true,
    guestUpdates: true,
    vendorUpdates: true,
    budgetAlerts: false,
    checklistReminders: true,
  },
  communicationPreferences: {
    preferredContactMethod: "WhatsApp",
    emailUpdates: true,
    whatsappUpdates: true,
    phoneUpdates: false,
  },
  privacyPreferences: {
    profileVisibility: "Wedora team only",
    vendorContactVisibility: "Only when needed",
    analyticsConsent: true,
  },
};
