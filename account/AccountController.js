const AccountDAO = require('./AccountDAO');
const sendRegistrationMail = require('../util/EmailHelper');



module.exports = class AccountController {

    static async createAccount(account) {
        return await AccountDAO.createAccount(account)
            .then(() => {
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
            accounts.rows.forEach(account => {
                delete account.hashed_password
            });

            return accounts;
        });
    }

    static async getAccount(id) {
        return this.getAllAccounts().then(accounts => {
            return accounts.rows.filter(account => account.id === id);
        })
    }
}
