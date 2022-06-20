const AuthenticationHelper = require('../helpers/AuthenticationHelper');
const BeforeEach = require('../support/BeforeEach');
const EventMocker = require('../helpers/EventMocker');
const GateHandler = require('../../gate/GateHandler');
const PermissionController = require('../../permission/PermissionController');
const permissionController = new PermissionController();
const Permission = require('../../permission/Permission');
const RoleController = require('../../role/RoleController');
const roleController = new RoleController();
const {v4: uuidv4} = require('uuid');
const Role = require('../../role/Role');



const setUpAccount = async (isAdmin, origin) => {
    const account = await AuthenticationHelper.createTestAccount();
    return await AuthenticationHelper.getJwtToken(account, origin)
}

const insertAllAccess = async (accountId, privilegeId) => {
    const role = new Role(null, 'tuinman1');
    await roleController.createRole(role);
    const role1 = await roleController.getRole(role.name);
    await roleController.addAccountToRole(role1.id, accountId);
    for (let i = 0; i < 7; i++) {
        await permissionController.addPermission(new Permission(null, role1.id, privilegeId, i, 0, 2359));
    }
}

describe('testing the openGates() methods of the GateHandler', () => {

    it('should not open the inner gate with the right credentials but without permissions', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        const response = await GateHandler.openInnerGate(mockEvent);
        expect(response.statusCode).toBe(403);
    });

    it('should not open the outer gate with the right credentials but without permissions', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        const response = await GateHandler.openInnerGate(mockEvent);
        expect(response.statusCode).toBe(403);
    });

    it('should open the inner gate with the right credentials and with permissions', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        await insertAllAccess(credentials.loadedAccount.id, 1);
        const response = await GateHandler.openInnerGate(mockEvent);
        expect(response.statusCode).toBe(200);
    });

    it('should not open the inner gate with the right credentials and with permissions but wrong privilege', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        await insertAllAccess(credentials.loadedAccount.id, 2);
        const response = await GateHandler.openInnerGate(mockEvent);
        expect(response.statusCode).toBe(403);
    });

    it('should open the inner gate with the right credentials and with permissions and all privileges', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        await insertAllAccess(credentials.loadedAccount.id, 3);
        const response = await GateHandler.openInnerGate(mockEvent);
        expect(response.statusCode).toBe(200);
    });

    it('should open the outer gate with the right credentials and with permissions', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        await insertAllAccess(credentials.loadedAccount.id, 2);
        await expectAsync(
            GateHandler.openOuterGate(mockEvent)
        ).toBeResolved();
    });

    it('should not open the outer gate with the right credentials and with permissions but wrong privilege', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        await insertAllAccess(credentials.loadedAccount.id, 1);
        const response = await GateHandler.openOuterGate(mockEvent);
        expect(response.statusCode).toBe(403);
    });

    it('should open the outer gate with the right credentials and with permissions and all privileges', async () => {
        await BeforeEach.run();
        const credentials = await setUpAccount(
            false, process.env.APP_ORIGIN
        );
        const mockEvent = EventMocker.buildWithAuthHeadersAndBody(credentials.token, {});

        await insertAllAccess(credentials.loadedAccount.id, 3);
        await expectAsync(
            GateHandler.openOuterGate(mockEvent)
        ).toBeResolved();
    });


});
