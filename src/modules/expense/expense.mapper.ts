// expense.mapper.ts
import { ExpenseEntity } from "../../database/entities/expense.entity.js";

export const expenseMapper = {
  toResponse(expense: ExpenseEntity) {
    return {
      uuid: expense.uuid,
      title: expense.title,
      description: expense.description,
      amount: expense.amount,
      category: expense.category,
      expense_date: expense.expense_date,
    };
  },

  toResponseList(expenses: ExpenseEntity[]) {
    return expenses.map(this.toResponse);
  },
};