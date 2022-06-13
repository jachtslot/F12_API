const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');

module.exports = class RoleDAO {

    static createRole(role) {
        const query = `
            INSERT INTO role (id, name)
            VALUES ($1, $2);
        `;
        const values = [
            role.id,
            role.name
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
        console.log(query,values)
        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }
}
