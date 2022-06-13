const RoleController = require('../../role/RoleController');
const BeforeEach = require('../support/BeforeEach');
const Role = require('../../role/Role');


function testRole() {
    return new Role(null, 'test');
}

describe('testing the createRole method of the RoleController()', () => {


    it('Inserts a record in the Role table', async () => {
        await BeforeEach.run();
        await RoleController.createRole(testRole());
        let roleRecords = await RoleController.getAllRoles();
        expect(roleRecords.length).toBe(1);
    });

    it('Denies insert if name already exists', async () => {
        await BeforeEach.run();
        await RoleController.createRole(testRole());

        await expectAsync(
            RoleController.createRole(testRole())
        ).toBeRejected();
    });

    it('Denies if name length is smaller than 1', async () => {
        await BeforeEach.run();

        await expectAsync(
            RoleController.createRole(testRole().name = '')
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
        const role = testRole();
        await BeforeEach.run();
        await RoleController.createRole(role);
        await RoleController.deleteRole(role.id);
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
        const role1 = testRole();
        const role2 = new Role(null, 'testRole2');
        const role3 = new Role(null, 'testRole3');
        await BeforeEach.run();
        await RoleController.createRole(role1);
        await RoleController.createRole(role2);
        await RoleController.createRole(role3);

        await RoleController.deleteRole(role1.id);
        let roleRecords = await RoleController.getAllRoles();

        expect(roleRecords.length).toBe(2);
    });
});
