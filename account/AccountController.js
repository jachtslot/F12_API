const AccountDAO = require('./AccountDAO');
const Account = require('./Account');
const sendRegistrationMail = require('../util/EmailHelper');
const bcrypt = require('bcryptjs');


module.exports = class AccountController {

    static async createAccount(event) {
        let responseBody = JSON.parse(event.body);
        // const responseBody = {username : 'test', email_address : 's1127893@student.hsleiden.nl', hashed_password: 'aisdhgwquydgiuqwdhk'}
        const username = responseBody.username;
        const email = responseBody.email_address;
        const password = responseBody.hashed_password;

        const hashedAccount = await bcrypt.hash(password, 12).then(hashedPw => {
            console.log('1')
            return new Account(username, email, hashedPw);
        });
        console.log('2')

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
}
