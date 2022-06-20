module.exports = class AccountNotPresentError extends Error {
    constructor(message) {
        super(message);
        this.name = 'AccountNotPresentError';
    }
}
