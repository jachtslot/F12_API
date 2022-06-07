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

    static getRole(roleName) {
        return RoleDAO.getRole(roleName);
    }

    static addAccountToRole(roleId, accountId) {
        return RoleDAO.addAccount(roleId, accountId);
    }
}
