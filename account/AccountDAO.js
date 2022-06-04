const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');

module.exports = class AccountDAO {

    static createAccount(account) {
        const query = `
            INSERT INTO account (id, username, email_address, hashed_password)
            VALUES ($1, $2, $3, $4);
        `;
        const values = [
            account.id,
            account.username,
            account.emailAddress,
            account.hashedPassword
        ];

        return PostgreSQLAdapter.executeQuery({query, values});
    }

    static deleteAccount(emailAddress) {
        const query = `
            DELETE FROM account
            WHERE email_address = ($1);
        `;
        const values = [
            emailAddress
        ];

        return PostgreSQLAdapter.executeQuery({query, values});
    }
}
