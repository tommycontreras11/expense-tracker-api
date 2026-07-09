import { Router } from "express";
import authRoutes from "./auth/index.js"
import expenseRoutes from "./expense/index.js"
import { validateAuth } from "../../middlewares/auth.middleware.js";

const router = Router()

router.use("/auth", authRoutes)
router.use("/expenses", validateAuth, expenseRoutes)

export default router