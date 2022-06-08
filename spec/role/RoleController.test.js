const Account = require('../../account/Account');
const AccountController = require('../../account/AccountController');
const RoleController = require('../../role/RoleController');
const BeforeEach = require('../support/BeforeEach');
const { v4: uuidv4 } = require('uuid');

const genRandomNumber = () => {
    return Math.floor(Math.random().toPrecision(9) * 1_000_000_000);
}

const insertRole = async (roleName) => {
    await RoleController.createRole(roleName);
    let role = await RoleController.getRole(roleName);
    return role.id;
}

const insertAccount = async () => {
    let newAccount = new Account(
        null,
        'Username',
        `${genRandomNumber()}example@gmail.com`,
        'example_hashed_password'
    );

    let createdAccount = await AccountController.createAccount(newAccount);
    return createdAccount.id;
}

describe('testing the createRole method of the RoleController()', () => {

    it('Inserts a record in the Role table', async () => {
        await BeforeEach.run();
        await RoleController.createRole('tuinman');
        let roleRecords = await RoleController.getAllRoles();
        expect(roleRecords.length).toBe(1);
    });

    it('Denies insert if name already exists', async () => {
        await BeforeEach.run();
        await RoleController.createRole('tuinman');

        await expectAsync(
            RoleController.createRole('tuinman')
        ).toBeRejected();
    });

    it('Denies if name length is smaller than 1', async () => {
        await BeforeEach.run();

        await expectAsync(
            RoleController.createRole('')
        ).toBeRejected();
    });

    it('Denies if name is null', async () => {
        await BeforeEach.run();

        await expectAsync(
            RoleController.createRole(null)
        ).toBeRejected();
    });
});

describe('testing the deleteRole method of the RoleController()', () => {

    it('Deletes a record in the Role table', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');

        await RoleController.deleteRole(roleId);
        let roleRecords = await RoleController.getAllRoles();

        expect(roleRecords.length).toBe(0);
    });

    it('does not throw error when role not existing', async () => {
        await BeforeEach.run();
        await RoleController.deleteRole("ccbaa2dc-2c5e-4033-a254-71b1aafb61f6");
        let roleRecords = await RoleController.getAllRoles();

        expect(roleRecords.length).toBe(0);
    });

    it('Deletes only one record in the Role table', async () => {
        await BeforeEach.run();
        await RoleController.createRole('different');
        await RoleController.createRole('another');
        let roleId = await insertRole('tuinman');

        await RoleController.deleteRole(roleId);
        let roleRecords = await RoleController.getAllRoles();

        expect(roleRecords.length).toBe(2);
    });
});

describe('testing the addAccountToRole method of the RoleController()', () => {

    it('adds a account to the role if existing', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');

        let accountId1 = await insertAccount();

        await RoleController.addAccountToRole(roleId, accountId1);
        let roleWithAccount = await RoleController.getRole('tuinman');

        expect(roleWithAccount.accounts.length).toBe(1);
    });

    it('adds two accounts to the role if existing', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');

        let accountId1 = await insertAccount();
        let accountId2 = await insertAccount();

        await RoleController.addAccountToRole(roleId, accountId1);
        await RoleController.addAccountToRole(roleId, accountId2);
        let roleWithAccount = await RoleController.getRole('tuinman');

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

        await RoleController.addAccountToRole(roleId2, accountId4);
        await RoleController.addAccountToRole(roleId2, accountId2);
        await RoleController.addAccountToRole(roleId1, accountId2);
        await RoleController.addAccountToRole(roleId1, accountId4);
        await RoleController.addAccountToRole(roleId1, accountId1);
        await RoleController.addAccountToRole(roleId3, accountId2);
        await RoleController.addAccountToRole(roleId1, accountId3);
        await RoleController.addAccountToRole(roleId3, accountId4);

        let roleWithAccount1 = await RoleController.getRole('tuinman1');
        let roleWithAccount2 = await RoleController.getRole('tuinman2');
        let roleWithAccount3 = await RoleController.getRole('tuinman3');
        let roleWithAccount4 = await RoleController.getRole('tuinman4');
        let allRoles = await RoleController.getAllRoles();

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

        await RoleController.addAccountToRole(roleId1, accountId1);
        await expectAsync(RoleController.addAccountToRole(roleId1, accountId1)).toBeRejected();

        let roleWithAccount1 = await RoleController.getRole('tuinman1');

        expect(roleWithAccount1.accounts.length).toBe(1);
    })

    it('crashes when id of account not found in database', async () => {
        await BeforeEach.run();
        let roleId = await insertRole('tuinman');
        let accountId1 = uuidv4();

        await expectAsync(
            RoleController.addAccountToRole(roleId, accountId1)
        ).toBeRejected();
    });

    it('crashes when id of role not found in database', async () => {
        await BeforeEach.run();

        let roleId = uuidv4();
        let accountId1 = await insertAccount();

        await expectAsync(
            RoleController.addAccountToRole(roleId, accountId1)
        ).toBeRejected();
    });

    it('crashes when id of role and account not found in database', async () => {
        await BeforeEach.run();

        let roleId = uuidv4();
        let accountId1 = uuidv4();

        await expectAsync(
            RoleController.addAccountToRole(roleId, accountId1)
        ).toBeRejected();
    });
});
