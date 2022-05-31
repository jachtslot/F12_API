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

        return AccountDAO.createAccount(account).then( () => {
            sendRegistrationMail(account.emailAddress, account.hashedPassword).then( res => {
                console.log(res);
            }).catch(err => {
                console.log(err)
            })
        }).catch(error => {
            console.log(error);
        });
    }

    static async deleteAccount(emailAddress) {
        return AccountDAO.deleteAccount(emailAddress);
    }
}
