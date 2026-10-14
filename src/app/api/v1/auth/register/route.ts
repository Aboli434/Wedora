import { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { apiResponse } from '@/lib/apiResponse';
import { UserRole, CategoryType } from '@prisma/client';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      supabaseAuthUserId,
      email,
      fullName,
      role,
      businessName,
      category,
      city,
      phoneNumber,
    } = body;

    if (!email || !supabaseAuthUserId) {
      return apiResponse.error('Missing required email or auth user ID', 400);
    }

    const normalizedEmail = email.toLowerCase().trim();
    const userRole = role === 'VENDOR' ? UserRole.VENDOR : UserRole.CLIENT;

    // Check if user already exists
    let user = await prisma.user.findFirst({
      where: {
        OR: [
          { supabaseAuthUserId },
          { email: normalizedEmail },
        ],
      },
      include: { vendorProfile: true, clientProfile: true },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          supabaseAuthUserId,
          email: normalizedEmail,
          fullName: fullName || 'User',
          role: userRole,
          phoneNumber: phoneNumber || null,
        },
        include: { vendorProfile: true, clientProfile: true },
      });
    } else if (user.supabaseAuthUserId !== supabaseAuthUserId) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: { supabaseAuthUserId },
        include: { vendorProfile: true, clientProfile: true },
      });
    }

    if (userRole === UserRole.VENDOR && !user.vendorProfile) {
      const bizName = businessName?.trim() || `${user.fullName} Studio`;
      const baseSlug = bizName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') || 'vendor-studio';
      const slug = `${baseSlug}-${Date.now().toString(36)}`;

      const rawCat = (category || 'PHOTOGRAPHY').toUpperCase();
      const validCategory = (Object.values(CategoryType) as string[]).includes(rawCat)
        ? (rawCat as CategoryType)
        : CategoryType.PHOTOGRAPHY;

      await prisma.vendorProfile.create({
        data: {
          userId: user.id,
          businessName: bizName,
          slug,
          category: validCategory,
          city: city || 'Mumbai',
          startingPrice: BigInt(5000000),
          verified: false, // Explicitly unverified until Admin approves!
          featured: false,
        },
      });
    } else if (userRole === UserRole.CLIENT && !user.clientProfile) {
      await prisma.clientProfile.create({
        data: {
          userId: user.id,
          location: city || null,
          phone: phoneNumber || null,
        },
      });
    }

    return apiResponse.success({
      message: 'Account provisioned successfully for admin verification',
      userId: user.id,
      verified: false,
    });
  } catch (err) {
    console.error('Registration provisioning error:', err);
    return apiResponse.handleError(err);
  }
}
