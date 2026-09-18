export interface VendorAccountProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  preferredContactMethod: "email" | "phone" | "whatsapp";
  profileInitials: string;
  role: string;
  accountCreatedAt: string;
  lastLoginAt: string;
}

export interface VendorWorkspaceSettings {
  businessName: string;
  category: string;
  businessLocation: string;
  serviceAreas: string[];
  yearsExperience: number;
  teamSize: number;
  website?: string;
  instagram?: string;
  publicProfileVisibility: "public" | "unlisted" | "private";
  allowPublicEnquiries: boolean;
  showStartingPrice: boolean;
  showServiceAreas: boolean;
  showPortfolio: boolean;
  showReviews: boolean;
}

export interface VendorNotificationPreferences {
  newEnquiry: boolean;
  enquiryReminder: boolean;
  bookingCreated: boolean;
  bookingReminder: boolean;
  paymentDue: boolean;
  paymentReceived: boolean;
  reviewReceived: boolean;
  reviewResponseReminder: boolean;
  calendarReminder: boolean;
  profileIncomplete: boolean;
}

export interface VendorCommunicationPreferences {
  preferredContactMethod: "email" | "phone" | "whatsapp";
  allowEmail: boolean;
  allowPhone: boolean;
  allowWhatsApp: boolean;
  allowSMS: boolean;
  marketingUpdates: boolean;
}

export interface VendorEnquiryPreferences {
  acceptNewEnquiries: boolean;
  autoAcknowledgeEnquiries: boolean;
  responseReminderHours: number;
  weekendEnquiries: boolean;
  minimumLeadTimeDays: number;
  preferredEventTypes: string[];
}

export interface VendorBookingPreferences {
  acceptNewBookings: boolean;
  requireBookingConfirmation: boolean;
  requireAdvancePayment: boolean;
  defaultAdvancePercentage: number;
  allowDateFlexibility: boolean;
  allowAddOns: boolean;
}

export interface VendorAvailabilityPreferences {
  defaultWorkingStart: string;
  defaultWorkingEnd: string;
  workingDays: string[];
  bufferBeforeEventHours: number;
  bufferAfterEventHours: number;
  maxEventsPerDay: number;
  timezone: string;
}

export interface VendorPrivacyPreferences {
  profileSearchable: boolean;
  showBusinessEmail: boolean;
  showBusinessPhone: boolean;
  showLocation: boolean;
  showTeamInformation: boolean;
  allowProfileAnalytics: boolean;
}

export interface VendorActiveSession {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

export interface VendorSecurityInfo {
  passwordLastChangedAt: string;
  activeSessions: VendorActiveSession[];
  twoFactorEnabled: boolean;
  loginAlertsEnabled: boolean;
}

export interface VendorSettingsData {
  account: VendorAccountProfile;
  workspace: VendorWorkspaceSettings;
  notifications: VendorNotificationPreferences;
  communications: VendorCommunicationPreferences;
  enquiries: VendorEnquiryPreferences;
  bookings: VendorBookingPreferences;
  availability: VendorAvailabilityPreferences;
  privacy: VendorPrivacyPreferences;
  security: VendorSecurityInfo;
}

export const initialVendorSettingsData: VendorSettingsData = {
  account: {
    firstName: "Riya",
    lastName: "Mehta",
    email: "riya@framehouse.example",
    phone: "+91 98200 12345",
    alternatePhone: "+91 98200 54321",
    preferredContactMethod: "email",
    profileInitials: "RM",
    role: "Studio Founder & Lead Photographer",
    accountCreatedAt: "October 14, 2023",
    lastLoginAt: "Today, 10:15 AM",
  },
  workspace: {
    businessName: "The Frame House",
    category: "Photography & Cinematography",
    businessLocation: "Mumbai, Maharashtra, India",
    serviceAreas: ["Mumbai", "Goa", "Udaipur", "Jaipur", "Destination Weddings Worldwide"],
    yearsExperience: 8,
    teamSize: 6,
    website: "https://theframehouse.example.com",
    instagram: "@theframehouse_weddings",
    publicProfileVisibility: "public",
    allowPublicEnquiries: true,
    showStartingPrice: true,
    showServiceAreas: true,
    showPortfolio: true,
    showReviews: true,
  },
  notifications: {
    newEnquiry: true,
    enquiryReminder: true,
    bookingCreated: true,
    bookingReminder: true,
    paymentDue: true,
    paymentReceived: true,
    reviewReceived: true,
    reviewResponseReminder: true,
    calendarReminder: true,
    profileIncomplete: false,
  },
  communications: {
    preferredContactMethod: "email",
    allowEmail: true,
    allowPhone: true,
    allowWhatsApp: true,
    allowSMS: false,
    marketingUpdates: false,
  },
  enquiries: {
    acceptNewEnquiries: true,
    autoAcknowledgeEnquiries: true,
    responseReminderHours: 12,
    weekendEnquiries: true,
    minimumLeadTimeDays: 7,
    preferredEventTypes: [
      "Wedding Ceremony",
      "Reception",
      "Sangeet",
      "Mehendi",
      "Haldi",
      "Engagement",
    ],
  },
  bookings: {
    acceptNewBookings: true,
    requireBookingConfirmation: true,
    requireAdvancePayment: true,
    defaultAdvancePercentage: 40,
    allowDateFlexibility: true,
    allowAddOns: true,
  },
  availability: {
    defaultWorkingStart: "09:00",
    defaultWorkingEnd: "19:00",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    bufferBeforeEventHours: 2,
    bufferAfterEventHours: 2,
    maxEventsPerDay: 2,
    timezone: "Asia/Kolkata",
  },
  privacy: {
    profileSearchable: true,
    showBusinessEmail: true,
    showBusinessPhone: false,
    showLocation: true,
    showTeamInformation: true,
    allowProfileAnalytics: true,
  },
  security: {
    passwordLastChangedAt: "January 2026",
    twoFactorEnabled: false,
    loginAlertsEnabled: true,
    activeSessions: [
      {
        id: "sess-01",
        device: "Chrome on Windows 11",
        location: "Mumbai, India",
        lastActive: "Current session",
        isCurrent: true,
      },
      {
        id: "sess-02",
        device: "Safari on iPhone 15 Pro",
        location: "Mumbai, India",
        lastActive: "2 hours ago",
        isCurrent: false,
      },
    ],
  },
};
