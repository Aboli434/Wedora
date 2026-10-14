import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/apiResponse';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

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
      const fallbackRes = apiResponse.success({
        isVendor: false,
        verified: true,
      });
      fallbackRes.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      return fallbackRes;
    }

    const res = apiResponse.success({
      isVendor: true,
      verified: user.vendorProfile.verified,
      businessName: user.vendorProfile.businessName,
      slug: user.vendorProfile.slug,
      city: user.vendorProfile.city,
      category: user.vendorProfile.category,
    });
    res.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return res;
  } catch (err) {
    return apiResponse.handleError(err);
  }
}
