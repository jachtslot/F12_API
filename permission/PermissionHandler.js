const Permission = require('./Permission');
const PermissionController = require('./PermissionController');

module.exports.addPermission = async event => {

    const body = event.body;

    const permission = new Permission(
        body.role_id,
        body.privilege_id,
        body.day,
        body.begin_time,
        body.end_time
    )

    return await PermissionController.addPermission(permission).then(res => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: JSON.stringify(permission)

        }
    }).catch(error => {
        console.log(error);
    });
}
