module.exports = class InvalidAccountNameError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidAccountNameError';
    }
}
