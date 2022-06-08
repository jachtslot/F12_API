const RoleDAO = require('./RoleDAO');
const Role = require('./Role');
const Account = require('./../account/Account');

module.exports = class RoleController {

    static async createRole(roleName) {
        return RoleDAO.createRole(roleName);
    }

    static async getAllRoles() {
        let createdRoles = [];
        let allRoles = await RoleDAO.getRoles();

        for (const roleAccount of allRoles) {

            let newRole = new Role(roleAccount.role_id, roleAccount.role_name);

            if (createdRoles.length === 0) {
                console.log("ifnioewfioenfnewifewiofnewoinfoewnfwe")
                if (roleAccount.account_id !== null) {
                    let account = new Account(roleAccount.account_id, roleAccount.username, roleAccount.email_address);
                    newRole.addAccount(account);
                }
                createdRoles.push(newRole);
            } else {
                if (newRole.id === createdRoles[-1].id) {
                    if (roleAccount.account_id !== null) {
                        let account = new Account(roleAccount.account_id, roleAccount.username, roleAccount.email_address);
                        createdRoles[-1].addAccount(account);
                    }
                } else {
                    if (roleAccount.account_id !== null) {
                        let account = new Account(roleAccount.account_id, roleAccount.username, roleAccount.email_address);
                        newRole.addAccount(account);
                    }
                    createdRoles.push(newRole);
                }
            }
        }

        console.log(createdRoles);
        return createdRoles;
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
}
