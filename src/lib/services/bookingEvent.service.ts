import { BookingEvent, UserRole, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateBookingEventInput,
  UpdateBookingEventInput,
} from '@/lib/validation/bookingEvent';
import { BookingEventResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { bookingServiceService } from '@/lib/services/bookingService.service';

export class BookingEventService {
  /**
   * Transforms a Prisma BookingEvent record into a clean BookingEventResponse DTO.
   */
  public formatBookingEventResponse(event: BookingEvent): BookingEventResponse {
    const formattedEventDate =
      event.eventDate instanceof Date
        ? event.eventDate.toISOString().split('T')[0]
        : String(event.eventDate).split('T')[0];

    const formattedStartTime = event.startTime
      ? event.startTime instanceof Date
        ? event.startTime.toISOString().split('T')[1]?.slice(0, 5) ?? null
        : String(event.startTime).slice(0, 5)
      : null;

    const formattedEndTime = event.endTime
      ? event.endTime instanceof Date
        ? event.endTime.toISOString().split('T')[1]?.slice(0, 5) ?? null
        : String(event.endTime).slice(0, 5)
      : null;

    return {
      id: event.id,
      bookingId: event.bookingId,
      weddingEventId: event.weddingEventId,
      eventName: event.eventName,
      eventDate: formattedEventDate,
      startTime: formattedStartTime,
      endTime: formattedEndTime,
      venue: event.venue,
      createdAt: event.createdAt,
    };
  }

  /**
   * Converts HH:MM string into Date object for Prisma @db.Time.
   */
  private parseTimeString(timeStr?: string | null): Date | null {
    if (!timeStr) return null;
    const parts = timeStr.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const date = new Date(1970, 0, 1, hours, minutes, 0);
    return date;
  }

  /**
   * Lists all booking events for a specific booking.
   */
  public async listEventsForBooking(params: {
    bookingId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<BookingEventResponse[]> {
    const { bookingId, userId, userRole, clientProfileId } = params;
    await bookingServiceService.verifyBookingParticipantAccess({ bookingId, userId, userRole, clientProfileId });

    const events = await prisma.bookingEvent.findMany({
      where: { bookingId },
      orderBy: [{ eventDate: 'asc' }, { id: 'asc' }],
    });

    return events.map((e) => this.formatBookingEventResponse(e));
  }

  /**
   * Gets a single booking event by ID.
   */
  public async getEventForBooking(params: {
    bookingId: string;
    bookingEventId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<BookingEventResponse> {
    const { bookingId, bookingEventId, userId, userRole, clientProfileId } = params;
    await bookingServiceService.verifyBookingParticipantAccess({ bookingId, userId, userRole, clientProfileId });

    const event = await prisma.bookingEvent.findFirst({
      where: {
        id: bookingEventId,
        bookingId,
      },
    });

    if (!event) {
      throw new NotFoundError('Booking event record not found');
    }

    return this.formatBookingEventResponse(event);
  }

  /**
   * Creates a new booking event.
   */
  public async createEventForBooking(params: {
    bookingId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: CreateBookingEventInput;
  }): Promise<BookingEventResponse> {
    const { bookingId, userId, userRole, clientProfileId, input } = params;
    const booking = await bookingServiceService.verifyBookingParticipantAccess({
      bookingId,
      userId,
      userRole,
      clientProfileId,
    });

    if (input.weddingEventId) {
      const weddingEvent = await prisma.weddingEvent.findFirst({
        where: {
          id: input.weddingEventId,
          weddingId: booking.weddingId,
        },
        select: { id: true },
      });

      if (!weddingEvent) {
        throw new NotFoundError('Referenced wedding event not found or belongs to another wedding');
      }
    }

    const eventDateObj = new Date(input.eventDate);
    const startTimeObj = this.parseTimeString(input.startTime);
    const endTimeObj = this.parseTimeString(input.endTime);

    const createdEvent = await prisma.bookingEvent.create({
      data: {
        bookingId,
        weddingEventId: input.weddingEventId ?? null,
        eventName: input.eventName,
        eventDate: eventDateObj,
        startTime: startTimeObj,
        endTime: endTimeObj,
        venue: input.venue ?? null,
      },
    });

    return this.formatBookingEventResponse(createdEvent);
  }

  /**
   * Updates an existing booking event.
   */
  public async updateEventForBooking(params: {
    bookingId: string;
    bookingEventId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: UpdateBookingEventInput;
  }): Promise<BookingEventResponse> {
    const { bookingId, bookingEventId, userId, userRole, clientProfileId, input } = params;
    await bookingServiceService.verifyBookingParticipantAccess({ bookingId, userId, userRole, clientProfileId });

    const existing = await prisma.bookingEvent.findFirst({
      where: {
        id: bookingEventId,
        bookingId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Booking event record not found');
    }

    const updateData: Prisma.BookingEventUpdateInput = {};

    if (input.eventName !== undefined) updateData.eventName = input.eventName;
    if (input.eventDate !== undefined) updateData.eventDate = new Date(input.eventDate);
    if (input.startTime !== undefined) updateData.startTime = this.parseTimeString(input.startTime);
    if (input.endTime !== undefined) updateData.endTime = this.parseTimeString(input.endTime);
    if (input.venue !== undefined) updateData.venue = input.venue;

    const updated = await prisma.bookingEvent.update({
      where: { id: bookingEventId },
      data: updateData,
    });

    return this.formatBookingEventResponse(updated);
  }
}

export const bookingEventService = new BookingEventService();
