export class RedSightError extends Error {
    httpCode: number;
    name = "RegSightError";

    constructor(message: string) {
        super();

        Object.setPrototypeOf(this, RedSightError.prototype);
        if (message)
            this.message = message;
        this.httpCode = 500;
        this.stack = new Error().stack;
    }
}