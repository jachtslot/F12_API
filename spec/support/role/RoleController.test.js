const databaseCredentials = require('../../../util/DatabaseCredentials').CREDENTIALS;
const RoleController = require('../../../role/RoleController');
const PostgreSQLAdapter = require('../../../util/PostgreSQLAdapter');

const setUp = async () => {
    databaseCredentials.host = process.env.POSTGRES_HOST_TEST_ADDRESS;
    await PostgreSQLAdapter.clearAllTables();
};

describe('testing the createRole method of the RoleController()', () => {

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

    it('Denies insert if name already exists', async () => {
        await setUp();
        await RoleController.createRole('tuinman');

        await expectAsync(
            RoleController.createRole('tuinman')
        ).toBeRejected();
    });

    it('Denies if name length is smaller than 1', async () => {
       await setUp();

        await expectAsync(
            RoleController.createRole('')
        ).toBeRejected();
    });

    it('Denies if name is null', async () => {
        await setUp();

        await expectAsync(
            RoleController.createRole(null)
        ).toBeRejected();
    });
});
