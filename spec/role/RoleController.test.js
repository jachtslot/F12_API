const Account = require('../../account/Account');
const AccountController = require('../../account/AccountController');
const RoleController = require('../../role/RoleController');
const { log } = require('../../util/Logger');
const BeforeEach = require('../support/BeforeEach');

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
        await RoleController.createRole('tuinman');
        let roles = await RoleController.getRole('tuinman');
        let roleId = roles.id;

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
        await RoleController.createRole('tuinman');
        await RoleController.createRole('different');
        await RoleController.createRole('another');
        let roles = await RoleController.getRole('tuinman');
        let roleId = roles.id;

        await RoleController.deleteRole(roleId);
        let roleRecords = await RoleController.getAllRoles();

        expect(roleRecords.length).toBe(2);
    });
});

describe('testing the addAccountToRole method of the RoleController()', () => {

    it('adds a account to the role if existing', async () => {
        await BeforeEach.run();
        await RoleController.createRole('tuinman');
        let role = await RoleController.getRole('tuinman');
        let roleId = role.id;

        let newAccount = new Account(
            null,
            'example_user_name',
            'example@gmail.com',
            'example_hashed_password'
        );

        let createdAccount = await AccountController.createAccount(newAccount);
        let accountId = createdAccount.id;


        await RoleController.addAccountToRole(roleId, accountId);
        let roleWithAccount = await RoleController.getRole('tuinman');
        expect(roleWithAccount.accounts.length).toBe(1);
    });

    it('adds two accounts to the role if existing', async () => {
        await BeforeEach.run();
        await RoleController.createRole('tuinman');
        let role = await RoleController.getRole('tuinman');
        let roleId = role.id;

        let newAccount = new Account(
            null,
            'example_user_name',
            'example1@gmail.com',
            'example_hashed_password'
        );

        let newAccount2 = new Account(
            null,
            'example_user_name',
            'example@gmail.com',
            'example_hashed_password'
        )

        let createdAccount = await AccountController.createAccount(newAccount);
        let accountId = createdAccount.id;

        let createdAccount2 = await AccountController.createAccount(newAccount2);
        let accountId2 = createdAccount2.id;


        await RoleController.addAccountToRole(roleId, accountId);
        await RoleController.addAccountToRole(roleId, accountId2);
        let roleWithAccount = await RoleController.getRole('tuinman');

        expect(roleWithAccount.accounts.length).toBe(2);
    });
});
