const AuthenticationDAO = require('./AuthenticationDAO');
const bcrypt = require('bcryptjs');
require('dotenv').config();
const Account = require('../account/Account');
const jwt = require('jsonwebtoken');

module.exports = class AuthenticationController {

    static async login(event) {
        let responseBody = JSON.parse(event.body);
        const email = responseBody.email_address;
        const password = responseBody.hashed_password;
        const credentials = {email, password}
        let loadedAccount;
        return await AuthenticationDAO.loginAccount(credentials).then(data => {

            if (!data.rows[0]) {
                const error = new Error("No account connected to that emailaddress")
                error.statusCode = 401;
                throw error;
            } else {
                data = data.rows[0];
                loadedAccount = new Account(
                    data.id,
                    data.username,
                    data.email_address,
                    data.hashed_password
                )
                return bcrypt.compare(password, loadedAccount.hashedPassword);
            }
        }).then(correctPassword => {
            if (!correctPassword) {
                const error = new Error("Wrong password")
                error.statusCode = 401;
                throw error;
            }
            const token = jwt.sign({id: loadedAccount.id, email: loadedAccount.emailAddress},
                process.env.JWT_SECRET, {expiresIn: '1h'});

            const response = {
                    token: token,
                    id: loadedAccount.id,
                    email_address: loadedAccount.emailAddress,
                    username: loadedAccount.username
                }
            return {
                statusCode: 200,
                headers: {
                    "Access-Control-Allow-Headers": "Content-Type",
                    "Access-Control-Allow-Origin": "http://localhost:4200",
                    "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
                },
                body: JSON.stringify(response)
        }
        }).catch(error => {
            console.log(error)
            return {
                statusCode: 500,
                body: error.message
            }
        });
    }
}
