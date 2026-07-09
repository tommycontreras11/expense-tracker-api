import { StatusCode } from "../constants/status-code.js";
import { HttpException } from "./http.exception.js";

export class UnauthorizedException extends HttpException {
    constructor(message = "Unauthorized") {
        super(StatusCode.UNAUTHORIZED, message)
    }
}