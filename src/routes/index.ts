import { Router } from "express";
import apiRoutes from "./api/index.js";
import rootRoutes from "./root/index.js";

const router = Router();

router.use("/", rootRoutes);
router.use("/api", apiRoutes);

export default router;
