import { NextRequest } from 'next/server';
import { requireRole } from '@/lib/auth';
import { UserRole, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/apiResponse';
import { ValidationError, NotFoundError } from '@/lib/errors';

export async function GET(request: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN);

    const searchParams = request.nextUrl.searchParams;
    const search = searchParams.get('search')?.toLowerCase();
    const status = searchParams.get('status');

    const where: Prisma.VendorProfileWhereInput = {};

    if (status === 'verified') {
      where.verified = true;
    } else if (status === 'pending') {
      where.verified = false;
    }

    if (search) {
      where.OR = [
        { businessName: { contains: search, mode: 'insensitive' } },
        { city: { contains: search, mode: 'insensitive' } },
        { user: { fullName: { contains: search, mode: 'insensitive' } } },
        { user: { email: { contains: search, mode: 'insensitive' } } },
      ];
    }

    const vendors = await prisma.vendorProfile.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            fullName: true,
            email: true,
            phoneNumber: true,
          },
        },
      },
    });

    const serializedVendors = vendors.map((v) => ({
      id: v.id,
      userId: v.userId,
      businessName: v.businessName,
      slug: v.slug,
      category: v.category,
      city: v.city,
      rating: v.rating,
      reviewCount: v.reviewCount,
      startingPrice: v.startingPrice.toString(),
      verified: v.verified,
      featured: v.featured,
      createdAt: v.createdAt.toISOString(),
      ownerName: v.user.fullName,
      ownerEmail: v.user.email,
      ownerPhone: v.user.phoneNumber,
    }));

    return apiResponse.success(serializedVendors);
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN);

    const body = await request.json();
    const { vendorId, verified, featured } = body;

    if (!vendorId) {
      throw new ValidationError('Vendor ID is required');
    }

    const updateData: { verified?: boolean; featured?: boolean } = {};
    if (typeof verified === 'boolean') updateData.verified = verified;
    if (typeof featured === 'boolean') updateData.featured = featured;

    const updated = await prisma.vendorProfile.update({
      where: { id: vendorId },
      data: updateData,
    });

    return apiResponse.success(
      {
        id: updated.id,
        businessName: updated.businessName,
        verified: updated.verified,
        featured: updated.featured,
      },
      200,
      'Vendor status updated successfully'
    );
  } catch (error) {
    return apiResponse.handleError(error);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    await requireRole(UserRole.ADMIN);

    const searchParams = request.nextUrl.searchParams;
    const vendorId = searchParams.get('vendorId');

    if (!vendorId) {
      throw new ValidationError('Vendor ID is required');
    }

    const vendor = await prisma.vendorProfile.findUnique({
      where: { id: vendorId },
      include: { user: true },
    });

    if (!vendor) {
      throw new NotFoundError('Vendor not found');
    }

    const wasVerified = vendor.verified;
    const userId = vendor.userId;

    // Delete the vendor profile record
    await prisma.vendorProfile.delete({
      where: { id: vendorId },
    });

    // If the associated user is purely a vendor, mark account inactive
    if (vendor.user && vendor.user.role === UserRole.VENDOR) {
      await prisma.user.update({
        where: { id: userId },
        data: { isActive: false },
      });
    }

    return apiResponse.success(
      {
        vendorId,
        wasVerified,
        businessName: vendor.businessName,
      },
      200,
      'Vendor profile rejected and removed successfully'
    );
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
