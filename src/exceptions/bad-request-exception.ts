import { StatusCode } from "../constants/status-code.js";
import { HttpException } from "./http.exception.js";

export class BadRequestException extends HttpException {
  constructor(message = "Bad Request", details?: unknown) {
    super(StatusCode.BAD_REQUEST, message, details);
  }
}
