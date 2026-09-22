import { VendorPortfolioItem, MediaAsset, PortfolioMediaType, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateVendorPortfolioItemInput,
  UpdateVendorPortfolioItemInput,
  CreateMediaAssetInput,
  UpdateMediaAssetInput,
} from '@/lib/validation/vendorPortfolio';
import {
  VendorPortfolioItemResponse,
  PublicVendorPortfolioItemResponse,
  MediaAssetResponse,
  PublicMediaAssetResponse,
} from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';

export class VendorPortfolioService {
  /**
   * Transforms a Prisma VendorPortfolioItem record into a clean VendorPortfolioItemResponse DTO.
   */
  public formatVendorPortfolioItemResponse(item: VendorPortfolioItem): VendorPortfolioItemResponse {
    const formattedEventDate = item.eventDate
      ? item.eventDate instanceof Date
        ? item.eventDate.toISOString().split('T')[0]
        : String(item.eventDate).split('T')[0]
      : null;

    return {
      id: item.id,
      vendorId: item.vendorId,
      title: item.title,
      description: item.description,
      coverUrl: item.coverUrl,
      images: item.images,
      tags: item.tags,
      eventDate: formattedEventDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  }

  /**
   * Transforms a Prisma MediaAsset record into a clean MediaAssetResponse DTO.
   */
  public formatMediaAssetResponse(media: MediaAsset): MediaAssetResponse {
    return {
      id: media.id,
      vendorId: media.vendorId,
      url: media.url,
      type: media.type,
      caption: media.caption,
      sortOrder: media.sortOrder,
      createdAt: media.createdAt,
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

  // ==========================================
  // PORTFOLIO ITEMS METHODS
  // ==========================================

  /**
   * Lists all portfolio items belonging to the current authenticated vendor.
   */
  public async listPortfolioForCurrentVendor(userId: string): Promise<VendorPortfolioItemResponse[]> {
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const items = await prisma.vendorPortfolioItem.findMany({
      where: { vendorId },
      orderBy: [{ eventDate: 'desc' }, { createdAt: 'desc' }],
    });

    return items.map((item) => this.formatVendorPortfolioItemResponse(item));
  }

  /**
   * Fetches a single portfolio item owned by the current authenticated vendor.
   * Scopes strictly by portfolio ID AND vendor ownership.
   */
  public async getPortfolioItemForCurrentVendor(params: {
    userId: string;
    portfolioId: string;
  }): Promise<VendorPortfolioItemResponse> {
    const { userId, portfolioId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const item = await prisma.vendorPortfolioItem.findFirst({
      where: {
        id: portfolioId,
        vendorId,
      },
    });

    if (!item) {
      throw new NotFoundError('Vendor portfolio item not found');
    }

    return this.formatVendorPortfolioItemResponse(item);
  }

  /**
   * Creates a new portfolio item for the current authenticated vendor.
   */
  public async createPortfolioItemForCurrentVendor(params: {
    userId: string;
    input: CreateVendorPortfolioItemInput;
  }): Promise<VendorPortfolioItemResponse> {
    const { userId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const eventDateObj = input.eventDate ? new Date(input.eventDate) : null;

    const item = await prisma.vendorPortfolioItem.create({
      data: {
        vendorId,
        title: input.title,
        description: input.description ?? null,
        coverUrl: input.coverUrl,
        images: input.images !== undefined ? (input.images as Prisma.InputJsonValue) : Prisma.DbNull,
        tags: input.tags !== undefined ? (input.tags as Prisma.InputJsonValue) : Prisma.DbNull,
        eventDate: eventDateObj,
      },
    });

    return this.formatVendorPortfolioItemResponse(item);
  }

  /**
   * Updates an existing portfolio item owned by the current authenticated vendor.
   * Scopes strictly by portfolio ID AND vendor ownership.
   */
  public async updatePortfolioItemForCurrentVendor(params: {
    userId: string;
    portfolioId: string;
    input: UpdateVendorPortfolioItemInput;
  }): Promise<VendorPortfolioItemResponse> {
    const { userId, portfolioId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const existing = await prisma.vendorPortfolioItem.findFirst({
      where: {
        id: portfolioId,
        vendorId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Vendor portfolio item not found');
    }

    const updateData: Prisma.VendorPortfolioItemUpdateInput = {};

    if (input.title !== undefined) updateData.title = input.title;
    if (input.description !== undefined) updateData.description = input.description;
    if (input.coverUrl !== undefined) updateData.coverUrl = input.coverUrl;
    if (input.images !== undefined) {
      updateData.images = input.images === null ? Prisma.DbNull : (input.images as Prisma.InputJsonValue);
    }
    if (input.tags !== undefined) {
      updateData.tags = input.tags === null ? Prisma.DbNull : (input.tags as Prisma.InputJsonValue);
    }
    if (input.eventDate !== undefined) {
      updateData.eventDate = input.eventDate ? new Date(input.eventDate) : null;
    }

    const updated = await prisma.vendorPortfolioItem.update({
      where: { id: portfolioId },
      data: updateData,
    });

    return this.formatVendorPortfolioItemResponse(updated);
  }

  /**
   * Publicly lists portfolio items for a vendor identified by slug.
   */
  public async listPublicPortfolioForVendor(slug: string): Promise<PublicVendorPortfolioItemResponse[]> {
    const vendor = await prisma.vendorProfile.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const items = await prisma.vendorPortfolioItem.findMany({
      where: { vendorId: vendor.id },
      orderBy: [{ eventDate: 'desc' }, { createdAt: 'desc' }],
    });

    return items.map((item) => this.formatVendorPortfolioItemResponse(item));
  }

  // ==========================================
  // MEDIA ASSETS METHODS
  // ==========================================

  /**
   * Lists all media assets belonging to the current authenticated vendor.
   */
  public async listMediaForCurrentVendor(userId: string): Promise<MediaAssetResponse[]> {
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const mediaList = await prisma.mediaAsset.findMany({
      where: { vendorId },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return mediaList.map((m) => this.formatMediaAssetResponse(m));
  }

  /**
   * Fetches a single media asset owned by the current authenticated vendor.
   */
  public async getMediaForCurrentVendor(params: {
    userId: string;
    mediaId: string;
  }): Promise<MediaAssetResponse> {
    const { userId, mediaId } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const media = await prisma.mediaAsset.findFirst({
      where: {
        id: mediaId,
        vendorId,
      },
    });

    if (!media) {
      throw new NotFoundError('Media asset not found');
    }

    return this.formatMediaAssetResponse(media);
  }

  /**
   * Creates a new media asset metadata record for the current authenticated vendor.
   */
  public async createMediaForCurrentVendor(params: {
    userId: string;
    input: CreateMediaAssetInput;
  }): Promise<MediaAssetResponse> {
    const { userId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const media = await prisma.mediaAsset.create({
      data: {
        vendorId,
        url: input.url,
        type: input.type ?? PortfolioMediaType.IMAGE,
        caption: input.caption ?? null,
        sortOrder: input.sortOrder ?? 0,
      },
    });

    return this.formatMediaAssetResponse(media);
  }

  /**
   * Updates an existing media asset owned by the current authenticated vendor.
   */
  public async updateMediaForCurrentVendor(params: {
    userId: string;
    mediaId: string;
    input: UpdateMediaAssetInput;
  }): Promise<MediaAssetResponse> {
    const { userId, mediaId, input } = params;
    const vendorId = await this.getVendorProfileIdByUserId(userId);

    const existing = await prisma.mediaAsset.findFirst({
      where: {
        id: mediaId,
        vendorId,
      },
    });

    if (!existing) {
      throw new NotFoundError('Media asset not found');
    }

    const updateData: Prisma.MediaAssetUpdateInput = {};

    if (input.url !== undefined) updateData.url = input.url;
    if (input.type !== undefined) updateData.type = input.type;
    if (input.caption !== undefined) updateData.caption = input.caption;
    if (input.sortOrder !== undefined) updateData.sortOrder = input.sortOrder;

    const updated = await prisma.mediaAsset.update({
      where: { id: mediaId },
      data: updateData,
    });

    return this.formatMediaAssetResponse(updated);
  }

  /**
   * Publicly lists all media assets for a vendor identified by slug.
   */
  public async listPublicMediaForVendor(slug: string): Promise<PublicMediaAssetResponse[]> {
    const vendor = await prisma.vendorProfile.findUnique({
      where: { slug },
      select: { id: true },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor profile not found');
    }

    const mediaList = await prisma.mediaAsset.findMany({
      where: { vendorId: vendor.id },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
    });

    return mediaList.map((m) => this.formatMediaAssetResponse(m));
  }
}

export const vendorPortfolioService = new VendorPortfolioService();
