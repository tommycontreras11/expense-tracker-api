import { Router } from "express";
import { signUp } from "../../../modules/auth/auth.controller.js";
import { SignUpDTO } from "../../../modules/auth/auth.dto.js";
import { validateDto } from "../../../middlewares/validate-dto.middleware.js";

const router = Router();

router.post("/sign-up", validateDto(SignUpDTO), signUp);

export default router;