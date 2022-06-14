const RoleController = require('./RoleController');
const roleController = new RoleController();
const AccountController = require('../account/AccountController');
const accountController = new AccountController();
const Role = require('./Role');

module.exports.createRole = async event => {
    const responseBody = JSON.parse(event.body);
    const role = new Role(null, responseBody.name);

    return await roleController.createRole(role).then(() => {
       return {
           statusCode: 201,
           headers: {
               "Access-Control-Allow-Headers": "Content-Type",
               "Access-Control-Allow-Origin": "http://localhost:4200",
               "Access-Control-Allow-Methods": "OPTIONS,POST"
           },
           body: JSON.stringify(role)
       }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}

module.exports.deleteRole = async event => {
    let id = event.pathParameters.id;

    return await roleController.deleteRole(id).then(() => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,DELETE"
            },
            body: `The role is deleted!`
        }
    }).catch(error => {
        return {
            statusCode: 500,
            body: error.message
        }
    });
}

module.exports.addAccountToRole = async event => {
    let responseBody = JSON.parse(event.body);
    let roleId = responseBody.role_id;
    let accountId = responseBody.account_id;

    let account = await accountController.getAccount(accountId).catch(() => {
        return {
            statusCode: 404,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: `Account with id '${accountId} could not be found!`
        }
    });

    return await roleController.addAccountToRole(roleId, accountId).then(() => {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Origin": "http://localhost:4200",
                "Access-Control-Allow-Methods": "OPTIONS,POST"
            },
            body: `The account ${account[0].username} is added to the role ${roleId}`
        }
    });
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
