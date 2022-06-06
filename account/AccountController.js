const AccountDAO = require('./AccountDAO');
const Account = require('./Account');
const sendRegistrationMail = require('../util/EmailHelper');


module.exports = class AccountController {

    static async createAccount(event) {
        let responseBody = JSON.parse(event.body);
        const account = new Account(
            responseBody.username,
            responseBody.email_address,
            responseBody.hashed_password
        );

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
}
