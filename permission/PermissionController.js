const PermissionDAO = require('./PermissionDAO');
const Permission = require("./Permission");
const permissionDAO = new PermissionDAO();

module.exports = class PermissionController {

    addPermission(permission) {
        return permissionDAO.addPermission(permission);
    }

    async getPermissionOfRole(roleId) {
        const permissions = await permissionDAO.getPermissionByRoleId(roleId);
        return permissions.map(databasePermission =>
            new Permission(
                databasePermission.id,
                databasePermission.role_id,
                parseInt(databasePermission.privilege_id),
                parseInt(databasePermission.p_day),
                parseInt(databasePermission.start_time),
                parseInt(databasePermission.end_time)
            )
        );
    }
}
