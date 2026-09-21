import { NextResponse } from 'next/server';
import { serializeBigInt } from '@/lib/utils/bigint';
import { AppError } from '@/lib/errors';

export interface ApiResponseSuccess<T> {
  success: true;
  data: T;
  message?: string;
}

export interface ApiResponseError {
  success: false;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
}

/**
 * Creates a standardized HTTP success response with safe BigInt serialization.
 */
export function successResponse<T>(data: T, status = 200, message?: string) {
  const payload: ApiResponseSuccess<T> = {
    success: true,
    data: serializeBigInt(data),
    ...(message ? { message } : {}),
  };
  return NextResponse.json(payload, { status });
}

/**
 * Creates a standardized HTTP error response.
 */
export function errorResponse(
  message: string,
  status = 500,
  code = 'INTERNAL_ERROR',
  details?: unknown
) {
  const payload: ApiResponseError = {
    success: false,
    error: {
      code,
      message,
      ...(details ? { details } : {}),
    },
  };
  return NextResponse.json(payload, { status });
}

/**
 * Handles caught errors in route handlers predictably.
 */
export function handleApiError(error: unknown) {
  if (error instanceof AppError) {
    return errorResponse(error.message, error.statusCode, error.code, error.details);
  }

  // Log unknown internal errors safely on server
  console.error('[API Error]:', error);

  // Return generic internal server error to avoid leaking internal stack traces or credentials
  return errorResponse('An unexpected server error occurred', 500, 'INTERNAL_ERROR');
}

// Convenience helpers
export const apiResponse = {
  success: successResponse,
  error: errorResponse,
  handleError: handleApiError,
  validationError: (details?: unknown, message = 'Validation failed') =>
    errorResponse(message, 422, 'VALIDATION_ERROR', details),
  unauthorized: (message = 'Authentication required') =>
    errorResponse(message, 401, 'UNAUTHORIZED'),
  forbidden: (message = 'Access denied') => errorResponse(message, 403, 'FORBIDDEN'),
  notFound: (message = 'Resource not found') => errorResponse(message, 404, 'NOT_FOUND'),
  conflict: (message = 'Resource conflict') => errorResponse(message, 409, 'CONFLICT'),
  internalError: (message = 'An unexpected server error occurred') =>
    errorResponse(message, 500, 'INTERNAL_ERROR'),
};
