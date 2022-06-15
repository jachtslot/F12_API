const RoleDAO = require('./RoleDAO');
const roleDAO = new RoleDAO();
const Role = require('./Role');
const Account = require('./../account/Account');

const PermissionDAO = require('./../permission/PermissionDAO');
const permissionDAO = new PermissionDAO();

module.exports = class RoleController {

    async createRole(role) {
        return roleDAO.createRole(role);
    }

    async getAllRoles() {
        let createdRoles = [];
        let allRoles = await roleDAO.getRoles();

        for (const roleAccount of allRoles) {

            let role = this.makeRoleFromDatabase(roleAccount);

            if (this.isFirstEntry(createdRoles) || this.isNewRole(role, createdRoles)) {
                createdRoles.push(role);
            } else {
                createdRoles.at(-1).addAccount(role.accounts[0]);
            }
        }

        return this.addPermissionsToRoles(createdRoles);
    }

    addPermissionsToRoles(roles) {
        for (const role of roles) {
            const permissions = permissionDAO.getPermissionByRoleId(role.id);

            for (const permission of permissions) {
                role.addPermission(permission);
            }
        }

        return roles;
    }

    makeRoleFromDatabase(roleAccount) {
        let newRole = new Role(roleAccount.role_id, roleAccount.role_name);
        let account = this.makeAccountFromDatabase(roleAccount);

        if (account !== null) {
            newRole.addAccount(account);
        }

        return newRole;
    }

    makeAccountFromDatabase(roleAccount) {
        if (roleAccount.account_id !== null) {
            return new Account(roleAccount.account_id, roleAccount.username, roleAccount.email_address);
        }

        return null;
    }

    isFirstEntry(createdRoles) {
        return createdRoles.length === 0;
    }

    isNewRole(role, createdRoles) {
        return role.id !== createdRoles.at(-1).id;
    }

    deleteRole(roleId) {
        return roleDAO.deleteRole(roleId);
    }

    async getRole(roleName) {
        let roles = await this.getAllRoles();
        return roles.filter(role => role.name === roleName)[0];
    }

    async getRoleById(roleId) {
        let roles = await this.getAllRoles();
        return roles.filter(role => role.id === roleId)[0];
    }

    addAccountToRole(roleId, accountId) {
        return roleDAO.addAccount(roleId, accountId);
    }

    removeAccountFromRole(roleId, accountId) {
        return roleDAO.removeAccount(roleId, accountId);
    }
}
