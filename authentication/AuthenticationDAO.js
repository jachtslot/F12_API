const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
module.exports = class AuthenticationDAO {

    loginAccount(credentials) {
        const SELECT_ACCOUNT_BY_EMAIL = `
            SELECT * 
            FROM public.account 
            WHERE email_address = $1;
        `;
        const values = [credentials.email];

        return PostgreSQLAdapter.executeQueryWithValues(SELECT_ACCOUNT_BY_EMAIL, values);
    }

    async getAccountRole(account) {
        const query = `SELECT * FROM admin WHERE account_id = $1;`;
        const values = [account.id];
        return PostgreSQLAdapter.executeQueryWithValues(query, values);
    }
}

