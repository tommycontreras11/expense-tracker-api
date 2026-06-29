import { Request, Response, Router } from "express";
import { StatusCode } from "../../constants/status-code.js";

const router = Router()

router.get("/health", (req: Request, res: Response) => {
    return res.status(StatusCode.OK).json({ healthy: true })
})

export default router