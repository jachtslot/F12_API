const Account = require('../../account/Account');
const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const RoleController = require('../../role/RoleController');
const roleController = new RoleController();
const PermissionController = require('../../permission/PermissionController');
const permissionController = new PermissionController();
const Permission = require('../../permission/Permission');
const RequestValidator = require('../../util/RequestValidator');
const Time = require('../../util/Time');

const BeforeEach = require('../support/BeforeEach');
const Role = require('../../role/Role');
const { v4: uuidv4 } = require('uuid');

const genRandomNumber = () => {
    return Math.floor(Math.random().toPrecision(9) * 1_000_000_000);
}

const insertRole = async roleName => {
    await roleController.createRole(new Role(null, roleName));
    let role = await roleController.getRole(roleName);
    return role.id;
}

const insertAccount = async () => {
    let newAccount = new Account(
        null,
        'Username',
        `${genRandomNumber()}example@gmail.com`,
        'example_hashed_password'
    );

    let createdAccount = await accountController.createAccount(newAccount);
    return createdAccount.id;
}

const addDemoRolesWithAccounts = async () => {
    let roleId1 = await insertRole('tuinman1');
    let roleId2 = await insertRole('tuinman2');
    let roleId3 = await insertRole('tuinman3');
    await insertRole('tuinman4');

    let accountId1 = await insertAccount();
    let accountId2 = await insertAccount();
    let accountId3 = await insertAccount();
    let accountId4 = await insertAccount();

    await roleController.addAccountToRole(roleId2, accountId4);
    await roleController.addAccountToRole(roleId2, accountId2);
    await roleController.addAccountToRole(roleId1, accountId2);
    await roleController.addAccountToRole(roleId1, accountId4);
    await roleController.addAccountToRole(roleId1, accountId1);
    await roleController.addAccountToRole(roleId3, accountId2);
    await roleController.addAccountToRole(roleId1, accountId3);
    await roleController.addAccountToRole(roleId3, accountId4);


    let permission1 = new Permission(null, roleId1, 3, 2, 1430, 1800);
    let permission2 = new Permission(null, roleId2, 3, 1, 2200, 2300);
    let permission3 = new Permission(null, roleId2, 2, 1, 1430, 1800);
    let permission4 = new Permission(null, roleId2, 2, 1, 1430, 1800);
    let permission5 = new Permission(null, roleId3, 1, 3, 1430, 1800);

    await permissionController.addPermission(permission1);
    await permissionController.addPermission(permission2);
    await permissionController.addPermission(permission3);
    await permissionController.addPermission(permission4);
    await permissionController.addPermission(permission5);
}

describe('testing the getPermissionsOfAccount method of the RequestValidator()', () => {

    it('Gets the right amount of permissions for role1', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role1 = await roleController.getRole('tuinman1')
        const account = role1.accounts[0];

        const requestValidator = new RequestValidator(account.id, undefined, 2);
        await requestValidator.getPermissionsOfAccount();

        expect(requestValidator.permissions.length).toBe(1);
    });

    it('Gets the right amount of permissions for role2', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const requestValidator = new RequestValidator(account.id, undefined, 2);
        await requestValidator.getPermissionsOfAccount();

        expect(requestValidator.permissions.length).toBe(5);
    });

    it('ShouldDenyRequestIfNotCorrectDay', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const currentTime = new Time(2, 1100);
        const requestValidator = new RequestValidator(account.id, currentTime, 2);

        expect(await requestValidator.hasAccess()).toBeFalse();
    });

    it('ShouldDenyRequestIfTimeStampTooEarly', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const currentTime = new Time(1, 1400);
        const requestValidator = new RequestValidator(account.id, currentTime, 2);

        expect(await requestValidator.hasAccess()).toBeFalse();
    });

    it('ShouldDenyRequestIfTimeStampTooLate', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const currentTime = new Time(1, 1900);
        const requestValidator = new RequestValidator(account.id, currentTime, 2);

        expect(await requestValidator.hasAccess()).toBeFalse();
    });

    it('ShouldDenyRequestIfPrivilegeNotGranted', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const currentTime = new Time(1, 1600);
        const requestValidator = new RequestValidator(account.id, currentTime, 1);

        expect(await requestValidator.hasAccess()).toBeFalse();
    });

    it('ShouldAcceptRequestIfMeetsRequirements', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const currentTime = new Time(1, 1600);
        const requestValidator = new RequestValidator(account.id, currentTime, 2);

        expect(await requestValidator.hasAccess()).toBeTrue();
    });

    it('ShouldAcceptRequestIfMeetsRequirementsWhenPrivilegeIsBoth', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const currentTime = new Time(1, 2230);
        const requestValidator = new RequestValidator(account.id, currentTime, 2);

        expect(await requestValidator.hasAccess()).toBeTrue();
    });
});
