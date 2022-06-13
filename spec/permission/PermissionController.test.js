const BeforeEach = require('../support/BeforeEach');
const RoleController = require('../../role/RoleController');
describe('Testing the functionality of the PermissionController',() => {

    const setup = async () => {
        let role = await RoleController.createRole('testRole1').then(data => {
            console.log(data)});
        console.log('test')
        console.log(role)
    }


    it('should return 201 when adding permission', async () => {
        await BeforeEach.run();
        const testAccount = await setup();


    });
})
