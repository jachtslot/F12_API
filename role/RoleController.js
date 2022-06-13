const RoleDAO = require('./RoleDAO');

module.exports = class RoleController {

    static async createRole(role) {
        return RoleDAO.createRole(role);
    }

    static getAllRoles() {
        return RoleDAO.getRoles();
    }

    static deleteRole(roleId) {
        return RoleDAO.deleteRole(roleId);
    }

    static getRole(roleName) {
        return RoleDAO.getRole(roleName);
    }
}
