const PostgreSQLAdapter = require('../util/PostgreSQLAdapter');

module.exports = class PermissionDAO {

    static addPermission(permission) {
        const query = `
            INSERT INTO permission (
              id, role_id, privilege_id,
              p_day, start_time, end_time)
            VALUES($1, $2, $3, $4, $5, $6);`;
        const values = [
            permission.id,
            permission.role_id,
            permission.privilege_id,
            permission.day,
            permission.begin_time,
            permission.end_time
        ];

        return PostgreSQLAdapter.executeQueryWithValues({query, values});
    }
}
