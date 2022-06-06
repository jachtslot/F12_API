const AccountDAO = require('./AccountDAO');
const Account = require('./Account');
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');


module.exports = class AccountController {

    static async createAccount(event) {
        let responseBody = JSON.parse(event.body);
        const username = responseBody.username;
        const email = responseBody.email_address;
        const password = responseBody.hashed_password;

        const hashedAccount = await bcrypt.hash(password, 12).then(hashedPw => {
            return new Account(null, username, email, hashedPw);
        });
        return await AccountDAO.createAccount(hashedAccount)
            .then(() => sendRegistrationMail(email, password))
            .then(() => {
                const response =  {
                    'id': hashedAccount.id,
                    'username': hashedAccount.username,
                    'email_address': hashedAccount.emailAddress
                };

                return {
                    statusCode: 201,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "http://localhost:4200",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(response)
                }
            }).catch(error => {
                return {
                    statusCode: 500,
                    body: error
                }
            });
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
