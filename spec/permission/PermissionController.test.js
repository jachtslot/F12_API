const BeforeEach = require('../support/BeforeEach');
const RoleController = require('../../role/RoleController');
const PermissionController = require('../../permission/PermissionController');
const Role = require('../../role/Role');
const Permission = require('../../permission/Permission');
const {v4: uuidv4} = require('uuid');

describe('Testing the functionality of the PermissionController',() => {

    const testPermission = async () => {
        const role = new Role(null, 'testRole');
        await RoleController.createRole(role);
        return new Permission(role.id, 2, 0, 1330, 1700);
    }

    it('should return 201 when adding permission', async () => {
        let permission;
        await BeforeEach.run();
        await testPermission().then(data => permission = data);
        await expectAsync(PermissionController.addPermission(permission)).toBeResolved();
    });
    it('should fail when adding permission with incorrect role reference', async () => {
        const permission = new Permission(uuidv4(), 1, 0, 1300, 1800);
        await BeforeEach.run();
        await expectAsync(PermissionController.addPermission(permission)).toBeRejected();
    });
    it('should fail when adding permission with incorrect privilege_id', async () =>  {
        let permission;
        await BeforeEach.run();
        await testPermission().then(data => permission = data);
        permission.privilege_id = 4;
        await expectAsync(PermissionController.addPermission(permission)).toBeRejected();
    });

    it('should fail when given incorrect day parameter', async () => {
        let permission;
        await BeforeEach.run();
        await testPermission().then(data => permission = data);
        permission.day = 7;
        await expectAsync(PermissionController.addPermission(permission)).toBeRejected();
    });
    it('should create two permissions for a single role', async () => {
        await BeforeEach.run();
        const role = new Role(null, 'testRole');
        await RoleController.createRole(role);
        const permission1 = new Permission(role.id, 3, 0, 1300, 1800);
        const permission2 = new Permission(role.id, 1, 5, 1400, 1600);
        await expectAsync(PermissionController.addPermission(permission1)).toBeResolved();
        await expectAsync(PermissionController.addPermission(permission2)).toBeResolved();
    });
})
