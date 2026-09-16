export type UserRole = "CLIENT" | "VENDOR";

export interface LoginValues {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface ClientRegistrationValues {
  name: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  weddingDate: string;
  isDateUndecided: boolean;
  destination: string;
  guestCount: string;
  terms: boolean;
}

export interface VendorRegistrationValues {
  businessName: string;
  contactPerson: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  category: string;
  location: string;
  description: string;
  terms: boolean;
}

export const CLIENT_DESTINATIONS = [
  "Select destination",
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

export const CLIENT_GUEST_RANGES = [
  "Select guest count",
  "Under 50",
  "50–100",
  "100–200",
  "200–400",
  "400+",
  "Not decided",
];

export const VENDOR_CATEGORIES = [
  "Select category",
  "Wedding Planning",
  "Photography",
  "Decor & Design",
  "Venue",
  "Catering",
  "Music & Entertainment",
  "Makeup & Hair",
  "Bridal & Couture",
  "Other",
];

export const VENDOR_LOCATIONS = [
  "Select location",
  "Pune",
  "Mumbai",
  "Delhi",
  "Jaipur",
  "Udaipur",
  "Goa",
  "Hyderabad",
  "Bengaluru",
  "Other",
];

export const DEFAULT_LOGIN_VALUES: LoginValues = {
  email: "",
  password: "",
  rememberMe: false,
};

export const DEFAULT_CLIENT_REGISTRATION_VALUES: ClientRegistrationValues = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  weddingDate: "",
  isDateUndecided: false,
  destination: "Select destination",
  guestCount: "Select guest count",
  terms: false,
};

export const DEFAULT_VENDOR_REGISTRATION_VALUES: VendorRegistrationValues = {
  businessName: "",
  contactPerson: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  category: "Select category",
  location: "Select location",
  description: "",
  terms: false,
};
