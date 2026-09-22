import { VendorAvailability, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateVendorAvailabilityInput,
  UpdateVendorAvailabilityInput,
  VendorAvailabilityQueryInput,
} from '@/lib/validation/vendorAvailability';
import {
  VendorAvailabilityResponse,
  PublicVendorAvailabilityResponse,
} from '@/lib/api/types';
import { ConflictError, NotFoundError } from '@/lib/errors';

export class VendorAvailabilityService {
  /**
   * Transforms a Prisma VendorAvailability record into a clean VendorAvailabilityResponse DTO.
   */
  public formatVendorAvailabilityResponse(record: VendorAvailability): VendorAvailabilityResponse {
    const formattedDate =
      record.date instanceof Date
        ? record.date.toISOString().split('T')[0]
        : String(record.date).split('T')[0];

    return {
      id: record.id,
      vendorId: record.vendorId,
      date: formattedDate,
      isAvailable: record.isAvailable,
      notes: record.notes,
      createdAt: record.createdAt,
    };
  }

  /**
   * Helper to resolve VendorProfile ID for the authenticated User ID.
   * Throws NotFoundError if missing.
   */
  public async getVendorProfileIdByUserId(userId: string): Promise<string> {
    const profile = await prisma.vendorProfile.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (!profile) {
      throw new NotFoundError('Vendor profile not found');
    }

    return profile.id;
  }

  /**
   * Lists availability records for the current authenticated vendor.
   * Supports optional date range filtering (startDate, endDate) and isAvailable status filter.
   */
  public async listAvailabilityForCurrentVendor(params: {
    userId: string;
    query?: VendorAvailabilityQueryInput;
  }): Promise<VendorAvailabilityResponse[]> {
    const { userId, query } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const where: Prisma.VendorAvailabilityWhereInput = { vendorId };

    if (query?.startDate || query?.endDate) {
      where.date = {};
      if (query.startDate) {
        where.date.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.date.lte = new Date(query.endDate);
      }
    }

    if (query?.isAvailable !== undefined) {
      where.isAvailable = query.isAvailable;
    }

    const records = await prisma.vendorAvailability.findMany({
      where,
      orderBy: [{ date: 'asc' }, { id: 'asc' }],
    });

    return records.map((r) => this.formatVendorAvailabilityResponse(r));
  }

  /**
   * Fetches a single availability record owned by the current authenticated vendor.
   * Scopes strictly by availability ID AND vendor ownership.
   */
  public async getAvailabilityByIdForCurrentVendor(params: {
    userId: string;
    availabilityId: string;
  }): Promise<VendorAvailabilityResponse> {
    const { userId, availabilityId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const record = await prisma.vendorAvailability.findFirst({
      where: {
        id: availabilityId,
        vendorId,
      },
    });

    if (!record) {
      throw new NotFoundError('Vendor availability record not found');
    }

    return this.formatVendorAvailabilityResponse(record);
  }

  /**
   * Creates a new availability record for the current authenticated vendor.
   * Enforces vendor-date unique constraint.
   */
  public async createAvailabilityForCurrentVendor(params: {
    userId: string;
    input: CreateVendorAvailabilityInput;
  }): Promise<VendorAvailabilityResponse> {
    const { userId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const dateObj = new Date(input.date);

    try {
      const record = await prisma.vendorAvailability.create({
        data: {
          vendorId,
          date: dateObj,
          isAvailable: input.isAvailable ?? true,
          notes: input.notes ?? null,
        },
      });

      return this.formatVendorAvailabilityResponse(record);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('An availability record for this date already exists for this vendor');
      }
      throw error;
    }
  }

  /**
   * Updates an existing availability record owned by the current authenticated vendor.
   * Scopes strictly by availability ID AND vendor ownership.
   */
  public async updateAvailabilityForCurrentVendor(params: {
    userId: string;
    availabilityId: string;
    input: UpdateVendorAvailabilityInput;
  }): Promise<VendorAvailabilityResponse> {
    const { userId, availabilityId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const existing = await prisma.vendorAvailability.findFirst({
      where: {
        id: availabilityId,
        vendorId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Vendor availability record not found');
    }

    const updateData: Prisma.VendorAvailabilityUpdateInput = {};

    if (input.date !== undefined) updateData.date = new Date(input.date);
    if (input.isAvailable !== undefined) updateData.isAvailable = input.isAvailable;
    if (input.notes !== undefined) updateData.notes = input.notes;

    try {
      const updated = await prisma.vendorAvailability.update({
        where: { id: availabilityId },
        data: updateData,
      });

      return this.formatVendorAvailabilityResponse(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('An availability record for this date already exists for this vendor');
      }
      throw error;
    }
  }

  /**
   * Publicly lists availability records for a vendor identified by public slug.
   */
  public async listPublicAvailabilityForVendor(params: {
    slug: string;
    query?: VendorAvailabilityQueryInput;
  }): Promise<PublicVendorAvailabilityResponse[]> {
    const { slug, query } = params;

    const vendor = await prisma.vendorProfile.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const where: Prisma.VendorAvailabilityWhereInput = { vendorId: vendor.id };

    if (query?.startDate || query?.endDate) {
      where.date = {};
      if (query.startDate) {
        where.date.gte = new Date(query.startDate);
      }
      if (query.endDate) {
        where.date.lte = new Date(query.endDate);
      }
    }

    if (query?.isAvailable !== undefined) {
      where.isAvailable = query.isAvailable;
    }

    const records = await prisma.vendorAvailability.findMany({
      where,
      orderBy: [{ date: 'asc' }, { id: 'asc' }],
    });

    return records.map((r) => this.formatVendorAvailabilityResponse(r));
  }
}

export const vendorAvailabilityService = new VendorAvailabilityService();
