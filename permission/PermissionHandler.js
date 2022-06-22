const Permission = require('./Permission');
const PermissionController = require('./PermissionController');
const permissionController = new PermissionController();
const AuthenticationHelper = require('../util/AuthenticationHelper');
const ResponseFactory = require('../response/ResponseFactory');
const UnauthorizedUserError = require('../authentication/UnauthorizedUserError');
const Methods = require('../response/methods').Methods;

module.exports.addPermission = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
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
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User not authorized for this action.');
    }
    const id = event.pathParameters.id;
    return await permissionController.deletePermission(id).then(() => {
        return ResponseFactory.build(200, Methods.DELETE, JSON.stringify(`Deleted permission with ID : ${id}`));
    }).catch(error => {
        return ResponseFactory.build(500, Methods.DELETE, JSON.stringify(error));
    });


}
