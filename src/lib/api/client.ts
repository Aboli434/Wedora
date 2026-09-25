import { ApiErrorResponse, ApiSuccessResponse } from './types';

export class ApiError extends Error {
  status: number;
  code: string;
  details?: unknown;

  constructor(status: number, message: string, code = 'API_ERROR', details?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

interface RequestOptions extends Omit<RequestInit, 'body'> {
  body?: unknown;
}

async function request<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const { body, headers: customHeaders, ...restOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(customHeaders as Record<string, string>),
  };

  const config: RequestInit = {
    ...restOptions,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, config);
    let data: unknown;

    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
    }

    if (!response.ok) {
      const errorData = data as ApiErrorResponse | undefined;
      const errorMessage =
        errorData?.error?.message ||
        (typeof data === 'string' && data ? data : response.statusText) ||
        `Request failed with status ${response.status}`;
      const errorCode = errorData?.error?.code || `HTTP_${response.status}`;
      const errorDetails = errorData?.error?.details;

      throw new ApiError(response.status, errorMessage, errorCode, errorDetails);
    }

    const successData = data as ApiSuccessResponse<T>;
    if (successData && typeof successData === 'object' && 'success' in successData && successData.success) {
      return successData.data;
    }

    return data as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, error instanceof Error ? error.message : 'An unexpected network error occurred');
  }
}

export const apiClient = {
  get<T>(url: string, options?: RequestOptions): Promise<T> {
    return request<T>(url, { ...options, method: 'GET' });
  },

  post<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(url, { ...options, method: 'POST', body });
  },

  patch<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(url, { ...options, method: 'PATCH', body });
  },

  put<T>(url: string, body?: unknown, options?: RequestOptions): Promise<T> {
    return request<T>(url, { ...options, method: 'PUT', body });
  },

  delete<T>(url: string, options?: RequestOptions): Promise<T> {
    return request<T>(url, { ...options, method: 'DELETE' });
  },
};
