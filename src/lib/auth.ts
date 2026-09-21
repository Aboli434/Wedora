import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { UnauthorizedError, ForbiddenError } from '@/lib/errors';

/**
 * Retrieves the current authenticated application User record mapped from Supabase Auth.
 * Returns null if not logged in or user record does not exist in DB yet.
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();
    const {
      data: { user: supabaseUser },
      error,
    } = await supabase.auth.getUser();

    if (error || !supabaseUser) {
      return null;
    }

    const appUser = await prisma.user.findUnique({
      where: { supabaseAuthUserId: supabaseUser.id },
      include: {
        clientProfile: true,
        vendorProfile: true,
      },
    });

    return appUser;
  } catch {
    return null;
  }
}

/**
 * Requires an authenticated user session and valid DB user record.
 * Throws UnauthorizedError if unauthenticated.
 */
export async function requireAuthenticatedUser() {
  const user = await getCurrentUser();
  if (!user) {
    throw new UnauthorizedError('Authentication required to access this resource');
  }
  if (!user.isActive) {
    throw new ForbiddenError('User account is deactivated');
  }
  return user;
}

/**
 * Requires an authenticated user with one of the specified allowed roles.
 * Role is verified strictly against application User database record, never client claims.
 * Throws UnauthorizedError if unauthenticated, ForbiddenError if role does not match.
 */
export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  const user = await requireAuthenticatedUser();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(user.role)) {
    throw new ForbiddenError(`Access denied. Required role: ${roles.join(', ')}`);
  }

  return user;
}
