import { apiClient } from './client';
import {
  CurrentUserResponse,
  WeddingResponse,
  WeddingEventResponse,
  GuestResponse,
  ChecklistTaskResponse,
  BudgetResponse,
  BudgetSummaryResponse,
  ExpenseResponse,
  VendorEnquiryResponse,
  EnquiryMessageResponse,
  BookingResponse,
  BookingServiceResponse,
  BookingEventResponse,
  PaymentResponse,
  PaymentTransactionResponse,
  ReviewResponse,
  NotificationResponse,
  NotificationSummaryResponse,
  ActivityLogResponse,
  PublicVendorProfileResponse,
  PublicVendorServiceResponse,
  PublicVendorPortfolioItemResponse,
  PublicMediaAssetResponse,
  PublicVendorAvailabilityResponse,
  PublicReviewResponse,
  ApiPaginatedResponse,
  VendorServiceResponse,
  VendorPortfolioItemResponse,
  MediaAssetResponse,
  VendorAvailabilityResponse,
} from './types';

// ==========================================
// 1. AUTHENTICATION & USER ENDPOINTS
// ==========================================
export async function getCurrentUserApi(): Promise<CurrentUserResponse> {
  return apiClient.get<CurrentUserResponse>('/api/v1/me');
}

// ==========================================
// 2. CLIENT WEDDINGS ENDPOINTS
// ==========================================
export async function getWeddingsApi(): Promise<WeddingResponse[]> {
  return apiClient.get<WeddingResponse[]>('/api/v1/weddings');
}

export async function createWeddingApi(data: {
  partner1Name: string;
  partner2Name: string;
  weddingDate: string;
  location: string;
  totalBudget: string;
  title?: string;
}): Promise<WeddingResponse> {
  return apiClient.post<WeddingResponse>('/api/v1/weddings', data);
}

export async function getWeddingApi(id: string): Promise<WeddingResponse> {
  return apiClient.get<WeddingResponse>(`/api/v1/weddings/${id}`);
}

export async function updateWeddingApi(
  id: string,
  data: Partial<{
    partner1Name: string;
    partner2Name: string;
    title: string;
    weddingDate: string;
    location: string;
    totalBudget: string;
    status: string;
  }>
): Promise<WeddingResponse> {
  return apiClient.patch<WeddingResponse>(`/api/v1/weddings/${id}`, data);
}

// ==========================================
// 3. WEDDING EVENTS ENDPOINTS
// ==========================================
export async function getWeddingEventsApi(weddingId: string): Promise<WeddingEventResponse[]> {
  return apiClient.get<WeddingEventResponse[]>(`/api/v1/weddings/${weddingId}/events`);
}

export async function createWeddingEventApi(
  weddingId: string,
  data: {
    name: string;
    date: string;
    startTime?: string;
    endTime?: string;
    venue?: string;
    address?: string;
    notes?: string;
  }
): Promise<WeddingEventResponse> {
  return apiClient.post<WeddingEventResponse>(`/api/v1/weddings/${weddingId}/events`, data);
}

// ==========================================
// 4. GUESTS ENDPOINTS
// ==========================================
export async function getGuestsApi(weddingId: string): Promise<GuestResponse[]> {
  return apiClient.get<GuestResponse[]>(`/api/v1/weddings/${weddingId}/guests`);
}

export async function createGuestApi(
  weddingId: string,
  data: {
    name: string;
    email?: string;
    phone?: string;
    rsvpStatus?: string;
    plusOne?: boolean;
    plusOneName?: string;
    dietaryRestrictions?: string;
    group?: string;
    tableNumber?: string;
  }
): Promise<GuestResponse> {
  return apiClient.post<GuestResponse>(`/api/v1/weddings/${weddingId}/guests`, data);
}

export async function updateGuestApi(
  weddingId: string,
  guestId: string,
  data: Partial<{
    name: string;
    email: string;
    phone: string;
    rsvpStatus: string;
    plusOne: boolean;
    plusOneName: string;
    dietaryRestrictions: string;
    group: string;
    tableNumber: string;
  }>
): Promise<GuestResponse> {
  return apiClient.patch<GuestResponse>(`/api/v1/weddings/${weddingId}/guests/${guestId}`, data);
}

// ==========================================
// 5. CHECKLIST ENDPOINTS
// ==========================================
export async function getChecklistTasksApi(weddingId: string): Promise<ChecklistTaskResponse[]> {
  return apiClient.get<ChecklistTaskResponse[]>(`/api/v1/weddings/${weddingId}/checklist`);
}

