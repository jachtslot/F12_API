const AccountDAO = require('./AccountDAO');
const accountDAO = new AccountDAO();
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');


module.exports = class AccountController {

    async createAccount(account) {
        account.hashedPassword = await bcrypt.hash(account.hashedPassword, 12);
        await accountDAO.createAccount(account);

        if (this.emailServiceEnabled()) {
            sendRegistrationMail(account.emailAddress, account.hashedPassword).catch(error => {
                throw new Error(error.message);
            });
        }

        return account;
    }

    emailServiceEnabled() {
        return process.env.EMAIL_SENDER !== '';
    }

    async deleteAccount(emailAddress) {
        return accountDAO.deleteAccount(emailAddress);
    }

    async getAllAccounts() {
        return accountDAO.getAllAccounts().then(accounts => {
            accounts.forEach(account => {
                delete account.hashed_password
            });
            return accounts;
        });
    }

    async getAccount(id) {
        return this.getAllAccounts().then(accounts => {
            return accounts.filter(account => account.id === id);
        })
    }
}
