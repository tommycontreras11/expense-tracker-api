import { NotFoundException } from "../../exceptions/not-found.exception.js";
import { expenseRepository } from "../../repositories/expense.repository.js";
import { userRepository } from "../../repositories/user.repository.js";
import { CreateExpenseDTO } from "./expense.dto.js";

export const expenseService = {
  async create(payload: CreateExpenseDTO, userUuid: string) {
    const user = await userRepository.findByUuid(userUuid);

    if (!user) {
      throw new NotFoundException("User not found.");
    }

    return await expenseRepository.create(payload, user);
  },
};
