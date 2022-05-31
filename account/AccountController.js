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

        return await AccountDAO.createAccount(account).then(
            () => sendRegistrationMail(account.emailAddress, account.hashedPassword)).then(
                () => {
                return {
                   statusCode: 200,
                   body: 'A new account is created'
                }
        }).catch(error => {
            return {
                statusCode: 500,
                body: error.message
            }
        });
    }

    static async deleteAccount(emailAddress) {
        return AccountDAO.deleteAccount(emailAddress);
    }
}
