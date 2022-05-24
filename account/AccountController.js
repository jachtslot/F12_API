const AccountDAO = require('./AccountDAO');
const Account = require('./Account');

module.exports = class AccountController {

    static async createAccount(responseBody) {
        const account = new Account(
            responseBody.username,
            responseBody.email_address,
            responseBody.hashed_password
        );

        return AccountDAO.createAccount(account);
    }

    static async deleteAccount(emailAddress) {
        return AccountDAO.deleteAccount(emailAddress);
    }
}