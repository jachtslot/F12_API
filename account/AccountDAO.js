const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
const { v4: uuidv4 } = require('uuid');

module.exports = class AccountDAO {

    static createAccount(account) {
        const query = `
            INSERT INTO account (id, username, email_address, hashed_password)
            VALUES ($1, $2, $3, $4)
        `;
        const values = [
            uuidv4(),
            account.username,
            account.emailAddress,
            account.hashedPassword
        ];

        return PostgreSQLAdapter.executeQuery({query, values});
    }
}
