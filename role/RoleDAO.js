const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');

module.exports = class RoleDAO {

    createRole(role) {
        const INSERT_NEW_ROLE = `
            INSERT INTO public.role (id, name)
            VALUES ($1, $2);
        `;
        const values = [
            role.id,
            role.name
        ];

        return PostgreSQLAdapter.executeQueryWithValues(INSERT_NEW_ROLE, values);
    }

    getRoles() {
        const GET_ALL_ROLES_WITH_ACCOUNTS = `
            SELECT r.name AS role_name, r.id AS role_id, a.id AS account_id, a.username, a.email_address 
            FROM public.role r
            LEFT JOIN public.account_role ar ON r.id = ar.role_id
            LEFT JOIN public.account a on ar.account_id = a.id
            ORDER BY role_id;
        `;

        return PostgreSQLAdapter.executeQuery(GET_ALL_ROLES_WITH_ACCOUNTS);
    }

    deleteRole(roleId) {
        const DELETE_ROLE_BY_ID = `
            DELETE 
            FROM public.role
            WHERE id = $1;
        `;

        const values = [
            roleId
        ];
        return PostgreSQLAdapter.executeQueryWithValues(DELETE_ROLE_BY_ID, values);
    }

    addAccount(roleId, accountId) {
        const ADD_ACCOUNT_TO_ROLE = `
            INSERT INTO public.account_role (account_id, role_id)
            VALUES ($1, $2);
        `;

        const values = [
            accountId,
            roleId
        ];

        return PostgreSQLAdapter.executeQueryWithValues(ADD_ACCOUNT_TO_ROLE, values);
    }

    removeAccount(roleId, accountId) {
        const REMOVE_ACCOUNT_FROM_ROLE = `
            DELETE FROM public.account_role
            WHERE $1 = role_id AND $2 = account_id;
        `;

        const values = [
            roleId, accountId
        ];

        return PostgreSQLAdapter.executeQueryWithValues(REMOVE_ACCOUNT_FROM_ROLE, values);
    }
}
