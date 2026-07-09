import { Request, Response } from "express";
import { expenseService } from "./expense.service.js";
import { StatusCode } from "../../constants/status-code.js";

export const getOneByUuidExpenseController = async (
  req: Request,
  res: Response,
) => {
  const { uuid } = req.params as { uuid: string };

  const expense = await expenseService.getUserExpenseByUuid(
    uuid,
    req.user!.sub,
  );

  const data = {
    uuid: expense.uuid,
    title: expense.title,
    description: expense?.description,
    amount: expense.amount,
    category: expense.category,
  };

  return res.status(StatusCode.OK).json({ data });
};

export const createExpenseController = async (req: Request, res: Response) => {
  const expense = await expenseService.create(req.user!.sub, req.body);

  const data = {
    uuid: expense.uuid,
    title: expense.title,
    description: expense?.description,
    amount: expense.amount,
    category: expense.category,
  };

  return res.status(StatusCode.CREATED).json({ data });
};

export const updateExpenseController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const expense = await expenseService.update(uuid, req.user!.sub, req.body);

  return res.status(StatusCode.OK).json({ data: expense });
};

export const deleteExpenseController = async (req: Request, res: Response) => {
  const { uuid } = req.params as { uuid: string };

  const expense = await expenseService.delete(req.user!.sub, uuid);

  return res.status(StatusCode.OK).json({ data: expense });
};
