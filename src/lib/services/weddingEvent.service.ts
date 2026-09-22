import { WeddingEvent, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreateWeddingEventInput, UpdateWeddingEventInput } from '@/lib/validation/weddingEvent';
import { WeddingEventResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';

function formatTimeString(timeVal: Date | null): string | null {
  if (!timeVal) return null;
  if (timeVal instanceof Date) {
    const isoStr = timeVal.toISOString();
    const timePart = isoStr.split('T')[1]?.slice(0, 8);
    return timePart || null;
  }
  return String(timeVal);
}

function parseTimeStringToDate(timeStr: string | null | undefined): Date | null {
  if (!timeStr) return null;
  const trimmed = timeStr.trim();
  if (!trimmed) return null;
  const parts = trimmed.split(':');
  const hours = parseInt(parts[0], 10);
  const minutes = parseInt(parts[1], 10);
  const seconds = parts[2] ? parseInt(parts[2], 10) : 0;
  return new Date(Date.UTC(1970, 0, 1, hours, minutes, seconds));
}

export class WeddingEventService {
  /**
   * Transforms a Prisma WeddingEvent record into a clean WeddingEventResponse DTO.
   */
  public formatWeddingEventResponse(event: WeddingEvent): WeddingEventResponse {
    const formattedDate =
      event.date instanceof Date
        ? event.date.toISOString().split('T')[0]
        : String(event.date).split('T')[0];

    return {
      id: event.id,
      weddingId: event.weddingId,
      name: event.name,
      date: formattedDate,
      startTime: formatTimeString(event.startTime),
      endTime: formatTimeString(event.endTime),
      timezone: event.timezone,
      venue: event.venue,
      address: event.address,
      notes: event.notes,
      createdAt: event.createdAt,
      updatedAt: event.updatedAt,
    };
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
   * Lists all events for a specific wedding owned by the client.
   */
  public async listEventsForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<WeddingEventResponse[]> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const events = await prisma.weddingEvent.findMany({
      where: {
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
      orderBy: [{ date: 'asc' }, { startTime: 'asc' }],
    });

    return events.map((e) => this.formatWeddingEventResponse(e));
  }

  /**
   * Fetches a single event by ID for a specific client-owned wedding.
   */
  public async getEventForClientWedding(params: {
    weddingId: string;
    eventId: string;
    clientProfileId: string;
  }): Promise<WeddingEventResponse> {
    const { weddingId, eventId, clientProfileId } = params;

    const event = await prisma.weddingEvent.findFirst({
      where: {
        id: eventId,
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
    });

    if (!event) {
      throw new NotFoundError('Wedding event not found');
    }

    return this.formatWeddingEventResponse(event);
  }

  /**
   * Creates a new event for a client-owned wedding.
   */
  public async createEventForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateWeddingEventInput;
  }): Promise<WeddingEventResponse> {
    const { weddingId, clientProfileId, input } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const eventDate = new Date(input.date);
    const startTimeObj = parseTimeStringToDate(input.startTime);
    const endTimeObj = parseTimeStringToDate(input.endTime);

    const createdEvent = await prisma.weddingEvent.create({
      data: {
        weddingId,
        name: input.name,
        date: eventDate,
        startTime: startTimeObj,
        endTime: endTimeObj,
        timezone: input.timezone ?? 'Asia/Kolkata',
        venue: input.venue ?? null,
        address: input.address ?? null,
        notes: input.notes ?? null,
      },
    });

    return this.formatWeddingEventResponse(createdEvent);
  }

  /**
   * Updates an existing event for a client-owned wedding.
   */
  public async updateEventForClientWedding(params: {
    weddingId: string;
    eventId: string;
    clientProfileId: string;
    input: UpdateWeddingEventInput;
  }): Promise<WeddingEventResponse> {
    const { weddingId, eventId, clientProfileId, input } = params;

    // Verify event ownership
    const existing = await prisma.weddingEvent.findFirst({
      where: {
        id: eventId,
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundError('Wedding event not found');
    }

    const updateData: Prisma.WeddingEventUpdateInput = {};

    if (input.name !== undefined) updateData.name = input.name;
    if (input.date !== undefined) updateData.date = new Date(input.date);
    if (input.startTime !== undefined) updateData.startTime = parseTimeStringToDate(input.startTime);
    if (input.endTime !== undefined) updateData.endTime = parseTimeStringToDate(input.endTime);
    if (input.timezone !== undefined) updateData.timezone = input.timezone;
    if (input.venue !== undefined) updateData.venue = input.venue;
    if (input.address !== undefined) updateData.address = input.address;
    if (input.notes !== undefined) updateData.notes = input.notes;

    const updatedEvent = await prisma.weddingEvent.update({
      where: { id: eventId },
      data: updateData,
    });

    return this.formatWeddingEventResponse(updatedEvent);
  }
}

export const weddingEventService = new WeddingEventService();
