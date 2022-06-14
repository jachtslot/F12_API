const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
module.exports = class AuthenticationDAO {

    loginAccount(credentials) {
        const query = `SELECT * FROM account WHERE email_address = $1`;
        const values = [credentials.email];
        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }

    async getAccountRole(account) {
        const query = `SELECT * FROM admin WHERE account_id = $1;`;
        const values = [account.id];
        return PostgreSQLAdapter.executeQueryWithValues({query,values});
    }
}

