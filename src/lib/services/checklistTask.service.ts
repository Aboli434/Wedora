import { ChecklistTask, Prisma, TaskPriority, TaskStatus } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import { CreateChecklistTaskInput, UpdateChecklistTaskInput } from '@/lib/validation/checklistTask';
import { ChecklistTaskResponse } from '@/lib/api/types';
import { NotFoundError } from '@/lib/errors';

export class ChecklistTaskService {
  /**
   * Transforms a Prisma ChecklistTask record into a clean ChecklistTaskResponse DTO.
   */
  public formatChecklistTaskResponse(task: ChecklistTask): ChecklistTaskResponse {
    const formattedDueDate = task.dueDate
      ? task.dueDate instanceof Date
        ? task.dueDate.toISOString().split('T')[0]
        : String(task.dueDate).split('T')[0]
      : null;

    return {
      id: task.id,
      weddingId: task.weddingId,
      title: task.title,
      category: task.category,
      dueDate: formattedDueDate,
      priority: task.priority,
      status: task.status,
      assignedTo: task.assignedTo,
      notes: task.notes,
      createdAt: task.createdAt,
      updatedAt: task.updatedAt,
    };
  }

  /**
   * Asserts that parent Wedding exists and belongs to the specified client profile.
   * Throws NotFoundError if wedding is missing or owned by another client.
   */
  public async verifyWeddingOwnership(weddingId: string, clientProfileId: string): Promise<void> {
    const wedding = await prisma.wedding.findFirst({
      where: {
        id: weddingId,
        clientId: clientProfileId,
      },
      select: { id: true },
    });

    if (!wedding) {
      throw new NotFoundError('Wedding not found');
    }
  }

  /**
   * Lists all checklist tasks for a specific wedding owned by the client.
   */
  public async listChecklistTasksForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<ChecklistTaskResponse[]> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const tasks = await prisma.checklistTask.findMany({
      where: {
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
      orderBy: [
        { dueDate: 'asc' },
        { createdAt: 'asc' },
      ],
    });

    return tasks.map((t) => this.formatChecklistTaskResponse(t));
  }

  /**
   * Fetches a single checklist task by ID for a specific client-owned wedding.
   */
  public async getChecklistTaskForClientWedding(params: {
    weddingId: string;
    taskId: string;
    clientProfileId: string;
  }): Promise<ChecklistTaskResponse> {
    const { weddingId, taskId, clientProfileId } = params;

    const task = await prisma.checklistTask.findFirst({
      where: {
        id: taskId,
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
    });

    if (!task) {
      throw new NotFoundError('Checklist task not found');
    }

    return this.formatChecklistTaskResponse(task);
  }

  /**
   * Creates a new checklist task for a client-owned wedding.
   */
  public async createChecklistTaskForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateChecklistTaskInput;
  }): Promise<ChecklistTaskResponse> {
    const { weddingId, clientProfileId, input } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const dueDateObj = input.dueDate ? new Date(input.dueDate) : null;

    const createdTask = await prisma.checklistTask.create({
      data: {
        weddingId,
        title: input.title,
        category: input.category,
        dueDate: dueDateObj,
        priority: input.priority ?? TaskPriority.MEDIUM,
        status: input.status ?? TaskStatus.PENDING,
        assignedTo: input.assignedTo ?? null,
        notes: input.notes ?? null,
      },
    });

    return this.formatChecklistTaskResponse(createdTask);
  }

  /**
   * Updates an existing checklist task for a client-owned wedding.
   */
  public async updateChecklistTaskForClientWedding(params: {
    weddingId: string;
    taskId: string;
    clientProfileId: string;
    input: UpdateChecklistTaskInput;
  }): Promise<ChecklistTaskResponse> {
    const { weddingId, taskId, clientProfileId, input } = params;

    // Verify task ownership
    const existing = await prisma.checklistTask.findFirst({
      where: {
        id: taskId,
        weddingId,
        wedding: {
          clientId: clientProfileId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundError('Checklist task not found');
    }

    const updateData: Prisma.ChecklistTaskUpdateInput = {};

    if (input.title !== undefined) updateData.title = input.title;
    if (input.category !== undefined) updateData.category = input.category;
    if (input.dueDate !== undefined) updateData.dueDate = input.dueDate ? new Date(input.dueDate) : null;
    if (input.priority !== undefined) updateData.priority = input.priority;
    if (input.status !== undefined) updateData.status = input.status;
    if (input.assignedTo !== undefined) updateData.assignedTo = input.assignedTo;
    if (input.notes !== undefined) updateData.notes = input.notes;

    const updatedTask = await prisma.checklistTask.update({
      where: { id: taskId },
      data: updateData,
    });

    return this.formatChecklistTaskResponse(updatedTask);
  }
}

export const checklistTaskService = new ChecklistTaskService();
