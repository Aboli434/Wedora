/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from '@/lib/prisma';
import { AttendanceStatus, BookingStatus, CategoryType, EnquiryStatus, PaymentStatus, ReviewStatus, UserRole } from '@prisma/client';
import { parsePaise } from '@/lib/utils/bigint';
import { reviewService } from '@/lib/services/review.service';

export interface TestFixtures {
  clientUserA: Record<string, any>;
  clientProfileA: Record<string, any>;
  weddingA: Record<string, any>;
  weddingEventA: Record<string, any>;
  guestA: Record<string, any>;
  taskA: Record<string, any>;
  budgetItemA: Record<string, any>;
  expenseA: Record<string, any>;
  enquiryA: Record<string, any>;
  bookingA: Record<string, any>;
  bookingServiceA: Record<string, any>;
  bookingEventA: Record<string, any>;
  paymentA: Record<string, any>;
  paymentTxA: Record<string, any>;
  reviewA: Record<string, any>;

  clientUserB: Record<string, any>;
  clientProfileB: Record<string, any>;
  weddingB: Record<string, any>;

  vendorUserA: Record<string, any>;
  vendorProfileA: Record<string, any>;

  vendorUserB: Record<string, any>;
  vendorProfileB: Record<string, any>;
  vendorServiceB: Record<string, any>;
  vendorPortfolioB: Record<string, any>;
  vendorMediaB: Record<string, any>;
  vendorAvailabilityB: Record<string, any>;
}

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delayMs = 1500): Promise<T> {
  let lastErr: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: unknown) {
      lastErr = err;
      if (i < retries - 1) {
        await new Promise((res) => setTimeout(res, delayMs));
      }
    }
  }
  throw lastErr;
}

export async function cleanDatabase() {
  try {
    await withRetry(async () => {
      const testUsers = await prisma.user.findMany({
        where: { email: { startsWith: 'test-' } },
        select: { id: true },
      });

      if (testUsers.length === 0) return;

      await prisma.$executeRawUnsafe(`
        DO $$ 
        BEGIN
          DELETE FROM payment_transactions WHERE "paymentId" IN (SELECT id FROM payments WHERE "bookingId" IN (SELECT id FROM bookings WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'))));
          DELETE FROM payments WHERE "bookingId" IN (SELECT id FROM bookings WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM reviews WHERE "authorId" IN (SELECT id FROM users WHERE email LIKE 'test-%') OR "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'));
          DELETE FROM booking_services WHERE "bookingId" IN (SELECT id FROM bookings WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM booking_events WHERE "bookingId" IN (SELECT id FROM bookings WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM bookings WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')) OR "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM enquiry_messages WHERE "enquiryId" IN (SELECT id FROM vendor_enquiries WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM vendor_enquiries WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')) OR "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM notifications WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%');
          DELETE FROM activity_logs WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%');
          DELETE FROM expenses WHERE "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM budgets WHERE "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM guests WHERE "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM checklist_tasks WHERE "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM wedding_events WHERE "weddingId" IN (SELECT id FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%')));
          DELETE FROM weddings WHERE "clientId" IN (SELECT id FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'));
          DELETE FROM vendor_services WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'));
          DELETE FROM vendor_portfolio_items WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'));
          DELETE FROM media_assets WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'));
          DELETE FROM vendor_availabilities WHERE "vendorId" IN (SELECT id FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%'));
          DELETE FROM client_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%');
          DELETE FROM vendor_profiles WHERE "userId" IN (SELECT id FROM users WHERE email LIKE 'test-%');
          DELETE FROM users WHERE email LIKE 'test-%';
        END $$;
      `);
    });
  } catch {
    // Ignore cleanup error
  }
}

