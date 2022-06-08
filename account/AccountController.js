const AccountDAO = require('./AccountDAO');
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');


module.exports = class AccountController {

    static async createAccount(account) {
        await bcrypt.hash(account.hashedPassword, 12).then(hashedPw => {
            account.hashedPassword = hashedPw;
            return account;
        });
        return await AccountDAO.createAccount(account)
            .then(() => {
                if (process.env.EMAIL_SENDER === '') {
                    return account;
                }
                sendRegistrationMail(account.emailAddress, account.hashedPassword).catch(error => {
                    throw new Error(error.message);
                })
                return account;
            })
    }

    static async deleteAccount(emailAddress) {
        return AccountDAO.deleteAccount(emailAddress);
    }

    static async getAllAccounts() {
        return AccountDAO.getAllAccounts().then(accounts => {
            accounts.forEach(account => {
                delete account.hashed_password
            });
            return accounts;
        });
    }

    static async getAccount(id) {
        return this.getAllAccounts().then(accounts => {
            return accounts.filter(account => account.id === id);
        })
    }
}
