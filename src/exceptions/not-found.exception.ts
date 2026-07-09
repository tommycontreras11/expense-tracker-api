import { StatusCode } from "../constants/status-code.js";
import { HttpException } from "./http.exception.js";

export class NotFoundException extends HttpException {
    constructor(message = "NotFound") {
        super(StatusCode.NOT_FOUND, message);
    }
}