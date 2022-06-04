const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
module.exports = class AuthenticationDAO {

    static loginAccount(credentials) {
        const query = `SELECT * FROM account WHERE email_address = $1`;
        const values = [credentials.email];
        return PostgreSQLAdapter.executeQuery({query, values});
    }
}

