const AccountDAO = require('./AccountDAO');
const accountDAO = new AccountDAO();
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');
const ValidationError = require('./ValidationError');
const AccountNotFoundError = require('./AccountNotFoundError');


module.exports = class AccountController {

    async createAccount(account) {
        account.hashed_password = await this.createHashedPassword(account);
        await accountDAO.createAccount(account);

        if (this.emailServiceEnabled()) {
            sendRegistrationMail(account.emailAddress, account.hashed_password).catch(error => {
                throw new Error(error.message);
            });
        }

        return account;
    }

    async changePassword(account, oldPassword, newPassword) {
        const existingAccount = await this.getAccountWithPassword(account.id);

        if (existingAccount === undefined) {
            throw new AccountNotFoundError('account not found in database');
        }

        const correctPassword = await bcrypt.compare(oldPassword, existingAccount.hashed_password);
        if (!correctPassword) {
            throw new ValidationError('old password is not correct');
        }

        account.hashed_password = newPassword;
        account.hashed_password = await this.createHashedPassword(account);
        await accountDAO.changePassword(account);
    }

    async createHashedPassword(account) {
        return await bcrypt.hash(account.hashed_password, 12);
    }

    emailServiceEnabled() {
        return process.env.EMAIL_SENDER !== '';
    }

    async changeAccountName(id, newName) {
        const existingAccount = await this.getAccount(id);

        if (existingAccount === undefined) {
            throw new AccountNotFoundError('account not found in database');
        }

        await accountDAO.changeAccountName(id, newName);
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
