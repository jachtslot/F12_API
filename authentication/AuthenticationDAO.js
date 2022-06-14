const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
module.exports = class AuthenticationDAO {

    loginAccount(credentials) {
        const SELECT_ACCOUNT_BY_EMAIL = `
            SELECT * 
            FROM account 
            WHERE email_address = $1;
        `;
        const values = [credentials.email];

        return PostgreSQLAdapter.executeQueryWithValues(SELECT_ACCOUNT_BY_EMAIL, values);
    }
}

