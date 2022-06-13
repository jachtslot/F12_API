const RoleDAO = require('./RoleDAO');
const Role = require('./Role');
const Account = require('./../account/Account');

module.exports = class RoleController {

    static async createRole(role) {
        return RoleDAO.createRole(role);
    }

    static async getAllRoles() {
        let createdRoles = [];
        let allRoles = await RoleDAO.getRoles();

        for (const roleAccount of allRoles) {

            let role = this.makeRoleFromDatabase(roleAccount);

            if (this.isFirstEntry(createdRoles) || this.isNewRole(role, createdRoles)) {
                createdRoles.push(role);
            } else {
                createdRoles.at(-1).addAccount(role.accounts[0]);
            }
        }

        return createdRoles;
    }

    static makeRoleFromDatabase(roleAccount) {
        let newRole = new Role(roleAccount.role_id, roleAccount.role_name);
        let account = this.makeAccountFromDatabase(roleAccount);

        if (account !== null) {
            newRole.addAccount(account);
        }

        return newRole;
    }

    static makeAccountFromDatabase(roleAccount) {
        if (roleAccount.account_id !== null) {
            return new Account(roleAccount.account_id, roleAccount.username, roleAccount.email_address);
        }

        return null;
    }

    static isFirstEntry(createdRoles) {
        return createdRoles.length === 0;
    }

    static isNewRole(role, createdRoles) {
        return role.id !== createdRoles.at(-1).id;
    }

    static deleteRole(roleId) {
        return RoleDAO.deleteRole(roleId);
    }

    static async getRole(roleName) {
        let roles = await this.getAllRoles();
        return roles.filter(role => role.name === roleName)[0];
    }

    static addAccountToRole(roleId, accountId) {
        return RoleDAO.addAccount(roleId, accountId);
    }

    static removeAccountFromRole(roleId, accountId) {
        return RoleDAO.removeAccount(roleId, accountId);
    }
}
