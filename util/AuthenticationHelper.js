const Account = require('../account/Account');
const jwt = require('jsonwebtoken');
const AuthenticationDAO = require('../authentication/AuthenticationDAO');
const authenticationDAO = new AuthenticationDAO();
module.exports = class AuthenticationHelper {

    static parseBody(event) {
        console.log(event);
        let body = JSON.parse(event.body);
        const email = body.email_address;
        const password = body.hashed_password;
        const origin = body.origin;
        console.log(email, password, origin)
        return {email, password, origin};
    }


    static createUserFromData(data) {
        if (!data.
            length > 0) {
            throw new Error("No account connected to that emailaddress");
        } else {
            data = data[0];
            return new Account(
                data.id,
                data.username,
                data.email_address,
                data.hashed_password
            );
        }
    }

    static async getUserRole(account) {
        let role;
        await authenticationDAO.getAccountRole(account).then(res => {
            if (res[0]) {
                role = 'admin';
            } else {
                role = 'user';
            }
        }).catch(error => {
            throw error;
        })

        return role;
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
        let token = event.headers['Authorization'].split(' ')[1];
        if (!token) {
            const error = new Error('Not authenticated');
            error.statusCode = 401;
            throw error;
        }
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.JWT_SECRET );
        } catch (err) {
            err.statusCode = 500;
            throw err;
        }
        if (!decodedToken) {
            const error = new Error('Not authenticated')
            error.statusCode = 401;
            throw error;
        }
        return decodedToken;

    }
}
