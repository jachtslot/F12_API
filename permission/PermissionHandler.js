const Permission = require('./Permission');
const PermissionController = require('./PermissionController');
const permissionController = new PermissionController();

module.exports.addPermission = async event => {

    const body = event.body;

    const permission = new Permission(
        body.role_id,
        body.privilege_id,
        body.day,
        body.begin_time,
        body.end_time
    )

    return await permissionController.addPermission(permission).then(() => {
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify(permission)

        }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
