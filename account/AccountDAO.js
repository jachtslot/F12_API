const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
const { v4: uuidv4 } = require('uuid');

module.exports = class AccountDAO {

    static createAccount(account) {
        const query = `
            INSERT INTO account (id, username, email_address, hashed_password)
            VALUES ($1, $2, $3, $4);
        `;
        const values = [
            uuidv4(),
            account.username,
            account.emailAddress,
            account.hashedPassword
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }

    static deleteAccount(emailAddress) {
        const query = `
            DELETE FROM account
            WHERE email_address = ($1);
        `;
        const values = [
            emailAddress
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }

    static async getAllAccounts() {
        const query = `
            SELECT *
            FROM account;
        `

        return PostgreSQLAdapter.executeQuery(query);
    }
}
