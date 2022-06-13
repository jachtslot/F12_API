const PermissionDAO = require('./PermissionDAO');

module.exports = class PermissionController {

    static async addPermission(permission) {

        return PermissionDAO.addPermission(permission);
    }
}
