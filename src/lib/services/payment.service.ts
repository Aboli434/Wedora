import { Payment, PaymentStatus, Prisma, TransactionType, UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreatePaymentInput,
  UpdatePaymentInput,
} from '@/lib/validation/payment';
import { PaymentResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';
import { paymentTransactionService } from '@/lib/services/paymentTransaction.service';

export class PaymentService {
  /**
   * Transforms a Prisma Payment record into a clean PaymentResponse DTO.
   */
  public formatPaymentResponse(
    payment: Payment & {
      transactions?: Prisma.PaymentTransactionGetPayload<object>[];
    }
  ): PaymentResponse {
    const formattedDueDate =
      payment.dueDate instanceof Date
        ? payment.dueDate.toISOString().split('T')[0]
        : String(payment.dueDate).split('T')[0];

    return {
      id: payment.id,
      bookingId: payment.bookingId,
      invoiceId: payment.invoiceId,
      amount: payment.amount.toString(),
      dueDate: formattedDueDate,
      status: payment.status,
      milestoneTitle: payment.milestoneTitle,
      createdAt: payment.createdAt,
      updatedAt: payment.updatedAt,
      ...(payment.transactions
        ? {
            transactions: payment.transactions.map((t) =>
              paymentTransactionService.formatPaymentTransactionResponse(t)
            ),
          }
        : {}),
    };
  }

  /**
   * Asserts that the authenticated user is a participant of the booking (either client owner or vendor owner).
   */
  public async verifyBookingParticipantAccess(params: {
    bookingId: string;
    weddingId?: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<{ id: string; weddingId: string; vendorId: string }> {
    const { bookingId, weddingId, userId, userRole, clientProfileId } = params;

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        weddingId: true,
        vendorId: true,
        wedding: { select: { clientId: true } },
        vendor: { select: { userId: true } },
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    if (weddingId && booking.weddingId !== weddingId) {
      throw new NotFoundError('Booking not found');
    }

    let isParticipant = false;

    if (userRole === UserRole.CLIENT && clientProfileId) {
      isParticipant = booking.wedding.clientId === clientProfileId;
    } else if (userRole === UserRole.VENDOR) {
      isParticipant = booking.vendor.userId === userId;
    }

    if (!isParticipant) {
      throw new NotFoundError('Booking not found');
    }

    return {
      id: booking.id,
      weddingId: booking.weddingId,
      vendorId: booking.vendorId,
    };
  }

  /**
   * Asserts that a Payment milestone belongs to a Booking and caller is authorized participant.
   */
  public async verifyPaymentParticipantAccess(params: {
    bookingId: string;
    weddingId?: string;
    paymentId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<Payment> {
    const { bookingId, weddingId, paymentId, userId, userRole, clientProfileId } = params;
    await this.verifyBookingParticipantAccess({ bookingId, weddingId, userId, userRole, clientProfileId });

    const payment = await prisma.payment.findFirst({
      where: {
        id: paymentId,
        bookingId,
      },
      include: {
        transactions: true,
      },
    });

    if (!payment) {
      throw new NotFoundError('Payment milestone not found');
    }

    return payment;
  }

  /**
   * Recalculates payment status and booking paidAmount after transaction mutations.
   * Runs atomically inside a Prisma transaction context.
   */
  public async recalculatePaymentAndBookingTotals(
    tx: Prisma.TransactionClient,
    paymentId: string,
    bookingId: string
  ): Promise<void> {
    const payment = await tx.payment.findUnique({
      where: { id: paymentId },
      include: { transactions: true },
    });

    if (!payment) return;

    let netPaymentPaise = BigInt(0);
    for (const t of payment.transactions) {
      if (t.type === TransactionType.REFUND) {
        netPaymentPaise -= t.amount;
      } else {
        netPaymentPaise += t.amount;
      }
    }

    let derivedStatus: PaymentStatus = PaymentStatus.PENDING;

    if (netPaymentPaise <= BigInt(0)) {
      const now = new Date();
      if (payment.dueDate < now) {
        derivedStatus = PaymentStatus.OVERDUE;
      } else {
        derivedStatus = PaymentStatus.PENDING;
      }
    } else if (netPaymentPaise < payment.amount) {
      derivedStatus = PaymentStatus.PARTIAL;
    } else {
      derivedStatus = PaymentStatus.PAID;
    }

    await tx.payment.update({
      where: { id: paymentId },
      data: { status: derivedStatus },
    });

    // Recalculate Booking.paidAmount across all payment transactions for the booking
    const allBookingPayments = await tx.payment.findMany({
      where: { bookingId },
      include: { transactions: true },
    });

    let totalBookingPaidPaise = BigInt(0);
    for (const p of allBookingPayments) {
      for (const t of p.transactions) {
        if (t.type === TransactionType.REFUND) {
          totalBookingPaidPaise -= t.amount;
        } else {
          totalBookingPaidPaise += t.amount;
        }
      }
    }

    if (totalBookingPaidPaise < BigInt(0)) {
      totalBookingPaidPaise = BigInt(0);
    }

    await tx.booking.update({
      where: { id: bookingId },
      data: { paidAmount: totalBookingPaidPaise },
    });
  }

  /**
   * Lists all payment milestones for a booking.
   */
  public async listPaymentsForBooking(params: {
    bookingId: string;
    weddingId?: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<PaymentResponse[]> {
    const { bookingId, weddingId, userId, userRole, clientProfileId } = params;
    await this.verifyBookingParticipantAccess({ bookingId, weddingId, userId, userRole, clientProfileId });

    const payments = await prisma.payment.findMany({
      where: { bookingId },
      include: { transactions: true },
      orderBy: [{ dueDate: 'asc' }, { id: 'asc' }],
    });

    return payments.map((p) => this.formatPaymentResponse(p));
  }

  /**
   * Gets a single payment milestone by ID.
   */
  public async getPaymentForBooking(params: {
    bookingId: string;
    weddingId?: string;
    paymentId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<PaymentResponse> {
    const payment = await this.verifyPaymentParticipantAccess(params);
    return this.formatPaymentResponse(payment);
  }

  /**
   * Creates a new payment milestone for a booking.
   */
  public async createPaymentForBooking(params: {
    bookingId: string;
    weddingId?: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: CreatePaymentInput;
  }): Promise<PaymentResponse> {
    const { bookingId, weddingId, userId, userRole, clientProfileId, input } = params;
    await this.verifyBookingParticipantAccess({ bookingId, weddingId, userId, userRole, clientProfileId });

    if (input.invoiceId) {
      const invoice = await prisma.invoice.findFirst({
        where: { id: input.invoiceId, bookingId },
        select: { id: true },
      });
      if (!invoice) {
        throw new NotFoundError('Referenced invoice not found for this booking');
      }
    }

    const amountPaise = parsePaise(input.amount);
    const dueDateObj = new Date(input.dueDate);

    const createdPayment = await prisma.payment.create({
      data: {
        bookingId,
        invoiceId: input.invoiceId ?? null,
        amount: amountPaise,
        dueDate: dueDateObj,
        status: input.status ?? PaymentStatus.PENDING,
        milestoneTitle: input.milestoneTitle ?? null,
      },
      include: {
        transactions: true,
      },
    });

    return this.formatPaymentResponse(createdPayment);
  }

  /**
   * Updates an existing payment milestone.
   */
  public async updatePaymentForBooking(params: {
    bookingId: string;
    weddingId?: string;
    paymentId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: UpdatePaymentInput;
  }): Promise<PaymentResponse> {
    const { bookingId, paymentId, input } = params;
    await this.verifyPaymentParticipantAccess(params);

    if (input.invoiceId) {
      const invoice = await prisma.invoice.findFirst({
        where: { id: input.invoiceId, bookingId },
        select: { id: true },
      });
      if (!invoice) {
        throw new NotFoundError('Referenced invoice not found for this booking');
      }
    }

    const updateData: Prisma.PaymentUpdateInput = {};

    if (input.amount !== undefined) updateData.amount = parsePaise(input.amount);
    if (input.dueDate !== undefined) updateData.dueDate = new Date(input.dueDate);
    if (input.status !== undefined) updateData.status = input.status;
    if (input.milestoneTitle !== undefined) updateData.milestoneTitle = input.milestoneTitle;
    if (input.invoiceId !== undefined) updateData.invoice = input.invoiceId ? { connect: { id: input.invoiceId } } : { disconnect: true };

    const updatedPayment = await prisma.payment.update({
      where: { id: paymentId },
      data: updateData,
      include: { transactions: true },
    });

    return this.formatPaymentResponse(updatedPayment);
  }
}

export const paymentService = new PaymentService();
