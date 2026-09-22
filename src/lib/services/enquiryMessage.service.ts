import { EnquiryMessage, UserRole } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreateEnquiryMessageInput } from '@/lib/validation/enquiryMessage';
import { EnquiryMessageResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';

export class EnquiryMessageService {
  /**
   * Transforms a Prisma EnquiryMessage record into a clean EnquiryMessageResponse DTO.
   */
  public formatEnquiryMessageResponse(message: EnquiryMessage): EnquiryMessageResponse {
    return {
      id: message.id,
      enquiryId: message.enquiryId,
      senderId: message.senderId,
      message: message.message,
      sentAt: message.sentAt,
    };
  }

  /**
   * Asserts that the authenticated user is a participant of the enquiry (either client owner of the wedding or vendor owner).
   * Throws NotFoundError if enquiry is missing or user is not a participant.
   */
  public async verifyEnquiryParticipantAccess(params: {
    enquiryId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<void> {
    const { enquiryId, userId, userRole, clientProfileId } = params;

    const enquiry = await prisma.vendorEnquiry.findUnique({
      where: { id: enquiryId },
      include: {
        wedding: { select: { clientId: true } },
        vendor: { select: { userId: true } },
      },
    });

    if (!enquiry) {
      throw new NotFoundError('Enquiry not found');
    }

    let isParticipant = false;

    if (userRole === UserRole.CLIENT && clientProfileId) {
      isParticipant = enquiry.wedding.clientId === clientProfileId;
    } else if (userRole === UserRole.VENDOR) {
      isParticipant = enquiry.vendor.userId === userId;
    }

    if (!isParticipant) {
      throw new NotFoundError('Enquiry not found');
    }
  }

  /**
   * Lists all messages for an enquiry, verified for participant access.
   */
  public async listMessagesForEnquiry(params: {
    enquiryId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
  }): Promise<EnquiryMessageResponse[]> {
    const { enquiryId, userId, userRole, clientProfileId } = params;
    await this.verifyEnquiryParticipantAccess({ enquiryId, userId, userRole, clientProfileId });

    const messages = await prisma.enquiryMessage.findMany({
      where: { enquiryId },
      orderBy: [{ sentAt: 'asc' }, { id: 'asc' }],
    });

    return messages.map((m) => this.formatEnquiryMessageResponse(m));
  }

  /**
   * Appends a new message to an enquiry, verified for participant access.
   */
  public async createMessageForEnquiry(params: {
    enquiryId: string;
    userId: string;
    userRole: UserRole;
    clientProfileId?: string;
    input: CreateEnquiryMessageInput;
  }): Promise<EnquiryMessageResponse> {
    const { enquiryId, userId, userRole, clientProfileId, input } = params;
    await this.verifyEnquiryParticipantAccess({ enquiryId, userId, userRole, clientProfileId });

    const createdMessage = await prisma.enquiryMessage.create({
      data: {
        enquiryId,
        senderId: userId,
        message: input.message,
      },
    });

    return this.formatEnquiryMessageResponse(createdMessage);
  }
}

export const enquiryMessageService = new EnquiryMessageService();
