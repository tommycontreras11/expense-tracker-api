export class HttpException extends Error {
    constructor(public readonly status: number, 
        message: string,
        public readonly details?: unknown
    ) {
        super(message)
        this.name = this.constructor.name

        Error.captureStackTrace?.(this, this.constructor)
    }
}