import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/apiResponse';

export async function GET(request: NextRequest) {
  try {
    const email = request.nextUrl.searchParams.get('email')?.toLowerCase().trim();

    if (!email) {
      return apiResponse.error('Email is required', 400);
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { vendorProfile: true },
    });

    if (!user || user.role !== 'VENDOR' || !user.vendorProfile) {
      return apiResponse.success({
        isVendor: false,
        verified: true,
      });
    }

    return apiResponse.success({
      isVendor: true,
      verified: user.vendorProfile.verified,
      businessName: user.vendorProfile.businessName,
      slug: user.vendorProfile.slug,
      city: user.vendorProfile.city,
      category: user.vendorProfile.category,
    });
  } catch (err) {
    return apiResponse.handleError(err);
  }
}
