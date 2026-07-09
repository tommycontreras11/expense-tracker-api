import { Between } from "typeorm";
import AppDataSource from "../database/data-source.js";
import { ExpenseEntity } from "../database/entities/expense.entity.js";
import { UserEntity } from "../database/entities/user.entity.js";
import {
  CreateExpenseDTO,
  UpdateExpenseDTO,
} from "../modules/expense/expense.dto.js";

const entity = AppDataSource.getRepository(ExpenseEntity);

export const expenseRepository = {
  findAll(userUuid: string) {
    return entity.find({
      where: {
        user: { uuid: userUuid },
      },
      relations: { user: true },
    });
  },

  findBetweenDates(userUuid: string, start: string, end: string) {
    return entity.find({
      where: {
        user: { uuid: userUuid },
        expense_date: Between(start, end),
      },
      relations: { user: true },
    });
  },

  findByUuidAndUserUuid(uuid: string, userUuid: string) {
    return entity.findOne({
      where: { uuid, user: { uuid: userUuid } },
      relations: { user: true },
    });
  },

  create({ ...payload }: CreateExpenseDTO, user: UserEntity) {
    const expense = entity.create({ ...payload, user });
    return entity.save(expense);
  },

  update(uuid: string, payload: UpdateExpenseDTO) {
    return entity.update(
      { uuid },
      {
        ...(payload.title && { title: payload.title }),
        ...(payload.description && { description: payload.description }),
        ...(payload.amount && { amount: payload.amount }),
        ...(payload.category && { category: payload.category }),
        ...(payload.expense_date && { expense_date: payload.expense_date }),
      },
    );
  },

  remove(expense: ExpenseEntity) {
    return entity.softRemove(expense);
  },
};
