import { Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { UpdateMeInput } from '@/lib/validation/me';
import { CurrentUserResponse } from '@/lib/api/types';
import { ValidationError, NotFoundError } from '@/lib/errors';

export type UserWithProfiles = Prisma.UserGetPayload<{
  include: {
    clientProfile: true;
    vendorProfile: true;
  };
}>;

export class UserService {
  /**
   * Transforms a Prisma User with profiles into a safe API-facing CurrentUserResponse DTO.
   * Explicitly selects fields and prevents leaking internal metadata.
   */
  public formatUserResponse(user: UserWithProfiles): CurrentUserResponse {
    const { clientProfile, vendorProfile } = user;

    let profileData: CurrentUserResponse['profile'] = null;

    if (user.role === 'CLIENT' && clientProfile) {
      profileData = {
        id: clientProfile.id,
        location: clientProfile.location,
        phone: clientProfile.phone,
        budgetRange: clientProfile.budgetRange,
        notes: clientProfile.notes,
        createdAt: clientProfile.createdAt,
        updatedAt: clientProfile.updatedAt,
      };
    } else if (user.role === 'VENDOR' && vendorProfile) {
      profileData = {
        id: vendorProfile.id,
        businessName: vendorProfile.businessName,
        slug: vendorProfile.slug,
        category: vendorProfile.category,
        rating: vendorProfile.rating,
        reviewCount: vendorProfile.reviewCount,
        city: vendorProfile.city,
        startingPrice: vendorProfile.startingPrice.toString(),
        coverImage: vendorProfile.coverImage,
        description: vendorProfile.description,
        experienceYears: vendorProfile.experienceYears,
        teamSize: vendorProfile.teamSize,
        verified: vendorProfile.verified,
        featured: vendorProfile.featured,
        createdAt: vendorProfile.createdAt,
        updatedAt: vendorProfile.updatedAt,
      };
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
      fullName: user.fullName,
      phoneNumber: user.phoneNumber,
      avatarUrl: user.avatarUrl,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      profile: profileData,
    };
  }

  /**
   * Fetches user profile by application User ID.
   */
  public async getUserProfileById(userId: string): Promise<UserWithProfiles> {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        clientProfile: true,
        vendorProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundError('User record not found');
    }

    return user;
  }

  /**
   * Atomically updates application User and role-specific profile records.
   */
  public async updateCurrentUserProfile(
    currentUser: UserWithProfiles,
    input: UpdateMeInput
  ): Promise<CurrentUserResponse> {
    const userUpdateData: Prisma.UserUpdateInput = {};

    if (input.fullName !== undefined) {
      userUpdateData.fullName = input.fullName;
    }
    if (input.avatarUrl !== undefined) {
      userUpdateData.avatarUrl = input.avatarUrl;
    }
    if (input.phoneNumber !== undefined) {
      userUpdateData.phoneNumber = input.phoneNumber;
    }

    const updatedUser = await prisma.$transaction(async (tx) => {
      // 1. Update User record if user fields are present
      if (Object.keys(userUpdateData).length > 0) {
        await tx.user.update({
          where: { id: currentUser.id },
          data: userUpdateData,
        });
      }

      // 2. Update role-specific profile
      if (currentUser.role === 'CLIENT') {
        const clientProfileData: Prisma.ClientProfileUncheckedUpdateInput = {};

        if (input.location !== undefined) clientProfileData.location = input.location;
        if (input.phone !== undefined) clientProfileData.phone = input.phone;
        if (input.budgetRange !== undefined) clientProfileData.budgetRange = input.budgetRange;
        if (input.notes !== undefined) clientProfileData.notes = input.notes;

        if (Object.keys(clientProfileData).length > 0) {
          await tx.clientProfile.upsert({
            where: { userId: currentUser.id },
            update: clientProfileData,
            create: {
              user: { connect: { id: currentUser.id } },
              location: input.location ?? null,
              phone: input.phone ?? null,
              budgetRange: input.budgetRange ?? null,
              notes: input.notes ?? null,
            },
          });
        }
      } else if (currentUser.role === 'VENDOR') {
        const vendorProfileData: Prisma.VendorProfileUncheckedUpdateInput = {};

        if (input.businessName !== undefined) vendorProfileData.businessName = input.businessName;
        if (input.city !== undefined && input.city !== null) vendorProfileData.city = input.city;
        if (input.description !== undefined) vendorProfileData.description = input.description;
        if (input.coverImage !== undefined) vendorProfileData.coverImage = input.coverImage;
        if (input.experienceYears !== undefined) vendorProfileData.experienceYears = input.experienceYears;
        if (input.teamSize !== undefined) vendorProfileData.teamSize = input.teamSize;

        if (Object.keys(vendorProfileData).length > 0) {
          if (!currentUser.vendorProfile) {
            throw new ValidationError('Vendor profile does not exist for this user');
          }
          await tx.vendorProfile.update({
            where: { userId: currentUser.id },
            data: vendorProfileData,
          });
        }
      }

      const refreshedUser = await tx.user.findUnique({
        where: { id: currentUser.id },
        include: {
          clientProfile: true,
          vendorProfile: true,
        },
      });

      if (!refreshedUser) {
        throw new NotFoundError('User record not found after update');
      }

      return refreshedUser;
    });

    return this.formatUserResponse(updatedUser);
  }
}

export const userService = new UserService();