export async function createChecklistTaskApi(
  weddingId: string,
  data: {
    title: string;
    category: string;
    dueDate?: string;
    priority?: string;
    notes?: string;
  }
): Promise<ChecklistTaskResponse> {
  return apiClient.post<ChecklistTaskResponse>(`/api/v1/weddings/${weddingId}/checklist`, data);
}

export async function updateChecklistTaskApi(
  weddingId: string,
  taskId: string,
  data: Partial<{
    title: string;
    category: string;
    dueDate: string;
    priority: string;
    status: string;
    notes: string;
  }>
): Promise<ChecklistTaskResponse> {
  return apiClient.patch<ChecklistTaskResponse>(`/api/v1/weddings/${weddingId}/checklist/${taskId}`, data);
}

// ==========================================
// 6. BUDGET & EXPENSES ENDPOINTS
// ==========================================
export async function getBudgetSummaryApi(weddingId: string): Promise<{
  budgets: BudgetResponse[];
  summary: BudgetSummaryResponse;
}> {
  return apiClient.get<{ budgets: BudgetResponse[]; summary: BudgetSummaryResponse }>(
    `/api/v1/weddings/${weddingId}/budget`
  );
}

export async function getExpensesApi(weddingId: string): Promise<ExpenseResponse[]> {
  return apiClient.get<ExpenseResponse[]>(`/api/v1/weddings/${weddingId}/budget/expenses`);
}

export async function createExpenseApi(
  weddingId: string,
  data: {
    vendorName: string;
    category: string;
    amount: string;
    paidAmount?: string;
    paymentDueDate?: string;
    status?: string;
    notes?: string;
  }
): Promise<ExpenseResponse> {
  return apiClient.post<ExpenseResponse>(`/api/v1/weddings/${weddingId}/budget/expenses`, data);
}

export async function updateExpenseApi(
  weddingId: string,
  expenseId: string,
  data: Partial<{
    vendorName: string;
    category: string;
    amount: string;
    paidAmount: string;
    paymentDueDate: string;
    status: string;
    notes: string;
  }>
): Promise<ExpenseResponse> {
  return apiClient.patch<ExpenseResponse>(`/api/v1/weddings/${weddingId}/budget/expenses/${expenseId}`, data);
}

// ==========================================
// 7. CLIENT ENQUIRIES & MESSAGES
// ==========================================
export async function getClientEnquiriesApi(weddingId: string): Promise<VendorEnquiryResponse[]> {
  return apiClient.get<VendorEnquiryResponse[]>(`/api/v1/weddings/${weddingId}/enquiries`);
}

export async function createEnquiryApi(
  weddingId: string,
  data: {
    vendorId: string;
    eventDate: string;
    message: string;
    guestCount?: number;
    estimatedBudget?: string;
  }
): Promise<VendorEnquiryResponse> {
  return apiClient.post<VendorEnquiryResponse>(`/api/v1/weddings/${weddingId}/enquiries`, data);
}

export async function getEnquiryDetailsApi(
  weddingId: string,
  enquiryId: string
): Promise<{ enquiry: VendorEnquiryResponse; messages: EnquiryMessageResponse[] }> {
  return apiClient.get<{ enquiry: VendorEnquiryResponse; messages: EnquiryMessageResponse[] }>(
    `/api/v1/weddings/${weddingId}/enquiries/${enquiryId}`
  );
}

export async function sendEnquiryMessageApi(
  enquiryId: string,
  message: string
): Promise<EnquiryMessageResponse> {
  return apiClient.post<EnquiryMessageResponse>(`/api/v1/enquiries/${enquiryId}/messages`, { message });
}

export async function convertEnquiryToBookingApi(
  weddingId: string,
  enquiryId: string,
  data: {
    totalAmount: string;
    advanceAmount?: string;
    notes?: string;
  }
): Promise<{ booking: BookingResponse; enquiry: VendorEnquiryResponse }> {
  return apiClient.post<{ booking: BookingResponse; enquiry: VendorEnquiryResponse }>(
    `/api/v1/weddings/${weddingId}/enquiries/${enquiryId}/convert`,
    data
  );
}

// ==========================================
// 8. CLIENT BOOKINGS
// ==========================================
export async function getClientBookingsApi(weddingId: string): Promise<BookingResponse[]> {
  return apiClient.get<BookingResponse[]>(`/api/v1/weddings/${weddingId}/bookings`);
}

export async function getClientBookingApi(weddingId: string, bookingId: string): Promise<BookingResponse> {
  return apiClient.get<BookingResponse>(`/api/v1/weddings/${weddingId}/bookings/${bookingId}`);
}

