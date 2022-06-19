const RoleController = require('../role/RoleController');
const roleController = new RoleController();

module.exports = class RequestValidator {

    permissions = [];

    constructor(accountId, currentTime, requestedPrivilege) {
        this.accountId = accountId;
        this.currentTime = currentTime;
        this.requestedPrivilege = requestedPrivilege
    }

    async hasAccess() {
        await this.getPermissionsOfAccount();
        this.filterPermissionsOnThisDay();
        this.filterPermissionsOnThisTimeStamp();
        this.filterPermissionsWithAccessToThisGate();

        return this.permissions.length > 0;
    }

    async getPermissionsOfAccount() {
        const rolesOfAccount = await roleController.getRolesOfAccount(this.accountId);
        for (const permissions of this.getPermissionLists(rolesOfAccount)) {
            this.permissions.push(...permissions);
        }
    }

    getPermissionLists(rolesOfAccount) {
        return rolesOfAccount.map(role => role.permissions);
    }

    filterPermissionsOnThisDay() {
        console.log(this.permissions);
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
        return permission.begin_time <= this.currentTime.currentTimeStamp &&
            permission.end_time >= this.currentTime.currentTimeStamp
    }

    filterPermissionsWithAccessToThisGate() {
        this.permissions = this.permissions.filter(
            permission => this.hasPermissionToRightGate(permission)
        );
    }

    hasPermissionToRightGate(permission) {
        return permission.privilege_id === 3 ||
            permission.privilege_id === this.requestedPrivilege;
    }
}
