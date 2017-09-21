"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RedSightError extends Error {
    constructor(message) {
        super();
        this.name = "RegSightError";
        Object.setPrototypeOf(this, RedSightError.prototype);
        if (message)
            this.message = message;
        this.httpCode = 500;
        this.stack = new Error().stack;
    }
}
exports.RedSightError = RedSightError;
//# sourceMappingURL=RedSightError.js.map