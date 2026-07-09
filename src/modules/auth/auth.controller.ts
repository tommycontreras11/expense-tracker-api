import { Request, Response } from "express";
import { authService } from "./auth.service.js";
import { StatusCode } from "../../constants/status-code.js";

export const signUp = async (req: Request, res: Response) => {
  const user = await authService.signUp(req.body);

  const data = {
    uuid: user.uuid,
    name: user.name,
    email: user.email,
  };

  return res.status(StatusCode.CREATED).json({ data });
};

export const signIn = async (req: Request, res: Response) => {
  const token = await authService.signIn(req.body);

  return res.status(StatusCode.OK).json({ data: { token } });
};
