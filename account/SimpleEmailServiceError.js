module.exports = class SimpleEmailServiceError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SimpleEmailServiceError';
    }
}
