import { Budget, Expense, PaymentStatus, Prisma } from '@prisma/client';
import { prisma } from '@/lib/prisma';
import {
  CreateBudgetInput,
  UpdateBudgetInput,
  CreateExpenseInput,
  UpdateExpenseInput,
} from '@/lib/validation/budget';
import { BudgetResponse, BudgetSummaryResponse, ExpenseResponse } from '@/lib/api/types';
import { ConflictError, NotFoundError } from '@/lib/errors';
import { parsePaise } from '@/lib/utils/bigint';

export class BudgetService {
  /**
   * Transforms a Prisma Budget record into a clean BudgetResponse DTO.
   */
  public formatBudgetResponse(budget: Budget): BudgetResponse {
    return {
      id: budget.id,
      weddingId: budget.weddingId,
      category: budget.category,
      allocatedAmount: budget.allocatedAmount.toString(),
      spentAmount: budget.spentAmount.toString(),
      notes: budget.notes,
      createdAt: budget.createdAt,
      updatedAt: budget.updatedAt,
    };
  }

  /**
   * Transforms a Prisma Expense record into a clean ExpenseResponse DTO.
   */
  public formatExpenseResponse(expense: Expense): ExpenseResponse {
    const formattedDueDate = expense.paymentDueDate
      ? expense.paymentDueDate instanceof Date
        ? expense.paymentDueDate.toISOString().split('T')[0]
        : String(expense.paymentDueDate).split('T')[0]
      : null;

    return {
      id: expense.id,
      weddingId: expense.weddingId,
      budgetId: expense.budgetId,
      vendorName: expense.vendorName,
      category: expense.category,
      amount: expense.amount.toString(),
      paidAmount: expense.paidAmount.toString(),
      paymentDueDate: formattedDueDate,
      status: expense.status,
      notes: expense.notes,
      createdAt: expense.createdAt,
      updatedAt: expense.updatedAt,
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
   * Lists all budget category allocations and summary for a client-owned wedding.
   */
  public async getBudgetSummaryForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<{ items: BudgetResponse[]; summary: BudgetSummaryResponse }> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const [budgets, expenses] = await Promise.all([
      prisma.budget.findMany({
        where: {
          weddingId,
          wedding: { clientId: clientProfileId },
        },
        orderBy: { createdAt: 'asc' },
      }),
      prisma.expense.findMany({
        where: {
          weddingId,
          wedding: { clientId: clientProfileId },
        },
      }),
    ]);

    let totalAllocatedPaise = BigInt(0);
    let totalSpentPaise = BigInt(0);

    for (const b of budgets) {
      totalAllocatedPaise += b.allocatedAmount;
      totalSpentPaise += b.spentAmount;
    }

    let totalExpensesAmountPaise = BigInt(0);
    let totalPaidAmountPaise = BigInt(0);

    for (const e of expenses) {
      totalExpensesAmountPaise += e.amount;
      totalPaidAmountPaise += e.paidAmount;
    }

    const remainingPaise = totalAllocatedPaise - totalSpentPaise;

    const summary: BudgetSummaryResponse = {
      totalAllocated: totalAllocatedPaise.toString(),
      totalSpent: totalSpentPaise.toString(),
      totalExpensesAmount: totalExpensesAmountPaise.toString(),
      totalPaidAmount: totalPaidAmountPaise.toString(),
      remainingBudget: remainingPaise.toString(),
    };

    return {
      items: budgets.map((b) => this.formatBudgetResponse(b)),
      summary,
    };
  }

  /**
   * Fetches a single budget category allocation by ID for a client-owned wedding.
   */
  public async getBudgetForClientWedding(params: {
    weddingId: string;
    budgetId: string;
    clientProfileId: string;
  }): Promise<BudgetResponse> {
    const { weddingId, budgetId, clientProfileId } = params;

    const budget = await prisma.budget.findFirst({
      where: {
        id: budgetId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
    });

    if (!budget) {
      throw new NotFoundError('Budget category record not found');
    }

    return this.formatBudgetResponse(budget);
  }

  /**
   * Creates a new budget category allocation for a client-owned wedding.
   */
  public async createBudgetForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateBudgetInput;
  }): Promise<BudgetResponse> {
    const { weddingId, clientProfileId, input } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const allocatedAmountPaise =
      input.allocatedAmount !== undefined ? parsePaise(input.allocatedAmount) : BigInt(0);
    const spentAmountPaise = input.spentAmount !== undefined ? parsePaise(input.spentAmount) : BigInt(0);

    try {
      const budget = await prisma.budget.create({
        data: {
          weddingId,
          category: input.category,
          allocatedAmount: allocatedAmountPaise,
          spentAmount: spentAmountPaise,
          notes: input.notes ?? null,
        },
      });

      return this.formatBudgetResponse(budget);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('A budget entry for this category already exists in this wedding');
      }
      throw error;
    }
  }

  /**
   * Updates an existing budget category allocation for a client-owned wedding.
   */
  public async updateBudgetForClientWedding(params: {
    weddingId: string;
    budgetId: string;
    clientProfileId: string;
    input: UpdateBudgetInput;
  }): Promise<BudgetResponse> {
    const { weddingId, budgetId, clientProfileId, input } = params;

    const existing = await prisma.budget.findFirst({
      where: {
        id: budgetId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
    });

    if (!existing) {
      throw new NotFoundError('Budget category record not found');
    }

    const updateData: Prisma.BudgetUpdateInput = {};

    if (input.category !== undefined) updateData.category = input.category;
    if (input.allocatedAmount !== undefined)
      updateData.allocatedAmount = parsePaise(input.allocatedAmount);
    if (input.spentAmount !== undefined) updateData.spentAmount = parsePaise(input.spentAmount);
    if (input.notes !== undefined) updateData.notes = input.notes;

    try {
      const updated = await prisma.budget.update({
        where: { id: budgetId },
        data: updateData,
      });

      return this.formatBudgetResponse(updated);
    } catch (error) {
      if (
        error instanceof Prisma.PrismaClientKnownRequestError &&
        error.code === 'P2002'
      ) {
        throw new ConflictError('A budget entry for this category already exists in this wedding');
      }
      throw error;
    }
  }

  /**
   * Lists all expenses for a client-owned wedding.
   */
  public async listExpensesForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
  }): Promise<ExpenseResponse[]> {
    const { weddingId, clientProfileId } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    const expenses = await prisma.expense.findMany({
      where: {
        weddingId,
        wedding: { clientId: clientProfileId },
      },
      orderBy: [{ paymentDueDate: 'asc' }, { createdAt: 'desc' }],
    });

    return expenses.map((e) => this.formatExpenseResponse(e));
  }

  /**
   * Fetches a single expense by ID for a client-owned wedding.
   */
  public async getExpenseForClientWedding(params: {
    weddingId: string;
    expenseId: string;
    clientProfileId: string;
  }): Promise<ExpenseResponse> {
    const { weddingId, expenseId, clientProfileId } = params;

    const expense = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
    });

    if (!expense) {
      throw new NotFoundError('Expense record not found');
    }

    return this.formatExpenseResponse(expense);
  }

  /**
   * Creates a new expense for a client-owned wedding.
   */
  public async createExpenseForClientWedding(params: {
    weddingId: string;
    clientProfileId: string;
    input: CreateExpenseInput;
  }): Promise<ExpenseResponse> {
    const { weddingId, clientProfileId, input } = params;
    await this.verifyWeddingOwnership(weddingId, clientProfileId);

    // If budgetId is provided, verify that the budget belongs to the same wedding
    if (input.budgetId) {
      const budget = await prisma.budget.findFirst({
        where: {
          id: input.budgetId,
          weddingId,
          wedding: { clientId: clientProfileId },
        },
      });

      if (!budget) {
        throw new NotFoundError('Associated budget category not found in this wedding');
      }
    }

    const amountPaise = parsePaise(input.amount);
    const paidAmountPaise = input.paidAmount !== undefined ? parsePaise(input.paidAmount) : BigInt(0);
    const dueDateObj = input.paymentDueDate ? new Date(input.paymentDueDate) : null;

    const expense = await prisma.expense.create({
      data: {
        weddingId,
        budgetId: input.budgetId ?? null,
        vendorName: input.vendorName,
        category: input.category,
        amount: amountPaise,
        paidAmount: paidAmountPaise,
        paymentDueDate: dueDateObj,
        status: input.status ?? PaymentStatus.PENDING,
        notes: input.notes ?? null,
      },
    });

    return this.formatExpenseResponse(expense);
  }

  /**
   * Updates an existing expense for a client-owned wedding.
   */
  public async updateExpenseForClientWedding(params: {
    weddingId: string;
    expenseId: string;
    clientProfileId: string;
    input: UpdateExpenseInput;
  }): Promise<ExpenseResponse> {
    const { weddingId, expenseId, clientProfileId, input } = params;

    const existing = await prisma.expense.findFirst({
      where: {
        id: expenseId,
        weddingId,
        wedding: { clientId: clientProfileId },
      },
    });

    if (!existing) {
      throw new NotFoundError('Expense record not found');
    }

    if (input.budgetId !== undefined && input.budgetId !== null) {
      const budget = await prisma.budget.findFirst({
        where: {
          id: input.budgetId,
          weddingId,
          wedding: { clientId: clientProfileId },
        },
      });

      if (!budget) {
        throw new NotFoundError('Associated budget category not found in this wedding');
      }
    }

    const updateData: Prisma.ExpenseUpdateInput = {};

    if (input.budgetId !== undefined) updateData.budget = input.budgetId ? { connect: { id: input.budgetId } } : { disconnect: true };
    if (input.vendorName !== undefined) updateData.vendorName = input.vendorName;
    if (input.category !== undefined) updateData.category = input.category;
    if (input.amount !== undefined) updateData.amount = parsePaise(input.amount);
    if (input.paidAmount !== undefined) updateData.paidAmount = parsePaise(input.paidAmount);
    if (input.paymentDueDate !== undefined)
      updateData.paymentDueDate = input.paymentDueDate ? new Date(input.paymentDueDate) : null;
    if (input.status !== undefined) updateData.status = input.status;
    if (input.notes !== undefined) updateData.notes = input.notes;

    const updated = await prisma.expense.update({
      where: { id: expenseId },
      data: updateData,
    });

    return this.formatExpenseResponse(updated);
  }
}

export const budgetService = new BudgetService();
