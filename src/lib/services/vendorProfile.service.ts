import { VendorProfile, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  UpdateVendorProfileInput,
  VendorDirectoryQueryInput,
} from '@/lib/validation/vendorProfile';
import { VendorProfileResponse, PublicVendorProfileResponse, PaginationMeta } from '@/lib/api/types';
import { ConflictError, NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';

export class VendorProfileService {
  /**
   * Transforms a Prisma VendorProfile record into a clean VendorProfileResponse DTO.
   */
  public formatVendorProfileResponse(vendor: VendorProfile): VendorProfileResponse {
    return {
      id: vendor.id,
      businessName: vendor.businessName,
      slug: vendor.slug,
      category: vendor.category,
      rating: vendor.rating,
      reviewCount: vendor.reviewCount,
      city: vendor.city,
      startingPrice: vendor.startingPrice.toString(),
      coverImage: vendor.coverImage,
      description: vendor.description,
      experienceYears: vendor.experienceYears,
      teamSize: vendor.teamSize,
      verified: vendor.verified,
      featured: vendor.featured,
      createdAt: vendor.createdAt,
      updatedAt: vendor.updatedAt,
    };
  }

  /**
   * Fetches the current authenticated vendor's profile by their User ID.
   * Throws NotFoundError if no vendor profile exists for the user.
   */
  public async getCurrentVendorProfile(userId: string): Promise<VendorProfileResponse> {
    const profile = await prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!profile) {
      throw new NotFoundError('Vendor profile not found');
    }

    return this.formatVendorProfileResponse(profile);
  }

  /**
   * Updates the current authenticated vendor's profile.
   * Prevents changing system-managed or platform fields (rating, reviewCount, verified, featured).
   */
  public async updateCurrentVendorProfile(params: {
    userId: string;
    input: UpdateVendorProfileInput;
  }): Promise<VendorProfileResponse> {
    const { userId, input } = params;

    const existing = await prisma.vendorProfile.findUnique({
      where: { userId },
    });

    if (!existing) {
      throw new NotFoundError('Vendor profile not found');
    }

    // Check slug uniqueness if slug is being modified
    if (input.slug && input.slug !== existing.slug) {
      const slugOwner = await prisma.vendorProfile.findUnique({
        where: { slug: input.slug },
        select: { id: true },
      });

      if (slugOwner) {
        throw new ConflictError('Vendor profile slug is already in use');
      }
    }

    const updateData: Prisma.VendorProfileUpdateInput = {};

    if (input.businessName !== undefined) updateData.businessName = input.businessName;
    if (input.slug !== undefined) updateData.slug = input.slug;
    if (input.category !== undefined) updateData.category = input.category;
    if (input.city !== undefined) updateData.city = input.city;
    if (input.startingPrice !== undefined) updateData.startingPrice = parsePaise(input.startingPrice);
    if (input.coverImage !== undefined) updateData.coverImage = input.coverImage;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.experienceYears !== undefined) updateData.experienceYears = input.experienceYears;
    if (input.teamSize !== undefined) updateData.teamSize = input.teamSize;

    try {
      const updated = await prisma.vendorProfile.update({
        where: { id: existing.id },
        data: updateData,
      });

      return this.formatVendorProfileResponse(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('A vendor profile with this unique constraint already exists');
      }
      throw error;
    }
  }

  /**
   * Fetches a public vendor profile by public slug.
   * Throws NotFoundError if missing.
   */
  public async getPublicVendorProfileBySlug(slug: string): Promise<PublicVendorProfileResponse> {
    const profile = await prisma.vendorProfile.findUnique({
      where: { slug },
    });

    if (!profile) {
      throw new NotFoundError('Vendor profile not found');
    }

    return this.formatVendorProfileResponse(profile);
  }

  /**
   * Lists public vendor profiles with directory filters, sorting, and pagination.
   */
  public async listPublicVendorProfiles(
    query: VendorDirectoryQueryInput
  ): Promise<{ data: PublicVendorProfileResponse[]; meta: PaginationMeta }> {
    const { search, category, city, featured, sort, page, limit } = query;

    const where: Prisma.VendorProfileWhereInput = {};

    if (category) {
      where.category = category;
    }

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }

    if (featured !== undefined) {
      where.featured = featured;
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
      ];
    }

    let orderBy: Prisma.VendorProfileOrderByWithRelationInput | Prisma.VendorProfileOrderByWithRelationInput[];

    switch (sort) {
      case 'price_asc':
        orderBy = { startingPrice: 'asc' };
        break;
      case 'price_desc':
        orderBy = { startingPrice: 'desc' };
        break;
      case 'newest':
        orderBy = { createdAt: 'desc' };
        break;
      case 'rating':
      default:
        orderBy = [{ rating: 'desc' }, { reviewCount: 'desc' }];
        break;
    }

    const skip = (page - 1) * limit;

    const [total, vendors] = await Promise.all([
      prisma.vendorProfile.count({ where }),
      prisma.vendorProfile.findMany({
        where,
        orderBy,
        skip,
        take: limit,
      }),
    ]);

    const totalPages = Math.ceil(total / limit);

    return {
      data: vendors.map((v) => this.formatVendorProfileResponse(v)),
      meta: {
        page,
        pageSize: limit,
        total,
        totalPages,
      },
    };
  }
}

export const vendorProfileService = new VendorProfileService();
