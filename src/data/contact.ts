export type ContactMethod = "Email" | "Phone" | "WhatsApp";

export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  contactMethod: ContactMethod;
  weddingDate: string;
  isDateUndecided: boolean;
  destination: string;
  guestCount: string;
  eventCount: string;
  interests: string[];
  notes: string;
  consent: boolean;
}

export const CONTACT_DESTINATIONS = [
  "Select a destination",
  "Pune",
  "Mumbai",
  "Delhi",
  "Jaipur",
  "Udaipur",
  "Goa",
  "Hyderabad",
  "Bengaluru",
  "Other / Not decided",
];

export const CONTACT_GUEST_RANGES = [
  "Select guest count",
  "Under 50",
  "50–100",
  "100–200",
  "200–400",
  "400+",
  "Not decided",
];

export const CONTACT_EVENT_COUNTS = [
  "Select event count",
  "1",
  "2",
  "3",
  "4+",
  "Not decided",
];

export const CONTACT_METHODS: ContactMethod[] = ["Email", "Phone", "WhatsApp"];

export const CONTACT_SERVICE_INTERESTS = [
  "Full Wedding Planning",
  "Vendor Discovery",
  "Guest & Event Management",
  "Budget & Checklist Management",
  "Venue",
  "Decor & Design",
  "Photography",
  "Catering",
  "Other",
];

export const DEFAULT_CONTACT_FORM_VALUES: ContactFormValues = {
  name: "",
  email: "",
  phone: "",
  contactMethod: "WhatsApp",
  weddingDate: "",
  isDateUndecided: false,
  destination: "Select a destination",
  guestCount: "Select guest count",
  eventCount: "Select event count",
  interests: [],
  notes: "",
  consent: false,
};
