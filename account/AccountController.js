const AccountDAO = require('./AccountDAO');
const accountDAO = new AccountDAO();
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');


module.exports = class AccountController {

    async createAccount(account) {
        account = await bcrypt.hash(account.hashedPassword, 12).then(hashedPw => {
            account.hashedPassword = hashedPw;
            return account;
        });
        return await accountDAO.createAccount(account)
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
