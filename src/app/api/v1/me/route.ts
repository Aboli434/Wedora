import { NextRequest } from 'next/server';
import { requireAuthenticatedUser } from '@/lib/auth';
import { apiResponse } from '@/lib/apiResponse';
import { validateData } from '@/lib/validation';
import { updateMeSchema } from '@/lib/validation/me';
import { userService } from '@/lib/services/user.service';
import { ValidationError } from '@/lib/errors';

/**
 * GET /api/v1/me
 * Retrieves current authenticated user profile DTO.
 */
export async function GET() {
  try {
    const user = await requireAuthenticatedUser();
    const userDto = userService.formatUserResponse(user);
    return apiResponse.success(userDto);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

/**
 * PATCH /api/v1/me
 * Updates current authenticated user profile DTO.
 */
export async function PATCH(request: NextRequest) {
  try {
    const user = await requireAuthenticatedUser();

    let rawBody: unknown;
    try {
      rawBody = await request.json();
    } catch {
      throw new ValidationError('Invalid JSON body');
    }

    const input = validateData(updateMeSchema, rawBody);
    const updatedUserDto = await userService.updateCurrentUserProfile(user, input);

    return apiResponse.success(updatedUserDto, 200, 'Profile updated successfully');
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
