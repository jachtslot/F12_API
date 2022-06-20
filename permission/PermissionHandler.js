const Permission = require('./Permission');
const PermissionController = require('./PermissionController');
const permissionController = new PermissionController();

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

module.exports.addPermission = async event => {
    const body = JSON.parse(event.body);
    const permission = new Permission(
        null,
        body.role_id,
        body.privilege_id,
        body.day,
        body.begin_time,
        body.end_time
    );

    await permissionController.addPermission(permission);
    return ResponseFactory.build(
        201,
        Methods.POST,
        JSON.stringify(permission)
    );
}

module.exports.deletePermission = async event => {
    const id = event.pathParameters.id;
    return await permissionController.deletePermission(id).then(() => {
        return ResponseFactory.build(200, Methods.DELETE, JSON.stringify(`Deleted permission with ID : ${id}`));
    }).catch(error => {
        return ResponseFactory.build(500, Methods.DELETE, JSON.stringify(error));
    });


}
