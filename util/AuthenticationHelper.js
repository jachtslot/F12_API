const Account = require('../account/Account');
const jwt = require('jsonwebtoken');
const AuthenticationDAO = require('../authentication/AuthenticationDAO');
const ValidationError = require('../authentication/ValidationError');
const authenticationDAO = new AuthenticationDAO();
module.exports = class AuthenticationHelper {

    static parseBody(event) {
        let body = JSON.parse(event.body);
        const email = body.email_address;
        const password = body.hashed_password;
        const origin = body.origin;
        console.log(email, password, origin)
        return {email, password, origin};
    }


    static createAccountFromData(accountData) {
        const account = accountData[0];
        if (!account) {
            throw new ValidationError('No account connected to that emailaddress');
        }
        return new Account(
            account.id,
            account.username,
            account.email_address,
            account.hashed_password
        );
    }

    static async getUserRole(account) {
        const adminRoles = await authenticationDAO.getAccountRole(account);
        if (!adminRoles[0]) return 'user';
        return 'admin';
    }

    static generateToken(account, role) {

        return jwt.sign(
            {
                id: account.id,
                email: account.emailAddress,
                role: role
            },
            process.env.JWT_SECRET, {
                expiresIn: '1h'
            }
        )
    }

    static hasAdminRole(event) {
        const role = this.verifyToken(event).role;
        return role === 'admin';
    }


    static verifyToken(event) {
        event = JSON.parse(event)
        let token = event.headers['Authorization'].split(' ')[1];
        if (!token) {
            throw new ValidationError('No authorization token present');
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
        if (!decodedToken) {
            throw new ValidationError('Invalid authorization token');
        }
        return decodedToken;

    }
}
