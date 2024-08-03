class ExpressError extends Error {
    constructor(message, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;

        // Capture the stack trace if available
        // if (Error.captureStackTrace) {
        //     Error.captureStackTrace(this, this.constructor);
        // }
    }
}

module.exports = ExpressError;
