const RoleController = require('../../role/RoleController');
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
        let roleId = roles[0].id;

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
        let roleId = roles[0].id;

        await RoleController.deleteRole(roleId);
        let roleRecords = await RoleController.getAllRoles();

        expect(roleRecords.length).toBe(2);
    });
});
