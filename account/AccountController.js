const AccountDAO = require('./AccountDAO');
const accountDAO = new AccountDAO();
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');
const {integer} = require('twilio/lib/base/deserialize');


module.exports = class AccountController {

    async createAccount(account) {
        const hashRounds = integer(process.env.HASH_ROUNDS);
        account.hashedPassword = await bcrypt.hash(account.hashedPassword, hashRounds);
        const loadedAccount = await accountDAO.createAccount(account);
        if (process.env.EMAIL_SENDER === '') {
            return account;
        }
        await sendRegistrationMail(account.emailAddress, account.hashedPassword).catch(error => {
            throw new Error(error.message);
        });
        return loadedAccount;
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
