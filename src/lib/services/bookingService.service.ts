import { BookingService, UserRole, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateBookingServiceInput,
  UpdateBookingServiceInput,
} from '@/lib/validation/bookingService';
import { BookingServiceResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';

export class BookingServiceService {
  /**
   * Transforms a Prisma BookingService record into a clean BookingServiceResponse DTO.
   */
  public formatBookingServiceResponse(service: BookingService): BookingServiceResponse {
    return {
      id: service.id,
      bookingId: service.bookingId,
      vendorServiceId: service.vendorServiceId,
      serviceName: service.serviceName,
      unitPrice: service.unitPrice.toString(),
      quantity: service.quantity,
      totalPrice: service.totalPrice.toString(),
      createdAt: service.createdAt,
    };
  }

  /**
   * Asserts that the authenticated user is a participant of the booking (either client owner or vendor owner).
   */
  public async verifyBookingParticipantAccess(params: {
    bookingId: string;
    weddingId?: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<{ id: string; weddingId: string; vendorId: string }> {
    const { bookingId, weddingId, userId, userRole, clientProfileId } = params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        weddingId: true,
        vendorId: true,
        wedding: { select: { clientId: true } },
        vendor: { select: { userId: true } },
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    if (weddingId && booking.weddingId !== weddingId) {
      throw new NotFoundError('Booking not found');
    }

    let isParticipant = false;

    if (userRole === UserRole.CLIENT && clientProfileId) {
      isParticipant = booking.wedding.clientId === clientProfileId;
    } else if (userRole === UserRole.VENDOR) {
      isParticipant = booking.vendor.userId === userId;
    }

    if (!isParticipant) {
      throw new NotFoundError('Booking not found');
    }

    return {
      id: booking.id,
      weddingId: booking.weddingId,
      vendorId: booking.vendorId,
    };
  }

  /**
   * Lists all services for a specific booking.
   */
  public async listServicesForBooking(params: {
    bookingId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<BookingServiceResponse[]> {
    const { bookingId, userId, userRole, clientProfileId } = params;
    await this.verifyBookingParticipantAccess({ bookingId, userId, userRole, clientProfileId });

    const services = await prisma.bookingService.findMany({
      where: { bookingId },
      orderBy: { createdAt: 'asc' },
    });

    return services.map((s) => this.formatBookingServiceResponse(s));
  }

  /**
   * Gets a single booking service by ID.
   */
  public async getServiceForBooking(params: {
    bookingId: string;
    bookingServiceId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<BookingServiceResponse> {
    const { bookingId, bookingServiceId, userId, userRole, clientProfileId } = params;
    await this.verifyBookingParticipantAccess({ bookingId, userId, userRole, clientProfileId });

    const service = await prisma.bookingService.findFirst({
      where: {
        id: bookingServiceId,
        bookingId,
      },
    });

    if (!service) {
      throw new NotFoundError('Booking service line item not found');
    }

    return this.formatBookingServiceResponse(service);
  }

  /**
   * Creates a new booking service line item.
   * Derives totalPrice = unitPrice * quantity using BigInt integer arithmetic.
   */
  public async createServiceForBooking(params: {
    bookingId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: CreateBookingServiceInput;
  }): Promise<BookingServiceResponse> {
    const { bookingId, userId, userRole, clientProfileId, input } = params;
    const booking = await this.verifyBookingParticipantAccess({
      bookingId,
      userId,
      userRole,
      clientProfileId,
    });

    if (input.vendorServiceId) {
      const vendorService = await prisma.vendorService.findFirst({
        where: {
          id: input.vendorServiceId,
          vendorId: booking.vendorId,
        },
        select: { id: true },
      });

      if (!vendorService) {
        throw new NotFoundError('Referenced vendor service not found or belongs to another vendor');
      }
    }

    const unitPricePaise = parsePaise(input.unitPrice);
    const quantity = input.quantity ?? 1;
    const totalPricePaise = unitPricePaise * BigInt(quantity);

    const createdService = await prisma.bookingService.create({
      data: {
        bookingId,
        vendorServiceId: input.vendorServiceId ?? null,
        serviceName: input.serviceName,
        unitPrice: unitPricePaise,
        quantity,
        totalPrice: totalPricePaise,
      },
    });

    return this.formatBookingServiceResponse(createdService);
  }

  /**
   * Updates an existing booking service line item.
   * Recalculates totalPrice if unitPrice or quantity is modified.
   */
  public async updateServiceForBooking(params: {
    bookingId: string;
    bookingServiceId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: UpdateBookingServiceInput;
  }): Promise<BookingServiceResponse> {
    const { bookingId, bookingServiceId, userId, userRole, clientProfileId, input } = params;
    await this.verifyBookingParticipantAccess({ bookingId, userId, userRole, clientProfileId });

    const existing = await prisma.bookingService.findFirst({
      where: {
        id: bookingServiceId,
        bookingId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Booking service line item not found');
    }

    const newUnitPricePaise =
      input.unitPrice !== undefined ? parsePaise(input.unitPrice) : existing.unitPrice;
    const newQuantity = input.quantity !== undefined ? input.quantity : existing.quantity;
    const newTotalPricePaise = newUnitPricePaise * BigInt(newQuantity);

    const updateData: Prisma.BookingServiceUpdateInput = {
      unitPrice: newUnitPricePaise,
      quantity: newQuantity,
      totalPrice: newTotalPricePaise,
    };

    if (input.serviceName !== undefined) updateData.serviceName = input.serviceName;

    const updated = await prisma.bookingService.update({
      where: { id: bookingServiceId },
      data: updateData,
    });

    return this.formatBookingServiceResponse(updated);
  }
}

export const bookingServiceService = new BookingServiceService();
