import { ExpenseEntity } from "../../database/entities/expense.entity.js";
import { ExpenseFilterEnum } from "../../enums/expense-filter.enum.js";
import { BadRequestException } from "../../exceptions/bad-request-exception.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { expenseRepository } from "../../repositories/expense.repository.js";
import { userRepository } from "../../repositories/user.repository.js";
import { formatDate } from "../../utils/date.util.js";
import {
  CreateExpenseDTO,
  GetExpensesQueryDTO,
  UpdateExpenseDTO,
} from "./expense.dto.js";

const getUserExpenseOrThrow = async (
  expenseUuid: string,
  userUuid: string,
): Promise<ExpenseEntity> => {
  const expense = await expenseRepository.findByUuidAndUserUuid(
    expenseUuid,
    userUuid,
  );

  if (!expense) {
    throw new NotFoundException("Expense not found.");
  }

  return expense;
};

export const expenseService = {
  async list(userUuid: string, query: GetExpensesQueryDTO) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    switch (query.filter) {
      case ExpenseFilterEnum.PAST_WEEK: {
        const startDate = new Date(today);
        startDate.setDate(startDate.getDate() - 7);

        return expenseRepository.findBetweenDates(
          userUuid,
          formatDate(startDate),
          formatDate(today),
        );
      }

      case ExpenseFilterEnum.PAST_MONTH: {
        const startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - 1);

        return expenseRepository.findBetweenDates(
          userUuid,
          formatDate(startDate),
          formatDate(today),
        );
      }

      case ExpenseFilterEnum.LAST_THREE_MONTHS: {
        const startDate = new Date(today);
        startDate.setMonth(startDate.getMonth() - 3);

        return expenseRepository.findBetweenDates(
          userUuid,
          formatDate(startDate),
          formatDate(today),
        );
      }

      case ExpenseFilterEnum.CUSTOM: {
        if (!query.start || !query.end) {
          throw new BadRequestException(
            "The 'start' and 'end' dates are required.",
          );
        }

        return expenseRepository.findBetweenDates(
          userUuid,
          query.start,
          query.end,
        );
      }
    }

    return expenseRepository.findAll(userUuid);
  },

  async getUserExpenseByUuid(uuid: string, userUuid: string) {
    return await getUserExpenseOrThrow(uuid, userUuid);
  },

  async create(userUuid: string, payload: CreateExpenseDTO) {
    const user = await userRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return await expenseRepository.create(payload, user);
  },

  async update(uuid: string, userUuid: string, payload: UpdateExpenseDTO) {
    await getUserExpenseOrThrow(uuid, userUuid);

    await expenseRepository.update(uuid, payload);

    return { message: "Expense updated successfully" };
  },

  async delete(uuid: string, userUuid: string) {
    const expense = await getUserExpenseOrThrow(uuid, userUuid);

    await expenseRepository.remove(expense);

    return { message: "Expense deleted successfully" };
  },
};