export async function createTestFixtures(): Promise<TestFixtures> {
  return await withRetry(async () => {
    await cleanDatabase();

    const timestamp = Date.now();
    const randomSegment = Math.floor(Math.random() * 0xffff).toString(16).padStart(4, '0');
    const uuidPrefix = (id: string) => `00000000-${randomSegment}-4000-8000-${id.padStart(12, '0')}`;

  // Client A
  const clientUserA = await prisma.user.create({
    data: {
      supabaseAuthUserId: uuidPrefix(`111111111111`),
      email: `test-client-a-${timestamp}-${randomSegment}@example.com`,
      fullName: 'Client Alice',
      role: UserRole.CLIENT,
      isActive: true,
      clientProfile: {
        create: {},
      },
    },
    include: { clientProfile: true },
  });
  const clientProfileA = clientUserA.clientProfile!;

  // Client B
  const clientUserB = await prisma.user.create({
    data: {
      supabaseAuthUserId: uuidPrefix(`222222222222`),
      email: `test-client-b-${timestamp}-${randomSegment}@example.com`,
      fullName: 'Client Bob',
      role: UserRole.CLIENT,
      isActive: true,
      clientProfile: {
        create: {},
      },
    },
    include: { clientProfile: true },
  });
  const clientProfileB = clientUserB.clientProfile!;

  // Vendor A
  const vendorUserA = await prisma.user.create({
    data: {
      supabaseAuthUserId: uuidPrefix(`333333333333`),
      email: `test-vendor-a-${timestamp}-${randomSegment}@example.com`,
      fullName: 'Vendor Alex',
      role: UserRole.VENDOR,
      isActive: true,
      vendorProfile: {
        create: {
          businessName: 'Alex Photography',
          slug: `alex-photo-${timestamp}-${randomSegment}`,
          category: CategoryType.PHOTOGRAPHY,
          city: 'Mumbai',
          startingPrice: parsePaise('10000'),
        },
      },
    },
    include: { vendorProfile: true },
  });
  const vendorProfileA = vendorUserA.vendorProfile!;

  // Vendor B
  const vendorUserB = await prisma.user.create({
    data: {
      supabaseAuthUserId: uuidPrefix(`444444444444`),
      email: `test-vendor-b-${timestamp}-${randomSegment}@example.com`,
      fullName: 'Vendor Bella',
      role: UserRole.VENDOR,
      isActive: true,
      vendorProfile: {
        create: {
          businessName: 'Bella Catering',
          slug: `bella-cater-${timestamp}-${randomSegment}`,
          category: CategoryType.CATERING,
          city: 'Delhi',
          startingPrice: parsePaise('20000'),
        },
      },
    },
    include: { vendorProfile: true },
  });
  const vendorProfileB = vendorUserB.vendorProfile!;

  // Vendor B resources
  const vendorServiceB = await prisma.vendorService.create({
    data: {
      vendorId: vendorProfileB.id,
      name: 'Royal Buffet Service',
      price: parsePaise('50000'),
    },
  });

  const vendorPortfolioB = await prisma.vendorPortfolioItem.create({
    data: {
      vendorId: vendorProfileB.id,
      title: 'Royal Feast Showcase',
      coverUrl: 'https://example.com/cover.jpg',
    },
  });

  const vendorMediaB = await prisma.mediaAsset.create({
    data: {
      vendorId: vendorProfileB.id,
      caption: 'Buffet Setup Image',
      url: 'https://example.com/media.jpg',
      type: 'IMAGE',
    },
  });

  const vendorAvailabilityB = await prisma.vendorAvailability.create({
    data: {
      vendorId: vendorProfileB.id,
      date: new Date('2026-12-25'),
      isAvailable: true,
    },
  });

  // Wedding A for Client A
  const weddingA = await prisma.wedding.create({
    data: {
      clientId: clientProfileA.id,
      partner1Name: 'Alice',
      partner2Name: 'Aaron',
      title: 'Alice & Aaron Wedding',
      weddingDate: new Date('2026-11-15'),
      location: 'Goa',
      totalBudget: parsePaise('1000000'),
      status: 'PLANNING',
    },
  });

  // Wedding B for Client B
  const weddingB = await prisma.wedding.create({
    data: {
      clientId: clientProfileB.id,
      partner1Name: 'Bob',
      partner2Name: 'Barbara',
      title: 'Bob & Barbara Wedding',
      weddingDate: new Date('2026-12-10'),
      location: 'Udaipur',
      totalBudget: parsePaise('1500000'),
      status: 'PLANNING',
    },
  });

  // Wedding A child entities
  const weddingEventA = await prisma.weddingEvent.create({
    data: {
      weddingId: weddingA.id,
      name: 'Sangeet Ceremony',
      date: new Date('2026-11-14'),
      venue: 'Resort Lawn',
    },
  });

  const guestA = await prisma.guest.create({
    data: {
      weddingId: weddingA.id,
      name: 'Uncle John',
      group: 'Family',
      rsvpStatus: AttendanceStatus.ACCEPTED,
    },
  });

  const taskA = await prisma.checklistTask.create({
    data: {
      weddingId: weddingA.id,
      title: 'Book Music DJ',
      category: 'Music',
      status: 'PENDING',
    },
  });

  const budgetItemA = await prisma.budget.create({
    data: {
      weddingId: weddingA.id,
      category: CategoryType.PHOTOGRAPHY,
      allocatedAmount: parsePaise('200000'),
      spentAmount: parsePaise('50000'),
    },
  });

  const expenseA = await prisma.expense.create({
    data: {
      weddingId: weddingA.id,
      budgetId: budgetItemA.id,
      vendorName: 'Alex Photography',
      category: CategoryType.PHOTOGRAPHY,
      amount: parsePaise('50000'),
      paidAmount: parsePaise('20000'),
      status: PaymentStatus.PENDING,
    },
  });

  const enquiryA = await prisma.vendorEnquiry.create({
    data: {
      referenceCode: `ENQ-${timestamp.toString().slice(-4)}-${randomSegment}`,
      weddingId: weddingA.id,
      vendorId: vendorProfileA.id,
      eventDate: new Date('2026-11-15'),
      status: EnquiryStatus.NEW,
      message: 'Hello Alex, are you available for our wedding photography?',
      estimatedBudget: parsePaise('200000'),
    },
  });

  const bookingA = await prisma.booking.create({
    data: {
      referenceCode: `BKG-${timestamp.toString().slice(-4)}-${randomSegment}`,
      weddingId: weddingA.id,
      vendorId: vendorProfileA.id,
      status: BookingStatus.COMPLETED,
      totalAmount: parsePaise('200000'),
      advanceAmount: parsePaise('50000'),
      paidAmount: parsePaise('200000'),
    },
  });

  const bookingServiceA = await prisma.bookingService.create({
    data: {
      bookingId: bookingA.id,
      serviceName: 'Full Day Photography',
      unitPrice: parsePaise('150000'),
      quantity: 1,
      totalPrice: parsePaise('150000'),
    },
  });

  const bookingEventA = await prisma.bookingEvent.create({
    data: {
      bookingId: bookingA.id,
      weddingEventId: weddingEventA.id,
      eventName: 'Sangeet Ceremony',
      eventDate: new Date('2026-11-14'),
    },
  });

  const paymentA = await prisma.payment.create({
    data: {
      bookingId: bookingA.id,
      amount: parsePaise('200000'),
      dueDate: new Date('2026-11-01'),
      status: PaymentStatus.PAID,
      milestoneTitle: 'Full Package Payment',
    },
  });

  const paymentTxA = await prisma.paymentTransaction.create({
    data: {
      paymentId: paymentA.id,
      transactionRef: `TXN-${timestamp.toString().slice(-4)}-${randomSegment}`,
      amount: parsePaise('200000'),
      paymentMethod: 'UPI',
      type: 'PAYMENT',
    },
  });

  const reviewA = await prisma.review.create({
    data: {
      bookingId: bookingA.id,
      vendorId: vendorProfileA.id,
      authorId: clientUserA.id,
      rating: 5,
      comment: 'Alex did a magnificent job capturing our wedding memories!',
      status: ReviewStatus.PUBLISHED,
    },
  });

  await reviewService.recalculateVendorRating(prisma, vendorProfileA.id);

  return {
    clientUserA,
    clientProfileA,
    weddingA,
    weddingEventA,
    guestA,
    taskA,
    budgetItemA,
    expenseA,
    enquiryA,
    bookingA,
    bookingServiceA,
    bookingEventA,
    paymentA,
    paymentTxA,
    reviewA,

    clientUserB,
    clientProfileB,
    weddingB,

    vendorUserA,
    vendorProfileA,

    vendorUserB,
    vendorProfileB,
    vendorServiceB,
    vendorPortfolioB,
    vendorMediaB,
    vendorAvailabilityB,
  };
  });
}
