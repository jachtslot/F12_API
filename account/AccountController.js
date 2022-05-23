const AccountDAO = require('./AccountDAO');

module.exports = class AccountController {

    static async createAccount() {
        return AccountDAO.createAccount();
    }
}
