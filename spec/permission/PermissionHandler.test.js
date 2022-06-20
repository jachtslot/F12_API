const EventMocker = require('../helpers/EventMocker');
const BeforeEach = require('../support/BeforeEach');
const Role = require('../../role/Role');
const Permission = require('../../permission/Permission');
const AuthenticationHelper = require('../helpers/AuthenticationHelper');
const RoleController = require('../../role/RoleController');
const roleController = new RoleController();
const PermissionHandler = require('../../permission/PermissionHandler');
const PermissionController = require('../../permission/PermissionController');
const UnauthorizedUserError = require('../../authentication/UnauthorizedUserError');

const testPermission = async () => {
    const role = new Role(null, 'testRole');
    await roleController.createRole(role);
    return new Permission(null, role.id, 2, 0, 1330, 1700);
}

const setupAccount = async (isAdmin, origin) => {
    const account = await AuthenticationHelper.createTestAccount(isAdmin);
    return await AuthenticationHelper.getJwtToken(account, origin);
}

describe('tests the delete permission method with authenticated users', () => {


    it('should delete a permission as an admin', async () => {
        await BeforeEach.run();
        let permission;
        const credentials = await setupAccount(true, process.env.PORTAL_ORIGIN);
        await testPermission().then(data => permission = data);
        const event = EventMocker.buildWithAuthHeadersEmptyBodyPathParameters(credentials.token, permission.id);
        await expectAsync(PermissionHandler.deletePermission(event)).toBeResolved();

    });

    it('should fail to delete a permission as a normal user', async () => {
        await BeforeEach.run();
        let permission;
        const credentials = await setupAccount(false, process.env.APP_ORIGIN);
        await testPermission().then(data => permission = data);
        const event = EventMocker.buildWithAuthHeadersEmptyBodyPathParameters(credentials.token, permission.id);
        await expectAsync(PermissionHandler.deletePermission(event)).toBeRejectedWithError(UnauthorizedUserError);
    });
})
