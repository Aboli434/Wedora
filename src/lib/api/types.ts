import { UserRole, CategoryType } from '@prisma/client';

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
