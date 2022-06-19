const RoleController = require('../role/RoleController');
const roleController = new RoleController();

module.exports = class RequestValidator {

    permissions = [];

    constructor(accountId, currentTime) {
        this.accountId = accountId;
        this.currentTime = currentTime;
    }

    async hasAccess() {
        await this.getPermissionsOfAccount(this.accountId);
    }

    async getPermissionsOfAccount(accountId) {
        const rolesOfAccount = await roleController.getRolesOfAccount(accountId);
        for (const permissions of this.getPermissionLists(rolesOfAccount)) {
            this.permissions.push(...permissions);
        }
    }

    getPermissionLists(rolesOfAccount) {
        return rolesOfAccount.map(role => role.permissions);
    }

    hasPermissionOnThisDay(permissions) {
        // filter all the permissions that are on this day
    }

    hasPermissionOnThisTimeStamp(permissions) {
        // filter all the permissions that are on this timestamp
    }

    hasAccessToThisGate(permissions) {
        // filter all the permissions that are on the given gate
    }
}
