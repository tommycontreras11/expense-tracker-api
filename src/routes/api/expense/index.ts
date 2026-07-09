import { Router } from "express";
import { validateDto } from "../../../middlewares/validate-dto.middleware.js";
import { CreateExpenseDTO } from "../../../modules/expense/expense.dto.js";
import {
  createExpenseController,
  deleteExpenseController,
} from "../../../modules/expense/expense.controller.js";

const router = Router();

router.post("/", validateDto(CreateExpenseDTO), createExpenseController);
router.delete("/:uuid", deleteExpenseController);

export default router;
