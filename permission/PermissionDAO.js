const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');

module.exports = class PermissionDAO {

    addPermission(permission) {
        const INSERT_NEW_PERMISSION = `
            INSERT INTO permission (
              id, role_id, privilege_id,
              p_day, start_time, end_time)
            VALUES($1, $2, $3, $4, $5, $6);`;
        const values = [
            permission.id,
            permission.role_id,
            permission.privilege_id,
            permission.p_day,
            permission.start_time,
            permission.end_time
        ];
        return PostgreSQLAdapter.executeQueryWithValues(INSERT_NEW_PERMISSION, values);
    }

    getPermissionByRoleId(roleId) {
        const GET_PERMISSION_BY_ROLE = `
            SELECT *
            FROM permission
            WHERE role_id = $1;
        `;
        const values = [roleId];

        return PostgreSQLAdapter.executeQueryWithValues(GET_PERMISSION_BY_ROLE, values);
    }
}
