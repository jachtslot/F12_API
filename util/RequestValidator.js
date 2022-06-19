const RoleController = require('../role/RoleController');
const roleController = new RoleController();

module.exports = class RequestValidator {

    permissions = [];

    constructor(accountId, currentTime, privilege) {
        this.accountId = accountId;
        this.currentTime = currentTime;
        this.requestPrivilege = privilege
    }

    async hasAccess() {
        await this.getPermissionsOfAccount(this.accountId);
        this.filterPermissionsOnThisDay();
        this.filterPermissionsOnThisTimeStamp();
        this.filterPermissionsWithAccessToThisGate();

        return this.permissions.length > 0;
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

    filterPermissionsOnThisDay() {
        this.permissions = this.permissions.filter(
            permission => permission.day === this.currentTime.day
        );
    }

    filterPermissionsOnThisTimeStamp() {
        this.permissions = this.permissions.filter(
            permission => this.timeStampIsInRange(permission)
        );
    }

    timeStampIsInRange(permission) {
        return permission.begin_time <= this.currentTime.beginTime &&
            permission.end_time >= this.currentTime.endTime
    }

    filterPermissionsWithAccessToThisGate() {
        this.permissions = this.permissions.filter(
            permission => this.hasPermissionToRightGate(permission)
        );
    }

    hasPermissionToRightGate(permission) {
        return permission.privilege === 3 ||
            permission.privilege === this.requestPrivilege;
    }
}
