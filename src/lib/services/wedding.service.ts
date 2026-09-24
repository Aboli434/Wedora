import { Wedding, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreateWeddingInput, UpdateWeddingInput } from '@/lib/validation/wedding';
import { WeddingResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';
import { activityLogService } from '@/lib/services/activityLog.service';

export class WeddingService {
  /**
   * Transforms a Prisma Wedding record into a clean WeddingResponse DTO.
   */
  public formatWeddingResponse(wedding: Wedding): WeddingResponse {
    const formattedDate =
      wedding.weddingDate instanceof Date
        ? wedding.weddingDate.toISOString().split('T')[0]
        : String(wedding.weddingDate).split('T')[0];

    return {
      id: wedding.id,
      partner1Name: wedding.partner1Name,
      partner2Name: wedding.partner2Name,
      title: wedding.title,
      weddingDate: formattedDate,
      location: wedding.location,
      totalBudget: wedding.totalBudget.toString(),
      totalSpent: wedding.totalSpent.toString(),
      status: wedding.status,
      createdAt: wedding.createdAt,
      updatedAt: wedding.updatedAt,
    };
  }

  /**
   * Lists all weddings owned by the specified client profile.
   */
  public async listWeddingsForClient(clientProfileId: string): Promise<WeddingResponse[]> {
    const weddings = await prisma.wedding.findMany({
      where: { clientId: clientProfileId },
      orderBy: { weddingDate: 'asc' },
    });

    return weddings.map((w) => this.formatWeddingResponse(w));
  }

  /**
   * Fetches a single wedding owned by the specified client profile.
   * Throws NotFoundError if wedding does not exist OR belongs to another client.
   */
  public async getWeddingForClient(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<WeddingResponse> {
    const wedding = await prisma.wedding.findFirst({
      where: {
        id: params.weddingId,
        clientId: params.clientProfileId,
      },
    });

    if (!wedding) {
      throw new NotFoundError('Wedding record not found');
    }

    return this.formatWeddingResponse(wedding);
  }

  /**
   * Creates a new wedding for the authenticated client profile.
   */
  public async createWeddingForClient(params: {
    clientProfileId: string;
    input: CreateWeddingInput;
  }): Promise<WeddingResponse> {
    const { input, clientProfileId } = params;

    const clientProfile = await prisma.clientProfile.findUnique({
      where: { id: clientProfileId },
      select: { userId: true },
    });

    if (!clientProfile) {
      throw new NotFoundError('Client profile not found');
    }

    const budgetPaise = parsePaise(input.totalBudget);
    const dateObj = new Date(input.weddingDate);

    const wedding = await prisma.$transaction(async (tx) => {
      const created = await tx.wedding.create({
        data: {
          clientId: clientProfileId,
          partner1Name: input.partner1Name,
          partner2Name: input.partner2Name,
          title: input.title,
          weddingDate: dateObj,
          location: input.location,
          totalBudget: budgetPaise,
          status: input.status ?? 'PLANNING',
        },
      });

      await activityLogService.logActivity({
        userId: clientProfile.userId,
        action: 'WEDDING_CREATED',
        entityType: 'Wedding',
        entityId: created.id,
        metadata: { title: created.title, location: created.location },
        tx,
      });

      return created;
    });

    return this.formatWeddingResponse(wedding);
  }

  /**
   * Updates a wedding owned by the specified client profile.
   * Throws NotFoundError if wedding does not exist OR belongs to another client.
   */
  public async updateWeddingForClient(params: {
    weddingId: string;
    clientProfileId: string;
    input: UpdateWeddingInput;
  }): Promise<WeddingResponse> {
    const { weddingId, clientProfileId, input } = params;

    const existing = await prisma.wedding.findFirst({
      where: {
        id: weddingId,
        clientId: clientProfileId,
      },
      include: {
        client: { select: { userId: true } },
      },
    });

    if (!existing) {
      throw new NotFoundError('Wedding record not found');
    }

    const updateData: Prisma.WeddingUpdateInput = {};

    if (input.partner1Name !== undefined) updateData.partner1Name = input.partner1Name;
    if (input.partner2Name !== undefined) updateData.partner2Name = input.partner2Name;
    if (input.title !== undefined) updateData.title = input.title;
    if (input.weddingDate !== undefined) updateData.weddingDate = new Date(input.weddingDate);
    if (input.location !== undefined) updateData.location = input.location;
    if (input.totalBudget !== undefined) updateData.totalBudget = parsePaise(input.totalBudget);
    if (input.status !== undefined) updateData.status = input.status;

    const updated = await prisma.$transaction(async (tx) => {
      const res = await tx.wedding.update({
        where: { id: weddingId },
        data: updateData,
      });

      await activityLogService.logActivity({
        userId: existing.client.userId,
        action: 'WEDDING_UPDATED',
        entityType: 'Wedding',
        entityId: weddingId,
        metadata: { title: res.title, status: res.status },
        tx,
      });

      return res;
    });

    return this.formatWeddingResponse(updated);
  }
}

export const weddingService = new WeddingService();
