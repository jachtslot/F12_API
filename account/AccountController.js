const AccountDAO = require('./AccountDAO');
const Account = require('./Account');

module.exports = class AccountController {

    static async createAccount() {
        const account = new Account(
            'exampleUsername',
            'exampleEmail',
            'examplePassword'
        );

        return AccountDAO.createAccount(account);
    }
}
