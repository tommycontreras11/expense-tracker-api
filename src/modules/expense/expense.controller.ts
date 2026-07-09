import { Request, Response } from "express";
import { expenseService } from "./expense.service.js";
import { StatusCode } from "../../constants/status-code.js";
import { expenseMapper } from "./expense.mapper.js";

export const getAllExpenseController = async (req: Request, res: Response) => {
  const expenses = await expenseService.list(req.user!.sub, req.query);

  return res.status(StatusCode.OK).json({ data: expenseMapper.toResponseList(expenses) });
};

export const getOneByUuidExpenseController = async (
  req: Request,
  res: Response,
) => {
  const { uuid } = req.params as { uuid: string };

  const expense = await expenseService.getUserExpenseByUuid(
    uuid,
    req.user!.sub,
  );

  return res.status(StatusCode.OK).json({ data: expenseMapper.toResponse(expense) });
};

export const createExpenseController = async (req: Request, res: Response) => {
  const expense = await expenseService.create(req.user!.sub, req.body);

  return res.status(StatusCode.CREATED).json({ data: expenseMapper.toResponse(expense) });
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
