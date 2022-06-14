const Account = require('../../account/Account');
const AccountController = require('../../account/AccountController');
const accountController = new AccountController();
const RoleController = require('../../role/RoleController');
const roleController = new RoleController();
const BeforeEach = require('../support/BeforeEach');
const Role = require('../../role/Role');
const { v4: uuidv4 } = require('uuid');

const testRole = () => {
    return new Role(null, 'test');
}

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

describe('testing the createRole method of the RoleController()', () => {

    it('Inserts a record in the Role table', async () => {
        await BeforeEach.run();
        await roleController.createRole(testRole());
        let roleRecords = await roleController.getAllRoles();
        expect(roleRecords.length).toBe(1);
    });

    it('Denies insert if name already exists', async () => {
        await BeforeEach.run();
        await roleController.createRole(testRole());

        await expectAsync(
            roleController.createRole(testRole())
        ).toBeRejected();
    });

    it('Denies if name length is smaller than 1', async () => {
        await BeforeEach.run();

        await expectAsync(
            roleController.createRole(testRole().name = '')
        ).toBeRejected();
    });

    it('Denies if name is null', async () => {
        await BeforeEach.run();

        await expectAsync(
            roleController.createRole(null)
        ).toBeRejected();
    });
});

describe('testing the deleteRole method of the RoleController()', () => {

    it('Deletes a record in the Role table', async () => {
        const role = testRole();
        await BeforeEach.run();
        await roleController.createRole(role);
        await roleController.deleteRole(role.id);
        let roleRecords = await roleController.getAllRoles();

        expect(roleRecords.length).toBe(0);
    });

    it('does not throw error when role not existing', async () => {
        await BeforeEach.run();
        await roleController.deleteRole("ccbaa2dc-2c5e-4033-a254-71b1aafb61f6");
        let roleRecords = await roleController.getAllRoles();

        expect(roleRecords.length).toBe(0);
    });

    it('Deletes only one record in the Role table', async () => {
        const role1 = testRole();
        const role2 = new Role(null, 'testRole2');
        const role3 = new Role(null, 'testRole3');
        await BeforeEach.run();
        await roleController.createRole(role1);
        await roleController.createRole(role2);
        await roleController.createRole(role3);

        await roleController.deleteRole(role1.id);
        let roleRecords = await roleController.getAllRoles();

        expect(roleRecords.length).toBe(2);
    });
});

describe('testing the addAccountToRole method of the RoleController()', () => {

    it('adds a account to the role if existing', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');

        let accountId1 = await insertAccount();

        await roleController.addAccountToRole(roleId, accountId1);
        let roleWithAccount = await roleController.getRole('tuinman');

        expect(roleWithAccount.accounts.length).toBe(1);
    });

    it('adds two accounts to the role if existing', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');

        let accountId1 = await insertAccount();
        let accountId2 = await insertAccount();

        await roleController.addAccountToRole(roleId, accountId1);
        await roleController.addAccountToRole(roleId, accountId2);
        let roleWithAccount = await roleController.getRole('tuinman');

        expect(roleWithAccount.accounts.length).toBe(2);
    });

    it('handles complex situation successfully', async () => {
        await BeforeEach.run();

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

        let roleWithAccount1 = await roleController.getRole('tuinman1');
        let roleWithAccount2 = await roleController.getRole('tuinman2');
        let roleWithAccount3 = await roleController.getRole('tuinman3');
        let roleWithAccount4 = await roleController.getRole('tuinman4');
        let allRoles = await roleController.getAllRoles();

        expect(roleWithAccount1.accounts.length).toBe(4);
        expect(roleWithAccount2.accounts.length).toBe(2);
        expect(roleWithAccount3.accounts.length).toBe(2);
        expect(roleWithAccount4.accounts.length).toBe(0);
        expect(allRoles.length).toBe(4);
    });

    it('does ony add one time when adding account that already assigned to role', async () => {
        await BeforeEach.run();

        let roleId1 = await insertRole('tuinman1');
        let accountId1 = await insertAccount();

        await roleController.addAccountToRole(roleId1, accountId1);
        await expectAsync(roleController.addAccountToRole(roleId1, accountId1)).toBeRejected();

        let roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(1);
    })

    it('crashes when id of account not found in database', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');
        let accountId1 = uuidv4();

        await expectAsync(
            roleController.addAccountToRole(roleId, accountId1)
        ).toBeRejected();
    });

    it('crashes when id of role not found in database', async () => {
        await BeforeEach.run();

        let roleId = uuidv4();
        let accountId1 = await insertAccount();

        await expectAsync(
            roleController.addAccountToRole(roleId, accountId1)
        ).toBeRejected();
    });

    it('crashes when id of role and account not found in database', async () => {
        await BeforeEach.run();

        let roleId = uuidv4();
        let accountId1 = uuidv4();

        await expectAsync(
            roleController.addAccountToRole(roleId, accountId1)
        ).toBeRejected();
    });
});

describe('testing the removeAccountFromRole method of the RoleController()', () => {

    it('returns as normal when account and role not in account_role table', async () => {
        await BeforeEach.run();

        let roleId = uuidv4();
        let accountId1 = uuidv4();

        await expectAsync(
            roleController.removeAccountFromRole(roleId, accountId1)
        ).toBeResolved();
    });

    it('has still one row when account and role not in account_role table', async () => {
        await BeforeEach.run();

        let roleId1 = await insertRole('tuinman1');
        let accountId1 = await insertAccount();
        await roleController.addAccountToRole(roleId1, accountId1);

        let roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(1);

        let roleIdRandom = uuidv4();
        let accountIdRandom = uuidv4();

        await roleController.removeAccountFromRole(roleIdRandom, accountIdRandom);

        roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(1);
    });

    it('removes row from account_role table', async () => {
        await BeforeEach.run();

        let roleId1 = await insertRole('tuinman1');
        let accountId1 = await insertAccount();
        await roleController.addAccountToRole(roleId1, accountId1);

        let roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(1);

        await roleController.removeAccountFromRole(roleId1, accountId1);

        roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(0);
    });

    it('only removes 1 row from account_role table', async () => {
        await BeforeEach.run();

        let roleId1 = await insertRole('tuinman1');
        let accountId1 = await insertAccount();
        let accountId2 = await insertAccount();
        await roleController.addAccountToRole(roleId1, accountId1);
        await roleController.addAccountToRole(roleId1, accountId2);

        let roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(2);

        await roleController.removeAccountFromRole(roleId1, accountId1);

        roleWithAccount1 = await roleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(1);
    });
})
