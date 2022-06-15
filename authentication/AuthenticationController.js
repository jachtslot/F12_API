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
                return bcrypt.compare(credentials.password, loadedAccount.hashedPassword);
            })
            .then(async correctPassword => {
                if (!correctPassword) {
                    throw new Error("Wrong password");
                }
                const role = await AuthenticationHelper.getUserRole(loadedAccount);
                const token = await AuthenticationHelper.generateToken(loadedAccount, role);
                if (!(credentials.origin === process.env.PORTAL_ORIGIN && role === 'admin')) {
                    throw new Error('User is not authorized for this site.')
                }
                return {loadedAccount, token};
            });
    }
}
