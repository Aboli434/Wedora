import { UserRole, CategoryType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { createClient } from '@/lib/supabase/server';
import { UnauthorizedError, ForbiddenError } from '@/lib/errors';
import { headers } from 'next/headers';
import { parseVendorCategory } from '@/lib/vendorCategory';

/**
 * Retrieves the current authenticated application User record mapped from Supabase Auth.
 * Returns null if not logged in or user record does not exist in DB yet.
 */
export async function getCurrentUser() {
  try {
    const supabase = await createClient();

    // Check Authorization header first if passed by client
    let supabaseUser = null;
    try {
      const headerList = await headers();
      const authHeader = headerList.get('authorization') || headerList.get('Authorization');
      const token = authHeader?.startsWith('Bearer ') ? authHeader.substring(7) : null;
      if (token) {
        const { data, error } = await supabase.auth.getUser(token);
        if (!error && data?.user) {
          supabaseUser = data.user;
        }
      }
    } catch {
      // In contexts where headers() isn't accessible, continue to cookie session
    }

    if (!supabaseUser) {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();
      if (!error && user) {
        supabaseUser = user;
      }
    }

    if (!supabaseUser) {
      return null;
    }

    let appUser = await prisma.user.findUnique({
      where: { supabaseAuthUserId: supabaseUser.id },
      include: {
        clientProfile: true,
        vendorProfile: true,
      },
    });

    // Fallback: search by email if not found by supabaseAuthUserId
    if (!appUser && supabaseUser.email) {
      appUser = await prisma.user.findUnique({
        where: { email: supabaseUser.email.toLowerCase() },
        include: {
          clientProfile: true,
          vendorProfile: true,
        },
      });

      if (appUser && appUser.supabaseAuthUserId !== supabaseUser.id) {
        appUser = await prisma.user.update({
          where: { id: appUser.id },
          data: { supabaseAuthUserId: supabaseUser.id },
          include: {
            clientProfile: true,
            vendorProfile: true,
          },
        });
      }
    }

    // Auto-provision application User and profile in PostgreSQL DB if not present
    if (!appUser && supabaseUser.email) {
      const rawRole = supabaseUser.user_metadata?.role;
      const userRole = rawRole === 'VENDOR' ? UserRole.VENDOR : rawRole === 'ADMIN' ? UserRole.ADMIN : UserRole.CLIENT;
      const fullName = (supabaseUser.user_metadata?.fullName as string) || (supabaseUser.user_metadata?.name as string) || 'User';

      appUser = await prisma.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            supabaseAuthUserId: supabaseUser.id,
            email: supabaseUser.email!.toLowerCase(),
            role: userRole,
            fullName,
          },
        });

        if (userRole === UserRole.VENDOR || userRole === UserRole.ADMIN) {
          const rawBiz = (supabaseUser.user_metadata?.businessName as string)?.trim();
          const businessName =
            rawBiz ||
            (fullName.includes('Studio') || fullName.includes('Services')
              ? fullName
              : `${fullName} Studio`);
          const baseSlug =
            businessName
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, '-')
              .replace(/(^-|-$)+/g, '') || 'vendor-studio';
          const slug = `${baseSlug}-${Date.now().toString(36)}`;
          const rawCategory = (supabaseUser.user_metadata?.category as string) || (supabaseUser.user_metadata?.businessCategory as string);
          const category = parseVendorCategory(rawCategory);
          const city =
            (supabaseUser.user_metadata?.city as string) ||
            (supabaseUser.user_metadata?.location as string) ||
            'Mumbai';

          await tx.vendorProfile.create({
            data: {
              userId: newUser.id,
              businessName,
              slug,
              category,
              city,
              startingPrice: BigInt(5000000),
              verified: userRole === UserRole.ADMIN ? true : false,
              featured: false,
            },
          });
        }
        
        if (userRole === UserRole.CLIENT || userRole === UserRole.ADMIN) {
          await tx.clientProfile.create({
            data: {
              userId: newUser.id,
            },
          });
        }

        return tx.user.findUnique({
          where: { id: newUser.id },
          include: {
            clientProfile: true,
            vendorProfile: true,
          },
        });
      });
    }

    // Ensure existing ADMIN users also get missing profiles provisioned
    if (appUser && appUser.role === UserRole.ADMIN) {
      if (!appUser.clientProfile || !appUser.vendorProfile) {
        await prisma.$transaction(async (tx) => {
          if (!appUser!.clientProfile) {
            await tx.clientProfile.create({
              data: { userId: appUser!.id },
            });
          }
          if (!appUser!.vendorProfile) {
            const businessName = `${appUser!.fullName} Admin Studio`;
            const baseSlug = businessName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'admin-studio';
            const slug = `${baseSlug}-${Date.now().toString(36)}`;
            await tx.vendorProfile.create({
              data: {
                userId: appUser!.id,
                businessName,
                slug,
                category: 'PHOTOGRAPHY',
                city: 'Mumbai',
                startingPrice: BigInt(5000000),
              },
            });
          }
        });

        appUser = await prisma.user.findUnique({
          where: { id: appUser.id },
          include: {
            clientProfile: true,
            vendorProfile: true,
          },
        });
      }
    }

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
 * Allows ADMIN role superuser access across all application endpoints.
 * Throws UnauthorizedError if unauthenticated, ForbiddenError if role does not match.
 */
export async function requireRole(allowedRoles: UserRole | UserRole[]) {
  const user = await requireAuthenticatedUser();
  const roles = Array.isArray(allowedRoles) ? allowedRoles : [allowedRoles];

  if (!roles.includes(user.role) && user.role !== UserRole.ADMIN) {
    throw new ForbiddenError(`Access denied. Required role: ${roles.join(', ')}`);
  }

  return user;
}