export async function addBookingServiceApi(
  weddingId: string,
  bookingId: string,
  data: {
    serviceName: string;
    unitPrice: string;
    quantity?: number;
    vendorServiceId?: string;
  }
): Promise<BookingServiceResponse> {
  return apiClient.post<BookingServiceResponse>(
    `/api/v1/weddings/${weddingId}/bookings/${bookingId}/services`,
    data
  );
}

export async function addBookingEventApi(
  weddingId: string,
  bookingId: string,
  data: {
    eventName: string;
    eventDate: string;
    startTime?: string;
    endTime?: string;
    venue?: string;
    weddingEventId?: string;
  }
): Promise<BookingEventResponse> {
  return apiClient.post<BookingEventResponse>(
    `/api/v1/weddings/${weddingId}/bookings/${bookingId}/events`,
    data
  );
}

// ==========================================
// 9. CLIENT PAYMENTS & TRANSACTIONS
// ==========================================
export async function getBookingPaymentsApi(weddingId: string, bookingId: string): Promise<PaymentResponse[]> {
  return apiClient.get<PaymentResponse[]>(`/api/v1/weddings/${weddingId}/bookings/${bookingId}/payments`);
}

export async function createPaymentMilestoneApi(
  weddingId: string,
  bookingId: string,
  data: {
    amount: string;
    dueDate: string;
    milestoneTitle?: string;
  }
): Promise<PaymentResponse> {
  return apiClient.post<PaymentResponse>(
    `/api/v1/weddings/${weddingId}/bookings/${bookingId}/payments`,
    data
  );
}

export async function recordPaymentTransactionApi(
  weddingId: string,
  bookingId: string,
  paymentId: string,
  data: {
    amount: string;
    paymentMethod: string;
    transactionRef?: string;
    notes?: string;
  }
): Promise<{ transaction: PaymentTransactionResponse; payment: PaymentResponse; booking: BookingResponse }> {
  return apiClient.post<{
    transaction: PaymentTransactionResponse;
    payment: PaymentResponse;
    booking: BookingResponse;
  }>(`/api/v1/weddings/${weddingId}/bookings/${bookingId}/payments/${paymentId}/transactions`, data);
}

// ==========================================
// 10. CLIENT REVIEWS
// ==========================================
export async function postReviewApi(
  weddingId: string,
  bookingId: string,
  data: {
    rating: number;
    comment: string;
    title?: string;
  }
): Promise<ReviewResponse> {
  return apiClient.post<ReviewResponse>(
    `/api/v1/weddings/${weddingId}/bookings/${bookingId}/review`,
    data
  );
}

// ==========================================
// 11. VENDOR DASHBOARD ENDPOINTS
// ==========================================
export async function getVendorProfileApi(): Promise<PublicVendorProfileResponse> {
  return apiClient.get<PublicVendorProfileResponse>('/api/v1/vendor/profile');
}

export async function updateVendorProfileApi(
  data: Partial<{
    businessName: string;
    city: string;
    startingPrice: string;
    coverImage: string;
    description: string;
    experienceYears: number;
    teamSize: string;
  }>
): Promise<PublicVendorProfileResponse> {
  return apiClient.patch<PublicVendorProfileResponse>('/api/v1/vendor/profile', data);
}

export async function getVendorServicesApi(): Promise<VendorServiceResponse[]> {
  return apiClient.get<VendorServiceResponse[]>('/api/v1/vendor/services');
}

export async function createVendorServiceApi(data: {
  name: string;
  price: string;
  description?: string;
  pricingType?: string;
  isCustomizable?: boolean;
}): Promise<VendorServiceResponse> {
  return apiClient.post<VendorServiceResponse>('/api/v1/vendor/services', data);
}

export async function getVendorPortfolioApi(): Promise<VendorPortfolioItemResponse[]> {
  return apiClient.get<VendorPortfolioItemResponse[]>('/api/v1/vendor/portfolio');
}

export async function getVendorMediaApi(): Promise<MediaAssetResponse[]> {
  return apiClient.get<MediaAssetResponse[]>('/api/v1/vendor/media');
}

export async function getVendorAvailabilityApi(): Promise<VendorAvailabilityResponse[]> {
  return apiClient.get<VendorAvailabilityResponse[]>('/api/v1/vendor/availability');
}

export async function getVendorEnquiriesApi(): Promise<VendorEnquiryResponse[]> {
  return apiClient.get<VendorEnquiryResponse[]>('/api/v1/vendor/enquiries');
}

