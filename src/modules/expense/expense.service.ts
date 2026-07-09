import { ExpenseEntity } from "../../database/entities/expense.entity.js";
import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { expenseRepository } from "../../repositories/expense.repository.js";
import { userRepository } from "../../repositories/user.repository.js";
import { CreateExpenseDTO } from "./expense.dto.js";

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
  async create(payload: CreateExpenseDTO, userUuid: string) {
    const user = await userRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return await expenseRepository.create(payload, user);
  },

  async delete(uuid: string, userUuid: string) {
    const expense = await getUserExpenseOrThrow(uuid, userUuid)

    await expenseRepository.remove(expense)

    return { message: "Expense deleted successfully" }
  }
};
