import { Router } from "express";
import rootRoutes from "./root"

const router = Router()

router.use("/", rootRoutes)

export default router