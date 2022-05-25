const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
const { v4: uuidv4 } = require('uuid');

module.exports = class RoleDAO {

    static createRole(roleName) {
        const query = `
            INSERT INTO role (id, name)
            VALUES ($1, $2)
        `;
        const values = [
            uuidv4(),
            roleName
        ];

        return PostgreSQLAdapter.executeQuery({query, values});
    }
}
