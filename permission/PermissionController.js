const PermissionDAO = require('./PermissionDAO');
const permissionDAO = new PermissionDAO();

module.exports = class PermissionController {

    async addPermission(permission) {

        return permissionDAO.addPermission(permission);
    }
}
