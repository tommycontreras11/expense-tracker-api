import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/http.exception.js";
import { StatusCode } from "../constants/status-code.js";

export const errorMiddleware = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err instanceof HttpException) {
    return res.status(err.status).json({
      error: {
        message: err.message,
        details: err.details,
      },
    });
  }

  if (err instanceof SyntaxError && "body" in err) {
    return res.status(StatusCode.BAD_REQUEST).json({
      error: {
        message: "Invalid JSON payload.",
      },
    });
  }

  return res.status(StatusCode.INTERNAL_SERVER_ERROR).json({
    error: {
      message: "Internal Server Error",
    },
  });
};
