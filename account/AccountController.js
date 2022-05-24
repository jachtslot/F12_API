const AccountDAO = require('./AccountDAO');
const Account = require('./Account');

module.exports = class AccountController {

    static async createAccount(responseBody) {
        const account = new Account(
            responseBody.username,
            responseBody.emailAddress,
            responseBody.hashedPassword
        );

        return AccountDAO.createAccount(account);
    }
}
