import { Request, Response } from "express";
import { expenseService } from "./expense.service.js";
import { StatusCode } from "../../constants/status-code.js";

export const createExpenseController = async (req: Request, res: Response) => {
  const expense = await expenseService.create(req.body, req.user!.sub);

  const data = {
    uuid: expense.uuid,
    title: expense.title,
    description: expense?.description,
    amount: expense.amount,
    category: expense.category,
  };

  return res.status(StatusCode.CREATED).json({ data });
};
