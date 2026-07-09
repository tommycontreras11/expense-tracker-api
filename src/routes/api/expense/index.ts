import { Router } from "express";
import { validateDto } from "../../../middlewares/validate-dto.middleware.js";
import { CreateExpenseDTO } from "../../../modules/expense/expense.dto.js";
import {
  createExpenseController,
  deleteExpenseController,
  getOneByUuidExpenseController,
  updateExpenseController,
} from "../../../modules/expense/expense.controller.js";

const router = Router();

router.get("/:uuid", getOneByUuidExpenseController);
router.post("/", validateDto(CreateExpenseDTO), createExpenseController);
router.patch("/:uuid", updateExpenseController);
router.delete("/:uuid", deleteExpenseController);

export default router;
