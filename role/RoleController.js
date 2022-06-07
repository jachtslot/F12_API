const RoleDAO = require('./RoleDAO');

module.exports = class RoleController {

    static async createRole(roleName) {
        return RoleDAO.createRole(roleName);
    }

    static getAllRoles() {
        return RoleDAO.getRoles();
    }

    static deleteRole(roleId) {
        return RoleDAO.deleteRole(roleId);
    }
}
