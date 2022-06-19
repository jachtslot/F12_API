const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');

module.exports = class AccountDAO {

    createAccount(account) {
        const INSERT_NEW_ACCOUNT = `
            INSERT INTO public.account (id, username, email_address, hashed_password)
            VALUES ($1, $2, $3, $4);
        `;
        const values = [
            account.id,
            account.username,
            account.emailAddress,
            account.hashedPassword
        ];
        return PostgreSQLAdapter.executeQueryWithValues(INSERT_NEW_ACCOUNT, values);
    }

    deleteAccount(emailAddress) {
        const DELETE_ACCOUNT_BY_EMAIL = `
            DELETE FROM public.account
            WHERE email_address = ($1);
        `;
        const values = [
            emailAddress
        ];

        return PostgreSQLAdapter.executeQueryWithValues(DELETE_ACCOUNT_BY_EMAIL, values);
    }

    async getAllAccounts() {
        const GET_ALL_ACCOUNTS = `
            SELECT *
            FROM public.account;
        `

        return PostgreSQLAdapter.executeQuery(GET_ALL_ACCOUNTS);
    }
}
