import { Booking, BookingStatus, EnquiryStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateBookingInput,
  UpdateBookingInput,
} from '@/lib/validation/booking';
import { BookingResponse } from '@/lib/api/types';
import { ConflictError, NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';
import { bookingServiceService } from '@/lib/services/bookingService.service';
import { bookingEventService } from '@/lib/services/bookingEvent.service';

export class BookingService {
  /**
   * Transforms a Prisma Booking record into a clean BookingResponse DTO.
   */
  public formatBookingResponse(
    booking: Booking & {
      services?: Prisma.BookingServiceGetPayload<object>[];
      events?: Prisma.BookingEventGetPayload<object>[];
    }
  ): BookingResponse {
    return {
      id: booking.id,
      referenceCode: booking.referenceCode,
      weddingId: booking.weddingId,
      vendorId: booking.vendorId,
      weddingVendorId: booking.weddingVendorId,
      enquiryId: booking.enquiryId,
      status: booking.status,
      totalAmount: booking.totalAmount.toString(),
      advanceAmount: booking.advanceAmount.toString(),
      paidAmount: booking.paidAmount.toString(),
      notes: booking.notes,
      createdAt: booking.createdAt,
      updatedAt: booking.updatedAt,
      ...(booking.services
        ? { services: booking.services.map((s) => bookingServiceService.formatBookingServiceResponse(s)) }
        : {}),
      ...(booking.events
        ? { events: booking.events.map((e) => bookingEventService.formatBookingEventResponse(e)) }
        : {}),
    };
  }

  /**
   * Generates a unique reference code for a new booking (e.g. "BKG-9M2K7L").
   */
  private generateReferenceCode(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'BKG-';
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
  // CLIENT-SIDE BOOKING OPERATIONS
  // ==========================================

  /**
   * Lists all bookings for a specific client-owned wedding.
   */
  public async listBookingsForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<BookingResponse[]> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const bookings = await prisma.booking.findMany({
      where: {
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      include: {
        services: true,
        events: true,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return bookings.map((b) => this.formatBookingResponse(b));
  }

  /**
   * Fetches a single booking by ID for a client-owned wedding.
   */
  public async getBookingForClientWedding(params: {
    weddingId: string;
    bookingId: string;
    clientProfileId: string;
  }): Promise<BookingResponse> {
    const { weddingId, bookingId, clientProfileId } = params;

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      include: {
        services: true,
        events: true,
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    return this.formatBookingResponse(booking);
  }

  /**
   * Creates a new booking for a client-owned wedding.
   */
  public async createBookingForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateBookingInput;
  }): Promise<BookingResponse> {
    const { weddingId, clientProfileId, input } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    let resolvedVendorId: string | null = null;

    if (input.vendorId) {
      const vendor = await prisma.vendorProfile.findUnique({
        where: { id: input.vendorId },
        select: { id: true },
      });
      if (vendor) resolvedVendorId = vendor.id;
    } else if (input.vendorSlug) {
      const vendor = await prisma.vendorProfile.findUnique({
        where: { slug: input.vendorSlug },
        select: { id: true },
      });
      if (vendor) resolvedVendorId = vendor.id;
    }

    if (!resolvedVendorId) {
      throw new NotFoundError('Target vendor not found');
    }

    // Verify enquiryId if passed
    if (input.enquiryId) {
      const enquiry = await prisma.vendorEnquiry.findFirst({
        where: {
          id: input.enquiryId,
          weddingId,
          vendorId: resolvedVendorId,
        },
        select: { id: true, status: true },
      });

      if (!enquiry) {
        throw new NotFoundError('Referenced enquiry not found or does not match wedding and vendor context');
      }

      if (enquiry.status === EnquiryStatus.CONVERTED) {
        throw new ConflictError('This enquiry has already been converted into a booking');
      }
    }

    const totalAmountPaise = parsePaise(input.totalAmount);
    const advanceAmountPaise = input.advanceAmount ? parsePaise(input.advanceAmount) : BigInt(0);
    const referenceCode = this.generateReferenceCode();

    try {
      const booking = await prisma.$transaction(async (tx) => {
        const createdBooking = await tx.booking.create({
          data: {
            referenceCode,
            weddingId,
            vendorId: resolvedVendorId!,
            weddingVendorId: input.weddingVendorId ?? null,
            enquiryId: input.enquiryId ?? null,
            status: input.status ?? BookingStatus.DRAFT,
            totalAmount: totalAmountPaise,
            advanceAmount: advanceAmountPaise,
            paidAmount: BigInt(0),
            notes: input.notes ?? null,
          },
          include: {
            services: true,
            events: true,
          },
        });

        if (input.enquiryId) {
          await tx.vendorEnquiry.update({
            where: { id: input.enquiryId },
            data: { status: EnquiryStatus.CONVERTED },
          });
        }

        return createdBooking;
      });

      return this.formatBookingResponse(booking);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('A booking linked to this unique reference or enquiry already exists');
      }
      throw error;
    }
  }

  /**
   * Dedicated atomic conversion of an enquiry into a booking.
   */
  public async convertEnquiryToBooking(params: {
    weddingId: string;
    enquiryId: string;
    clientProfileId: string;
  }): Promise<BookingResponse> {
    const { weddingId, enquiryId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

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

    if (enquiry.status === EnquiryStatus.CONVERTED) {
      throw new ConflictError('This enquiry has already been converted into a booking');
    }

    const referenceCode = this.generateReferenceCode();
    const totalAmountPaise = enquiry.estimatedBudget ?? BigInt(0);

    try {
      const booking = await prisma.$transaction(async (tx) => {
        const createdBooking = await tx.booking.create({
          data: {
            referenceCode,
            weddingId,
            vendorId: enquiry.vendorId,
            enquiryId: enquiry.id,
            status: BookingStatus.PENDING,
            totalAmount: totalAmountPaise,
            advanceAmount: BigInt(0),
            paidAmount: BigInt(0),
            notes: `Converted from Enquiry ${enquiry.referenceCode}`,
          },
          include: {
            services: true,
            events: true,
          },
        });

        await tx.vendorEnquiry.update({
          where: { id: enquiry.id },
          data: { status: EnquiryStatus.CONVERTED },
        });

        return createdBooking;
      });

      return this.formatBookingResponse(booking);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('A booking linked to this enquiry already exists');
      }
      throw error;
    }
  }

  /**
   * Updates an existing booking for a client-owned wedding.
   */
  public async updateBookingForClientWedding(params: {
    weddingId: string;
    bookingId: string;
    clientProfileId: string;
    input: UpdateBookingInput;
  }): Promise<BookingResponse> {
    const { weddingId, bookingId, clientProfileId, input } = params;

    const existing = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
    });

    if (!existing) {
      throw new NotFoundError('Booking not found');
    }

    const updateData: Prisma.BookingUpdateInput = {};

    if (input.status !== undefined) updateData.status = input.status;
    if (input.totalAmount !== undefined) updateData.totalAmount = parsePaise(input.totalAmount);
    if (input.advanceAmount !== undefined) updateData.advanceAmount = parsePaise(input.advanceAmount);
    if (input.notes !== undefined) updateData.notes = input.notes;

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        services: true,
        events: true,
      },
    });

    return this.formatBookingResponse(updated);
  }

  // ==========================================
  // VENDOR-SIDE BOOKING OPERATIONS
  // ==========================================

  /**
   * Lists all bookings received by the authenticated vendor.
   */
  public async listBookingsForCurrentVendor(userId: string): Promise<BookingResponse[]> {
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const bookings = await prisma.booking.findMany({
      where: { vendorId },
      include: {
        services: true,
        events: true,
      },
      orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    });

    return bookings.map((b) => this.formatBookingResponse(b));
  }

  /**
   * Fetches a single booking received by the authenticated vendor.
   */
  public async getBookingForCurrentVendor(params: {
    userId: string;
    bookingId: string;
  }): Promise<BookingResponse> {
    const { userId, bookingId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        vendorId,
      },
      include: {
        services: true,
        events: true,
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    return this.formatBookingResponse(booking);
  }

  /**
   * Updates a booking received by the authenticated vendor.
   */
  public async updateBookingForCurrentVendor(params: {
    userId: string;
    bookingId: string;
    input: UpdateBookingInput;
  }): Promise<BookingResponse> {
    const { userId, bookingId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const existing = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        vendorId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Booking not found');
    }

    const updateData: Prisma.BookingUpdateInput = {};

    if (input.status !== undefined) updateData.status = input.status;
    if (input.totalAmount !== undefined) updateData.totalAmount = parsePaise(input.totalAmount);
    if (input.advanceAmount !== undefined) updateData.advanceAmount = parsePaise(input.advanceAmount);
    if (input.notes !== undefined) updateData.notes = input.notes;

    const updated = await prisma.booking.update({
      where: { id: bookingId },
      data: updateData,
      include: {
        services: true,
        events: true,
      },
    });

    return this.formatBookingResponse(updated);
  }
}

export const bookingService = new BookingService();
