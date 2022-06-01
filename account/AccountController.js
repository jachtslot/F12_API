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
            .then(() => sendRegistrationMail(account.emailAddress, account.hashedPassword))
            .then(() => {
                    return {
                        statusCode: 201,
                        headers: {
                            "Access-Control-Allow-Headers": "Content-Type",
                            "Access-Control-Allow-Origin": "http://localhost:4200",
                            "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                        },
                        body: JSON.stringify(data)
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
