const Account = require('../../account/Account');
const PostgreSqlAdapter = require('../../util/PostgreSQLAdapter');
const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const AuthenticationController = require('../../authentication/AuthenticationController');
const authenticationController = new AuthenticationController();

module.exports = class AuthenticationHelper {


    static async createTestAccount(isAdmin) {
        const account = new Account(null, 'testUser', 'testUser@hotmail.com', 'Wachtwoord');
        await accountController.createAccount(account)
        if (isAdmin) {
            const query = `INSERT INTO admin (account_id) VALUES ($1)`
            const values = [account.id];
            await PostgreSqlAdapter.executeQueryWithValues(query, values);
        }
        return account;
    }

    static async getJwtToken(account, origin) {
        const loginEvent = {
            email: account.emailAddress,
            password: 'Wachtwoord',
            origin: origin
        }
        return await authenticationController.login(loginEvent);
    }
}
