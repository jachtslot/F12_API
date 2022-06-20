require('dotenv').config();
const bcrypt = require('bcryptjs');

const AuthenticationDAO = require('./AuthenticationDAO');
const authenticationDAO = new AuthenticationDAO();
const AuthenticationHelper = require('../util/AuthenticationHelper');
const InvalidCredentialsError = require('./InvalidCredentialsError');
const InvalidRoleError = require('./InvalidRoleError');

module.exports = class AuthenticationController {

    async login(credentials) {
        let loadedAccount;
        const accountFromDatabase =  await authenticationDAO.loginAccount(credentials);
        loadedAccount = AuthenticationHelper.createAccountFromData(accountFromDatabase);

        const correctCredentials = await bcrypt.compare(credentials.password, loadedAccount.hashed_password);

        if(!correctCredentials) {
            throw new InvalidCredentialsError("Invalid credentials")
        }
        const role = await AuthenticationHelper.getUserRole(loadedAccount);
        const token = await AuthenticationHelper.generateToken(loadedAccount, role);
        if (credentials.origin === process.env.PORTAL_ORIGIN) {
            if (role !== 'admin') {
                throw new InvalidRoleError('User is not authorized for this site.')
            }
        }
        return {loadedAccount, token};
    }
}
