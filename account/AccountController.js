const AccountDAO = require('./AccountDAO');
const Account = require('./Account');
const sendRegistrationMail = require('../util/EmailHelper');


module.exports = class AccountController {

    static async createAccount(responseBody) {

        const account = new Account(
            responseBody.username,
            responseBody.email_address,
            responseBody.hashed_password
        );

        return await AccountDAO.createAccount(account).then( () => {
             return sendRegistrationMail(account.emailAddress, account.hashedPassword).then().catch(err => {
                 return new Error('An occurred trying to send the email');
            })
        });
    }

    static async deleteAccount(emailAddress) {
        return AccountDAO.deleteAccount(emailAddress);
    }
}
