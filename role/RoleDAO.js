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

    static getRoles() {
        const query = `
            SELECT r.name AS role_name, r.id AS role_id, a.id AS account_id, a.username, a.email_address 
            FROM ROLE r
            LEFT JOIN account_role ar ON r.id = ar.role_id
            LEFT JOIN account a on ar.account_id = a.id
            ORDER BY role_id;
        `;

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

    static addAccount(roleId, accountId) {
        const query = `
            INSERT INTO account_role (account_id, role_id)
            VALUES ($1, $2);
        `;

        const values = [
            accountId,
            roleId
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }

    static removeAccount(roleId, accountId) {
        const query = `
            DELETE FROM account_role
            WHERE $1 = role_id AND $2 = account_id;
        `;

        const values = [
            roleId, accountId
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }
}
