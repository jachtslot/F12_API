require('dotenv').config();
const bcrypt = require('bcryptjs');

const AuthenticationDAO = require('./AuthenticationDAO');
const authenticationDAO = new AuthenticationDAO();
const AuthenticationHelper = require('../util/AuthenticationHelper');

module.exports = class AuthenticationController {

    async login(credentials) {
        let loadedAccount;
        return await authenticationDAO.loginAccount(credentials)
            .then(data => {
                loadedAccount = AuthenticationHelper.createUserFromData(data);
                return bcrypt.compare(credentials.password, loadedAccount.hashed_password);
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
