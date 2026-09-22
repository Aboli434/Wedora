import { UserRole, CategoryType, AttendanceStatus, TaskPriority, TaskStatus, PaymentStatus, ServicePricingType, PortfolioMediaType, EnquiryStatus, BookingStatus, PaymentMethod, TransactionType, ReviewStatus } from '@prisma/client';


export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

export interface ClientProfileResponse {
  id: string;
  location: string | null;
  phone: string | null;
  budgetRange: string | null;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface VendorProfileResponse {
  id: string;
  businessName: string;
  slug: string;
  category: CategoryType;
  rating: number;
  reviewCount: number;
  city: string;
  startingPrice: string;
  coverImage: string | null;
  description: string | null;
  experienceYears: number | null;
  teamSize: string | null;
  verified: boolean;
  featured: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type PublicVendorProfileResponse = VendorProfileResponse;

export interface CurrentUserResponse {
  id: string;
  email: string;
  role: UserRole;
  fullName: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  profile: ClientProfileResponse | VendorProfileResponse | null;
}

export interface WeddingResponse {
  id: string;
  partner1Name: string;
  partner2Name: string;
  title: string;
  weddingDate: string;
  location: string;
  totalBudget: string;
  totalSpent: string;
  status: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface WeddingEventResponse {
  id: string;
  weddingId: string;
  name: string;
  date: string;
  startTime: string | null;
  endTime: string | null;
  timezone: string;
  venue: string | null;
  address: string | null;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface GuestResponse {
  id: string;
  weddingId: string;
  name: string;
  email: string | null;
  phone: string | null;
  rsvpStatus: AttendanceStatus;
  plusOne: boolean;
  plusOneName: string | null;
  dietaryRestrictions: string | null;
  group: string | null;
  tableNumber: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface ChecklistTaskResponse {
  id: string;
  weddingId: string;
  title: string;
  category: string;
  dueDate: string | null;
  priority: TaskPriority;
  status: TaskStatus;
  assignedTo: string | null;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BudgetResponse {
  id: string;
  weddingId: string;
  category: CategoryType;
  allocatedAmount: string;
  spentAmount: string;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface BudgetSummaryResponse {
  totalAllocated: string;
  totalSpent: string;
  totalExpensesAmount: string;
  totalPaidAmount: string;
  remainingBudget: string;
}

export interface ExpenseResponse {
  id: string;
  weddingId: string;
  budgetId: string | null;
  vendorName: string;
  category: CategoryType;
  amount: string;
  paidAmount: string;
  paymentDueDate: string | null;
  status: PaymentStatus;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface PaginationMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface ApiPaginatedResponse<T> {
  success: true;
  data: T[];
  meta: PaginationMeta;
}

export interface VendorServiceResponse {
  id: string;
  vendorId: string;
  name: string;
  description: string | null;
  pricingType: ServicePricingType;
  price: string;
  isCustomizable: boolean;
  features: unknown | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type PublicVendorServiceResponse = VendorServiceResponse;

export interface VendorPortfolioItemResponse {
  id: string;
  vendorId: string;
  title: string;
  description: string | null;
  coverUrl: string;
  images: unknown | null;
  tags: unknown | null;
  eventDate: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type PublicVendorPortfolioItemResponse = VendorPortfolioItemResponse;

export interface MediaAssetResponse {
  id: string;
  vendorId: string;
  url: string;
  type: PortfolioMediaType;
  caption: string | null;
  sortOrder: number;
  createdAt: string | Date;
}

export type PublicMediaAssetResponse = MediaAssetResponse;

export interface VendorAvailabilityResponse {
  id: string;
  vendorId: string;
  date: string;
  isAvailable: boolean;
  notes: string | null;
  createdAt: string | Date;
}

export type PublicVendorAvailabilityResponse = VendorAvailabilityResponse;

export interface VendorEnquiryResponse {
  id: string;
  referenceCode: string;
  weddingId: string;
  vendorId: string;
  eventDate: string;
  guestCount: number | null;
  estimatedBudget: string | null;
  status: EnquiryStatus;
  message: string;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface EnquiryMessageResponse {
  id: string;
  enquiryId: string;
  senderId: string;
  message: string;
  sentAt: string | Date;
}

export interface BookingServiceResponse {
  id: string;
  bookingId: string;
  vendorServiceId: string | null;
  serviceName: string;
  unitPrice: string;
  quantity: number;
  totalPrice: string;
  createdAt: string | Date;
}

export interface BookingEventResponse {
  id: string;
  bookingId: string;
  weddingEventId: string | null;
  eventName: string;
  eventDate: string;
  startTime: string | null;
  endTime: string | null;
  venue: string | null;
  createdAt: string | Date;
}

export interface BookingResponse {
  id: string;
  referenceCode: string;
  weddingId: string;
  vendorId: string;
  weddingVendorId: string | null;
  enquiryId: string | null;
  status: BookingStatus;
  totalAmount: string;
  advanceAmount: string;
  paidAmount: string;
  notes: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  services?: BookingServiceResponse[];
  events?: BookingEventResponse[];
}

export interface PaymentTransactionResponse {
  id: string;
  paymentId: string;
  transactionRef: string;
  amount: string;
  paymentMethod: PaymentMethod;
  type: TransactionType;
  gatewayProvider: string | null;
  gatewayTransactionId: string | null;
  notes: string | null;
  transactedAt: string | Date;
}

export interface PaymentResponse {
  id: string;
  bookingId: string;
  invoiceId: string | null;
  amount: string;
  dueDate: string;
  status: PaymentStatus;
  milestoneTitle: string | null;
  createdAt: string | Date;
  updatedAt: string | Date;
  transactions?: PaymentTransactionResponse[];
}

export interface ReviewAuthorSummary {
  id: string;
  fullName: string;
  avatarUrl: string | null;
}

export interface ReviewResponse {
  id: string;
  bookingId: string;
  vendorId: string;
  authorId: string;
  rating: number;
  title: string | null;
  comment: string;
  status: ReviewStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
  author?: ReviewAuthorSummary;
}

export type PublicReviewResponse = ReviewResponse;


