module.exports = class RequestValidator {

    permissions = [];

    hasAccess(accountId, currentTime) {
        // get all permissions of account
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
