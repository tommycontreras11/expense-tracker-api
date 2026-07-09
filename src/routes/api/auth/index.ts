import { Router } from "express";
import { signIn, signUp } from "../../../modules/auth/auth.controller.js";
import { SignInDTO, SignUpDTO } from "../../../modules/auth/auth.dto.js";
import { validateDto } from "../../../middlewares/validate-dto.middleware.js";

const router = Router();

router.post("/sign-up", validateDto(SignUpDTO), signUp);
router.post("/sign-in", validateDto(SignInDTO), signIn);

export default router;