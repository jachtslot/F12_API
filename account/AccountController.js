const AccountDAO = require('./AccountDAO');
const accountDAO = new AccountDAO();
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');
const AccountNotFoundError = require('./AccountNotFoundError');
const InvalidAccountNameError = require("./InvalidAccountNameError");
const SimpleEmailServiceError = require('./SimpleEmailServiceError');

module.exports = class AccountController {

    async createAccount(account) {
        account.hashed_password = await this.createHashedPassword(account);
        await accountDAO.createAccount(account);

        if (this.emailServiceEnabled()) {
            await sendRegistrationMail(account.emailAddress, account.hashed_password).catch( () => {
                throw new SimpleEmailServiceError('Unable to send email through SES');
            });
        }

        return account;
    }

    async changePassword(account, oldPassword, newPassword) {
        const existingAccount = await this.getAccountWithPassword(account.id);

        if (existingAccount === undefined) {
            throw new AccountNotFoundError('account not found in database');
        }

        account.hashed_password = newPassword;
        account.hashed_password = await this.createHashedPassword(account);
        await accountDAO.changePassword(account);
    }

    async createHashedPassword(account) {
        const hashRounds = parseInt(process.env.HASH_ROUNDS);
        return await bcrypt.hash(account.hashed_password, hashRounds);
    }

    emailServiceEnabled() {
        return process.env.EMAIL_SENDER !== '';
    }

    async changeAccountName(id, newName) {
        const existingAccount = await this.getAccount(id);

        if (existingAccount === undefined) {
            throw new AccountNotFoundError('account not found in database');
        }

        if (newName === undefined || newName === null || newName.length === 0) {
            throw new InvalidAccountNameError('new name cannot be empty');
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
