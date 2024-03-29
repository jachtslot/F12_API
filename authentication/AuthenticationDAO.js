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

    async getAccountAdminRole(account) {
        const query = `SELECT * FROM public.admin WHERE account_id = $1;`;
        const values = [account.id];
        return PostgreSQLAdapter.executeQueryWithValues(query, values);
    }
}

