const RoleController = require('./RoleController');
const roleController = new RoleController();
const AccountController = require('../account/AccountController');
const accountController = new AccountController();
const Role = require('./Role');

const ResponseFactory = require('../response/ResponseFactory');
const Methods = require('../response/methods').Methods;

module.exports.createRole = async event => {
    const responseBody = JSON.parse(event.body);
    const role = new Role(null, responseBody.name);

    await roleController.createRole(role);
    return ResponseFactory.build(
        201,
        Methods.POST,
        JSON.stringify(role)
    );
}

module.exports.deleteRole = async event => {
    let id = event.pathParameters.id;
    await roleController.deleteRole(id);
    return ResponseFactory.build(
        200,
        Methods.DELETE,
        "The role is deleted"
    );
}

module.exports.addAccountToRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    let account = await accountController.getAccount(accountId).catch(() => {
        return ResponseFactory.build(
            404,
            Methods.POST,
            `Account with id '${accountId} could not be found!`
        )
    });

    await roleController.addAccountToRole(roleId, accountId);
    return ResponseFactory.build(
        202,
        Methods.POST,
        `The account ${account[0].username} is added to the role ${roleId}`
    );
}

module.exports.removeAccountFromRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    return await roleController.removeAccountFromRole(roleId, accountId).then(() => {
        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,DELETE"
            },
            body: `Removed account ${accountId} from role ${roleId}`
        }
    });
}

module.exports.getAllRoles = async event => {
    return await roleController.getAllRoles().then(roles => {
       return {
           statusCode: 200,
           headers: {
               "Access-Control-Allow-Headers": "Content-Type",
               "Access-Control-Allow-Origin": "http://localhost:4200",
               "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
           },
           body: JSON.stringify(roles)
       };
    });
}

module.exports.getRole = async event => {
    let id = event.pathParameters.id;

    return await roleController.getRoleById(id).then(roles => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET"
            },
            body: JSON.stringify(roles)
        };
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}
