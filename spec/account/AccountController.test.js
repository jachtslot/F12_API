const databaseCredentials = require('../../util/DatabaseCredentials').CREDENTIALS;
const AccountController = require('../../account/AccountController');
const PostgreSQLAdapter = require('../../util/PostgreSQLAdapter');
const RoleController = require('../../role/RoleController');

const setUp = async () => {
    databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
    await PostgreSQLAdapter.clearAllTables();
};

describe('testing the createAccount() method from the AccountController', () => {

    it('overwrites the databaseCredentials host', async () => {
        await setUp();
        expect(databaseCredentials.host).toBe(process.env.POSTGRES_HOST_TEST_ADDRESS);
    });

    it('Inserts a record in the Role table', async () => {
        await setUp();
        await RoleController.createRole('tuinman');
        let roleRecords = await RoleController.getAllRoles();
        expect(roleRecords.length).toBe(1);
    });
});
