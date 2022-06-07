const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');
const { v4: uuidv4 } = require('uuid');

module.exports = class RoleDAO {

    static createRole(roleName) {
        const query = `
            INSERT INTO role (id, name)
            VALUES ($1, $2);
        `;
        const values = [
            uuidv4(),
            roleName
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }

    static getRole(roleName) {
        const query = `
            SELECT *
            FROM role
            WHERE name = $1;
        `;

        const values = [
            roleName
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }

    static getRoles() {
        const query = `
            SELECT *
            FROM role;
        `

        return PostgreSQLAdapter.executeQuery(query);
    }

    static deleteRole(roleId) {
        const query = `
            DELETE 
            FROM role
            WHERE id = $1;
        `;

        const values = [
            roleId
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }
}