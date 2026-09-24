import { NotificationType, PaymentTransaction, Prisma, TransactionType, UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreatePaymentTransactionInput } from '@/lib/validation/paymentTransaction';
import { PaymentTransactionResponse } from '@/lib/api/types';
import { ConflictError, NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';
import { paymentService } from '@/lib/services/payment.service';
import { notificationService } from '@/lib/services/notification.service';
import { activityLogService } from '@/lib/services/activityLog.service';

export class PaymentTransactionService {
  /**
   * Transforms a Prisma PaymentTransaction record into a clean PaymentTransactionResponse DTO.
   */
  public formatPaymentTransactionResponse(t: PaymentTransaction): PaymentTransactionResponse {
    return {
      id: t.id,
      paymentId: t.paymentId,
      transactionRef: t.transactionRef,
      amount: t.amount.toString(),
      paymentMethod: t.paymentMethod,
      type: t.type,
      gatewayProvider: t.gatewayProvider,
      gatewayTransactionId: t.gatewayTransactionId,
      notes: t.notes,
      transactedAt: t.transactedAt,
    };
  }

  /**
   * Generates a unique transaction reference code (e.g. "TXN-9M2K7L").
   */
  private generateTransactionRef(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = 'TXN-';
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  /**
   * Lists all transactions for a payment milestone.
   */
  public async listTransactionsForPayment(params: {
    bookingId: string;
    weddingId?: string;
    paymentId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<PaymentTransactionResponse[]> {
    const { bookingId, weddingId, paymentId, userId, userRole, clientProfileId } = params;
    await paymentService.verifyPaymentParticipantAccess({
      bookingId,
      weddingId,
      paymentId,
      userId,
      userRole,
      clientProfileId,
    });

    const transactions = await prisma.paymentTransaction.findMany({
      where: { paymentId },
      orderBy: [{ transactedAt: 'desc' }, { id: 'desc' }],
    });

    return transactions.map((t) => this.formatPaymentTransactionResponse(t));
  }

  /**
   * Gets a single payment transaction by ID.
   */
  public async getTransactionForPayment(params: {
    bookingId: string;
    weddingId?: string;
    paymentId: string;
    transactionId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<PaymentTransactionResponse> {
    const { bookingId, weddingId, paymentId, transactionId, userId, userRole, clientProfileId } = params;
    await paymentService.verifyPaymentParticipantAccess({
      bookingId,
      weddingId,
      paymentId,
      userId,
      userRole,
      clientProfileId,
    });

    const transaction = await prisma.paymentTransaction.findFirst({
      where: {
        id: transactionId,
        paymentId,
      },
    });

    if (!transaction) {
      throw new NotFoundError('Payment transaction record not found');
    }

    return this.formatPaymentTransactionResponse(transaction);
  }

  /**
   * Creates a new payment transaction against a payment milestone.
   * Atomic Prisma transaction updates Payment.status and Booking.paidAmount.
   */
  public async createTransactionForPayment(params: {
    bookingId: string;
    weddingId?: string;
    paymentId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: CreatePaymentTransactionInput;
  }): Promise<PaymentTransactionResponse> {
    const { bookingId, weddingId, paymentId, userId, userRole, clientProfileId, input } = params;
    const payment = await paymentService.verifyPaymentParticipantAccess({
      bookingId,
      weddingId,
      paymentId,
      userId,
      userRole,
      clientProfileId,
    });

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      select: {
        referenceCode: true,
        vendor: { select: { userId: true } },
        wedding: { include: { client: { select: { userId: true } } } },
      },
    });

    if (!booking) {
      throw new NotFoundError('Booking not found');
    }

    const amountPaise = parsePaise(input.amount);
    const transactionRef = input.transactionRef?.trim() || this.generateTransactionRef();
    const type = input.type ?? TransactionType.PAYMENT;

    const recipientUserId =
      userRole === UserRole.CLIENT ? booking.vendor.userId : booking.wedding.client.userId;
    const recipientLinkUrl =
      userRole === UserRole.CLIENT ? '/vendor/dashboard/payments' : '/dashboard/wedding';
    const oldPaymentStatus = payment.status;

    try {
      const createdTx = await prisma.$transaction(
        async (tx) => {
        const created = await tx.paymentTransaction.create({
          data: {
            paymentId,
            transactionRef,
            amount: amountPaise,
            paymentMethod: input.paymentMethod,
            type,
            gatewayProvider: input.gatewayProvider ?? null,
            gatewayTransactionId: input.gatewayTransactionId ?? null,
            notes: input.notes ?? null,
          },
        });

        await paymentService.recalculatePaymentAndBookingTotals(tx, paymentId, bookingId);

        const updatedPayment = await tx.payment.findUnique({
          where: { id: paymentId },
          select: { status: true },
        });

        const newStatus = updatedPayment?.status ?? oldPaymentStatus;

        await notificationService.createNotification({
          userId: recipientUserId,
          type: NotificationType.PAYMENT,
          title: type === TransactionType.REFUND ? 'Refund Transaction Recorded' : 'Payment Transaction Recorded',
          message: `A ${type === TransactionType.REFUND ? 'refund' : 'payment'} transaction of ₹${(Number(amountPaise) / 100).toFixed(2)} was recorded for booking ${booking.referenceCode}. Milestone status: ${newStatus}.`,
          linkUrl: recipientLinkUrl,
          tx,
        });

        await activityLogService.logActivity({
          userId,
          action: type === TransactionType.REFUND ? 'PAYMENT_REFUND_RECORDED' : 'PAYMENT_TRANSACTION_RECORDED',
          entityType: 'PaymentTransaction',
          entityId: created.id,
          metadata: {
            amount: amountPaise.toString(),
            paymentId,
            oldStatus: oldPaymentStatus,
            newStatus,
            type,
          },
          tx,
        });

        return created;
      }, { maxWait: 10000, timeout: 30000 });

      return this.formatPaymentTransactionResponse(createdTx);
    } catch (error) {
      const errCode = (error as { code?: string })?.code;
      if (errCode === 'P2002' || (error instanceof Prisma.PrismaClientKnownRequestError && error.code === 'P2002')) {
        throw new ConflictError('A payment transaction with this reference code already exists');
      }
      throw error;
    }
  }
}

export const paymentTransactionService = new PaymentTransactionService();
