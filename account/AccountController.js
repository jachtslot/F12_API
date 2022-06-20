const AccountDAO = require('./AccountDAO');
const accountDAO = new AccountDAO();
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');
const ValidationError = require('./ValidationError');
const AccountNotFoundError = require('./AccountNotFoundError');


module.exports = class AccountController {

    async createAccount(account) {
        account.hashedPassword = await this.createHashedPassword(account);
        await accountDAO.createAccount(account);

        if (this.emailServiceEnabled()) {
            sendRegistrationMail(account.emailAddress, account.hashedPassword).catch(error => {
                throw new Error(error.message);
            });
        }

        return account;
    }

    async changePassword(account, oldPassword, newPassword) {
        account.hashedPassword = await this.createHashedPassword(account);
        const existingAccount = await this.getAccountWithPassword(account.id);

        if (existingAccount === undefined) {
            throw new AccountNotFoundError('account not found in database');
        }

        if (await bcrypt.compare(oldPassword, existingAccount.hashed_password)) {
            throw new ValidationError('old password is not correct');
        }

        account.hashed_password = newPassword;
        await accountDAO.changePassword(account);
    }

    createHashedPassword(account) {
        return bcrypt.hash(account.hashedPassword, 12);
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
            return accounts.filter(account => account.id === id)[0];
        });
    }

    async getAccountWithPassword(id) {
        return accountDAO.getAllAccounts().then(accounts => {
            return accounts.filter(account => account.id === id)[0];
        });
    }
}
