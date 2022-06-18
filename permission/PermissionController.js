const PermissionDAO = require('./PermissionDAO');
const permissionDAO = new PermissionDAO();

module.exports = class PermissionController {

    addPermission(permission) {
        return permissionDAO.addPermission(permission);
    }

    getPermissionOfRole(roleId) {
        return permissionDAO.getPermissionByRoleId(roleId);
    }

    deletePermission(permissionId) {
        return permissionDAO.deletePermission(permissionId);
    }
}
