import { VendorService, ServicePricingType, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateVendorServiceInput,
  UpdateVendorServiceInput,
} from '@/lib/validation/vendorService';
import { VendorServiceResponse, PublicVendorServiceResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';

export class VendorServiceService {
  /**
   * Transforms a Prisma VendorService record into a clean VendorServiceResponse DTO.
   */
  public formatVendorServiceResponse(service: VendorService): VendorServiceResponse {
    return {
      id: service.id,
      vendorId: service.vendorId,
      name: service.name,
      description: service.description,
      pricingType: service.pricingType,
      price: service.price.toString(),
      isCustomizable: service.isCustomizable,
      features: service.features,
      createdAt: service.createdAt,
      updatedAt: service.updatedAt,
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
   * Lists all services belonging to the current authenticated vendor.
   */
  public async listServicesForCurrentVendor(userId: string): Promise<VendorServiceResponse[]> {
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const services = await prisma.vendorService.findMany({
      where: { vendorId },
      orderBy: { createdAt: 'desc' },
    });

    return services.map((s) => this.formatVendorServiceResponse(s));
  }

  /**
   * Fetches a single service owned by the current authenticated vendor.
   * Scopes strictly by service ID AND vendor ownership.
   */
  public async getServiceForCurrentVendor(params: {
    userId: string;
    serviceId: string;
  }): Promise<VendorServiceResponse> {
    const { userId, serviceId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const service = await prisma.vendorService.findFirst({
      where: {
        id: serviceId,
        vendorId,
      },
    });

    if (!service) {
      throw new NotFoundError('Vendor service not found');
    }

    return this.formatVendorServiceResponse(service);
  }

  /**
   * Creates a new service for the current authenticated vendor.
   */
  public async createServiceForCurrentVendor(params: {
    userId: string;
    input: CreateVendorServiceInput;
  }): Promise<VendorServiceResponse> {
    const { userId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const pricePaise = parsePaise(input.price);

    const service = await prisma.vendorService.create({
      data: {
        vendorId,
        name: input.name,
        description: input.description ?? null,
        pricingType: input.pricingType ?? ServicePricingType.FIXED,
        price: pricePaise,
        isCustomizable: input.isCustomizable ?? false,
        features: input.features !== undefined ? (input.features as Prisma.InputJsonValue) : Prisma.DbNull,
      },
    });

    return this.formatVendorServiceResponse(service);
  }

  /**
   * Updates an existing service owned by the current authenticated vendor.
   * Scopes strictly by service ID AND vendor ownership.
   */
  public async updateServiceForCurrentVendor(params: {
    userId: string;
    serviceId: string;
    input: UpdateVendorServiceInput;
  }): Promise<VendorServiceResponse> {
    const { userId, serviceId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const existing = await prisma.vendorService.findFirst({
      where: {
        id: serviceId,
        vendorId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Vendor service not found');
    }

    const updateData: Prisma.VendorServiceUpdateInput = {};

    if (input.name !== undefined) updateData.name = input.name;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.pricingType !== undefined) updateData.pricingType = input.pricingType;
    if (input.price !== undefined) updateData.price = parsePaise(input.price);
    if (input.isCustomizable !== undefined) updateData.isCustomizable = input.isCustomizable;
    if (input.features !== undefined) {
      updateData.features = input.features === null ? Prisma.DbNull : (input.features as Prisma.InputJsonValue);
    }

    const updated = await prisma.vendorService.update({
      where: { id: serviceId },
      data: updateData,
    });

    return this.formatVendorServiceResponse(updated);
  }

  /**
   * Publicly lists all services for a vendor identified by public slug.
   * Returns 404 if vendor slug is invalid/missing.
   */
  public async listPublicServicesForVendor(slug: string): Promise<PublicVendorServiceResponse[]> {
    const vendor = await prisma.vendorProfile.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const services = await prisma.vendorService.findMany({
      where: { vendorId: vendor.id },
      orderBy: { createdAt: 'asc' },
    });

    return services.map((s) => this.formatVendorServiceResponse(s));
  }
}

export const vendorServiceService = new VendorServiceService();
