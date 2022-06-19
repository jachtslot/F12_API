const Account = require('../../account/Account');
const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const RoleController = require('../../role/RoleController');
const roleController = new RoleController();
const PermissionController = require('../../permission/PermissionController');
const permissionController = new PermissionController();
const Permission = require('../../permission/Permission');
const RequestValidator = require('../../util/RequestValidator');

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


    let permission1 = new Permission(roleId1, 3, 1, 1430, 1800);
    let permission2 = new Permission(roleId2, 3, 1, 1430, 1800);
    let permission3 = new Permission(roleId2, 2, 1, 1430, 1800);
    let permission4 = new Permission(roleId2, 2, 1, 1430, 1800);
    let permission5 = new Permission(roleId3, 1, 1, 1430, 1800);

    await permissionController.addPermission(permission1);
    await permissionController.addPermission(permission2);
    await permissionController.addPermission(permission3);
    await permissionController.addPermission(permission4);
    await permissionController.addPermission(permission5);
}

describe('testing the getPermissionsOfAccount method of the RequestValidator()', () => {

    it('Gets the right amount of permissions for role2', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role2 = await roleController.getRole('tuinman2')
        const account = role2.accounts[0];
        const requestValidator = new RequestValidator(account.id, undefined);
        await requestValidator.hasAccess();

        expect(requestValidator.permissions.length).toBe(5);
    });

    it('Gets the right amount of permissions for role1', async () => {
        await BeforeEach.run();
        await addDemoRolesWithAccounts();

        const role1 = await roleController.getRole('tuinman1')
        const account = role1.accounts[0];

        const requestValidator = new RequestValidator(account.id, undefined);
        await requestValidator.hasAccess();

        expect(requestValidator.permissions.length).toBe(1);
    });
});