export async function getVendorEnquiryDetailsApi(
  enquiryId: string
): Promise<{ enquiry: VendorEnquiryResponse; messages: EnquiryMessageResponse[] }> {
  return apiClient.get<{ enquiry: VendorEnquiryResponse; messages: EnquiryMessageResponse[] }>(
    `/api/v1/vendor/enquiries/${enquiryId}`
  );
}

export async function updateVendorEnquiryStatusApi(
  enquiryId: string,
  status: string
): Promise<VendorEnquiryResponse> {
  return apiClient.patch<VendorEnquiryResponse>(`/api/v1/vendor/enquiries/${enquiryId}`, { status });
}

export async function getVendorBookingsApi(): Promise<BookingResponse[]> {
  return apiClient.get<BookingResponse[]>('/api/v1/vendor/bookings');
}

export async function getVendorBookingDetailsApi(bookingId: string): Promise<BookingResponse> {
  return apiClient.get<BookingResponse>(`/api/v1/vendor/bookings/${bookingId}`);
}

export async function updateVendorBookingStatusApi(
  bookingId: string,
  status: string,
  notes?: string
): Promise<BookingResponse> {
  return apiClient.patch<BookingResponse>(`/api/v1/vendor/bookings/${bookingId}`, { status, notes });
}

export async function getVendorReviewsApi(): Promise<ReviewResponse[]> {
  return apiClient.get<ReviewResponse[]>('/api/v1/vendor/reviews');
}

// ==========================================
// 12. NOTIFICATIONS & ACTIVITY
// ==========================================
export async function getNotificationsApi(page = 1, pageSize = 20): Promise<NotificationSummaryResponse> {
  return apiClient.get<NotificationSummaryResponse>(`/api/v1/notifications?page=${page}&pageSize=${pageSize}`);
}

export async function markNotificationReadApi(notificationId: string): Promise<NotificationResponse> {
  return apiClient.patch<NotificationResponse>(`/api/v1/notifications/${notificationId}`);
}

export async function markAllNotificationsReadApi(): Promise<{ count: number }> {
  return apiClient.patch<{ count: number }>('/api/v1/notifications/read-all');
}

export async function getActivityLogsApi(page = 1, pageSize = 20): Promise<ApiPaginatedResponse<ActivityLogResponse>> {
  return apiClient.get<ApiPaginatedResponse<ActivityLogResponse>>(`/api/v1/activity?page=${page}&pageSize=${pageSize}`);
}

// ==========================================
// 13. PUBLIC VENDOR DIRECTORY
// ==========================================
export async function getPublicVendorsApi(params?: {
  city?: string;
  category?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<ApiPaginatedResponse<PublicVendorProfileResponse>> {
  const query = new URLSearchParams();
  if (params?.city) query.append('city', params.city);
  if (params?.category) query.append('category', params.category);
  if (params?.search) query.append('search', params.search);
  if (params?.page) query.append('page', String(params.page));
  if (params?.pageSize) query.append('pageSize', String(params.pageSize));

  const queryString = query.toString() ? `?${query.toString()}` : '';
  return apiClient.get<ApiPaginatedResponse<PublicVendorProfileResponse>>(`/api/v1/vendors${queryString}`);
}

export async function getPublicVendorBySlugApi(slug: string): Promise<PublicVendorProfileResponse> {
  return apiClient.get<PublicVendorProfileResponse>(`/api/v1/vendors/${slug}`);
}

export async function getPublicVendorServicesApi(slug: string): Promise<PublicVendorServiceResponse[]> {
  return apiClient.get<PublicVendorServiceResponse[]>(`/api/v1/vendors/${slug}/services`);
}

export async function getPublicVendorPortfolioApi(slug: string): Promise<PublicVendorPortfolioItemResponse[]> {
  return apiClient.get<PublicVendorPortfolioItemResponse[]>(`/api/v1/vendors/${slug}/portfolio`);
}

export async function getPublicVendorMediaApi(slug: string): Promise<PublicMediaAssetResponse[]> {
  return apiClient.get<PublicMediaAssetResponse[]>(`/api/v1/vendors/${slug}/media`);
}

export async function getPublicVendorAvailabilityApi(slug: string): Promise<PublicVendorAvailabilityResponse[]> {
  return apiClient.get<PublicVendorAvailabilityResponse[]>(`/api/v1/vendors/${slug}/availability`);
}

export async function getPublicVendorReviewsApi(slug: string): Promise<PublicReviewResponse[]> {
  return apiClient.get<PublicReviewResponse[]>(`/api/v1/vendors/${slug}/reviews`);
}
