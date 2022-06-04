require('dotenv').config();
const bcrypt = require('bcryptjs');

const AuthenticationDAO = require('./AuthenticationDAO');
const AuthenticationHelper = require('../util/AuthenticationHelper');

module.exports = class AuthenticationController {

    static async login(event) {
        let loadedAccount;
        const credentials = AuthenticationHelper.parseBody(event);

        return await AuthenticationDAO.loginAccount(credentials)
            .then(data => {
                loadedAccount = AuthenticationHelper.createUserFromData(data);
                return bcrypt.compare(credentials.password, loadedAccount.hashedPassword);
            })
            .then(correctPassword => {
                if (!correctPassword) {
                    throw new Error("Wrong password", 401);
                }
                const token = AuthenticationHelper.generateToken(loadedAccount);

                return {
                    statusCode: 200,
                    headers: {
                        "Access-Control-Allow-Headers": "Content-Type",
                        "Access-Control-Allow-Origin": "http://localhost:4200",
                        "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                    },
                    body: JSON.stringify(
                        {
                            token: token,
                            id: loadedAccount.id,
                            email_address: loadedAccount.emailAddress,
                            username: loadedAccount.username
                        })
                }
            }).catch(error => {
                return {
                    statusCode: 500,
                    body: error.message
                }
            });
    }
}
