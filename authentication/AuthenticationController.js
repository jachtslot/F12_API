require('dotenv').config();
const bcrypt = require('bcryptjs');

const AuthenticationDAO = require('./AuthenticationDAO');
const AuthenticationHelper = require('../util/AuthenticationHelper');

module.exports = class AuthenticationController {

    static async login(credentials) {
        let loadedAccount;
        return await AuthenticationDAO.loginAccount(credentials)
            .then(data => {
                loadedAccount = AuthenticationHelper.createUserFromData(data);
                return bcrypt.compare(credentials.password, loadedAccount.hashedPassword);
            })
            .then(correctPassword => {
                if (!correctPassword) {
                    throw new Error("Wrong password");
                }
                const token = AuthenticationHelper.generateToken(loadedAccount);
                return {loadedAccount, token};
            });
    }
}
