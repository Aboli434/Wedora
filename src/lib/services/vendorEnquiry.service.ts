import { VendorEnquiry, EnquiryStatus, Prisma, NotificationType } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateVendorEnquiryInput,
  UpdateVendorEnquiryInput,
} from '@/lib/validation/vendorEnquiry';
import { VendorEnquiryResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';
import { notificationService } from '@/lib/services/notification.service';
import { activityLogService } from '@/lib/services/activityLog.service';

export class VendorEnquiryService {
  /**
   * Transforms a Prisma VendorEnquiry record into a clean VendorEnquiryResponse DTO.
   */
  public formatVendorEnquiryResponse(enquiry: VendorEnquiry): VendorEnquiryResponse {
    const formattedEventDate =
      enquiry.eventDate instanceof Date
        ? enquiry.eventDate.toISOString().split('T')[0]
        : String(enquiry.eventDate).split('T')[0];

    return {
      id: enquiry.id,
      referenceCode: enquiry.referenceCode,
      weddingId: enquiry.weddingId,
      vendorId: enquiry.vendorId,
      eventDate: formattedEventDate,
      guestCount: enquiry.guestCount,
      estimatedBudget: enquiry.estimatedBudget ? enquiry.estimatedBudget.toString() : null,
      status: enquiry.status,
      message: enquiry.message,
      createdAt: enquiry.createdAt,
      updatedAt: enquiry.updatedAt,
    };
  }

  /**
   * Generates a unique reference code for a new enquiry (e.g. "ENQ-7K9A2P").
   */
  private generateReferenceCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'ENQ-';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Asserts that parent Wedding exists and belongs to the specified client profile.
   * Throws NotFoundError if wedding is missing or owned by another client.
   */
  public async verifyWeddingOwnership(weddingId: string, clientProfileId: string): Promise<void> {
    const wedding = await prisma.wedding.findFirst({
      where: {
        id: weddingId,
        clientId: clientProfileId,
      },
      select: { id: true },
    });

    if (!wedding) {
      throw new NotFoundError('Wedding not found');
    }
  }

  /**
   * Helper to resolve VendorProfile ID for an authenticated vendor's User ID.
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

  // ==========================================
  // CLIENT-SIDE ENQUIRY OPERATIONS
  // ==========================================

  /**
   * Lists all enquiries for a specific client-owned wedding.
   */
  public async listEnquiriesForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<VendorEnquiryResponse[]> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const enquiries = await prisma.vendorEnquiry.findMany({
      where: {
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return enquiries.map((e) => this.formatVendorEnquiryResponse(e));
  }

  /**
   * Fetches a single enquiry by ID for a client-owned wedding.
   */
  public async getEnquiryForClientWedding(params: {
    weddingId: string;
    enquiryId: string;
    clientProfileId: string;
  }): Promise<VendorEnquiryResponse> {
    const { weddingId, enquiryId, clientProfileId } = params;

    const enquiry = await prisma.vendorEnquiry.findFirst({
      where: {
        id: enquiryId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
    });

    if (!enquiry) {
      throw new NotFoundError('Enquiry not found');
    }

    return this.formatVendorEnquiryResponse(enquiry);
  }

  /**
   * Creates a new enquiry for a client-owned wedding.
   * Resolves target vendor by vendorId or vendorSlug server-side.
   */
  public async createEnquiryForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateVendorEnquiryInput;
  }): Promise<VendorEnquiryResponse> {
    const { weddingId, clientProfileId, input } = params;

    const wedding = await prisma.wedding.findFirst({
      where: {
        id: weddingId,
        clientId: clientProfileId,
      },
      include: {
        client: { select: { userId: true } },
      },
    });

    if (!wedding) {
      throw new NotFoundError('Wedding not found');
    }

    let resolvedVendorId: string | null = null;
    let vendorUserId: string | null = null;

    if (input.vendorId) {
      const vendor = await prisma.vendorProfile.findUnique({
        where: { id: input.vendorId },
        select: { id: true, userId: true },
      });
      if (vendor) {
        resolvedVendorId = vendor.id;
        vendorUserId = vendor.userId;
      }
    } else if (input.vendorSlug) {
      const vendor = await prisma.vendorProfile.findUnique({
        where: { slug: input.vendorSlug },
        select: { id: true, userId: true },
      });
      if (vendor) {
        resolvedVendorId = vendor.id;
        vendorUserId = vendor.userId;
      }
    }

    if (!resolvedVendorId || !vendorUserId) {
      throw new NotFoundError('Target vendor not found');
    }

    const estimatedBudgetPaise = input.estimatedBudget ? parsePaise(input.estimatedBudget) : null;
    const eventDateObj = new Date(input.eventDate);
    const referenceCode = this.generateReferenceCode();

    const enquiry = await prisma.$transaction(async (tx) => {
      const created = await tx.vendorEnquiry.create({
        data: {
          referenceCode,
          weddingId,
          vendorId: resolvedVendorId!,
          eventDate: eventDateObj,
          guestCount: input.guestCount ?? null,
          estimatedBudget: estimatedBudgetPaise,
          status: EnquiryStatus.NEW,
          message: input.message,
        },
      });

      await notificationService.createNotification({
        userId: vendorUserId!,
        type: NotificationType.ENQUIRY,
        title: 'New Enquiry Received',
        message: `You have received a new enquiry (${referenceCode}).`,
        linkUrl: '/vendor/dashboard/enquiries',
        tx,
      });

      await activityLogService.logActivity({
        userId: wedding.client.userId,
        action: 'ENQUIRY_CREATED',
        entityType: 'VendorEnquiry',
        entityId: created.id,
        metadata: { referenceCode, vendorId: resolvedVendorId },
        tx,
      });

      return created;
    }, { maxWait: 10000, timeout: 30000 });

    return this.formatVendorEnquiryResponse(enquiry);
  }

  /**
   * Updates an existing enquiry for a client-owned wedding.
   */
  public async updateEnquiryForClientWedding(params: {
    weddingId: string;
    enquiryId: string;
    clientProfileId: string;
    input: UpdateVendorEnquiryInput;
  }): Promise<VendorEnquiryResponse> {
    const { weddingId, enquiryId, clientProfileId, input } = params;

    const existing = await prisma.vendorEnquiry.findFirst({
      where: {
        id: enquiryId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      include: {
        vendor: { select: { userId: true } },
        wedding: { include: { client: { select: { userId: true } } } },
      },
    });

    if (!existing) {
      throw new NotFoundError('Enquiry not found');
    }

    const updateData: Prisma.VendorEnquiryUpdateInput = {};

    if (input.eventDate !== undefined) updateData.eventDate = new Date(input.eventDate);
    if (input.guestCount !== undefined) updateData.guestCount = input.guestCount;
    if (input.estimatedBudget !== undefined)
      updateData.estimatedBudget = input.estimatedBudget ? parsePaise(input.estimatedBudget) : null;
    if (input.status !== undefined) updateData.status = input.status;
    if (input.message !== undefined) updateData.message = input.message;

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.vendorEnquiry.update({
        where: { id: enquiryId },
        data: updateData,
      });

      if (input.status !== undefined && input.status !== existing.status) {
        await notificationService.createNotification({
          userId: existing.vendor.userId,
          type: NotificationType.ENQUIRY,
          title: 'Enquiry Status Updated',
          message: `Enquiry status updated to ${input.status}.`,
          linkUrl: '/vendor/dashboard/enquiries',
          tx,
        });
      }

      await activityLogService.logActivity({
        userId: existing.wedding.client.userId,
        action: 'ENQUIRY_STATUS_UPDATED',
        entityType: 'VendorEnquiry',
        entityId: enquiryId,
        metadata: { fromStatus: existing.status, toStatus: res.status },
        tx,
      });

      return res;
    }, { maxWait: 10000, timeout: 30000 });

    return this.formatVendorEnquiryResponse(updated);
  }

  // ==========================================
  // VENDOR-SIDE ENQUIRY OPERATIONS
  // ==========================================

  /**
   * Lists all enquiries received by the authenticated vendor.
   */
  public async listEnquiriesForCurrentVendor(userId: string): Promise<VendorEnquiryResponse[]> {
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const enquiries = await prisma.vendorEnquiry.findMany({
      where: { vendorId },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return enquiries.map((e) => this.formatVendorEnquiryResponse(e));
  }

  /**
   * Fetches a single enquiry received by the authenticated vendor.
   */
  public async getEnquiryForCurrentVendor(params: {
    userId: string;
    enquiryId: string;
  }): Promise<VendorEnquiryResponse> {
    const { userId, enquiryId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const enquiry = await prisma.vendorEnquiry.findFirst({
      where: {
        id: enquiryId,
        vendorId,
      },
    });

    if (!enquiry) {
      throw new NotFoundError('Enquiry not found');
    }

    return this.formatVendorEnquiryResponse(enquiry);
  }

  /**
   * Updates an enquiry received by the authenticated vendor (status changes, notes, etc.).
   */
  public async updateEnquiryForCurrentVendor(params: {
    userId: string;
    enquiryId: string;
    input: UpdateVendorEnquiryInput;
  }): Promise<VendorEnquiryResponse> {
    const { userId, enquiryId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const existing = await prisma.vendorEnquiry.findFirst({
      where: {
        id: enquiryId,
        vendorId,
      },
      include: {
        wedding: { include: { client: { select: { userId: true } } } },
      },
    });

    if (!existing) {
      throw new NotFoundError('Enquiry not found');
    }

    const updateData: Prisma.VendorEnquiryUpdateInput = {};

    if (input.status !== undefined) updateData.status = input.status;
    if (input.eventDate !== undefined) updateData.eventDate = new Date(input.eventDate);
    if (input.guestCount !== undefined) updateData.guestCount = input.guestCount;
    if (input.estimatedBudget !== undefined)
      updateData.estimatedBudget = input.estimatedBudget ? parsePaise(input.estimatedBudget) : null;
    if (input.message !== undefined) updateData.message = input.message;

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.vendorEnquiry.update({
        where: { id: enquiryId },
        data: updateData,
      });

      if (input.status !== undefined && input.status !== existing.status) {
        await notificationService.createNotification({
          userId: existing.wedding.client.userId,
          type: NotificationType.ENQUIRY,
          title: 'Enquiry Status Updated',
          message: `Enquiry status updated to ${input.status}.`,
          linkUrl: '/dashboard/wedding',
          tx,
        });
      }

      await activityLogService.logActivity({
        userId,
        action: 'ENQUIRY_STATUS_UPDATED',
        entityType: 'VendorEnquiry',
        entityId: enquiryId,
        metadata: { fromStatus: existing.status, toStatus: res.status },
        tx,
      });

      return res;
    }, { maxWait: 10000, timeout: 30000 });

    return this.formatVendorEnquiryResponse(updated);
  }
}

export const vendorEnquiryService = new VendorEnquiryService();
