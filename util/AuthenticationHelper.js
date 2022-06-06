const Account = require('../account/Account');
const jwt = require('jsonwebtoken');
module.exports = class AuthenticationHelper {

    static parseBody(event) {
        let body = JSON.parse(event.body);
        const email = body.email_address;
        const password = body.hashed_password;
        return {email, password};
    }


    static createUserFromData(data) {
        if (!data.length > 0) {
            throw new Error("No account connected to that emailaddress", 401)
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

    static generateToken(account) {
        return jwt.sign(
            {
                id: account.id,
                email: account.emailAddress
            },
            process.env.JWT_SECRET, {
                expiresIn: '1h'
            }
        )
    }
}
