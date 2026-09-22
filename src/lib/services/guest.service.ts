import { Guest, Prisma, AttendanceStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreateGuestInput, UpdateGuestInput } from '@/lib/validation/guest';
import { GuestResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';

export class GuestService {
  /**
   * Transforms a Prisma Guest record into a clean GuestResponse DTO.
   */
  public formatGuestResponse(guest: Guest): GuestResponse {
    return {
      id: guest.id,
      weddingId: guest.weddingId,
      name: guest.name,
      email: guest.email,
      phone: guest.phone,
      rsvpStatus: guest.rsvpStatus,
      plusOne: guest.plusOne,
      plusOneName: guest.plusOneName,
      dietaryRestrictions: guest.dietaryRestrictions,
      group: guest.group,
      tableNumber: guest.tableNumber,
      createdAt: guest.createdAt,
      updatedAt: guest.updatedAt,
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
   * Lists all guests for a specific wedding owned by the client.
   */
  public async listGuestsForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<GuestResponse[]> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const guests = await prisma.guest.findMany({
      where: {
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
      orderBy: { name: 'asc' },
    });

    return guests.map((g) => this.formatGuestResponse(g));
  }

  /**
   * Fetches a single guest by ID for a specific client-owned wedding.
   */
  public async getGuestForClientWedding(params: {
    weddingId: string;
    guestId: string;
    clientProfileId: string;
  }): Promise<GuestResponse> {
    const { weddingId, guestId, clientProfileId } = params;

    const guest = await prisma.guest.findFirst({
      where: {
        id: guestId,
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
    });

    if (!guest) {
      throw new NotFoundError('Guest not found');
    }

    return this.formatGuestResponse(guest);
  }

  /**
   * Creates a new guest for a client-owned wedding.
   */
  public async createGuestForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateGuestInput;
  }): Promise<GuestResponse> {
    const { weddingId, clientProfileId, input } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const createdGuest = await prisma.guest.create({
      data: {
        weddingId,
        name: input.name,
        email: input.email ? input.email : null,
        phone: input.phone ?? null,
        rsvpStatus: input.rsvpStatus ?? AttendanceStatus.PENDING,
        plusOne: input.plusOne ?? false,
        plusOneName: input.plusOneName ?? null,
        dietaryRestrictions: input.dietaryRestrictions ?? null,
        group: input.group ?? null,
        tableNumber: input.tableNumber ?? null,
      },
    });

    return this.formatGuestResponse(createdGuest);
  }

  /**
   * Updates an existing guest for a client-owned wedding.
   */
  public async updateGuestForClientWedding(params: {
    weddingId: string;
    guestId: string;
    clientProfileId: string;
    input: UpdateGuestInput;
  }): Promise<GuestResponse> {
    const { weddingId, guestId, clientProfileId, input } = params;

    // Verify guest ownership
    const existing = await prisma.guest.findFirst({
      where: {
        id: guestId,
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundError('Guest not found');
    }

    const updateData: Prisma.GuestUpdateInput = {};

    if (input.name !== undefined) updateData.name = input.name;
    if (input.email !== undefined) updateData.email = input.email ? input.email : null;
    if (input.phone !== undefined) updateData.phone = input.phone;
    if (input.rsvpStatus !== undefined) updateData.rsvpStatus = input.rsvpStatus;
    if (input.plusOne !== undefined) updateData.plusOne = input.plusOne;
    if (input.plusOneName !== undefined) updateData.plusOneName = input.plusOneName;
    if (input.dietaryRestrictions !== undefined) updateData.dietaryRestrictions = input.dietaryRestrictions;
    if (input.group !== undefined) updateData.group = input.group;
    if (input.tableNumber !== undefined) updateData.tableNumber = input.tableNumber;

    const updatedGuest = await prisma.guest.update({
      where: { id: guestId },
      data: updateData,
    });

    return this.formatGuestResponse(updatedGuest);
  }
}

export const guestService = new GuestService();
