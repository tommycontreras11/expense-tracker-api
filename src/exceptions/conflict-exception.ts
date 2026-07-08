import { StatusCode } from "../constants/status-code.js";
import { HttpException } from "./http.exception.js";

export class ConflictException extends HttpException {
  constructor(message = "Conflict") {
    super(StatusCode.CONFLICT, message);
  }
}
