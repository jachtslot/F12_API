module.exports = class InvalidCredentialsError extends Error {
    constructor(message) {
        super(message);
    }
}
