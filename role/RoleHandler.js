const RoleController = require('./RoleController');
const roleController = new RoleController();
const AccountController = require('../account/AccountController');
const accountController = new AccountController();
const Role = require('./Role');

const ResponseFactory = require('../response/ResponseFactory');
const AuthenticationHelper = require('../util/AuthenticationHelper');
const UnauthorizedUserError = require('../authentication/UnauthorizedUserError');
const Methods = require('../response/methods').Methods;

module.exports.createRole = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
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
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
    let id = event.pathParameters.id;
    await roleController.deleteRole(id);
    return ResponseFactory.build(
        200,
        Methods.DELETE,
        "The role is deleted"
    );
}

module.exports.addAccountToRole = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
    const responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    await accountController.getAccount(accountId).catch(() => {
        return ResponseFactory.build(
            404,
            Methods.POST,
            `Account with id '${accountId} could not be found!`
        )
    });

    await roleController.addAccountToRole(roleId, accountId).catch(err => {
        throw new Error(err.message)
    });
    return ResponseFactory.build(
        200,
        Methods.POST,
        'Account has been added to role'
    );
}

module.exports.removeAccountFromRole = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
    let responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    await roleController.removeAccountFromRole(roleId, accountId);
    return ResponseFactory.build(
        201,
        Methods.DELETE,
        `Removed account ${accountId} from role ${roleId}`
    );
}

module.exports.getAllRoles = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
    let roles = await roleController.getAllRoles();
    return ResponseFactory.build(
        200,
        Methods.GET,
        roles
    );
}

module.exports.getRole = async event => {
    if (!AuthenticationHelper.hasAdminRole(event)) {
        throw new UnauthorizedUserError('User is not authenticated for this action');
    }
    let id = event.pathParameters.id;
    let role = await roleController.getRoleById(id);
    return ResponseFactory.build(
        200,
        Methods.GET,
        role
    );
}

module.exports.getAllRolesOfAccount = async event => {
    const decodedToken = AuthenticationHelper.verifyToken(event);
    let id = event.pathParameters.id;
    if (decodedToken.id !== id) {
        throw new UnauthorizedUserError('This account is not authorized to request specified resource')
    }
    let roles = await roleController.getRolesOfAccount(id);
    return ResponseFactory.build(
        200,
        Methods.GET,
        roles
    );
}
