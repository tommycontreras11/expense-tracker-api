import AppDataSource from "../database/data-source.js";
import { ExpenseEntity } from "../database/entities/expense.entity.js";
import { UserEntity } from "../database/entities/user.entity.js";
import { CreateExpenseDTO } from "../modules/expense/expense.dto.js";

const entity = AppDataSource.getRepository(ExpenseEntity);

export const expenseRepository = {
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

  remove(expense: ExpenseEntity) {
    return entity.softRemove(expense)
  }
};
