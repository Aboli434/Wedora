import { requireRole } from '@/lib/auth';
import { UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/apiResponse';

export async function GET() {
  try {
    await requireRole(UserRole.ADMIN);

    const [
      totalUsers,
      totalVendors,
      totalClients,
      verifiedVendors,
      pendingVendors,
      totalWeddings,
    ] = await Promise.all([
      prisma.user.count(),
      prisma.vendorProfile.count(),
      prisma.clientProfile.count(),
      prisma.vendorProfile.count({ where: { verified: true } }),
      prisma.vendorProfile.count({ where: { verified: false } }),
      prisma.wedding.count(),
    ]);

    return apiResponse.success({
      totalUsers,
      totalVendors,
      totalClients,
      verifiedVendors,
      pendingVendors,
      totalWeddings,
    });
  } catch (error) {
    return apiResponse.handleError(error);
  }
}
